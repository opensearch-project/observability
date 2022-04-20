package org.opensearch.observability.resthandler

import org.opensearch.action.ActionListener
import org.opensearch.action.index.IndexRequest
import org.opensearch.action.index.IndexResponse
import org.opensearch.client.node.NodeClient
import org.opensearch.common.xcontent.json.JsonXContent
import org.opensearch.commons.utils.logger
import org.opensearch.jobscheduler.spi.schedule.IntervalSchedule
import org.opensearch.observability.ObservabilityPlugin
import org.opensearch.observability.action.*
import org.opensearch.observability.index.ObservabilityQueryHelper
import org.opensearch.observability.model.ObservabilityObjectType
import org.opensearch.observability.model.RestTag
import org.opensearch.observability.model.ScheduledJobDoc
import org.opensearch.observability.settings.PluginSettings
import org.opensearch.observability.util.contentParserNextToken
import org.opensearch.rest.*
import org.opensearch.rest.BaseRestHandler.RestChannelConsumer
import org.opensearch.search.sort.SortOrder
import java.io.IOException
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.*

/**
 * Rest handler for observability object lifecycle management.
 * This handler uses [ObservabilityActions].
 */
internal class SchedulerRestHandler : BaseRestHandler() {
    companion object {
        private const val SCHEDULE_ACTION = "observability_jobs_actions"
        const val SCHEDULED_JOB_INDEX = ".opensearch-observability-job"
        private const val OBSERVABILITY_SCHEDULE_URL = "_plugins/test/_schedule"
        private val log by logger(SchedulerRestHandler::class.java)
    }

    /**
     * {@inheritDoc}
     */
    override fun getName(): String {
        return SCHEDULE_ACTION
    }

    /**
     * {@inheritDoc}
     */
    override fun routes(): List<RestHandler.Route> {
        return listOf(
            /**
             * Create a new object
             * Request URL: POST OBSERVABILITY_URL
             * Request body: Ref [org.opensearch.observability.model.CreateObservabilityObjectRequest]
             * Response body: Ref [org.opensearch.observability.model.CreateObservabilityObjectResponse]
             */
            RestHandler.Route(RestRequest.Method.POST, OBSERVABILITY_SCHEDULE_URL)
        )
    }

    /**
     * {@inheritDoc}
     */
    override fun responseParams(): Set<String> {
        return setOf(
            RestTag.OBJECT_ID_FIELD,
            RestTag.OBJECT_ID_LIST_FIELD,
            RestTag.OBJECT_TYPE_FIELD,
            RestTag.SORT_FIELD_FIELD,
            RestTag.SORT_ORDER_FIELD,
            RestTag.FROM_INDEX_FIELD,
            RestTag.MAX_ITEMS_FIELD
        )
    }

    private fun executePostRequest(request: RestRequest, client: NodeClient): RestChannelConsumer {
        // TODO: poc code
//        val queryString = request.param("ppl").toString()
        if (request.method() == RestRequest.Method.POST) {
            val sampleId = "id" + Math.random()*10
            val scheduledJob = ScheduledJobDoc(
                sampleId,
                Instant.now(),
                Instant.now(),
                "__user__",
                listOf(),
                ScheduledJobDoc.JobType.Metrics,
                IntervalSchedule(
                    Instant.now(),
                    1,
                    ChronoUnit.MINUTES
                ),
                true,
            )
            val indexRequest: IndexRequest = IndexRequest()
                .index(SCHEDULED_JOB_INDEX)
                .id(sampleId)
                .source(scheduledJob.toXContent())

            return RestChannelConsumer { restChannel: RestChannel ->
                // index the job parameter
                client.index(
                    indexRequest,
                    object : ActionListener<IndexResponse> {
                        override fun onResponse(indexResponse: IndexResponse) {
                            try {
                                val restResponse: RestResponse = BytesRestResponse(
                                    RestStatus.OK,
                                    indexResponse.toXContent(JsonXContent.contentBuilder(), null)
                                )
                                restChannel.sendResponse(restResponse)
                            } catch (e: IOException) {
                                restChannel.sendResponse(
                                    BytesRestResponse(
                                        RestStatus.INTERNAL_SERVER_ERROR,
                                        e.message
                                    )
                                )
                            }
                        }

                        override fun onFailure(e: Exception) {
                            restChannel.sendResponse(
                                BytesRestResponse(
                                    RestStatus.INTERNAL_SERVER_ERROR,
                                    e.message
                                )
                            )
                        }
                    }
                )
            }
        } else {
            return RestChannelConsumer { restChannel: RestChannel ->
                restChannel.sendResponse(
                    BytesRestResponse(
                        RestStatus.METHOD_NOT_ALLOWED,
                        request.method().toString() + " is not allowed."
                    )
                )
            }
        }
    }

    /**
     * {@inheritDoc}
     */
    override fun prepareRequest(request: RestRequest, client: NodeClient): RestChannelConsumer {
        return when (request.method()) {
            RestRequest.Method.POST -> executePostRequest(request, client)
            else -> RestChannelConsumer {
                it.sendResponse(
                    BytesRestResponse(
                        RestStatus.METHOD_NOT_ALLOWED,
                        "${request.method()} is not allowed"
                    )
                )
            }
        }
    }

    private fun getObjectIdSet(objectId: String?, objectIdList: String?): Set<String> {
        var retIds: Set<String> = setOf()
        if (objectId != null) {
            retIds = setOf(objectId)
        }
        if (objectIdList != null) {
            retIds = objectIdList.split(",").union(retIds)
        }
        return retIds
    }

    private fun getTypesSet(typesString: String?): EnumSet<ObservabilityObjectType> {
        var types: EnumSet<ObservabilityObjectType> =
            EnumSet.noneOf(ObservabilityObjectType::class.java)
        typesString?.split(",")?.forEach { types.add(ObservabilityObjectType.fromTagOrDefault(it)) }
        return types
    }
}

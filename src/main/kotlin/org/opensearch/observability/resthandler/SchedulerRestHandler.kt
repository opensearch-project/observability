package org.opensearch.observability.resthandler

import org.opensearch.action.ActionListener
import org.opensearch.action.index.IndexRequest
import org.opensearch.action.index.IndexResponse
import org.opensearch.client.node.NodeClient
import org.opensearch.common.xcontent.json.JsonXContent
import org.opensearch.jobscheduler.spi.schedule.IntervalSchedule
import org.opensearch.observability.model.RestTag
import org.opensearch.observability.model.ScheduledJobDoc
import org.opensearch.rest.BaseRestHandler
import org.opensearch.rest.BaseRestHandler.RestChannelConsumer
import org.opensearch.rest.BytesRestResponse
import org.opensearch.rest.RestChannel
import org.opensearch.rest.RestHandler
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestResponse
import org.opensearch.rest.RestStatus
import java.io.IOException
import java.time.Instant
import java.time.temporal.ChronoUnit

/**
 * TODO: This REST handler is for POC to verify that job-scheduler workflow can run in Observability.
 * In the future this will be removed. Scheduling won't have it's own REST API. It always comes with create Metic API
 */
internal class SchedulerRestHandler : BaseRestHandler() {
    companion object {
        private const val SCHEDULE_ACTION = "observability_jobs_actions"
        const val SCHEDULED_JOB_INDEX = ".opensearch-observability-job"
        private const val OBSERVABILITY_SCHEDULE_URL = "_plugins/poc/_schedule"
        private const val CONSTANT = 10
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
        // TODO: Indexing a scheduled job will happen within the workflow of creating a metric. Below is for POC only.

        if (request.method() == RestRequest.Method.POST) {
            val sampleId = "id" + Math.random() * CONSTANT
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
}

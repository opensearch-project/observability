/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
package org.opensearch.observability.resthandler

import org.opensearch.client.node.NodeClient
import org.opensearch.commons.utils.logger
import org.opensearch.observability.ObservabilityPlugin.Companion.BASE_OBSERVABILITY_URI
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.action.CreateObservabilityObjectAction
import org.opensearch.observability.action.DeleteObservabilityObjectAction
import org.opensearch.observability.action.GetObservabilityObjectAction
import org.opensearch.observability.action.ObservabilityActions
import org.opensearch.observability.action.UpdateObservabilityObjectAction
import org.opensearch.observability.index.ObservabilityQueryHelper
import org.opensearch.observability.model.CreateObservabilityObjectRequest
import org.opensearch.observability.model.DeleteObservabilityObjectRequest
import org.opensearch.observability.model.GetObservabilityObjectRequest
import org.opensearch.observability.model.ObservabilityObjectType
import org.opensearch.observability.model.RestTag.FROM_INDEX_FIELD
import org.opensearch.observability.model.RestTag.MAX_ITEMS_FIELD
import org.opensearch.observability.model.RestTag.OBJECT_ID_FIELD
import org.opensearch.observability.model.RestTag.OBJECT_ID_LIST_FIELD
import org.opensearch.observability.model.RestTag.OBJECT_TYPE_FIELD
import org.opensearch.observability.model.RestTag.SORT_FIELD_FIELD
import org.opensearch.observability.model.RestTag.SORT_ORDER_FIELD
import org.opensearch.observability.model.UpdateObservabilityObjectRequest
import org.opensearch.observability.settings.PluginSettings
import org.opensearch.observability.util.contentParserNextToken
import org.opensearch.rest.BaseRestHandler
import org.opensearch.rest.BaseRestHandler.RestChannelConsumer
import org.opensearch.rest.BytesRestResponse
import org.opensearch.rest.RestHandler.Route
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestRequest.Method.DELETE
import org.opensearch.rest.RestRequest.Method.GET
import org.opensearch.rest.RestRequest.Method.POST
import org.opensearch.rest.RestRequest.Method.PUT
import org.opensearch.rest.RestStatus
import org.opensearch.search.sort.SortOrder
import java.util.EnumSet

/**
 * Rest handler for observability object lifecycle management.
 * This handler uses [ObservabilityActions].
 */
internal class ObservabilityRestHandler : BaseRestHandler() {
    companion object {
        private const val OBSERVABILITY_ACTION = "observability_actions"
        private const val OBSERVABILITY_URL = "$BASE_OBSERVABILITY_URI/object"
        private val log by logger(ObservabilityRestHandler::class.java)
    }

    /**
     * {@inheritDoc}
     */
    override fun getName(): String {
        return OBSERVABILITY_ACTION
    }

    /**
     * {@inheritDoc}
     */
    override fun routes(): List<Route> {
        return listOf(
            /**
             * Create a new object
             * Request URL: POST OBSERVABILITY_URL
             * Request body: Ref [org.opensearch.observability.model.CreateObservabilityObjectRequest]
             * Response body: Ref [org.opensearch.observability.model.CreateObservabilityObjectResponse]
             */
            Route(POST, OBSERVABILITY_URL),
            /**
             * Update object
             * Request URL: PUT OBSERVABILITY_URL/{objectId}
             * Request body: Ref [org.opensearch.observability.model.UpdateObservabilityObjectRequest]
             * Response body: Ref [org.opensearch.observability.model.UpdateObservabilityObjectResponse]
             */
            Route(PUT, "$OBSERVABILITY_URL/{$OBJECT_ID_FIELD}"),
            /**
             * Get a object
             * Request URL: GET OBSERVABILITY_URL/{objectId}
             * Request body: Ref [org.opensearch.observability.model.GetObservabilityObjectRequest]
             * Response body: Ref [org.opensearch.observability.model.GetObservabilityObjectResponse]
             */
            Route(GET, "$OBSERVABILITY_URL/{$OBJECT_ID_FIELD}"),
            Route(GET, OBSERVABILITY_URL),
            /**
             * Delete object
             * Request URL: DELETE OBSERVABILITY_URL/{objectId}
             * Request body: Ref [org.opensearch.observability.model.DeleteObservabilityObjectRequest]
             * Response body: Ref [org.opensearch.observability.model.DeleteObservabilityObjectResponse]
             */
            Route(DELETE, "$OBSERVABILITY_URL/{$OBJECT_ID_FIELD}"),
            Route(DELETE, "$OBSERVABILITY_URL")
        )
    }

    /**
     * {@inheritDoc}
     */
    override fun responseParams(): Set<String> {
        return setOf(
            OBJECT_ID_FIELD,
            OBJECT_ID_LIST_FIELD,
            OBJECT_TYPE_FIELD,
            SORT_FIELD_FIELD,
            SORT_ORDER_FIELD,
            FROM_INDEX_FIELD,
            MAX_ITEMS_FIELD
        )
    }

    private fun executePostRequest(request: RestRequest, client: NodeClient): RestChannelConsumer {
        return RestChannelConsumer {
            client.execute(
                CreateObservabilityObjectAction.ACTION_TYPE,
                CreateObservabilityObjectRequest.parse(request.contentParserNextToken()),
                RestResponseToXContentListener(it)
            )
        }
    }

    private fun executePutRequest(request: RestRequest, client: NodeClient): RestChannelConsumer {
        return RestChannelConsumer {
            client.execute(
                UpdateObservabilityObjectAction.ACTION_TYPE,
                UpdateObservabilityObjectRequest.parse(request.contentParserNextToken(), request.param(OBJECT_ID_FIELD)),
                RestResponseToXContentListener(it)
            )
        }
    }

    private fun executeGetRequest(request: RestRequest, client: NodeClient): RestChannelConsumer {
        val objectId: String? = request.param(OBJECT_ID_FIELD)
        val objectIdListString: String? = request.param(OBJECT_ID_LIST_FIELD)
        val objectIdList = getObjectIdSet(objectId, objectIdListString)
        val types: EnumSet<ObservabilityObjectType> = getTypesSet(request.param(OBJECT_TYPE_FIELD))
        val sortField: String? = request.param(SORT_FIELD_FIELD)
        val sortOrderString: String? = request.param(SORT_ORDER_FIELD)
        val sortOrder: SortOrder? = if (sortOrderString == null) {
            null
        } else {
            SortOrder.fromString(sortOrderString)
        }
        val fromIndex = request.param(FROM_INDEX_FIELD)?.toIntOrNull() ?: 0
        val maxItems = request.param(MAX_ITEMS_FIELD)?.toIntOrNull() ?: PluginSettings.defaultItemsQueryCount
        val filterParams = request.params()
            .filter { ObservabilityQueryHelper.FILTER_PARAMS.contains(it.key) }
            .map { Pair(it.key, request.param(it.key)) }
            .toMap()
        log.info(
            "$LOG_PREFIX:executeGetRequest idList:$objectIdList types:$types, from:$fromIndex, maxItems:$maxItems," +
                " sortField:$sortField, sortOrder=$sortOrder, filters=$filterParams"
        )
        return RestChannelConsumer {
            client.execute(
                GetObservabilityObjectAction.ACTION_TYPE,
                GetObservabilityObjectRequest(
                    objectIdList,
                    types,
                    fromIndex,
                    maxItems,
                    sortField,
                    sortOrder,
                    filterParams
                ),
                RestResponseToXContentListener(it)
            )
        }
    }

    private fun executeDeleteRequest(request: RestRequest, client: NodeClient): RestChannelConsumer {
        val objectId: String? = request.param(OBJECT_ID_FIELD)
        val objectIdSet: Set<String> =
            request.paramAsStringArray(OBJECT_ID_LIST_FIELD, arrayOf(objectId))
                .filter { s -> !s.isNullOrBlank() }
                .toSet()
        return RestChannelConsumer {
            if (objectIdSet.isEmpty()) {
                it.sendResponse(
                    BytesRestResponse(
                        RestStatus.BAD_REQUEST,
                        "either $OBJECT_ID_FIELD or $OBJECT_ID_LIST_FIELD is required"
                    )
                )
            } else {
                client.execute(
                    DeleteObservabilityObjectAction.ACTION_TYPE,
                    DeleteObservabilityObjectRequest(objectIdSet),
                    RestResponseToXContentListener(it)
                )
            }
        }
    }

    /**
     * {@inheritDoc}
     */
    override fun prepareRequest(request: RestRequest, client: NodeClient): RestChannelConsumer {
        return when (request.method()) {
            POST -> executePostRequest(request, client)
            PUT -> executePutRequest(request, client)
            GET -> executeGetRequest(request, client)
            DELETE -> executeDeleteRequest(request, client)
            else -> RestChannelConsumer {
                it.sendResponse(BytesRestResponse(RestStatus.METHOD_NOT_ALLOWED, "${request.method()} is not allowed"))
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
        var types: EnumSet<ObservabilityObjectType> = EnumSet.noneOf(ObservabilityObjectType::class.java)
        typesString?.split(",")?.forEach { types.add(ObservabilityObjectType.fromTagOrDefault(it)) }
        return types
    }
}

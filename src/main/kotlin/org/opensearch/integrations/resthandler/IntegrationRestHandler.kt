/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.integrations.resthandler

import org.opensearch.client.node.NodeClient
import org.opensearch.commons.utils.contentParserNextToken
import org.opensearch.commons.utils.logger
import org.opensearch.integrations.action.CreateIntegrationAction
import org.opensearch.integrations.action.CreateIntegrationRequest
import org.opensearch.integrations.action.GetIntegrationObjectAction
import org.opensearch.integrations.action.GetIntegrationObjectRequest
import org.opensearch.integrations.model.IntegrationInstance
import org.opensearch.integrations.model.IntegrationObjectType
import org.opensearch.observability.ObservabilityPlugin
import org.opensearch.observability.ObservabilityPlugin.Companion.BASE_INTEGRATIONS_URI
import org.opensearch.observability.index.ObservabilityQueryHelper
import org.opensearch.observability.model.RestTag
import org.opensearch.observability.resthandler.RestResponseToXContentListener
import org.opensearch.observability.settings.PluginSettings
import org.opensearch.rest.BaseRestHandler
import org.opensearch.rest.BytesRestResponse
import org.opensearch.rest.RestHandler.Route
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestRequest.Method
import org.opensearch.rest.RestStatus
import org.opensearch.search.sort.SortOrder
import java.util.*

class IntegrationRestHandler : BaseRestHandler() {
    companion object {
        private const val INTEGRATIONS_ACTION = "integrations_actions"
        private const val URI = "$BASE_INTEGRATIONS_URI/store"
        private const val ID_FIELD = "integration_id"
        private val log by logger(IntegrationRestHandler::class.java)
        var added = false
    }

    override fun getName(): String {
        return INTEGRATIONS_ACTION
    }

    override fun routes(): List<Route> {
        return listOf(
            /**
             * By passing in the appropriate search attributes,
             * you can search for available integrations in the store
             */
            Route(Method.GET, URI),
            /**
             * Adds an Integration to the system store,
             * expecting the internal URLs to be accessible
             */
            Route(Method.POST, URI),
            /**
             * Get the stored Integration's status
             */
            Route(Method.GET, "$URI/{$ID_FIELD}"),
            /**
             * Validates an Integration
             */
            Route(Method.POST, "$URI/{$ID_FIELD}/validate"),
            /**
             * Upload an Integration's assets
             */
            Route(Method.POST, "$URI/{$ID_FIELD}/upload"),
            /**
             * Activate an Integration
             */
            Route(Method.PUT, "$URI/{$ID_FIELD}/activate"),
            Route(Method.GET, "$URI/list_all"),
            Route(Method.GET, "$URI/list_added"),
            Route(Method.GET, "$URI/details"),
        )
    }

    private fun executeCreateRequest(request: RestRequest, client: NodeClient): RestChannelConsumer {
        log.info("Execute create request")
        val integration = IntegrationInstance.parse(request.contentParserNextToken())
        return RestChannelConsumer {
            client.execute(
                CreateIntegrationAction.ACTION_TYPE,
                CreateIntegrationRequest(null, IntegrationObjectType.INSTANCE, integration),
                RestResponseToXContentListener(it)
            )
        }
    }

    private fun executeGetRequest(request: RestRequest, client: NodeClient): RestChannelConsumer {
        val objectId: String? = request.param(RestTag.OBJECT_ID_FIELD)
        val objectIdListString: String? = request.param(RestTag.OBJECT_ID_LIST_FIELD)
        val objectIdList = getObjectIdSet(objectId, objectIdListString)
        val types: EnumSet<IntegrationObjectType> = getTypesSet(request.param(RestTag.OBJECT_TYPE_FIELD))
        val sortField: String? = request.param(RestTag.SORT_FIELD_FIELD)
        val sortOrderString: String? = request.param(RestTag.SORT_ORDER_FIELD)
        val sortOrder: SortOrder? = if (sortOrderString == null) {
            null
        } else {
            SortOrder.fromString(sortOrderString)
        }
        val fromIndex = request.param(RestTag.FROM_INDEX_FIELD)?.toIntOrNull() ?: 0
        val maxItems = request.param(RestTag.MAX_ITEMS_FIELD)?.toIntOrNull() ?: PluginSettings.defaultItemsQueryCount
        val filterParams = request.params()
            .filter { ObservabilityQueryHelper.FILTER_PARAMS.contains(it.key) }
            .map { Pair(it.key, request.param(it.key)) }
            .toMap()
        log.info(
            "${ObservabilityPlugin.LOG_PREFIX}:executeGetRequest idList:$objectIdList types:$types, from:$fromIndex, maxItems:$maxItems," +
                " sortField:$sortField, sortOrder=$sortOrder, filters=$filterParams"
        )
        return RestChannelConsumer {
            client.execute(
                GetIntegrationObjectAction.ACTION_TYPE,
                GetIntegrationObjectRequest(
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

    override fun prepareRequest(request: RestRequest, client: NodeClient): RestChannelConsumer {
        log.info("Received: ${request.path()}")
        return when (request.method()) {
            Method.POST -> run {
                added = true
                return executeCreateRequest(request, client)
            }
            Method.GET -> {
                when (request.uri().split("/").last()) {
                    "list_all" -> RestChannelConsumer {
                        it.sendResponse(BytesRestResponse(RestStatus.NOT_IMPLEMENTED, "{\"list\":[{}]}"))
                    }
                    "list_added" -> {
                        if (added) {
                            return RestChannelConsumer {
                                it.sendResponse(BytesRestResponse(RestStatus.FORBIDDEN, "{\"list\":[{}]}"))
                            }
                        } else {
                            RestChannelConsumer {
                                it.sendResponse(BytesRestResponse(RestStatus.ACCEPTED, "{\"list\":[]}"))
                            }
                        }
                    }
                    "details" -> RestChannelConsumer {
                        it.sendResponse(BytesRestResponse(RestStatus.PARTIAL_CONTENT, "{\"status\":\"READY\"}"))
                    }
                    else -> executeGetRequest(request, client)
                }
            }
            else -> RestChannelConsumer {
                it.sendResponse(BytesRestResponse(RestStatus.METHOD_NOT_ALLOWED, "{\"error\": \"${request.method().name} request not allowed\"}"))
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

    private fun getTypesSet(typesString: String?): EnumSet<IntegrationObjectType> {
        var types: EnumSet<IntegrationObjectType> = EnumSet.noneOf(IntegrationObjectType::class.java)
        typesString?.split(",")?.forEach { types.add(IntegrationObjectType.fromTagOrDefault(it)) }
        return types
    }
}

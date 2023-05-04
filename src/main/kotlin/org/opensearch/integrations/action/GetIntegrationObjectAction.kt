/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.integrations.action

import org.opensearch.OpenSearchStatusException
import org.opensearch.action.ActionType
import org.opensearch.action.support.ActionFilters
import org.opensearch.client.Client
import org.opensearch.common.inject.Inject
import org.opensearch.commons.authuser.User
import org.opensearch.core.xcontent.NamedXContentRegistry
import org.opensearch.integrations.index.IntegrationIndex
import org.opensearch.observability.ObservabilityPlugin
import org.opensearch.observability.action.GetObservabilityObjectRequest
import org.opensearch.observability.action.GetObservabilityObjectResponse
import org.opensearch.observability.action.ObservabilityActions
import org.opensearch.observability.action.PluginBaseAction
import org.opensearch.observability.index.ObservabilityIndex
import org.opensearch.observability.metrics.Metrics
import org.opensearch.observability.model.ObservabilityObjectDoc
import org.opensearch.observability.model.ObservabilityObjectSearchResult
import org.opensearch.observability.security.UserAccessManager
import org.opensearch.observability.util.logger
import org.opensearch.rest.RestStatus
import org.opensearch.transport.TransportService

/**
 * Get ObservabilityObject transport action
 */
internal class GetIntegrationObjectAction @Inject constructor(
    transportService: TransportService,
    client: Client,
    actionFilters: ActionFilters,
    val xContentRegistry: NamedXContentRegistry
) : PluginBaseAction<GetIntegrationObjectRequest, GetIntegrationObjectResponse>(
    NAME,
    transportService,
    client,
    actionFilters,
    ::GetIntegrationObjectRequest
) {
    private val log by logger(ObservabilityActions::class.java)
    companion object {
        private const val NAME = "cluster:admin/opensearch/observability/get"
        internal val ACTION_TYPE = ActionType(NAME, ::GetIntegrationObjectResponse)
    }

//    /**
//     * Get ObservabilityObject info
//     * @param objectId object id
//     * @param user the user info object
//     * @return [GetObservabilityObjectResponse]
//     */
//    private fun info(objectId: String, user: User?): GetIntegrationObjectResponse {
//        log.info("${ObservabilityPlugin.LOG_PREFIX}:ObservabilityObject-info $objectId")
//        val observabilityObjectDocInfo = ObservabilityIndex.getObservabilityObject(objectId)
//        observabilityObjectDocInfo
//            ?: run {
//                throw OpenSearchStatusException("ObservabilityObject $objectId not found", RestStatus.NOT_FOUND)
//            }
//        val currentDoc = observabilityObjectDocInfo.observabilityObjectDoc
//        if (!UserAccessManager.doesUserHasAccess(user, currentDoc.tenant, currentDoc.access)) {
//            Metrics.OBSERVABILITY_PERMISSION_USER_ERROR.counter.increment()
//            throw OpenSearchStatusException("Permission denied for ObservabilityObject $objectId", RestStatus.FORBIDDEN)
//        }
//        val docInfo = ObservabilityObjectDoc(
//            objectId,
//            currentDoc.updatedTime,
//            currentDoc.createdTime,
//            currentDoc.tenant,
//            currentDoc.access,
//            currentDoc.type,
//            currentDoc.objectData
//        )
//        return GetIntegrationObjectResponse(
//            ObservabilityObjectSearchResult(docInfo),
//            UserAccessManager.hasAllInfoAccess(user)
//        )
//    }

//    /**
//     * Get ObservabilityObject info
//     * @param objectIds object id set
//     * @param user the user info object
//     * @return [GetObservabilityObjectResponse]
//     */
//    private fun info(objectIds: Set<String>, user: User?): GetIntegrationObjectResponse {
//        log.info("${ObservabilityPlugin.LOG_PREFIX}:ObservabilityObject-info $objectIds")
//        val objectDocs = ObservabilityIndex.getObservabilityObjects(objectIds)
//        if (objectDocs.size != objectIds.size) {
//            val mutableSet = objectIds.toMutableSet()
//            objectDocs.forEach { mutableSet.remove(it.id) }
//            throw OpenSearchStatusException(
//                "ObservabilityObject $mutableSet not found",
//                RestStatus.NOT_FOUND
//            )
//        }
//        objectDocs.forEach {
//            val currentDoc = it.observabilityObjectDoc
//            if (!UserAccessManager.doesUserHasAccess(user, currentDoc.tenant, currentDoc.access)) {
//                Metrics.OBSERVABILITY_PERMISSION_USER_ERROR.counter.increment()
//                throw OpenSearchStatusException(
//                    "Permission denied for ObservabilityObject ${it.id}",
//                    RestStatus.FORBIDDEN
//                )
//            }
//        }
//        val configSearchResult = objectDocs.map {
//            ObservabilityObjectDoc(
//                it.id!!,
//                it.observabilityObjectDoc.updatedTime,
//                it.observabilityObjectDoc.createdTime,
//                it.observabilityObjectDoc.tenant,
//                it.observabilityObjectDoc.access,
//                it.observabilityObjectDoc.type,
//                it.observabilityObjectDoc.objectData
//            )
//        }
//        return GetIntegrationObjectResponse(
//            ObservabilityObjectSearchResult(configSearchResult),
//            UserAccessManager.hasAllInfoAccess(user)
//        )
//    }

    /**
     * Get all ObservabilityObject matching the criteria
     * @param request [GetObservabilityObjectRequest] object
     * @param user the user info object
     * @return [GetObservabilityObjectResponse]
     */
    private fun getAll(request: GetIntegrationObjectRequest, user: User?): GetIntegrationObjectResponse {
        log.info("${ObservabilityPlugin.LOG_PREFIX}:ObservabilityObject-getAll")
        val searchResult = IntegrationIndex.getAllIntegrationObjects(
            UserAccessManager.getUserTenant(user),
            UserAccessManager.getSearchAccessInfo(user),
            request
        )
        return GetIntegrationObjectResponse(searchResult, UserAccessManager.hasAllInfoAccess(user))
    }

    /**
     * {@inheritDoc}
     */
    override fun executeRequest(request: GetIntegrationObjectRequest, user: User?): GetIntegrationObjectResponse {
        log.info("${ObservabilityPlugin.LOG_PREFIX}:IntegrationObject-get ${request.objectIds}")
        UserAccessManager.validateUser(user)
        return when (request.objectIds.size) {
            0 -> getAll(request, user)
            else -> throw Error("Not implemented yet")
//            1 -> info(request.objectIds.first(), user)
//            else -> info(request.objectIds, user)
        }
    }
}

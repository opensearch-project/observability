package org.opensearch.integrations.action

import org.opensearch.OpenSearchStatusException
import org.opensearch.action.ActionType
import org.opensearch.action.support.ActionFilters
import org.opensearch.client.Client
import org.opensearch.common.inject.Inject
import org.opensearch.commons.authuser.User
import org.opensearch.core.xcontent.NamedXContentRegistry
import org.opensearch.integrations.index.IntegrationIndex
import org.opensearch.observability.action.PluginBaseAction
import org.opensearch.observability.security.UserAccessManager
import org.opensearch.rest.RestStatus
import org.opensearch.transport.TransportService

internal class CreateIntegrationAction @Inject constructor(
    transportService: TransportService,
    client: Client,
    actionFilters: ActionFilters,
    val xContentRegistry: NamedXContentRegistry
) : PluginBaseAction<CreateIntegrationRequest, CreateIntegrationResponse>(
    NAME,
    transportService,
    client,
    actionFilters,
    ::CreateIntegrationRequest
) {
    companion object {
        private const val NAME = "cluster:admin/opensearch/integrations/store/create"
        internal val ACTION_TYPE = ActionType(NAME, ::CreateIntegrationResponse)
    }

    override fun executeRequest(
        request: CreateIntegrationRequest,
        user: User?
    ): CreateIntegrationResponse {

//        UserAccessManager.validateUser(user)
//        val currentTime = Instant.now()
//        val objectDoc = ObservabilityObjectDoc(
//            "ignore",
//            currentTime,
//            currentTime,
//            UserAccessManager.getUserTenant(user),
//            UserAccessManager.getAllAccessInfo(user),
//            request.type,
//            request.objectData
//        )
//        val docId = ObservabilityIndex.createObservabilityObject(objectDoc, request.objectId)
//        docId ?: throw OpenSearchStatusException(
//            "ObservabilityObject Creation failed",
//            RestStatus.INTERNAL_SERVER_ERROR
//        )
        UserAccessManager.validateUser(user)
        val docId = IntegrationIndex.createIntegrationObject(request.integrationInstance)
        docId ?: throw OpenSearchStatusException(
            "Integration Creation failed",
            RestStatus.INTERNAL_SERVER_ERROR
        )
        return CreateIntegrationResponse(docId)
    }
}

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
import org.opensearch.integrations.model.IntegrationObjectDoc
import org.opensearch.integrations.security.UserAccessManager
import org.opensearch.observability.action.PluginBaseAction
import org.opensearch.rest.RestStatus
import org.opensearch.transport.TransportService
import java.time.Instant

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
        UserAccessManager.validateUser(user)
        val currentTime = Instant.now()
        val objectDoc = IntegrationObjectDoc(
            "ignore",
            currentTime,
            currentTime,
            UserAccessManager.getUserTenant(user),
            UserAccessManager.getAllAccessInfo(user),
            request.type,
            request.objectData
        )
        val docId = IntegrationIndex.createIntegrationObject(objectDoc, request.objectId)
        docId ?: throw OpenSearchStatusException(
            "Integration Creation failed",
            RestStatus.INTERNAL_SERVER_ERROR
        )
//        return CreateIntegrationResponse(docId)
        return CreateIntegrationResponse("96847220-5261-44d0-89b4-65f3a659f13a")
    }
}

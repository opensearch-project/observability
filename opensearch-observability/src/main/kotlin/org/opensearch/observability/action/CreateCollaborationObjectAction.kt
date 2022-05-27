/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.action

import org.opensearch.action.ActionType
import org.opensearch.action.support.ActionFilters
import org.opensearch.client.Client
import org.opensearch.common.inject.Inject
import org.opensearch.common.xcontent.NamedXContentRegistry
import org.opensearch.commons.authuser.User
import org.opensearch.transport.TransportService

/**
 * Create CollaborationObject transport action
 */
internal class CreateCollaborationObjectAction @Inject constructor(
    transportService: TransportService,
    client: Client,
    actionFilters: ActionFilters,
    val xContentRegistry: NamedXContentRegistry
) : PluginBaseAction<CreateCollaborationObjectRequest, CreateCollaborationObjectResponse>(
    NAME,
    transportService,
    client,
    actionFilters,
    ::CreateCollaborationObjectRequest
) {
    companion object {
        private const val NAME = "cluster:admin/opensearch/observability/collaboration/create"
        internal val ACTION_TYPE = ActionType(NAME, ::CreateCollaborationObjectResponse)
    }

    /**
     * {@inheritDoc}
     */
    override fun executeRequest(
        request: CreateCollaborationObjectRequest,
        user: User?
    ): CreateCollaborationObjectResponse {
        return CollaborationActions.create(request, user)
    }
}

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.collaboration.action

import org.opensearch.action.ActionType
import org.opensearch.action.support.ActionFilters
import org.opensearch.client.Client
import org.opensearch.common.inject.Inject
import org.opensearch.common.xcontent.NamedXContentRegistry
import org.opensearch.commons.authuser.User
import org.opensearch.observability.action.PluginBaseAction
import org.opensearch.transport.TransportService

/**
 * Delete CollaborationObject transport action
 */
internal class DeleteCollaborationObjectAction @Inject constructor(
    transportService: TransportService,
    client: Client,
    actionFilters: ActionFilters,
    val xContentRegistry: NamedXContentRegistry
) : PluginBaseAction<DeleteCollaborationObjectRequest, DeleteCollaborationObjectResponse>(
    NAME,
    transportService,
    client,
    actionFilters,
    ::DeleteCollaborationObjectRequest
) {
    companion object {
        private const val NAME = "cluster:admin/opensearch/observability/collaboration/delete"
        internal val ACTION_TYPE = ActionType(NAME, ::DeleteCollaborationObjectResponse)
    }

    /**
     * {@inheritDoc}
     */
    override fun executeRequest(request: DeleteCollaborationObjectRequest, user: User?): DeleteCollaborationObjectResponse {
        return CollaborationActions.delete(request, user)
    }
}

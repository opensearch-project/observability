/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.action

import org.opensearch.action.ActionType
import org.opensearch.action.support.ActionFilters
import org.opensearch.client.Client
import org.opensearch.common.inject.Inject
import org.opensearch.commons.authuser.User
import org.opensearch.core.xcontent.NamedXContentRegistry
import org.opensearch.transport.TransportService

/**
 * Delete ObservabilityObject transport action
 */
internal class DeleteObservabilityObjectAction @Inject constructor(
    transportService: TransportService,
    client: Client,
    actionFilters: ActionFilters,
    val xContentRegistry: NamedXContentRegistry
) : PluginBaseAction<DeleteObservabilityObjectRequest, DeleteObservabilityObjectResponse>(
    NAME,
    transportService,
    client,
    actionFilters,
    ::DeleteObservabilityObjectRequest
) {
    companion object {
        private const val NAME = "cluster:admin/opensearch/observability/delete"
        internal val ACTION_TYPE = ActionType(NAME, ::DeleteObservabilityObjectResponse)
    }

    /**
     * {@inheritDoc}
     */
    override fun executeRequest(request: DeleteObservabilityObjectRequest, user: User?): DeleteObservabilityObjectResponse {
        return ObservabilityActions.delete(request, user)
    }
}

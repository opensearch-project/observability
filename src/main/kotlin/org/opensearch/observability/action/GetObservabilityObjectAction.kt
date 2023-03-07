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
 * Get ObservabilityObject transport action
 */
internal class GetObservabilityObjectAction @Inject constructor(
    transportService: TransportService,
    client: Client,
    actionFilters: ActionFilters,
    val xContentRegistry: NamedXContentRegistry
) : PluginBaseAction<GetObservabilityObjectRequest, GetObservabilityObjectResponse>(
    NAME,
    transportService,
    client,
    actionFilters,
    ::GetObservabilityObjectRequest
) {
    companion object {
        private const val NAME = "cluster:admin/opensearch/observability/get"
        internal val ACTION_TYPE = ActionType(NAME, ::GetObservabilityObjectResponse)
    }

    /**
     * {@inheritDoc}
     */
    override fun executeRequest(request: GetObservabilityObjectRequest, user: User?): GetObservabilityObjectResponse {
        return ObservabilityActions.get(request, user)
    }
}

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
 * Create ObservabilityObject transport action
 */
internal class CreateObservabilityObjectAction @Inject constructor(
    transportService: TransportService,
    client: Client,
    actionFilters: ActionFilters,
    val xContentRegistry: NamedXContentRegistry
) : PluginBaseAction<CreateObservabilityObjectRequest, CreateObservabilityObjectResponse>(
    NAME,
    transportService,
    client,
    actionFilters,
    ::CreateObservabilityObjectRequest
) {
    companion object {
        private const val NAME = "cluster:admin/opensearch/observability/create"
        internal val ACTION_TYPE = ActionType(NAME, ::CreateObservabilityObjectResponse)
    }

    /**
     * {@inheritDoc}
     */
    override fun executeRequest(
        request: CreateObservabilityObjectRequest,
        user: User?
    ): CreateObservabilityObjectResponse {
        return ObservabilityActions.create(request, user)
    }
}

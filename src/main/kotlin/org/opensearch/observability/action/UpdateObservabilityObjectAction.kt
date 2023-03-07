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
 * Update ObservabilityObject transport action
 */
internal class UpdateObservabilityObjectAction @Inject constructor(
    transportService: TransportService,
    client: Client,
    actionFilters: ActionFilters,
    val xContentRegistry: NamedXContentRegistry
) : PluginBaseAction<UpdateObservabilityObjectRequest, UpdateObservabilityObjectResponse>(
    NAME,
    transportService,
    client,
    actionFilters,
    ::UpdateObservabilityObjectRequest
) {
    companion object {
        private const val NAME = "cluster:admin/opensearch/observability/update"
        internal val ACTION_TYPE = ActionType(NAME, ::UpdateObservabilityObjectResponse)
    }

    /**
     * {@inheritDoc}
     */
    override fun executeRequest(request: UpdateObservabilityObjectRequest, user: User?): UpdateObservabilityObjectResponse {
        return ObservabilityActions.update(request, user)
    }
}

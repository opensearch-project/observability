/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

package org.opensearch.observability.action

import org.opensearch.action.ActionType
import org.opensearch.action.support.ActionFilters
import org.opensearch.client.Client
import org.opensearch.common.inject.Inject
import org.opensearch.common.xcontent.NamedXContentRegistry
import org.opensearch.commons.authuser.User
import org.opensearch.observability.model.CreateObservabilityObjectRequest
import org.opensearch.observability.model.CreateObservabilityObjectResponse
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

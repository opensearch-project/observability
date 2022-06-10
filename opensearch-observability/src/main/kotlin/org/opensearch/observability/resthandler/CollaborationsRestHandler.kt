/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
package org.opensearch.observability.resthandler

import org.opensearch.client.node.NodeClient
import org.opensearch.commons.utils.logger
import org.opensearch.observability.ObservabilityPlugin.Companion.BASE_COLLABORATION_URI
import org.opensearch.observability.collaboration.action.CollaborationActions
import org.opensearch.observability.collaboration.action.CreateCollaborationObjectAction
import org.opensearch.observability.collaboration.action.CreateCollaborationObjectRequest
import org.opensearch.observability.model.RestTag.COLLABORATION_ID_FIELD
import org.opensearch.observability.util.contentParserNextToken
import org.opensearch.rest.BaseRestHandler
import org.opensearch.rest.BaseRestHandler.RestChannelConsumer
import org.opensearch.rest.BytesRestResponse
import org.opensearch.rest.RestHandler.Route
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestRequest.Method.POST
import org.opensearch.rest.RestStatus

/**
 * Rest handler for observability object lifecycle management.
 * This handler uses [CollaborationActions].
 */
internal class CollaborationsRestHandler : BaseRestHandler() {
    companion object {
        private const val COLLABORATION_ACTION = "collaboration_actions"
        private const val COLLABORATION_URL = "$BASE_COLLABORATION_URI/collaborations"
        private val log by logger(CollaborationsRestHandler::class.java)
    }

    /**
     * {@inheritDoc}
     */
    override fun getName(): String {
        return COLLABORATION_ACTION
    }

    /**
     * {@inheritDoc}
     */
    override fun routes(): List<Route> {
        return listOf(
            /**
             * Creates a new collaboration
             * Request URL: POST COLLABORATION_URL
             * Request body: Ref [org.opensearch.observability.model.CreateObservabilityObjectRequest]
             * Response body: Ref [org.opensearch.observability.model.CreateObservabilityObjectResponse]
             */
            Route(POST, "$COLLABORATION_URL/{$COLLABORATION_ID_FIELD}"),
            Route(POST, COLLABORATION_URL),
        )
    }

    /**
     * {@inheritDoc}
     */
    override fun responseParams(): Set<String> {
        return setOf(
            COLLABORATION_ID_FIELD
        )
    }

    private fun executePostCollaborationRequest(request: RestRequest, client: NodeClient): RestChannelConsumer {
        val collaborationId: String? = request.param(COLLABORATION_ID_FIELD)
        return RestChannelConsumer {
            client.execute(
                CreateCollaborationObjectAction.ACTION_TYPE,
                CreateCollaborationObjectRequest.parse(request.contentParserNextToken(), collaborationId),
                RestResponseToXContentListener(it)
            )
        }
    }

    /**
     * {@inheritDoc}
     */
    override fun prepareRequest(request: RestRequest, client: NodeClient): RestChannelConsumer {
        return when (request.method()) {
            POST -> executePostCollaborationRequest(request, client)
            else -> RestChannelConsumer {
                it.sendResponse(BytesRestResponse(RestStatus.METHOD_NOT_ALLOWED, "${request.method()} is not allowed"))
            }
        }
    }
}

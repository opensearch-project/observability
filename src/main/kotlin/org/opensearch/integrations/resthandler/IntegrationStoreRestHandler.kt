package org.opensearch.integrations.resthandler

import org.opensearch.client.node.NodeClient
import org.opensearch.commons.utils.logger
import org.opensearch.integrations.IntegrationsPlugin.Companion.BASE_INTEGRATIONS_URI
import org.opensearch.rest.BaseRestHandler
import org.opensearch.rest.BytesRestResponse
import org.opensearch.rest.RestHandler.Route
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestRequest.Method
import org.opensearch.rest.RestStatus

class IntegrationStoreRestHandler: BaseRestHandler() {
    companion object {
        private const val INTEGRATIONS_ACTION = "integrations_actions"
        private const val URI = "$BASE_INTEGRATIONS_URI/store"
        private const val ID_FIELD = "integration_id"
        private val log by logger(IntegrationStoreRestHandler::class.java)
    }

    override fun getName(): String {
        return INTEGRATIONS_ACTION
    }

    override fun routes(): List<Route> {
        return listOf(
            /**
             * By passing in the appropriate search attributes,
             * you can search for available integrations in the store
             */
            Route(Method.GET, URI),
            /**
             * Adds an Integration to the system store,
             * expecting the internal URLs to be accessible
             */
            Route(Method.POST, URI),
            /**
             * Get the stored Integration's status
             */
            Route(Method.GET, "$URI/{$ID_FIELD}"),
            /**
             * Validates an Integration
             */
            Route(Method.POST, "$URI/{$ID_FIELD}/validate"),
            /**
             * Upload an Integration's assets
             */
            Route(Method.POST, "$URI/{$ID_FIELD}/upload"),
            /**
             * Activate an Integration
             */
            Route(Method.PUT, "$URI/{$ID_FIELD}/activate"),
        )
    }

    override fun prepareRequest(request: RestRequest?, client: NodeClient?): RestChannelConsumer {
        requireNotNull(request)
        log.debug("Received: ${request.path()}")
        // it's a little confused, but it's got the spirit
        return RestChannelConsumer {
            it.sendResponse(BytesRestResponse(RestStatus.NOT_IMPLEMENTED, "{\"error\": \"${request.path()} not implemented\"}"))
        }
    }
}

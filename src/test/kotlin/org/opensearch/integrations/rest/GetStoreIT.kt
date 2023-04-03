package org.opensearch.integrations.rest

import org.opensearch.integrations.IntegrationsPlugin
import org.opensearch.integrations.PluginRestTestCase
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestStatus

class GetStoreIT: PluginRestTestCase() {
    fun `test get all stores`() {
        // TODO not implemented
        executeRequest(
            RestRequest.Method.GET.name,
            "${IntegrationsPlugin.BASE_INTEGRATIONS_URI}/store",
            "",
            RestStatus.NOT_IMPLEMENTED.status
        )
    }
}

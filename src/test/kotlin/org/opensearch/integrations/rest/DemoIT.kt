package org.opensearch.integrations.rest

import org.junit.Assert
import org.opensearch.observability.ObservabilityPlugin
import org.opensearch.observability.PluginRestTestCase
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestStatus

class DemoIT : PluginRestTestCase() {
    fun `test get full list`() {
        val requestBody = ""
        val response = executeRequest(
            RestRequest.Method.GET.name,
            "${ObservabilityPlugin.BASE_INTEGRATIONS_URI}/store/list_all",
            requestBody,
            RestStatus.OK.status
        )
        Assert.assertEquals(response.get("integrations").asJsonArray.size(), 1)
        Thread.sleep(100)
    }

    fun `test add`() {
        val requestBody = """{"name":"integration"}"""
        val response = executeRequest(
            RestRequest.Method.POST.name,
            "${ObservabilityPlugin.BASE_INTEGRATIONS_URI}/store",
            requestBody,
            RestStatus.OK.status
        )
        Assert.assertEquals("96847220-5261-44d0-89b4-65f3a659f13a", response.get("objectId").asString)
        Thread.sleep(100)
    }

    fun `test get added list`() {
        val requestBody = ""
        executeRequest(
            RestRequest.Method.GET.name,
            "${ObservabilityPlugin.BASE_INTEGRATIONS_URI}/store/list_added",
            requestBody,
            RestStatus.OK.status
        )
        Thread.sleep(100)
        executeRequest(
            RestRequest.Method.POST.name,
            "${ObservabilityPlugin.BASE_INTEGRATIONS_URI}/store",
            "{\"name\":\"sample_integration\",\"description\":\"This is a sample integration\"}",
            RestStatus.OK.status
        )
        Thread.sleep(100)
        val response = executeRequest(
            RestRequest.Method.GET.name,
            "${ObservabilityPlugin.BASE_INTEGRATIONS_URI}/store/list_added",
            requestBody,
            RestStatus.OK.status
        )
        Assert.assertEquals(response.get("list").asJsonArray.size(), 1)
        Thread.sleep(100)
    }

    fun `test get integration details`() {
        val requestBody = ""
        val response = executeRequest(
            RestRequest.Method.GET.name,
            "${ObservabilityPlugin.BASE_INTEGRATIONS_URI}/store/details",
            requestBody,
            RestStatus.OK.status
        )
        Assert.assertEquals(response.get("status").asString, "READY")
        Thread.sleep(100)
    }
}

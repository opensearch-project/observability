/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.integrations.rest

import org.junit.Assert
import org.opensearch.integrations.PluginRestTestCase
import org.opensearch.observability.ObservabilityPlugin.Companion.BASE_INTEGRATIONS_URI
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestStatus
import java.time.Instant

class GetObjectIT : PluginRestTestCase() {
    private fun createObject(createRequest: String): String {
        val createResponse = executeRequest(
            RestRequest.Method.POST.name,
            "$BASE_INTEGRATIONS_URI/object",
            createRequest,
            RestStatus.OK.status
        )
        val id = createResponse.get("objectId").asString
        Assert.assertNotNull("Id should be generated", id)
        Thread.sleep(100)
        return id
    }


    fun `test get multiple objects`() {
        val emptyResponse = executeRequest(
            RestRequest.Method.GET.name,
            "$BASE_INTEGRATIONS_URI/store",
            "",
            RestStatus.OK.status
        )
        Assert.assertEquals(0, emptyResponse.get("totalHits").asInt)

    }
}

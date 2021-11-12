/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.rest

import org.junit.Assert
import org.opensearch.observability.ObservabilityPlugin.Companion.BASE_OBSERVABILITY_URI
import org.opensearch.observability.PluginRestTestCase
import org.opensearch.observability.constructNotebookRequest
import org.opensearch.observability.constructOperationalPanelRequest
import org.opensearch.observability.constructSavedQueryRequest
import org.opensearch.observability.constructSavedVisualizationRequest
import org.opensearch.observability.constructTimestampRequest
import org.opensearch.observability.jsonify
import org.opensearch.observability.validateErrorResponse
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestStatus

class CreateObjectIT : PluginRestTestCase() {

    fun `test create notebook fail`() {
        val invalidCreateResponse = executeRequest(
            RestRequest.Method.POST.name,
            "$BASE_OBSERVABILITY_URI/object",
            "",
            RestStatus.BAD_REQUEST.status
        )
        validateErrorResponse(invalidCreateResponse, RestStatus.BAD_REQUEST.status, "parse_exception")
        Thread.sleep(100)
    }

    fun `test create notebook`() {
        val createRequest = constructNotebookRequest()
        val createResponse = executeRequest(
            RestRequest.Method.POST.name,
            "$BASE_OBSERVABILITY_URI/object",
            createRequest,
            RestStatus.OK.status
        )
        val id = createResponse.get("objectId").asString
        Assert.assertNotNull("Id should be generated", id)
        Thread.sleep(100)
    }

    fun `test create saved query with id`() {
        val createRequest = jsonify(constructSavedQueryRequest())
        createRequest.addProperty("objectId", "testId")

        val createResponse = executeRequest(
            RestRequest.Method.POST.name,
            "$BASE_OBSERVABILITY_URI/object",
            createRequest.toString(),
            RestStatus.OK.status
        )
        val id = createResponse.get("objectId").asString
        Assert.assertEquals("testId", id)
        Thread.sleep(100)
    }

    fun `test create saved visualization`() {
        val createRequest = constructSavedVisualizationRequest()
        val createResponse = executeRequest(
            RestRequest.Method.POST.name,
            "$BASE_OBSERVABILITY_URI/object",
            createRequest,
            RestStatus.OK.status
        )
        val id = createResponse.get("objectId").asString
        Assert.assertNotNull("Id should be generated", id)
        Thread.sleep(100)
    }

    fun `test create operational panel`() {
        val createRequest = constructOperationalPanelRequest()
        val createResponse = executeRequest(
            RestRequest.Method.POST.name,
            "$BASE_OBSERVABILITY_URI/object",
            createRequest,
            RestStatus.OK.status
        )
        val id = createResponse.get("objectId").asString
        Assert.assertNotNull("Id should be generated", id)
        Thread.sleep(100)
    }

    fun `test create timestamp with id`() {
        val createRequest = constructTimestampRequest("test-index")
        val createResponse = executeRequest(
            RestRequest.Method.POST.name,
            "$BASE_OBSERVABILITY_URI/object",
            createRequest,
            RestStatus.OK.status
        )
        val id = createResponse.get("objectId").asString
        Assert.assertEquals("test-index", id)
        Thread.sleep(100)
    }

    fun `test create object with extra fields`() {
        val createRequest = """
            {
                "timestamp": {
                    "name": "test-timestamp",
                    "index": "opensearch_dashboards_sample_data_logs",
                    "type": "timestamp",
                    "dsl_type": "date",
                    "unknown-field": "unused"
                },
                "unknown-field": "unused"
            }
        """.trimIndent()
        val createResponse = executeRequest(
            RestRequest.Method.POST.name,
            "$BASE_OBSERVABILITY_URI/object",
            createRequest,
            RestStatus.OK.status
        )
        val id = createResponse.get("objectId").asString
        Assert.assertNotNull("Id should be generated", id)
        Thread.sleep(100)
    }

    fun `test create object with invalid fields`() {
        val createRequest = """
            {
                "invalid-object": {
                    "name": "invalid"
                }
            }
        """.trimIndent()
        val createResponse = executeRequest(
            RestRequest.Method.POST.name,
            "$BASE_OBSERVABILITY_URI/object",
            createRequest,
            RestStatus.BAD_REQUEST.status
        )
        validateErrorResponse(createResponse, RestStatus.BAD_REQUEST.status, "illegal_argument_exception")
        Thread.sleep(100)
    }
}

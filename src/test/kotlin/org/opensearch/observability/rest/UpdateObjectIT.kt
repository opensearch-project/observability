/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.rest

import org.junit.Assert
import org.opensearch.core.rest.RestStatus
import org.opensearch.observability.ObservabilityPlugin.Companion.BASE_OBSERVABILITY_URI
import org.opensearch.observability.PluginRestTestCase
import org.opensearch.observability.constructNotebookRequest
import org.opensearch.observability.validateErrorResponse
import org.opensearch.rest.RestRequest

class UpdateObjectIT : PluginRestTestCase() {
    private fun createNotebook(name: String = "test"): String {
        val notebookCreateRequest = constructNotebookRequest(name)
        val notebookCreateResponse = executeRequest(
            RestRequest.Method.POST.name,
            "$BASE_OBSERVABILITY_URI/object",
            notebookCreateRequest,
            RestStatus.OK.status
        )
        val notebookId = notebookCreateResponse.get("objectId").asString
        Assert.assertNotNull("notebookId should be generated", notebookId)
        Thread.sleep(100)
        return notebookId
    }

    fun `test update invalid object`() {
        val updateRequest = constructNotebookRequest()
        val updateResponse = executeRequest(
            RestRequest.Method.PUT.name,
            "$BASE_OBSERVABILITY_URI/object/does-not-exist",
            updateRequest,
            RestStatus.NOT_FOUND.status
        )
        validateErrorResponse(updateResponse, RestStatus.NOT_FOUND.status)
    }

    fun `test update object`() {
        val id = createNotebook()

        val newName = "updated_name"
        val updateRequest = constructNotebookRequest(newName)
        val updateResponse = executeRequest(
            RestRequest.Method.PUT.name,
            "$BASE_OBSERVABILITY_URI/object/$id",
            updateRequest,
            RestStatus.OK.status
        )
        Assert.assertNotNull(id, updateResponse.get("objectId").asString)
        Thread.sleep(100)

        val getResponse = executeRequest(
            RestRequest.Method.GET.name,
            "$BASE_OBSERVABILITY_URI/object/$id",
            "",
            RestStatus.OK.status
        )
        val objectDetails = getResponse.get("observabilityObjectList").asJsonArray.get(0).asJsonObject
        Assert.assertEquals(id, objectDetails.get("objectId").asString)
        Assert.assertEquals(
            newName,
            objectDetails.get("notebook").asJsonObject.get("name").asString
        )
        Thread.sleep(100)
    }

    fun `test update object with invalid request`() {
        val id = createNotebook()

        val updateRequest = """
            {
                "invalid-object": {
                    "name": "invalid"
                }
            }
        """.trimIndent()
        val updateResponse = executeRequest(
            RestRequest.Method.PUT.name,
            "$BASE_OBSERVABILITY_URI/object/$id",
            updateRequest,
            RestStatus.BAD_REQUEST.status
        )
        validateErrorResponse(updateResponse, RestStatus.BAD_REQUEST.status, "illegal_argument_exception")
        Thread.sleep(100)
    }
}

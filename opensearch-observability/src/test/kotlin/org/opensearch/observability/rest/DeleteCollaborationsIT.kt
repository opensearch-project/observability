/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.rest

import org.junit.Assert
import org.opensearch.observability.ObservabilityPlugin.Companion.BASE_COLLABORATION_URI
import org.opensearch.observability.PluginRestTestCase
import org.opensearch.observability.constructCollaborationRequest
import org.opensearch.observability.validateErrorResponse
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestStatus

class DeleteCollaborationsIT : PluginRestTestCase() {
    private fun createCollaboration(name: String = "test"): String {
        val collaborationCreateRequest = constructCollaborationRequest()
        val collaborationCreateResponse = executeRequest(
            RestRequest.Method.POST.name,
            "$BASE_COLLABORATION_URI/collaborations",
            collaborationCreateRequest,
            RestStatus.OK.status
        )
        val collaborationId = collaborationCreateResponse.get("collaborationId").asString
        Assert.assertNotNull("collaborationId should be generated", collaborationId)
        Thread.sleep(100)
        return collaborationId
    }

    fun `test delete invalid ids`() {
        val invalidDeleteIdResponse = executeRequest(
            RestRequest.Method.DELETE.name,
            "$BASE_COLLABORATION_URI/collaborations/does_not_exist_id",
            "",
            RestStatus.NOT_FOUND.status
        )
        validateErrorResponse(invalidDeleteIdResponse, RestStatus.NOT_FOUND.status)
        Thread.sleep(100)

        val invalidDeleteIdsResponse = executeRequest(
            RestRequest.Method.DELETE.name,
            "$BASE_COLLABORATION_URI/collaborations/invalid_id_1,invalid_id_2",
            "",
            RestStatus.NOT_FOUND.status
        )
        validateErrorResponse(invalidDeleteIdsResponse, RestStatus.NOT_FOUND.status)
        Thread.sleep(100)
    }

    fun `test delete single collaboration definition object`() {
        val id = createCollaboration()
        val deleteResponse = executeRequest(
            RestRequest.Method.DELETE.name,
            "$BASE_COLLABORATION_URI/collaborations/$id",
            "",
            RestStatus.OK.status
        )
        Assert.assertEquals(
            "OK",
            deleteResponse.get("deleteResponseList").asJsonObject.get(id).asString
        )
        Thread.sleep(100)
    }

    fun `test delete multiple collaboration definition object`() {
        val ids: Set<String> = (1..20).map { createCollaboration() }.toSet()
        Thread.sleep(1000)
        val deleteResponse = executeRequest(
            RestRequest.Method.DELETE.name,
            "$BASE_COLLABORATION_URI/collaborations/${ids.joinToString(separator = ",")}",
            "",
            RestStatus.OK.status
        )
        val deletedObject = deleteResponse.get("deleteResponseList").asJsonObject
        ids.forEach {
            Assert.assertEquals("OK", deletedObject.get(it).asString)
        }
        Thread.sleep(100)
    }
}

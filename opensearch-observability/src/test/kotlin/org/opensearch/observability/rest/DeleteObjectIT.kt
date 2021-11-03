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

/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 *
 */

package org.opensearch.observability.rest

import org.junit.Assert
import org.opensearch.observability.ObservabilityPlugin.Companion.BASE_OBSERVABILITY_URI
import org.opensearch.observability.PluginRestTestCase
import org.opensearch.observability.constructNotebookRequest
import org.opensearch.observability.validateErrorResponse
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestStatus

class DeleteObjectIT : PluginRestTestCase() {
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

    fun `test delete invalid ids`() {
        val invalidDeleteIdResponse = executeRequest(
            RestRequest.Method.DELETE.name,
            "$BASE_OBSERVABILITY_URI/object/does-not-exist",
            "",
            RestStatus.NOT_FOUND.status
        )
        validateErrorResponse(invalidDeleteIdResponse, RestStatus.NOT_FOUND.status)
        Thread.sleep(100)

        val invalidDeleteIdsResponse = executeRequest(
            RestRequest.Method.DELETE.name,
            "$BASE_OBSERVABILITY_URI/object?objectIdList=does-not-exist1,does-not-exist2",
            "",
            RestStatus.NOT_FOUND.status
        )
        validateErrorResponse(invalidDeleteIdsResponse, RestStatus.NOT_FOUND.status)
        Thread.sleep(100)
    }

    fun `test delete single object`() {
        val id = createNotebook()
        val deleteResponse = executeRequest(
            RestRequest.Method.DELETE.name,
            "$BASE_OBSERVABILITY_URI/object/$id",
            "",
            RestStatus.OK.status
        )
        Assert.assertEquals(
            "OK",
            deleteResponse.get("deleteResponseList").asJsonObject.get(id).asString
        )
        Thread.sleep(100)
    }

    fun `test delete multiple objects`() {
        val ids: Set<String> = (1..20).map { createNotebook() }.toSet()
        Thread.sleep(1000)
        val deleteResponse = executeRequest(
            RestRequest.Method.DELETE.name,
            "$BASE_OBSERVABILITY_URI/object?objectIdList=${ids.joinToString(separator = ",")}",
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

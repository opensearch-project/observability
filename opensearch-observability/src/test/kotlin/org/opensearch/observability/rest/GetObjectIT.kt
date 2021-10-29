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
import org.opensearch.observability.jsonify
import org.opensearch.observability.validateErrorResponse
import org.opensearch.observability.validateTimeRecency
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestStatus
import java.time.Instant

class GetObjectIT : PluginRestTestCase() {
    private fun createObject(createRequest: String): String {
        val createResponse = executeRequest(
            RestRequest.Method.POST.name,
            "$BASE_OBSERVABILITY_URI/object",
            createRequest,
            RestStatus.OK.status
        )
        val id = createResponse.get("objectId").asString
        Assert.assertNotNull("Id should be generated", id)
        Thread.sleep(100)
        return id
    }

    fun `test get invalid ids`() {
        val getResponse = executeRequest(
            RestRequest.Method.GET.name,
            "$BASE_OBSERVABILITY_URI/object/invalid-id",
            "",
            RestStatus.NOT_FOUND.status
        )
        validateErrorResponse(getResponse, RestStatus.NOT_FOUND.status)
        Thread.sleep(100)

        val getIdsResponse = executeRequest(
            RestRequest.Method.GET.name,
            "$BASE_OBSERVABILITY_URI/object?objectIdList=invalid-id1,invalid-id2",
            "",
            RestStatus.NOT_FOUND.status
        )
        validateErrorResponse(getIdsResponse, RestStatus.NOT_FOUND.status)
        Thread.sleep(100)
    }

    fun `test get single object`() {
        val createRequest = constructNotebookRequest()
        val id = createObject(createRequest)

        val getResponse = executeRequest(
            RestRequest.Method.GET.name,
            "$BASE_OBSERVABILITY_URI/object/$id",
            "",
            RestStatus.OK.status
        )
        val objectDetails = getResponse.get("observabilityObjectList").asJsonArray.get(0).asJsonObject
        Assert.assertEquals(id, objectDetails.get("objectId").asString)
        Assert.assertEquals(
            jsonify(createRequest).get("notebook").asJsonObject,
            objectDetails.get("notebook").asJsonObject
        )
        validateTimeRecency(Instant.ofEpochMilli(objectDetails.get("lastUpdatedTimeMs").asLong))
        validateTimeRecency(Instant.ofEpochMilli(objectDetails.get("createdTimeMs").asLong))
        Thread.sleep(100)
    }

    fun `test get multiple objects`() {
        val emptyResponse = executeRequest(
            RestRequest.Method.GET.name,
            "$BASE_OBSERVABILITY_URI/object",
            "",
            RestStatus.OK.status
        )
        Assert.assertEquals(0, emptyResponse.get("totalHits").asInt)

        val ids = Array(5) { createObject(constructNotebookRequest()) }
        Thread.sleep(1000)

        val getAllResponse = executeRequest(
            RestRequest.Method.GET.name,
            "$BASE_OBSERVABILITY_URI/object",
            "",
            RestStatus.OK.status
        )
        Assert.assertEquals(5, getAllResponse.get("totalHits").asInt)
        val notebooksList = getAllResponse.get("observabilityObjectList").asJsonArray
        Assert.assertArrayEquals(
            ids,
            notebooksList.map { it.asJsonObject.get("objectId").asString }.toTypedArray()
        )
    }
}

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
import org.opensearch.observability.constructOperationalPanelRequest
import org.opensearch.observability.constructSavedQueryRequest
import org.opensearch.observability.constructSavedVisualizationRequest
import org.opensearch.observability.constructTimestampRequest
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

        val startTime = Instant.now().toEpochMilli()
        val notebookIds = Array(4) { createObject(constructNotebookRequest("notebook-$it")) }
        val savedQueryIds = Array(6) { createObject(constructSavedQueryRequest("saved-query-$it")) }
        val savedVisualizationIds =
            Array(3) { createObject(constructSavedVisualizationRequest("saved-visualization-$it")) }
        val operationalPanelIds = Array(7) { createObject(constructOperationalPanelRequest("operational-panel-$it")) }
        val timestampIds = Array(5) { createObject(constructTimestampRequest("timestamp-$it")) }
        val endTime = Instant.now().toEpochMilli()
        Thread.sleep(1000)

        val getAllResponse = executeRequest(
            RestRequest.Method.GET.name,
            "$BASE_OBSERVABILITY_URI/object?maxItems=1000",
            "",
            RestStatus.OK.status
        )
        Assert.assertEquals(25, getAllResponse.get("totalHits").asInt)

        val getNotebooksResponse = executeRequest(
            RestRequest.Method.GET.name,
            "$BASE_OBSERVABILITY_URI/object?objectType=notebook",
            "",
            RestStatus.OK.status
        )
        Assert.assertEquals(4, getNotebooksResponse.get("totalHits").asInt)
        val notebooksList = getNotebooksResponse.get("observabilityObjectList").asJsonArray
        Assert.assertArrayEquals(
            notebookIds,
            notebooksList.map { it.asJsonObject.get("objectId").asString }.toTypedArray()
        )

        val getMultipleTypesResponse = executeRequest(
            RestRequest.Method.GET.name,
            "$BASE_OBSERVABILITY_URI/object?objectType=savedQuery,savedVisualization",
            "",
            RestStatus.OK.status
        )
        Assert.assertEquals(9, getMultipleTypesResponse.get("totalHits").asInt)
        val multipleTypesList = getMultipleTypesResponse.get("observabilityObjectList").asJsonArray
        Assert.assertArrayEquals(
            savedQueryIds.plus(savedVisualizationIds),
            multipleTypesList.map { it.asJsonObject.get("objectId").asString }.toTypedArray()
        )

        val getMultipleIdsResponse = executeRequest(
            RestRequest.Method.GET.name,
            "$BASE_OBSERVABILITY_URI/object?objectIdList=${operationalPanelIds.joinToString(",")}",
            "",
            RestStatus.OK.status
        )
        Assert.assertEquals(7, getMultipleIdsResponse.get("totalHits").asInt)
        val multipleIdsList = getMultipleIdsResponse.get("observabilityObjectList").asJsonArray
        Assert.assertArrayEquals(
            operationalPanelIds,
            multipleIdsList.map { it.asJsonObject.get("objectId").asString }.toTypedArray()
        )

        val getNameResponse = executeRequest(
            RestRequest.Method.GET.name,
            "$BASE_OBSERVABILITY_URI/object?name=timestamp",
            "",
            RestStatus.OK.status
        )
        Assert.assertEquals(5, getNameResponse.get("totalHits").asInt)
        val timestampList = getNameResponse.get("observabilityObjectList").asJsonArray
        Assert.assertArrayEquals(
            timestampIds,
            timestampList.map { it.asJsonObject.get("objectId").asString }.toTypedArray()
        )

        val getTimeResponse = executeRequest(
            RestRequest.Method.GET.name,
            "$BASE_OBSERVABILITY_URI/object?createdTimeMs=$startTime..$endTime",
            "",
            RestStatus.OK.status
        )
        Assert.assertEquals(25, getTimeResponse.get("totalHits").asInt)
        val objectList = getTimeResponse.get("observabilityObjectList").asJsonArray
        Assert.assertArrayEquals(
            notebookIds.plus(savedQueryIds).plus(savedVisualizationIds).plus(operationalPanelIds).plus(timestampIds),
            objectList.map { it.asJsonObject.get("objectId").asString }.toTypedArray()
        )
    }
}

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.action

import org.apache.lucene.search.TotalHits
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.opensearch.commons.utils.recreateObject
import org.opensearch.observability.constructSampleObservabilityObjectDoc
import org.opensearch.observability.createObjectFromJsonString
import org.opensearch.observability.getJsonString
import org.opensearch.observability.model.ObservabilityObjectSearchResult
import java.time.Instant

internal class GetObservabilityObjectResponseTests {

    private fun assertSearchResultEquals(
        expected: ObservabilityObjectSearchResult,
        actual: ObservabilityObjectSearchResult
    ) {
        assertEquals(expected.startIndex, actual.startIndex)
        assertEquals(expected.totalHits, actual.totalHits)
        assertEquals(expected.totalHitRelation, actual.totalHitRelation)
        assertEquals(expected.objectListFieldName, actual.objectListFieldName)
        assertEquals(expected.objectList, actual.objectList)
    }

    @Test
    fun `Search result serialize and deserialize with config object should be equal`() {
        val sampleObservabilityObjectDoc = constructSampleObservabilityObjectDoc()
        val searchResult = ObservabilityObjectSearchResult(sampleObservabilityObjectDoc)
        val searchResponse = GetObservabilityObjectResponse(searchResult, false)
        val recreatedObject = recreateObject(searchResponse) { GetObservabilityObjectResponse(it) }
        assertSearchResultEquals(searchResult, recreatedObject.searchResult)
    }

    @Test
    fun `Search result serialize and deserialize with multiple config object should be equal`() {
        val objectInfo1 = constructSampleObservabilityObjectDoc("test 1", "test-id-1")
        val objectInfo2 = constructSampleObservabilityObjectDoc("test 2", "test-id-2")
        val searchResult = ObservabilityObjectSearchResult(
            100,
            1000,
            TotalHits.Relation.GREATER_THAN_OR_EQUAL_TO,
            listOf(objectInfo1, objectInfo2)
        )
        val searchResponse = GetObservabilityObjectResponse(searchResult, false)
        val recreatedObject = recreateObject(searchResponse) { GetObservabilityObjectResponse(it) }
        assertSearchResultEquals(searchResult, recreatedObject.searchResult)
    }

    @Test
    fun `Search result serialize and deserialize using json object object should be equal`() {
        val objectInfo = constructSampleObservabilityObjectDoc()
        val searchResult = ObservabilityObjectSearchResult(objectInfo)
        val searchResponse = GetObservabilityObjectResponse(searchResult, false)
        val jsonString = getJsonString(searchResponse)
        val recreatedObject = createObjectFromJsonString(jsonString) { GetObservabilityObjectResponse.parse(it) }
        assertSearchResultEquals(searchResult, recreatedObject.searchResult)
    }

    @Test
    fun `Search result serialize and deserialize using json with multiple object object should be equal`() {
        val objectInfo1 = constructSampleObservabilityObjectDoc("test 1", "test-id-1")
        val objectInfo2 = constructSampleObservabilityObjectDoc("test 2", "test-id-2")
        val searchResult = ObservabilityObjectSearchResult(
            100,
            1000,
            TotalHits.Relation.GREATER_THAN_OR_EQUAL_TO,
            listOf(objectInfo1, objectInfo2)
        )
        val searchResponse = GetObservabilityObjectResponse(searchResult, false)
        val jsonString = getJsonString(searchResponse)
        val recreatedObject = createObjectFromJsonString(jsonString) { GetObservabilityObjectResponse.parse(it) }
        assertSearchResultEquals(searchResult, recreatedObject.searchResult)
    }

    @Test
    fun `Search result should safely ignore extra field in json object`() {
        val objectInfo = constructSampleObservabilityObjectDoc()
        val searchResult = ObservabilityObjectSearchResult(objectInfo)
        val jsonString = """
        {
            "startIndex":"0",
            "totalHist":"1",
            "totalHitRelation":"eq",
            "observabilityObjectList":[
                {
                    "objectId":"test-id",
                    "lastUpdatedTimeMs":1638482208790,
                    "createdTimeMs":1638482208790,
                    "tenant":"test-tenant",
                    "access":["test-access"],
                    "type":"timestamp",
                    "timestamp":{
                        "name":"test object",
                        "index":"opensearch_dashboards_sample_data_logs",
                        "type":"timestamp",
                        "dsl_type":"date"
                    }
                }
            ],
            "extra_field_1":["extra", "value"],
            "extra_field_2":{"extra":"value"},
            "extra_field_3":"extra value 3"
        }
        """.trimIndent()
        val recreatedObject = createObjectFromJsonString(jsonString) { GetObservabilityObjectResponse.parse(it) }
        assertSearchResultEquals(searchResult, recreatedObject.searchResult)
    }

    @Test
    fun `Search result should safely fallback to default if startIndex, totalHits or totalHitRelation field absent in json object`() {
        val objectInfo = constructSampleObservabilityObjectDoc()
        val searchResult = ObservabilityObjectSearchResult(objectInfo)
        val jsonString = """
        {
            "observabilityObjectList":[
                {
                    "objectId":"test-id",
                    "lastUpdatedTimeMs":1638482208790,
                    "createdTimeMs":1638482208790,
                    "tenant":"test-tenant",
                    "access":["test-access"],
                    "type":"timestamp",
                    "timestamp":{
                        "name":"test object",
                        "index":"opensearch_dashboards_sample_data_logs",
                        "type":"timestamp",
                        "dsl_type":"date"
                    }
                }
            ]
        }
        """.trimIndent()
        val recreatedObject = createObjectFromJsonString(jsonString) { GetObservabilityObjectResponse.parse(it) }
        assertSearchResultEquals(searchResult, recreatedObject.searchResult)
    }

    @Test
    fun `Search result should throw exception if notificationConfigs is absent in json`() {
        val lastUpdatedTimeMs = Instant.ofEpochMilli(Instant.now().toEpochMilli())
        val createdTimeMs = lastUpdatedTimeMs.minusSeconds(1000)
        val jsonString = """
        {
            "startIndex":"0",
            "totalHist":"1",
            "totalHitRelation":"eq",
            "observabilityObjectList":[
                {
                    "objectId":"object-Id",
                    "lastUpdatedTimeMs":"${lastUpdatedTimeMs.toEpochMilli()}",
                    "createdTimeMs":"${createdTimeMs.toEpochMilli()}"
                }
            ]
        }
        """.trimIndent()
        Assertions.assertThrows(IllegalArgumentException::class.java) {
            createObjectFromJsonString(jsonString) { GetObservabilityObjectResponse.parse(it) }
        }
    }
}

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.action

import com.fasterxml.jackson.core.JsonParseException
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.opensearch.commons.utils.recreateObject
import org.opensearch.observability.createObjectFromJsonString
import org.opensearch.observability.getJsonString
import org.opensearch.observability.model.ObservabilityObjectType
import org.opensearch.search.sort.SortOrder
import java.util.EnumSet

internal class GetObservabilityObjectRequestTests {
    private fun assertGetRequestEquals(
        expected: GetObservabilityObjectRequest,
        actual: GetObservabilityObjectRequest
    ) {
        assertEquals(expected.objectIds, actual.objectIds)
        assertEquals(expected.types, actual.types)
        assertEquals(expected.fromIndex, actual.fromIndex)
        assertEquals(expected.maxItems, actual.maxItems)
        assertEquals(expected.sortField, actual.sortField)
        assertEquals(expected.sortOrder, actual.sortOrder)
        assertEquals(expected.filterParams, actual.filterParams)
    }

    @Test
    fun `Get request serialize and deserialize transport object should be equal`() {
        val objectRequest = GetObservabilityObjectRequest(
            setOf("test-id"),
            EnumSet.noneOf(ObservabilityObjectType::class.java),
            0,
            10,
            "sortField",
            SortOrder.DESC,
            mapOf(Pair("filterKey", "filterValue"))
        )
        val recreatedObject = recreateObject(objectRequest) { GetObservabilityObjectRequest(it) }
        assertGetRequestEquals(objectRequest, recreatedObject)
    }

    @Test
    fun `Get request serialize and deserialize using json object should be equal`() {
        val objectRequest = GetObservabilityObjectRequest(
            setOf("test-id"),
            EnumSet.noneOf(ObservabilityObjectType::class.java),
            0,
            10,
            "sortField",
            SortOrder.DESC,
            mapOf(Pair("filterKey", "filterValue"))
        )
        val jsonString = getJsonString(objectRequest)
        val recreatedObject = createObjectFromJsonString(jsonString) { GetObservabilityObjectRequest.parse(it) }
        assertGetRequestEquals(objectRequest, recreatedObject)
    }

    @Test
    fun `Get request with all field should deserialize json object using parser`() {
        val objectRequest = GetObservabilityObjectRequest(
            setOf("test-id"),
            EnumSet.noneOf(ObservabilityObjectType::class.java),
            10,
            100,
            "sortField",
            SortOrder.DESC,
            mapOf(
                Pair("filterKey1", "filterValue1"),
                Pair("filterKey2", "true"),
                Pair("filterKey3", "filter,Value,3"),
                Pair("filterKey4", "4")
            )
        )
        val jsonString = """
        {
            "objectIdList":["${objectRequest.objectIds.first()}"],
            "fromIndex":"10",
            "maxItems":"100",
            "sortField":"sortField",
            "sortOrder":"desc",
            "filterParamList": {
                "filterKey1":"filterValue1",
                "filterKey2":"true",
                "filterKey3":"filter,Value,3",
                "filterKey4":"4"
            }
        }
        """.trimIndent()
        val recreatedObject = createObjectFromJsonString(jsonString) { GetObservabilityObjectRequest.parse(it) }
        assertGetRequestEquals(objectRequest, recreatedObject)
    }

    @Test
    fun `Get request with only object_id field should deserialize json object using parser`() {
        val objectRequest = GetObservabilityObjectRequest(objectIds = setOf("test-id"))
        val jsonString = """
        {
            "objectIdList":["${objectRequest.objectIds.first()}"]
        }
        """.trimIndent()
        val recreatedObject = createObjectFromJsonString(jsonString) { GetObservabilityObjectRequest.parse(it) }
        assertGetRequestEquals(objectRequest, recreatedObject)
    }

    @Test
    fun `Get request with only fromIndex field should deserialize json object using parser`() {
        val objectRequest = GetObservabilityObjectRequest(fromIndex = 20)
        val jsonString = """
        {
            "fromIndex":"20"
        }
        """.trimIndent()
        val recreatedObject = createObjectFromJsonString(jsonString) { GetObservabilityObjectRequest.parse(it) }
        assertGetRequestEquals(objectRequest, recreatedObject)
    }

    @Test
    fun `Get request with only maxItems field should deserialize json object using parser`() {
        val objectRequest = GetObservabilityObjectRequest(maxItems = 100)
        val jsonString = """
        {
            "maxItems":"100"
        }
        """.trimIndent()
        val recreatedObject = createObjectFromJsonString(jsonString) { GetObservabilityObjectRequest.parse(it) }
        assertGetRequestEquals(objectRequest, recreatedObject)
    }

    @Test
    fun `Get request with only sortField field should deserialize json object using parser`() {
        val objectRequest = GetObservabilityObjectRequest(sortField = "sample_sortField")
        val jsonString = """
        {
            "sortField":"sample_sortField"
        }
        """.trimIndent()
        val recreatedObject = createObjectFromJsonString(jsonString) { GetObservabilityObjectRequest.parse(it) }
        assertGetRequestEquals(objectRequest, recreatedObject)
    }

    @Test
    fun `Get request with only sortOrder=asc field should deserialize json object using parser`() {
        val objectRequest = GetObservabilityObjectRequest(sortOrder = SortOrder.ASC)
        val jsonString = """
        {
            "sortOrder":"asc"
        }
        """.trimIndent()
        val recreatedObject = createObjectFromJsonString(jsonString) { GetObservabilityObjectRequest.parse(it) }
        assertGetRequestEquals(objectRequest, recreatedObject)
    }

    @Test
    fun `Get request with only sortOrder=ASC field should deserialize json object using parser`() {
        val objectRequest = GetObservabilityObjectRequest(sortOrder = SortOrder.ASC)
        val jsonString = """
        {
            "sortOrder":"ASC"
        }
        """.trimIndent()
        val recreatedObject = createObjectFromJsonString(jsonString) { GetObservabilityObjectRequest.parse(it) }
        assertGetRequestEquals(objectRequest, recreatedObject)
    }

    @Test
    fun `Get request with only sortOrder=desc field should deserialize json object using parser`() {
        val objectRequest = GetObservabilityObjectRequest(sortOrder = SortOrder.DESC)
        val jsonString = """
        {
            "sortOrder":"desc"
        }
        """.trimIndent()
        val recreatedObject = createObjectFromJsonString(jsonString) { GetObservabilityObjectRequest.parse(it) }
        assertGetRequestEquals(objectRequest, recreatedObject)
    }

    @Test
    fun `Get request with only sortOrder=DESC field should deserialize json object using parser`() {
        val objectRequest = GetObservabilityObjectRequest(sortOrder = SortOrder.DESC)
        val jsonString = """
        {
            "sortOrder":"DESC"
        }
        """.trimIndent()
        val recreatedObject = createObjectFromJsonString(jsonString) { GetObservabilityObjectRequest.parse(it) }
        assertGetRequestEquals(objectRequest, recreatedObject)
    }

    @Test
    fun `Get request with invalid sortOrder should throw exception`() {
        val jsonString = """
        {
            "sortOrder":"descending"
        }
        """.trimIndent()
        assertThrows<IllegalArgumentException> {
            createObjectFromJsonString(jsonString) { GetObservabilityObjectRequest.parse(it) }
        }
    }

    @Test
    fun `Get request with only filterParamList field should deserialize json object using parser`() {
        val objectRequest = GetObservabilityObjectRequest(
            filterParams = mapOf(
                Pair("filterKey1", "filterValue1"),
                Pair("filterKey2", "true"),
                Pair("filterKey3", "filter,Value,3"),
                Pair("filterKey4", "4")
            )
        )
        val jsonString = """
        {
            "filterParamList": {
                "filterKey1":"filterValue1",
                "filterKey2":"true",
                "filterKey3":"filter,Value,3",
                "filterKey4":"4"
            }
        }
        """.trimIndent()
        val recreatedObject = createObjectFromJsonString(jsonString) { GetObservabilityObjectRequest.parse(it) }
        assertGetRequestEquals(objectRequest, recreatedObject)
    }

    @Test
    fun `Get request no field should deserialize json object using parser`() {
        val objectRequest = GetObservabilityObjectRequest()
        val jsonString = """
        {
        }
        """.trimIndent()
        val recreatedObject = createObjectFromJsonString(jsonString) { GetObservabilityObjectRequest.parse(it) }
        assertGetRequestEquals(objectRequest, recreatedObject)
    }

    @Test
    fun `Get request should throw exception when invalid json object is passed`() {
        val jsonString = "sample message"
        assertThrows<JsonParseException> {
            createObjectFromJsonString(jsonString) { GetObservabilityObjectRequest.parse(it) }
        }
    }

    @Test
    fun `Get request should safely ignore extra field in json object`() {
        val objectRequest = GetObservabilityObjectRequest(objectIds = setOf("test-id"))
        val jsonString = """
        {
            "objectIdList":["${objectRequest.objectIds.first()}"],
            "extra_field_1":["extra", "value"],
            "extra_field_2":{"extra":"value"},
            "extra_field_3":"extra value 3"
        }
        """.trimIndent()
        val recreatedObject = createObjectFromJsonString(jsonString) { GetObservabilityObjectRequest.parse(it) }
        assertGetRequestEquals(objectRequest, recreatedObject)
    }
}

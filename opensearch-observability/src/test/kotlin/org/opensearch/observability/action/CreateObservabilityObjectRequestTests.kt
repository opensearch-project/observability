/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.action

import com.fasterxml.jackson.core.JsonParseException
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.opensearch.commons.utils.recreateObject
import org.opensearch.observability.createObjectFromJsonString
import org.opensearch.observability.getJsonString
import org.opensearch.observability.model.ObservabilityObjectType
import org.opensearch.observability.model.Timestamp

internal class CreateObservabilityObjectRequestTests {
    private val sampleTimestamp = Timestamp(
        "test-timestamp",
        "opensearch_dashboards_sample_data_logs",
        "timestamp",
        "date"
    )
    private val objectRequest =
        CreateObservabilityObjectRequest("test-id", ObservabilityObjectType.TIMESTAMP, sampleTimestamp)

    @Test
    fun `Create object serialize and deserialize transport object should be equal`() {
        val recreatedObject = recreateObject(objectRequest) { CreateObservabilityObjectRequest(it) }
        assertNull(recreatedObject.validate())
        assertEquals(objectRequest.objectData, recreatedObject.objectData)
    }

    @Test
    fun `Create object serialize and deserialize using json object should be equal`() {
        val jsonString = getJsonString(objectRequest)
        val recreatedObject = createObjectFromJsonString(jsonString) { CreateObservabilityObjectRequest.parse(it) }
        assertEquals(objectRequest.objectData, recreatedObject.objectData)
    }

    @Test
    fun `Create object should deserialize json object using parser`() {
        val jsonString =
            "{\"timestamp\":{\"name\":\"test-timestamp\",\"index\":\"opensearch_dashboards_sample_data_logs\",\"type\":\"timestamp\",\"dsl_type\":\"date\"}}"
        val recreatedObject = createObjectFromJsonString(jsonString) { CreateObservabilityObjectRequest.parse(it) }
        assertEquals(sampleTimestamp, recreatedObject.objectData)
    }

    @Test
    fun `Create object should throw exception when invalid json object is passed`() {
        val jsonString = "sample message"
        assertThrows<JsonParseException> {
            createObjectFromJsonString(jsonString) { CreateObservabilityObjectRequest.parse(it) }
        }
    }

    @Test
    fun `Create object should safely ignore extra field in json object`() {
        val jsonString =
            "{\"timestamp\":{\"name\":\"test-timestamp\",\"index\":\"opensearch_dashboards_sample_data_logs\",\"type\":\"timestamp\",\"dsl_type\":\"date\",\"another\":\"field\"}}"
        val recreatedObject = createObjectFromJsonString(jsonString) { CreateObservabilityObjectRequest.parse(it) }
        assertEquals(sampleTimestamp, recreatedObject.objectData)
    }
}

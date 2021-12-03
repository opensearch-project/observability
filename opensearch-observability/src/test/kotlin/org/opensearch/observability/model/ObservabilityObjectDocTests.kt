/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.model

import com.fasterxml.jackson.core.JsonParseException
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.opensearch.commons.utils.recreateObject
import org.opensearch.observability.constructSampleObservabilityObjectDoc
import org.opensearch.observability.createObjectFromJsonString
import org.opensearch.observability.getJsonString

internal class ObservabilityObjectDocTests {
    private val sampleObservabilityObjectDoc = constructSampleObservabilityObjectDoc()

    @Test
    fun `ObservabilityObjectDoc serialize and deserialize transport object should be equal`() {
        val recreatedObject = recreateObject(sampleObservabilityObjectDoc) { ObservabilityObjectDoc(it) }
        assertEquals(sampleObservabilityObjectDoc, recreatedObject)
    }

    @Test
    fun `ObservabilityObjectDoc serialize and deserialize using json object should be equal`() {
        val jsonString = getJsonString(sampleObservabilityObjectDoc, RestTag.REST_OUTPUT_PARAMS)
        val recreatedObject = createObjectFromJsonString(jsonString) { ObservabilityObjectDoc.parse(it) }
        assertEquals(sampleObservabilityObjectDoc, recreatedObject)
    }

    @Test
    fun `ObservabilityObjectDoc should deserialize json object using parser`() {
        val jsonString =
            "{\"objectId\":\"test-id\",\"lastUpdatedTimeMs\":1638482208790,\"createdTimeMs\":1638482208790,\"tenant\":\"test-tenant\",\"access\":[\"test-access\"],\"timestamp\":{\"name\":\"test object\",\"index\":\"opensearch_dashboards_sample_data_logs\",\"type\":\"timestamp\",\"dsl_type\":\"date\"}}"
        val recreatedObject = createObjectFromJsonString(jsonString) { ObservabilityObjectDoc.parse(it) }
        assertEquals(sampleObservabilityObjectDoc, recreatedObject)
    }

    @Test
    fun `ObservabilityObjectDoc should throw exception when invalid json object is passed`() {
        val jsonString = "sample message"
        assertThrows<JsonParseException> {
            createObjectFromJsonString(jsonString) { ObservabilityObjectDoc.parse(it) }
        }
    }

    @Test
    fun `ObservabilityObjectDoc should safely ignore extra field in json object`() {
        val jsonString =
            "{\"objectId\":\"test-id\",\"lastUpdatedTimeMs\":1638482208790,\"createdTimeMs\":1638482208790,\"tenant\":\"test-tenant\",\"access\":[\"test-access\"],\"timestamp\":{\"name\":\"test object\",\"index\":\"opensearch_dashboards_sample_data_logs\",\"type\":\"timestamp\",\"dsl_type\":\"date\"},\"another\":\"field\"}"
        val recreatedObject = createObjectFromJsonString(jsonString) { ObservabilityObjectDoc.parse(it) }
        assertEquals(sampleObservabilityObjectDoc, recreatedObject)
    }
}

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
import org.opensearch.observability.createObjectFromJsonString
import org.opensearch.observability.getJsonString

internal class TimestampTests {
    private val sampleTimestamp = Timestamp(
        "test-timestamp",
        "opensearch_dashboards_sample_data_logs",
        "timestamp",
        "date"
    )

    @Test
    fun `Timestamp serialize and deserialize transport object should be equal`() {
        val recreatedObject = recreateObject(sampleTimestamp) { Timestamp(it) }
        assertEquals(sampleTimestamp, recreatedObject)
    }

    @Test
    fun `Timestamp serialize and deserialize using json object should be equal`() {
        val jsonString = getJsonString(sampleTimestamp)
        val recreatedObject = createObjectFromJsonString(jsonString) { Timestamp.parse(it) }
        assertEquals(sampleTimestamp, recreatedObject)
    }

    @Test
    fun `Timestamp should deserialize json object using parser`() {
        val jsonString =
            "{\"name\":\"test-timestamp\",\"index\":\"opensearch_dashboards_sample_data_logs\",\"type\":\"timestamp\",\"dsl_type\":\"date\"}"
        val recreatedObject = createObjectFromJsonString(jsonString) { Timestamp.parse(it) }
        assertEquals(sampleTimestamp, recreatedObject)
    }

    @Test
    fun `Timestamp should throw exception when invalid json object is passed`() {
        val jsonString = "sample message"
        assertThrows<JsonParseException> {
            createObjectFromJsonString(jsonString) { Timestamp.parse(it) }
        }
    }

    @Test
    fun `Timestamp should safely ignore extra field in json object`() {
        val jsonString =
            "{\"name\":\"test-timestamp\",\"index\":\"opensearch_dashboards_sample_data_logs\",\"type\":\"timestamp\",\"dsl_type\":\"date\",\"another\":\"field\"}"
        val recreatedObject = createObjectFromJsonString(jsonString) { Timestamp.parse(it) }
        assertEquals(sampleTimestamp, recreatedObject)
    }
}

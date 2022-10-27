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

internal class SavedVisualizationTests {
    private val sampleSavedVisualization = SavedVisualization(
        "test-saved-visualization",
        "test description",
        "source=index | where utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00')",
        "bar",
        SavedQuery.SelectedDateRange(
            "now/15m",
            "now",
            "utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00')"
        ),
        SavedQuery.Token("utc_time", "timestamp"),
        SavedQuery.SelectedFields(
            "| fields clientip, bytes, memory, host",
            listOf(SavedQuery.Token("utc_time", "timestamp"))
        ),
        "KE1Ie34BbsTr-CsB4G6Y",
        "{\"dataConfig\":\"{}\",\"layoutConfig\":\"{}\"}",
        "metric",
        "hours (h)",
        SavedQuery.SelectedLabels(
            "| fields clientip, bytes, memory, host",
            listOf(SavedQuery.Label("utc_time", "timestamp"))
        )
    )

    @Test
    fun `SavedVisualization serialize and deserialize transport object should be equal`() {
        val recreatedObject = recreateObject(sampleSavedVisualization) { SavedVisualization(it) }
        assertEquals(sampleSavedVisualization, recreatedObject)
    }

    @Test
    fun `SavedVisualization serialize and deserialize using json object should be equal`() {
        val jsonString = getJsonString(sampleSavedVisualization)
        val recreatedObject = createObjectFromJsonString(jsonString) { SavedVisualization.parse(it) }
        assertEquals(sampleSavedVisualization, recreatedObject)
    }

    @Test
    fun `SavedVisualization should deserialize json object using parser`() {
        val jsonString =
            "{\"name\":\"test-saved-visualization\",\"description\":\"test description\",\"query\":\"source=index | where utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00')\",\"type\":\"bar\",\"selected_date_range\":{\"start\":\"now/15m\",\"end\":\"now\",\"text\":\"utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00')\"},\"selected_timestamp\":{\"name\":\"utc_time\",\"type\":\"timestamp\"},\"selected_fields\":{\"text\":\"| fields clientip, bytes, memory, host\",\"tokens\":[{\"name\":\"utc_time\",\"type\":\"timestamp\"}]},\"application_id\":\"KE1Ie34BbsTr-CsB4G6Y\",\"user_configs\":\"{\\\"dataConfig\\\":\\\"{}\\\",\\\"layoutConfig\\\":\\\"{}\\\"}\"}"
        val recreatedObject = createObjectFromJsonString(jsonString) { SavedVisualization.parse(it) }
        assertEquals(sampleSavedVisualization, recreatedObject)
    }

    @Test
    fun `SavedVisualization should throw exception when invalid json object is passed`() {
        val jsonString = "sample message"
        assertThrows<JsonParseException> {
            createObjectFromJsonString(jsonString) { SavedVisualization.parse(it) }
        }
    }

    @Test
    fun `SavedVisualization should safely ignore extra field in json object`() {
        val jsonString =
            "{\"name\":\"test-saved-visualization\",\"description\":\"test description\",\"query\":\"source=index | where utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00')\",\"type\":\"bar\",\"selected_date_range\":{\"start\":\"now/15m\",\"end\":\"now\",\"text\":\"utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00')\"},\"selected_timestamp\":{\"name\":\"utc_time\",\"type\":\"timestamp\"},\"selected_fields\":{\"text\":\"| fields clientip, bytes, memory, host\",\"tokens\":[{\"name\":\"utc_time\",\"type\":\"timestamp\"}]},\"application_id\":\"KE1Ie34BbsTr-CsB4G6Y\",\"user_configs\":\"{\\\"dataConfig\\\":\\\"{}\\\",\\\"layoutConfig\\\":\\\"{}\\\"}\"}"
        val recreatedObject = createObjectFromJsonString(jsonString) { SavedVisualization.parse(it) }
        assertEquals(sampleSavedVisualization, recreatedObject)
    }
}

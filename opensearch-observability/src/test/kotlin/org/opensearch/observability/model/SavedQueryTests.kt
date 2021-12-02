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

internal class SavedQueryTests {
    private val sampleSavedQuery = SavedQuery(
        "test-saved-query",
        "test description",
        "source=index | where utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00')",
        SavedQuery.SelectedDateRange(
            "now/15m",
            "now",
            "utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00')"
        ),
        SavedQuery.Token("utc_time", "timestamp"),
        SavedQuery.SelectedFields(
            "| fields clientip, bytes, memory, host",
            listOf(SavedQuery.Token("utc_time", "timestamp"))
        )
    )

    @Test
    fun `SavedQuery serialize and deserialize transport object should be equal`() {
        val recreatedObject = recreateObject(sampleSavedQuery) { SavedQuery(it) }
        assertEquals(sampleSavedQuery, recreatedObject)
    }

    @Test
    fun `SavedQuery serialize and deserialize using json object should be equal`() {
        val jsonString = getJsonString(sampleSavedQuery)
        val recreatedObject = createObjectFromJsonString(jsonString) { SavedQuery.parse(it) }
        assertEquals(sampleSavedQuery, recreatedObject)
    }

    @Test
    fun `SavedQuery should deserialize json object using parser`() {
        val jsonString =
            "{\"name\":\"test-saved-query\",\"description\":\"test description\",\"query\":\"source=index | where utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00')\",\"selected_date_range\":{\"start\":\"now/15m\",\"end\":\"now\",\"text\":\"utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00')\"},\"selected_timestamp\":{\"name\":\"utc_time\",\"type\":\"timestamp\"},\"selected_fields\":{\"text\":\"| fields clientip, bytes, memory, host\",\"tokens\":[{\"name\":\"utc_time\",\"type\":\"timestamp\"}]}}"
        val recreatedObject = createObjectFromJsonString(jsonString) { SavedQuery.parse(it) }
        assertEquals(sampleSavedQuery, recreatedObject)
    }

    @Test
    fun `SavedQuery should throw exception when invalid json object is passed`() {
        val jsonString = "sample message"
        assertThrows<JsonParseException> {
            createObjectFromJsonString(jsonString) { SavedQuery.parse(it) }
        }
    }

    @Test
    fun `SavedQuery should safely ignore extra field in json object`() {
        val jsonString =
            "{\"name\":\"test-saved-query\",\"description\":\"test description\",\"query\":\"source=index | where utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00')\",\"selected_date_range\":{\"start\":\"now/15m\",\"end\":\"now\",\"text\":\"utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00')\"},\"selected_timestamp\":{\"name\":\"utc_time\",\"type\":\"timestamp\"},\"selected_fields\":{\"text\":\"| fields clientip, bytes, memory, host\",\"tokens\":[{\"name\":\"utc_time\",\"type\":\"timestamp\"}]},\"another\":\"field\"}"
        val recreatedObject = createObjectFromJsonString(jsonString) { SavedQuery.parse(it) }
        assertEquals(sampleSavedQuery, recreatedObject)
    }
}

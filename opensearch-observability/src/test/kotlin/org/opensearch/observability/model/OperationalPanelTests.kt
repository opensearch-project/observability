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

internal class OperationalPanelTests {
    private val sampleOperationalPanel = OperationalPanel(
        "test-operational-panel",
        listOf(
            OperationalPanel.Visualization(
                "panelViz_7ba28e34-6fd8-489d-9b9f-1f83e006fb17",
                "oyuecXwBYVazWqOOde0o",
                0,
                0,
                10,
                10
            )
        ),
        OperationalPanel.TimeRange("now", "now-1d"),
        OperationalPanel.QueryFilter("| where Carrier='OpenSearch-Air'", "ppl")
    )

    @Test
    fun `OperationalPanel serialize and deserialize transport object should be equal`() {
        val recreatedObject = recreateObject(sampleOperationalPanel) { OperationalPanel(it) }
        assertEquals(sampleOperationalPanel, recreatedObject)
    }

    @Test
    fun `OperationalPanel serialize and deserialize using json object should be equal`() {
        val jsonString = getJsonString(sampleOperationalPanel)
        val recreatedObject = createObjectFromJsonString(jsonString) { OperationalPanel.parse(it) }
        assertEquals(sampleOperationalPanel, recreatedObject)
    }

    @Test
    fun `OperationalPanel should deserialize json object using parser`() {
        val jsonString =
            "{\"name\":\"test-operational-panel\",\"visualizations\":[{\"id\":\"panelViz_7ba28e34-6fd8-489d-9b9f-1f83e006fb17\"," +
                "\"savedVisualizationId\":\"oyuecXwBYVazWqOOde0o\",\"x\":0,\"y\":0,\"w\":10,\"h\":10}],\"timeRange\":{\"to\":" +
                "\"now\",\"from\":\"now-1d\"},\"queryFilter\":{\"query\":\"| where Carrier='OpenSearch-Air'\",\"language\":\"ppl\"}}"
        val recreatedObject = createObjectFromJsonString(jsonString) { OperationalPanel.parse(it) }
        assertEquals(sampleOperationalPanel, recreatedObject)
    }

    @Test
    fun `OperationalPanel should throw exception when invalid json object is passed`() {
        val jsonString = "sample message"
        assertThrows<JsonParseException> {
            createObjectFromJsonString(jsonString) { OperationalPanel.parse(it) }
        }
    }

    @Test
    fun `OperationalPanel should safely ignore extra field in json object`() {
        val jsonString =
            "{\"name\":\"test-operational-panel\",\"visualizations\":[{\"id\":\"panelViz_7ba28e34-6fd8-489d-9b9f-1f83e006fb17\",\"" +
                "savedVisualizationId\":\"oyuecXwBYVazWqOOde0o\",\"x\":0,\"y\":0,\"w\":10,\"h\":10}],\"timeRange\":{\"to\":\"now\"," +
                "\"from\":\"now-1d\"},\"queryFilter\":{\"query\":\"| where Carrier='OpenSearch-Air'\",\"language\":\"ppl\"},\"another\":\"field\"}"
        val recreatedObject = createObjectFromJsonString(jsonString) { OperationalPanel.parse(it) }
        assertEquals(sampleOperationalPanel, recreatedObject)
    }
}

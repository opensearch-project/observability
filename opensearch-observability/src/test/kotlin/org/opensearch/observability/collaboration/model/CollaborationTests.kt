/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.collaboration.model

import com.fasterxml.jackson.core.JsonParseException
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.opensearch.commons.utils.recreateObject
import org.opensearch.observability.collaboration.model.Collaboration.TextInfo
import org.opensearch.observability.createObjectFromJsonString
import org.opensearch.observability.getJsonString

internal class CollaborationTests {
    private val sampleCollaboration = Collaboration(
        CollaborationDataType.TEXT,
        listOf("dev", "test"),
        false,
        TextInfo("bcdbhbk56dcd", "5c4cds6c6cd", "298d6eewcecwcdewcc")
    )

    @Test
    fun `Collaboration serialize and deserialize transport object should be equal`() {
        val recreatedObject = recreateObject(sampleCollaboration) { Collaboration(it) }
        assertEquals(sampleCollaboration, recreatedObject)
    }

    @Test
    fun `Collaboration serialize and deserialize using json object should be equal`() {
        val jsonString = getJsonString(sampleCollaboration)
        val recreatedObject = createObjectFromJsonString(jsonString) { Collaboration.parse(it) }
        assertEquals(sampleCollaboration, recreatedObject)
    }

    @Test
    fun `Collaboration should deserialize json object using parser`() {
        val jsonString =
            "{\"type\":\"TEXT\",\"text\":{\"pageId\":\"bcdbhbk56dcd\",\"paragraphId\":\"5c4cds6c6cd\",\"lineId\":\"298d6eewcecwcdewcc\"},\"tags\":[\"dev\",\"test\"],\"resolved\":false}"
        val recreatedObject = createObjectFromJsonString(jsonString) { Collaboration.parse(it) }
        assertEquals(sampleCollaboration, recreatedObject)
    }

    @Test
    fun `Collaboration should throw exception when invalid json object is passed`() {
        val jsonString = "sample message"
        assertThrows<JsonParseException> {
            createObjectFromJsonString(jsonString) { Collaboration.parse(it) }
        }
    }

    @Test
    fun `Collaboration should safely ignore extra field in json object`() {
        val jsonString =
            "{\"type\":\"TEXT\",\"text\":{\"pageId\":\"bcdbhbk56dcd\",\"paragraphId\":\"5c4cds6c6cd\",\"lineId\":\"298d6eewcecwcdewcc\"},\"name\":\"Abbas\",\"tags\":[\"dev\",\"test\"],\"resolved\":false}"
        val recreatedObject = createObjectFromJsonString(jsonString) { Collaboration.parse(it) }
        assertEquals(sampleCollaboration, recreatedObject)
    }
}

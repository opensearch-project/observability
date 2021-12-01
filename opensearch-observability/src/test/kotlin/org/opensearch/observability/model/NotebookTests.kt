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
import java.net.MalformedURLException

internal class NotebookTests {
    private val sampleNotebook = Notebook("test-notebook", "2021-12-01T18:33:40.017Z", "2021-12-01T18:33:40.017Z", "Default", listOf(Notebook.Paragraph(listOf(Notebook.Output("sample paragraph", "MARKDOWN", "0 ms")), Notebook.Input("%md sample paragraph", "MARKDOWN"), "2021-12-01T18:33:40.017Z", "2021-12-01T18:33:40.017Z", "paragraph_bcd3c65c-91db-489d-b667-496fd378714e")))

    @Test
    fun `Notebook serialize and deserialize transport object should be equal`() {
        val recreatedObject = recreateObject(sampleNotebook) { Notebook(it) }
        assertEquals(sampleNotebook, recreatedObject)
    }

    @Test
    fun `Notebook serialize and deserialize using json object should be equal`() {
        val jsonString = getJsonString(sampleNotebook)
        val recreatedObject = createObjectFromJsonString(jsonString) { Notebook.parse(it) }
        assertEquals(sampleNotebook, recreatedObject)
    }

    @Test
    fun `Notebook should deserialize json object using parser`() {
        val jsonString = "{ \"name\" : \"test-notebook\", \"dateCreated\" : \"2021-12-01T18:33:40.017Z\", \"dateModified\" : \"2021-12-01T18:33:40.017Z\", \"backend\" : \"Default\", \"paragraphs\" : [ { \"output\" : [ { \"result\" : \"sample paragraph\", \"outputType\" : \"MARKDOWN\", \"execution_time\" : \"0 ms\" } ], \"input\" : { \"inputText\" : \"%md sample paragraph\", \"inputType\" : \"MARKDOWN\" }, \"dateCreated\" : \"2021-12-01T18:33:40.017Z\", \"dateModified\" : \"2021-12-01T18:33:40.017Z\", \"id\" : \"paragraph_bcd3c65c-91db-489d-b667-496fd378714e\" } ] }"
        val recreatedObject = createObjectFromJsonString(jsonString) { Notebook.parse(it) }
        assertEquals(sampleNotebook, recreatedObject)
    }

    @Test
    fun `Notebook should throw exception when invalid json object is passed`() {
        val jsonString = "sample message"
        assertThrows<JsonParseException> {
            createObjectFromJsonString(jsonString) { Notebook.parse(it) }
        }
    }

    @Test
    fun `Notebook should safely ignore extra field in json object`() {
        val jsonString = "{ \"name\" : \"test-notebook\", \"dateCreated\" : \"2021-12-01T18:33:40.017Z\", \"dateModified\" : \"2021-12-01T18:33:40.017Z\", \"backend\" : \"Default\", \"paragraphs\" : [ { \"output\" : [ { \"result\" : \"sample paragraph\", \"outputType\" : \"MARKDOWN\", \"execution_time\" : \"0 ms\" } ], \"input\" : { \"inputText\" : \"%md sample paragraph\", \"inputType\" : \"MARKDOWN\" }, \"dateCreated\" : \"2021-12-01T18:33:40.017Z\", \"dateModified\" : \"2021-12-01T18:33:40.017Z\", \"id\" : \"paragraph_bcd3c65c-91db-489d-b667-496fd378714e\" } ]}"
        val recreatedObject = createObjectFromJsonString(jsonString) { Notebook.parse(it) }
        assertEquals(sampleNotebook, recreatedObject)
    }
}
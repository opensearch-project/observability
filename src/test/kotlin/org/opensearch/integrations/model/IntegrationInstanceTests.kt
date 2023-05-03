package org.opensearch.integrations.model

import com.fasterxml.jackson.core.JsonParseException
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.opensearch.commons.utils.recreateObject
import org.opensearch.observability.createObjectFromJsonString
import org.opensearch.observability.getJsonString
import org.opensearch.observability.model.SavedQuery
import kotlin.test.assertEquals

class IntegrationInstanceTests {
    private val sampleIntegrationInstance = IntegrationInstance(
        "sample_integration",
        "This is a sample integration"
    )

    @Test
    fun `Integration serialize and deserialize transport object should be equal`() {
        val recreated = recreateObject(sampleIntegrationInstance) { IntegrationInstance(it) }
        assertEquals(sampleIntegrationInstance, recreated)
    }

    @Test
    fun `Integration serialize and deserialize using json object should be equal`() {
        val jsonString = getJsonString(sampleIntegrationInstance)
        val recreatedObject = createObjectFromJsonString(jsonString) { IntegrationInstance.parse(it) }
        assertEquals(sampleIntegrationInstance, recreatedObject)
    }

    @Test
    fun `Integration should deserialize json object using parser`() {
        val jsonString =
            "{\"name\":\"sample_integration\",\"description\":\"This is a sample integration\"}"
        val recreatedObject = createObjectFromJsonString(jsonString) { IntegrationInstance.parse(it) }
        assertEquals(sampleIntegrationInstance, recreatedObject)
    }

    @Test
    fun `Integration should throw exception when invalid json object is passed`() {
        val jsonString = "sample message"
        assertThrows<JsonParseException> {
            createObjectFromJsonString(jsonString) { SavedQuery.parse(it) }
        }
    }

    @Test
    fun `Integration should safely ignore extra field in json object`() {
        val jsonString = "{\"name\":\"sample_integration\",\"description\":\"This is a sample integration\",\"extra\":true}"
        val recreatedObject = createObjectFromJsonString(jsonString) { IntegrationInstance.parse(it) }
        assertEquals(sampleIntegrationInstance, recreatedObject)
    }
}

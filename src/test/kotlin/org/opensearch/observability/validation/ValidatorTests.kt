package org.opensearch.observability.validation

import com.fasterxml.jackson.core.JsonParseException
import com.worldturner.medeia.api.ValidationFailedException
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.opensearch.common.Strings
import org.opensearch.common.xcontent.json.JsonXContent
import java.io.File

internal class ValidatorTests {
    private fun buildIntegration(with: Map<String, Any> = mapOf(), without: Set<String> = setOf()): String {
        val defaults = mapOf(
            Pair("name", "test"),
            Pair("description", "This is a test integration config"),
            Pair("identification", "12345"),
            Pair("categories", listOf("cat1", "cat2")),
            Pair("collection", emptyList<String>()),
            Pair("Repository", mapOf(
                Pair("url", "https://example.com/")
            )),
            Pair("version", mapOf(
                Pair("integration", "0.0.1"),
                Pair("schema", "0.0.1"),
                Pair("resource", "0.0.1"),
            ))
        )
        val builder = JsonXContent.contentBuilder()
        builder.startObject()
        for (entry in defaults.entries) {
            if (without.contains(entry.key)) {
                continue
            }
            if (!with.contains(entry.key)) {
                builder.field(entry.key, entry.value)
                continue
            }
            builder.field(entry.key, with[entry.key])
        }
        builder.endObject()
        return Strings.toString(builder)
    }

    @Test
    fun testConfigInvalidJson() {
        val config = "{"
        val validator = Validator(IntegrationComponent.INTEGRATION)
        assertThrows<JsonParseException> {
            validator.validate(config).getOrThrow()
        }
    }

    @Test
    fun testValidatorSampleIntegrations() {
        val sampleFiles = mapOf(
            Pair(IntegrationComponent.APPLICATION, "application.json"),
            Pair(IntegrationComponent.DATASOURCE, "datasource.json"),
            Pair(IntegrationComponent.INDEX_PATTERN, "index-pattern.json"),
            Pair(IntegrationComponent.INTEGRATION, "integration.json"),
            Pair(IntegrationComponent.NOTEBOOK, "notebook.json"),
            Pair(IntegrationComponent.OPERATIONAL_PANEL, "operationalPanel.json"),
            Pair(IntegrationComponent.SAVED_QUERY, "savedQuery.json"),
            Pair(IntegrationComponent.VISUALIZATION, "visualization.json")
        )
        for (component in IntegrationComponent.values()) {
            val validator = Validator(component)
            val sampleDir = component.resourcePath.substring(0, component.resourcePath.lastIndexOf("/")) + "/samples/"
            val samplePath = sampleDir + sampleFiles[component]
            val sampleJson = File(samplePath).readText(Charsets.UTF_8)
            validator.validate(sampleJson).getOrThrow()
        }
    }

    @Test
    fun testValidatorMissingField() {
        val config = buildIntegration(without=setOf("name"))
        val validator = Validator(IntegrationComponent.INTEGRATION)
        assertThrows<ValidationFailedException> {
            validator.validate(config).getOrThrow()
        }
    }

    @Test
    fun testValidatorWrongFieldType() {
        val config = buildIntegration(mapOf(Pair("name", 1)))
        val validator = Validator(IntegrationComponent.INTEGRATION)
        assertThrows<ValidationFailedException> {
            validator.validate(config).getOrThrow()
        }
    }
}

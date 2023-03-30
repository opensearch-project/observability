package org.opensearch.integrations.validation

import org.junit.jupiter.api.Test
import org.opensearch.common.Strings
import org.opensearch.common.xcontent.json.JsonXContent
import org.opensearch.integrations.validation.schema.system.SystemComponent
import java.io.File
import kotlin.test.assertIs

internal class ValidatorTests {
    private fun buildIntegration(with: Map<String, Any> = mapOf(), without: Set<String> = setOf()): String {
        val defaults = mapOf(
            Pair("name", "test"),
            Pair("description", "This is a test integration config"),
            Pair("identification", "12345"),
            Pair("categories", listOf("cat1", "cat2")),
            Pair("collection", emptyList<String>()),
            Pair("repository", mapOf(Pair("url", "https://example.com/"))),
            Pair(
                "version",
                mapOf(
                    Pair("integration", "0.0.1"),
                    Pair("schema", "0.0.1"),
                    Pair("resource", "0.0.1"),
                )
            )
        )
        val builder = JsonXContent.contentBuilder()
        builder.startObject()
        for (entry in defaults.entries) {
            when {
                without.contains(entry.key) -> continue
                with.contains(entry.key) -> builder.field(entry.key, with[entry.key])
                else -> builder.field(entry.key, entry.value)
            }
        }
        for (entry in with.entries) {
            if (!defaults.containsKey(entry.key)) {
                builder.field(entry.key, entry.value)
            }
        }
        builder.endObject()
        return Strings.toString(builder)
    }

    @Test
    fun `test config with invalid json fails validation`() {
        val config = "{"
        val validator = Validator(SystemComponent.INTEGRATION)
        assertIs<MalformedJson>(validator.validate(config))
    }

    @Test
    fun `test validator does not flag sample application json`() {
        val component = SystemComponent.APPLICATION
        val validator = Validator(component)
        val jsonPath = "../../../docs/schema/system/samples/application.json"
        val json = File(jsonPath).readText(Charsets.UTF_8)
        assertIs<Success>(validator.validate(json))
    }

    @Test
    fun `test validator does not flag sample datasource json`() {
        val component = SystemComponent.DATASOURCE
        val validator = Validator(component)
        val jsonPath = "../../../docs/schema/system/samples/datasource.json"
        val json = File(jsonPath).readText(Charsets.UTF_8)
        assertIs<Success>(validator.validate(json))
    }

    @Test
    fun `test validator does not flag sample index pattern json`() {
        val component = SystemComponent.INDEX_PATTERN
        val validator = Validator(component)
        val jsonPath = "../../../docs/schema/system/samples/index-pattern.json"
        val json = File(jsonPath).readText(Charsets.UTF_8)
        assertIs<Success>(validator.validate(json))
    }

    @Test
    fun `test validator does not flag sample integration json`() {
        val component = SystemComponent.INTEGRATION
        val validator = Validator(component)
        val jsonPath = "../../../docs/schema/system/samples/integration.json"
        val json = File(jsonPath).readText(Charsets.UTF_8)
        assertIs<Success>(validator.validate(json))
    }

    @Test
    fun `test validator does not flag sample notebook json`() {
        val component = SystemComponent.NOTEBOOK
        val validator = Validator(component)
        val jsonPath = "../../../docs/schema/system/samples/notebook.json"
        val json = File(jsonPath).readText(Charsets.UTF_8)
        assertIs<Success>(validator.validate(json))
    }

    @Test
    fun `test validator does not flag sample operational panel json`() {
        val component = SystemComponent.OPERATIONAL_PANEL
        val validator = Validator(component)
        val jsonPath = "../../../docs/schema/system/samples/operationalPanel.json"
        val json = File(jsonPath).readText(Charsets.UTF_8)
        assertIs<Success>(validator.validate(json))
    }

    @Test
    fun `test validator does not flag sample saved query json`() {
        val component = SystemComponent.SAVED_QUERY
        val validator = Validator(component)
        val jsonPath = "../../../docs/schema/system/samples/savedQuery.json"
        val json = File(jsonPath).readText(Charsets.UTF_8)
        assertIs<Success>(validator.validate(json))
    }

    @Test
    fun `test validator does not flag sample visualization json`() {
        val component = SystemComponent.VISUALIZATION
        val validator = Validator(component)
        val jsonPath = "../../../docs/schema/system/samples/visualization.json"
        val json = File(jsonPath).readText(Charsets.UTF_8)
        assertIs<Success>(validator.validate(json))
    }

    @Test
    fun `test missing json field fails validation`() {
        val config = buildIntegration(without = setOf("name"))
        val validator = Validator(SystemComponent.INTEGRATION)
        assertIs<Rejected>(validator.validate(config))
    }

    @Test
    fun `test json field with wrong type fails validation`() {
        val config = buildIntegration(mapOf(Pair("name", 1)))
        val validator = Validator(SystemComponent.INTEGRATION)
        assertIs<Rejected>(validator.validate(config))
    }

    @Test
    fun `test json with extra field fails validation`() {
        val config = buildIntegration(mapOf(Pair("extra_field", 1)))
        val validator = Validator(SystemComponent.INTEGRATION)
        assertIs<Rejected>(validator.validate(config))
    }
}

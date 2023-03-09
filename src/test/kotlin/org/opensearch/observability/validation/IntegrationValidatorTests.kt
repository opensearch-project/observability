package org.opensearch.observability.validation

import com.fasterxml.jackson.core.JsonParseException
import com.worldturner.medeia.api.ValidationFailedException
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.opensearch.common.Strings
import org.opensearch.common.xcontent.json.JsonXContent

internal class IntegrationValidatorTests {
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
        val validator = IntegrationValidator(config)
        assertThrows<JsonParseException> {
            validator.validate().getOrThrow()
        }
    }

    @Test
    fun testValidatorValidIntegration() {
        val config = buildIntegration()
        val validator = IntegrationValidator(config)
        validator.validate().getOrThrow()
    }

    @Test
    fun testValidatorMissingName() {
        val config = buildIntegration(without=setOf("name"))
        val validator = IntegrationValidator(config)
        assertThrows<ValidationFailedException> {
            validator.validate().getOrThrow()
        }
    }

    @Test
    fun testValidatorNonStringName() {
        val config = buildIntegration(mapOf(Pair("name", 1)))
        val validator = IntegrationValidator(config)
        assertThrows<ValidationFailedException> {
            validator.validate().getOrThrow()
        }
    }
}

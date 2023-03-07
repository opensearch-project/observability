package org.opensearch.observability.validation

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.opensearch.common.Strings
import org.opensearch.common.xcontent.json.JsonXContent

internal class IntegrationValidatorTests {
    private fun buildIntegration(with: Map<String, Any> = mapOf(), without: Set<String> = setOf()): String {
        val defaults = mapOf(
            Pair("name", "test"),
            Pair("desc", "This is a test integration config"),
            Pair("categories", listOf("cat1", "cat2")),
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
        assertThrows<IntegrationValidationException> {
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
    fun testValidatorBlankName() {
        val config = buildIntegration(mapOf(Pair("name", "")))
        val validator = IntegrationValidator(config)
        assertThrows<IntegrationValidationException> {
            validator.validate().getOrThrow()
        }
    }

    @Test
    fun testValidatorMissingName() {
        val config = buildIntegration(without=setOf("name"))
        val validator = IntegrationValidator(config)
        assertThrows<IntegrationValidationException> {
            validator.validate().getOrThrow()
        }
    }

    @Test
    fun testValidatorNonStringName() {
        val config = buildIntegration(mapOf(Pair("name", 1)))
        val validator = IntegrationValidator(config)
        assertThrows<IntegrationValidationException> {
            validator.validate().getOrThrow()
        }
    }
}

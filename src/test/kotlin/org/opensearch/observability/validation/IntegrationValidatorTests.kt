package org.opensearch.observability.validation

import com.fasterxml.jackson.core.JsonParseException
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows

internal class IntegrationValidatorTests {
    @Test
    fun testConfigInvalidJson() {
        val config = "{\"name\": \"test\""
        val validator = IntegrationValidator(config)
        assertThrows<JsonParseException> {
            validator.validate().getOrThrow()
        }
    }

    @Test
    fun testValidatorValidName() {
        val config = "{\"name\": \"test\"}"
        val validator = IntegrationValidator(config)
        validator.validate().getOrThrow()
    }

    @Test
    fun testValidatorBlankName() {
        val config = "{\"name\": \"\"}"
        val validator = IntegrationValidator(config)
        assertThrows<ValidationException> {
            validator.validate().getOrThrow()
        }
    }

    @Test
    fun testValidatorMissingName() {
        val config = "{}"
        val validator = IntegrationValidator(config)
        assertThrows<ValidationException> {
            validator.validate().getOrThrow()
        }
    }

    @Test
    fun testValidatorNonStringName() {
        val config = "{\"name\": 1}"
        val validator = IntegrationValidator(config)
        assertThrows<ValidationException> {
            validator.validate().getOrThrow()
        }
    }
}

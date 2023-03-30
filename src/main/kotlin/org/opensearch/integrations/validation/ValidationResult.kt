package org.opensearch.integrations.validation

import com.fasterxml.jackson.core.JacksonException

sealed class ValidationResult(val isSuccess: Boolean) {
    val isFailure: Boolean
        get() {
            return !this.isSuccess
        }
}

/**
 * Successful validation
 */
class Success: ValidationResult(true)

/**
 * The input JSON was malformed
 */
class MalformedJson: ValidationResult(false)

/**
 * The JSON does not comply with the schema
 */
class Rejected: ValidationResult(false)

/**
 * The schema failed to load
 * This indicates a bug and should not be returned in normal operation
 */
class InvalidSchema: ValidationResult(false)

package org.opensearch.integrations.validation

sealed class ValidationResult(val isSuccess: Boolean) {
    val isFailure: Boolean
        get() {
            return !this.isSuccess
        }
}

/**
 * Successful validation
 */
class Success : ValidationResult(true)

/**
 * The input JSON was malformed
 */
class MalformedJson : ValidationResult(false)

/**
 * The JSON does not comply with the schema
 */
class Rejected : ValidationResult(false)

/**
 * The schema failed to load.
 * This is most likely due to a file IO issue while loading the schema.
 */
class SchemaNotLoaded : ValidationResult(false)

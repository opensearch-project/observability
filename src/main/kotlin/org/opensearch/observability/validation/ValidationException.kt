package org.opensearch.observability.validation

class ValidationException(message: String? = null, cause: Throwable? = null) : Exception(message, cause) {
}

package org.opensearch.observability.validation

class ValidatorException(message: String? = null, cause: Throwable? = null) : RuntimeException(message, cause) {
}

package org.opensearch.observability.validation

import com.fasterxml.jackson.core.JsonParseException
import org.opensearch.common.xcontent.DeprecationHandler
import org.opensearch.common.xcontent.NamedXContentRegistry
import org.opensearch.common.xcontent.json.JsonXContent
import java.lang.Exception
import java.lang.UnsupportedOperationException

class IntegrationValidator(val config: String) {
    private val keyValidators = mapOf(
        "name" to ::validateName
    )

    fun validate(): Result<String> {
        try {
            val configMap = JsonXContent
                .jsonXContent
                .createParser(NamedXContentRegistry.EMPTY, DeprecationHandler.THROW_UNSUPPORTED_OPERATION, config)
                .map()
            for (validator in keyValidators.entries) {
                val item = configMap[validator.key]
                validator.value.invoke(item).getOrThrow()
            }
            return Result.success(
                config
            )
        } catch (ex: Exception) {
            return when (ex) {
                is JsonParseException,
                is UnsupportedOperationException -> Result.failure(ValidationException(cause=ex))
                is ValidationException -> Result.failure(ex)
                else -> throw ex
            }
        }
    }

    private fun validateName(name: Any?): Result<String> {
        if (name == null) {
            return Result.failure(ValidationException("integration key `name` is required, but was not supplied"))
        }
        if (name !is String) {
            return Result.failure(ValidationException("integration key `name` must be String, but was ${name.javaClass}"))
        }
        if (name.isBlank()) {
            return Result.failure(ValidationException("integration key `name` may not be blank"))
        }
        return Result.success(name)
    }
}

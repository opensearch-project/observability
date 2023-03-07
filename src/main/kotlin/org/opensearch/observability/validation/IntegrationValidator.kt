package org.opensearch.observability.validation

import com.fasterxml.jackson.core.JsonParseException
import org.opensearch.common.ValidationException
import org.opensearch.common.xcontent.DeprecationHandler
import org.opensearch.common.xcontent.NamedXContentRegistry
import org.opensearch.common.xcontent.json.JsonXContent
import org.opensearch.commons.utils.logger
import org.opensearch.observability.action.CreateObservabilityObjectRequest
import java.lang.Exception
import java.lang.UnsupportedOperationException
import java.util.*

class IntegrationValidator(val config: String) {
    companion object {
        private val log by logger(IntegrationValidator::class.java)
    }

    private val keyValidators = mapOf(
        "name" to ::validateName,
        "description" to ::validateDesc,
        "categories" to ::validateCategories,
    )

    private fun invalid(message: String? = null, cause: Throwable? = null): IntegrationValidationException {
        when {
            message != null -> log.warn("validation failed: $message")
            cause != null -> log.warn("validation failed due to exception: ${cause.javaClass}")
            else -> log.error("validation failed for unspecified reason")
        }
        return IntegrationValidationException(message, cause)
    }

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
                is UnsupportedOperationException -> Result.failure(invalid(cause=ex))
                is IntegrationValidationException -> Result.failure(ex)
                else -> throw ex
            }
        }
    }

    private fun validateName(name: Any?): Result<String> {
        val nameStr = name as? String
            ?: return Result.failure(invalid("integration `name` is not a string"))
        if (nameStr.isBlank()) {
            return Result.failure(invalid("integration key `name` may not be blank"))
        }
        return Result.success(nameStr.trim())
    }

    private fun validateDesc(desc: Any?): Result<Optional<String>> {
        desc ?: return Result.success(Optional.empty())
        val descStr = desc as? String
            ?: return Result.failure(invalid("integration `description` is present but not a string"))
        return Result.success(Optional.of(descStr))
    }

    private fun validateCategories(categories: Any?): Result<List<String>> {
        val categoryList = categories as? List<*>
            ?: return Result.failure(invalid("integration `categories` is not an array"))
        val categoryStrings = categoryList
            .filterIsInstance<String>()
            .filter { it.isNotBlank() }
            .map { it.trim().lowercase() }
            .takeIf { it.size == categoryList.size }
            ?: return Result.failure(invalid("integration `categories` is not an array of valid strings"))
        return Result.success(categoryStrings)
    }
}

package org.opensearch.observability.validation

import com.fasterxml.jackson.core.JsonFactory
import com.fasterxml.jackson.core.JsonParseException
import com.fasterxml.jackson.databind.JsonMappingException
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.worldturner.medeia.api.UrlSchemaSource
import com.worldturner.medeia.api.ValidationFailedException
import com.worldturner.medeia.api.jackson.MedeiaJacksonApi
import com.worldturner.medeia.schema.validation.SchemaValidator
import org.opensearch.commons.utils.logger

class IntegrationValidator(val config: String) {
    companion object {
        private val log by logger(IntegrationValidator::class.java)
    }

    private val medeiaApi = MedeiaJacksonApi()

    private fun loadSchema(): SchemaValidator {
        val resource = javaClass.getResource("/schema/system/integration.schema")
        resource ?: run {
            log.error("failed to load integration schema resource")
            throw IntegrationValidationException("failed to load integration schema resource")
        }
        val source = UrlSchemaSource(resource)
        return medeiaApi.loadSchema(source)
    }

    private fun invalid(message: String? = null, cause: Throwable? = null): IntegrationValidationException {
        when {
            message != null -> log.warn("validation failed: $message")
            cause != null -> log.warn("validation failed due to exception: ${cause.javaClass}")
            else -> log.error("validation failed for unspecified reason")
        }
        return IntegrationValidationException(message, cause)
    }

    fun validate(): Result<JsonNode> {
        return try {
            val mapper = jacksonObjectMapper()
            val parser = medeiaApi.decorateJsonParser(
                loadSchema(),
                mapper.createParser(config)
            )
            Result.success(parser.readValueAsTree())
        } catch (ex: JsonParseException) {
            Result.failure(ex)
        } catch (ex: IntegrationValidationException) {
            Result.failure(ex)
        } catch (ex: ValidationFailedException) {
            Result.failure(ex)
        }
    }
}

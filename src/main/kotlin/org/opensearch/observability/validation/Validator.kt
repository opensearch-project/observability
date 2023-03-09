package org.opensearch.observability.validation

import com.fasterxml.jackson.core.JsonParseException
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.worldturner.medeia.api.UrlSchemaSource
import com.worldturner.medeia.api.ValidationFailedException
import com.worldturner.medeia.api.jackson.MedeiaJacksonApi
import com.worldturner.medeia.schema.validation.SchemaValidator
import org.opensearch.commons.utils.logger

class Validator(val component: IntegrationComponent) {
    companion object {
        private val log by logger(Validator::class.java)
    }

    private val medeiaApi = MedeiaJacksonApi()

    private fun loadComponentSchema(): SchemaValidator {
        val schemaPath = component.resourcePath
        val resource = javaClass.getResource(schemaPath)
        resource ?: run {
            log.error("failed to load resource '$schemaPath'")
            throw ValidatorException("failed to load resource '$schemaPath'")
        }
        val source = UrlSchemaSource(resource)
        return medeiaApi.loadSchema(source)
    }

    fun validate(json: String): Result<JsonNode> {
        return try {
            val mapper = jacksonObjectMapper()
            val parser = medeiaApi.decorateJsonParser(
                loadComponentSchema(),
                mapper.createParser(json)
            )
            Result.success(parser.readValueAsTree())
        } catch (ex: JsonParseException) {
            Result.failure(ex)
        } catch (ex: ValidatorException) {
            Result.failure(ex)
        } catch (ex: ValidationFailedException) {
            Result.failure(ex)
        }
    }
}

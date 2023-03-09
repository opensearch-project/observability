package org.opensearch.observability.validation

import com.fasterxml.jackson.core.JsonParseException
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.worldturner.medeia.api.PathSchemaSource
import com.worldturner.medeia.api.ValidationFailedException
import com.worldturner.medeia.api.jackson.MedeiaJacksonApi
import com.worldturner.medeia.schema.validation.SchemaValidator
import org.opensearch.commons.utils.logger
import java.io.File
import java.io.FileNotFoundException

class Validator(val component: IntegrationComponent) {
    companion object {
        private val log by logger(Validator::class.java)
    }

    private val medeiaApi = MedeiaJacksonApi()

    private fun loadComponentSchema(): SchemaValidator {
        val schemaFile = File(component.resourcePath)
        if (!schemaFile.exists()) {
            log.fatal("could not find schema '${schemaFile.path}' for component '$component'")
            throw FileNotFoundException("could not find schema '${schemaFile.path}'")
        }
        val schemaSource = PathSchemaSource(schemaFile.toPath())
        return medeiaApi.loadSchema(schemaSource)
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
        } catch (ex: ValidationFailedException) {
            Result.failure(ex)
        }
    }
}

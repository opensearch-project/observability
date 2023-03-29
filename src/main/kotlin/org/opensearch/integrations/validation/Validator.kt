package org.opensearch.integrations.validation

import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.JsonMappingException
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.networknt.schema.JsonSchema
import com.networknt.schema.JsonSchemaFactory
import com.networknt.schema.SpecVersionDetector
import org.opensearch.commons.utils.logger
import org.opensearch.integrations.validation.schema.system.SystemComponent
import java.io.FileNotFoundException
import java.lang.IllegalArgumentException
import java.util.*

/**
 * Validator class for validating schema components.
 * The class is constructed with a Component enum defining the type to validate.
 * The ValidationResult returned by the `validate` method is checked via the `validationMessages` field.
 * If the messages are empty, the component has passed validation.
 */
class Validator(val component: SystemComponent) {
    companion object {
        private val log by logger(Validator::class.java)
    }

    private val mapper = ObjectMapper()

    private fun loadComponentSchema(): Optional<JsonSchema> {
        val schemaResource = this::class.java.getResource(component.resourcePath)?.readText()
        schemaResource ?: run {
            log.fatal("resource for `$component` does not exist")
            return Optional.empty()
        }
        val schemaNode = mapper.readTree(schemaResource)
        val factory = JsonSchemaFactory.getInstance(SpecVersionDetector.detect(schemaNode))
        return Optional.of(factory.getSchema(schemaNode))
    }

    fun validate(json: String): Result<JsonNode> {
        val schema = loadComponentSchema()
        if (schema.isEmpty) {
            return Result.failure(FileNotFoundException("could not load schema for component `$component`"))
        }
        try {
            val node = mapper.readTree(json)
            val result = schema.get().validateAndCollect(node)
            if (result.validationMessages.size > 0) {
                return Result.failure(IllegalArgumentException("validation failed: ${result.validationMessages}"))
            }
            return Result.success(node)
        } catch (ex: JsonMappingException) {
            return Result.failure(ex)
        } catch (ex: JsonProcessingException) {
            return Result.failure(ex)
        }
    }
}

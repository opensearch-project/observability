package org.opensearch.integrations.validation

import com.fasterxml.jackson.core.JacksonException
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

    /**
     * Load the schema corresponding to the validator's configured component.
     * The schema is used to validate a JsonNode's conformity to a given structure.
     *
     * Returns null if the schema could not be loaded.
     * This scenario would indicate a bug in the component configuration and is logged as fatal.
     */
    private fun loadComponentSchema(): JsonSchema? {
        val schemaResource = this::class.java.getResource(component.resourcePath)?.readText()
        schemaResource ?: run {
            log.fatal("resource for `$component` does not exist")
            return null
        }
        val schemaNode = mapper.readTree(schemaResource)
        val factory = JsonSchemaFactory.getInstance(SpecVersionDetector.detect(schemaNode))
        return factory.getSchema(schemaNode)
    }

    /**
     * Validate provided json to see if it is an instance of the configured component.
     * The result is successful is the json matches the schema.
     *
     * Validation could fail due to a misconfigured component, malformed json, or a schema violation.
     * IOExceptions and similar processing exceptions are passed through as-is.
     */
    fun validate(json: String): Result<JsonNode> {
        val schema = loadComponentSchema()
        schema ?: return Result.failure(FileNotFoundException("could not load schema for component `$component`"))
        try {
            val node = mapper.readTree(json)
            val result = schema.validateAndCollect(node)
            if (result.validationMessages.size > 0) {
                return Result.failure(IllegalArgumentException("validation failed: ${result.validationMessages}"))
            }
            return Result.success(node)
        } catch (ex: JacksonException) {
            return Result.failure(ex)
        }
    }
}

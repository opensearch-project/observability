package org.opensearch.integrations.validation

import com.fasterxml.jackson.databind.ObjectMapper
import com.networknt.schema.JsonSchema
import com.networknt.schema.JsonSchemaFactory
import com.networknt.schema.SpecVersionDetector
import com.networknt.schema.ValidationResult
import org.opensearch.commons.utils.logger
import org.opensearch.integrations.validation.schema.system.SystemComponent
import java.io.File
import java.io.FileNotFoundException
import java.lang.RuntimeException

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

    private fun loadComponentSchema(): JsonSchema {
        val schemaResource = this::class.java.getResource(component.resourcePath)?.readText()
        schemaResource ?: run {
            log.fatal("could not load schema for component '$component'")
            throw RuntimeException("could not load schema for component '$component'")
        }
        val schemaNode = mapper.readTree(schemaResource)
        val factory = JsonSchemaFactory.getInstance(SpecVersionDetector.detect(schemaNode))
        return factory.getSchema(schemaNode)
    }

    fun validate(json: String): ValidationResult {
        val schema = loadComponentSchema()
        val node = mapper.readTree(json)
        return schema.validateAndCollect(node)
    }
}

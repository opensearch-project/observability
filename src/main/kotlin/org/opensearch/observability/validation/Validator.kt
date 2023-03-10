package org.opensearch.observability.validation

import com.fasterxml.jackson.databind.ObjectMapper
import com.networknt.schema.JsonSchema
import com.networknt.schema.JsonSchemaFactory
import com.networknt.schema.SpecVersionDetector
import com.networknt.schema.ValidationResult
import org.opensearch.commons.utils.logger
import org.opensearch.observability.validation.schema.system.SystemComponent
import java.io.File
import java.io.FileNotFoundException

class Validator(val component: SystemComponent) {
    companion object {
        private val log by logger(Validator::class.java)
    }

    private val mapper = ObjectMapper()

    private fun loadComponentSchema(): JsonSchema {
        val schemaFile = File(component.resourcePath)
        if (!schemaFile.exists()) {
            log.fatal("could not find schema '${schemaFile.path}' for component '$component'")
            throw FileNotFoundException("could not find schema '${schemaFile.path}'")
        }
        val schemaSource = schemaFile.readText(Charsets.UTF_8)
        val schemaNode = mapper.readTree(schemaSource)
        val factory = JsonSchemaFactory.getInstance(SpecVersionDetector.detect(schemaNode))
        return factory.getSchema(schemaNode)
    }

    fun validate(json: String): ValidationResult {
        val schema = loadComponentSchema()
        val node = mapper.readTree(json)
        return schema.validateAndCollect(node)
    }
}

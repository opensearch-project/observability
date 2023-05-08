package org.opensearch.integrations.util

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.opensearch.common.xcontent.json.JsonXContent
import org.opensearch.core.xcontent.DeprecationHandler
import org.opensearch.core.xcontent.NamedXContentRegistry
import org.opensearch.core.xcontent.XContentParser
import java.io.ByteArrayInputStream

class FieldParserTests {
    @Test
    fun `test single field is parsed`() {
        val parser = createParser("""{"name": "foo"}""")
        val fields = FieldParser.parseFields(parser)
        assertEquals(mapOf(FieldName.Name to "foo"), fields)
    }

    @Test
    fun `test parse multiple fields are parsed`() {
        val parser = createParser("""{"name": "foo", "description": "bar"}""")
        val fields = FieldParser.parseFields(parser)
        assertEquals(
            mapOf(
                FieldName.Name to "foo",
                FieldName.Description to "bar"
            ),
            fields
        )
    }

    @Test
    fun `test parse unknown field is ignored`() {
        val parser = createParser("""{"name": "foo", "unknown": "bar"}""")
        val fields = FieldParser.parseFields(parser)
        assertEquals(mapOf(FieldName.Name to "foo"), fields)
    }

    private fun createParser(json: String): XContentParser {
        val parser = JsonXContent.jsonXContent.createParser(
            NamedXContentRegistry.EMPTY,
            DeprecationHandler.IGNORE_DEPRECATIONS,
            ByteArrayInputStream(json.toByteArray(Charsets.UTF_8))
        )
        parser.nextToken()
        return parser
    }
}

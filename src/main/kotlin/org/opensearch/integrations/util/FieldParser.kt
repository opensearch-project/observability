package org.opensearch.integrations.util

import org.opensearch.common.xcontent.XContentParserUtils
import org.opensearch.core.xcontent.XContentParser
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.util.logger

interface XContentParseable {
    fun parse(parser: XContentParser): Any
}

enum class FieldType : XContentParseable {
    STRING {
        override fun parse(parser: XContentParser): String {
            return parser.text()
        }
    }
}

sealed class FieldName {
    companion object {
        val fieldMap = listOf(Name, Description).associateBy { it.name }
    }

    object Name : FieldName() {
        override val name = "name"
        override val fieldType = FieldType.STRING
    }
    object Description : FieldName() {
        override val name = "description"
        override val fieldType = FieldType.STRING
    }

    abstract val name: String
    abstract val fieldType: FieldType
}

object FieldParser {
    private val log by logger(FieldParser::class.java)

    fun parseFields(parser: XContentParser): Map<FieldName, Any> {
        val fields = mutableMapOf<FieldName, Any>()
        XContentParserUtils.ensureExpectedToken(
            XContentParser.Token.START_OBJECT,
            parser.currentToken(),
            parser
        )
        while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
            val fieldName = FieldName.fieldMap[parser.currentName()]
            if (fieldName == null) {
                parser.skipChildren()
                log.info("$LOG_PREFIX:FieldParser silently ignoring unknown field ${parser.currentName()}")
                continue
            }
            parser.nextToken()
            fields[fieldName] = fieldName.fieldType.parse(parser)
        }
        return fields
    }
}

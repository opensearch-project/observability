package org.opensearch.integrations.model

import org.opensearch.common.io.stream.StreamInput
import org.opensearch.common.io.stream.StreamOutput
import org.opensearch.common.xcontent.XContentParserUtils
import org.opensearch.core.xcontent.ToXContent
import org.opensearch.core.xcontent.XContentBuilder
import org.opensearch.core.xcontent.XContentParser
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.util.logger

data class Integration(
    val id: String,
    val description: String?
) : BaseObjectData {
    companion object {
        private val log by logger(Integration::class.java)

        fun parse(parser: XContentParser): Integration {
            var id: String? = null
            var description: String? = null
            XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_OBJECT, parser.currentToken(), parser)
            while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                val fieldName = parser.currentName()
                parser.nextToken()
                when (fieldName) {
                    "id" -> id = parser.text()
                    "description" -> description = parser.text()
                    else -> {
                        parser.skipChildren()
                        log.info("$LOG_PREFIX:Integration skipping unknown field '$fieldName'")
                    }
                }
            }
            requireNotNull(id)
            return Integration(id, description)
        }
    }

    constructor(input: StreamInput) : this(
        id = input.readString(),
        description = input.readOptionalString()
    )

    override fun writeTo(out: StreamOutput) {
        out.writeString(id)
        out.writeOptionalString(description)
    }

    override fun toXContent(builder: XContentBuilder, params: ToXContent.Params): XContentBuilder {
        builder.startObject()
        builder.field("id", id)
        description?.let { builder.field("description", description) }
        builder.endObject()
        return builder
    }
}

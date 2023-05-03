package org.opensearch.integrations.action

import org.opensearch.action.ActionRequest
import org.opensearch.action.ActionRequestValidationException
import org.opensearch.common.io.stream.StreamInput
import org.opensearch.common.xcontent.XContentParserUtils
import org.opensearch.core.xcontent.ToXContent
import org.opensearch.core.xcontent.ToXContentObject
import org.opensearch.core.xcontent.XContentBuilder
import org.opensearch.core.xcontent.XContentParser
import org.opensearch.integrations.model.BaseObjectData
import org.opensearch.integrations.model.IntegrationObjectDataProperties
import org.opensearch.integrations.model.IntegrationObjectType
import org.opensearch.observability.util.logger
import java.io.IOException

class CreateIntegrationRequest : ActionRequest, ToXContentObject {
    val objectId: String?
    val type: IntegrationObjectType
    val objectData: BaseObjectData?

    companion object {
        private val log by logger(CreateIntegrationRequest::class.java)

        /**
         * Creator used in REST communication.
         * @param parser XContentParser to deserialize data from.
         * @param id optional id to use if missed in XContent
         */
        @JvmStatic
        @Throws(IOException::class)
        fun parse(parser: XContentParser, id: String? = null): CreateIntegrationRequest {
            var objectId: String? = id
            var type: IntegrationObjectType? = null
            var baseObjectData: BaseObjectData? = null

            XContentParserUtils.ensureExpectedToken(
                XContentParser.Token.START_OBJECT,
                parser.currentToken(),
                parser
            )
            while (parser.nextToken() != XContentParser.Token.END_OBJECT) {
                val fieldName = parser.currentName()
                parser.nextToken()
                when (fieldName) {
                    "objectId" -> objectId = parser.text()
                    else -> {
                        val objectTypeForTag = IntegrationObjectType.fromTagOrDefault(fieldName)
                        if (objectTypeForTag != IntegrationObjectType.NONE && baseObjectData == null) {
                            baseObjectData = IntegrationObjectDataProperties.createObjectData(objectTypeForTag, parser)
                            type = objectTypeForTag
                        } else {
                            parser.skipChildren()
                            log.info("Unexpected field: $fieldName, while parsing CreateObservabilityObjectRequest")
                        }
                    }
                }
            }
            type ?: throw IllegalArgumentException("Object type field absent")
            baseObjectData ?: throw IllegalArgumentException("Object data field absent")
            return CreateIntegrationRequest(objectId, type, baseObjectData)
        }
    }

    constructor(objectId: String? = null, type: IntegrationObjectType, objectData: BaseObjectData) {
        this.objectId = objectId
        this.type = type
        this.objectData = objectData
    }

    @Throws(IOException::class)
    constructor(input: StreamInput) : super(input) {
        objectId = input.readOptionalString()
        type = input.readEnum(IntegrationObjectType::class.java)
        objectData = input.readOptionalWriteable(
            IntegrationObjectDataProperties.getReaderForObjectType(
                input.readEnum(
                    IntegrationObjectType::class.java
                )
            )
        )
    }

    override fun validate(): ActionRequestValidationException? {
        return null
    }

    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        TODO("Not yet implemented")
    }
}

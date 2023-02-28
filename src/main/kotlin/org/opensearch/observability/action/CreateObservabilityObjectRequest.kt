/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.action

import org.opensearch.action.ActionRequest
import org.opensearch.action.ActionRequestValidationException
import org.opensearch.common.io.stream.StreamInput
import org.opensearch.common.io.stream.StreamOutput
import org.opensearch.common.io.stream.Writeable
import org.opensearch.common.xcontent.XContentParserUtils
import org.opensearch.commons.utils.fieldIfNotNull
import org.opensearch.commons.utils.logger
import org.opensearch.core.xcontent.ToXContent
import org.opensearch.core.xcontent.ToXContentObject
import org.opensearch.core.xcontent.XContentBuilder
import org.opensearch.core.xcontent.XContentParser
import org.opensearch.observability.model.BaseObjectData
import org.opensearch.observability.model.ObservabilityObjectDataProperties
import org.opensearch.observability.model.ObservabilityObjectType
import org.opensearch.observability.model.RestTag.OBJECT_ID_FIELD
import java.io.IOException

/**
 * Action request for creating new configuration.
 */
internal class CreateObservabilityObjectRequest : ActionRequest, ToXContentObject {
    val objectId: String?
    val type: ObservabilityObjectType
    val objectData: BaseObjectData?

    companion object {
        private val log by logger(CreateObservabilityObjectRequest::class.java)

        /**
         * reader to create instance of class from writable.
         */
        val reader = Writeable.Reader { CreateObservabilityObjectRequest(it) }

        /**
         * Creator used in REST communication.
         * @param parser XContentParser to deserialize data from.
         * @param id optional id to use if missed in XContent
         */
        @JvmStatic
        @Throws(IOException::class)
        fun parse(parser: XContentParser, id: String? = null): CreateObservabilityObjectRequest {
            var objectId: String? = id
            var type: ObservabilityObjectType? = null
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
                    OBJECT_ID_FIELD -> objectId = parser.text()
                    else -> {
                        val objectTypeForTag = ObservabilityObjectType.fromTagOrDefault(fieldName)
                        if (objectTypeForTag != ObservabilityObjectType.NONE && baseObjectData == null) {
                            baseObjectData = ObservabilityObjectDataProperties.createObjectData(objectTypeForTag, parser)
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
            return CreateObservabilityObjectRequest(objectId, type, baseObjectData)
        }
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        builder!!
        return builder.startObject()
            .fieldIfNotNull(OBJECT_ID_FIELD, objectId)
            .field(type.tag, objectData)
            .endObject()
    }

    /**
     * constructor for creating the class
     * @param objectId optional id to use for ObservabilityObject
     * @param type type of ObservabilityObject
     * @param objectData the ObservabilityObject
     */
    constructor(objectId: String? = null, type: ObservabilityObjectType, objectData: BaseObjectData) {
        this.objectId = objectId
        this.type = type
        this.objectData = objectData
    }

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    constructor(input: StreamInput) : super(input) {
        objectId = input.readOptionalString()
        type = input.readEnum(ObservabilityObjectType::class.java)
        objectData = input.readOptionalWriteable(
            ObservabilityObjectDataProperties.getReaderForObjectType(
                input.readEnum(
                    ObservabilityObjectType::class.java
                )
            )
        )
    }

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    override fun writeTo(output: StreamOutput) {
        super.writeTo(output)
        output.writeOptionalString(objectId)
        output.writeEnum(type)
        output.writeEnum(type)
        output.writeOptionalWriteable(objectData)
    }

    /**
     * {@inheritDoc}
     */
    override fun validate(): ActionRequestValidationException? {
        return null
    }
}

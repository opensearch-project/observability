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
import org.opensearch.common.xcontent.ToXContent
import org.opensearch.common.xcontent.ToXContentObject
import org.opensearch.common.xcontent.XContentBuilder
import org.opensearch.common.xcontent.XContentParser
import org.opensearch.common.xcontent.XContentParserUtils
import org.opensearch.commons.utils.fieldIfNotNull
import org.opensearch.commons.utils.logger
import org.opensearch.observability.model.BaseObjectData
import org.opensearch.observability.model.CollaborationObjectDataProperties.createObjectData
import org.opensearch.observability.model.CollaborationObjectDataProperties.getReaderForObjectType
import org.opensearch.observability.model.CollaborationObjectType
import org.opensearch.observability.model.RestTag.COLLABORATION_ID_FIELD
import java.io.IOException

/**
 * Action request for creating new configuration.
 */
internal class CreateCollaborationObjectRequest : ActionRequest, ToXContentObject {
    val collaborationId: String?
    val type: CollaborationObjectType
    val objectData: BaseObjectData?

    companion object {
        private val log by logger(CreateCollaborationObjectRequest::class.java)

        /**
         * reader to create instance of class from writable.
         */
        val reader = Writeable.Reader { CreateCollaborationObjectRequest(it) }

        /**
         * Creator used in REST communication.
         * @param parser XContentParser to deserialize data from.
         * @param id optional id to use if missed in XContent
         */
        @JvmStatic
        @Throws(IOException::class)
        fun parse(parser: XContentParser, id: String? = null): CreateCollaborationObjectRequest {
            var collaborationId: String? = id
            val objectTypeForTag = CollaborationObjectType.COLLABORATION
            var type: CollaborationObjectType? = objectTypeForTag

            XContentParserUtils.ensureExpectedToken(
                XContentParser.Token.START_OBJECT,
                parser.currentToken(),
                parser
            )

            var baseObjectData: BaseObjectData? = createObjectData(objectTypeForTag, parser)

            baseObjectData ?: throw IllegalArgumentException("Object data field absent")
            log.info("collaborationId: $collaborationId")
            log.info("collab object type: $type")
            log.info("collab object data: $baseObjectData")
            return CreateCollaborationObjectRequest(collaborationId, baseObjectData)
        }
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        builder!!
        return builder.startObject()
            .fieldIfNotNull(COLLABORATION_ID_FIELD, collaborationId)
            .field(type.tag, objectData)
            .endObject()
    }

    /**
     * constructor for creating the class
     * @param collaborationId optional id to use for CollaborationObject
     * @param type type of CollaborationObject
     * @param objectData the CollaborationObject
     */
    constructor(collaborationId: String? = null, objectData: BaseObjectData) {
        this.collaborationId = collaborationId
        this.type = CollaborationObjectType.COLLABORATION
        this.objectData = objectData
    }

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    constructor(input: StreamInput) : super(input) {
        collaborationId = input.readOptionalString()
        type = input.readEnum(CollaborationObjectType::class.java)
        objectData = input.readOptionalWriteable(getReaderForObjectType(input.readEnum(CollaborationObjectType::class.java)))
    }

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    override fun writeTo(output: StreamOutput) {
        super.writeTo(output)
        output.writeOptionalString(collaborationId)
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

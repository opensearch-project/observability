/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.collaboration.action

import org.opensearch.common.io.stream.StreamInput
import org.opensearch.common.io.stream.StreamOutput
import org.opensearch.common.io.stream.Writeable
import org.opensearch.common.xcontent.ToXContent
import org.opensearch.common.xcontent.XContentBuilder
import org.opensearch.common.xcontent.XContentParser
import org.opensearch.common.xcontent.XContentParserUtils
import org.opensearch.commons.utils.logger
import org.opensearch.observability.model.BaseResponse
import org.opensearch.observability.model.RestTag.COLLABORATION_ID_FIELD
import java.io.IOException

/**
 * Action Response for creating new configuration.
 */
internal class CreateCollaborationObjectResponse : BaseResponse {
    val collaborationId: String

    companion object {
        private val log by logger(CreateCollaborationObjectResponse::class.java)

        /**
         * reader to create instance of class from writable.
         */
        val reader = Writeable.Reader { CreateCollaborationObjectResponse(it) }

        /**
         * Creator used in REST communication.
         * @param parser XContentParser to deserialize data from.
         */
        @JvmStatic
        @Throws(IOException::class)
        fun parse(parser: XContentParser): CreateCollaborationObjectResponse {
            var collaborationId: String? = null

            XContentParserUtils.ensureExpectedToken(
                XContentParser.Token.START_OBJECT,
                parser.currentToken(),
                parser
            )
            while (parser.nextToken() != XContentParser.Token.END_OBJECT) {
                val fieldName = parser.currentName()
                parser.nextToken()
                when (fieldName) {
                    COLLABORATION_ID_FIELD -> collaborationId = parser.text()
                    else -> {
                        parser.skipChildren()
                        log.info("Unexpected field: $fieldName, while parsing CreateCollaborationObjectResponse")
                    }
                }
            }
            collaborationId ?: throw IllegalArgumentException("$COLLABORATION_ID_FIELD field absent")
            return CreateCollaborationObjectResponse(collaborationId)
        }
    }

    /**
     * constructor for creating the class
     * @param id the id of the created CollaborationObject
     */
    constructor(id: String) {
        this.collaborationId = id
    }

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    constructor(input: StreamInput) : super(input) {
        collaborationId = input.readString()
    }

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    override fun writeTo(output: StreamOutput) {
        output.writeString(collaborationId)
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        builder!!
        return builder.startObject()
            .field(COLLABORATION_ID_FIELD, collaborationId)
            .endObject()
    }
}

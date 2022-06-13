/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.collaboration.action

import org.opensearch.action.ActionRequest
import org.opensearch.action.ActionRequestValidationException
import org.opensearch.action.ValidateActions
import org.opensearch.common.io.stream.StreamInput
import org.opensearch.common.io.stream.StreamOutput
import org.opensearch.common.io.stream.Writeable
import org.opensearch.common.xcontent.ToXContent
import org.opensearch.common.xcontent.ToXContentObject
import org.opensearch.common.xcontent.XContentBuilder
import org.opensearch.common.xcontent.XContentParser
import org.opensearch.common.xcontent.XContentParserUtils
import org.opensearch.commons.utils.logger
import org.opensearch.commons.utils.stringList
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.model.RestTag.COLLABORATION_ID_FIELD
import org.opensearch.observability.model.RestTag.COLLABORATION_ID_LIST_FIELD
import java.io.IOException

/**
 * Action Request for deleting CollaborationObject.
 */
internal class DeleteCollaborationObjectRequest : ActionRequest, ToXContentObject {
    val collaborationIds: Set<String>

    companion object {
        private val log by logger(DeleteCollaborationObjectRequest::class.java)

        /**
         * reader to create instance of class from writable.
         */
        val reader = Writeable.Reader { DeleteCollaborationObjectRequest(it) }

        /**
         * Creator used in REST communication.
         * @param parser XContentParser to deserialize data from.
         * @param id optional id to use if missed in XContent
         */
        @JvmStatic
        @Throws(IOException::class)
        fun parse(parser: XContentParser): DeleteCollaborationObjectRequest {
            var collaborationIds: Set<String>? = null

            XContentParserUtils.ensureExpectedToken(
                XContentParser.Token.START_OBJECT,
                parser.currentToken(),
                parser
            )
            while (parser.nextToken() != XContentParser.Token.END_OBJECT) {
                val fieldName = parser.currentName()
                parser.nextToken()
                when (fieldName) {
                    COLLABORATION_ID_LIST_FIELD -> collaborationIds = parser.stringList().toSet()
                    else -> {
                        parser.skipChildren()
                        log.info("$LOG_PREFIX:Skipping Unknown field $fieldName")
                    }
                }
            }
            collaborationIds ?: throw IllegalArgumentException("$COLLABORATION_ID_FIELD field absent")
            return DeleteCollaborationObjectRequest(collaborationIds)
        }
    }

    /**
     * constructor for creating the class
     * @param collaborationIds the id of the collaboration object
     */
    constructor(collaborationIds: Set<String>) {
        this.collaborationIds = collaborationIds
    }

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    constructor(input: StreamInput) : super(input) {
        collaborationIds = input.readStringList().toSet()
    }

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    override fun writeTo(output: StreamOutput) {
        super.writeTo(output)
        output.writeStringCollection(collaborationIds)
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        builder!!
        return builder.startObject()
            .field(COLLABORATION_ID_LIST_FIELD, collaborationIds)
            .endObject()
    }

    /**
     * {@inheritDoc}
     */
    override fun validate(): ActionRequestValidationException? {
        var validationException: ActionRequestValidationException? = null
        if (collaborationIds.isNullOrEmpty()) {
            validationException = ValidateActions.addValidationError("collaborationIds is null or empty", validationException)
        }
        return validationException
    }
}

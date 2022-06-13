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
import org.opensearch.commons.utils.STRING_READER
import org.opensearch.commons.utils.STRING_WRITER
import org.opensearch.commons.utils.enumReader
import org.opensearch.commons.utils.enumWriter
import org.opensearch.commons.utils.logger
import org.opensearch.observability.model.BaseResponse
import org.opensearch.observability.model.RestTag.COLLABORATION_DELETE_RESPONSE_LIST_TAG
import org.opensearch.rest.RestStatus
import java.io.IOException

/**
 * Action Request for deleting CollaborationObject.
 */
internal class DeleteCollaborationObjectResponse : BaseResponse {
    val collaborationIdToStatus: Map<String, RestStatus>

    companion object {
        private val log by logger(DeleteCollaborationObjectResponse::class.java)

        /**
         * reader to create instance of class from writable.
         */
        val reader = Writeable.Reader { DeleteCollaborationObjectResponse(it) }

        /**
         * Creator used in REST communication.
         * @param parser XContentParser to deserialize data from.
         */
        @JvmStatic
        @Throws(IOException::class)
        fun parse(parser: XContentParser): DeleteCollaborationObjectResponse {
            var collaborationIdToStatus: Map<String, RestStatus>? = null

            XContentParserUtils.ensureExpectedToken(
                XContentParser.Token.START_OBJECT,
                parser.currentToken(),
                parser
            )
            while (parser.nextToken() != XContentParser.Token.END_OBJECT) {
                val fieldName = parser.currentName()
                parser.nextToken()
                when (fieldName) {
                    COLLABORATION_DELETE_RESPONSE_LIST_TAG -> collaborationIdToStatus = convertMapStrings(parser.mapStrings())
                    else -> {
                        parser.skipChildren()
                        log.info("Unexpected field: $fieldName, while parsing DeleteCollaborationObjectResponse")
                    }
                }
            }
            collaborationIdToStatus ?: throw IllegalArgumentException("$COLLABORATION_DELETE_RESPONSE_LIST_TAG field absent")
            return DeleteCollaborationObjectResponse(collaborationIdToStatus)
        }

        private fun convertMapStrings(inputMap: Map<String, String>): Map<String, RestStatus> {
            return inputMap.mapValues { RestStatus.valueOf(it.value) }
        }
    }

    /**
     * constructor for creating the class
     * @param collaborationIdToStatus the ids of the deleted observability object with status
     */
    constructor(collaborationIdToStatus: Map<String, RestStatus>) {
        this.collaborationIdToStatus = collaborationIdToStatus
    }

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    constructor(input: StreamInput) : super(input) {
        collaborationIdToStatus = input.readMap(STRING_READER, enumReader(RestStatus::class.java))
    }

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    override fun writeTo(output: StreamOutput) {
        output.writeMap(collaborationIdToStatus, STRING_WRITER, enumWriter(RestStatus::class.java))
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        builder!!
        return builder.startObject()
            .field(COLLABORATION_DELETE_RESPONSE_LIST_TAG, collaborationIdToStatus)
            .endObject()
    }

    override fun getStatus(): RestStatus {
        val distinctStatus = collaborationIdToStatus.values.distinct()
        return when {
            distinctStatus.size > 1 -> RestStatus.MULTI_STATUS
            distinctStatus.size == 1 -> distinctStatus[0]
            else -> RestStatus.NOT_MODIFIED
        }
    }
}

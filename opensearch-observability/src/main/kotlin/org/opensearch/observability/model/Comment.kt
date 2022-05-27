/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.model

import org.opensearch.common.io.stream.StreamInput
import org.opensearch.common.io.stream.StreamOutput
import org.opensearch.common.io.stream.Writeable
import org.opensearch.common.xcontent.ToXContent
import org.opensearch.common.xcontent.XContentBuilder
import org.opensearch.common.xcontent.XContentFactory
import org.opensearch.common.xcontent.XContentParser
import org.opensearch.common.xcontent.XContentParserUtils
import org.opensearch.observability.ObservabilityPlugin
import org.opensearch.observability.util.fieldIfNotNull
import org.opensearch.observability.util.logger

internal data class Comment(
    val collaborationId: String?,
    val text: String?
) : BaseObjectData {

    internal companion object {
        private val log by logger(Comment::class.java)
        private const val ID_TAG = "collaborationId"
        private const val TEXT_TAG = "text"

        /**
         * reader to create instance of class from writable.
         */
        val reader = Writeable.Reader { Comment(it) }

        /**
         * Parser to parse xContent
         */
        val xParser = XParser { parse(it) }

        /**
         * Parse the item list from parser
         * @param parser data referenced at parser
         * @return created list of items
         */
        private fun parseItemList(parser: XContentParser): List<Notebook.Paragraph> {
            val retList: MutableList<Notebook.Paragraph> = mutableListOf()
            XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_ARRAY, parser.currentToken(), parser)
            while (parser.nextToken() != XContentParser.Token.END_ARRAY) {
                retList.add(Notebook.Paragraph.parse(parser))
            }
            return retList
        }

        /**
         * Parse the data from parser and create Notebook object
         * @param parser data referenced at parser
         * @return created Notebook object
         */
        fun parse(parser: XContentParser): Comment {
            var collaborationId: String? = null
            var text: String? = null
            XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_OBJECT, parser.currentToken(), parser)
            while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                val fieldName = parser.currentName()
                parser.nextToken()
                when (fieldName) {
                    ID_TAG -> collaborationId = parser.text()
                    TEXT_TAG -> text = parser.text()
                    else -> {
                        parser.skipChildren()
                        log.info("${ObservabilityPlugin.LOG_PREFIX}:Notebook Skipping Unknown field $fieldName")
                    }
                }
            }
            return Comment(collaborationId, text)
        }
    }

    /**
     * create XContentBuilder from this object using [XContentFactory.jsonBuilder()]
     * @param params XContent parameters
     * @return created XContentBuilder object
     */
    fun toXContent(params: ToXContent.Params = ToXContent.EMPTY_PARAMS): XContentBuilder? {
        return toXContent(XContentFactory.jsonBuilder(), params)
    }

    /**
     * Constructor used in transport action communication.
     * @param input StreamInput stream to deserialize data from.
     */
    constructor(input: StreamInput) : this(
        collaborationId = input.readString(),
        text = input.readString()
    )

    /**
     * {@inheritDoc}
     */
    override fun writeTo(output: StreamOutput) {
        output.writeString(collaborationId)
        output.writeString(text)
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
//        val xContentParams = params ?: RestTag.REST_OUTPUT_PARAMS
        builder!!
        builder.startObject()
            .fieldIfNotNull(ID_TAG, collaborationId)
            .fieldIfNotNull(TEXT_TAG, text)
        return builder.endObject()
    }
}

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.model

import org.opensearch.common.io.stream.StreamInput
import org.opensearch.common.io.stream.StreamOutput
import org.opensearch.common.io.stream.Writeable
import org.opensearch.common.xcontent.XContentFactory
import org.opensearch.common.xcontent.XContentParserUtils
import org.opensearch.core.xcontent.ToXContent
import org.opensearch.core.xcontent.XContentBuilder
import org.opensearch.core.xcontent.XContentParser
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.util.fieldIfNotNull
import org.opensearch.observability.util.logger

/**
 * Saved query main data class.
 *  * <pre> JSON format
 * {@code
 * {
 *   "query": "source=index | where utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00')",
 *   "selected_date_range": {
 *     "start": "now/15m",
 *     "end": "now",
 *     "text": "utc_time > timestamp('2021-07-01 00:00:00') and utc_time < timestamp('2021-07-02 00:00:00')"
 *   },
 *   "selected_timestamp": {
 *       "name": "utc_time",
 *       "type": "timestamp"
 *   },
 *   "selected_fields": {
 *       "text": "| fields clientip, bytes, memory, host",
 *       "tokens": [
 *           {"name":"bytes","type":"long"},
 *           {"name":"clientip","type":"ip"}
 *       ]
 *   },
 *   "name": "Logs between dates",
 *   "description": "some descriptions related to this query"
 * }
 * }</pre>
 */

internal data class SavedQuery(
    val name: String?,
    val description: String?,
    val query: String?,
    val selectedDateRange: SelectedDateRange?,
    val selectedTimestamp: Token?,
    val selectedFields: SelectedFields?
) : BaseObjectData {

    internal companion object {
        private val log by logger(SavedQuery::class.java)
        private const val NAME_TAG = "name"
        private const val DESCRIPTION_TAG = "description"
        private const val QUERY_TAG = "query"
        private const val SELECTED_DATE_RANGE_TAG = "selected_date_range"
        private const val SELECTED_TIMESTAMP_TAG = "selected_timestamp"
        private const val SELECTED_FIELDS_TAG = "selected_fields"

        /**
         * reader to create instance of class from writable.
         */
        val reader = Writeable.Reader { SavedQuery(it) }

        /**
         * Parser to parse xContent
         */
        val xParser = XParser { parse(it) }

        /**
         * Parse the data from parser and create ObservabilityObject object
         * @param parser data referenced at parser
         * @return created ObservabilityObject object
         */
        fun parse(parser: XContentParser): SavedQuery {
            var name: String? = null
            var description: String? = null
            var query: String? = null
            var selectedDateRange: SelectedDateRange? = null
            var selectedTimestamp: Token? = null
            var selectedFields: SelectedFields? = null
            XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_OBJECT, parser.currentToken(), parser)
            while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                val fieldName = parser.currentName()
                parser.nextToken()
                when (fieldName) {
                    NAME_TAG -> name = parser.text()
                    DESCRIPTION_TAG -> description = parser.text()
                    QUERY_TAG -> query = parser.text()
                    SELECTED_DATE_RANGE_TAG -> selectedDateRange = SelectedDateRange.parse(parser)
                    SELECTED_TIMESTAMP_TAG -> selectedTimestamp = Token.parse(parser)
                    SELECTED_FIELDS_TAG -> selectedFields = SelectedFields.parse(parser)
                    else -> {
                        parser.skipChildren()
                        log.info("$LOG_PREFIX:SavedQuery Skipping Unknown field $fieldName")
                    }
                }
            }
            return SavedQuery(name, description, query, selectedDateRange, selectedTimestamp, selectedFields)
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
        name = input.readString(),
        description = input.readString(),
        query = input.readString(),
        selectedDateRange = input.readOptionalWriteable(SelectedDateRange.reader),
        selectedTimestamp = input.readOptionalWriteable(Token.reader),
        selectedFields = input.readOptionalWriteable(SelectedFields.reader)
    )

    /**
     * {@inheritDoc}
     */
    override fun writeTo(output: StreamOutput) {
        output.writeString(name)
        output.writeString(description)
        output.writeString(query)
        output.writeOptionalWriteable(selectedDateRange)
        output.writeOptionalWriteable(selectedTimestamp)
        output.writeOptionalWriteable(selectedFields)
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        builder!!
        builder.startObject()
            .fieldIfNotNull(NAME_TAG, name)
            .fieldIfNotNull(DESCRIPTION_TAG, description)
            .fieldIfNotNull(QUERY_TAG, query)
            .fieldIfNotNull(SELECTED_DATE_RANGE_TAG, selectedDateRange)
            .fieldIfNotNull(SELECTED_TIMESTAMP_TAG, selectedTimestamp)
            .fieldIfNotNull(SELECTED_FIELDS_TAG, selectedFields)
        return builder.endObject()
    }

    internal data class SelectedDateRange(
        val start: String,
        val end: String,
        val text: String
    ) : BaseModel {
        internal companion object {
            private const val START_TAG = "start"
            private const val END_TAG = "end"
            private const val TEXT_TAG = "text"

            /**
             * reader to create instance of class from writable.
             */
            val reader = Writeable.Reader { SelectedDateRange(it) }

            /**
             * Parser to parse xContent
             */
            val xParser = XParser { parse(it) }

            /**
             * Parse the data from parser and create Trigger object
             * @param parser data referenced at parser
             * @return created Trigger object
             */
            fun parse(parser: XContentParser): SelectedDateRange {
                var start: String? = null
                var end: String? = null
                var text: String? = null
                XContentParserUtils.ensureExpectedToken(
                    XContentParser.Token.START_OBJECT,
                    parser.currentToken(),
                    parser
                )
                while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                    val fieldName = parser.currentName()
                    parser.nextToken()
                    when (fieldName) {
                        START_TAG -> start = parser.text()
                        END_TAG -> end = parser.text()
                        TEXT_TAG -> text = parser.text()
                        else -> log.info("$LOG_PREFIX: Trigger Skipping Unknown field $fieldName")
                    }
                }
                start ?: throw IllegalArgumentException("$START_TAG field absent")
                end ?: throw IllegalArgumentException("$END_TAG field absent")
                text ?: throw IllegalArgumentException("$TEXT_TAG field absent")
                return SelectedDateRange(start, end, text)
            }
        }

        /**
         * Constructor used in transport action communication.
         * @param input StreamInput stream to deserialize data from.
         */
        constructor(input: StreamInput) : this(
            start = input.readString(),
            end = input.readString(),
            text = input.readString()
        )

        /**
         * {@inheritDoc}
         */
        override fun writeTo(output: StreamOutput) {
            output.writeString(start)
            output.writeString(end)
            output.writeString(text)
        }

        /**
         * {@inheritDoc}
         */
        override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
            builder!!
            builder.startObject()
                .field(START_TAG, start)
                .field(END_TAG, end)
                .field(TEXT_TAG, text)
            builder.endObject()
            return builder
        }
    }

    internal data class Token(
        val name: String,
        val type: String,
    ) : BaseModel {
        internal companion object {
            private const val NAME_TAG = "name"
            private const val TYPE_TAG = "type"

            /**
             * reader to create instance of class from writable.
             */
            val reader = Writeable.Reader { Token(it) }

            /**
             * Parser to parse xContent
             */
            val xParser = XParser { parse(it) }

            /**
             * Parse the data from parser and create Trigger object
             * @param parser data referenced at parser
             * @return created Trigger object
             */
            fun parse(parser: XContentParser): Token {
                var name: String? = null
                var type: String? = null
                XContentParserUtils.ensureExpectedToken(
                    XContentParser.Token.START_OBJECT,
                    parser.currentToken(),
                    parser
                )
                while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                    val fieldName = parser.currentName()
                    parser.nextToken()
                    when (fieldName) {
                        NAME_TAG -> name = parser.text()
                        TYPE_TAG -> type = parser.text()
                        else -> log.info("$LOG_PREFIX: Trigger Skipping Unknown field $fieldName")
                    }
                }
                name ?: throw IllegalArgumentException("$NAME_TAG field absent")
                type ?: throw IllegalArgumentException("$TYPE_TAG field absent")
                return Token(name, type)
            }
        }

        /**
         * Constructor used in transport action communication.
         * @param input StreamInput stream to deserialize data from.
         */
        constructor(input: StreamInput) : this(
            name = input.readString(),
            type = input.readString(),
        )

        /**
         * {@inheritDoc}
         */
        override fun writeTo(output: StreamOutput) {
            output.writeString(name)
            output.writeString(type)
        }

        /**
         * {@inheritDoc}
         */
        override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
            builder!!
            builder.startObject()
                .field(NAME_TAG, name)
                .field(TYPE_TAG, type)
            builder.endObject()
            return builder
        }
    }

    internal data class SelectedFields(
        val text: String?,
        val tokens: List<Token>?
    ) : BaseModel {
        internal companion object {
            private const val TEXT_TAG = "text"
            private const val TOKENS_TAG = "tokens"

            /**
             * reader to create instance of class from writable.
             */
            val reader = Writeable.Reader { SelectedFields(it) }

            /**
             * Parser to parse xContent
             */
            val xParser = XParser { parse(it) }

            /**
             * Parse the item list from parser
             * @param parser data referenced at parser
             * @return created list of items
             */
            private fun parseItemList(parser: XContentParser): List<Token> {
                val retList: MutableList<Token> = mutableListOf()
                XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_ARRAY, parser.currentToken(), parser)
                while (parser.nextToken() != XContentParser.Token.END_ARRAY) {
                    retList.add(Token.parse(parser))
                }
                return retList
            }

            /**
             * Parse the data from parser and create Trigger object
             * @param parser data referenced at parser
             * @return created Trigger object
             */
            fun parse(parser: XContentParser): SelectedFields {
                var text: String? = null
                var tokens: List<Token>? = null
                XContentParserUtils.ensureExpectedToken(
                    XContentParser.Token.START_OBJECT,
                    parser.currentToken(),
                    parser
                )
                while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                    val fieldName = parser.currentName()
                    parser.nextToken()
                    when (fieldName) {
                        TEXT_TAG -> text = parser.text()
                        TOKENS_TAG -> tokens = parseItemList(parser)
                        else -> log.info("$LOG_PREFIX: Trigger Skipping Unknown field $fieldName")
                    }
                }
                text ?: throw IllegalArgumentException("$TEXT_TAG field absent")
                tokens ?: throw IllegalArgumentException("$TOKENS_TAG field absent")
                return SelectedFields(text, tokens)
            }
        }

        /**
         * Constructor used in transport action communication.
         * @param input StreamInput stream to deserialize data from.
         */
        constructor(input: StreamInput) : this(
            text = input.readString(),
            tokens = input.readList(Token.reader)
        )

        /**
         * {@inheritDoc}
         */
        override fun writeTo(output: StreamOutput) {
            output.writeString(text)
            output.writeCollection(tokens)
        }

        /**
         * {@inheritDoc}
         */
        override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
            builder!!
            builder.startObject()
                .field(TEXT_TAG, text)
            if (tokens != null) {
                builder.startArray(TOKENS_TAG)
                tokens.forEach { it.toXContent(builder, params) }
                builder.endArray()
            }
            builder.endObject()
            return builder
        }
    }
}

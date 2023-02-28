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
 * OperationalPanel main data class.
 *  * <pre> JSON format
 * {@code
 * {
 *   "operationalPanel": {
 *     "name": "Demo Panel 1",
 *     "visualizations": [
 *       {
 *         "id": "panelViz_7ba28e34-6fd8-489d-9b9f-1f83e006fb17",
 *         "savedVisualizationId": "oyuecXwBYVazWqOOde0o",
 *         "x": 0,
 *         "y": 0,
 *         "w": 10,
 *         "h": 10
 *       },
 *       {
 *         "id": "panelViz_7ba28e34-6fd8-489d-9b9f-165fdv6wd611",
 *         "savedVisualizationId": "oiuccXwBYVazWqOO1e06",
 *         "x": 20,
 *         "y": 20,
 *         "w": 30,
 *         "h": 20
 *       }
 *     ],
 *     "timeRange": {
 *       "to": "now",
 *       "from": "now-1d"
 *     },
 *     "queryFilter": {
 *       "query": "| where Carrier='OpenSearch-Air'",
 *       "language": "ppl"
 *     },
 *     "applicationId": "KE1Ie34BbsTr-CsB4G6Y"
 *   }
 * }
 * }</pre>
 */

internal data class OperationalPanel(
    val name: String?,
    val visualizations: List<Visualization>?,
    val timeRange: TimeRange?,
    val queryFilter: QueryFilter?,
    val applicationId: String? = null
) : BaseObjectData {

    internal companion object {
        private val log by logger(OperationalPanel::class.java)
        private const val NAME_TAG = "name"
        private const val VISUALIZATIONS_TAG = "visualizations"
        private const val TIME_RANGE_TAG = "timeRange"
        private const val QUERY_FILTER_TAG = "queryFilter"
        private const val APPLICATION_ID_TAG = "applicationId"

        /**
         * reader to create instance of class from writable.
         */
        val reader = Writeable.Reader { OperationalPanel(it) }

        /**
         * Parser to parse xContent
         */
        val xParser = XParser { parse(it) }

        /**
         * Parse the item list from parser
         * @param parser data referenced at parser
         * @return created list of items
         */
        private fun parseItemList(parser: XContentParser): List<Visualization> {
            val retList: MutableList<Visualization> = mutableListOf()
            XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_ARRAY, parser.currentToken(), parser)
            while (parser.nextToken() != XContentParser.Token.END_ARRAY) {
                retList.add(Visualization.parse(parser))
            }
            return retList
        }

        /**
         * Parse the data from parser and create OperationalPanel object
         * @param parser data referenced at parser
         * @return created OperationalPanel object
         */
        fun parse(parser: XContentParser): OperationalPanel {
            var name: String? = null
            var visualizations: List<Visualization>? = null
            var timeRange: TimeRange? = null
            var queryFilter: QueryFilter? = null
            var applicationId: String? = null
            XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_OBJECT, parser.currentToken(), parser)
            while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                val fieldName = parser.currentName()
                parser.nextToken()
                when (fieldName) {
                    NAME_TAG -> name = parser.text()
                    VISUALIZATIONS_TAG -> visualizations = parseItemList(parser)
                    TIME_RANGE_TAG -> timeRange = TimeRange.parse(parser)
                    QUERY_FILTER_TAG -> queryFilter = QueryFilter.parse(parser)
                    APPLICATION_ID_TAG -> applicationId = parser.text()
                    else -> {
                        parser.skipChildren()
                        log.info("$LOG_PREFIX:OperationalPanel Skipping Unknown field $fieldName")
                    }
                }
            }
            return OperationalPanel(name, visualizations, timeRange, queryFilter, applicationId)
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
        visualizations = input.readList(Visualization.reader),
        timeRange = input.readOptionalWriteable(TimeRange.reader),
        queryFilter = input.readOptionalWriteable(QueryFilter.reader),
        applicationId = input.readOptionalString()
    )

    /**
     * {@inheritDoc}
     */
    override fun writeTo(output: StreamOutput) {
        output.writeString(name)
        output.writeCollection(visualizations)
        output.writeOptionalWriteable(timeRange)
        output.writeOptionalWriteable(queryFilter)
        output.writeOptionalString(applicationId)
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        val xContentParams = params ?: RestTag.REST_OUTPUT_PARAMS
        builder!!
        builder.startObject()
            .fieldIfNotNull(NAME_TAG, name)
        if (visualizations != null) {
            builder.startArray(VISUALIZATIONS_TAG)
            visualizations.forEach { it.toXContent(builder, xContentParams) }
            builder.endArray()
        }
        builder.fieldIfNotNull(TIME_RANGE_TAG, timeRange)
            .fieldIfNotNull(QUERY_FILTER_TAG, queryFilter)
            .fieldIfNotNull(APPLICATION_ID_TAG, applicationId)
        return builder.endObject()
    }

    /**
     * OperationalPanel visualization data class
     */
    internal data class Visualization(
        val id: String,
        val savedVisualizationId: String,
        val x: Int,
        val y: Int,
        val w: Int,
        val h: Int
    ) : BaseModel {
        internal companion object {
            private const val ID_TAG = "id"
            private const val SAVED_VISUALIZATION_ID_TAG = "savedVisualizationId"
            private const val X_TAG = "x"
            private const val Y_TAG = "y"
            private const val W_TAG = "w"
            private const val H_TAG = "h"

            /**
             * reader to create instance of class from writable.
             */
            val reader = Writeable.Reader { Visualization(it) }

            /**
             * Parser to parse xContent
             */
            val xParser = XParser { parse(it) }

            /**
             * Parse the data from parser and create Source object
             * @param parser data referenced at parser
             * @return created Source object
             */
            @Suppress("ComplexMethod")
            fun parse(parser: XContentParser): Visualization {
                var id: String? = null
                var savedVisualizationId: String? = null
                var x: Int? = null
                var y: Int? = null
                var w: Int? = null
                var h: Int? = null
                XContentParserUtils.ensureExpectedToken(
                    XContentParser.Token.START_OBJECT,
                    parser.currentToken(),
                    parser
                )
                while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                    val fieldName = parser.currentName()
                    parser.nextToken()
                    when (fieldName) {
                        ID_TAG -> id = parser.text()
                        SAVED_VISUALIZATION_ID_TAG -> savedVisualizationId = parser.text()
                        X_TAG -> x = parser.intValue()
                        Y_TAG -> y = parser.intValue()
                        W_TAG -> w = parser.intValue()
                        H_TAG -> h = parser.intValue()
                        else -> {
                            parser.skipChildren()
                            log.info("$LOG_PREFIX:Source Skipping Unknown field $fieldName")
                        }
                    }
                }
                id ?: throw IllegalArgumentException("$ID_TAG field absent")
                savedVisualizationId ?: throw IllegalArgumentException("$SAVED_VISUALIZATION_ID_TAG field absent")
                x ?: throw IllegalArgumentException("$X_TAG field absent")
                y ?: throw IllegalArgumentException("$Y_TAG field absent")
                w ?: throw IllegalArgumentException("$W_TAG field absent")
                h ?: throw IllegalArgumentException("$H_TAG field absent")
                return Visualization(id, savedVisualizationId, x, y, w, h)
            }
        }

        constructor(streamInput: StreamInput) : this(
            id = streamInput.readString(),
            savedVisualizationId = streamInput.readString(),
            x = streamInput.readInt(),
            y = streamInput.readInt(),
            w = streamInput.readInt(),
            h = streamInput.readInt()
        )

        override fun writeTo(streamOutput: StreamOutput) {
            streamOutput.writeString(id)
            streamOutput.writeString(savedVisualizationId)
            streamOutput.writeInt(x)
            streamOutput.writeInt(y)
            streamOutput.writeInt(w)
            streamOutput.writeInt(h)
        }

        /**
         * {@inheritDoc}
         */
        override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
            builder!!
            builder.startObject()
                .field(ID_TAG, id)
                .field(SAVED_VISUALIZATION_ID_TAG, savedVisualizationId)
                .field(X_TAG, x)
                .field(Y_TAG, y)
                .field(W_TAG, w)
                .field(H_TAG, h)
            return builder.endObject()
        }
    }

    /**
     * OperationalPanel TimeRange data class
     */
    internal data class TimeRange(
        val to: String,
        val from: String
    ) : BaseModel {
        internal companion object {
            private const val TO_TAG = "to"
            private const val FROM_TAG = "from"

            /**
             * reader to create instance of class from writable.
             */
            val reader = Writeable.Reader { TimeRange(it) }

            /**
             * Parser to parse xContent
             */
            val xParser = XParser { parse(it) }

            /**
             * Parse the data from parser and create Format object
             * @param parser data referenced at parser
             * @return created Format object
             */
            fun parse(parser: XContentParser): TimeRange {
                var to: String? = null
                var from: String? = null
                XContentParserUtils.ensureExpectedToken(
                    XContentParser.Token.START_OBJECT,
                    parser.currentToken(),
                    parser
                )
                while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                    val fieldName = parser.currentName()
                    parser.nextToken()
                    when (fieldName) {
                        TO_TAG -> to = parser.text()
                        FROM_TAG -> from = parser.text()
                        else -> {
                            parser.skipChildren()
                            log.info("$LOG_PREFIX:Format Skipping Unknown field $fieldName")
                        }
                    }
                }
                to ?: throw IllegalArgumentException("$TO_TAG field absent")
                from ?: throw IllegalArgumentException("$FROM_TAG field absent")
                return TimeRange(to, from)
            }
        }

        constructor(input: StreamInput) : this(
            to = input.readString(),
            from = input.readString()
        )

        override fun writeTo(output: StreamOutput) {
            output.writeString(to)
            output.writeString(from)
        }

        /**
         * {@inheritDoc}
         */
        override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
            builder!!
            builder.startObject()
                .field(TO_TAG, to)
                .field(FROM_TAG, from)
            builder.endObject()
            return builder
        }
    }

    /**
     * OperationalPanel QueryFilter data class
     */
    internal data class QueryFilter(
        val query: String,
        val language: String
    ) : BaseModel {
        internal companion object {
            private const val QUERY_TAG = "query"
            private const val LANGUAGE_TAG = "language"

            /**
             * reader to create instance of class from writable.
             */
            val reader = Writeable.Reader { QueryFilter(it) }

            /**
             * Parser to parse xContent
             */
            val xParser = XParser { parse(it) }

            /**
             * Parse the data from parser and create Trigger object
             * @param parser data referenced at parser
             * @return created Trigger object
             */
            fun parse(parser: XContentParser): QueryFilter {
                var inputText: String? = null
                var inputType: String? = null
                XContentParserUtils.ensureExpectedToken(
                    XContentParser.Token.START_OBJECT,
                    parser.currentToken(),
                    parser
                )
                while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                    val fieldName = parser.currentName()
                    parser.nextToken()
                    when (fieldName) {
                        QUERY_TAG -> inputText = parser.text()
                        LANGUAGE_TAG -> inputType = parser.text()
                        else -> log.info("$LOG_PREFIX: Trigger Skipping Unknown field $fieldName")
                    }
                }
                inputText ?: throw IllegalArgumentException("$QUERY_TAG field absent")
                inputType ?: throw IllegalArgumentException("$LANGUAGE_TAG field absent")
                return QueryFilter(inputText, inputType)
            }
        }

        constructor(input: StreamInput) : this(
            query = input.readString(),
            language = input.readString()
        )

        override fun writeTo(output: StreamOutput) {
            output.writeString(query)
            output.writeString(language)
        }

        /**
         * {@inheritDoc}
         */
        override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
            builder!!
            builder.startObject()
                .field(QUERY_TAG, query)
                .field(LANGUAGE_TAG, language)
            builder.endObject()
            return builder
        }
    }
}

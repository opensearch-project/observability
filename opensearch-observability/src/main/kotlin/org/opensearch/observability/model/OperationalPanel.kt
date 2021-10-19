/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 *
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
 *     "dateCreated": "2021-07-19T21:01:14.871Z",
 *     "dateModified": "2021-07-19T21:01:14.871Z",
 *     "visualizations": [
 *       {
 *         "id": "panelViz_7ba28e34-6fd8-489d-9b9f-1f83e006fb17",
 *         "title": "Demo Viz 1",
 *         "x": 0,
 *         "y": 0,
 *         "w": 10,
 *         "h": 10,
 *         "query": "source=index | fields Carrier,FlightDelayMin | stats sum(FlightDelayMin) as delays by Carrier",
 *         "timeField": "timestamp",
 *         "type": "bar"
 *       },
 *       {
 *         "id": "panelViz_7ba28e34-6fd8-489d-9b9f-165fdv6wd611",
 *         "title": "Demo Viz 2",
 *         "x": 20,
 *         "y": 20,
 *         "w": 30,
 *         "h": 20,
 *         "query": "source=index | fields Carrier,Origin | stats count() by Origin",
 *         "timeField": "utc_time",
 *         "type": "bar"
 *       }
 *     ],
 *     "timeRange": {
 *       "to": "now",
 *       "from": "now-1d"
 *     },
 *     "queryFilter": {
 *       "query": "| where Carrier='OpenSearch-Air'",
 *       "language": "ppl"
 *     }
 *   }
 * }
 * }</pre>
 */

internal data class OperationalPanel(
    val name: String?,
    val dateCreated: String?,
    val dateModified: String?,
    val visualizations: List<Visualization>?,
    val timeRange: TimeRange?,
    val queryFilter: QueryFilter?,
) : BaseObjectData {

    internal companion object {
        private val log by logger(OperationalPanel::class.java)
        private const val NAME_TAG = "name"
        private const val DATE_CREATED_TAG = "dateCreated"
        private const val DATE_MODIFIED_TAG = "dateModified"
        private const val VISUALIZATIONS_TAG = "visualizations"
        private const val TIME_RANGE_TAG = "timeRange"
        private const val QUERY_FILTER_TAG = "queryFilter"

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
            var dateCreated: String? = null
            var dateModified: String? = null
            var visualizations: List<Visualization>? = null
            var timeRange: TimeRange? = null
            var queryFilter: QueryFilter? = null
            XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_OBJECT, parser.currentToken(), parser)
            while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                val fieldName = parser.currentName()
                parser.nextToken()
                when (fieldName) {
                    NAME_TAG -> name = parser.text()
                    DATE_CREATED_TAG -> dateCreated = parser.text()
                    DATE_MODIFIED_TAG -> dateModified = parser.text()
                    VISUALIZATIONS_TAG -> visualizations = parseItemList(parser)
                    TIME_RANGE_TAG -> timeRange = TimeRange.parse(parser)
                    QUERY_FILTER_TAG -> queryFilter = QueryFilter.parse(parser)
                    else -> {
                        parser.skipChildren()
                        log.info("$LOG_PREFIX:OperationalPanel Skipping Unknown field $fieldName")
                    }
                }
            }
            return OperationalPanel(
                name,
                dateCreated,
                dateModified,
                visualizations,
                timeRange,
                queryFilter
            )
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
        dateCreated = input.readString(),
        dateModified = input.readString(),
        visualizations = input.readList(Visualization.reader),
        timeRange = input.readOptionalWriteable(TimeRange.reader),
        queryFilter = input.readOptionalWriteable(QueryFilter.reader),
    )

    /**
     * {@inheritDoc}
     */
    override fun writeTo(output: StreamOutput) {
        output.writeString(name)
        output.writeString(dateCreated)
        output.writeString(dateModified)
        output.writeCollection(visualizations)
        output.writeOptionalWriteable(timeRange)
        output.writeOptionalWriteable(queryFilter)
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        val xContentParams = params ?: RestTag.REST_OUTPUT_PARAMS
        builder!!
        builder.startObject()
            .fieldIfNotNull(NAME_TAG, name)
            .fieldIfNotNull(DATE_CREATED_TAG, dateCreated)
            .fieldIfNotNull(DATE_MODIFIED_TAG, dateModified)
        if (visualizations != null) {
            builder.startArray(VISUALIZATIONS_TAG)
            visualizations.forEach { it.toXContent(builder, xContentParams) }
            builder.endArray()
        }
        builder.fieldIfNotNull(TIME_RANGE_TAG, timeRange)
            .fieldIfNotNull(QUERY_FILTER_TAG, queryFilter)
        return builder.endObject()
    }

    /**
     * OperationalPanel visualization data class
     */
    internal data class Visualization(
        val id: String,
        val title: String,
        val x: Int,
        val y: Int,
        val w: Int,
        val h: Int,
        val query: String,
        val timeField: String,
        val type: String
    ) : BaseModel {
        internal companion object {
            private const val ID_TAG = "id"
            private const val TITLE_TAG = "title"
            private const val X_TAG = "x"
            private const val Y_TAG = "y"
            private const val W_TAG = "w"
            private const val H_TAG = "h"
            private const val QUERY_TAG = "query"
            private const val TIME_FIELD_TAG = "timeField"
            private const val TYPE_TAG = "type"

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
                var title: String? = null
                var x: Int? = null
                var y: Int? = null
                var w: Int? = null
                var h: Int? = null
                var query: String? = null
                var timeField: String? = null
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
                        ID_TAG -> id = parser.text()
                        TITLE_TAG -> title = parser.text()
                        X_TAG -> x = parser.intValue()
                        Y_TAG -> y = parser.intValue()
                        W_TAG -> w = parser.intValue()
                        H_TAG -> h = parser.intValue()
                        QUERY_TAG -> query = parser.text()
                        TIME_FIELD_TAG -> timeField = parser.text()
                        TYPE_TAG -> type = parser.text()
                        else -> {
                            parser.skipChildren()
                            log.info("$LOG_PREFIX:Source Skipping Unknown field $fieldName")
                        }
                    }
                }
                id ?: throw IllegalArgumentException("$ID_TAG field absent")
                title ?: throw IllegalArgumentException("$TITLE_TAG field absent")
                x ?: throw IllegalArgumentException("$X_TAG field absent")
                y ?: throw IllegalArgumentException("$Y_TAG field absent")
                w ?: throw IllegalArgumentException("$W_TAG field absent")
                h ?: throw IllegalArgumentException("$H_TAG field absent")
                query ?: throw IllegalArgumentException("$QUERY_TAG field absent")
                timeField ?: throw IllegalArgumentException("$TIME_FIELD_TAG field absent")
                type ?: throw IllegalArgumentException("$TYPE_TAG field absent")
                return Visualization(id, title, x, y, w, h, query, timeField, type)
            }
        }

        constructor(streamInput: StreamInput) : this(
            id = streamInput.readString(),
            title = streamInput.readString(),
            x = streamInput.readInt(),
            y = streamInput.readInt(),
            w = streamInput.readInt(),
            h = streamInput.readInt(),
            query = streamInput.readString(),
            timeField = streamInput.readString(),
            type = streamInput.readString()
        )

        override fun writeTo(streamOutput: StreamOutput) {
            streamOutput.writeString(id)
            streamOutput.writeString(title)
            streamOutput.writeInt(x)
            streamOutput.writeInt(y)
            streamOutput.writeInt(w)
            streamOutput.writeInt(h)
            streamOutput.writeString(query)
            streamOutput.writeString(timeField)
            streamOutput.writeString(type)
        }

        /**
         * {@inheritDoc}
         */
        override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
            builder!!
            builder.startObject()
                .field(ID_TAG, id)
                .field(TITLE_TAG, title)
                .field(X_TAG, x)
                .field(Y_TAG, y)
                .field(W_TAG, w)
                .field(H_TAG, h)
                .field(QUERY_TAG, query)
                .field(TIME_FIELD_TAG, timeField)
                .field(TYPE_TAG, type)
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

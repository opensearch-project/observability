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
 *   "type": "bar",
 *   "name": "Logs between dates",
 *   "description": "some descriptions related to this query",
 *   "application_id": "KE1Ie34BbsTr-CsB4G6Y",
 *   "user_configs": "{\"dataConfig\":\"{}\",\"layoutConfig\": \"{}\"}",
 *   "sub_type": "metric",
 *   "units_of_measure: "hours (h)",
 *   "labels": [
 *      {"label":"avg"},
 *      {"label":"count"},
 *   ]
 * }
 * }</pre>
 */

internal data class SavedVisualization(
    val name: String?,
    val description: String?,
    val query: String?,
    val type: String?,
    val selectedDateRange: SavedQuery.SelectedDateRange?,
    val selectedTimestamp: SavedQuery.Token?,
    val selectedFields: SavedQuery.SelectedFields?,
    val applicationId: String? = null,
    val userConfigs: String? = null,
    val subType: String?,
    val unitsOfMeasure: String? = null,
    val selectedLabels: SelectedLabels? = null,
) : BaseObjectData {

    internal companion object {
        private val log by logger(SavedVisualization::class.java)
        private const val NAME_TAG = "name"
        private const val DESCRIPTION_TAG = "description"
        private const val QUERY_TAG = "query"
        private const val TYPE_TAG = "type"
        private const val SELECTED_DATE_RANGE_TAG = "selected_date_range"
        private const val SELECTED_TIMESTAMP_TAG = "selected_timestamp"
        private const val SELECTED_FIELDS_TAG = "selected_fields"
        private const val APPLICATION_ID_TAG = "application_id"
        private const val USER_CONFIGS_TAG = "user_configs"
        private const val SUB_TYPE_TAG = "sub_type"
        private const val UNITS_OF_MEASURE_TAG = "units_of_measure"
        private const val SELECTED_LABELS_TAG = "selected_labels"

        /**
         * reader to create instance of class from writable.
         */
        val reader = Writeable.Reader { SavedVisualization(it) }

        /**
         * Parser to parse xContent
         */
        val xParser = XParser { parse(it) }

        /**
         * Parse the data from parser and create SavedVisualization object
         * @param parser data referenced at parser
         * @return created SavedVisualization object
         */
        @Suppress("ComplexMethod")
        fun parse(parser: XContentParser): SavedVisualization {
            var name: String? = null
            var description: String? = null
            var query: String? = null
            var type: String? = null
            var selectedDateRange: SavedQuery.SelectedDateRange? = null
            var selectedTimestamp: SavedQuery.Token? = null
            var selectedFields: SavedQuery.SelectedFields? = null
            var applicationId: String? = null
            var userConfigs: String? = null
            var subType: String? = null
            var unitsOfMeasure: String? = null
            var selectedLabels: SelectedLabels? = null
            XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_OBJECT, parser.currentToken(), parser)
            while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                val fieldName = parser.currentName()
                parser.nextToken()
                when (fieldName) {
                    NAME_TAG -> name = parser.text()
                    DESCRIPTION_TAG -> description = parser.text()
                    QUERY_TAG -> query = parser.text()
                    TYPE_TAG -> type = parser.text()
                    SELECTED_DATE_RANGE_TAG -> selectedDateRange = SavedQuery.SelectedDateRange.parse(parser)
                    SELECTED_TIMESTAMP_TAG -> selectedTimestamp = SavedQuery.Token.parse(parser)
                    SELECTED_FIELDS_TAG -> selectedFields = SavedQuery.SelectedFields.parse(parser)
                    APPLICATION_ID_TAG -> applicationId = parser.text()
                    USER_CONFIGS_TAG -> userConfigs = parser.text()
                    SUB_TYPE_TAG -> subType = parser.text()
                    UNITS_OF_MEASURE_TAG -> unitsOfMeasure = parser.text()
                    SELECTED_LABELS_TAG -> selectedLabels = SelectedLabels.parse(parser)
                    else -> {
                        parser.skipChildren()
                        log.info("$LOG_PREFIX:SavedVisualization Skipping Unknown field $fieldName")
                    }
                }
            }
            return SavedVisualization(
                name,
                description,
                query,
                type,
                selectedDateRange,
                selectedTimestamp,
                selectedFields,
                applicationId,
                userConfigs,
                subType,
                unitsOfMeasure,
                selectedLabels
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
        description = input.readString(),
        query = input.readString(),
        type = input.readString(),
        selectedDateRange = input.readOptionalWriteable(SavedQuery.SelectedDateRange.reader),
        selectedTimestamp = input.readOptionalWriteable(SavedQuery.Token.reader),
        selectedFields = input.readOptionalWriteable(SavedQuery.SelectedFields.reader),
        applicationId = input.readOptionalString(),
        userConfigs = input.readOptionalString(),
        subType = input.readString(),
        unitsOfMeasure = input.readOptionalString(),
        selectedLabels = input.readOptionalWriteable(SelectedLabels.reader),
    )

    /**
     * {@inheritDoc}
     */
    override fun writeTo(output: StreamOutput) {
        output.writeString(name)
        output.writeString(description)
        output.writeString(query)
        output.writeString(type)
        output.writeOptionalWriteable(selectedDateRange)
        output.writeOptionalWriteable(selectedTimestamp)
        output.writeOptionalWriteable(selectedFields)
        output.writeOptionalString(applicationId)
        output.writeOptionalString(userConfigs)
        output.writeString(subType)
        output.writeOptionalString(unitsOfMeasure)
        output.writeOptionalWriteable(selectedLabels)
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
            .fieldIfNotNull(TYPE_TAG, type)
            .fieldIfNotNull(SELECTED_DATE_RANGE_TAG, selectedDateRange)
            .fieldIfNotNull(SELECTED_TIMESTAMP_TAG, selectedTimestamp)
            .fieldIfNotNull(SELECTED_FIELDS_TAG, selectedFields)
            .fieldIfNotNull(APPLICATION_ID_TAG, applicationId)
            .fieldIfNotNull(USER_CONFIGS_TAG, userConfigs)
            .fieldIfNotNull(SUB_TYPE_TAG, subType)
            .fieldIfNotNull(UNITS_OF_MEASURE_TAG, unitsOfMeasure)
            .fieldIfNotNull(SELECTED_LABELS_TAG, selectedLabels)
        return builder.endObject()
    }

    internal data class Token(
        val label: String,
    ) : BaseModel {
        internal companion object {
            private const val LABEL_TAG = "label"

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
                var label: String? = null
                XContentParserUtils.ensureExpectedToken(
                    XContentParser.Token.START_OBJECT,
                    parser.currentToken(),
                    parser
                )
                while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                    val fieldName = parser.currentName()
                    parser.nextToken()
                    when (fieldName) {
                        LABEL_TAG -> label = parser.text()
                        else -> log.info("$LOG_PREFIX: Trigger Skipping Unknown field $fieldName")
                    }
                }
                label ?: throw IllegalArgumentException("$LABEL_TAG field absent")
                return Token(label)
            }
        }

        /**
         * Constructor used in transport action communication.
         * @param input StreamInput stream to deserialize data from.
         */
        constructor(input: StreamInput) : this(
            label = input.readString(),
        )

        /**
         * {@inheritDoc}
         */
        override fun writeTo(output: StreamOutput) {
            output.writeString(label)
        }

        /**
         * {@inheritDoc}
         */
        override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
            builder!!
            builder.startObject()
                .field(LABEL_TAG, label)
            builder.endObject()
            return builder
        }
    }

    internal data class SelectedLabels(
        val labels: List<Token>?,
    ) : BaseModel {
        internal companion object {
            private const val LABELS_TAG = "labels"

            /**
             * reader to create instance of class from writable.
             */
            val reader = Writeable.Reader { SelectedLabels(it) }

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
            fun parse(parser: XContentParser): SelectedLabels {
                var labels: List<Token>? = null
                XContentParserUtils.ensureExpectedToken(
                    XContentParser.Token.START_ARRAY,
                    parser.currentToken(),
                    parser
                )
                while (XContentParser.Token.END_ARRAY != parser.nextToken()) {
                    val fieldName = parser.currentName()
                    parser.nextToken()
                    when (fieldName) {
                        LABELS_TAG -> labels = parseItemList(parser)
                        else -> log.info("$LOG_PREFIX: Trigger Skipping Unknown field $fieldName")
                    }
                }
                labels ?: throw IllegalArgumentException("$LABELS_TAG field absent")
                return SelectedLabels(labels)
            }
        }

        /**
         * Constructor used in transport action communication.
         * @param input StreamInput stream to deserialize data from.
         */
        constructor(input: StreamInput) : this(
            labels = input.readList(Token.reader)
        )

        /**
         * {@inheritDoc}
         */
        override fun writeTo(output: StreamOutput) {
            output.writeCollection(labels)
        }

        /**
         * {@inheritDoc}
         */
        override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
            builder!!
            builder.startObject()
            if (labels != null) {
                builder.startArray(LABELS_TAG)
                labels.forEach { it.toXContent(builder, params) }
                builder.endArray()
            }
            builder.endObject()
            return builder
        }
    }
}

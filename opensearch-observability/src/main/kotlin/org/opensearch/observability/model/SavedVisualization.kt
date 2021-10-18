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
 *   "description": "some descriptions related to this query"
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
    val selectedFields: SavedQuery.SelectedFields?
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
        fun parse(parser: XContentParser): SavedVisualization {
            var name: String? = null
            var description: String? = null
            var query: String? = null
            var type: String? = null
            var selectedDateRange: SavedQuery.SelectedDateRange? = null
            var selectedTimestamp: SavedQuery.Token? = null
            var selectedFields: SavedQuery.SelectedFields? = null
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
                selectedFields
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
        selectedFields = input.readOptionalWriteable(SavedQuery.SelectedFields.reader)
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
        return builder.endObject()
    }
}

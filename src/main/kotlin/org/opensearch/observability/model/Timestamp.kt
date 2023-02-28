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
 * Timestamp main data class.
 *  * <pre> JSON format
 * {@code
 * {
 *   "name": "Logs between dates",
 *   "index": "opensearch_dashboards_sample_data_logs",
 *   "type": "timestamp",
 *   "dsl_type": "date"
 * }
 * }</pre>
 */

internal data class Timestamp(
    val name: String?,
    val index: String?,
    val type: String?,
    val dslType: String?,
) : BaseObjectData {

    internal companion object {
        private val log by logger(Timestamp::class.java)
        private const val NAME_TAG = "name"
        private const val INDEX_TAG = "index"
        private const val TYPE_TAG = "type"
        private const val DSL_TYPE_TAG = "dsl_type"

        /**
         * reader to create instance of class from writable.
         */
        val reader = Writeable.Reader { Timestamp(it) }

        /**
         * Parser to parse xContent
         */
        val xParser = XParser { parse(it) }

        /**
         * Parse the data from parser and create Timestamp object
         * @param parser data referenced at parser
         * @return created Timestamp object
         */
        fun parse(parser: XContentParser): Timestamp {
            var name: String? = null
            var index: String? = null
            var type: String? = null
            var dslType: String? = null
            XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_OBJECT, parser.currentToken(), parser)
            while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                val fieldName = parser.currentName()
                parser.nextToken()
                when (fieldName) {
                    NAME_TAG -> name = parser.text()
                    INDEX_TAG -> index = parser.text()
                    TYPE_TAG -> type = parser.text()
                    DSL_TYPE_TAG -> dslType = parser.text()
                    else -> {
                        parser.skipChildren()
                        log.info("$LOG_PREFIX:SavedVisualization Skipping Unknown field $fieldName")
                    }
                }
            }
            return Timestamp(name, index, type, dslType)
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
        index = input.readString(),
        type = input.readString(),
        dslType = input.readString()
    )

    /**
     * {@inheritDoc}
     */
    override fun writeTo(output: StreamOutput) {
        output.writeString(name)
        output.writeString(index)
        output.writeString(type)
        output.writeString(dslType)
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        builder!!
        builder.startObject()
            .fieldIfNotNull(NAME_TAG, name)
            .fieldIfNotNull(INDEX_TAG, index)
            .fieldIfNotNull(TYPE_TAG, type)
            .fieldIfNotNull(DSL_TYPE_TAG, dslType)
        return builder.endObject()
    }
}

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
import org.opensearch.commons.utils.stringList
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.util.fieldIfNotNull
import org.opensearch.observability.util.logger

/**
 * Application main data class.
 *  * <pre> JSON format
 * {@code
 * {
 *   "name": "Cool Application",
 *   "description": "Application that includes multiple cool services",
 *   "baseQuery": "source = opensearch_sample_database_flights",
 *   "servicesEntities": [
 *       "Payment", 
 *       "Users", 
 *       "Purchase"
 *   ],
 *   "traceGroups": [
 *       "Payment.auto",
 *       "Users.admin",
 *       "Purchase.source"
 *   ],
 *   "availabilityLevels": [
 *       {
 *           "label": "Unavailable",
 *           "color": "#D36086",
 *           "condition": "when errorRate() is above or equal to 2%",
 *           "order": "0",
 *       }
 *   ],
 * }
 * }</pre>
 */

internal data class Application(
    val name: String?,
    val description: String?,
    val baseQuery: String?,
    val servicesEntities: List<String>,
    val traceGroups: List<String>,
    val availabilityLevels: List<AvailabilityLevel>
) : BaseObjectData {

    internal companion object {
        private val log by logger(Application::class.java)
        private const val NAME_TAG = "name"
        private const val DESCRIPTION_TAG = "description"
        private const val BASE_QUERY_TAG = "baseQuery"
        private const val SERVICES_ENTITIES_TAG = "servicesEntities"
        private const val TRACE_GROUPS_TAG = "traceGroups"
        private const val AVAILABILITY_LEVELS_TAG = "availabilityLevels"

        /**
         * reader to create instance of class from writable.
         */
        val reader = Writeable.Reader { Application(it) }

        /**
         * Parser to parse xContent
         */
        val xParser = XParser { parse(it) }

        /**
         * Parse the item list from parser
         * @param parser data referenced at parser
         * @return created list of items
         */
        private fun parseItemList(parser: XContentParser): List<AvailabilityLevel> {
            val retList: MutableList<AvailabilityLevel> = mutableListOf()
            XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_ARRAY, parser.currentToken(), parser)
            while (parser.nextToken() != XContentParser.Token.END_ARRAY) {
                retList.add(AvailabilityLevel.parse(parser))
            }
            return retList
        }

        /**
         * Parse the data from parser and create ObservabilityObject object
         * @param parser data referenced at parser
         * @return created ObservabilityObject object
         */
        fun parse(parser: XContentParser): Application {
            var name: String? = null
            var description: String? = null
            var baseQuery: String? = null
            var servicesEntities: List<String> = listOf()
            var traceGroups: List<String> = listOf()
            var availabilityLevels: List<AvailabilityLevel> = listOf()
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
                    DESCRIPTION_TAG -> description = parser.text()
                    BASE_QUERY_TAG -> baseQuery = parser.text()
                    SERVICES_ENTITIES_TAG -> servicesEntities = parser.stringList()
                    TRACE_GROUPS_TAG -> traceGroups = parser.stringList()
                    AVAILABILITY_LEVELS_TAG -> availabilityLevels = parseItemList(parser)
                    else -> {
                        parser.skipChildren()
                        log.info("$LOG_PREFIX:Application Skipping Unknown field $fieldName")
                    }
                }
            }
            return Application(name, description, baseQuery, servicesEntities, traceGroups, availabilityLevels)
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
        baseQuery = input.readString(),
        servicesEntities = input.readStringList(),
        traceGroups = input.readStringList(),
        availabilityLevels = input.readList(AvailabilityLevel.reader)
    )

    /**
     * {@inheritDoc}
     */
    override fun writeTo(output: StreamOutput) {
        output.writeString(name)
        output.writeString(description)
        output.writeString(baseQuery)
        output.writeStringCollection(servicesEntities)
        output.writeStringCollection(traceGroups)
        output.writeCollection(availabilityLevels)
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        builder!!
        builder.startObject()
            .fieldIfNotNull(NAME_TAG, name)
            .fieldIfNotNull(DESCRIPTION_TAG, description)
            .fieldIfNotNull(BASE_QUERY_TAG, baseQuery)
            .fieldIfNotNull(SERVICES_ENTITIES_TAG, servicesEntities)
            .fieldIfNotNull(TRACE_GROUPS_TAG, traceGroups)
            .fieldIfNotNull(AVAILABILITY_LEVELS_TAG, availabilityLevels)
        return builder.endObject()
    }

    internal data class AvailabilityLevel(
        val label: String?,
        val color: String?,
        val condition: String?,
        val order: String?
    ) : BaseModel {
        internal companion object {
            private const val LABEL_TAG = "label"
            private const val COLOR_TAG = "color"
            private const val CONDITION_TAG = "condition"
            private const val ORDER_TAG = "order"

            /**
             * reader to create instance of class from writable.
             */
            val reader = Writeable.Reader { AvailabilityLevel(it) }

            /**
             * Parser to parse xContent
             */
            val xParser = XParser { parse(it) }

            /**
             * Parse the data from parser and create Trigger object
             * @param parser data referenced at parser
             * @return created Trigger object
             */
            fun parse(parser: XContentParser): AvailabilityLevel {
                var label: String? = null
                var color: String? = null
                var condition: String? = null
                var order: String? = null
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
                        COLOR_TAG -> color = parser.text()
                        CONDITION_TAG -> condition = parser.text()
                        ORDER_TAG -> order = parser.text()
                        else -> log.info("$LOG_PREFIX: AvailabilityLevel Skipping Unknown field $fieldName")
                    }
                }
                label ?: throw IllegalArgumentException("$LABEL_TAG field absent")
                color ?: throw IllegalArgumentException("$COLOR_TAG field absent")
                condition ?: throw IllegalArgumentException("$CONDITION_TAG field absent")
                order ?: throw IllegalArgumentException("$ORDER_TAG field absent")
                return AvailabilityLevel(label, color, condition, order)
            }
        }

        /**
         * Constructor used in transport action communication.
         * @param input StreamInput stream to deserialize data from.
         */
        constructor(input: StreamInput) : this(
            label = input.readString(),
            color = input.readString(),
            condition = input.readString(),
            order = input.readString(),
        )

        /**
         * {@inheritDoc}
         */
        override fun writeTo(output: StreamOutput) {
            output.writeString(label)
            output.writeString(color)
            output.writeString(condition)
            output.writeString(order)
        }

        /**
         * {@inheritDoc}
         */
        override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
            builder!!
            builder.startObject()
                .field(LABEL_TAG, label)
                .field(COLOR_TAG, color)
                .field(CONDITION_TAG, condition)
                .field(ORDER_TAG, order)
            builder.endObject()
            return builder
        }
    }
}

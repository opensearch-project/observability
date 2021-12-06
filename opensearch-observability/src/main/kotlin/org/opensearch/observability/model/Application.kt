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
 *   "base_query": "source = opensearch_sample_database_flights",
 *   "services_entities": [
 *       "Payment", 
 *       "Users", 
 *       "Purchase"
 *   ],
 *   "trace_groups": [
 *       "Payment.auto",
 *       "Users.admin",
 *       "Purchase.source"
 *   ],
 *   "availability_levels": [
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
    val base_query: String?,
    val services_entities: List<String>,
    val trace_groups: List<String>,
    val availability_levels: List<AvailabilityLevel>
) : BaseObjectData {

    internal companion object {
        private val log by logger(Application::class.java)
        private const val NAME_TAG = "name"
        private const val DESCRIPTION_TAG = "description"
        private const val BASE_QUERY_TAG = "base_query"
        private const val SERVICES_ENTITIES_TAG = "services_entities"
        private const val TRACE_GROUPS_TAG = "trace_groups"
        private const val AVAILABILITY_LEVELS_TAG = "availability_levels"

        /**
         * reader to create instance of class from writable.
         */
        val reader = Writeable.Reader { Application(it) }

        /**
         * Parser to parse xContent
         */
        val xParser = XParser { parse(it) }

        /**
         * Parse the data from parser and create ObservabilityObject object
         * @param parser data referenced at parser
         * @return created ObservabilityObject object
         */
        fun parse(parser: XContentParser): Application {
            var name: String? = null
            var description: String? = null
            var base_query: String? = null
            var services_entities: List<String> = listOf()
            var trace_groups: List<String> = listOf()
            var availability_levels: List<AvailabilityLevel> = listOf()
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
                    BASE_QUERY_TAG -> base_query = parser.text()
                    SERVICES_ENTITIES_TAG -> services_entities = parser.stringList()
                    TRACE_GROUPS_TAG -> trace_groups = parser.stringList()
                    AVAILABILITY_LEVELS_TAG -> availability_levels = AvailabilityLevel.parse(parser)
                    else -> {
                        parser.skipChildren()
                        log.info("$LOG_PREFIX:Application Skipping Unknown field $fieldName")
                    }
                }
            }
            return Application(name, description, base_query, services_entities, trace_groups, availability_levels)
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
        base_query = input.readString(),
        services_entities = input.readStringList(),
        trace_groups = input.readStringList(),
        availability_levels = input.readOptionalWriteable(AvailabilityLevels.reader)
    )

    /**
     * {@inheritDoc}
     */
    override fun writeTo(output: StreamOutput) {
        output.writeString(name)
        output.writeString(description)
        output.writeString(base_query)
        output.writeStringCollection(services_entities)
        output.writeStringCollection(trace_groups)
        output.writeCollection(availability_levels)
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        builder!!
        builder.startObject()
            .fieldIfNotNull(NAME_TAG, name)
            .fieldIfNotNull(DESCRIPTION_TAG, description)
            .fieldIfNotNull(BASE_QUERY_TAG, base_query)
            .fieldIfNotNull(SERVICES_ENTITIES_TAG, services_entities)
            .fieldIfNotNull(TRACE_GROUPS_TAG, trace_groups)
            .fieldIfNotNull(AVAILABILITY_LEVELS_TAG, availability_levels)
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

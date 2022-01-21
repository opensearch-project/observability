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
 *   ]
 * }
 * }</pre>
 */

internal data class Application(
    val name: String?,
    val description: String?,
    val baseQuery: String?,
    val servicesEntities: List<String>,
    val traceGroups: List<String>
) : BaseObjectData {

    internal companion object {
        private val log by logger(Application::class.java)
        private const val NAME_TAG = "name"
        private const val DESCRIPTION_TAG = "description"
        private const val BASE_QUERY_TAG = "baseQuery"
        private const val SERVICES_ENTITIES_TAG = "servicesEntities"
        private const val TRACE_GROUPS_TAG = "traceGroups"

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
            var baseQuery: String? = null
            var servicesEntities: List<String> = listOf()
            var traceGroups: List<String> = listOf()

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
                    else -> {
                        parser.skipChildren()
                        log.info("$LOG_PREFIX:Application Skipping Unknown field $fieldName")
                    }
                }
            }
            return Application(name, description, baseQuery, servicesEntities, traceGroups)
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
        traceGroups = input.readStringList()
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
        return builder.endObject()
    }
}

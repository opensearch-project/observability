/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.integrations.model

import org.opensearch.common.io.stream.StreamInput
import org.opensearch.common.io.stream.StreamOutput
import org.opensearch.common.io.stream.Writeable
import org.opensearch.common.xcontent.XContentFactory
import org.opensearch.common.xcontent.XContentParserUtils
import org.opensearch.core.xcontent.ToXContent
import org.opensearch.core.xcontent.XContentBuilder
import org.opensearch.core.xcontent.XContentParser
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.model.XParser
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
 *   "panelId": "rgfQfn4BCe7Q1SIYgrrj",
 *   "availabilityVisId": "co-Ha38BD0LU9um06tQP"
 * }</pre>
 */

internal data class IntegrationTemplate(
    val name: String?,
    val description: String?,
) : BaseObjectData {

    internal companion object {
        private val log by logger(IntegrationTemplate::class.java)
        private const val NAME_TAG = "name"
        private const val DESCRIPTION_TAG = "description"

        /**
         * reader to create instance of class from writable.
         */
        val reader = Writeable.Reader { IntegrationTemplate(it) }

        /**
         * Parser to parse xContent
         */
        val xParser = XParser { parse(it) }

        /**
         * Parse the data from parser and create ObservabilityObject object
         * @param parser data referenced at parser
         * @return created ObservabilityObject object
         */
        fun parse(parser: XContentParser): IntegrationTemplate {
            var name: String? = null
            var description: String? = null
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
                    else -> {
                        parser.skipChildren()
                        log.info("$LOG_PREFIX:Application Skipping Unknown field $fieldName")
                    }
                }
            }
            return IntegrationTemplate(name, description)
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
    )

    /**
     * {@inheritDoc}
     */
    override fun writeTo(output: StreamOutput) {
        output.writeString(name)
        output.writeString(description)
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        builder!!
        builder.startObject()
            .fieldIfNotNull(NAME_TAG, name)
            .fieldIfNotNull(DESCRIPTION_TAG, description)
        return builder.endObject()
    }
}

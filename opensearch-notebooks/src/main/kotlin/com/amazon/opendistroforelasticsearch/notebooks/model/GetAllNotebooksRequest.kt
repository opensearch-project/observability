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

package com.amazon.opendistroforelasticsearch.notebooks.model

import com.amazon.opendistroforelasticsearch.notebooks.NotebooksPlugin.Companion.LOG_PREFIX
import com.amazon.opendistroforelasticsearch.notebooks.model.RestTag.FROM_INDEX_FIELD
import com.amazon.opendistroforelasticsearch.notebooks.model.RestTag.MAX_ITEMS_FIELD
import com.amazon.opendistroforelasticsearch.notebooks.settings.PluginSettings
import com.amazon.opendistroforelasticsearch.notebooks.util.logger
import org.opensearch.action.ActionRequest
import org.opensearch.action.ActionRequestValidationException
import org.opensearch.common.io.stream.StreamInput
import org.opensearch.common.io.stream.StreamOutput
import org.opensearch.common.xcontent.ToXContent
import org.opensearch.common.xcontent.ToXContentObject
import org.opensearch.common.xcontent.XContentBuilder
import org.opensearch.common.xcontent.XContentFactory
import org.opensearch.common.xcontent.XContentParser
import org.opensearch.common.xcontent.XContentParser.Token
import org.opensearch.common.xcontent.XContentParserUtils
import java.io.IOException

/**
 * Get All notebooks info request
 * Data object created from GET request query params
 * <pre> JSON format
 * {@code
 * {
 *   "fromIndex":100,
 *   "maxItems":100
 * }
 * }</pre>
 */
internal class GetAllNotebooksRequest(
    val fromIndex: Int,
    val maxItems: Int
) : ActionRequest(), ToXContentObject {

    @Throws(IOException::class)
    constructor(input: StreamInput) : this(
        fromIndex = input.readInt(),
        maxItems = input.readInt()
    )

    companion object {
        private val log by logger(GetAllNotebooksRequest::class.java)

        /**
         * Parse the data from parser and create [GetAllNotebooksRequest] object
         * @param parser data referenced at parser
         * @return created [GetAllNotebooksRequest] object
         */
        fun parse(parser: XContentParser): GetAllNotebooksRequest {
            var fromIndex = 0
            var maxItems = PluginSettings.defaultItemsQueryCount
            XContentParserUtils.ensureExpectedToken(Token.START_OBJECT, parser.currentToken(), parser)
            while (Token.END_OBJECT != parser.nextToken()) {
                val fieldName = parser.currentName()
                parser.nextToken()
                when (fieldName) {
                    FROM_INDEX_FIELD -> fromIndex = parser.intValue()
                    MAX_ITEMS_FIELD -> maxItems = parser.intValue()
                    else -> {
                        parser.skipChildren()
                        log.info("$LOG_PREFIX:Skipping Unknown field $fieldName")
                    }
                }
            }
            return GetAllNotebooksRequest(fromIndex, maxItems)
        }
    }

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    override fun writeTo(output: StreamOutput) {
        output.writeInt(fromIndex)
        output.writeInt(maxItems)
    }

    /**
     * {@inheritDoc}
     */
    override fun validate(): ActionRequestValidationException? {
        return if (fromIndex < 0) {
            val exception = ActionRequestValidationException()
            exception.addValidationError("fromIndex should be grater than 0")
            exception
        } else {
            null
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
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        return builder!!.startObject()
            .field(FROM_INDEX_FIELD, fromIndex)
            .field(MAX_ITEMS_FIELD, maxItems)
            .endObject()
    }
}

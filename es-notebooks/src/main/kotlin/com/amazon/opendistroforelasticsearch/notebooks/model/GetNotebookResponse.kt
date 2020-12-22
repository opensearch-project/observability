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
import com.amazon.opendistroforelasticsearch.notebooks.util.createJsonParser
import com.amazon.opendistroforelasticsearch.notebooks.util.logger
import org.elasticsearch.common.io.stream.StreamInput
import org.elasticsearch.common.io.stream.StreamOutput
import org.elasticsearch.common.xcontent.ToXContent
import org.elasticsearch.common.xcontent.XContentBuilder
import org.elasticsearch.common.xcontent.XContentFactory
import org.elasticsearch.common.xcontent.XContentParser
import org.elasticsearch.common.xcontent.XContentParser.Token
import org.elasticsearch.common.xcontent.XContentParserUtils
import java.io.IOException

/**
 * Get Notebook info response.
 * <pre> JSON format
 * {@code
 * {
 *   "notebookDetails":{
 *      // refer [com.amazon.opendistroforelasticsearch.notebooks.model.NotebookDetails]
 *   }
 * }
 * }</pre>
 */
internal class GetNotebookResponse : BaseResponse {
    val notebookDetails: NotebookDetails
    private val filterSensitiveInfo: Boolean

    companion object {
        private val log by logger(GetNotebookResponse::class.java)
    }

    constructor(notebook: NotebookDetails, filterSensitiveInfo: Boolean) : super() {
        this.notebookDetails = notebook
        this.filterSensitiveInfo = filterSensitiveInfo
    }

    @Throws(IOException::class)
    constructor(input: StreamInput) : this(input.createJsonParser())

    /**
     * Parse the data from parser and create [GetNotebookResponse] object
     * @param parser data referenced at parser
     */
    constructor(parser: XContentParser) : super() {
        var notebook: NotebookDetails? = null
        XContentParserUtils.ensureExpectedToken(Token.START_OBJECT, parser.currentToken(), parser)
        while (Token.END_OBJECT != parser.nextToken()) {
            val fieldName = parser.currentName()
            parser.nextToken()
            when (fieldName) {
                RestTag.NOTEBOOK_DETAILS_FIELD -> notebook = NotebookDetails.parse(parser)
                else -> {
                    parser.skipChildren()
                    log.info("$LOG_PREFIX:Skipping Unknown field $fieldName")
                }
            }
        }
        notebook ?: throw IllegalArgumentException("${RestTag.NOTEBOOK_FIELD} field absent")
        this.notebookDetails = notebook
        this.filterSensitiveInfo = false // Sensitive info Must have filtered when created json object
    }

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    override fun writeTo(output: StreamOutput) {
        toXContent(XContentFactory.jsonBuilder(output), ToXContent.EMPTY_PARAMS)
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        val xContentParams = if (filterSensitiveInfo) {
            RestTag.FILTERED_REST_OUTPUT_PARAMS
        } else {
            RestTag.REST_OUTPUT_PARAMS
        }
        builder!!.startObject()
            .field(RestTag.NOTEBOOK_DETAILS_FIELD)
        notebookDetails.toXContent(builder, xContentParams)
        return builder.endObject()
    }
}

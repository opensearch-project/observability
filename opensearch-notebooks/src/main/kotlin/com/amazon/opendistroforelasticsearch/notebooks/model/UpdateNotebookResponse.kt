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
import com.amazon.opendistroforelasticsearch.notebooks.model.RestTag.NOTEBOOK_ID_FIELD
import com.amazon.opendistroforelasticsearch.notebooks.util.logger
import org.opensearch.common.io.stream.StreamInput
import org.opensearch.common.io.stream.StreamOutput
import org.opensearch.common.xcontent.ToXContent
import org.opensearch.common.xcontent.XContentBuilder
import org.opensearch.common.xcontent.XContentParser
import org.opensearch.common.xcontent.XContentParser.Token
import org.opensearch.common.xcontent.XContentParserUtils
import java.io.IOException

/**
 * Notebook-update response.
 * <pre> JSON format
 * {@code
 * {
 *   "notebookId":"notebookId"
 * }
 * }</pre>
 */
internal class UpdateNotebookResponse(
    val notebookId: String?
) : BaseResponse() {

    @Throws(IOException::class)
    constructor(input: StreamInput) : this(
        notebookId = input.readString()
    )

    companion object {
        private val log by logger(UpdateNotebookResponse::class.java)

        /**
         * Parse the data from parser and create [UpdateNotebookResponse] object
         * @param parser data referenced at parser
         * @return created [UpdateNotebookResponse] object
         */
        fun parse(parser: XContentParser): UpdateNotebookResponse {
            var notebookId: String? = null
            XContentParserUtils.ensureExpectedToken(Token.START_OBJECT, parser.currentToken(), parser)
            while (Token.END_OBJECT != parser.nextToken()) {
                val fieldName = parser.currentName()
                parser.nextToken()
                when (fieldName) {
                    NOTEBOOK_ID_FIELD -> notebookId = parser.text()
                    else -> {
                        parser.skipChildren()
                        log.info("$LOG_PREFIX:Skipping Unknown field $fieldName")
                    }
                }
            }
            notebookId ?: throw IllegalArgumentException("$NOTEBOOK_ID_FIELD field absent")
            return UpdateNotebookResponse(notebookId)
        }
    }

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    override fun writeTo(output: StreamOutput) {
        output.writeString(notebookId)
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        return builder!!.startObject()
            .field(NOTEBOOK_ID_FIELD, notebookId)
            .endObject()
    }
}

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

import com.amazon.opendistroforelasticsearch.notebooks.util.createJsonParser
import org.opensearch.common.io.stream.StreamInput
import org.opensearch.common.io.stream.StreamOutput
import org.opensearch.common.xcontent.ToXContent
import org.opensearch.common.xcontent.XContentBuilder
import org.opensearch.common.xcontent.XContentFactory
import org.opensearch.common.xcontent.XContentParser
import java.io.IOException

/**
 * Get all notebooks response.
 * <pre> JSON format
 * {@code
 * {
 *   "startIndex":"0",
 *   "totalHits":"100",
 *   "totalHitRelation":"eq",
 *   "notebookDetailsList":[
 *      // refer [com.amazon.opendistroforelasticsearch.notebooks.model.notebookDetails]
 *   ]
 * }
 * }</pre>
 */
internal class GetAllNotebooksResponse : BaseResponse {
    val notebookList: NotebookDetailsSearchResults
    private val filterSensitiveInfo: Boolean

    constructor(notebookList: NotebookDetailsSearchResults, filterSensitiveInfo: Boolean) : super() {
        this.notebookList = notebookList
        this.filterSensitiveInfo = filterSensitiveInfo
    }

    @Throws(IOException::class)
    constructor(input: StreamInput) : this(input.createJsonParser())

    /**
     * Parse the data from parser and create [GetAllNotebooksResponse] object
     * @param parser data referenced at parser
     */
    constructor(parser: XContentParser) : super() {
        notebookList = NotebookDetailsSearchResults(parser)
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
        return notebookList.toXContent(builder, xContentParams)
    }
}

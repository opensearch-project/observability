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

import com.amazon.opendistroforelasticsearch.notebooks.model.RestTag.NOTEBOOK_LIST_FIELD
import org.elasticsearch.action.search.SearchResponse
import org.elasticsearch.common.xcontent.XContentParser

/**
 * Notebooks search results
 */
internal class NotebookDetailsSearchResults : SearchResults<NotebookDetails> {
    constructor(parser: XContentParser) : super(parser, NOTEBOOK_LIST_FIELD)

    constructor(from: Long, response: SearchResponse) : super(from, response, NOTEBOOK_LIST_FIELD)

    /**
     * {@inheritDoc}
     */
    override fun parseItem(parser: XContentParser, useId: String?): NotebookDetails {
        return NotebookDetails.parse(parser, useId)
    }
}

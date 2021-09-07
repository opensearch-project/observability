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

package org.opensearch.notebooks.model

import org.opensearch.notebooks.NotebooksPlugin.Companion.LOG_PREFIX
import org.opensearch.notebooks.model.RestTag.REST_OUTPUT_PARAMS
import org.opensearch.notebooks.util.logger
import org.apache.lucene.search.TotalHits
import org.apache.lucene.search.TotalHits.Relation
import org.apache.lucene.search.TotalHits.Relation.EQUAL_TO
import org.apache.lucene.search.TotalHits.Relation.GREATER_THAN_OR_EQUAL_TO
import org.opensearch.action.search.SearchResponse
import org.opensearch.common.xcontent.LoggingDeprecationHandler
import org.opensearch.common.xcontent.NamedXContentRegistry
import org.opensearch.common.xcontent.ToXContent.Params
import org.opensearch.common.xcontent.ToXContentObject
import org.opensearch.common.xcontent.XContentBuilder
import org.opensearch.common.xcontent.XContentParser
import org.opensearch.common.xcontent.XContentParserUtils
import org.opensearch.common.xcontent.XContentType

internal abstract class SearchResults<ItemClass : ToXContentObject> : ToXContentObject {
    val startIndex: Long
    val totalHits: Long
    val totalHitRelation: Relation
    val objectList: List<ItemClass>
    val objectListFieldName: String

    companion object {
        private val log by logger(SearchResults::class.java)
        private const val START_INDEX_TAG = "startIndex"
        private const val TOTAL_HITS_TAG = "totalHits"
        private const val TOTAL_HIT_RELATION_TAG = "totalHitRelation"
        private fun convertRelation(totalHitRelation: Relation): String {
            return if (totalHitRelation == EQUAL_TO) {
                "eq"
            } else {
                "gte"
            }
        }

        private fun convertRelation(totalHitRelation: String): Relation {
            return if (totalHitRelation == "eq") {
                EQUAL_TO
            } else {
                GREATER_THAN_OR_EQUAL_TO
            }
        }
    }

    constructor(
        startIndex: Long,
        totalHits: Long,
        totalHitRelation: Relation,
        objectList: List<ItemClass>,
        objectListFieldName: String
    ) {
        this.startIndex = startIndex
        this.totalHits = totalHits
        this.totalHitRelation = totalHitRelation
        this.objectList = objectList
        this.objectListFieldName = objectListFieldName
    }

    constructor(from: Long, response: SearchResponse, objectListFieldName: String) {
        val mutableList: MutableList<ItemClass> = mutableListOf()
        response.hits.forEach {
            val parser = XContentType.JSON.xContent().createParser(NamedXContentRegistry.EMPTY,
                LoggingDeprecationHandler.INSTANCE,
                it.sourceAsString)
            parser.nextToken()
            mutableList.add(parseItem(parser, it.id))
        }
        val totalHits = response.hits.totalHits
        val totalHitsVal: Long
        val totalHitsRelation: TotalHits.Relation
        if (totalHits == null) {
            totalHitsVal = mutableList.size.toLong()
            totalHitsRelation = TotalHits.Relation.EQUAL_TO
        } else {
            totalHitsVal = totalHits.value
            totalHitsRelation = totalHits.relation
        }
        this.startIndex = from
        this.totalHits = totalHitsVal
        this.totalHitRelation = totalHitsRelation
        this.objectList = mutableList
        this.objectListFieldName = objectListFieldName
    }

    /**
     * Parse the data from parser and create object
     * @param parser data referenced at parser
     */
    constructor(parser: XContentParser, objectListFieldName: String) {
        var startIndex: Long = 0
        var totalHits: Long = 0
        var totalHitRelation: Relation = EQUAL_TO
        var objectList: List<ItemClass>? = null
        XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_OBJECT, parser.currentToken(), parser)
        while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
            val fieldName = parser.currentName()
            parser.nextToken()
            when (fieldName) {
                START_INDEX_TAG -> startIndex = parser.longValue()
                TOTAL_HITS_TAG -> totalHits = parser.longValue()
                TOTAL_HIT_RELATION_TAG -> totalHitRelation = convertRelation(parser.text())
                objectListFieldName -> objectList = parseItemList(parser)
                else -> {
                    parser.skipChildren()
                    log.info("$LOG_PREFIX:Skipping Unknown field $fieldName")
                }
            }
        }
        objectList ?: throw IllegalArgumentException("$objectListFieldName field absent")
        if (totalHits == 0L) {
            totalHits = objectList.size.toLong()
        }
        this.startIndex = startIndex
        this.totalHits = totalHits
        this.totalHitRelation = totalHitRelation
        this.objectList = objectList
        this.objectListFieldName = objectListFieldName
    }

    /**
     * Parse the item list from parser
     * @param parser data referenced at parser
     * @return created list of items
     */
    private fun parseItemList(parser: XContentParser): List<ItemClass> {
        val retList: MutableList<ItemClass> = mutableListOf()
        XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_ARRAY, parser.currentToken(), parser)
        while (parser.nextToken() != XContentParser.Token.END_ARRAY) {
            retList.add(parseItem(parser))
        }
        return retList
    }

    /**
     * Parse the object item
     * @param parser data referenced at parser
     * @return created item
     */
    abstract fun parseItem(parser: XContentParser, useId: String? = null): ItemClass

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: Params?): XContentBuilder {
        val xContentParams = params ?: REST_OUTPUT_PARAMS
        builder!!.startObject()
            .field(START_INDEX_TAG, startIndex)
            .field(TOTAL_HITS_TAG, totalHits)
            .field(TOTAL_HIT_RELATION_TAG, convertRelation(totalHitRelation))
            .startArray(objectListFieldName)
        objectList.forEach { it.toXContent(builder, xContentParams) }
        return builder.endArray().endObject()
    }
}

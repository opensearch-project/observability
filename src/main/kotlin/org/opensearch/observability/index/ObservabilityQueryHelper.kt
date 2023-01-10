/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.index

import org.opensearch.OpenSearchStatusException
import org.opensearch.index.query.BoolQueryBuilder
import org.opensearch.index.query.Operator
import org.opensearch.index.query.QueryBuilder
import org.opensearch.index.query.QueryBuilders
import org.opensearch.observability.model.ObservabilityObjectType
import org.opensearch.observability.model.RestTag.CREATED_TIME_FIELD
import org.opensearch.observability.model.RestTag.NAME_FIELD
import org.opensearch.observability.model.RestTag.QUERY_FIELD
import org.opensearch.observability.model.RestTag.UPDATED_TIME_FIELD
import org.opensearch.rest.RestStatus
import org.opensearch.search.builder.SearchSourceBuilder
import org.opensearch.search.sort.SortOrder
import java.util.EnumSet

/**
 * Helper class for Get operations.
 */
internal class ObservabilityQueryHelper(private val types: EnumSet<ObservabilityObjectType>) {
    companion object {
        private val METADATA_RANGE_FIELDS = setOf(
            UPDATED_TIME_FIELD,
            CREATED_TIME_FIELD
        )

        // keyword and text fields are under observability object and should be prepended with type
        private val KEYWORD_FIELDS: Set<String> = setOf()
        private val TEXT_FIELDS = setOf(
            NAME_FIELD
        )

        private val METADATA_FIELDS = METADATA_RANGE_FIELDS
        private val OBSERVABILITY_OBJECT_FIELDS = KEYWORD_FIELDS.union(TEXT_FIELDS)
        private val ALL_FIELDS = METADATA_FIELDS.union(OBSERVABILITY_OBJECT_FIELDS)

        val FILTER_PARAMS = ALL_FIELDS.union(setOf(QUERY_FIELD))
    }

    private val prefixes = if (types.size == 0) {
        ObservabilityObjectType.getAll()
    } else {
        types
    }

    fun addSortField(sourceBuilder: SearchSourceBuilder, sortField: String?, sortOrder: SortOrder?) {
        val order = sortOrder ?: SortOrder.ASC
        if (sortField == null) {
            sourceBuilder.sort(UPDATED_TIME_FIELD, order)
        } else {
            val fields = mutableListOf<String>()
            when {
                METADATA_RANGE_FIELDS.contains(sortField) -> fields.add(sortField)
                KEYWORD_FIELDS.contains(sortField) -> fields.addAll(types.map { "${it.tag}.$sortField" })
                TEXT_FIELDS.contains(sortField) -> fields.addAll(types.map { "${it.tag}.$sortField.keyword" })
                else -> throw OpenSearchStatusException("Field $sortField not acceptable", RestStatus.NOT_ACCEPTABLE)
            }
            fields.forEach { sourceBuilder.sort(it, order) }
        }
    }

    fun addTypeFilters(query: BoolQueryBuilder) {
        if (types.size > 0) {
            types.forEach {
                query.should().add(QueryBuilders.existsQuery(it.tag))
            }
            query.minimumShouldMatch(1)
        }
    }

    fun addQueryFilters(query: BoolQueryBuilder, filterParams: Map<String, String>) {
        filterParams.forEach {
            when {
                QUERY_FIELD == it.key -> query.filter(getQueryAllBuilder(it.value)) // all text search
                METADATA_RANGE_FIELDS.contains(it.key) -> query.filter(getRangeQueryBuilder(it.key, it.value))
                KEYWORD_FIELDS.contains(it.key) -> addTermsQueryBuilder(query, it.key, it.value)
                TEXT_FIELDS.contains(it.key) -> addMatchQueryBuilder(query, it.key, it.value)
                else -> throw OpenSearchStatusException("Query on ${it.key} not acceptable", RestStatus.NOT_ACCEPTABLE)
            }
        }
    }

    private fun getQueryAllBuilder(queryValue: String): QueryBuilder {
        val allQuery = QueryBuilders.queryStringQuery(queryValue)
        OBSERVABILITY_OBJECT_FIELDS.forEach {
            prefixes.forEach { type -> allQuery.field("$type.$it") }
        }
        return allQuery
    }

    private fun getRangeQueryBuilder(queryKey: String, queryValue: String): QueryBuilder {
        val range = queryValue.split("..")
        return when (range.size) {
            1 -> QueryBuilders.termQuery(queryKey, queryValue)
            2 -> {
                val rangeQuery = QueryBuilders.rangeQuery(queryKey)
                rangeQuery.from(range[0])
                rangeQuery.to(range[1])
                rangeQuery
            }
            else -> {
                throw OpenSearchStatusException(
                    "Invalid Range format $queryValue, allowed format 'exact' or 'from..to'",
                    RestStatus.NOT_ACCEPTABLE
                )
            }
        }
    }

    private fun addTermsQueryBuilder(query: BoolQueryBuilder, queryKey: String, queryValue: String) {
        prefixes.forEach { query.filter(QueryBuilders.termsQuery("${it.tag}.$queryKey", queryValue.split(","))) }
    }

    private fun addMatchQueryBuilder(query: BoolQueryBuilder, queryKey: String, queryValue: String) {
        prefixes.forEach {
            query.should().add(QueryBuilders.matchQuery("${it.tag}.$queryKey", queryValue).operator(Operator.AND))
        }
        query.minimumShouldMatch(1)
    }
}

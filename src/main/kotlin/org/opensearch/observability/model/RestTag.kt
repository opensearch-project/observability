/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
package org.opensearch.observability.model

import org.opensearch.core.xcontent.ToXContent
import org.opensearch.core.xcontent.ToXContent.Params

/**
 * Plugin Rest common Tags.
 */
internal object RestTag {
    const val QUERY_FIELD = "query"
    const val OBJECT_LIST_FIELD = "observabilityObjectList"
    const val DELETE_RESPONSE_LIST_TAG = "deleteResponseList"
    const val OBJECT_TYPE_FIELD = "objectType"
    const val OBJECT_ID_FIELD = "objectId"
    const val OBJECT_ID_LIST_FIELD = "objectIdList"
    const val UPDATED_TIME_FIELD = "lastUpdatedTimeMs"
    const val CREATED_TIME_FIELD = "createdTimeMs"
    const val TENANT_FIELD = "tenant"
    const val ACCESS_LIST_FIELD = "access"
    const val NAME_FIELD = "name"
    const val FROM_INDEX_FIELD = "fromIndex"
    const val MAX_ITEMS_FIELD = "maxItems"
    const val SORT_FIELD_FIELD = "sortField"
    const val SORT_ORDER_FIELD = "sortOrder"
    const val FILTER_PARAM_LIST_FIELD = "filterParamList"
    const val NOTEBOOK_FIELD = "notebook"
    const val SAVED_QUERY_FIELD = "savedQuery"
    const val SAVED_VISUALIZATION_FIELD = "savedVisualization"
    const val OPERATIONAL_PANEL_FIELD = "operationalPanel"
    const val APPLICATION_FIELD = "application"
    const val TIMESTAMP_FIELD = "timestamp"
    const val SCHEDULE_INFO_TAG = "schedule"
    const val SCHEDULED_JOB_TYPE_TAG = "jobType"
    const val ID_FIELD = "id"
    const val IS_ENABLED_TAG = "isEnabled"
    private val INCLUDE_ID = Pair(OBJECT_ID_FIELD, "true")
    private val EXCLUDE_ACCESS = Pair(ACCESS_LIST_FIELD, "false")
    val REST_OUTPUT_PARAMS: Params = ToXContent.MapParams(mapOf(INCLUDE_ID))
    val FILTERED_REST_OUTPUT_PARAMS: Params = ToXContent.MapParams(mapOf(INCLUDE_ID, EXCLUDE_ACCESS))
}

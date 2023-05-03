/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
package org.opensearch.integrations.model

<<<<<<< HEAD
import org.opensearch.core.xcontent.ToXContent
import org.opensearch.core.xcontent.ToXContent.Params

=======
>>>>>>> 89dda4a6 (create integration doc)
/**
 * Plugin Rest common Tags.
 */
internal object RestTag {
<<<<<<< HEAD
    const val QUERY_FIELD = "query"
    const val OBJECT_LIST_FIELD = "observabilityObjectList"
    const val DELETE_RESPONSE_LIST_TAG = "deleteResponseList"
    const val OBJECT_TYPE_FIELD = "objectType"
    const val OBJECT_ID_FIELD = "objectId"
    const val OBJECT_ID_LIST_FIELD = "objectIdList"
=======
    const val OBJECT_ID_FIELD = "objectId"
>>>>>>> 89dda4a6 (create integration doc)
    const val UPDATED_TIME_FIELD = "lastUpdatedTimeMs"
    const val CREATED_TIME_FIELD = "createdTimeMs"
    const val TENANT_FIELD = "tenant"
    const val ACCESS_LIST_FIELD = "access"
<<<<<<< HEAD
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
    const val INSTANCE_FIELD = "instance"
    const val TEMPLATE_FIELD = "template"
    private val INCLUDE_ID = Pair(OBJECT_ID_FIELD, "true")
    private val EXCLUDE_ACCESS = Pair(ACCESS_LIST_FIELD, "false")
    val REST_OUTPUT_PARAMS: Params = ToXContent.MapParams(mapOf(INCLUDE_ID))
    val FILTERED_REST_OUTPUT_PARAMS: Params = ToXContent.MapParams(mapOf(INCLUDE_ID, EXCLUDE_ACCESS))
=======
    const val INSTANCE_FIELD = "instance"
    const val TEMPLATE_FIELD = "template"
>>>>>>> 89dda4a6 (create integration doc)
}

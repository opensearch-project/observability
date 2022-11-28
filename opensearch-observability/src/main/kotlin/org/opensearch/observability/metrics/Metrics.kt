/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.metrics

import com.github.wnameless.json.unflattener.JsonUnflattener
import org.json.JSONObject

/**
 * Enum to hold all the metrics that need to be logged into _plugins/_observability/_local/stats API
 */
enum class Metrics(val metricName: String, val counter: Counter<*>) {
    REQUEST_TOTAL("request_total", BasicCounter()),
    REQUEST_INTERVAL_COUNT("request_count", RollingCounter()),
    REQUEST_SUCCESS("success_count", RollingCounter()),
    REQUEST_USER_ERROR("failed_request_count_user_error", RollingCounter()),
    REQUEST_SYSTEM_ERROR("failed_request_count_system_error", RollingCounter()),

    /**
     * Exceptions from:
     * @see org.opensearch.reportsscheduler.action.PluginBaseAction
     */
    OBSERVABILITY_EXCEPTIONS_OPENSEARCH_STATUS_EXCEPTION("exception.opensearch_status", RollingCounter()),
    OBSERVABILITY_EXCEPTIONS_OPENSEARCH_SECURITY_EXCEPTION("exception.opensearch_security", RollingCounter()),
    OBSERVABILITY_EXCEPTIONS_VERSION_CONFLICT_ENGINE_EXCEPTION("exception.version_conflict_engine", RollingCounter()),
    OBSERVABILITY_EXCEPTIONS_INDEX_NOT_FOUND_EXCEPTION("exception.index_not_found", RollingCounter()),
    OBSERVABILITY_EXCEPTIONS_INVALID_INDEX_NAME_EXCEPTION(
        "exception.invalid_index_name", RollingCounter()
    ),
    OBSERVABILITY_EXCEPTIONS_ILLEGAL_ARGUMENT_EXCEPTION(
        "exception.illegal_argument", RollingCounter()
    ),
    OBSERVABILITY_EXCEPTIONS_ILLEGAL_STATE_EXCEPTION(
        "exception.illegal_state", RollingCounter()
    ),
    OBSERVABILITY_EXCEPTIONS_IO_EXCEPTION(
        "exception.io", RollingCounter()
    ),
    OBSERVABILITY_EXCEPTIONS_INTERNAL_SERVER_ERROR(
        "exception.internal_server_error", RollingCounter()
    ),

    OBSERVABILITY_SECURITY_PERMISSION_ERROR("security_permission_error", RollingCounter()),
    OBSERVABILITY_PERMISSION_USER_ERROR("permission_user_error", RollingCounter());

    companion object {
        private val values: Array<Metrics> = Metrics.values()

        /**
         * Converts the enum metric values to JSON string
         */
        private fun collectToJSON(): String {
            val metricsJSONObject = JSONObject()
            for (metric in values) {
                metricsJSONObject.put(metric.metricName, metric.counter.value)
            }
            return metricsJSONObject.toString()
        }

        /**
         * Unflattens the JSON to nested JSON for easy readability and parsing
         * The metric name is unflattened in the output JSON on the period '.' delimiter
         *
         * For ex:  { "a.b.c_d" : 2 } becomes
         * {
         *   "a" : {
         *     "b" : {
         *       "c_d" : 2
         *     }
         *   }
         * }
         */
        fun collectToFlattenedJSON(): String {
            return JsonUnflattener.unflatten(collectToJSON())
        }
    }
}

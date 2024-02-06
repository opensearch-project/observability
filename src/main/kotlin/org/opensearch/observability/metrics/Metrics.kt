/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.metrics

import com.github.wnameless.json.unflattener.JsonUnflattener
import org.json.JSONObject
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.model.ObservabilityObjectType
import org.opensearch.observability.util.logger

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
     * @see org.opensearch.observability.action.PluginBaseAction
     */
    OBSERVABILITY_EXCEPTIONS_OPENSEARCH_STATUS_EXCEPTION("exception.opensearch_status", RollingCounter()),
    OBSERVABILITY_EXCEPTIONS_OPENSEARCH_SECURITY_EXCEPTION("exception.opensearch_security", RollingCounter()),
    OBSERVABILITY_EXCEPTIONS_VERSION_CONFLICT_ENGINE_EXCEPTION("exception.version_conflict_engine", RollingCounter()),
    OBSERVABILITY_EXCEPTIONS_INDEX_NOT_FOUND_EXCEPTION("exception.index_not_found", RollingCounter()),
    OBSERVABILITY_EXCEPTIONS_INVALID_INDEX_NAME_EXCEPTION(
        "exception.invalid_index_name",
        RollingCounter()
    ),
    OBSERVABILITY_EXCEPTIONS_ILLEGAL_ARGUMENT_EXCEPTION(
        "exception.illegal_argument",
        RollingCounter()
    ),
    OBSERVABILITY_EXCEPTIONS_ILLEGAL_STATE_EXCEPTION(
        "exception.illegal_state",
        RollingCounter()
    ),
    OBSERVABILITY_EXCEPTIONS_IO_EXCEPTION(
        "exception.io",
        RollingCounter()
    ),
    OBSERVABILITY_EXCEPTIONS_INTERNAL_SERVER_ERROR(
        "exception.internal_server_error",
        RollingCounter()
    ),

    // ==== REST endpoint metrics ==== //

    // Observability counters
    OBSERVABILITY_CREATE_TOTAL("observability.create.total", BasicCounter()),
    OBSERVABILITY_CREATE_INTERVAL_COUNT("observability.create.count", RollingCounter()),
    OBSERVABILITY_CREATE_USER_ERROR("observability.create.user_error", RollingCounter()),
    OBSERVABILITY_CREATE_SYSTEM_ERROR("observability.create.system_error", RollingCounter()),
    OBSERVABILITY_GET_TOTAL("observability.get.total", BasicCounter()),
    OBSERVABILITY_GET_INTERVAL_COUNT("observability.get.count", RollingCounter()),
    OBSERVABILITY_GET_USER_ERROR("observability.get.user_error", RollingCounter()),
    OBSERVABILITY_GET_SYSTEM_ERROR("observability.get.system_error", RollingCounter()),
    OBSERVABILITY_UPDATE_TOTAL("observability.update.total", BasicCounter()),
    OBSERVABILITY_UPDATE_INTERVAL_COUNT("observability.update.count", RollingCounter()),
    OBSERVABILITY_UPDATE_USER_ERROR("observability.update.user_error", RollingCounter()),
    OBSERVABILITY_UPDATE_SYSTEM_ERROR("observability.update.system_error", RollingCounter()),
    OBSERVABILITY_DELETE_TOTAL("observability.delete.total", BasicCounter()),
    OBSERVABILITY_DELETE_INTERVAL_COUNT("observability.delete.count", RollingCounter()),
    OBSERVABILITY_DELETE_USER_ERROR("observability.delete.user_error", RollingCounter()),
    OBSERVABILITY_DELETE_SYSTEM_ERROR("observability.delete.system_error", RollingCounter()),

    // Per object type action counters, object type is only known for CREATE and UPDATE
    NOTEBOOK_CREATE_TOTAL("notebook.create.total", BasicCounter()),
    NOTEBOOK_CREATE_INTERVAL_COUNT("notebook.create.count", RollingCounter()),
    NOTEBOOK_UPDATE_TOTAL("notebook.update.total", BasicCounter()),
    NOTEBOOK_UPDATE_INTERVAL_COUNT("notebook.update.count", RollingCounter()),

    SAVED_QUERY_CREATE_TOTAL("saved_query.create.total", BasicCounter()),
    SAVED_QUERY_CREATE_INTERVAL_COUNT("saved_query.create.count", RollingCounter()),
    SAVED_QUERY_UPDATE_TOTAL("saved_query.update.total", BasicCounter()),
    SAVED_QUERY_UPDATE_INTERVAL_COUNT("saved_query.update.count", RollingCounter()),

    SAVED_VISUALIZATION_CREATE_TOTAL("saved_visualization.create.total", BasicCounter()),
    SAVED_VISUALIZATION_CREATE_INTERVAL_COUNT("saved_visualization.create.count", RollingCounter()),
    SAVED_VISUALIZATION_UPDATE_TOTAL("saved_visualization.update.total", BasicCounter()),
    SAVED_VISUALIZATION_UPDATE_INTERVAL_COUNT("saved_visualization.update.count", RollingCounter()),

    OPERATIONAL_PANEL_CREATE_TOTAL("operational_panel.create.total", BasicCounter()),
    OPERATIONAL_PANEL_CREATE_INTERVAL_COUNT("operational_panel.create.count", RollingCounter()),
    OPERATIONAL_PANEL_UPDATE_TOTAL("operational_panel.update.total", BasicCounter()),
    OPERATIONAL_PANEL_UPDATE_INTERVAL_COUNT("operational_panel.update.count", RollingCounter()),

    APPLICATION_CREATE_TOTAL("application.create.total", BasicCounter()),
    APPLICATION_CREATE_INTERVAL_COUNT("application.create.count", RollingCounter()),
    APPLICATION_UPDATE_TOTAL("application.update.total", BasicCounter()),
    APPLICATION_UPDATE_INTERVAL_COUNT("application.update.count", RollingCounter()),

    TIMESTAMP_CREATE_TOTAL("timestamp.create.total", BasicCounter()),
    TIMESTAMP_CREATE_INTERVAL_COUNT("timestamp.create.count", RollingCounter()),
    TIMESTAMP_UPDATE_TOTAL("timestamp.update.total", BasicCounter()),
    TIMESTAMP_UPDATE_INTERVAL_COUNT("timestamp.update.count", RollingCounter()),

    // Permission errors
    OBSERVABILITY_SECURITY_PERMISSION_ERROR("security_permission_error", RollingCounter()),
    OBSERVABILITY_PERMISSION_USER_ERROR("permission_user_error", RollingCounter());

    companion object {
        private val log by logger(Metrics::class.java)
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

        /**
         * Increment observability object action counter
         *
         * @param type object type
         * @param action create or update
         */
        fun incrementObservabilityObjectActionCounter(type: ObservabilityObjectType, action: Action) {
            try {
                Metrics.valueOf("${type.name}_${action.name}_TOTAL").counter.increment()
                Metrics.valueOf("${type.name}_${action.name}_INTERVAL_COUNT").counter.increment()
            } catch (e: IllegalArgumentException) {
                log.warn("$LOG_PREFIX:IllegalArgumentException invalid type or action for counter metric", e)
            }
        }
    }

    /**
     * Metrics action for per object type counters. Type is only known for CREATE and UPDATE.
     *
     * @constructor Action
     */
    enum class Action {
        CREATE,
        UPDATE
    }
}

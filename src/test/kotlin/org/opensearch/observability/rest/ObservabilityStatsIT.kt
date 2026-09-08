/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.rest

import org.junit.Assert
import org.opensearch.core.rest.RestStatus
import org.opensearch.observability.ObservabilityPlugin.Companion.BASE_OBSERVABILITY_URI
import org.opensearch.observability.PluginRestTestCase
import org.opensearch.rest.RestRequest

class ObservabilityStatsIT : PluginRestTestCase() {
    /**
     * Regression test for the node crash on GET /_plugins/_observability/_local/stats.
     *
     * The stats endpoint flattens its metrics through json-flattener, which is built against
     * Jackson 2.x and loads com.fasterxml.jackson.databind.ObjectMapper at runtime. Bundling
     * only the Jackson 3.x (tools.jackson) databind made this call throw NoClassDefFoundError
     * on an uncaught-exception thread, which tripped OpenSearchUncaughtExceptionHandler and
     * exited the node process. This test runs against the installed plugin distribution, so a
     * Jackson databind classpath mismatch takes the node down and fails here instead of shipping.
     */
    fun `test local stats endpoint responds without crashing the node`() {
        val statsResponse =
            executeRequest(
                RestRequest.Method.GET.name,
                "$BASE_OBSERVABILITY_URI/_local/stats",
                "",
                RestStatus.OK.status,
            )
        // Assert the json-flattener unflatten path actually produced output. A flat counter
        // such as request_total stays top level, while exception.* keys are nested under
        // exception, which only happens if JsonUnflattener ran successfully on the classpath.
        Assert.assertTrue(
            "Stats response should contain the request_total counter",
            statsResponse.has("request_total"),
        )
        Assert.assertTrue(
            "Stats response should contain the nested exception counters",
            statsResponse.has("exception"),
        )
    }
}

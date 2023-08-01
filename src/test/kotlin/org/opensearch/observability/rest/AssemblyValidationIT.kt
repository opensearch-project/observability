/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.rest

import org.junit.Assert
import org.opensearch.observability.PluginRestTestCase
import org.opensearch.rest.RestRequest
import org.opensearch.core.rest.RestStatus

class AssemblyValidationIT : PluginRestTestCase() {
    companion object {
        private const val TRACES_MAPPING_TEMPLATE_NAME = "ss4o_traces_template"
        private const val METRICS_MAPPING_TEMPLATE_NAME = "ss4o_metrics_template"
    }

    fun `test observability metrics template was created`() {
        // verify metrics mapping template was created successfully as part of the plugin initialization
        var response = executeRequest(
            RestRequest.Method.GET.name,
            "/_index_template/$METRICS_MAPPING_TEMPLATE_NAME",
            "{}",
            RestStatus.OK.status
        )
        Assert.assertNotNull(response.get("index_templates"))
        Assert.assertNotNull(!response.get("index_templates").asJsonArray.isEmpty)

        // verify traces mapping template was created successfully as part of the plugin initialization
        /*
         * TODO I'm not sure why, but when this test is moved to its own test function, it fails.
         * The new function passes if run alone, but not as part as a suite.
         * Exponential backoff to very long sleep intervals doesn't work either.
         */
        response = executeRequest(
            RestRequest.Method.GET.name,
            "/_index_template/$TRACES_MAPPING_TEMPLATE_NAME",
            "{}",
            RestStatus.OK.status
        )
        Assert.assertNotNull(response.get("index_templates"))
        Assert.assertNotNull(!response.get("index_templates").asJsonArray.isEmpty)
    }
}

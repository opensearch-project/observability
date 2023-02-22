/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.rest

import org.junit.Assert
import org.opensearch.observability.PluginRestTestCase
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestStatus

class AssemblyValidationIT : PluginRestTestCase() {
    companion object {
        private const val TRACES_MAPPING_TEMPLATE_NAME = "sso_trace_template"
        private const val METRICS_MAPPING_TEMPLATE_NAME = "sso_metric_template"
    }

    fun `test observability traces template and was created`() {
        // verify traces mapping template was created successfully as part of the plugin initialization
        Thread.sleep(1000)
        var response = executeRequest(
            RestRequest.Method.GET.name,
            "/_index_template/$TRACES_MAPPING_TEMPLATE_NAME",
            "",
            RestStatus.OK.status
        )
        Thread.sleep(1000)
        Assert.assertNotNull(response.get("index_templates"))
        Assert.assertNotNull(!response.get("index_templates").asJsonArray.isEmpty)

        // verify metrics mapping template was created successfully as part of the plugin initialization
        response = executeRequest(
            RestRequest.Method.GET.name,
            "/_index_template/$METRICS_MAPPING_TEMPLATE_NAME",
            "",
            RestStatus.OK.status
        )
        Thread.sleep(1000)
        Assert.assertNotNull(response.get("index_templates"))
        Assert.assertNotNull(!response.get("index_templates").asJsonArray.isEmpty)
    }
}

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.rest

import org.junit.Assert
import org.opensearch.observability.PluginRestTestCase
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestStatus

class PluginStartedIT : PluginRestTestCase() {
    companion object {
        private const val METRICS_MAPPING_TEMPLATE_NAME = "sso_metric_template"
        private const val METRICS_INDEX_NAME = "sso_metrics-default-namespace"
    }

    fun `test observability metrics template and defaut data stream index are created`() {
        // verify metrics mapping template was created successfully as part of the plugin initialization
        var response = executeRequest(
            RestRequest.Method.GET.name,
            "/_template/${METRICS_MAPPING_TEMPLATE_NAME}",
            "",
            RestStatus.OK.status
        )
        Thread.sleep(1000)
        Assert.assertNotNull(response.get(METRICS_MAPPING_TEMPLATE_NAME))

        // verify metrics mapping template was created successfully as part of the plugin initialization
        response = executeRequest(
            RestRequest.Method.GET.name,
            "/_data_stream/${METRICS_INDEX_NAME}",
            "",
            RestStatus.OK.status
        )

        Thread.sleep(1000)
        Assert.assertNotNull(response.get("data_streams").asJsonObject)
        Assert.assertNotNull(response.get("data_streams").asJsonObject.getAsJsonArray().get(0))
    }

}

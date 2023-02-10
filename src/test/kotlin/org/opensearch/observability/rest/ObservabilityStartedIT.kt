/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.rest

import org.junit.Assert
import org.opensearch.action.admin.indices.datastream.GetDataStreamAction
import org.opensearch.action.admin.indices.template.get.GetIndexTemplatesRequest
import org.opensearch.observability.ObservabilityPlugin
import org.opensearch.observability.ObservabilityPluginIT
import org.opensearch.observability.PluginRestTestCase
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestStatus
import org.opensearch.test.OpenSearchIntegTestCase

class ObservabilityStartedIT : PluginRestTestCase() {
    companion object {
        private const val METRICS_MAPPING_TEMPLATE_NAME = "sso_metrics_template"
        private const val METRICS_INDEX_NAME = "sso_metrics-default-namespace"
    }

    fun `test observability metrics template was created`() {
        // verify metrics mapping template was created successfully as part of the plugin initialization
        val response = executeRequest(
            RestRequest.Method.GET.name,
            "/_index_template/${METRICS_MAPPING_TEMPLATE_NAME}",
            "",
            RestStatus.OK.status
        )
        Assert.assertNotNull(response.get(METRICS_MAPPING_TEMPLATE_NAME))
    }

    fun `test observability metrics default data stream was created`() {
        // verify metrics mapping template was created successfully as part of the plugin initialization
        val response = executeRequest(
            RestRequest.Method.GET.name,
            "/_data_stream/${METRICS_INDEX_NAME}",
            "",
            RestStatus.OK.status
        )
        Assert.assertNotNull(response.get("data_streams").asJsonObject)
        Assert.assertNotNull(response.get("data_streams").asJsonObject.getAsJsonArray().get(0))
    }
}

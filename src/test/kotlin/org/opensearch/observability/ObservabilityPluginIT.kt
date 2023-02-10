/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
package org.opensearch.observability

import org.opensearch.action.admin.cluster.health.ClusterHealthRequest
import org.opensearch.action.admin.cluster.node.info.NodesInfoRequest
import org.opensearch.action.admin.cluster.node.info.PluginsAndModules
import org.opensearch.action.admin.indices.datastream.CreateDataStreamAction
import org.opensearch.action.admin.indices.datastream.GetDataStreamAction
import org.opensearch.action.admin.indices.template.get.GetIndexTemplatesRequest
import org.opensearch.cluster.health.ClusterHealthStatus
import org.opensearch.observability.index.ObservabilityMetricsIndex
import org.opensearch.plugins.PluginInfo
import org.opensearch.test.OpenSearchIntegTestCase

class ObservabilityPluginIT : OpenSearchIntegTestCase() {
    companion object {
        private const val METRICS_MAPPING_TEMPLATE_NAME = "sso_metrics_template"
        private const val METRICS_INDEX_NAME = "sso_metrics-default-namespace"
    }

    fun testPluginsAreInstalled() {
        val request = ClusterHealthRequest()
        val response = client().admin().cluster().health(request).actionGet()
        assertEquals(ClusterHealthStatus.GREEN, response.status)
        val nodesInfoRequest = NodesInfoRequest()
        nodesInfoRequest.addMetric(NodesInfoRequest.Metric.PLUGINS.metricName())
        val nodesInfoResponse = client().admin().cluster().nodesInfo(nodesInfoRequest).actionGet()
        val pluginInfos = nodesInfoResponse.nodes[0].getInfo(PluginsAndModules::class.java).pluginInfos
        assertTrue(
            pluginInfos.stream()
                .anyMatch { pluginInfo: PluginInfo -> pluginInfo.name == "opensearch-job-scheduler" }
        )
        assertTrue(
            pluginInfos.stream()
                .anyMatch { pluginInfo: PluginInfo -> pluginInfo.name == "opensearch-observability" }
        )

        //verify metrics mapping template was created successfully as part of the plugin initialization
        val metricsTemplate = client().admin().indices().getTemplates(GetIndexTemplatesRequest(Companion.METRICS_MAPPING_TEMPLATE_NAME)).actionGet()
        assertTrue(
            metricsTemplate.indexTemplates.isNotEmpty()
        )

        //verify metrics default data stream was created successfully as part of the plugin initialization
        val streams = client().admin().indices().getDataStreams(GetDataStreamAction.Request(arrayOf(METRICS_INDEX_NAME))).actionGet()
        assertTrue(
            streams.dataStreams.isNotEmpty()
        )

    }
}

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
package org.opensearch.observability

import org.opensearch.action.admin.cluster.health.ClusterHealthRequest
import org.opensearch.action.admin.cluster.node.info.NodesInfoRequest
import org.opensearch.action.admin.cluster.node.info.PluginsAndModules
import org.opensearch.cluster.health.ClusterHealthStatus
import org.opensearch.plugins.PluginInfo
import org.opensearch.test.OpenSearchIntegTestCase

class ObservabilityPluginIT : OpenSearchIntegTestCase() {
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
                .anyMatch { pluginInfo: PluginInfo -> pluginInfo.name == "opensearch-observability" }
        )
    }
}

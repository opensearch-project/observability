/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
package com.amazon.opendistroforelasticsearch.notebooks

import org.elasticsearch.action.admin.cluster.health.ClusterHealthRequest
import org.elasticsearch.action.admin.cluster.node.info.NodesInfoRequest
import org.elasticsearch.action.admin.cluster.node.info.PluginsAndModules
import org.elasticsearch.cluster.health.ClusterHealthStatus
import org.elasticsearch.plugins.PluginInfo
import org.elasticsearch.test.ESIntegTestCase

class NotebooksPluginIT : ESIntegTestCase() {
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
                .anyMatch { pluginInfo: PluginInfo -> pluginInfo.name == "opendistro-notebooks" })
    }
}

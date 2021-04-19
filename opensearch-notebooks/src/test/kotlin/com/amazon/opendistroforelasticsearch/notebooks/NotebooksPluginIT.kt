/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

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

import org.opensearch.action.admin.cluster.health.ClusterHealthRequest
import org.opensearch.action.admin.cluster.node.info.NodesInfoRequest
import org.opensearch.action.admin.cluster.node.info.PluginsAndModules
import org.opensearch.cluster.health.ClusterHealthStatus
import org.opensearch.plugins.PluginInfo
import org.opensearch.test.OpenSearchIntegTestCase

class NotebooksPluginIT : OpenSearchIntegTestCase() {
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
                .anyMatch { pluginInfo: PluginInfo -> pluginInfo.name == "opensearch-notebooks" })
    }
}

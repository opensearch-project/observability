/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.bwc

import org.opensearch.common.settings.Settings
import org.opensearch.observability.rest.GetObjectIT
import org.opensearch.test.rest.OpenSearchRestTestCase
import java.util.List
import java.util.Map

public class TABackwardCompatibilityIT : OpenSearchRestTestCase() {

    companion object {
        private val CLUSTER_TYPE: ClusterType = ClusterType.parse(System.getProperty("tests.rest.bwcsuite"))
        private val CLUSTER_NAME: String = System.getProperty("tests.clustername")
    }

    override fun preserveReposUponCompletion(): Boolean {
        return true
    }

    override fun restClientSettings(): Settings {
        return Settings.builder()
            .put(super.restClientSettings())
            // increase the timeout here to 90 seconds to handle long waits for a green
            // cluster health. the waits for green need to be longer than a minute to
            // account for delayed shards
            .put(CLIENT_SOCKET_TIMEOUT, "90s")
            .build()
    }

    private enum class ClusterType {
        OLD,
        MIXED,
        UPGRADED;

        companion object {
            fun parse(value: String): ClusterType {
                return when (value) {
                    "old_cluster" -> OLD
                    "mixed_cluster" -> MIXED
                    "upgraded_cluster" -> UPGRADED
                    else -> {
                        throw AssertionError("unknown cluster type: $value")
                    }
                }
            }
        }
    }

    @Throws(Exception::class)
    @SuppressWarnings("unchecked")
    fun `test backwards compatibility`() {
        val uri = getUri()
        val responseMap = getAsMap(uri)["nodes"] as Map<String, Map<String, Any>>
        for (response in responseMap.values()) {
            val plugins = response["plugins"] as List<Map<String, Any>>
            val pluginNames = plugins.map { plugin -> plugin["name"] }.toSet()
            return when (CLUSTER_TYPE) {
                ClusterType.OLD -> {
                    assertTrue(pluginNames.contains("opensearch-notebooks"))
                    callOldIntegTest()
                }
                ClusterType.MIXED -> {
                    assertTrue(pluginNames.contains("opensearch-observability"))
                    callMixedIntegTest()
                }
                ClusterType.UPGRADED -> {
                    assertTrue(pluginNames.contains("opensearch-observability"))
                    callUpgradedIntegTest()
                }
            }
            break
        }
    }

    private fun getUri(): String {
        return when (CLUSTER_TYPE) {
            ClusterType.OLD -> "_nodes/" + CLUSTER_NAME + "-0/plugins"
            ClusterType.MIXED -> {
                when (System.getProperty("tests.rest.bwcsuite_round")) {
                    "second" -> "_nodes/$CLUSTER_NAME-1/plugins"
                    "third" -> "_nodes/$CLUSTER_NAME-2/plugins"
                    else -> "_nodes/$CLUSTER_NAME-0/plugins"
                }
            }
            ClusterType.UPGRADED -> "_nodes/plugins"
            else -> throw AssertionError("unknown cluster type: " + CLUSTER_TYPE)
        }
    }

    private fun callOldIntegTest() {
        NotebooksIT().`test create notebook`()
        NotebooksIT().`test get notebook`()
        NotebooksIT().`test get all notebooks`()
    }

    private fun callMixedIntegTest() {
//        GetObjectIT().`test get single object`()
//        CreateObjectIT().`test create notebook`()
    }

    private fun callUpgradedIntegTest() {
        GetObjectIT().`test get single object`()
    }
}

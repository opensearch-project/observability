/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.bwc

import org.junit.Assert
import org.opensearch.common.settings.Settings
import org.opensearch.observability.ObservabilityPlugin.Companion.BASE_NOTEBOOKS_URI
import org.opensearch.observability.ObservabilityPlugin.Companion.BASE_OBSERVABILITY_URI
import org.opensearch.observability.PluginRestTestCase
import org.opensearch.observability.constructNotebookRequest
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestStatus
// import kotlin.Collections.List
// import kotlin.Collections.Map

class TABackwardCompatibilityIT : PluginRestTestCase() {

    companion object {
        private val CLUSTER_TYPE: ClusterType = ClusterType.parse(System.getProperty("tests.rest.bwcsuite"))
        private val CLUSTER_NAME: String = System.getProperty("tests.clustername")
    }

    override fun preserveReposUponCompletion(): Boolean = true

    override fun preserveIndicesUponCompletion(): Boolean = true

    override fun preserveTemplatesUponCompletion(): Boolean = true

    override fun preserveOpenSearchIndicesAfterTest(): Boolean = true

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
    @SuppressWarnings("UNCHECKED_CAST")
    fun `test backwards compatibility`() {
        val uri = getUri()
        val responseMap = getAsMap(uri)["nodes"] as Map<String, Map<String, Any>>
        for (response in responseMap.values) {
            val plugins = response["plugins"] as List<Map<String, Any>>
            val pluginNames = plugins.map { plugin -> plugin["name"] }.toSet()
            when (CLUSTER_TYPE) {
                ClusterType.OLD -> {
                    assertTrue(pluginNames.contains("opensearch-notebooks"))
                    createNotebook()
                }
                ClusterType.MIXED -> {
                    assertTrue(pluginNames.contains("opensearch-observability"))
                    if (System.getProperty("tests.rest.bwcsuite_round") != "third") {
                        verifyNotebooksExists("$BASE_NOTEBOOKS_URI/notebooks")
                    } else verifyNotebooksExists("$BASE_OBSERVABILITY_URI/object")
                }
                ClusterType.UPGRADED -> {
                    assertTrue(pluginNames.contains("opensearch-observability"))
                    verifyNotebooksExists("$BASE_OBSERVABILITY_URI/object")
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
        }
    }

    private fun createNotebook() {
        val createRequest = constructNotebookRequest()
        val createResponse = executeRequest(
            RestRequest.Method.POST.name,
            "$BASE_NOTEBOOKS_URI/notebook",
            createRequest,
            RestStatus.OK.status
        )
        val id = createResponse.get("notebookId").asString
        Assert.assertNotNull("Id should be generated", id)
        Thread.sleep(100)
    }

    private fun verifyNotebooksExists(uri: String) {
        val listNotebooks = executeRequest(
            RestRequest.Method.GET.name,
            "$uri",
            "",
            RestStatus.OK.status
        )
        val totalHits = listNotebooks.get("totalHits").asInt
        assertTrue("Actual notebooks counts ($totalHits) should be equal to (1)", totalHits == 1)
    }
}

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
 

package org.opensearch.observability.bwc;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import org.junit.Assert;
import org.opensearch.common.settings.Settings;
import org.opensearch.observability.ObservabilityPluginIT;
import org.opensearch.test.rest.OpenSearchRestTestCase;
import org.opensearch.test.rest.CreateObjectIT;
import org.opensearch.test.rest.DeleteObjectIT;
import org.opensearch.test.rest.GetObjectIT;
import org.opensearch.test.rest.UpdateObjectIT;


class TCBackwardsCompatibilityIT extends ObservabilityPluginIT {
    private const val ClusterType CLUSTER_TYPE =
            ClusterType.parse(System.getProperty("tests.rest.bwcsuite"));
    private const val CLUSTER_NAME = System.getProperty("tests.clustername");
    private const val String MIXED_CLUSTER_TEST_ROUND = System.getProperty("tests.rest.bwcsuite_round");


    @Override
    protected final fun preserveReposUponCompletion() : Boolean {
        return true;
    }

    @Override
    protected final fun restClientSettings() : Settings {
        return Settings.builder()
                .put(super.restClientSettings())
                // increase the timeout here to 90 seconds to handle long waits for a green
                // cluster health. the waits for green need to be longer than a minute to
                // account for delayed shards
                .put(OpenSearchRestTestCase.CLIENT_SOCKET_TIMEOUT, "90s")
                .build();
    }

    enum class ClusterType {
        OLD,
        MIXED,
        UPGRADED;

        const ClusterType parse(final val value: String) {
            switch (value) {
                case "old_cluster":
                    return OLD;
                case "mixed_cluster":
                    return MIXED;
                case "upgraded_cluster":
                    return UPGRADED;
                default:
                    throw new AssertionError("unknown cluster type: " + value);
            }
        }
    }

    @SuppressWarnings("unchecked")
    fun testBackwardsCompatibility() throws Exception {
        val uri = getUri();
        var responseMap: Map<String, Map<String, Object>> = getAsMap(uri).get("nodes");
        for (response in responseMap.values()) {
            var plugins: List<Map<String, Object>> = response.get("plugins");
            val pluginNames: Set<Object> =
                    plugins.stream().map(map -> map.get("name")).collect(Collectors.toSet());
            switch (CLUSTER_TYPE) {
                case OLD:
                    Assert.assertTrue(pluginNames.contains("opensearch-observability"));
                    callIntegTest();
                    break;
                case MIXED:
                    Assert.assertTrue(pluginNames.contains("opensearch-observability"));
                    callIntegTest();
                    break;
                case UPGRADED:
                    Assert.assertTrue(pluginNames.contains("opensearch-observability"));
                    callIntegTest();
                    break;
            }
            break;
        }
    }

    private fun getUri() : String {
        switch (CLUSTER_TYPE) {
            case OLD:
                return "_nodes/" + CLUSTER_NAME + "-0/plugins";
            case MIXED:
                String round = System.getProperty("tests.rest.bwcsuite_round");
                if (round.equals("second")) {
                    return "_nodes/" + CLUSTER_NAME + "-1/plugins";
                } else if (round.equals("third")) {
                    return "_nodes/" + CLUSTER_NAME + "-2/plugins";
                } else {
                    return "_nodes/" + CLUSTER_NAME + "-0/plugins";
                }
            case UPGRADED:
                return "_nodes/plugins";
            default:
                throw new AssertionError("unknown cluster type: " + CLUSTER_TYPE);
        }
    }


    private fun callIntegTest() {
        GetObjectIT.`test get single object`();
        GetObjectIT.`test get multiple objects`();
        CreateObjectIT.`test create notebook`();
        CreateObjectIT.`test create saved query with id`();
        CreateObjectIT.`test create saved visualization`();
        CreateObjectIT.`test create operational panel`();
    }
}


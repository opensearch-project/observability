package org.opensearch.integrations

import org.opensearch.cluster.metadata.IndexNameExpressionResolver
import org.opensearch.cluster.node.DiscoveryNodes
import org.opensearch.common.settings.*
import org.opensearch.integrations.resthandler.IntegrationStoreRestHandler
import org.opensearch.observability.resthandler.ObservabilityRestHandler
import org.opensearch.observability.resthandler.ObservabilityStatsRestHandler
import org.opensearch.observability.resthandler.SchedulerRestHandler
import org.opensearch.plugins.ActionPlugin
import org.opensearch.plugins.Plugin
import org.opensearch.rest.RestController
import org.opensearch.rest.RestHandler
import java.util.function.Supplier

class IntegrationsPlugin: Plugin(), ActionPlugin {
    companion object {
        const val PLUGIN_NAME = "opensearch-integrations"
        const val LOG_PREFIX = "integrations"
        const val BASE_INTEGRATIONS_URI = "/_plugins/_integrations"
    }

    /**
     * {@inheritDoc}
     */
    override fun getRestHandlers(
        settings: Settings,
        restController: RestController,
        clusterSettings: ClusterSettings,
        indexScopedSettings: IndexScopedSettings,
        settingsFilter: SettingsFilter,
        indexNameExpressionResolver: IndexNameExpressionResolver,
        nodesInCluster: Supplier<DiscoveryNodes>
    ): List<RestHandler> {
        return listOf(
            IntegrationStoreRestHandler()
        )
    }
}
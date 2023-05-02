/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
package org.opensearch.observability

import org.opensearch.action.ActionRequest
import org.opensearch.action.ActionResponse
import org.opensearch.client.Client
import org.opensearch.cluster.metadata.IndexNameExpressionResolver
import org.opensearch.cluster.node.DiscoveryNodes
import org.opensearch.cluster.service.ClusterService
import org.opensearch.common.io.stream.NamedWriteableRegistry
import org.opensearch.common.settings.ClusterSettings
import org.opensearch.common.settings.IndexScopedSettings
import org.opensearch.common.settings.Setting
import org.opensearch.common.settings.Settings
import org.opensearch.common.settings.SettingsFilter
import org.opensearch.core.xcontent.NamedXContentRegistry
import org.opensearch.env.Environment
import org.opensearch.env.NodeEnvironment
import org.opensearch.jobscheduler.spi.JobSchedulerExtension
import org.opensearch.jobscheduler.spi.ScheduledJobParser
import org.opensearch.jobscheduler.spi.ScheduledJobRunner
import org.opensearch.observability.action.CreateObservabilityObjectAction
import org.opensearch.observability.action.DeleteObservabilityObjectAction
import org.opensearch.observability.action.GetObservabilityObjectAction
import org.opensearch.observability.action.UpdateObservabilityObjectAction
import org.opensearch.observability.index.ObservabilityIndex
import org.opensearch.observability.resthandler.ObservabilityRestHandler
import org.opensearch.observability.resthandler.ObservabilityStatsRestHandler
import org.opensearch.observability.resthandler.SchedulerRestHandler
import org.opensearch.observability.scheduler.ObservabilityJobParser
import org.opensearch.observability.scheduler.ObservabilityJobRunner
import org.opensearch.observability.settings.PluginSettings
import org.opensearch.plugins.ActionPlugin
import org.opensearch.plugins.Plugin
import org.opensearch.repositories.RepositoriesService
import org.opensearch.rest.RestController
import org.opensearch.rest.RestHandler
import org.opensearch.script.ScriptService
import org.opensearch.threadpool.ThreadPool
import org.opensearch.watcher.ResourceWatcherService
import java.util.function.Supplier

/**
 * Entry point of the OpenSearch Observability plugin.
 * This class initializes the rest handlers.
 */
class ObservabilityPlugin : Plugin(), ActionPlugin, JobSchedulerExtension {

    companion object {
        const val PLUGIN_NAME = "opensearch-observability"
        const val LOG_PREFIX = "observability"
        const val BASE_OBSERVABILITY_URI = "/_plugins/_observability"
        const val BASE_NOTEBOOKS_URI = "/_plugins/_notebooks"
    }

    /**
     * {@inheritDoc}
     */
    override fun getSettings(): List<Setting<*>> {
        return PluginSettings.getAllSettings()
    }

    /**
     * {@inheritDoc}
     */
    override fun createComponents(
        client: Client,
        clusterService: ClusterService,
        threadPool: ThreadPool,
        resourceWatcherService: ResourceWatcherService,
        scriptService: ScriptService,
        xContentRegistry: NamedXContentRegistry,
        environment: Environment,
        nodeEnvironment: NodeEnvironment,
        namedWriteableRegistry: NamedWriteableRegistry,
        indexNameExpressionResolver: IndexNameExpressionResolver,
        repositoriesServiceSupplier: Supplier<RepositoriesService>
    ): Collection<Any> {
        PluginSettings.addSettingsUpdateConsumer(clusterService)
        ObservabilityIndex.initialize(client, clusterService)
        return emptyList()
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
            ObservabilityRestHandler(),
            ObservabilityStatsRestHandler(),
            SchedulerRestHandler() // TODO: tmp rest handler only for POC purpose
        )
    }

    /**
     * {@inheritDoc}
     */
    override fun getActions(): List<ActionPlugin.ActionHandler<out ActionRequest, out ActionResponse>> {
        return listOf(
            ActionPlugin.ActionHandler(
                CreateObservabilityObjectAction.ACTION_TYPE,
                CreateObservabilityObjectAction::class.java
            ),
            ActionPlugin.ActionHandler(
                DeleteObservabilityObjectAction.ACTION_TYPE,
                DeleteObservabilityObjectAction::class.java
            ),
            ActionPlugin.ActionHandler(
                GetObservabilityObjectAction.ACTION_TYPE,
                GetObservabilityObjectAction::class.java
            ),
            ActionPlugin.ActionHandler(
                UpdateObservabilityObjectAction.ACTION_TYPE,
                UpdateObservabilityObjectAction::class.java
            )
        )
    }

    override fun getJobType(): String {
        return "observability"
    }

    override fun getJobIndex(): String {
        return SchedulerRestHandler.SCHEDULED_JOB_INDEX
    }

    override fun getJobRunner(): ScheduledJobRunner {
        return ObservabilityJobRunner
    }

    override fun getJobParser(): ScheduledJobParser {
        return ObservabilityJobParser
    }
}

/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 *
 */
package com.amazon.opendistroforelasticsearch.notebooks

import com.amazon.opendistroforelasticsearch.notebooks.action.CreateNotebookAction
import com.amazon.opendistroforelasticsearch.notebooks.action.DeleteNotebookAction
import com.amazon.opendistroforelasticsearch.notebooks.action.GetAllNotebooksAction
import com.amazon.opendistroforelasticsearch.notebooks.action.GetNotebookAction
import com.amazon.opendistroforelasticsearch.notebooks.action.UpdateNotebookAction
import com.amazon.opendistroforelasticsearch.notebooks.index.NotebooksIndex
import com.amazon.opendistroforelasticsearch.notebooks.resthandler.NotebookListRestHandler
import com.amazon.opendistroforelasticsearch.notebooks.resthandler.NotebookRestHandler
import com.amazon.opendistroforelasticsearch.notebooks.settings.PluginSettings
import org.elasticsearch.action.ActionRequest
import org.elasticsearch.action.ActionResponse
import org.elasticsearch.client.Client
import org.elasticsearch.cluster.metadata.IndexNameExpressionResolver
import org.elasticsearch.cluster.node.DiscoveryNodes
import org.elasticsearch.cluster.service.ClusterService
import org.elasticsearch.common.io.stream.NamedWriteableRegistry
import org.elasticsearch.common.settings.ClusterSettings
import org.elasticsearch.common.settings.IndexScopedSettings
import org.elasticsearch.common.settings.Setting
import org.elasticsearch.common.settings.Settings
import org.elasticsearch.common.settings.SettingsFilter
import org.elasticsearch.common.xcontent.NamedXContentRegistry
import org.elasticsearch.env.Environment
import org.elasticsearch.env.NodeEnvironment
import org.elasticsearch.plugins.ActionPlugin
import org.elasticsearch.plugins.Plugin
import org.elasticsearch.repositories.RepositoriesService
import org.elasticsearch.rest.RestController
import org.elasticsearch.rest.RestHandler
import org.elasticsearch.script.ScriptService
import org.elasticsearch.threadpool.ThreadPool
import org.elasticsearch.watcher.ResourceWatcherService
import java.util.function.Supplier

/**
 * Entry point of the OpenDistro for Elasticsearch Notebooks plugin.
 * This class initializes the rest handlers.
 */
class NotebooksPlugin : Plugin(), ActionPlugin {

    companion object {
        const val PLUGIN_NAME = "opendistro-notebooks"
        const val LOG_PREFIX = "notebooks"
        const val BASE_NOTEBOOKS_URI = "/_opendistro/_notebooks"
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
        NotebooksIndex.initialize(client, clusterService)
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
            NotebookRestHandler(),
            NotebookListRestHandler()
        )
    }

    /**
     * {@inheritDoc}
     */
    override fun getActions(): List<ActionPlugin.ActionHandler<out ActionRequest, out ActionResponse>> {
        return listOf(
            ActionPlugin.ActionHandler(CreateNotebookAction.ACTION_TYPE, CreateNotebookAction::class.java),
            ActionPlugin.ActionHandler(DeleteNotebookAction.ACTION_TYPE, DeleteNotebookAction::class.java),
            ActionPlugin.ActionHandler(GetAllNotebooksAction.ACTION_TYPE, GetAllNotebooksAction::class.java),
            ActionPlugin.ActionHandler(GetNotebookAction.ACTION_TYPE, GetNotebookAction::class.java),
            ActionPlugin.ActionHandler(UpdateNotebookAction.ACTION_TYPE, UpdateNotebookAction::class.java)
        )
    }
}

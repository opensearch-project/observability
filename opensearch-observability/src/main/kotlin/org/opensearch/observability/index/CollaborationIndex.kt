/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.index

import org.opensearch.ResourceAlreadyExistsException
import org.opensearch.action.DocWriteResponse
import org.opensearch.action.admin.indices.create.CreateIndexRequest
import org.opensearch.action.admin.indices.mapping.put.PutMappingRequest
import org.opensearch.action.index.IndexRequest
import org.opensearch.client.Client
import org.opensearch.cluster.service.ClusterService
import org.opensearch.common.xcontent.XContentType
import org.opensearch.index.IndexNotFoundException
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.collaboration.model.CollaborationObjectDoc
import org.opensearch.observability.settings.PluginSettings
import org.opensearch.observability.util.SecureIndexClient
import org.opensearch.observability.util.logger

internal object CollaborationIndex {
    private val log by logger(CollaborationIndex::class.java)
    private const val COLLABORATIONS_INDEX_NAME = ".opensearch-collaborations"
    private const val COLLABORATIONS_MAPPING_FILE_NAME = "collaborations-mapping.yml"
    private const val COLLABORATIONS_SETTINGS_FILE_NAME = "collaborations-settings.yml"

    private var mappingsUpdated: Boolean = false
    private lateinit var client: Client
    private lateinit var clusterService: ClusterService

    /**
     * Initialize the class
     * @param client The OpenSearch client
     * @param clusterService The OpenSearch cluster service
     */
    fun initialize(client: Client, clusterService: ClusterService) {
        this.client = SecureIndexClient(client)
        this.clusterService = clusterService
        this.mappingsUpdated = false
    }

    /**
     * Create index using the mapping and settings defined in resource
     */
    @Suppress("TooGenericExceptionCaught")
    private fun createIndex() {
        if (!isIndexExists(COLLABORATIONS_INDEX_NAME)) {
            val classLoader = CollaborationIndex::class.java.classLoader
            val indexMappingSource = classLoader.getResource(COLLABORATIONS_MAPPING_FILE_NAME)?.readText()!!
            val indexSettingsSource = classLoader.getResource(COLLABORATIONS_SETTINGS_FILE_NAME)?.readText()!!
            val request = CreateIndexRequest(COLLABORATIONS_INDEX_NAME)
                .mapping(indexMappingSource, XContentType.YAML)
                .settings(indexSettingsSource, XContentType.YAML)
            try {
                val actionFuture = client.admin().indices().create(request)
                val response = actionFuture.actionGet(PluginSettings.operationTimeoutMs)
                if (response.isAcknowledged) {
                    log.info("$LOG_PREFIX:Index $COLLABORATIONS_INDEX_NAME creation Acknowledged")
                } else {
                    throw IllegalStateException("$LOG_PREFIX:Index $COLLABORATIONS_INDEX_NAME creation not Acknowledged")
                }
            } catch (exception: Exception) {
                if (exception !is ResourceAlreadyExistsException && exception.cause !is ResourceAlreadyExistsException) {
                    throw exception
                }
            }
            this.mappingsUpdated = true
        } else if (!this.mappingsUpdated) {
            updateMappings()
        }
    }

    /**
     * Check if the index mappings have changed and if they have, update them
     */
    private fun updateMappings() {
        val classLoader = CollaborationIndex::class.java.classLoader
        val indexMappingSource = classLoader.getResource(COLLABORATIONS_MAPPING_FILE_NAME)?.readText()!!
        val request = PutMappingRequest(COLLABORATIONS_INDEX_NAME)
            .source(indexMappingSource, XContentType.YAML)
        try {
            val actionFuture = client.admin().indices().putMapping(request)
            val response = actionFuture.actionGet(PluginSettings.operationTimeoutMs)
            if (response.isAcknowledged) {
                log.info("$LOG_PREFIX:Index $COLLABORATIONS_INDEX_NAME update mapping Acknowledged")
            } else {
                throw IllegalStateException("$LOG_PREFIX:Index $COLLABORATIONS_INDEX_NAME update mapping not Acknowledged")
            }
            this.mappingsUpdated = true
        } catch (exception: IndexNotFoundException) {
            log.error("$LOG_PREFIX:IndexNotFoundException:", exception)
        }
    }

    /**
     * Check if the index is created and available.
     * @param index
     * @return true if index is available, false otherwise
     */
    private fun isIndexExists(index: String): Boolean {
        val clusterState = clusterService.state()
        return clusterState.routingTable.hasIndex(index)
    }

    /**
     * Create collaboration object
     *
     * @param collaborationObjectDoc
     * @param id
     * @return object id if successful, otherwise null
     */
    fun createCollaborationObject(collaborationObjectDoc: CollaborationObjectDoc, id: String? = null): String? {
        createIndex()
        val xContent = collaborationObjectDoc.toXContent()
        val indexRequest = IndexRequest(COLLABORATIONS_INDEX_NAME)
            .source(xContent)
            .create(true)
        if (id != null) {
            indexRequest.id(id)
        }
        val actionFuture = client.index(indexRequest)
        val response = actionFuture.actionGet(PluginSettings.operationTimeoutMs)
        return if (response.result != DocWriteResponse.Result.CREATED) {
            log.warn("$LOG_PREFIX:createCollaborationObject - response:$response")
            null
        } else {
            response.id
        }
    }
}

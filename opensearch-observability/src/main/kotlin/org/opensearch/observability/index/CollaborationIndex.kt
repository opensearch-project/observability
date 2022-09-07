/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.index

import org.opensearch.ResourceAlreadyExistsException
import org.opensearch.action.DocWriteResponse
import org.opensearch.action.admin.indices.create.CreateIndexRequest
import org.opensearch.action.admin.indices.mapping.put.PutMappingRequest
import org.opensearch.action.bulk.BulkRequest
import org.opensearch.action.delete.DeleteRequest
import org.opensearch.action.get.GetRequest
import org.opensearch.action.get.GetResponse
import org.opensearch.action.get.MultiGetRequest
import org.opensearch.action.index.IndexRequest
import org.opensearch.client.Client
import org.opensearch.cluster.service.ClusterService
import org.opensearch.common.xcontent.LoggingDeprecationHandler
import org.opensearch.common.xcontent.NamedXContentRegistry
import org.opensearch.common.xcontent.XContentType
import org.opensearch.index.IndexNotFoundException
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.collaboration.model.CollaborationObjectDoc
import org.opensearch.observability.collaboration.model.CollaborationObjectDocInfo
import org.opensearch.observability.settings.PluginSettings
import org.opensearch.observability.util.SecureIndexClient
import org.opensearch.observability.util.logger
import org.opensearch.rest.RestStatus

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
     * Get collaboration object
     *
     * @param id
     * @return [CollaborationObjectDocInfo]
     */
    fun getCollaborationObject(id: String): CollaborationObjectDocInfo? {
        createIndex()
        val getRequest = GetRequest(COLLABORATIONS_INDEX_NAME).id(id)
        val actionFuture = client.get(getRequest)
        val response = actionFuture.actionGet(PluginSettings.operationTimeoutMs)
        return parseCollaborationObjectDoc(id, response)
    }

    /**
     * Get multiple collaboration objects
     *
     * @param ids
     * @return list of [CollaborationObjectDocInfo]
     */
    fun getCollaborationObjects(ids: Set<String>): List<CollaborationObjectDocInfo> {
        createIndex()
        val getRequest = MultiGetRequest()
        ids.forEach { getRequest.add(COLLABORATIONS_INDEX_NAME, it) }
        val actionFuture = client.multiGet(getRequest)
        val response = actionFuture.actionGet(PluginSettings.operationTimeoutMs)
        return response.responses.mapNotNull { parseCollaborationObjectDoc(it.id, it.response) }
    }

    /**
     * Parse collaboration object doc
     *
     * @param id
     * @param response
     * @return [CollaborationObjectDocInfo]
     */
    private fun parseCollaborationObjectDoc(id: String, response: GetResponse): CollaborationObjectDocInfo? {
        return if (response.sourceAsString == null) {
            log.warn("$LOG_PREFIX:getCollaborationObject - $id not found; response:$response")
            null
        } else {
            val parser = XContentType.JSON.xContent().createParser(
                NamedXContentRegistry.EMPTY,
                LoggingDeprecationHandler.INSTANCE,
                response.sourceAsString
            )
            parser.nextToken()
            val doc = CollaborationObjectDoc.parse(parser, id)
            CollaborationObjectDocInfo(id, response.version, response.seqNo, response.primaryTerm, doc)
        }
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

    /**
     * Delete collaboration object
     *
     * @param id
     * @return true if successful, otherwise false
     */
    fun deleteCollaborationObject(id: String): Boolean {
        createIndex()
        val deleteRequest = DeleteRequest()
            .index(COLLABORATIONS_INDEX_NAME)
            .id(id)
        val actionFuture = client.delete(deleteRequest)
        val response = actionFuture.actionGet(PluginSettings.operationTimeoutMs)
        if (response.result != DocWriteResponse.Result.DELETED) {
            log.warn("$LOG_PREFIX:deleteCollaborationObject failed for $id; response:$response")
        }
        return response.result == DocWriteResponse.Result.DELETED
    }

    /**
     * Delete multiple collaboration objects
     *
     * @param ids
     * @return map of id to delete status
     */
    fun deleteCollaborationObjects(ids: Set<String>): Map<String, RestStatus> {
        createIndex()
        val bulkRequest = BulkRequest()
        ids.forEach {
            val deleteRequest = DeleteRequest()
                .index(COLLABORATIONS_INDEX_NAME)
                .id(it)
            bulkRequest.add(deleteRequest)
        }
        val actionFuture = client.bulk(bulkRequest)
        val response = actionFuture.actionGet(PluginSettings.operationTimeoutMs)
        val mutableMap = mutableMapOf<String, RestStatus>()
        response.forEach {
            mutableMap[it.id] = it.status()
            if (it.isFailed) {
                log.warn("$LOG_PREFIX:deleteCollaborationObjects failed for ${it.id}; response:${it.failureMessage}")
            }
        }
        return mutableMap
    }
}

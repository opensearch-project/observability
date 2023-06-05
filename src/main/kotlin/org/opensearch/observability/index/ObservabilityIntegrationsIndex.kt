/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
package org.opensearch.observability.index

import org.opensearch.ResourceAlreadyExistsException
import org.opensearch.ResourceNotFoundException
import org.opensearch.action.admin.indices.template.get.GetIndexTemplatesRequest
import org.opensearch.action.admin.indices.template.put.PutComposableIndexTemplateAction
import org.opensearch.client.Client
import org.opensearch.cluster.metadata.ComposableIndexTemplate
import org.opensearch.cluster.metadata.Template
import org.opensearch.cluster.service.ClusterService
import org.opensearch.common.component.LifecycleListener
import org.opensearch.common.compress.CompressedXContent
import org.opensearch.common.settings.Settings
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.settings.PluginSettings
import org.opensearch.observability.util.SecureIndexClient
import org.opensearch.observability.util.logger
import java.util.*

/**
 * Class for doing OpenSearch Metrics schema mapping & default index init operation
 */
internal object ObservabilityIntegrationsIndex : LifecycleListener() {
    private val log by logger(ObservabilityIntegrationsIndex::class.java)

    private lateinit var client: Client
    private lateinit var clusterService: ClusterService

    /**
     * Initialize the class
     * @param client The OpenSearch client
     * @param clusterService The OpenSearch cluster service
     */
    fun initialize(client: Client, clusterService: ClusterService): ObservabilityIntegrationsIndex {
        this.client = SecureIndexClient(client)
        this.clusterService = clusterService
        return this
    }

    /**
     * once lifecycle indicate start has occurred - instantiating the mapping template
     */
    override fun afterStart() {
        // create default mappings
        createMappingTemplates()
    }

    private fun getTemplateNames(): List<String> {
        // TODO classloader doesn't support directory scanning by default, need to write manual traversal later
        // Hardcoding template list for now, as a hotfix you can add names from resources/templates/{name}-mapping-template.json here
        return listOf("metrics", "traces")
    }

    private fun createMappingTemplates() {
        for (name in getTemplateNames()) {
            createMappingTemplate("ss4o_${name}_template", "ss4o_$name-*-*", "templates/$name-mapping-template.json")
        }
    }

    /**
     * Create the pre-defined mapping template
     */
    @Suppress("TooGenericExceptionCaught", "MagicNumber")
    private fun createMappingTemplate(templateName: String, patternName: String, path: String) {
        log.info("$LOG_PREFIX:createMappingTemplate $templateName API called")
        if (!isTemplateExists(templateName)) {
            val classLoader = ObservabilityIntegrationsIndex::class.java.classLoader
            val indexMappingSource = classLoader.getResource(path)?.readText()!!
            val settings = Settings.builder()
                .put("index.number_of_shards", 3)
                .put("index.auto_expand_replicas", "0-2")
                .build()
            val template = Template(settings, CompressedXContent(indexMappingSource), null)
            val request = PutComposableIndexTemplateAction.Request(templateName)
                .indexTemplate(
                    ComposableIndexTemplate(
                        listOf(patternName),
                        template,
                        Collections.emptyList(),
                        1,
                        1,
                        Collections.singletonMap("description", "Observability $templateName Mapping Template") as Map<String, Any>?,
                        ComposableIndexTemplate.DataStreamTemplate()
                    )
                )
            try {
                val validationException = request.validateIndexTemplate(null)
                if (validationException != null && !validationException.validationErrors().isEmpty()) {
                    error("$LOG_PREFIX:Index Template $templateName validation errors ${validationException.message}")
                }
                val actionFuture = client.admin().indices().execute(PutComposableIndexTemplateAction.INSTANCE, request)
                val response = actionFuture.actionGet(PluginSettings.operationTimeoutMs)
                if (response.isAcknowledged) {
                    log.info("$LOG_PREFIX:Mapping Template $templateName creation Acknowledged")
                } else {
                    error("$LOG_PREFIX:Mapping Template $templateName creation not Acknowledged")
                }
            } catch (exception: ResourceAlreadyExistsException) {
                log.warn("message: ${exception.message}")
            } catch (exception: Exception) {
                if (exception.cause !is ResourceAlreadyExistsException) {
                    throw exception
                }
            }
        }
    }

    /**
     * Check if the mapping template is created and available.
     * @param template name
     * @return true if template is available, false otherwise
     */
    @Suppress("TooGenericExceptionCaught", "SwallowedException", "RethrowCaughtException")
    private fun isTemplateExists(template: String): Boolean {
        try {
            val indices = client.admin().indices()
            val response = indices.getTemplates(GetIndexTemplatesRequest(template)).get()
            return response.indexTemplates.isNotEmpty()
        } catch (exception: ResourceNotFoundException) {
            return false
        } catch (exception: ResourceAlreadyExistsException) {
            return true
        } catch (exception: Exception) {
            throw exception
        }
    }
}

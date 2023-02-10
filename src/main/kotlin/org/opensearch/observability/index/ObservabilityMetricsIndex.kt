package org.opensearch.observability.index

import org.opensearch.ResourceAlreadyExistsException
import org.opensearch.action.admin.indices.datastream.CreateDataStreamAction
import org.opensearch.action.admin.indices.datastream.GetDataStreamAction
import org.opensearch.action.admin.indices.template.get.GetIndexTemplatesRequest
import org.opensearch.action.admin.indices.template.put.PutIndexTemplateRequest
import org.opensearch.client.Client
import org.opensearch.cluster.service.ClusterService
import org.opensearch.common.xcontent.XContentType
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.settings.PluginSettings
import org.opensearch.observability.util.SecureIndexClient
import org.opensearch.observability.util.logger


/**
 * Class for doing OpenSearch Metrics schema mapping & default index init operation
 */
internal object ObservabilityMetricsIndex {
    private val log by logger(ObservabilityMetricsIndex::class.java)
    private const val METRICS_MAPPING_TEMPLATE_NAME = "sso_metrics_template"
    private const val METRICS_MAPPING_TEMPLATE_FILE = "sso_metrics-mapping-template.yml"
    private const val METRICS_INDEX_NAME = "sso_metrics-default-namespace"

    private lateinit var client: Client
    private lateinit var clusterService: ClusterService

    /**
     * Initialize the class
     * Generate the metrics template and the default index
     * @param client The OpenSearch client
     * @param clusterService The OpenSearch cluster service
     */
    fun initialize(client: Client, clusterService: ClusterService) {
        this.client = SecureIndexClient(client)
        this.clusterService = clusterService

        //create template mapping
        createMappingTemplate()
        //create default index
        createDataStream()
    }

    /**
     * Create index expecting the index template already exists
     */
    @Suppress("TooGenericExceptionCaught")
    private fun createDataStream() {
        if (!isTemplateExists(METRICS_MAPPING_TEMPLATE_NAME)) {
            createMappingTemplate()
        }
        if (!isDataStreamExists(METRICS_INDEX_NAME)) {
            val request = CreateDataStreamAction.Request(METRICS_INDEX_NAME)
            try {
                val actionFuture = client.admin().indices().createDataStream(request)
                val response = actionFuture.actionGet(PluginSettings.operationTimeoutMs)
                if (response.isAcknowledged) {
                    log.info("$LOG_PREFIX:DataStream $METRICS_INDEX_NAME creation Acknowledged")
                } else {
                    error("$LOG_PREFIX:DataStream $METRICS_INDEX_NAME creation not Acknowledged")
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
     * Create index using the pre-defined mapping template
     */
    @Suppress("TooGenericExceptionCaught")
    private fun createMappingTemplate() {
        if (!isTemplateExists(METRICS_MAPPING_TEMPLATE_NAME)) {
            val classLoader = ObservabilityMetricsIndex::class.java.classLoader
            val indexMappingSource = classLoader.getResource(METRICS_MAPPING_TEMPLATE_FILE)?.readText()!!
            val request = PutIndexTemplateRequest(METRICS_MAPPING_TEMPLATE_NAME)
                .mapping(indexMappingSource, XContentType.YAML)
            try {
                val actionFuture = client.admin().indices().putTemplate(request)
                val response = actionFuture.actionGet(PluginSettings.operationTimeoutMs)
                if (response.isAcknowledged) {
                    log.info("$LOG_PREFIX:Mapping Template $METRICS_MAPPING_TEMPLATE_NAME creation Acknowledged")
                } else {
                    error("$LOG_PREFIX:Mapping Template $METRICS_MAPPING_TEMPLATE_NAME creation not Acknowledged")
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
    private fun isTemplateExists(template: String): Boolean {
        val indices = client.admin().indices()
        val response = indices.getTemplates(GetIndexTemplatesRequest(template)).get()
        return response.indexTemplates.isNotEmpty()
    }


    /**
     * Check if the data-stream is created and available.
     * @param index
     * @return true if index is available, false otherwise
     */
    private fun isDataStreamExists(index: String): Boolean {
        val streams = client.admin().indices().getDataStreams(GetDataStreamAction.Request(arrayOf(index)))
        val response = streams.actionGet()
        return response.dataStreams.isNotEmpty()
    }
}

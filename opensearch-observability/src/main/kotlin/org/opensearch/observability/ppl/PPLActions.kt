package org.opensearch.observability.ppl

import org.opensearch.action.ActionListener
import org.opensearch.client.node.NodeClient
import org.opensearch.common.util.concurrent.ThreadContext
import org.opensearch.commons.ConfigConstants
import org.opensearch.commons.sql.SQLPluginInterface
import org.opensearch.commons.sql.action.TransportQueryResponse
import org.opensearch.commons.sql.model.QueryType
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.util.logger

internal object PPLActions {

    private val log by logger(PPLActions::class.java)

    private lateinit var client: NodeClient

    /**
     * Initialize the class
     * @param client NodeClient for transport call
     */
    fun initialize(client: NodeClient) {
        this.client = client
    }

    /**
     * Send notifications based on delivery parameter
     * @param delivery [ReportDefinition.Delivery] object
     * @param referenceId [String] object
     * @return [CreateReportDefinitionResponse]
     */
    fun send(pplQuery: String): TransportQueryResponse? {
        return send(pplQuery,"")
    }

    /**
     * Send notifications based on delivery parameter
     * @param delivery [ReportDefinition.Delivery] object
     * @param referenceId [String] object
     * @param userStr [String] object,
     * @return [CreateReportDefinitionResponse]
     */
    fun send(pplQuery: String, userStr: String?): TransportQueryResponse? {
        if (userStr.isNullOrEmpty()) {
            return sendPplQueryHelper(pplQuery)
        }

        var transportPPLQueryResponse: TransportQueryResponse? = null
        client.threadPool().threadContext.stashContext().use {
            client.threadPool().threadContext.putTransient(
                    ConfigConstants.OPENSEARCH_SECURITY_USER_INFO_THREAD_CONTEXT,
                    userStr
            )
            transportPPLQueryResponse = sendPplQueryHelper(pplQuery)
        }
        return transportPPLQueryResponse
    }

    private fun sendPplQueryHelper(
            pplQuery: String
    ): TransportQueryResponse? {
        log.info("$LOG_PREFIX:PPLActions-send")
        var transportPPLQueryResponse: TransportQueryResponse? = null
        SQLPluginInterface.sendQuery(
                client,
                pplQuery,
                QueryType.PPL,
                object : ActionListener<TransportQueryResponse> {
                    override fun onResponse(response: TransportQueryResponse) {
                        transportPPLQueryResponse = response
                        //TODO: here is supposed to add logic to convert the response and write to metric index
                        // also update the scheduled job time range?
                        log.info("$LOG_PREFIX:PPLActions-send: Query result: ${transportPPLQueryResponse!!.queryResponse}")
                    }
                    override fun onFailure(exception: Exception) {
                        log.error("$LOG_PREFIX:PPLActions-send Error:$exception")
                        log.error("$LOG_PREFIX:PPLActions-send Stacktrace:${exception.stackTrace}")
                    }
                }
        )
        return transportPPLQueryResponse
    }

    /**
     * Executes the given [block] function on this resource and then closes it down correctly whether an exception
     * is thrown or not.
     *
     * In case if the resource is being closed due to an exception occurred in [block], and the closing also fails with an exception,
     * the latter is added to the [suppressed][java.lang.Throwable.addSuppressed] exceptions of the former.
     *
     * @param block a function to process this [AutoCloseable] resource.
     * @return the result of [block] function invoked on this resource.
     */
    @Suppress("TooGenericExceptionCaught")
    private inline fun <T : ThreadContext.StoredContext, R> T.use(block: (T) -> R): R {
        var exception: Throwable? = null
        try {
            return block(this)
        } catch (e: Throwable) {
            exception = e
            throw e
        } finally {
            closeFinally(exception)
        }
    }

    /**
     * Closes this [AutoCloseable], suppressing possible exception or error thrown by [AutoCloseable.close] function when
     * it's being closed due to some other [cause] exception occurred.
     *
     * The suppressed exception is added to the list of suppressed exceptions of [cause] exception.
     */
    @Suppress("TooGenericExceptionCaught")
    private fun ThreadContext.StoredContext.closeFinally(cause: Throwable?) = when (cause) {
        null -> close()
        else -> try {
            close()
        } catch (closeException: Throwable) {
            cause.addSuppressed(closeException)
        }
    }

}
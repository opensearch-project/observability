/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.action

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.opensearch.OpenSearchSecurityException
import org.opensearch.OpenSearchStatusException
import org.opensearch.action.ActionRequest
import org.opensearch.action.support.ActionFilters
import org.opensearch.action.support.HandledTransportAction
import org.opensearch.client.Client
import org.opensearch.commons.ConfigConstants.OPENSEARCH_SECURITY_USER_INFO_THREAD_CONTEXT
import org.opensearch.commons.authuser.User
import org.opensearch.core.action.ActionListener
import org.opensearch.core.action.ActionResponse
import org.opensearch.core.common.io.stream.Writeable
import org.opensearch.core.rest.RestStatus
import org.opensearch.index.IndexNotFoundException
import org.opensearch.index.engine.VersionConflictEngineException
import org.opensearch.indices.InvalidIndexNameException
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.metrics.Metrics
import org.opensearch.observability.security.SecurityAccess
import org.opensearch.observability.util.logger
import org.opensearch.tasks.Task
import org.opensearch.transport.TransportService
import java.io.IOException
import java.security.PrivilegedExceptionAction

abstract class PluginBaseAction<Request : ActionRequest, Response : ActionResponse>(
    name: String,
    transportService: TransportService,
    val client: Client,
    actionFilters: ActionFilters,
    requestReader: Writeable.Reader<Request>
) : HandledTransportAction<Request, Response>(name, transportService, actionFilters, requestReader) {
    companion object {
        private val log by logger(PluginBaseAction::class.java)
        private val scope: CoroutineScope = CoroutineScope(Dispatchers.IO)
    }

    /**
     * {@inheritDoc}
     */
    @Suppress("TooGenericExceptionCaught")
    override fun doExecute(
        task: Task?,
        request: Request,
        listener: ActionListener<Response>
    ) {
        val userStr: String? = client.threadPool().threadContext.getTransient<String>(OPENSEARCH_SECURITY_USER_INFO_THREAD_CONTEXT)
        val user: User? = User.parse(userStr)
        SecurityAccess.doPrivileged {
            scope.launch {
                try {
                    listener.onResponse(executeRequest(request, user))
                } catch (exception: OpenSearchStatusException) {
                    Metrics.OBSERVABILITY_EXCEPTIONS_OPENSEARCH_STATUS_EXCEPTION.counter.increment()
                    log.warn("$LOG_PREFIX:OpenSearchStatusException: message:${exception.message}")
                    listener.onFailure(exception)
                } catch (exception: OpenSearchSecurityException) {
                    Metrics.OBSERVABILITY_EXCEPTIONS_OPENSEARCH_SECURITY_EXCEPTION.counter.increment()
                    log.warn("$LOG_PREFIX:OpenSearchSecurityException:", exception)
                    listener.onFailure(
                        OpenSearchStatusException(
                            "Permissions denied: ${exception.message} - Contact administrator",
                            RestStatus.FORBIDDEN
                        )
                    )
                } catch (exception: VersionConflictEngineException) {
                    Metrics.OBSERVABILITY_EXCEPTIONS_VERSION_CONFLICT_ENGINE_EXCEPTION.counter.increment()
                    log.warn("$LOG_PREFIX:VersionConflictEngineException:", exception)
                    listener.onFailure(OpenSearchStatusException(exception.message, RestStatus.CONFLICT))
                } catch (exception: IndexNotFoundException) {
                    Metrics.OBSERVABILITY_EXCEPTIONS_INDEX_NOT_FOUND_EXCEPTION.counter.increment()
                    log.warn("$LOG_PREFIX:IndexNotFoundException:", exception)
                    listener.onFailure(OpenSearchStatusException(exception.message, RestStatus.NOT_FOUND))
                } catch (exception: InvalidIndexNameException) {
                    Metrics.OBSERVABILITY_EXCEPTIONS_INVALID_INDEX_NAME_EXCEPTION.counter.increment()
                    log.warn("$LOG_PREFIX:InvalidIndexNameException:", exception)
                    listener.onFailure(OpenSearchStatusException(exception.message, RestStatus.BAD_REQUEST))
                } catch (exception: IllegalArgumentException) {
                    Metrics.OBSERVABILITY_EXCEPTIONS_ILLEGAL_ARGUMENT_EXCEPTION.counter.increment()
                    log.warn("$LOG_PREFIX:IllegalArgumentException:", exception)
                    listener.onFailure(OpenSearchStatusException(exception.message, RestStatus.BAD_REQUEST))
                } catch (exception: IllegalStateException) {
                    Metrics.OBSERVABILITY_EXCEPTIONS_ILLEGAL_STATE_EXCEPTION.counter.increment()
                    log.warn("$LOG_PREFIX:IllegalStateException:", exception)
                    listener.onFailure(OpenSearchStatusException(exception.message, RestStatus.SERVICE_UNAVAILABLE))
                } catch (exception: IOException) {
                    Metrics.OBSERVABILITY_EXCEPTIONS_IO_EXCEPTION.counter.increment()
                    log.error("$LOG_PREFIX:Uncaught IOException:", exception)
                    listener.onFailure(OpenSearchStatusException(exception.message, RestStatus.FAILED_DEPENDENCY))
                } catch (exception: Exception) {
                    Metrics.OBSERVABILITY_EXCEPTIONS_INTERNAL_SERVER_ERROR.counter.increment()
                    log.error("$LOG_PREFIX:Uncaught Exception:", exception)
                    listener.onFailure(OpenSearchStatusException(exception.message, RestStatus.INTERNAL_SERVER_ERROR))
                }
            }
        }
    }

    /**
     * Execute the transport request
     * @param request the request to execute
     * @return the response to return.
     */
    abstract fun executeRequest(request: Request, user: User?): Response
}

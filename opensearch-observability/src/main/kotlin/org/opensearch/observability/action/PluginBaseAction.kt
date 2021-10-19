/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

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

package org.opensearch.observability.action

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.opensearch.OpenSearchSecurityException
import org.opensearch.OpenSearchStatusException
import org.opensearch.action.ActionListener
import org.opensearch.action.ActionRequest
import org.opensearch.action.ActionResponse
import org.opensearch.action.support.ActionFilters
import org.opensearch.action.support.HandledTransportAction
import org.opensearch.client.Client
import org.opensearch.common.io.stream.Writeable
import org.opensearch.commons.ConfigConstants.OPENSEARCH_SECURITY_USER_INFO_THREAD_CONTEXT
import org.opensearch.commons.authuser.User
import org.opensearch.index.IndexNotFoundException
import org.opensearch.index.engine.VersionConflictEngineException
import org.opensearch.indices.InvalidIndexNameException
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.util.logger
import org.opensearch.rest.RestStatus
import org.opensearch.tasks.Task
import org.opensearch.transport.TransportService
import java.io.IOException

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
        scope.launch {
            try {
                listener.onResponse(executeRequest(request, user))
            } catch (exception: OpenSearchStatusException) {
                log.warn("$LOG_PREFIX:OpenSearchStatusException: message:${exception.message}")
                listener.onFailure(exception)
            } catch (exception: OpenSearchSecurityException) {
                log.warn("$LOG_PREFIX:OpenSearchSecurityException:", exception)
                listener.onFailure(
                    OpenSearchStatusException(
                        "Permissions denied: ${exception.message} - Contact administrator",
                        RestStatus.FORBIDDEN
                    )
                )
            } catch (exception: VersionConflictEngineException) {
                log.warn("$LOG_PREFIX:VersionConflictEngineException:", exception)
                listener.onFailure(OpenSearchStatusException(exception.message, RestStatus.CONFLICT))
            } catch (exception: IndexNotFoundException) {
                log.warn("$LOG_PREFIX:IndexNotFoundException:", exception)
                listener.onFailure(OpenSearchStatusException(exception.message, RestStatus.NOT_FOUND))
            } catch (exception: InvalidIndexNameException) {
                log.warn("$LOG_PREFIX:InvalidIndexNameException:", exception)
                listener.onFailure(OpenSearchStatusException(exception.message, RestStatus.BAD_REQUEST))
            } catch (exception: IllegalArgumentException) {
                log.warn("$LOG_PREFIX:IllegalArgumentException:", exception)
                listener.onFailure(OpenSearchStatusException(exception.message, RestStatus.BAD_REQUEST))
            } catch (exception: IllegalStateException) {
                log.warn("$LOG_PREFIX:IllegalStateException:", exception)
                listener.onFailure(OpenSearchStatusException(exception.message, RestStatus.SERVICE_UNAVAILABLE))
            } catch (exception: IOException) {
                log.error("$LOG_PREFIX:Uncaught IOException:", exception)
                listener.onFailure(OpenSearchStatusException(exception.message, RestStatus.FAILED_DEPENDENCY))
            } catch (exception: Exception) {
                log.error("$LOG_PREFIX:Uncaught Exception:", exception)
                listener.onFailure(OpenSearchStatusException(exception.message, RestStatus.INTERNAL_SERVER_ERROR))
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

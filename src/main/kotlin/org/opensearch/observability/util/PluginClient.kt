/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.util

import org.opensearch.action.ActionRequest
import org.opensearch.action.ActionType
import org.opensearch.core.action.ActionListener
import org.opensearch.core.action.ActionResponse
import org.opensearch.identity.Subject
import org.opensearch.transport.client.Client
import org.opensearch.transport.client.FilterClient

/**
 * Executes transport actions as this plugin's assigned system subject rather than as the
 * authenticated user, which is how the plugin reaches the system indices it owns.
 */
internal class PluginClient(
    delegate: Client,
) : FilterClient(delegate) {
    private val log by logger(PluginClient::class.java)

    /**
     * Assigned from [org.opensearch.plugins.IdentityAwarePlugin.assignSubject], which runs on a
     * different thread than the transport actions that read it.
     */
    @Volatile
    private var subject: Subject? = null

    fun setSubject(subject: Subject) {
        this.subject = subject
    }

    @Suppress("TooGenericExceptionCaught")
    override fun <Request : ActionRequest, Response : ActionResponse> doExecute(
        action: ActionType<Response>,
        request: Request,
        listener: ActionListener<Response>,
    ) {
        val currentSubject = checkNotNull(subject) { "PluginClient is not initialized with a subject." }

        // Saves the caller's context so it can be restored once the action completes. runAs performs the
        // switch itself, so stashing here would clear the context before it gets the chance. Kept in a
        // local rather than a use block because the action is asynchronous: the block would restore on
        // exit, long before the listener fires.
        val storedContext = threadPool().threadContext.newStoredContext(false)

        try {
            currentSubject.runAs<Exception> {
                log.debug("Running transport action as subject: {}", currentSubject.principal.name)
                super.doExecute(action, request, ActionListener.runBefore(listener) { storedContext.restore() })
            }
        } catch (exception: Exception) {
            // Reported through the listener rather than thrown, so an async caller is not left waiting.
            storedContext.close()
            listener.onFailure(exception)
        }
    }
}

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.util

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.opensearch.action.ActionRequest
import org.opensearch.action.ActionType
import org.opensearch.action.get.GetRequest
import org.opensearch.action.get.GetResponse
import org.opensearch.common.CheckedRunnable
import org.opensearch.core.action.ActionListener
import org.opensearch.core.action.ActionResponse
import org.opensearch.identity.NamedPrincipal
import org.opensearch.identity.PluginSubject
import org.opensearch.test.client.NoOpClient
import org.opensearch.threadpool.TestThreadPool
import org.opensearch.threadpool.ThreadPool
import java.security.Principal
import java.util.concurrent.TimeUnit

internal class PluginClientTests {
    private lateinit var threadPool: ThreadPool
    private lateinit var delegate: CapturingClient
    private lateinit var pluginClient: PluginClient

    @BeforeEach
    fun setup() {
        threadPool = TestThreadPool(PluginClientTests::class.java.name)
        delegate = CapturingClient(threadPool)
        pluginClient = PluginClient(delegate)
    }

    @AfterEach
    fun teardown() {
        ThreadPool.terminate(threadPool, 10, TimeUnit.SECONDS)
    }

    @Test
    fun executeWithoutASubjectFails() {
        val exception =
            assertThrows(IllegalStateException::class.java) {
                pluginClient.get(GetRequest("index", "id"), noOpListener())
            }
        assertThat(exception.message, Matchers.containsString("not initialized with a subject"))
    }

    @Test
    fun callerContextIsRestoredOnlyWhenTheListenerFires() {
        pluginClient.setSubject(SwitchingSubject(threadPool.threadContext))
        threadPool.threadContext.putTransient(CALLER_HEADER, CALLER_VALUE)

        pluginClient.get(GetRequest("index", "id"), noOpListener())

        // The action is in flight, so the caller's context must still be the one runAs switched to.
        // Restoring here would hand the rest of the action the wrong identity.
        assertThat(threadPool.threadContext.getTransient(CALLER_HEADER), Matchers.nullValue())

        delegate.capturedListener!!.onFailure(RuntimeException("response from the delegate"))

        assertThat(threadPool.threadContext.getTransient(CALLER_HEADER), Matchers.equalTo(CALLER_VALUE))
    }

    @Test
    fun aSynchronousFailureIsReportedThroughTheListener() {
        val failure = RuntimeException("runAs refused")
        pluginClient.setSubject(FailingSubject(failure))
        var reported: Exception? = null

        pluginClient.get(
            GetRequest("index", "id"),
            object : ActionListener<GetResponse> {
                override fun onResponse(response: GetResponse) = error("unexpected response")

                override fun onFailure(exception: Exception) {
                    reported = exception
                }
            },
        )

        assertThat(reported, Matchers.sameInstance<Exception>(failure))
        assertThat(delegate.capturedListener, Matchers.nullValue())
    }

    private fun noOpListener(): ActionListener<GetResponse> =
        object : ActionListener<GetResponse> {
            override fun onResponse(response: GetResponse) = Unit

            override fun onFailure(exception: Exception) = Unit
        }

    /**
     * Holds on to the listener instead of answering, so a test can decide when the action completes.
     */
    private class CapturingClient(
        threadPool: ThreadPool,
    ) : NoOpClient(threadPool) {
        var capturedListener: ActionListener<*>? = null

        override fun <Request : ActionRequest, Response : ActionResponse> doExecute(
            action: ActionType<Response>,
            request: Request,
            listener: ActionListener<Response>,
        ) {
            capturedListener = listener
        }
    }

    /**
     * Switches the thread context the way a real subject does, and leaves it switched for the
     * duration of the action it starts.
     */
    private class SwitchingSubject(
        private val threadContext: org.opensearch.common.util.concurrent.ThreadContext,
    ) : PluginSubject {
        override fun getPrincipal(): Principal = NamedPrincipal("plugin")

        override fun <E : Exception> runAs(runnable: CheckedRunnable<E>) {
            threadContext.stashContext()
            runnable.run()
        }
    }

    private class FailingSubject(
        private val failure: Exception,
    ) : PluginSubject {
        override fun getPrincipal(): Principal = NamedPrincipal("plugin")

        override fun <E : Exception> runAs(runnable: CheckedRunnable<E>): Unit = throw failure
    }

    companion object {
        private const val CALLER_HEADER = "caller"
        private const val CALLER_VALUE = "caller-value"
    }
}

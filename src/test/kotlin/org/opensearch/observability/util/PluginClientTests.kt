/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.util

import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertSame
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.opensearch.action.ActionRequest
import org.opensearch.action.ActionRequestValidationException
import org.opensearch.action.ActionType
import org.opensearch.common.CheckedRunnable
import org.opensearch.common.util.concurrent.ThreadContext
import org.opensearch.core.action.ActionListener
import org.opensearch.core.action.ActionResponse
import org.opensearch.core.common.io.stream.StreamOutput
import org.opensearch.identity.NamedPrincipal
import org.opensearch.identity.PluginSubject
import org.opensearch.test.client.NoOpClient
import org.opensearch.threadpool.TestThreadPool
import org.opensearch.threadpool.ThreadPool
import org.opensearch.transport.client.Client
import java.security.Principal
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicInteger
import java.util.concurrent.atomic.AtomicReference

/** Tests that PluginClient runs actions as its subject and notifies the listener in the caller's context. */
internal class PluginClientTests {
    private lateinit var threadPool: ThreadPool
    private lateinit var threadContext: ThreadContext
    private lateinit var responder: ExecutorService
    private lateinit var delegate: CapturingClient
    private lateinit var pluginClient: PluginClient

    @BeforeEach
    fun setup() {
        threadPool = TestThreadPool(PluginClientTests::class.java.name)
        threadContext = threadPool.threadContext
        responder = Executors.newSingleThreadExecutor()
        delegate = CapturingClient(threadPool, threadContext)
        pluginClient = PluginClient(delegate)
    }

    @AfterEach
    fun teardown() {
        responder.shutdownNow()
        ThreadPool.terminate(threadPool, 10, TimeUnit.SECONDS)
    }

    @Test
    fun runsTheActionInsideTheSubject() {
        threadContext.putTransient(CALLER_TRANSIENT, "set-by-caller")
        assignSubject()

        pluginClient.execute(DUMMY_ACTION, DummyRequest(), ActionListener.noOp())

        assertEquals("set-by-subject", delegate.subjectSeen, "the action must run inside runAs")
        assertNull(delegate.callerSeen, "the caller's context must not reach the action")
        assertEquals("set-by-caller", threadContext.getTransient(CALLER_TRANSIENT), "the caller's context must come back")
        assertNull(threadContext.getTransient(SUBJECT_TRANSIENT), "the subject's context must not stay on the caller")
    }

    @Test
    fun listenerSeesTheCallerContextAndNotTheSubjects() {
        assertListenerSeesCallerContext("response") { it.onResponse(DummyResponse()) }
    }

    @Test
    fun listenerSeesTheCallerContextOnFailure() {
        assertListenerSeesCallerContext("failure") { it.onFailure(RuntimeException("action failed")) }
    }

    @Test
    fun restoresTheRespondingThreadsContextAfterTheListenerReturns() {
        threadContext.putTransient(CALLER_TRANSIENT, "set-by-caller")
        assignSubject()
        pluginClient.execute(DUMMY_ACTION, DummyRequest(), ActionListener.noOp())

        // Restoring the caller's context and leaving it there would strand it on a pooled thread for
        // whatever runs next.
        val responderAfter = AtomicReference<String>()
        val callerLeftBehind = AtomicReference<String>()
        completeOnAnotherThread { listener ->
            listener.onResponse(DummyResponse())
            responderAfter.set(threadContext.getTransient(RESPONDER_TRANSIENT))
            callerLeftBehind.set(threadContext.getTransient(CALLER_TRANSIENT))
        }

        assertEquals("set-by-responder", responderAfter.get(), "the responding thread's own context must come back")
        assertNull(callerLeftBehind.get(), "the caller's context must not be left on the responding thread")
    }

    @Test
    fun listenerSeesResponseHeadersTheActionAdded() {
        assignSubject()
        val warnings = AtomicReference<List<String>?>()
        pluginClient.execute(
            DUMMY_ACTION,
            DummyRequest(),
            ActionListener.wrap({ warnings.set(threadContext.responseHeaders["Warning"]) }, { throw AssertionError("unexpected failure", it) }),
        )

        completeOnAnotherThread { listener ->
            threadContext.addResponseHeader("Warning", "deprecated")
            listener.onResponse(DummyResponse())
        }

        assertEquals(listOf("deprecated"), warnings.get())
    }

    @Test
    fun throwsADelegateFailureToTheCallerAsTheWrappedClientWould() {
        assignSubject()
        val boom = RuntimeException("failed to find action")
        delegate.behaviour = { throw boom }

        val failures = mutableListOf<Exception>()
        val thrown =
            assertThrows(RuntimeException::class.java) {
                pluginClient.execute(DUMMY_ACTION, DummyRequest(), ActionListener.wrap({}, { failures.add(it) }))
            }

        assertSame(boom, thrown)
        assertEquals(emptyList<Exception>(), failures, "a failure thrown before the listener exists must not also reach it")
    }

    @Test
    fun doesNotNotifyAgainWhenTheListenerItselfThrows() {
        assignSubject()
        delegate.behaviour = { it.onResponse(DummyResponse()) }

        val listenerBug = RuntimeException("listener bug")
        val calls = AtomicInteger()
        val throwing =
            object : ActionListener<DummyResponse> {
                override fun onResponse(response: DummyResponse) {
                    calls.incrementAndGet()
                    throw listenerBug
                }

                override fun onFailure(exception: Exception) {
                    calls.incrementAndGet()
                }
            }

        val surfaced =
            assertThrows(RuntimeException::class.java) {
                pluginClient.execute(DUMMY_ACTION, DummyRequest(), throwing)
            }
        assertSame(listenerBug, surfaced)
        assertEquals(1, calls.get(), "the listener must be told exactly once")
    }

    @Test
    fun rejectsUseBeforeASubjectIsAssigned() {
        val exception =
            assertThrows(IllegalStateException::class.java) {
                pluginClient.execute(DUMMY_ACTION, DummyRequest(), ActionListener.noOp())
            }
        assertTrue(exception.message.orEmpty().contains("not initialized with a subject"))
        assertNull(delegate.capturedListener, "the action must not reach the delegate")
    }

    @Test
    fun acceptsTheSameSubjectTwiceButRejectsADifferentOne() {
        val first = assignSubject()
        pluginClient.setSubject(first)

        assertThrows(IllegalStateException::class.java) { pluginClient.setSubject(RecordingSubject(threadContext, "other-subject")) }

        pluginClient.execute(DUMMY_ACTION, DummyRequest(), ActionListener.noOp())
        assertEquals("set-by-subject", delegate.subjectSeen, "a rejected subject must not replace the first")
    }

    @Test
    fun refusesARemoteClusterClient() {
        assertThrows(UnsupportedOperationException::class.java) { pluginClient.getRemoteClusterClient("remote") }
    }

    private fun assertListenerSeesCallerContext(
        expectedPath: String,
        completion: (ActionListener<DummyResponse>) -> Unit,
    ) {
        threadContext.putTransient(CALLER_TRANSIENT, "set-by-caller")
        assignSubject()

        val pathTaken = AtomicReference<String>("listener did not run")
        val callerSeen = AtomicReference<String>("listener did not run")
        val subjectSeen = AtomicReference<String>("listener did not run")
        val record = { path: String ->
            pathTaken.set(path)
            callerSeen.set(threadContext.getTransient(CALLER_TRANSIENT))
            subjectSeen.set(threadContext.getTransient(SUBJECT_TRANSIENT))
        }
        pluginClient.execute(DUMMY_ACTION, DummyRequest(), ActionListener.wrap({ record("response") }, { record("failure") }))

        // A response arrives on a pooled thread that never carried the caller's context, so the wrapper
        // around the listener is the only thing that can put it back.
        completeOnAnotherThread(completion)

        assertEquals(expectedPath, pathTaken.get())
        assertEquals("set-by-caller", callerSeen.get())
        assertNull(subjectSeen.get(), "the subject's context must not leak into the listener")
    }

    private fun assignSubject(): RecordingSubject {
        val subject = RecordingSubject(threadContext)
        pluginClient.setSubject(subject)
        return subject
    }

    /** Completes the captured action on a thread that never carried the caller's context. */
    private fun completeOnAnotherThread(completion: (ActionListener<DummyResponse>) -> Unit) {
        val listener = checkNotNull(delegate.capturedListener) { "the action never reached the delegate" }
        responder
            .submit {
                threadContext.putTransient(RESPONDER_TRANSIENT, "set-by-responder")
                completion(listener)
            }.get(10, TimeUnit.SECONDS)
    }

    /**
     * Records the context each action runs in and keeps its listener, so a test decides when and how the
     * action completes. By default it does not complete, as for an asynchronous action.
     */
    private class CapturingClient(
        threadPool: ThreadPool,
        private val threadContext: ThreadContext,
    ) : NoOpClient(threadPool) {
        var behaviour: (ActionListener<DummyResponse>) -> Unit = {}
        var capturedListener: ActionListener<DummyResponse>? = null
        var subjectSeen: String? = null
        var callerSeen: String? = null

        // NoOpClient already refuses remote clients, which would hide a PluginClient that forwards the call.
        override fun getRemoteClusterClient(clusterAlias: String): Client = this

        @Suppress("UNCHECKED_CAST")
        override fun <Request : ActionRequest, Response : ActionResponse> doExecute(
            action: ActionType<Response>,
            request: Request,
            listener: ActionListener<Response>,
        ) {
            subjectSeen = threadContext.getTransient(SUBJECT_TRANSIENT)
            callerSeen = threadContext.getTransient(CALLER_TRANSIENT)
            val captured = listener as ActionListener<DummyResponse>
            capturedListener = captured
            behaviour(captured)
        }
    }

    /**
     * Stands in for the plugin subject. Stashes and restores around its body as NoopPluginSubject and
     * SecurePluginSubject do, and marks the context so a test can tell the subject's apart from the caller's.
     */
    private class RecordingSubject(
        private val threadContext: ThreadContext,
        private val marker: String = "set-by-subject",
    ) : PluginSubject {
        override fun getPrincipal(): Principal = NamedPrincipal("plugin:test")

        override fun <E : Exception> runAs(runnable: CheckedRunnable<E>) {
            threadContext.stashContext().use {
                threadContext.putTransient(SUBJECT_TRANSIENT, marker)
                runnable.run()
            }
        }
    }

    private class DummyRequest : ActionRequest() {
        override fun validate(): ActionRequestValidationException? = null
    }

    private class DummyResponse : ActionResponse() {
        override fun writeTo(out: StreamOutput) = Unit
    }

    companion object {
        private const val CALLER_TRANSIENT = "caller.marker"
        private const val SUBJECT_TRANSIENT = "subject.marker"
        private const val RESPONDER_TRANSIENT = "responder.marker"
        private val DUMMY_ACTION = ActionType("cluster:admin/plugin_client_test") { DummyResponse() }
    }
}

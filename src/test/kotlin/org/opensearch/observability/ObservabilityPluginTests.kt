/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability

import com.nhaarman.mockitokotlin2.mock
import com.nhaarman.mockitokotlin2.whenever
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.junit.jupiter.api.io.TempDir
import org.opensearch.cluster.service.ClusterService
import org.opensearch.common.settings.ClusterSettings
import org.opensearch.common.settings.Settings
import org.opensearch.env.Environment
import org.opensearch.env.NodeEnvironment
import org.opensearch.env.TestEnvironment
import org.opensearch.identity.PluginSubject
import org.opensearch.observability.settings.PluginSettings
import org.opensearch.test.client.NoOpClient
import org.opensearch.threadpool.TestThreadPool
import org.opensearch.threadpool.ThreadPool
import java.nio.file.Path
import java.util.concurrent.TimeUnit

/** Tests that ObservabilityPlugin hands the subject core assigns to the client it builds. */
internal class ObservabilityPluginTests {
    private lateinit var threadPool: ThreadPool

    @BeforeEach
    fun setup() {
        threadPool = TestThreadPool(ObservabilityPluginTests::class.java.name)
    }

    @AfterEach
    fun teardown() {
        ThreadPool.terminate(threadPool, 10, TimeUnit.SECONDS)
    }

    @Test
    fun assignSubjectSetsTheSubjectOnThePluginClient(
        @TempDir home: Path,
    ) {
        // NodeEnvironment is final, so the test builds a real one. The seed spares it the randomized test context.
        val settings =
            Settings
                .builder()
                .put(Environment.PATH_HOME_SETTING.key, home.toString())
                .put(NodeEnvironment.NODE_ID_SEED_SETTING.key, 0L)
                .build()
        val environment = TestEnvironment.newEnvironment(settings)
        val plugin = ObservabilityPlugin()
        NodeEnvironment(environment.settings(), environment).use { nodeEnvironment ->
            plugin.createComponents(
                NoOpClient(threadPool),
                clusterService(),
                threadPool,
                mock(),
                mock(),
                mock(),
                environment,
                nodeEnvironment,
                mock(),
                mock(),
                mock(),
            )
        }
        val subject = mock<PluginSubject>()

        plugin.assignSubject(subject)
        plugin.assignSubject(subject)

        // Only a client that already holds the first subject rejects a second one.
        val exception = assertThrows<IllegalStateException> { plugin.assignSubject(mock()) }
        assertTrue(exception.message.orEmpty().contains("already has a subject assigned"))
    }

    private fun clusterService(): ClusterService {
        val clusterService = mock<ClusterService>()
        whenever(clusterService.settings).thenReturn(Settings.EMPTY)
        whenever(clusterService.clusterSettings).thenReturn(ClusterSettings(Settings.EMPTY, PluginSettings.getAllSettings().toSet()))
        return clusterService
    }
}

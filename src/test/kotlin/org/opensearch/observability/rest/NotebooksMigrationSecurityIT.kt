/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.rest

import org.apache.hc.core5.http.HttpHeaders
import org.apache.hc.core5.http.HttpHost
import org.apache.hc.core5.http.message.BasicHeader
import org.junit.Assert
import org.junit.Assume
import org.junit.Before
import org.opensearch.client.Request
import org.opensearch.client.RequestOptions
import org.opensearch.client.ResponseException
import org.opensearch.client.RestClient
import org.opensearch.client.WarningsHandler
import org.opensearch.common.settings.Settings
import org.opensearch.core.rest.RestStatus
import org.opensearch.observability.ObservabilityPlugin.Companion.BASE_OBSERVABILITY_URI
import org.opensearch.observability.PluginRestTestCase
import org.opensearch.observability.constructSavedQueryRequest
import org.opensearch.observability.index.ObservabilityIndex
import org.opensearch.rest.RestRequest
import java.nio.charset.StandardCharsets
import java.util.Base64

/**
 * Checks, with the security plugin installed, that creating the observability index copies the documents of the legacy
 * notebooks index into it. The copy is a reindex that the plugin subject runs, so it needs the cluster permissions in
 * plugin-additional-permissions.yml.
 */
class NotebooksMigrationSecurityIT : PluginRestTestCase() {
    @Before
    fun requireSecurity() {
        Assume.assumeTrue("Security-enabled test cluster required", System.getProperty("security.enabled").toBoolean())
    }

    override fun buildClient(
        settings: Settings,
        hosts: Array<HttpHost>,
    ): RestClient {
        val credentials = "${System.getProperty("user")}:${System.getProperty("password")}"
        val authorization = "Basic " + Base64.getEncoder().encodeToString(credentials.toByteArray(StandardCharsets.UTF_8))
        val builder = RestClient.builder(*hosts)
        configureClient(builder, settings)
        builder.setDefaultHeaders(arrayOf(BasicHeader(HttpHeaders.AUTHORIZATION, authorization)))
        return builder.build()
    }

    fun `test creating the observability index copies the legacy notebooks`() {
        Assert.assertFalse("the observability index must not exist yet", indexExists(ObservabilityIndex.INDEX_NAME))

        val legacy = Request("PUT", "/${ObservabilityIndex.NOTEBOOKS_INDEX_NAME}/_doc/legacy-notebook")
        legacy.addParameter("refresh", "true")
        legacy.setJsonEntity("""{"notebook":{"name":"legacy notebook","backend":"Default","paragraphs":[]}}""")
        legacy.options = permissive()
        client().performRequest(legacy)

        // The first object write creates the observability index, which reindexes the legacy notebooks into it.
        executeRequest(RestRequest.Method.POST.name, "$BASE_OBSERVABILITY_URI/object", constructSavedQueryRequest(), RestStatus.OK.status)

        val copied = Request("GET", "/${ObservabilityIndex.INDEX_NAME}/_doc/legacy-notebook")
        copied.options = permissive()
        val response =
            try {
                client().performRequest(copied)
            } catch (e: ResponseException) {
                e.response
            }
        Assert.assertEquals(
            "the legacy notebook is in the observability index",
            RestStatus.OK.status,
            response.statusLine.statusCode,
        )
    }

    private fun permissive(): RequestOptions =
        RequestOptions.DEFAULT
            .toBuilder()
            .apply { setWarningsHandler(WarningsHandler.PERMISSIVE) }
            .build()
}

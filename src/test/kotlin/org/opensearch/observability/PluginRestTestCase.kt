/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability

import com.google.gson.JsonObject
import org.apache.http.HttpHost
import org.junit.After
import org.junit.AfterClass
import org.junit.Assert
import org.junit.Before
import org.opensearch.client.Request
import org.opensearch.client.RequestOptions
import org.opensearch.client.Response
import org.opensearch.client.ResponseException
import org.opensearch.client.RestClient
import org.opensearch.client.WarningsHandler
import org.opensearch.common.io.PathUtils
import org.opensearch.common.settings.Settings
import org.opensearch.common.xcontent.DeprecationHandler
import org.opensearch.common.xcontent.NamedXContentRegistry
import org.opensearch.common.xcontent.XContentType
import org.opensearch.commons.ConfigConstants
import org.opensearch.commons.rest.SecureRestClientBuilder
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestStatus
import org.opensearch.test.rest.OpenSearchRestTestCase
import java.io.BufferedReader
import java.io.IOException
import java.io.InputStreamReader
import java.nio.charset.StandardCharsets
import java.nio.file.Files
import java.nio.file.Path
import javax.management.MBeanServerInvocationHandler
import javax.management.ObjectName
import javax.management.remote.JMXConnectorFactory
import javax.management.remote.JMXServiceURL

abstract class PluginRestTestCase : OpenSearchRestTestCase() {

    private fun isHttps(): Boolean {
        return System.getProperty("https", "false")!!.toBoolean()
    }

    override fun getProtocol(): String {
        return if (isHttps()) {
            "https"
        } else {
            "http"
        }
    }

    override fun preserveIndicesUponCompletion(): Boolean {
        return true
    }

    open fun preserveOpenSearchIndicesAfterTest(): Boolean = false
    open fun preserveOpenSearchDataStreamsAfterTest(): Boolean = true

    @Throws(IOException::class)
    @After
    open fun wipeAllOpenSearchIndices() {
        if (!preserveOpenSearchDataStreamsAfterTest()) {
            var getResponse = executeRequest(
                RestRequest.Method.GET.name,
                "/_data_stream/*",
                "",
                RestStatus.OK.status
            )
            Assert.assertNotNull(!getResponse.get("data_streams").asJsonArray.isEmpty)
            for (stream in getResponse.get("data_streams").asJsonArray) {
                dataStreamCleanUp(stream.asJsonObject.get("name").asString)
            }
        }
        if (!preserveOpenSearchIndicesAfterTest()) {
            val response = client().performRequest(Request("GET", "/_cat/indices?format=json&expand_wildcards=all"))
            val xContentType = XContentType.fromMediaType(response.entity.contentType.value)
            xContentType.xContent().createParser(
                NamedXContentRegistry.EMPTY, DeprecationHandler.THROW_UNSUPPORTED_OPERATION,
                response.entity.content
            ).use { parser ->
                for (index in parser.list()) {
                    val jsonObject: Map<*, *> = index as java.util.HashMap<*, *>
                    val indexName: String = jsonObject["index"] as String
                    // .opendistro_security isn't allowed to delete from cluster and same for data-stream backing indices
                    if (".opendistro_security" != indexName && !indexName.startsWith(".ds-", false)) {
                        val request = Request("DELETE", "/$indexName")
                        // TODO: remove PERMISSIVE option after moving system index access to REST API call
                        val options = RequestOptions.DEFAULT.toBuilder()
                        options.setWarningsHandler(WarningsHandler.PERMISSIVE)
                        request.options = options.build()
                        adminClient().performRequest(request)
                    }
                }
            }
        }
    }

    fun dataStreamCleanUp(stream: String) {
        // remove data-stream for house cleaning
        var response = executeRequest(
            RestRequest.Method.DELETE.name,
            "/_data_stream/$stream",
            "",
            RestStatus.OK.status
        )
        Assert.assertNotNull(response.get("acknowledged"))
        Assert.assertEquals(true, response.get("acknowledged").asBoolean)
    }

    open fun cleanUp() {
        // Override for specific cleanup behaviour
    }

    /**
     * Returns the REST client settings used for super-admin actions like cleaning up after the test has completed.
     */
    override fun restAdminSettings(): Settings {
        return Settings
            .builder()
            .put("http.port", 9200)
            .put(ConfigConstants.OPENSEARCH_SECURITY_SSL_HTTP_ENABLED, isHttps())
            .put(ConfigConstants.OPENSEARCH_SECURITY_SSL_HTTP_PEMCERT_FILEPATH, "sample.pem")
            .put(ConfigConstants.OPENSEARCH_SECURITY_SSL_HTTP_KEYSTORE_FILEPATH, "test-kirk.jks")
            .put(ConfigConstants.OPENSEARCH_SECURITY_SSL_HTTP_KEYSTORE_PASSWORD, "changeit")
            .put(ConfigConstants.OPENSEARCH_SECURITY_SSL_HTTP_KEYSTORE_KEYPASSWORD, "changeit")
            .build()
    }

    @Throws(IOException::class)
    override fun buildClient(settings: Settings, hosts: Array<HttpHost>): RestClient {
        if (isHttps()) {
            val keystore = settings.get(ConfigConstants.OPENSEARCH_SECURITY_SSL_HTTP_KEYSTORE_FILEPATH)
            return when (keystore != null) {
                true -> {
                    // create adminDN (super-admin) client
                    val uri = javaClass.classLoader.getResource("security/sample.pem").toURI()
                    val configPath = PathUtils.get(uri).parent.toAbsolutePath()
                    SecureRestClientBuilder(settings, configPath).setSocketTimeout(60000).build()
                }
                false -> {
                    // create client with passed user
                    val userName = System.getProperty("user")
                    val password = System.getProperty("password")
                    SecureRestClientBuilder(hosts, isHttps(), userName, password).setSocketTimeout(60000).build()
                }
            }
        } else {
            val builder = RestClient.builder(*hosts)
            configureClient(builder, settings)
            builder.setStrictDeprecationMode(true)
            return builder.build()
        }
    }

    @Before
    @Throws(InterruptedException::class)
    open fun setup() {
        if (client() == null) {
            initClient()
        }
    }

    fun executeRequest(
        method: String,
        url: String,
        jsonString: String,
        expectedRestStatus: Int? = null
    ): JsonObject {
        val request = Request(method, url)
        request.setJsonEntity(jsonString)
        val restOptionsBuilder = RequestOptions.DEFAULT.toBuilder()
        restOptionsBuilder.addHeader("Content-Type", "application/json")
        request.setOptions(restOptionsBuilder)
        return executeRequest(request, expectedRestStatus)
    }

    private fun executeRequest(request: Request, expectedRestStatus: Int? = null): JsonObject {
        val response = try {
            client().performRequest(request)
        } catch (exception: ResponseException) {
            exception.response
        }
        if (expectedRestStatus != null) {
            assertEquals(expectedRestStatus, response.statusLine.statusCode)
        }
        val responseBody = getResponseBody(response)
        return jsonify(responseBody)
    }

    @Throws(IOException::class)
    private fun getResponseBody(response: Response, retainNewLines: Boolean = true): String {
        val sb = StringBuilder()
        response.entity.content.use { `is` ->
            BufferedReader(
                InputStreamReader(`is`, StandardCharsets.UTF_8)
            ).use { br ->
                var line: String?
                while (br.readLine().also { line = it } != null) {
                    sb.append(line)
                    if (retainNewLines) {
                        sb.appendLine()
                    }
                }
            }
        }
        return sb.toString()
    }

    @After
    open fun wipeAllSettings() {
        wipeAllClusterSettings()
    }

    @Throws(IOException::class)
    protected open fun getAllClusterSettings(): JsonObject? {
        val request = Request("GET", "/_cluster/settings?flat_settings&include_defaults")
        val restOptionsBuilder = RequestOptions.DEFAULT.toBuilder()
        restOptionsBuilder.addHeader("Content-Type", "application/json")
        request.setOptions(restOptionsBuilder)
        return executeRequest(request)
    }

    @Throws(IOException::class)
    protected fun updateClusterSettings(setting: ClusterSetting): JsonObject {
        val request = Request("PUT", "/_cluster/settings")
        val persistentSetting = "{\"${setting.type}\": {\"${setting.name}\": ${setting.value}}}"
        request.setJsonEntity(persistentSetting)
        val restOptionsBuilder = RequestOptions.DEFAULT.toBuilder()
        restOptionsBuilder.addHeader("Content-Type", "application/json")
        request.setOptions(restOptionsBuilder)
        return executeRequest(request)
    }

    @Throws(IOException::class)
    protected open fun wipeAllClusterSettings() {
        updateClusterSettings(ClusterSetting("persistent", "*", null))
        updateClusterSettings(ClusterSetting("transient", "*", null))
    }

    protected class ClusterSetting(val type: String, val name: String, var value: Any?) {
        init {
            this.value = if (value == null) "null" else "\"" + value + "\""
        }
    }

    companion object {
        internal interface IProxy {
            val version: String?
            var sessionId: String?

            fun getExecutionData(reset: Boolean): ByteArray?
            fun dump(reset: Boolean)
            fun reset()
        }

        /*
        * We need to be able to dump the jacoco coverage before the cluster shuts down.
        * The new internal testing framework removed some gradle tasks we were listening to,
        * to choose a good time to do it. This will dump the executionData to file after each test.
        * TODO: This is also currently just overwriting integTest.exec with the updated execData without
        *   resetting after writing each time. This can be improved to either write an exec file per test
                *   or by letting jacoco append to the file.
                * */
        @JvmStatic
        @AfterClass
        fun dumpCoverage() {
            // jacoco.dir set in opensearchplugin-coverage.gradle, if it doesn't exist we don't
            // want to collect coverage, so we can return early
            val jacocoBuildPath = System.getProperty("jacoco.dir") ?: return
            val serverUrl = "service:jmx:rmi:///jndi/rmi://127.0.0.1:7777/jmxrmi"
            JMXConnectorFactory.connect(JMXServiceURL(serverUrl)).use { connector ->
                val proxy = MBeanServerInvocationHandler.newProxyInstance(
                    connector.mBeanServerConnection,
                    ObjectName("org.jacoco:type=Runtime"),
                    IProxy::class.java,
                    false
                )
                proxy.getExecutionData(false)?.let {
                    val path = Path.of("$jacocoBuildPath/integTest.exec")
                    Files.write(path, it)
                }
            }
        }
    }
}

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.rest

import org.junit.Assert
import org.opensearch.observability.PluginRestTestCase
import org.opensearch.rest.RestRequest
import org.opensearch.rest.RestStatus

class AssemblyValidationIT : PluginRestTestCase() {
    companion object {
        private const val TRACES_MAPPING_TEMPLATE_NAME = "ss4o_traces_template"
        private const val METRICS_MAPPING_TEMPLATE_NAME = "ss4o_metrics_template"
        private const val LOGS_MAPPING_TEMPLATE_NAME = "ss4o_logs_template"
    }

    fun `test observability communication template was created`() {
        // verify logs mapping template was created successfully as part of the plugin initialization
        val response = executeRequest(
            RestRequest.Method.GET.name,
            "/_index_template/ss4o_communication_template",
            "{}",
            RestStatus.OK.status
        )
        Assert.assertNotNull(response.get("index_templates"))
        Assert.assertNotNull(!response.get("index_templates").asJsonArray.isEmpty)
    }

    fun `test observability http template was created`() {
        // verify logs mapping template was created successfully as part of the plugin initialization
        val response = executeRequest(
            RestRequest.Method.GET.name,
            "/_index_template/ss4o_http_template",
            "{}",
            RestStatus.OK.status
        )
        Assert.assertNotNull(response.get("index_templates"))
        Assert.assertNotNull(!response.get("index_templates").asJsonArray.isEmpty)
    }

    fun `test observability logs template was created`() {
        // verify logs mapping template was created successfully as part of the plugin initialization
        val response = executeRequest(
            RestRequest.Method.GET.name,
            "/_index_template/$LOGS_MAPPING_TEMPLATE_NAME",
            "{}",
            RestStatus.OK.status
        )
        Assert.assertNotNull(response.get("index_templates"))
        Assert.assertNotNull(!response.get("index_templates").asJsonArray.isEmpty)
    }

    fun `test observability metrics template was created`() {
        // verify metrics mapping template was created successfully as part of the plugin initialization
        val response = executeRequest(
            RestRequest.Method.GET.name,
            "/_index_template/$METRICS_MAPPING_TEMPLATE_NAME",
            "{}",
            RestStatus.OK.status
        )
        Assert.assertNotNull(response.get("index_templates"))
        Assert.assertNotNull(!response.get("index_templates").asJsonArray.isEmpty)
    }

    fun `test observability traces template was created`() {
        // verify traces mapping template was created successfully as part of the plugin initialization
        val response = executeRequest(
            RestRequest.Method.GET.name,
            "/_index_template/$TRACES_MAPPING_TEMPLATE_NAME",
            "{}",
            RestStatus.OK.status
        )
        Assert.assertNotNull(response.get("index_templates"))
        Assert.assertNotNull(!response.get("index_templates").asJsonArray.isEmpty)
    }
}

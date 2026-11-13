/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.util

import org.opensearch.transport.client.Client

/** The observability plugin's client that runs actions as its system subject. */
internal class PluginClient(
    delegate: Client,
) : org.opensearch.commons.client.PluginClient(delegate)

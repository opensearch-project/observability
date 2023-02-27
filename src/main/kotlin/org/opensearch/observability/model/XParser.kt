/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.model

import org.opensearch.core.xcontent.XContentParser

/**
 * Functional interface to create object using XContentParser
 */
fun interface XParser<V> {
    /**
     * Creator used in REST communication.
     * @param parser XContentParser to deserialize data from.
     */
    fun parse(parser: XContentParser): V
}

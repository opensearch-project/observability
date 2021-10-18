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

package org.opensearch.observability.model

import org.opensearch.common.xcontent.XContentParser

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

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.metrics

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertDoesNotThrow
import org.opensearch.observability.model.ObservabilityObjectType

internal class MetricsTests {
    @Test
    fun testInvalidArguments() {
        assertDoesNotThrow {
            Metrics.incrementObservabilityObjectActionCounter(ObservabilityObjectType.NONE, Metrics.Action.UPDATE)
        }
    }
}

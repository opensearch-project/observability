/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.metrics

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertDoesNotThrow
import org.opensearch.observability.model.ObservabilityObjectType
import kotlin.test.assertEquals

internal class MetricsTests {
    @Test
    fun incrementCreateCounter() {
        Metrics.incrementObservabilityObjectActionCounter(ObservabilityObjectType.NOTEBOOK, Metrics.Action.CREATE)
        Metrics.incrementObservabilityObjectActionCounter(ObservabilityObjectType.APPLICATION, Metrics.Action.CREATE)
        Metrics.incrementObservabilityObjectActionCounter(ObservabilityObjectType.SAVED_QUERY, Metrics.Action.CREATE)
        Metrics.incrementObservabilityObjectActionCounter(
            ObservabilityObjectType.OPERATIONAL_PANEL,
            Metrics.Action.CREATE
        )
        Metrics.incrementObservabilityObjectActionCounter(
            ObservabilityObjectType.SAVED_VISUALIZATION,
            Metrics.Action.CREATE
        )
        Metrics.incrementObservabilityObjectActionCounter(ObservabilityObjectType.TIMESTAMP, Metrics.Action.CREATE)
        assertEquals(Metrics.NOTEBOOK_CREATE_TOTAL.counter.value, 1L)
        assertEquals(Metrics.APPLICATION_CREATE_TOTAL.counter.value, 1L)
        assertEquals(Metrics.SAVED_QUERY_CREATE_TOTAL.counter.value, 1L)
        assertEquals(Metrics.OPERATIONAL_PANEL_CREATE_TOTAL.counter.value, 1L)
        assertEquals(Metrics.SAVED_VISUALIZATION_CREATE_TOTAL.counter.value, 1L)
        assertEquals(Metrics.TIMESTAMP_CREATE_TOTAL.counter.value, 1L)
    }

    @Test
    fun incrementUpdateCounter() {
        Metrics.incrementObservabilityObjectActionCounter(ObservabilityObjectType.NOTEBOOK, Metrics.Action.UPDATE)
        Metrics.incrementObservabilityObjectActionCounter(ObservabilityObjectType.APPLICATION, Metrics.Action.UPDATE)
        Metrics.incrementObservabilityObjectActionCounter(ObservabilityObjectType.SAVED_QUERY, Metrics.Action.UPDATE)
        Metrics.incrementObservabilityObjectActionCounter(
            ObservabilityObjectType.OPERATIONAL_PANEL,
            Metrics.Action.UPDATE
        )
        Metrics.incrementObservabilityObjectActionCounter(
            ObservabilityObjectType.SAVED_VISUALIZATION,
            Metrics.Action.UPDATE
        )
        Metrics.incrementObservabilityObjectActionCounter(ObservabilityObjectType.TIMESTAMP, Metrics.Action.UPDATE)
        assertEquals(Metrics.NOTEBOOK_UPDATE_TOTAL.counter.value, 1L)
        assertEquals(Metrics.APPLICATION_UPDATE_TOTAL.counter.value, 1L)
        assertEquals(Metrics.SAVED_QUERY_UPDATE_TOTAL.counter.value, 1L)
        assertEquals(Metrics.OPERATIONAL_PANEL_UPDATE_TOTAL.counter.value, 1L)
        assertEquals(Metrics.SAVED_VISUALIZATION_UPDATE_TOTAL.counter.value, 1L)
        assertEquals(Metrics.TIMESTAMP_UPDATE_TOTAL.counter.value, 1L)
    }

    @Test
    fun testInvalidArguments() {
        assertDoesNotThrow {
            Metrics.incrementObservabilityObjectActionCounter(ObservabilityObjectType.NONE, Metrics.Action.UPDATE)
        }
    }
}

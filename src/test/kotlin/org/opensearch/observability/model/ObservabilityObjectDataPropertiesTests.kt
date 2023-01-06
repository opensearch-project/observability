/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.model

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.opensearch.observability.model.ObservabilityObjectDataProperties.getReaderForObjectType

internal class ObservabilityObjectDataPropertiesTests {
    @Test
    fun `Validate object property reader Notebook`() {
        assertEquals(getReaderForObjectType(ObservabilityObjectType.NOTEBOOK), Notebook.reader)
    }

    @Test
    fun `Validate object property reader SavedVisualization`() {
        assertEquals(getReaderForObjectType(ObservabilityObjectType.SAVED_VISUALIZATION), SavedVisualization.reader)
    }

    @Test
    fun `Validate object property reader OperationalPanel`() {
        assertEquals(getReaderForObjectType(ObservabilityObjectType.OPERATIONAL_PANEL), OperationalPanel.reader)
    }

    @Test
    fun `Validate object property reader Timestamp`() {
        assertEquals(getReaderForObjectType(ObservabilityObjectType.TIMESTAMP), Timestamp.reader)
    }
}

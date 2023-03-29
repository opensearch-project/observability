/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.model

import org.opensearch.common.io.stream.Writeable
import org.opensearch.core.xcontent.XContentParser

internal object ObservabilityObjectDataProperties {
    /**
     * Properties for ConfigTypes.
     * This data class is used to provide contract across configTypes without reading into config data classes.
     */
    private data class ObjectProperty(
        val objectDataReader: Writeable.Reader<out BaseObjectData>?,
        val objectDataParser: XParser<out BaseObjectData>
    )

    private val OBJECT_PROPERTIES_MAP = mapOf(
        Pair(ObservabilityObjectType.NOTEBOOK, ObjectProperty(Notebook.reader, Notebook.xParser)),
        Pair(ObservabilityObjectType.SAVED_QUERY, ObjectProperty(SavedQuery.reader, SavedQuery.xParser)),
        Pair(
            ObservabilityObjectType.SAVED_VISUALIZATION,
            ObjectProperty(SavedVisualization.reader, SavedVisualization.xParser)
        ),
        Pair(
            ObservabilityObjectType.OPERATIONAL_PANEL,
            ObjectProperty(OperationalPanel.reader, OperationalPanel.xParser)
        ),
        Pair(
            ObservabilityObjectType.APPLICATION,
            ObjectProperty(Application.reader, Application.xParser)
        ),
        Pair(
            ObservabilityObjectType.TIMESTAMP,
            ObjectProperty(Timestamp.reader, Timestamp.xParser)
        )
    )

    /**
     * Get Reader for provided config type
     * @param @ConfigType
     * @return Reader
     */
    fun getReaderForObjectType(objectType: ObservabilityObjectType): Writeable.Reader<out BaseObjectData> {
        return OBJECT_PROPERTIES_MAP[objectType]?.objectDataReader
            ?: throw IllegalArgumentException("Transport action used with unknown ConfigType:$objectType")
    }

    /**
     * Validate config data is of ConfigType
     */
    fun validateObjectData(objectType: ObservabilityObjectType, objectData: BaseObjectData?): Boolean {
        return when (objectType) {
            ObservabilityObjectType.NOTEBOOK -> objectData is Notebook
            ObservabilityObjectType.SAVED_QUERY -> objectData is SavedQuery
            ObservabilityObjectType.SAVED_VISUALIZATION -> objectData is SavedVisualization
            ObservabilityObjectType.OPERATIONAL_PANEL -> objectData is OperationalPanel
            ObservabilityObjectType.APPLICATION -> objectData is Application
            ObservabilityObjectType.TIMESTAMP -> objectData is Timestamp
            ObservabilityObjectType.NONE -> true
        }
    }

    /**
     * Creates config data from parser for given configType
     * @param objectType the ConfigType
     * @param parser parser for ConfigType
     * @return created BaseObjectData on success. null if configType is not recognized
     *
     */
    fun createObjectData(objectType: ObservabilityObjectType, parser: XContentParser): BaseObjectData? {
        return OBJECT_PROPERTIES_MAP[objectType]?.objectDataParser?.parse(parser)
    }
}

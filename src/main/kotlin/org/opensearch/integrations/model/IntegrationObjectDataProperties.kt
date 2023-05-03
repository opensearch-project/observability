/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.integrations.model

import org.opensearch.common.io.stream.Writeable
import org.opensearch.core.xcontent.XContentParser
<<<<<<< HEAD
=======
import org.opensearch.observability.model.XParser
>>>>>>> 89dda4a6 (create integration doc)

internal object IntegrationObjectDataProperties {
    /**
     * Properties for ConfigTypes.
     * This data class is used to provide contract across configTypes without reading into config data classes.
     */
    private data class ObjectProperty(
        val objectDataReader: Writeable.Reader<out BaseObjectData>?,
        val objectDataParser: XParser<out BaseObjectData>
    )

    private val OBJECT_PROPERTIES_MAP = mapOf(
<<<<<<< HEAD

        Pair(
            IntegrationObjectType.TIMESTAMP,
            ObjectProperty(Timestamp.reader, Timestamp.xParser)
=======
        Pair(
            IntegrationObjectType.INSTANCE,
            ObjectProperty(IntegrationInstance.reader, IntegrationInstance.xParser)
        ),
        Pair(
            IntegrationObjectType.TEMPLATE,
            ObjectProperty(IntegrationTemplate.reader, IntegrationTemplate.xParser)
>>>>>>> 89dda4a6 (create integration doc)
        )
    )

    /**
     * Get Reader for provided config type
     * @param @ConfigType
     * @return Reader
     */
    fun getReaderForObjectType(objectType: IntegrationObjectType): Writeable.Reader<out BaseObjectData> {
        return OBJECT_PROPERTIES_MAP[objectType]?.objectDataReader
            ?: throw IllegalArgumentException("Transport action used with unknown ConfigType:$objectType")
    }

    /**
<<<<<<< HEAD
     * Validate config data is of ConfigType
     */
    fun validateObjectData(objectType: IntegrationObjectType, objectData: BaseObjectData?): Boolean {
        return when (objectType) {
            IntegrationObjectType.NOTEBOOK -> objectData is Notebook
            IntegrationObjectType.SAVED_QUERY -> objectData is SavedQuery
            IntegrationObjectType.SAVED_VISUALIZATION -> objectData is SavedVisualization
            IntegrationObjectType.OPERATIONAL_PANEL -> objectData is OperationalPanel
            IntegrationObjectType.APPLICATION -> objectData is Application
            IntegrationObjectType.TIMESTAMP -> objectData is Timestamp
            IntegrationObjectType.NONE -> true
        }
    }

    /**
=======
>>>>>>> 89dda4a6 (create integration doc)
     * Creates config data from parser for given configType
     * @param objectType the ConfigType
     * @param parser parser for ConfigType
     * @return created BaseObjectData on success. null if configType is not recognized
     *
     */
    fun createObjectData(objectType: IntegrationObjectType, parser: XContentParser): BaseObjectData? {
        return OBJECT_PROPERTIES_MAP[objectType]?.objectDataParser?.parse(parser)
    }
}

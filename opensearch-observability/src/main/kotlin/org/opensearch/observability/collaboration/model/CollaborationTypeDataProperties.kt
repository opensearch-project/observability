/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.collaboration.model

import org.opensearch.common.io.stream.Writeable
import org.opensearch.common.xcontent.XContentParser
import org.opensearch.observability.model.BaseObjectData
import org.opensearch.observability.model.XParser

internal object CollaborationTypeDataProperties {
    /**
     * Properties for ConfigTypes.
     * This data class is used to provide contract across configTypes without reading into config data classes.
     */
    private data class ObjectProperty(
        val objectDataReader: Writeable.Reader<out BaseObjectData>?,
        val objectDataParser: XParser<out BaseObjectData>
    )

    private val OBJECT_PROPERTIES_MAP = mapOf(
        Pair(CollaborationDataType.TEXT, ObjectProperty(Collaboration.TextInfo.reader, Collaboration.TextInfo.xParser)),
        Pair(CollaborationDataType.VIZ, ObjectProperty(Collaboration.VizInfo.reader, Collaboration.VizInfo.xParser))
    )

    /**
     * Get Reader for provided config type
     * @param @ConfigType
     * @return Reader
     */
    fun getReaderForObjectType(objectType: CollaborationDataType): Writeable.Reader<out BaseObjectData> {
        return OBJECT_PROPERTIES_MAP[objectType]?.objectDataReader
            ?: throw IllegalArgumentException("Transport action used with unknown ConfigType:$objectType")
    }

    /**
     * Validate config data is of ConfigType
     */
    fun validateObjectData(objectType: CollaborationDataType, objectData: BaseObjectData?): Boolean {
        return when (objectType) {
            CollaborationDataType.TEXT -> objectData is Collaboration
            CollaborationDataType.VIZ -> objectData is Comment
            CollaborationDataType.NONE -> true
        }
    }

    /**
     * Creates config data from parser for given configType
     * @param objectType the ConfigType
     * @param parser parser for ConfigType
     * @return created BaseObjectData on success. null if configType is not recognized
     *
     */
    fun createObjectData(objectType: CollaborationDataType, parser: XContentParser): BaseObjectData? {
        return OBJECT_PROPERTIES_MAP[objectType]?.objectDataParser?.parse(parser)
    }
}

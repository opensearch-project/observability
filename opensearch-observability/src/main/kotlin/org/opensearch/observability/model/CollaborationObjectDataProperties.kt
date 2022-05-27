/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.model

import org.opensearch.common.io.stream.Writeable
import org.opensearch.common.xcontent.XContentParser

internal object CollaborationObjectDataProperties {
    /**
     * Properties for ConfigTypes.
     * This data class is used to provide contract across configTypes without reading into config data classes.
     */
    private data class ObjectProperty(
        val objectDataReader: Writeable.Reader<out BaseObjectData>?,
        val objectDataParser: XParser<out BaseObjectData>
    )

    private val OBJECT_PROPERTIES_MAP = mapOf(
        Pair(CollaborationObjectType.COLLABORATION, ObjectProperty(Collaboration.reader, Collaboration.xParser)),
        Pair(CollaborationObjectType.COMMENT, ObjectProperty(Comment.reader, Comment.xParser))
    )

    /**
     * Get Reader for provided config type
     * @param @ConfigType
     * @return Reader
     */
    fun getReaderForObjectType(objectType: CollaborationObjectType): Writeable.Reader<out BaseObjectData> {
        return OBJECT_PROPERTIES_MAP[objectType]?.objectDataReader
            ?: throw IllegalArgumentException("Transport action used with unknown ConfigType:$objectType")
    }

    /**
     * Validate config data is of ConfigType
     */
    fun validateObjectData(objectType: CollaborationObjectType, objectData: BaseObjectData?): Boolean {
        return when (objectType) {
            CollaborationObjectType.COLLABORATION -> objectData is Collaboration
            CollaborationObjectType.COMMENT -> objectData is Comment
            CollaborationObjectType.NONE -> true
        }
    }

    /**
     * Creates config data from parser for given configType
     * @param objectType the ConfigType
     * @param parser parser for ConfigType
     * @return created BaseObjectData on success. null if configType is not recognized
     *
     */
    fun createObjectData(objectType: CollaborationObjectType, parser: XContentParser): BaseObjectData? {
        return OBJECT_PROPERTIES_MAP[objectType]?.objectDataParser?.parse(parser)
    }
}

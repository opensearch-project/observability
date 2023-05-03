/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.integrations.model

import org.opensearch.common.io.stream.Writeable
import org.opensearch.core.xcontent.XContentParser
import org.opensearch.observability.model.XParser


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
        Pair(
            IntegrationObjectType.INSTANCE,
            ObjectProperty(IntegrationInstance.reader, IntegrationInstance.xParser)
        ),
        Pair(
            IntegrationObjectType.TEMPLATE,
            ObjectProperty(IntegrationTemplate.reader, IntegrationTemplate.xParser)
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

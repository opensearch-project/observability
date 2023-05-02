/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.integrations.model

import org.opensearch.commons.utils.EnumParser
import org.opensearch.integrations.model.RestTag.INSTANCE_FIELD
import org.opensearch.integrations.model.RestTag.TEMPLATE_FIELD
import org.opensearch.integrations.model.RestTag.TIMESTAMP_FIELD
import java.util.EnumSet

/**
 * Enum for ObservabilityObject type
 */
enum class IntegrationObjectType(val tag: String) {
    NONE("none") {
        override fun toString(): String {
            return tag
        }
    },
    TEMPLATE(TEMPLATE_FIELD) {
        override fun toString(): String {
            return tag
        }
    },
    INSTANCE(INSTANCE_FIELD) {
        override fun toString(): String {
            return tag
        }
    },
    TIMESTAMP(TIMESTAMP_FIELD) {
        override fun toString(): String {
            return tag
        }
    };

    companion object {
        private val tagMap = values().associateBy { it.tag }

        val enumParser = EnumParser { fromTagOrDefault(it) }

        /**
         * Get ConfigType from tag or NONE if not found
         * @param tag the tag
         * @return ConfigType corresponding to tag. NONE if invalid tag.
         */
        fun fromTagOrDefault(tag: String): IntegrationObjectType {
            return tagMap[tag] ?: NONE
        }

        fun getAll(): EnumSet<IntegrationObjectType> {
            val allTypes = EnumSet.allOf(IntegrationObjectType::class.java)
            allTypes.remove(NONE)
            return allTypes
        }
    }
}

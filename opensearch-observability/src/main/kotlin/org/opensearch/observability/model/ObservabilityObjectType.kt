/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.model

import org.opensearch.commons.utils.EnumParser
import org.opensearch.observability.model.RestTag.NOTEBOOK_FIELD
import org.opensearch.observability.model.RestTag.OPERATIONAL_PANEL_FIELD
import org.opensearch.observability.model.RestTag.SAVED_QUERY_FIELD
import org.opensearch.observability.model.RestTag.SAVED_VISUALIZATION_FIELD
import org.opensearch.observability.model.RestTag.TIMESTAMP_FIELD
import java.util.EnumSet

/**
 * Enum for ObservabilityObject type
 */
enum class ObservabilityObjectType(val tag: String) {
    NONE("none") {
        override fun toString(): String {
            return tag
        }
    },
    NOTEBOOK(NOTEBOOK_FIELD) {
        override fun toString(): String {
            return tag
        }
    },
    SAVED_QUERY(SAVED_QUERY_FIELD) {
        override fun toString(): String {
            return tag
        }
    },
    SAVED_VISUALIZATION(SAVED_VISUALIZATION_FIELD) {
        override fun toString(): String {
            return tag
        }
    },
    OPERATIONAL_PANEL(OPERATIONAL_PANEL_FIELD) {
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
        fun fromTagOrDefault(tag: String): ObservabilityObjectType {
            return tagMap[tag] ?: NONE
        }

        fun getAll(): EnumSet<ObservabilityObjectType> {
            val allTypes = EnumSet.allOf(ObservabilityObjectType::class.java)
            allTypes.remove(NONE)
            return allTypes
        }
    }
}

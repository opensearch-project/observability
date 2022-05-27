/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.model

import org.opensearch.commons.utils.EnumParser
import org.opensearch.observability.model.RestTag.COLLAB_TEXT_FIELD
import org.opensearch.observability.model.RestTag.COLLAB_VIZ_FIELD
import java.util.EnumSet

/**
 * Enum for Collaboration data object type
 */
enum class CollaborationDataType(val tag: String) {
    NONE("none") { // TODO: remove if not needed
        override fun toString(): String {
            return tag
        }
    },
    TEXT(COLLAB_TEXT_FIELD) {
        override fun toString(): String {
            return tag
        }
    },
    VIZ(COLLAB_VIZ_FIELD) {
        override fun toString(): String {
            return tag
        }
    };

    companion object { // TODO: remove if not needed
        private val tagMap = CollaborationDataType.values().associateBy { it.tag.lowercase() }

        val enumParser = EnumParser { fromTagOrDefault(it) }

        /**
         * Get ConfigType from tag or NONE if not found
         * @param tag the tag
         * @return ConfigType corresponding to tag. NONE if invalid tag.
         */
        fun fromTagOrDefault(tag: String): CollaborationDataType {
            return tagMap[tag] ?: NONE
        }

        fun getAll(): EnumSet<CollaborationDataType> {
            val allTypes = EnumSet.allOf(CollaborationDataType::class.java)
            allTypes.remove(NONE)
            return allTypes
        }
    }
}

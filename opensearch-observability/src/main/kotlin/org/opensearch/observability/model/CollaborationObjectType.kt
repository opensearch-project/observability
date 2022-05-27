/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.model

import org.opensearch.commons.utils.EnumParser
import org.opensearch.observability.model.RestTag.COLLABORATION_FIELD
import org.opensearch.observability.model.RestTag.COMMENT_FIELD
import java.util.EnumSet

/**
 * Enum for CollaborationObject type
 */
enum class CollaborationObjectType(val tag: String) {
    NONE("none") {
        override fun toString(): String {
            return tag
        }
    },
    COLLABORATION(COLLABORATION_FIELD) {
        override fun toString(): String {
            return tag
        }
    },
    COMMENT(COMMENT_FIELD) {
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
        fun fromTagOrDefault(tag: String): CollaborationObjectType {
            return tagMap[tag] ?: NONE
        }

        fun getAll(): EnumSet<CollaborationObjectType> {
            val allTypes = EnumSet.allOf(CollaborationObjectType::class.java)
            allTypes.remove(NONE)
            return allTypes
        }
    }
}

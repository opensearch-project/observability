/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.collaboration.model

import com.fasterxml.jackson.core.JsonParseException
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.opensearch.commons.utils.recreateObject
import org.opensearch.observability.createObjectFromJsonString
import org.opensearch.observability.getJsonString

internal class CommentTests {
    private val sampleComment = Comment(
        "hnjkchjr565f6cvd",
        "Is this spike related to new 1.4 deployment? josh@ can you check"
    )

    @Test
    fun `Comment serialize and deserialize transport object should be equal`() {
        val recreatedObject = recreateObject(sampleComment) { Comment(it) }
        assertEquals(sampleComment, recreatedObject)
    }

    @Test
    fun `Comment serialize and deserialize using json object should be equal`() {
        val jsonString = getJsonString(sampleComment)
        val recreatedObject = createObjectFromJsonString(jsonString) { Comment.parse(it) }
        assertEquals(sampleComment, recreatedObject)
    }

    @Test
    fun `Comment should deserialize json object using parser`() {
        val jsonString =
            "{\"collaborationId\":\"hnjkchjr565f6cvd\",\"text\":\"Is this spike related to new 1.4 deployment? josh@ can you check\"}"
        val recreatedObject = createObjectFromJsonString(jsonString) { Comment.parse(it) }
        assertEquals(sampleComment, recreatedObject)
    }

    @Test
    fun `Comment should throw exception when invalid json object is passed`() {
        val jsonString = "sample message"
        assertThrows<JsonParseException> {
            createObjectFromJsonString(jsonString) { Comment.parse(it) }
        }
    }

    @Test
    fun `Comment should safely ignore extra field in json object`() {
        val jsonString =
            "{\"collaborationId\":\"hnjkchjr565f6cvd\",\"text\":\"Is this spike related to new 1.4 deployment? josh@ can you check\",\"region\":\"us-east-1\"}"
        val recreatedObject = createObjectFromJsonString(jsonString) { Comment.parse(it) }
        assertEquals(sampleComment, recreatedObject)
    }
}

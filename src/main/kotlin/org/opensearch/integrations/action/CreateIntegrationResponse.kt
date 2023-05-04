/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.integrations.action

import org.opensearch.common.io.stream.StreamInput
import org.opensearch.common.io.stream.StreamOutput
import org.opensearch.core.xcontent.ToXContent
import org.opensearch.core.xcontent.XContentBuilder
import org.opensearch.observability.model.BaseResponse
import org.opensearch.observability.model.RestTag
import java.io.IOException

internal class CreateIntegrationResponse(val objectId: String, val sso: String) : BaseResponse() {
    @Throws(IOException::class)
    constructor(input: StreamInput) : this(
        input.readString(),
        input.readString()
    )

    @Throws(IOException::class)
    override fun writeTo(output: StreamOutput) {
        output.writeString(objectId)
        output.writeString(sso)
    }

    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        builder!!
        return builder.startObject()
            .field(RestTag.OBJECT_ID_FIELD, objectId)
            .field("saved_objects", sso)
            .endObject()
    }
}

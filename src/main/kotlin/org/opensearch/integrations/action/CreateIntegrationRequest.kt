package org.opensearch.integrations.action

import org.opensearch.action.ActionRequest
import org.opensearch.action.ActionRequestValidationException
import org.opensearch.common.io.stream.StreamInput
import org.opensearch.core.xcontent.ToXContent
import org.opensearch.core.xcontent.ToXContentObject
import org.opensearch.core.xcontent.XContentBuilder
import org.opensearch.core.xcontent.XContentParser
import org.opensearch.integrations.model.IntegrationObjectDoc
import java.io.IOException

class CreateIntegrationRequest(val integrationObjectDoc: IntegrationObjectDoc) : ActionRequest(), ToXContentObject {
    companion object {
        @JvmStatic
        fun parse(parser: XContentParser): CreateIntegrationRequest {
            return CreateIntegrationRequest(
                IntegrationObjectDoc.parse(parser)
            )
        }
    }

    @Throws(IOException::class)
    constructor(input: StreamInput) : this(IntegrationObjectDoc(input))

    override fun validate(): ActionRequestValidationException? {
        return null
    }

    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        TODO("Not yet implemented")
    }
}

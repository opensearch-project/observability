package org.opensearch.integrations.model

import org.opensearch.common.io.stream.StreamOutput
import org.opensearch.common.xcontent.XContentFactory
import org.opensearch.core.xcontent.ToXContent
import org.opensearch.core.xcontent.XContentBuilder
import org.opensearch.observability.model.BaseModel

class IntegrationObjectDoc : BaseModel {
    override fun writeTo(out: StreamOutput?) {
        TODO("Not yet implemented")
    }

    /**
     * create XContentBuilder from this object using [XContentFactory.jsonBuilder()]
     * @param params XContent parameters
     * @return created XContentBuilder object
     */
    fun toXContent(params: ToXContent.Params = ToXContent.EMPTY_PARAMS): XContentBuilder {
        return toXContent(XContentFactory.jsonBuilder(), params)
    }

    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        TODO("Not yet implemented")
    }
}

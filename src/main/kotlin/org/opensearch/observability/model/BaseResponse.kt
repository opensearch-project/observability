/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.model

import org.opensearch.action.ActionResponse
import org.opensearch.common.io.stream.StreamInput
import org.opensearch.common.xcontent.XContentFactory
import org.opensearch.core.xcontent.ToXContent
import org.opensearch.core.xcontent.ToXContentObject
import org.opensearch.core.xcontent.XContentBuilder
import org.opensearch.rest.RestStatus
import java.io.IOException

/**
 * Base response which give REST status.
 */
internal abstract class BaseResponse : ActionResponse, ToXContentObject {

    /**
     * constructor for creating the class
     */
    constructor()

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    constructor(input: StreamInput) : super(input)

    /**
     * {@inheritDoc}
     */
    fun toXContent(params: ToXContent.Params = ToXContent.EMPTY_PARAMS): XContentBuilder {
        return toXContent(XContentFactory.jsonBuilder(), params)
    }

    /**
     * get rest status for the response. Useful override for multi-status response.
     * @return RestStatus for the response
     */
    open fun getStatus(): RestStatus {
        return RestStatus.OK
    }
}

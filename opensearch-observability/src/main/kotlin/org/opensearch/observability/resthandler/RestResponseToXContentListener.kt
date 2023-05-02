/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.resthandler

import org.opensearch.core.xcontent.XContentBuilder
import org.opensearch.observability.metrics.Metrics
import org.opensearch.observability.model.BaseResponse
import org.opensearch.rest.BytesRestResponse
import org.opensearch.rest.RestChannel
import org.opensearch.rest.RestResponse
import org.opensearch.rest.RestStatus
import org.opensearch.rest.action.RestToXContentListener

/**
 * Overrides RestToXContentListener REST based action listener that assumes the response is of type
 * {@link ToXContent} and automatically builds an XContent based response
 * (wrapping the toXContent in startObject/endObject).
 */
internal class RestResponseToXContentListener<Response : BaseResponse>(channel: RestChannel) : RestToXContentListener<Response>(channel) {
    /**
     * {@inheritDoc}
     */
    override fun buildResponse(response: Response, builder: XContentBuilder?): RestResponse {
        super.buildResponse(response, builder)

        Metrics.REQUEST_TOTAL.counter.increment()
        Metrics.REQUEST_INTERVAL_COUNT.counter.increment()

        when (response.getStatus()) {
            in RestStatus.OK..RestStatus.MULTI_STATUS -> Metrics.REQUEST_SUCCESS.counter.increment()
            RestStatus.FORBIDDEN -> Metrics.OBSERVABILITY_SECURITY_PERMISSION_ERROR.counter.increment()
            in RestStatus.UNAUTHORIZED..RestStatus.TOO_MANY_REQUESTS -> Metrics.REQUEST_USER_ERROR.counter.increment()
            else -> Metrics.REQUEST_SYSTEM_ERROR.counter.increment()
        }
        return BytesRestResponse(getStatus(response), builder)
    }

    /**
     * {@inheritDoc}
     */
    override fun getStatus(response: Response): RestStatus {
        return response.getStatus()
    }
}

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.resthandler

import org.opensearch.observability.model.BaseResponse
import org.opensearch.rest.RestChannel
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
    override fun getStatus(response: Response): RestStatus {
        return response.getStatus()
    }
}

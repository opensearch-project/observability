/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 *
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

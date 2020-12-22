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

package com.amazon.opendistroforelasticsearch.notebooks.model

import org.elasticsearch.action.ActionResponse
import org.elasticsearch.common.xcontent.ToXContent
import org.elasticsearch.common.xcontent.ToXContentObject
import org.elasticsearch.common.xcontent.XContentBuilder
import org.elasticsearch.common.xcontent.XContentFactory
import org.elasticsearch.rest.RestStatus

/**
 * Base response which give REST status.
 */
internal abstract class BaseResponse : ActionResponse(), ToXContentObject {

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

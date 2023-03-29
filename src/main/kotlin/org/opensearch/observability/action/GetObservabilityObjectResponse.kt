/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.action

import org.opensearch.common.io.stream.StreamInput
import org.opensearch.common.io.stream.StreamOutput
import org.opensearch.common.io.stream.Writeable
import org.opensearch.core.xcontent.ToXContent
import org.opensearch.core.xcontent.XContentBuilder
import org.opensearch.core.xcontent.XContentParser
import org.opensearch.observability.model.BaseResponse
import org.opensearch.observability.model.ObservabilityObjectSearchResult
import org.opensearch.observability.model.RestTag
import java.io.IOException

/**
 * Action Response for getting ObservabilityObject.
 */
internal class GetObservabilityObjectResponse : BaseResponse {
    val searchResult: ObservabilityObjectSearchResult
    private val filterSensitiveInfo: Boolean

    companion object {

        /**
         * reader to create instance of class from writable.
         */
        val reader = Writeable.Reader { GetObservabilityObjectResponse(it) }

        /**
         * Creator used in REST communication.
         * @param parser XContentParser to deserialize data from.
         */
        @JvmStatic
        @Throws(IOException::class)
        fun parse(parser: XContentParser): GetObservabilityObjectResponse {
            return GetObservabilityObjectResponse(ObservabilityObjectSearchResult(parser), false)
        }
    }

    /**
     * constructor for creating the class
     * @param searchResult the ObservabilityObject list
     */
    constructor(searchResult: ObservabilityObjectSearchResult, filterSensitiveInfo: Boolean) {
        this.searchResult = searchResult
        this.filterSensitiveInfo = filterSensitiveInfo
    }

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    constructor(input: StreamInput) : super(input) {
        searchResult = ObservabilityObjectSearchResult(input)
        filterSensitiveInfo = input.readBoolean()
    }

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    override fun writeTo(output: StreamOutput) {
        searchResult.writeTo(output)
        output.writeBoolean(filterSensitiveInfo)
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        val xContentParams = if (filterSensitiveInfo) {
            RestTag.FILTERED_REST_OUTPUT_PARAMS
        } else {
            RestTag.REST_OUTPUT_PARAMS
        }
        return searchResult.toXContent(builder, xContentParams)
    }
}

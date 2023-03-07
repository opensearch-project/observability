/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.action

import org.opensearch.action.ActionRequest
import org.opensearch.action.ActionRequestValidationException
import org.opensearch.action.ValidateActions
import org.opensearch.common.io.stream.StreamInput
import org.opensearch.common.io.stream.StreamOutput
import org.opensearch.common.io.stream.Writeable
import org.opensearch.common.xcontent.XContentParserUtils
import org.opensearch.commons.utils.STRING_READER
import org.opensearch.commons.utils.STRING_WRITER
import org.opensearch.commons.utils.enumReader
import org.opensearch.commons.utils.enumSet
import org.opensearch.commons.utils.fieldIfNotNull
import org.opensearch.commons.utils.logger
import org.opensearch.commons.utils.stringList
import org.opensearch.core.xcontent.ToXContent
import org.opensearch.core.xcontent.ToXContentObject
import org.opensearch.core.xcontent.XContentBuilder
import org.opensearch.core.xcontent.XContentParser
import org.opensearch.observability.model.ObservabilityObjectType
import org.opensearch.observability.model.RestTag.FILTER_PARAM_LIST_FIELD
import org.opensearch.observability.model.RestTag.FROM_INDEX_FIELD
import org.opensearch.observability.model.RestTag.MAX_ITEMS_FIELD
import org.opensearch.observability.model.RestTag.OBJECT_ID_LIST_FIELD
import org.opensearch.observability.model.RestTag.OBJECT_TYPE_FIELD
import org.opensearch.observability.model.RestTag.SORT_FIELD_FIELD
import org.opensearch.observability.model.RestTag.SORT_ORDER_FIELD
import org.opensearch.observability.settings.PluginSettings
import org.opensearch.search.sort.SortOrder
import java.io.IOException
import java.util.EnumSet

/**
 * Action Request for getting ObservabilityObject.
 */
class GetObservabilityObjectRequest : ActionRequest, ToXContentObject {
    val objectIds: Set<String>
    val types: EnumSet<ObservabilityObjectType>
    val fromIndex: Int
    val maxItems: Int
    val sortField: String?
    val sortOrder: SortOrder?
    val filterParams: Map<String, String>

    companion object {
        private val log by logger(GetObservabilityObjectRequest::class.java)

        /**
         * reader to create instance of class from writable.
         */
        val reader = Writeable.Reader { GetObservabilityObjectRequest(it) }

        /**
         * Creator used in REST communication.
         * @param parser XContentParser to deserialize data from.
         */
        @JvmStatic
        @Throws(IOException::class)
        fun parse(parser: XContentParser): GetObservabilityObjectRequest {
            var objectIdList: Set<String> = setOf()
            var types: EnumSet<ObservabilityObjectType> = EnumSet.noneOf(ObservabilityObjectType::class.java)
            var fromIndex = 0
            var maxItems = PluginSettings.defaultItemsQueryCount
            var sortField: String? = null
            var sortOrder: SortOrder? = null
            var filterParams: Map<String, String> = mapOf()

            XContentParserUtils.ensureExpectedToken(
                XContentParser.Token.START_OBJECT,
                parser.currentToken(),
                parser
            )
            while (parser.nextToken() != XContentParser.Token.END_OBJECT) {
                val fieldName = parser.currentName()
                parser.nextToken()
                when (fieldName) {
                    OBJECT_ID_LIST_FIELD -> objectIdList = parser.stringList().toSet()
                    OBJECT_TYPE_FIELD -> types = parser.enumSet(ObservabilityObjectType.enumParser)
                    FROM_INDEX_FIELD -> fromIndex = parser.intValue()
                    MAX_ITEMS_FIELD -> maxItems = parser.intValue()
                    SORT_FIELD_FIELD -> sortField = parser.text()
                    SORT_ORDER_FIELD -> sortOrder = SortOrder.fromString(parser.text())
                    FILTER_PARAM_LIST_FIELD -> filterParams = parser.mapStrings()
                    else -> {
                        parser.skipChildren()
                        log.info("Unexpected field: $fieldName, while parsing GetObservabilityObjectRequest")
                    }
                }
            }
            return GetObservabilityObjectRequest(
                objectIdList,
                types,
                fromIndex,
                maxItems,
                sortField,
                sortOrder,
                filterParams
            )
        }
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        return builder!!.startObject()
            .field(OBJECT_ID_LIST_FIELD, objectIds)
            .field(OBJECT_TYPE_FIELD, types)
            .field(FROM_INDEX_FIELD, fromIndex)
            .field(MAX_ITEMS_FIELD, maxItems)
            .fieldIfNotNull(SORT_FIELD_FIELD, sortField)
            .fieldIfNotNull(SORT_ORDER_FIELD, sortOrder)
            .field(FILTER_PARAM_LIST_FIELD, filterParams)
            .endObject()
    }

    /**
     * constructor for creating the class
     * @param objectIds the ids of the observability objects (other parameters are not relevant if ids are present)
     * @param fromIndex the starting index for paginated response
     * @param maxItems the maximum number of items to return for paginated response
     * @param sortField the sort field if response has many items
     * @param sortOrder the sort order if response has many items
     * @param filterParams the filter parameters
     */
    @Suppress("LongParameterList")
    constructor(
        objectIds: Set<String> = setOf(),
        types: EnumSet<ObservabilityObjectType> = EnumSet.noneOf(ObservabilityObjectType::class.java),
        fromIndex: Int = 0,
        maxItems: Int = PluginSettings.defaultItemsQueryCount,
        sortField: String? = null,
        sortOrder: SortOrder? = null,
        filterParams: Map<String, String> = mapOf()
    ) {
        this.objectIds = objectIds
        this.types = types
        this.fromIndex = fromIndex
        this.maxItems = maxItems
        this.sortField = sortField
        this.sortOrder = sortOrder
        this.filterParams = filterParams
    }

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    constructor(input: StreamInput) : super(input) {
        objectIds = input.readStringList().toSet()
        types = input.readEnumSet(ObservabilityObjectType::class.java)
        fromIndex = input.readInt()
        maxItems = input.readInt()
        sortField = input.readOptionalString()
        sortOrder = input.readOptionalWriteable(enumReader(SortOrder::class.java))
        filterParams = input.readMap(STRING_READER, STRING_READER)
    }

    /**
     * {@inheritDoc}
     */
    @Throws(IOException::class)
    override fun writeTo(output: StreamOutput) {
        super.writeTo(output)
        output.writeStringCollection(objectIds)
        output.writeEnumSet(types)
        output.writeInt(fromIndex)
        output.writeInt(maxItems)
        output.writeOptionalString(sortField)
        output.writeOptionalWriteable(sortOrder)
        output.writeMap(filterParams, STRING_WRITER, STRING_WRITER)
    }

    /**
     * {@inheritDoc}
     */
    override fun validate(): ActionRequestValidationException? {
        var validationException: ActionRequestValidationException? = null
        if (fromIndex < 0) {
            validationException = ValidateActions.addValidationError("fromIndex is -ve", validationException)
        }
        if (maxItems <= 0) {
            validationException = ValidateActions.addValidationError("maxItems is not +ve", validationException)
        }
        return validationException
    }
}

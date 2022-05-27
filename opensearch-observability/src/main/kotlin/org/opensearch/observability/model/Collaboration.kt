/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.model

import org.opensearch.common.io.stream.StreamInput
import org.opensearch.common.io.stream.StreamOutput
import org.opensearch.common.io.stream.Writeable
import org.opensearch.common.xcontent.ToXContent
import org.opensearch.common.xcontent.XContentBuilder
import org.opensearch.common.xcontent.XContentFactory
import org.opensearch.common.xcontent.XContentParser
import org.opensearch.common.xcontent.XContentParserUtils
import org.opensearch.observability.ObservabilityPlugin
import org.opensearch.observability.model.CollaborationTypeDataProperties.getReaderForObjectType
import org.opensearch.observability.util.fieldIfNotNull
import org.opensearch.observability.util.logger
import org.opensearch.observability.util.stringList

internal data class Collaboration(
    val type: CollaborationDataType,
    val tags: List<String>?, // convert to list
    val resolved: Boolean,
    val typeInfo: BaseObjectData?
) : BaseObjectData {

    internal companion object {
        private val log by logger(Collaboration::class.java)
        private const val TYPE_TAG = "type"
        private const val TAGS_TAG = "tags"
        private const val RESOLVED_TAG = "resolved"

        /**
         * reader to create instance of class from writable.
         */
        val reader = Writeable.Reader { Collaboration(it) }

        /**
         * Parser to parse xContent
         */
        val xParser = XParser { parse(it) }

//        /**
//         * Parse the item list from parser
//         * @param parser data referenced at parser
//         * @return created list of items
//         */
//        private fun parseItemList(parser: XContentParser): List<String> {
//            val retList: MutableList<String> = mutableListOf()
//            XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_ARRAY, parser.currentToken(), parser)
//            while (parser.nextToken() != XContentParser.Token.END_ARRAY) {
//                retList.add(parser.text())
//            }
//            return retList
//        }

        /**
         * Parse the data from parser and create Notebook object
         * @param parser data referenced at parser
         * @return created Notebook object
         */
        fun parse(parser: XContentParser): Collaboration {
            var type: CollaborationDataType? = null
            var tags: List<String>? = null
            var resolved = false
            var typeInfo: BaseObjectData? = null

            XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_OBJECT, parser.currentToken(), parser)

            log.info(Thread.dumpStack())

            while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                val fieldName = parser.currentName()
                parser.nextToken()
                when (fieldName) {
                    TAGS_TAG -> tags = parser.stringList()
                    RESOLVED_TAG -> resolved = parser.booleanValue()
                    else -> {
                        val objectTypeForTag = CollaborationDataType.fromTagOrDefault(fieldName)
                        if (objectTypeForTag != CollaborationDataType.NONE && typeInfo == null) {
                            type = objectTypeForTag
                            typeInfo = CollaborationTypeDataProperties.createObjectData(objectTypeForTag, parser)
                        } else {
                            parser.skipChildren()
                            log.info("Unexpected field: $fieldName, while parsing CreateObservabilityObjectRequest")
                        }
                    }
                }
            }
            parser.close()

            log.info("====== Collaboration : start==========")
            log.info("$TYPE_TAG: $type") // TODO: remove debug comments
            log.info("$TAGS_TAG: $tags")
            log.info("$RESOLVED_TAG: $resolved")
            log.info("typeInfo : $typeInfo")
            log.info("====== Collaboration : end ==========")
            type ?: throw IllegalArgumentException("Collaboration type field absent")
            // TODO: check wording, can this be empty? remove if needed
            typeInfo ?: throw IllegalArgumentException("Collaboration type info field absent")

            return Collaboration(type, tags, resolved, typeInfo)
        }
    }

    /**
     * create XContentBuilder from this object using [XContentFactory.jsonBuilder()]
     * @param params XContent parameters
     * @return created XContentBuilder object
     */
    fun toXContent(params: ToXContent.Params = ToXContent.EMPTY_PARAMS): XContentBuilder? {
        return toXContent(XContentFactory.jsonBuilder(), params)
    }

    /**
     * Constructor used in transport action communication.
     * @param input StreamInput stream to deserialize data from.
     */
    constructor(input: StreamInput) : this(
        type = input.readEnum(CollaborationDataType::class.java),
        tags = input.readStringList(), // TODO change to list
        resolved = input.readBoolean(),
        typeInfo = input.readOptionalWriteable(getReaderForObjectType(input.readEnum(CollaborationDataType::class.java)))
    )

    /**
     * {@inheritDoc}
     */
    override fun writeTo(output: StreamOutput) {
        output.writeEnum(type)
        output.writeStringCollection(tags)
        output.writeBoolean(resolved)
        output.writeOptionalWriteable(typeInfo)
        output.writeEnum(type) // type is read twice in constructor
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        builder!!
        builder.startObject()
            .fieldIfNotNull(TYPE_TAG, type)
            .fieldIfNotNull(TAGS_TAG, tags)
            .fieldIfNotNull(RESOLVED_TAG, resolved)
            .field(type.tag.lowercase(), typeInfo)
            .endObject()

        return builder
    }

    /**
     * TextInfo source data class //TODO : better name for TextInfo
     */
    internal data class TextInfo(
        val pageId: String?,
        val paragraphId: String?,
        val lineId: String?
    ) : BaseObjectData {
        internal companion object {
            private const val PAGE_ID_TAG = "pageId"
            private const val PARAGRAPH_ID_TAG = "paragraphId"
            private const val LINE_ID_TAG = "lineId"

            /**
             * reader to create instance of class from writable.
             */
            val reader = Writeable.Reader { TextInfo(it) }

            /**
             * Parser to parse xContent
             */
            val xParser = XParser { parse(it) }

            /**
             * Parse the data from parser and create Source object
             * @param parser data referenced at parser
             * @return created Source object
             */
            fun parse(parser: XContentParser): TextInfo {
                var pageId: String? = null
                var paragraphId: String? = null
                var lineId: String? = null

                XContentParserUtils.ensureExpectedToken(
                    XContentParser.Token.START_OBJECT,
                    parser.currentToken(),
                    parser
                )
                while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                    val fieldName = parser.currentName()
                    parser.nextToken()
                    when (fieldName) {
                        PAGE_ID_TAG -> pageId = parser.text()
                        PARAGRAPH_ID_TAG -> paragraphId = parser.text()
                        LINE_ID_TAG -> lineId = parser.text()
                        else -> log.info("${ObservabilityPlugin.LOG_PREFIX}: Trigger Skipping Unknown field $fieldName")
                    }
                }
                pageId
                    ?: throw IllegalArgumentException("$PAGE_ID_TAG field absent") // TODO: remove if pageId can be empty
                paragraphId
                    ?: throw IllegalArgumentException("$PARAGRAPH_ID_TAG field absent") // TODO: remove if pageId can be empty
                lineId
                    ?: throw IllegalArgumentException("$LINE_ID_TAG field absent") // TODO: remove if pageId can be empty

                return TextInfo(pageId, paragraphId, lineId)
            }
        }

        constructor(streamInput: StreamInput) : this(
            pageId = streamInput.readString(),
            paragraphId = streamInput.readString(),
            lineId = streamInput.readString()
        )

        override fun writeTo(streamOutput: StreamOutput) {
            streamOutput.writeString(pageId)
            streamOutput.writeString(paragraphId)
            streamOutput.writeString(lineId)
        }

        /**
         * {@inheritDoc}
         */
        override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
            builder!!
            builder.startObject()
                .field(PAGE_ID_TAG, pageId)
                .field(PARAGRAPH_ID_TAG, paragraphId)
                .field(LINE_ID_TAG, lineId)
            return builder.endObject()
        }
    }

    /**
     * VizInfo source data class //TODO : better name for TextInfo
     */
    internal data class VizInfo(
        val savedVisualizationId: String?,
        val startTime: Long?,
        val endTime: Long?
    ) : BaseObjectData {
        internal companion object {
            private const val SAVED_VIZ_ID_ID_TAG = "savedVisualizationId"
            private const val START_TIME_TAG = "startTime"
            private const val END_TIME_TAG = "endTime"

            /**
             * reader to create instance of class from writable.
             */
            val reader = Writeable.Reader { VizInfo(it) }

            /**
             * Parser to parse xContent
             */
            val xParser = XParser { parse(it) }

            /**
             * Parse the data from parser and create Source object
             * @param parser data referenced at parser
             * @return created Source object
             */
            fun parse(parser: XContentParser): VizInfo {
                var savedVisualizationId: String? = null
                var startTime: Long? = null
                var endTime: Long? = null

                XContentParserUtils.ensureExpectedToken(
                    XContentParser.Token.START_OBJECT,
                    parser.currentToken(),
                    parser
                )
                while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                    val fieldName = parser.currentName()
                    parser.nextToken()
                    when (fieldName) {
                        SAVED_VIZ_ID_ID_TAG -> savedVisualizationId = parser.text()
                        START_TIME_TAG -> startTime = parser.longValue()
                        END_TIME_TAG -> endTime = parser.longValue()
                        else -> log.info("${ObservabilityPlugin.LOG_PREFIX}: Trigger Skipping Unknown field $fieldName")
                    }
                }

                savedVisualizationId ?: throw IllegalArgumentException("$SAVED_VIZ_ID_ID_TAG field absent")
                startTime ?: throw IllegalArgumentException("$START_TIME_TAG field absent")
                endTime ?: throw IllegalArgumentException("$END_TIME_TAG field absent")

                return VizInfo(savedVisualizationId, startTime, endTime)
            }
        }

        constructor(streamInput: StreamInput) : this(
            savedVisualizationId = streamInput.readString(),
            startTime = streamInput.readLong(),
            endTime = streamInput.readLong()
        )

        override fun writeTo(streamOutput: StreamOutput) {
            streamOutput.writeString(savedVisualizationId)
            streamOutput.writeOptionalLong(startTime) // TODO: writeOptionalLong vs writeLong
            streamOutput.writeOptionalLong(endTime) // TODO: writeOptionalLong vs writeLong
        }

        /**
         * {@inheritDoc}
         */
        override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
            builder!!
            builder.startObject()
                .field(SAVED_VIZ_ID_ID_TAG, savedVisualizationId)
                .field(START_TIME_TAG, startTime)
                .field(END_TIME_TAG, endTime)
            return builder.endObject()
        }
    }
}

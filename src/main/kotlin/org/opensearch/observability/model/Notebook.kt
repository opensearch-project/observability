/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

package org.opensearch.observability.model

import org.opensearch.common.io.stream.StreamInput
import org.opensearch.common.io.stream.StreamOutput
import org.opensearch.common.io.stream.Writeable
import org.opensearch.common.xcontent.XContentFactory
import org.opensearch.common.xcontent.XContentParserUtils
import org.opensearch.core.xcontent.ToXContent
import org.opensearch.core.xcontent.XContentBuilder
import org.opensearch.core.xcontent.XContentParser
import org.opensearch.observability.ObservabilityPlugin.Companion.LOG_PREFIX
import org.opensearch.observability.util.fieldIfNotNull
import org.opensearch.observability.util.logger

/**
 * Notebook main data class.
 *  * <pre> JSON format
 * {@code
 * {
 *   "dateCreated" : "2020-12-11T20:51:15.509Z",
 *   "name" : "test",
 *   "dateModified" : "2020-12-11T21:04:55.336Z",
 *   "backend" : "Default",
 *   "paragraphs" : [
 *     {
 *       "output" : [
 *         {
 *           "result" : "# This is a markdown paragraph",
 *           "outputType" : "MARKDOWN",
 *           "execution_time" : "0s"
 *         }
 *       ],
 *       "input" : {
 *         "inputText" : "# This is a markdown paragraph",
 *         "inputType" : "MARKDOWN"
 *       },
 *       "dateCreated" : "2020-12-11T21:04:39.997Z",
 *       "dateModified" : "2020-12-11T21:04:48.207Z",
 *       "id" : "paragraph_61e96a10-af19-4c7d-ae4e-d2e449c65dff"
 *     }
 *   ]
 * }
 * }</pre>
 */

internal data class Notebook(
    val name: String?,
    val dateCreated: String?,
    val dateModified: String?,
    val backend: String?,
    val paragraphs: List<Paragraph>?
) : BaseObjectData {

    internal companion object {
        private val log by logger(Notebook::class.java)
        private const val NAME_TAG = "name"
        private const val DATE_CREATED_TAG = "dateCreated"
        private const val DATE_MODIFIED_TAG = "dateModified"
        private const val BACKEND_TAG = "backend"
        private const val PARAGRAPHS_TAG = "paragraphs"

        /**
         * reader to create instance of class from writable.
         */
        val reader = Writeable.Reader { Notebook(it) }

        /**
         * Parser to parse xContent
         */
        val xParser = XParser { parse(it) }

        /**
         * Parse the item list from parser
         * @param parser data referenced at parser
         * @return created list of items
         */
        private fun parseItemList(parser: XContentParser): List<Paragraph> {
            val retList: MutableList<Paragraph> = mutableListOf()
            XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_ARRAY, parser.currentToken(), parser)
            while (parser.nextToken() != XContentParser.Token.END_ARRAY) {
                retList.add(Paragraph.parse(parser))
            }
            return retList
        }

        /**
         * Parse the data from parser and create Notebook object
         * @param parser data referenced at parser
         * @return created Notebook object
         */
        fun parse(parser: XContentParser): Notebook {
            var name: String? = null
            var dateCreated: String? = null
            var dateModified: String? = null
            var backend: String? = null
            var paragraphs: List<Paragraph>? = null
            XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_OBJECT, parser.currentToken(), parser)
            while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                val fieldName = parser.currentName()
                parser.nextToken()
                when (fieldName) {
                    NAME_TAG -> name = parser.text()
                    DATE_CREATED_TAG -> dateCreated = parser.text()
                    DATE_MODIFIED_TAG -> dateModified = parser.text()
                    BACKEND_TAG -> backend = parser.text()
                    PARAGRAPHS_TAG -> paragraphs = parseItemList(parser)
                    else -> {
                        parser.skipChildren()
                        log.info("$LOG_PREFIX:Notebook Skipping Unknown field $fieldName")
                    }
                }
            }
            return Notebook(name, dateCreated, dateModified, backend, paragraphs)
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
        name = input.readString(),
        dateCreated = input.readString(),
        dateModified = input.readString(),
        backend = input.readString(),
        paragraphs = input.readList(Paragraph.reader)
    )

    /**
     * {@inheritDoc}
     */
    override fun writeTo(output: StreamOutput) {
        output.writeString(name)
        output.writeString(dateCreated)
        output.writeString(dateModified)
        output.writeString(backend)
        output.writeCollection(paragraphs)
    }

    /**
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        val xContentParams = params ?: RestTag.REST_OUTPUT_PARAMS
        builder!!
        builder.startObject()
            .fieldIfNotNull(NAME_TAG, name)
            .fieldIfNotNull(DATE_CREATED_TAG, dateCreated)
            .fieldIfNotNull(DATE_MODIFIED_TAG, dateModified)
            .fieldIfNotNull(BACKEND_TAG, backend)
        if (paragraphs != null) {
            builder.startArray(PARAGRAPHS_TAG)
            paragraphs.forEach { it.toXContent(builder, xContentParams) }
            builder.endArray()
        }
        return builder.endObject()
    }

    /**
     * Notebook source data class
     */
    internal data class Paragraph(
        val output: List<Output>,
        val input: Input?,
        val dateCreated: String,
        val dateModified: String,
        val id: String
    ) : BaseModel {
        internal companion object {
            private const val OUTPUT_TAG = "output"
            private const val INPUT_TAG = "input"
            private const val DATE_CREATED_TAG = "dateCreated"
            private const val DATE_MODIFIED_TAG = "dateModified"
            private const val ID_TAG = "id"

            /**
             * reader to create instance of class from writable.
             */
            val reader = Writeable.Reader { Paragraph(it) }

            /**
             * Parser to parse xContent
             */
            val xParser = XParser { parse(it) }

            /**
             * Parse the item list from parser
             * @param parser data referenced at parser
             * @return created list of items
             */
            private fun parseItemList(parser: XContentParser): List<Output> {
                val retList: MutableList<Output> = mutableListOf()
                XContentParserUtils.ensureExpectedToken(XContentParser.Token.START_ARRAY, parser.currentToken(), parser)
                while (parser.nextToken() != XContentParser.Token.END_ARRAY) {
                    retList.add(Output.parse(parser))
                }
                return retList
            }

            /**
             * Parse the data from parser and create Source object
             * @param parser data referenced at parser
             * @return created Source object
             */
            fun parse(parser: XContentParser): Paragraph {
                var output: List<Output>? = null
                var input: Input? = null
                var dateCreated: String? = null
                var dateModified: String? = null
                var id: String? = null
                XContentParserUtils.ensureExpectedToken(
                    XContentParser.Token.START_OBJECT,
                    parser.currentToken(),
                    parser
                )
                while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                    val fieldName = parser.currentName()
                    parser.nextToken()
                    when (fieldName) {
                        OUTPUT_TAG -> output = parseItemList(parser)
                        INPUT_TAG -> input = Input.parse(parser)
                        DATE_CREATED_TAG -> dateCreated = parser.text()
                        DATE_MODIFIED_TAG -> dateModified = parser.text()
                        ID_TAG -> id = parser.text()
                        else -> {
                            parser.skipChildren()
                            log.info("$LOG_PREFIX:Source Skipping Unknown field $fieldName")
                        }
                    }
                }
                output ?: throw IllegalArgumentException("$OUTPUT_TAG field absent")
                input ?: throw IllegalArgumentException("$INPUT_TAG field absent")
                dateCreated ?: throw IllegalArgumentException("$DATE_CREATED_TAG field absent")
                dateModified ?: throw IllegalArgumentException("$DATE_MODIFIED_TAG field absent")
                id ?: throw IllegalArgumentException("$ID_TAG field absent")
                return Paragraph(output, input, dateCreated, dateModified, id)
            }
        }

        constructor(streamInput: StreamInput) : this(
            output = streamInput.readList(Output.reader),
            input = streamInput.readOptionalWriteable(Input.reader),
            dateCreated = streamInput.readString(),
            dateModified = streamInput.readString(),
            id = streamInput.readString()
        )

        override fun writeTo(streamOutput: StreamOutput) {
            streamOutput.writeCollection(output)
            streamOutput.writeOptionalWriteable(input)
            streamOutput.writeString(dateCreated)
            streamOutput.writeString(dateModified)
            streamOutput.writeString(id)
        }

        /**
         * {@inheritDoc}
         */
        override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
            val xContentParams = params ?: RestTag.REST_OUTPUT_PARAMS
            builder!!
            builder.startObject()
                .startArray(OUTPUT_TAG)
            output.forEach { it.toXContent(builder, xContentParams) }
            builder.endArray()
                .field(INPUT_TAG, input)
                .field(DATE_CREATED_TAG, dateCreated)
                .field(DATE_MODIFIED_TAG, dateModified)
                .field(ID_TAG, id)
            return builder.endObject()
        }
    }

    /**
     * Notebook output data class
     */
    internal data class Output(
        val result: String?,
        val outputType: String?,
        val executionTime: String?
    ) : BaseModel {
        internal companion object {
            private const val RESULT_TAG = "result"
            private const val OUTPUT_TYPE_TAG = "outputType"
            private const val EXECUTION_TIME_TAG = "execution_time"

            /**
             * reader to create instance of class from writable.
             */
            val reader = Writeable.Reader { Output(it) }

            /**
             * Parser to parse xContent
             */
            val xParser = XParser { parse(it) }

            /**
             * Parse the data from parser and create Format object
             * @param parser data referenced at parser
             * @return created Format object
             */
            fun parse(parser: XContentParser): Output {
                var result: String? = null
                var outputType: String? = null
                var executionTime: String? = null
                XContentParserUtils.ensureExpectedToken(
                    XContentParser.Token.START_OBJECT,
                    parser.currentToken(),
                    parser
                )
                while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                    val fieldName = parser.currentName()
                    parser.nextToken()
                    when (fieldName) {
                        RESULT_TAG -> result = parser.text()
                        OUTPUT_TYPE_TAG -> outputType = parser.text()
                        EXECUTION_TIME_TAG -> executionTime = parser.text()
                        else -> {
                            parser.skipChildren()
                            log.info("$LOG_PREFIX:Format Skipping Unknown field $fieldName")
                        }
                    }
                }
                result ?: throw IllegalArgumentException("$RESULT_TAG field absent")
                outputType ?: throw IllegalArgumentException("$OUTPUT_TYPE_TAG field absent")
                executionTime ?: throw IllegalArgumentException("$EXECUTION_TIME_TAG field absent")
                return Output(result, outputType, executionTime)
            }
        }

        constructor(input: StreamInput) : this(
            result = input.readString(),
            outputType = input.readString(),
            executionTime = input.readString()
        )

        override fun writeTo(output: StreamOutput) {
            output.writeString(result)
            output.writeString(outputType)
            output.writeString(executionTime)
        }

        /**
         * {@inheritDoc}
         */
        override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
            builder!!
            builder.startObject()
                .field(RESULT_TAG, result)
                .field(OUTPUT_TYPE_TAG, outputType)
                .field(EXECUTION_TIME_TAG, executionTime)
            builder.endObject()
            return builder
        }
    }

    /**
     * Notebook input data class
     */
    internal data class Input(
        val inputText: String?,
        val inputType: String?
    ) : BaseModel {
        internal companion object {
            private const val INPUT_TEXT_TAG = "inputText"
            private const val INPUT_TYPE_TAG = "inputType"

            /**
             * reader to create instance of class from writable.
             */
            val reader = Writeable.Reader { Input(it) }

            /**
             * Parser to parse xContent
             */
            val xParser = XParser { parse(it) }

            /**
             * Parse the data from parser and create Trigger object
             * @param parser data referenced at parser
             * @return created Trigger object
             */
            fun parse(parser: XContentParser): Input {
                var inputText: String? = null
                var inputType: String? = null
                XContentParserUtils.ensureExpectedToken(
                    XContentParser.Token.START_OBJECT,
                    parser.currentToken(),
                    parser
                )
                while (XContentParser.Token.END_OBJECT != parser.nextToken()) {
                    val fieldName = parser.currentName()
                    parser.nextToken()
                    when (fieldName) {
                        INPUT_TEXT_TAG -> inputText = parser.text()
                        INPUT_TYPE_TAG -> inputType = parser.text()
                        else -> log.info("$LOG_PREFIX: Trigger Skipping Unknown field $fieldName")
                    }
                }
                inputText ?: throw IllegalArgumentException("$INPUT_TEXT_TAG field absent")
                inputType ?: throw IllegalArgumentException("$INPUT_TYPE_TAG field absent")
                return Input(inputText, inputType)
            }
        }

        constructor(input: StreamInput) : this(
            inputText = input.readString(),
            inputType = input.readString()
        )

        override fun writeTo(output: StreamOutput) {
            output.writeString(inputText)
            output.writeString(inputType)
        }

        /**
         * {@inheritDoc}
         */
        override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
            builder!!
            builder.startObject()
                .field(INPUT_TEXT_TAG, inputText)
                .field(INPUT_TYPE_TAG, inputType)
            builder.endObject()
            return builder
        }
    }
}

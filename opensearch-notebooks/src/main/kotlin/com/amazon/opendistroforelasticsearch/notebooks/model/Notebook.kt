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

package com.amazon.opendistroforelasticsearch.notebooks.model

import com.amazon.opendistroforelasticsearch.notebooks.NotebooksPlugin.Companion.LOG_PREFIX
import com.amazon.opendistroforelasticsearch.notebooks.util.logger
import org.opensearch.common.xcontent.ToXContent
import org.opensearch.common.xcontent.ToXContentObject
import org.opensearch.common.xcontent.XContentBuilder
import org.opensearch.common.xcontent.XContentFactory
import org.opensearch.common.xcontent.XContentParser
import org.opensearch.common.xcontent.XContentParserUtils

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
) : ToXContentObject {

    internal companion object {
        private val log by logger(Notebook::class.java)
        private const val NAME_TAG = "name"
        private const val DATE_CREATED_TAG = "dateCreated"
        private const val DATE_MODIFIED_TAG = "dateModified"
        private const val BACKEND_TAG = "backend"
        private const val PARAGRAPHS_TAG = "paragraphs"

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
            return Notebook(
                name,
                dateCreated,
                dateModified,
                backend,
                paragraphs
            )
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
     * {@inheritDoc}
     */
    override fun toXContent(builder: XContentBuilder?, params: ToXContent.Params?): XContentBuilder {
        val xContentParams = params ?: RestTag.REST_OUTPUT_PARAMS
        builder!!
        builder.startObject()
        if (name != null) {
            builder.field(NAME_TAG, name)
        }
        if (dateCreated != null) {
            builder.field(DATE_CREATED_TAG, dateCreated)
        }
        if (dateModified != null) {
            builder.field(DATE_MODIFIED_TAG, dateModified)
        }
        if (backend != null) {
            builder.field(BACKEND_TAG, backend)
        }
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
        val input: Input,
        val dateCreated: String,
        val dateModified: String,
        val id: String
    ) : ToXContentObject {
        internal companion object {
            private const val OUTPUT_TAG = "output"
            private const val INPUT_TAG = "input"
            private const val DATE_CREATED_TAG = "dateCreated"
            private const val DATE_MODIFIED_TAG = "dateModified"
            private const val ID_TAG = "id"

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
                return Paragraph(
                    output,
                    input,
                    dateCreated,
                    dateModified,
                    id
                )
            }
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
    ) : ToXContentObject {
        internal companion object {
            private const val RESULT_TAG = "result"
            private const val OUTPUT_TYPE_TAG = "outputType"
            private const val EXECUTION_TIME_TAG = "execution_time"

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
                return Output(
                    result,
                    outputType,
                    executionTime
                )
            }
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
    ) : ToXContentObject {
        internal companion object {
            private const val INPUT_TEXT_TAG = "inputText"
            private const val INPUT_TYPE_TAG = "inputType"

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

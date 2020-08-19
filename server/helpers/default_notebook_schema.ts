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
 */

// Default Backend Notebook Schema

export type DefaultInput = {
  inputType: string;
  inputText: string;
};

export type DefaultOutput = {
  outputType: string;
  result: string;
  execution_time: string;
};
export type DefaultParagraph = {
  id: string;
  dateCreated: string;
  dateModified: string;
  input: DefaultInput;
  output: Array<DefaultOutput>;
};
export type DefaultNotebooks = {
  name: string;
  id: string;
  dateCreated: string;
  dateModified: string;
  pluginVersion: string;
  backend: string;
  paragraphs: Array<DefaultParagraph>;
};

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

export type DefaultInput = {
  input_type: string;
  input_text: string;
};

export type DefaultOutput = {
  output_type: string;
  result: string;
  execution_time: string;
};
export type DefaultParagraph = {
  id: string;
  date_created: string;
  date_modified: string;
  input: DefaultInput;
  output: Array<DefaultOutput>;
};
export type DefaultNotebooks = {
  name: string;
  id: string;
  date_created: string;
  date_modified: string;
  plugin_version: string;
  backend: string;
  paragraphs: Array<DefaultParagraph>;
};

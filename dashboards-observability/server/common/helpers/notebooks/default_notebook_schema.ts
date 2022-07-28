/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
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
  dateCreated: string;
  dateModified: string;
  backend: string;
  paragraphs: Array<DefaultParagraph>;
};

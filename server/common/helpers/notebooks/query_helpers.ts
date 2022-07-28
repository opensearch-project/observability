/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import QueryService from "../../../services/queryService";

export const inputIsQuery = (inputText: string) => {
  return (inputIsSQL(inputText) || inputIsPPL(inputText));
}

export const inputIsSQL = (inputText: string) => {
  return inputText.substring(0, 4) === '%sql';
}

export const inputIsPPL = (inputText: string) => {
  return inputText.substring(0, 4) === '%ppl';
}

export const getQueryOutput = async (inputText: string, queryService: QueryService) => {
  let output = {};
  if (inputIsSQL(inputText)) {
    output = await queryService.describeSQLQuery(inputText);
  }
  else if (inputIsPPL(inputText)) {
    output = await queryService.describePPLQuery(inputText);
  }
  return output;
}

export const formatNotRecognized = (inputText: string) => {
  return (inputText.substring(0, 4) != '%sql' &&
          inputText.substring(0, 4) != '%ppl' &&
          inputText.substring(0, 3) != '%md')
}
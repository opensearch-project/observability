/*
 * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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

import QueryService from "../services/queryService";

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
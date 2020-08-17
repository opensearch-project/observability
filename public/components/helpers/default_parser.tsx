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

// Placeholder for default parser

export type ParaType = {
  uniqueId: string;
  isRunning: boolean;
  inQueue: boolean;
  ishovered: boolean;
  isSelected: boolean;
  isInputHidden: boolean;
  isOutputHidden: boolean;
  showAddPara: boolean;
  isVizualisation: boolean;
  vizObjectInput: string;
  id: number;
  inp: string;
  lang: string;
  editLang: string;
  typeOut: Array<string>;
  out: string;
};

export const defaultParagraphParser = (paragraphs: any) => {
  let parsedPara: Array<ParaType> = [];
  paragraphs.map((paraObject: ParaType, index: number) => {
    let tempPara;
    parsedPara.push(tempPara);
  });
  return parsedPara;
};

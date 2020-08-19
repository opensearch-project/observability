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

import { ParaType } from '../../../common';

// Get the type of output message from a Zeppelin paragraph
// Param: Zeppelin Paragraph
const parseOutput = (para: any) => {
  try {
    let outputType = [];
    let result = [];
    para.output.map((output: { outputType: string; result: string }) => {
      outputType.push(output.outputType);
      result.push(output.result);
    });
    return {
      outputType: outputType,
      outputData: result,
    };
  } catch (error) {
    return {
      outputType: [],
      outputData: [],
    };
  }
};

// Get the coding language from a Zeppelin paragraph input
// Param: textHeader-> header on a Zeppelin paragraph example "%md"
const parseInputType = (paraObject: any) => {
  if (paraObject.input.inputType === 'MARKDOWN') {
    return 'md';
  } else {
    return '';
  }
};

const parseVisualization = (para: any) => {
  let vizContent = '';
  if (para.input.inputType === 'VISUALIZATION') {
    vizContent = para.input.inputText;
    return {
      isViz: true,
      VizObject: vizContent,
    };
  } else {
    return {
      isViz: false,
      VizObject: '',
    };
  }
};

// Placeholder for default parser
export const defaultParagraphParser = (paragraphs: any) => {
  let parsedPara: Array<ParaType> = [];
  paragraphs.map((paraObject: any, index: number) => {
    const vizParams = parseVisualization(paraObject);
    const codeLanguage = parseInputType(paraObject);
    const message = parseOutput(paraObject);

    let tempPara = {
      uniqueId: paraObject.id,
      isRunning: false,
      inQueue: false,
      ishovered: false,
      isSelected: false,
      isInputHidden: false,
      isOutputHidden: false,
      showAddPara: false,
      isVizualisation: vizParams.isViz,
      vizObjectInput: vizParams.VizObject,
      id: index + 1,
      inp: paraObject.input.inputText,
      lang: 'text/x-' + codeLanguage,
      editorLanguage: codeLanguage,
      typeOut: message.outputType,
      out: message.outputData,
    };
    parsedPara.push(tempPara);
  });
  return parsedPara;
};

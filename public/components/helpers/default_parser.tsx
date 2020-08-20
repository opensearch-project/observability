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

// Get the type of output and result in a default notebook paragraph
// Param: Default Backend Paragraph
const parseOutput = (paraObject: any) => {
  try {
    let outputType = [];
    let result = [];
    paraObject.output.map((output: { outputType: string; result: string }) => {
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

// Get the coding language by type of paragraph
// Param: Default Backend Paragraph
const parseInputType = (paraObject: any) => {
  try {
    if (paraObject.input.inputType === 'MARKDOWN') {
      return 'md';
    } else {
      return '';
    }
  } catch (error) {
    throw new Error('Parsing Input Issue ' + error);
  }
};

// Get the visualization by type of paragraph
// Param: Default Backend Paragraph
const parseVisualization = (paraObject: any) => {
  try {
    let vizContent = '';
    if (paraObject.input.inputType === 'VISUALIZATION') {
      vizContent = paraObject.input.inputText;
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
  } catch (error) {
    throw new Error('Parsing Input Issue ' + error);
  }
};

// Placeholder for default parser
// Param: Default Backend Paragraph
export const defaultParagraphParser = (defaultBackendParagraphs: any) => {
  let parsedPara: Array<ParaType> = [];
  try {
    defaultBackendParagraphs.map((paraObject: any, index: number) => {
      const codeLanguage = parseInputType(paraObject);
      const vizParams = parseVisualization(paraObject);
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
        inp: paraObject.input.inputText || '',
        lang: 'text/x-' + codeLanguage,
        editorLanguage: codeLanguage,
        typeOut: message.outputType,
        out: message.outputData,
      };
      parsedPara.push(tempPara);
    });
    return parsedPara;
  } catch (error) {
    throw new Error('Parsing Paragraph Issue ' + error);
  }
};

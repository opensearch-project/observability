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

/* This file contains parsing functions
 * These functions have to be changed based on backend configuration
 * If backend changes the incoming paragraph structures may change, so parsing adapts to it
 */

import { ParaType } from '../../../common';

const visualizationPrefix = '%sh #vizobject:';

const langSupport = {
  '%sh': 'shell',
  '%md': 'md',
  '%python': 'python',
  '%odfesql': 'sql',
  '%elasticsearch': 'json',
};

// Get the coding language from a Zeppelin paragraph input
// Param: textHeader-> header on a Zeppelin paragraph example "%md"
const parseCodeLanguage = (textHeader: string) => {
  const codeLanguage = langSupport[textHeader];
  return codeLanguage || '';
};

// Get the type of output message from a Zeppelin paragraph
// Param: Zeppelin Paragraph
const parseMessage = (paraObject: any) => {
  try {
    let mtype = [];
    let mdata = [];
    paraObject.results.msg.map((msg: { type: string; data: string }) => {
      mtype.push(msg.type);
      mdata.push(msg.data);
    });
    return {
      outputType: mtype,
      outputData: mdata,
    };
  } catch (error) {
    return {
      outputType: [],
      outputData: [],
    };
  }
};

// Get the type of output message from a Zeppelin paragraph
// Param: Zeppelin Paragraph
const parseText = (paraObject: any) => {
  if ('text' in paraObject) {
    return paraObject.text;
  } else {
    throw new Error('Input text parse issue');
  }
};

// Get the visualization from a Zeppelin Paragraph input
// All Visualizations in Zeppelin are stored as shell comment -> "%sh #vizobject:"
// TODO: This is a workaround need to look for better solutions
// Param: Zeppelin Paragraph
const parseVisualization = (paraObject: any) => {
  let vizContent = '';
  if ('text' in paraObject && paraObject.text.substring(0, 15) === visualizationPrefix) {
    if (paraObject.title !== 'VISUALIZATION') {
      throw new Error('Visualization parse issue');
    }
    vizContent = paraObject.text.substring(15);
    return {
      isViz: true,
      VizObject: vizContent,
    };
  } else {
    return {
      isViz: false,
      VizObject: vizContent,
    };
  }
};

// This parser is used to get paragraph id
// Param: Zeppelin Paragraph
const parseId = (paraObject: any) => {
  if ('id' in paraObject) {
    return paraObject.id;
  } else {
    throw new Error('Id not found in paragraph');
  }
};

// This parser helps to convert Zeppelin paragraphs to a common ParaType format
// This parsing makes any backend notebook compatible with notebooks plugin
export const zeppelinParagraphParser = (zeppelinBackendParagraphs: any) => {
  let parsedPara: Array<ParaType> = [];
  try {
    zeppelinBackendParagraphs.map((paraObject: ParaType, index: number) => {
      const paragraphId = parseId(paraObject);
      const vizParams = parseVisualization(paraObject);
      const inputParam = parseText(paraObject);
      const codeLanguage = parseCodeLanguage(inputParam.split('\n')[0].split('.')[0]);
      const message = parseMessage(paraObject);

      let tempPara = {
        uniqueId: paragraphId,
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
        inp: inputParam,
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

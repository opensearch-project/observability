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
  const tempLang = langSupport[textHeader];
  if (tempLang !== undefined) {
    return tempLang;
  } else {
    return '';
  }
};

// Get the type of output message from a Zeppelin paragraph
// Param: Zeppelin Paragraph
const parseMessage = (para: any) => {
  try {
    let mtype = [];
    let mdata = [];
    para.results.msg.map((msg: { type: string; data: string }) => {
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
const parseText = (para: any) => {
  if ('text' in para) {
    return para.text;
  } else {
    return '';
  }
};

// Get the visualization from a Zeppelin Paragraph input
// All Visualizations in Zeppelin are stored as shell comment -> "%sh #vizobject:"
// TODO: This is a workaround need to look for better solutions
// Param: Zeppelin Paragraph
const parseVisualization = (para: any) => {
  let vizContent = '';
  if ('text' in para && para.text.substring(0, 15) === visualizationPrefix) {
    vizContent = para.text.substring(15);
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

// This parser helps to convert Zeppelin paragraphs to a common ParaType format
// This parsing makes any backend notebook compatible with notebooks plugin
export const zeppelinParagraphParser = (paragraphs: any) => {
  let parsedPara: Array<ParaType> = [];
  paragraphs.map((paraObject: ParaType, index: number) => {
    const vizParams = parseVisualization(paraObject);
    const inputParam = parseText(paraObject);
    const codeLanguage = parseCodeLanguage(inputParam.split('\n')[0].split('.')[0]);
    const message = parseMessage(paraObject);

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
      inp: inputParam,
      lang: 'text/x-' + codeLanguage,
      editorLanguage: codeLanguage,
      typeOut: message.outputType,
      out: message.outputData,
    };
    parsedPara.push(tempPara);
  });
  return parsedPara;
};

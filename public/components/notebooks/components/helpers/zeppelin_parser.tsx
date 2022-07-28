/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/* This file contains parsing functions
 * These functions have to be changed based on backend configuration
 * If backend changes the incoming paragraph structures may change, so parsing adapts to it
 */

import { ParaType } from '../../../common';

const visualizationPrefix = '%sh #vizobject:';
const observabilityVisualizationPrefix = '%sh #observabilityviz:';

const langSupport = {
  '%sh': 'shell',
  '%md': 'md',
  '%python': 'python',
  '%opensearchsql': 'sql',
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
  if (
    paraObject.hasOwnProperty('text') &&
    paraObject.text.substring(0, 15) === visualizationPrefix
  ) {
    if (paraObject.title !== 'VISUALIZATION') {
      throw new Error('Visualization parse issue');
    }
    vizContent = paraObject.text.substring(15);
    return {
      isViz: true,
      VizObject: vizContent,
    };
  }

  if (
    paraObject.hasOwnProperty('text') &&
    paraObject.text.substring(0, 22) === observabilityVisualizationPrefix
  ) {
    if (paraObject.title !== 'OBSERVABILITY_VISUALIZATION') {
      throw new Error('Visualization parse issue');
    }
    vizContent = paraObject.text.substring(22);
    return {
      isViz: true,
      VizObject: vizContent,
    };
  }

  return {
    isViz: false,
    VizObject: vizContent,
  };
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

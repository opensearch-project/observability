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

import { StringNullableChain } from 'lodash';

/* This file contains parsing functions
 * These functions have to be changed based on backend configuration
 * If backend changes the incoming paragraph structures may change, so parsing adapts to it
 * TODO: Add backend change support
 */

const langSupport = {
  '%sh': 'shell',
  '%md': 'md',
  '%python': 'python',
  '%odfesql': 'sql',
  '%elastic': 'json',
};

const parseLang = (textHeader: string) => {
  const tempLang = langSupport[textHeader];
  if (tempLang !== undefined) {
    return tempLang;
  } else {
    console.log('Lang not supported', textHeader);
    return '';
  }
};

const parseMsg = (para: any) => {
  try {
    let mtype = [];
    let mdata = [];
    para.results.msg.map((msg: { type: string; data: string }) => {
      mtype.push(msg.type);
      mdata.push(msg.data);
    });
    return [mtype, mdata];
  } catch (error) {
    return [[''], ['']];
  }
};

const parseTxt = (para: any) => {
  if ('text' in para) {
    return para.text;
  } else {
    return '';
  }
};

const parseViz = (para: any) => {
  let vizContent = '';
  if ('text' in para && para.text.substring(0, 5) === '%sh #') {
    vizContent = para.text.substring(5);
    return [true, vizContent];
  } else {
    return [false, vizContent];
  }
};

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

export const zeppelin_para_parser = (paragraphs: any) => {
  let parsedPara: Array<ParaType> = [];
  paragraphs.map((paraObject: ParaType, index: number) => {
    let tempPara = {
      uniqueId: paraObject.id,
      isRunning: false,
      inQueue: false,
      ishovered: false,
      isSelected: false,
      isInputHidden: false,
      isOutputHidden: false,
      showAddPara: false,
      isVizualisation: parseViz(paraObject)[0],
      vizObjectInput: parseViz(paraObject)[1],
      id: index + 1,
      inp: parseTxt(paraObject),
      lang: 'text/x-' + parseLang(parseTxt(paraObject).split('\n')[0].split('.')[0]),
      editLang: parseLang(parseTxt(paraObject).split('\n')[0].split('.')[0]),
      typeOut: parseMsg(paraObject)[0],
      out: parseMsg(paraObject)[1],
    };
    parsedPara.push(tempPara);
  });
  return parsedPara;
};

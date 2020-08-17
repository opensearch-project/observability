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

import React from 'react';
import { Input, Prompt, Source } from '@nteract/presentational-components';
import { ParaType } from '../helpers/zeppelin_parser';

/*
 * "ParaInput" component is used by nbcell to populate paragraph inputs for an open notebook.
 *
 * Props taken in as params are:
 * para - parsed paragraph from nbcell
 * index - index of paragraph in the notebook
 * textValueEditor - function for handling input in textarea
 * handleKeyPress - function for handling key press like "Shift-key+Enter" to run paragraph
 *
 * Input component of nteract used as a container for notebook UI.
 * https://components.nteract.io/#input
 */
export const ParaInput = (props: {
  para: ParaType;
  index: number;
  textValueEditor: (evt: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void;
  handleKeyPress: (evt: React.KeyboardEvent<Element>, para: any, index: number) => void;
}) => {
  const { para, index, textValueEditor, handleKeyPress } = props;

  return (
    <Input hidden={para.isInputHidden}>
      <Prompt counter={para.id} running={para.isRunning} queued={para.inQueue} />
      {/* If the para is selected show the editor else display the code in the paragraph */}
      <Source language={para.lang}>
        {para.isSelected ? (
          <textarea
            className="editorArea"
            onChange={(evt) => textValueEditor(evt, index)}
            onKeyPress={(evt) => handleKeyPress(evt, para, index)}
            value={para.inp}
            autoFocus
          />
        ) : (
          para.inp
        )}
      </Source>
    </Input>
  );
};

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
import {
  EuiPageContentHeaderSection,
  EuiButtonToggle,
  EuiButtonEmpty,
  EuiToolTip,
} from '@elastic/eui';

/*
 * "ParaButtons" component is used to populate paragraphs related buttons on right top of the plugin content page.
 *
 * Props taken in as params are:
 * toggleInput - boolean to toggle input of all paragraphs in the notebook
 * toggleOutput - boolean to toggle output of all paragraphs in the notebook
 * hideInputs - function to hide output of all paragraphs in the notebook
 * hideOutputs - function to hide output of all paragraphs in the notebook
 * deletePara - function to delete the selected para
 * runPara - function to run the selected para
 * clonePara - function to clone the selected para
 * clearPara - function to clear output of all the paras
 * savePara - function to save code of the selected para
 */
type ParaButtonsProps = {
  toggleInput: boolean;
  toggleOutput: boolean;
  hideInputs: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  hideOutputs: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  deletePara: () => void;
  runPara: () => void;
  clonePara: () => void;
  clearPara: () => void;
  savePara: () => void;
};
export const ParaButtons = (props: ParaButtonsProps) => {
  const {
    toggleInput,
    toggleOutput,
    hideInputs,
    hideOutputs,
    deletePara,
    runPara,
    clonePara,
    clearPara,
    savePara,
  } = props;
  return (
    <EuiPageContentHeaderSection>
      <EuiToolTip delay="long" content="Runs the selected paragraph">
        <EuiButtonEmpty onClick={() => runPara()} iconType="play" aria-label="Run the Para" />
      </EuiToolTip>
      <EuiToolTip delay="long" content="Saves the selected paragraph">
        <EuiButtonEmpty onClick={() => savePara()} iconType="save" aria-label="Save the Para" />
      </EuiToolTip>
      <EuiToolTip delay="long" content="Clones the selected paragraph">
        <EuiButtonEmpty
          onClick={() => clonePara()}
          iconType="crossClusterReplicationApp"
          aria-label="Clone the Para"
        />
      </EuiToolTip>
      <EuiToolTip delay="long" content="Deletes the selected paragraph">
        <EuiButtonEmpty
          onClick={() => deletePara()}
          iconType="trash"
          aria-label="Delete the Para"
        />
      </EuiToolTip>
      <EuiToolTip delay="long" content="Clears all outputs">
        <EuiButtonEmpty
          onClick={() => clearPara()}
          iconType="brush"
          aria-label="Clear all the Paras"
        />
      </EuiToolTip>
      <EuiToolTip delay="long" content="Hides all the inputs">
        <EuiButtonToggle
          label="Inputs"
          iconType={toggleInput ? 'eye' : 'eyeClosed'}
          onChange={hideInputs}
          isSelected={toggleInput}
          isEmpty
          aria-label="Hide All Inputs"
        />
      </EuiToolTip>
      <EuiToolTip delay="long" content="Hides all the outputs">
        <EuiButtonToggle
          label="Outputs"
          iconType={toggleOutput ? 'eye' : 'eyeClosed'}
          onChange={hideOutputs}
          isSelected={toggleOutput}
          isEmpty
          aria-label="Hide All Outputs"
        />
      </EuiToolTip>
    </EuiPageContentHeaderSection>
  );
};

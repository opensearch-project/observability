/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

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

import {
  EuiButton,
  EuiButtonEmpty,
  EuiCodeBlock,
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiHighlight,
  EuiLink,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiSelectable,
  EuiSpacer,
  EuiSuperDatePicker,
  EuiText,
  EuiTextArea,
} from '@elastic/eui';
import { Input, Prompt } from '@nteract/presentational-components';
import { uiSettingsService } from '../../../../../common/utils';
import React, { useState } from 'react';
import { ParaType } from '../../../../../common/types/notebooks';

/*
 * "ParaInput" component is used by notebook to populate paragraph inputs for an open notebook.
 *
 * Props taken in as params are:
 * para - parsed paragraph from notebook
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
  runParaError: boolean;
  textValueEditor: (evt: React.ChangeEvent<HTMLTextAreaElement>, index: number) => void;
  handleKeyPress: (evt: React.KeyboardEvent<Element>, para: any, index: number) => void;
  startTime: string;
  setStartTime: (startTime: string) => void;
  endTime: string;
  setEndTime: (endTime: string) => void;
  setIsOutputStale: (isStale?: boolean) => void;
  visOptions: EuiComboBoxOptionOption[];
  selectedVisOption: EuiComboBoxOptionOption[];
  setSelectedVisOption: (newOption: EuiComboBoxOptionOption[]) => void;
}) => {
  const { para, index, runParaError, textValueEditor, handleKeyPress } = props;

  const inputPlaceholderString =
    'Type %md, %sql or %ppl on the first line to define the input type. \nCode block starts here.';

  const renderParaInput = () => {
    return (
      <>
        {/* If the para is selected show the editor else display the code in the paragraph */}
        {para.isSelected ? (
          <EuiTextArea
            placeholder={inputPlaceholderString}
            id="editorArea"
            className="editorArea"
            fullWidth
            isInvalid={runParaError}
            onChange={(evt) => {
              textValueEditor(evt, index);
              props.setIsOutputStale(true);
            }}
            onKeyPress={(evt) => handleKeyPress(evt, para, index)}
            value={para.inp}
            autoFocus
          />
        ) : (
          <EuiCodeBlock
            language={para.inp.slice(0, 4) === '%sql' ? 'sql' : 'md'}
            paddingSize="s"
            isCopyable
          >
            {para.inp}
          </EuiCodeBlock>
        )}
      </>
    );
  };

  const renderVisInput = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectableOptions, setSelectableOptions] = useState([]);
    const [selectableError, setSelectableError] = useState(false);

    const onSelect = () => {
      const selectedOptions = selectableOptions.filter((opt) => opt.checked === 'on');
      if (selectedOptions.length === 0) {
        setSelectableError(true);
        return;
      }
      props.setIsOutputStale(true);
      props.setSelectedVisOption(selectedOptions);
      setIsModalOpen(false);
    };

    const renderOption = (option, searchValue) => {
      const visURL = `visualize#/edit/${option.key}?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:'${props.startTime}',to:'${props.endTime}'))`;
      return (
        <EuiLink href={visURL} target="_blank">
          <EuiHighlight search={searchValue}>{option.label}</EuiHighlight>
        </EuiLink>
      );
    };

    return (
      <>
        <EuiFlexGroup alignItems="flexEnd" gutterSize="s">
          <EuiFlexItem grow={6}>
            <EuiFormRow label="Title" fullWidth>
              <EuiComboBox
                placeholder="Find visualization"
                singleSelection={{ asPlainText: true }}
                options={props.visOptions}
                selectedOptions={props.selectedVisOption}
                onChange={(newOption: EuiComboBoxOptionOption[]) => {
                  props.setSelectedVisOption(newOption);
                  props.setIsOutputStale(true);
                }}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton
              onClick={() => {
                setSelectableOptions(props.visOptions);
                setSelectableError(false);
                setIsModalOpen(true);
              }}
            >
              Browse
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={2} />
          <EuiFlexItem grow={9}>
            <EuiFormRow label="Date range" fullWidth>
              <EuiSuperDatePicker
                start={props.startTime}
                end={props.endTime}
                showUpdateButton={false}
                dateFormat={uiSettingsService.get('dateFormat')}
                onTimeChange={(e) => {
                  props.setStartTime(e.start);
                  props.setEndTime(e.end);
                  props.setIsOutputStale(true);
                }}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem />
        </EuiFlexGroup>

        {isModalOpen && (
          <EuiOverlayMask>
            <EuiModal onClose={() => setIsModalOpen(false)} style={{ width: 500 }}>
              <EuiModalHeader>
                <EuiModalHeaderTitle>Browse visualizations</EuiModalHeaderTitle>
              </EuiModalHeader>

              <EuiModalBody>
                <EuiSelectable
                  aria-label="Searchable Visualizations"
                  searchable
                  options={selectableOptions}
                  singleSelection={true}
                  renderOption={renderOption}
                  onChange={(newOptions) => {
                    setSelectableOptions(newOptions);
                    setSelectableError(false);
                  }}
                >
                  {(list, search) => (
                    <>
                      {search}
                      {list}
                    </>
                  )}
                </EuiSelectable>
                {selectableError && (
                  <>
                    <EuiSpacer size="s" />
                    <EuiText color="danger" size="s">
                      {'Visualization is required.'}
                    </EuiText>
                  </>
                )}
              </EuiModalBody>

              <EuiModalFooter>
                <EuiButtonEmpty onClick={() => setIsModalOpen(false)}>Cancel</EuiButtonEmpty>
                <EuiButton onClick={() => onSelect()} fill>
                  Select
                </EuiButton>
              </EuiModalFooter>
            </EuiModal>
          </EuiOverlayMask>
        )}
      </>
    );
  };

  return (
    <Input hidden={para.isInputHidden}>
      <Prompt blank={true} running={para.isRunning} queued={para.inQueue} />
      {para.isVizualisation ? renderVisInput() : renderParaInput()}
    </Input>
  );
};

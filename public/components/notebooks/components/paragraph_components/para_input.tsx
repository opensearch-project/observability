/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiButton,
  EuiButtonEmpty,
  EuiCodeBlock,
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiSelectableOption,
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
  setVisType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { para, index, runParaError, textValueEditor, handleKeyPress } = props;

  const inputPlaceholderString =
    'Type %md, %sql or %ppl on the first line to define the input type. \nCode block starts here.';

  const renderParaInput = () => {
    return (
      <div style={{ width: '100%' }}>
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
            language={para.inp.match(/^%(sql|md)/)?.[1]}
            overflowHeight={200}
            paddingSize="s"
          >
            {para.inp}
          </EuiCodeBlock>
        )}
      </div>
    );
  };

  const renderVisInput = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectableOptions, setSelectableOptions] = useState<EuiSelectableOption[]>([]);
    const [selectableError, setSelectableError] = useState(false);

    const onSelect = () => {
      const selectedOptions = selectableOptions.filter((opt) => opt.checked === 'on');
      if (selectedOptions.length === 0) {
        setSelectableError(true);
        return;
      }
      props.setIsOutputStale(true);
      if (selectedOptions.length > 0) props.setVisType(selectedOptions[0].className);
      props.setSelectedVisOption(selectedOptions);
      setIsModalOpen(false);
    };

    const renderOption = (option: EuiComboBoxOptionOption, searchValue: string) => {
      let visURL = `visualize#/edit/${option.key}?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:'${props.startTime}',to:'${props.endTime}'))`;
      if (option.className === 'OBSERVABILITY_VISUALIZATION') {
        visURL = `#/event_analytics/explorer/${option.key}`;
      }
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
                  if (newOption.length > 0) props.setVisType(newOption[0].className);
                  props.setSelectedVisOption(newOption);
                  props.setIsOutputStale(true);
                }}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton
              data-test-subj="para-input-visualization-browse-button"
              onClick={() => {
                setSelectableOptions([
                  ...props.visOptions[0].options,
                  ...props.visOptions[1].options,
                ]);
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
                <EuiButton
                  data-test-subj="para-input-select-button"
                  onClick={() => onSelect()}
                  fill
                >
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

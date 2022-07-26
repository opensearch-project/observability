/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  EuiButton,
  EuiFormRow,
  EuiSpacer,
  EuiIcon,
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiText,
} from '@elastic/eui';
import { isEmpty, uniqueId } from 'lodash';

export interface ParentUnitType {
  name: string;
  label: string;
  type: string;
}

export const ConfigTreemapParentFields = ({ dropdownList, selectedAxis, onSelectChange }: any) => {
  const addButtonText = '+ Add Parent';

  const options = dropdownList.map((item) => {
    return {
      ...item,
      label: item.name,
    };
  });

  const initialParentState = {
    name: '',
    label: '',
    type: '',
  };

  const handleAddParent = () => {
    onSelectChange([...selectedAxis, initialParentState]);
  };

  const handleParentChange = (options: EuiComboBoxOptionOption<unknown>[], index: number) => {
    onSelectChange([
      ...selectedAxis.slice(0, index),
      (options[0] as ParentUnitType) ?? initialParentState,
      ...selectedAxis.slice(index + 1, selectedAxis.length),
    ]);
  };

  const handleParentDelete = (index: number) => {
    onSelectChange([
      ...selectedAxis.slice(0, index),
      ...selectedAxis.slice(index + 1, selectedAxis.length),
    ]);
  };

  return (
    <>
      {!isEmpty(selectedAxis) &&
        selectedAxis.map((_, index: number) => {
          return (
            <>
              <EuiSpacer size="s" />
              <EuiFormRow
                label={`Parent ${index + 1}`}
                labelAppend={
                  <EuiText size="xs">
                    <EuiIcon
                      type="cross"
                      color="danger"
                      onClick={() => handleParentDelete(index)}
                    />
                  </EuiText>
                }
              >
                <EuiComboBox
                  id={uniqueId('axis-select-')}
                  placeholder="Select a field"
                  options={options}
                  selectedOptions={selectedAxis[index].label !== '' ? [selectedAxis[index]] : []}
                  isClearable={true}
                  singleSelection={{ asPlainText: true }}
                  onChange={(options) => handleParentChange(options, index)}
                  aria-label="Use aria labels when no actual label is in use"
                />
              </EuiFormRow>
            </>
          );
        })}
      <EuiSpacer size="s" />
      <EuiSpacer size="s" />
      <EuiButton data-test-subj="addParentButton" fullWidth size="s" onClick={handleAddParent}>
        {addButtonText}
      </EuiButton>
    </>
  );
};

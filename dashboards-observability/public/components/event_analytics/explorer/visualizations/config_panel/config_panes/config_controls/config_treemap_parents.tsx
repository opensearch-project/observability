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
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiComboBox,
  EuiComboBoxOptionOption,
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

  const handleAddParent = () => {
    onSelectChange([
      ...selectedAxis,
      {
        name: '',
        label: '',
        type: '',
      },
    ]);
  };

  const handleParentChange = (options: EuiComboBoxOptionOption<unknown>[], index: number) => {
    onSelectChange([
      ...selectedAxis.slice(0, index),
      options[0] as ParentUnitType,
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
      <EuiTitle size="xxs">
        <h3>{`Parent Fields`}</h3>
      </EuiTitle>

      {!isEmpty(selectedAxis) &&
        selectedAxis.map((_, index: number) => {
          return (
            <>
              <EuiSpacer size="s" />
              <EuiTitle size="xxs">
                <h3>{`Parent ${index + 1}`}</h3>
              </EuiTitle>
              <EuiFormRow fullWidth label="">
                <EuiFlexGroup alignItems="center" gutterSize="xs">
                  <EuiFlexItem grow={10}>
                    <EuiComboBox
                      id={uniqueId('axis-select-')}
                      placeholder="Select a field"
                      options={options}
                      selectedOptions={selectedAxis[index].name !== '' ? [selectedAxis[index]] : []}
                      isInvalid={true}
                      isClearable={true}
                      singleSelection={true}
                      onChange={(options) => handleParentChange(options, index)}
                      aria-label="Use aria labels when no actual label is in use"
                    />
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiIcon type="trash" size="m" onClick={() => handleParentDelete(index)} />
                  </EuiFlexItem>
                </EuiFlexGroup>
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

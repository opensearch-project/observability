/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { uniqueId, isEmpty } from 'lodash';
import { EuiTitle, EuiComboBox, EuiSpacer } from '@elastic/eui';

export const PanelItem = ({
  paddingTitle,
  selectedAxis,
  dropdownList,
  onSelectChange,
  isInvalid,
  isSingleSelection = false,
  isClearable = true,
}: any) => {
  const options = dropdownList.map((item) => {
    return {
      ...item,
      label: item.name,
    };
  });

  return (
    <>
      <EuiTitle size="xxs">
        <h3>{paddingTitle}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiComboBox
        id={uniqueId('axis-select-')}
        placeholder="Select a field"
        options={options}
        selectedOptions={Array.isArray(selectedAxis) ? selectedAxis : []}
        isInvalid={isInvalid ?? isEmpty(selectedAxis)}
        isClearable={isClearable}
        singleSelection={isSingleSelection}
        onChange={onSelectChange}
        aria-label="Use aria labels when no actual label is in use"
      />
    </>
  );
};

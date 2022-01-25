/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import { EuiPanel, EuiTitle, EuiAccordion, EuiComboBox, EuiSpacer } from '@elastic/eui';

export const PanelItem = ({ paddingTitle, advancedTitle, dropdownList, children }: any) => {
  console.log('dropdown: ', dropdownList);
  const options = dropdownList.map((item) => {
    return {
      label: item.name,
    };
  });
  const [selectedOption, setValue] = useState(options.length !== 0 ? [options[0]] : []);
  const handleSelect = (selectedOption) => {
    setValue(selectedOption);
  };
  return (
    <EuiPanel paddingSize="m">
      <EuiTitle size="xxs">
        <h3>{paddingTitle}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      {
        <EuiComboBox
          id={uniqueId('axis-select-')}
          placeholder="Select a field"
          options={options}
          selectedOptions={selectedOption}
          singleSelection={{ asPlainText: true }}
          onChange={(e) => handleSelect(e)}
          aria-label="Use aria labels when no actual label is in use"
        />
      }
      <EuiSpacer size="s" />
      <EuiAccordion id="accordion1" buttonContent={advancedTitle}>
        <EuiPanel color="subdued">{children}</EuiPanel>
      </EuiAccordion>
    </EuiPanel>
  );
};

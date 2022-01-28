/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import { EuiPanel, EuiTitle, EuiAccordion, EuiComboBox, EuiSpacer } from '@elastic/eui';

export const PanelItem = ({
  paddingTitle,
  advancedTitle,
  defaultAxis,
  dropdownList,
  children,
}: any) => {
  console.log('defaultAxis.name: ', defaultAxis?.name);
  console.log('{ ...defaultAxis, label: defaultAxis.name }: ', {
    ...defaultAxis,
    label: defaultAxis.name,
  });

  const options = dropdownList.map((item) => {
    return {
      label: item.name,
    };
  });
  const [selectedOption, setValue] = useState([{ ...defaultAxis, label: defaultAxis?.name || '' }]);
  const handleSelect = (selectedOption) => {
    setValue(selectedOption);
  };
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
        selectedOptions={selectedOption}
        singleSelection={{ asPlainText: true }}
        onChange={(e) => handleSelect(e)}
        aria-label="Use aria labels when no actual label is in use"
      />
      <EuiSpacer size="s" />
      {/* <EuiAccordion id="accordion1" buttonContent={advancedTitle}>
        <EuiPanel color="subdued">{children}</EuiPanel>
      </EuiAccordion> */}
    </>
  );
};

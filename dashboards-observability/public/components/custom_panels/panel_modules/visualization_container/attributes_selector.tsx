/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiComboBox,
  EuiExpression,
  EuiFilterButton,
  EuiPopover,
  EuiPopoverTitle,
} from '@elastic/eui';
import React, { useState } from 'react';

interface Props {
  attributes: any;
  setQueryDimensions: React.Dispatch<React.SetStateAction<never[]>>;
}

export const AttributesSelector = ({ attributes, setQueryDimensions }: Props) => {
  const [selected, setSelected] = useState([]);
  const [dimensions, setDimensions] = useState({
    isOpen: false,
    value: selected.length,
  });
  const openDimensions = () => {
    setDimensions({
      ...dimensions,
      isOpen: true,
    });
  };
  const closeDimensions = () => {
    setDimensions({
      ...dimensions,
      isOpen: false,
    });
  };
  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
    setQueryDimensions(selectedOptions);
  };
  const renderPopover = () => (
    <div style={{ width: '300px' }}>
      <EuiPopoverTitle>Dimensions</EuiPopoverTitle>
      <EuiComboBox
        placeholder="Select Dimensions"
        options={attributes}
        selectedOptions={selected}
        onChange={onChange}
      />
    </div>
  );
  return (
    <EuiPopover
      button={
        <EuiExpression
          description="dimensions"
          value={selected.length}
          isActive={dimensions.isOpen}
          onClick={openDimensions}
        />
      }
      isOpen={dimensions.isOpen}
      closePopover={closeDimensions}
      panelPaddingSize="s"
      ownFocus={false}
    >
      {renderPopover()}
    </EuiPopover>
  );
};

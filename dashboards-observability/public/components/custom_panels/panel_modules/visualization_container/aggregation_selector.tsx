/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiExpression, EuiPopover, EuiPopoverTitle, EuiSelect } from '@elastic/eui';
import React from 'react';
import { useState } from 'react';

interface Props {
  setQueryAggregation: any;
}

export const AggregationSelector = ({ setQueryAggregation }: Props) => {
  const [aggregation, setAggregation] = useState({
    isOpen: false,
    value: 'avg()',
  });
  const openAggregation = () => {
    setAggregation({
      ...aggregation,
      isOpen: true,
    });
  };
  const closeAggregation = () => {
    setAggregation({
      ...aggregation,
      isOpen: false,
    });
  };
  const changeAggregation = (event: any) => {
    setAggregation({
      ...aggregation,
      value: event.target.value,
      isOpen: false,
    });
    setQueryAggregation(event.target.value);
  };

  const aggregationsButton = (
    <EuiExpression
      description="aggregation"
      value={aggregation.value}
      isActive={aggregation.isOpen}
      onClick={openAggregation}
    />
  );

  const renderAggregationPopover = () => (
    <div>
      <EuiPopoverTitle>Aggregation</EuiPopoverTitle>
      <EuiSelect
        compressed
        value={aggregation.value}
        onChange={changeAggregation}
        options={[
          { value: 'count()', text: 'count()' },
          { value: 'sum()', text: 'sum()' },
          { value: 'avg()', text: 'avg()' },
          { value: 'min()', text: 'min()' },
          { value: 'max()', text: 'max()' },
        ]}
      />
    </div>
  );

  return (
    <EuiPopover
      button={aggregationsButton}
      isOpen={aggregation.isOpen}
      closePopover={closeAggregation}
      panelPaddingSize="s"
      anchorPosition="downLeft"
      ownFocus={false}
    >
      {renderAggregationPopover()}
    </EuiPopover>
  );
};

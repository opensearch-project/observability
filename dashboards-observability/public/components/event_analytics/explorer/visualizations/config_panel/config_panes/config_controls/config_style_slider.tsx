/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { uniqueId } from 'lodash';
import { EuiTitle, EuiSpacer, EuiRange } from '@elastic/eui';
interface Props {
  title: string;
  currentRange: string;
  maxRange: number;
  handleSliderChange: (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => void;
}

export const SliderConfig: React.FC<Props> = ({
  title, currentRange, handleSliderChange, maxRange
}) => (
  <>
    <EuiTitle size="xxs">
      <h3>{title}</h3>
    </EuiTitle>
    <EuiSpacer size="s" />
    <EuiRange
      id={uniqueId('inputRangeSlider-')}
      max={maxRange}
      name={title}
      value={currentRange}
      onChange={(e) => handleSliderChange(e.target.value)}
      showInput
      aria-label="change lineWidth slider"
    />
  </>
);

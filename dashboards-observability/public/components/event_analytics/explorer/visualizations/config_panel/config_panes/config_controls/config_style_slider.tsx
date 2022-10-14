/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from 'react';
import { EuiTitle, EuiSpacer, EuiRange, htmlIdGenerator, EuiToolTip, EuiIcon } from '@elastic/eui';
const tooltipIcon = <EuiIcon type="iInCircle" color="text" size="m" className="info-icon" />;

export interface EuiRangeTick {
  value: number;
  label: ReactNode;
}

interface Props {
  title: string;
  currentRange: string;
  minRange?: number;
  maxRange: number;
  showTicks?: boolean;
  ticks?: EuiRangeTick[];
  step: number;
  handleSliderChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) => void;
}

const rangeToolTip = (message: string) => (
  <EuiToolTip position="top" content={message} delay="regular" anchorClassName="eui-textTruncate">
    {tooltipIcon}
  </EuiToolTip>
);

export const SliderConfig: React.FC<Props> = ({
  title,
  currentRange,
  handleSliderChange,
  minRange,
  maxRange,
  showTicks,
  ticks,
  step,
}) => (
  <>
    <div style={{ display: 'flex' }}>
      <EuiTitle size="xxs">
        <h3>{title}</h3>
      </EuiTitle>
      {rangeToolTip(`Value must be in the range of ${minRange} to ${maxRange}`)}
    </div>
    <EuiSpacer size="s" />
    <EuiRange
      aria-label="change lineWidth slider"
      id={htmlIdGenerator('inputRangeSlider')()}
      min={minRange}
      max={maxRange}
      name={title}
      value={currentRange}
      onChange={(e) => handleSliderChange(e.target.value)}
      showTicks={showTicks}
      ticks={ticks}
      step={step}
      compressed
      showInput
    />
  </>
);

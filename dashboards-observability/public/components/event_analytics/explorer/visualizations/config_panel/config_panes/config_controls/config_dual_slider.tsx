import React from 'react';
import { EuiDualRange, EuiSpacer, EuiTitle, htmlIdGenerator } from '@elastic/eui';

interface Props {
  title: string;
  currentRange: [number, number];
  handleSliderChange: (changes: any) => void;
  minRange: number;
  maxRange: number;
  step: number;
}

export const DualRangeSlider: React.FC<Props> = ({
  title,
  currentRange,
  handleSliderChange,
  minRange,
  maxRange,
  step,
}) => (
  <>
    <EuiTitle size="xxs">
      <h3>{title}</h3>
    </EuiTitle>
    <EuiSpacer size="s" />
    <EuiDualRange
      id={htmlIdGenerator('dualInputRangeSlider')()}
      value={currentRange}
      onChange={handleSliderChange}
      min={minRange}
      max={maxRange}
      step={step}
      showInput
      minInputProps={{ 'aria-label': 'Min value' }}
      maxInputProps={{ 'aria-label': 'Max value' }}
      aria-label="Dual Range Slider"
    />
  </>
);

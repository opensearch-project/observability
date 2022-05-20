/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  EuiTitle,
  EuiSpacer,
  EuiFlexItem,
  EuiFlexGroup,
  EuiColorPalettePicker,
  EuiColorPicker,
  EuiFormRow,
} from '@elastic/eui';
import {
  DEFAULT_PALETTE,
  SINGLE_COLOR_PALETTE,
} from '../../../../../../../../common/constants/colors';

export const ColorPalettePicker = ({
  title,
  selectedColor,
  colorPalettes,
  onSelectChange,
}: any) => {
  const getColorObject = (name: string = DEFAULT_PALETTE, color?: string) => {
    return {
      name,
      color: color ?? name,
    };
  };

  const [singleColor, setSingleColor] = useState('#000000');

  const onPaletteChange = (value: string) => {
    if (value === SINGLE_COLOR_PALETTE)
      onSelectChange(getColorObject(SINGLE_COLOR_PALETTE, singleColor));
    else onSelectChange(getColorObject(value));
  };

  const onColorChange = (value: string) => {
    setSingleColor(value);
    onSelectChange(getColorObject(SINGLE_COLOR_PALETTE, value));
  };

  return (
    <>
      <EuiTitle size="xxs">
        <h3>{title}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiFlexGroup gutterSize={'xs'}>
        {selectedColor.name === SINGLE_COLOR_PALETTE && (
          <EuiFlexItem grow={1}>
            <EuiFormRow>
              <EuiColorPicker onChange={onColorChange} color={singleColor} />
            </EuiFormRow>
          </EuiFlexItem>
        )}
        <EuiFlexItem grow={3}>
          <EuiColorPalettePicker
            palettes={colorPalettes}
            onChange={onPaletteChange}
            valueOfSelected={selectedColor.name}
            selectionDisplay={'title'}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};

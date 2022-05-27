/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  EuiTitle,
  EuiSpacer,
  EuiFlexItem,
  EuiFlexGroup,
  EuiColorPalettePicker,
} from '@elastic/eui';
import { REDS_PALETTE } from '../../../../../../../../common/constants/colors';

export const HeatmapColorPalettePicker = ({
  title,
  colorPalettes,
  selectedColor,
  onSelectChange,
  vizState,
}: any) => {
  const getColorObject = (name: string = REDS_PALETTE.label) => {
    return {
      name,
      color: name,
    };
  };

  const heatmapOptions = colorPalettes.filter((color) => color.type !== 'text');
  const [paletteColor, setPaletteColor] = useState(REDS_PALETTE.label);

  useEffect(() => {
    if (selectedColor) {
      setPaletteColor(selectedColor?.color ?? REDS_PALETTE.label);
    }
  }, [selectedColor]);

  const onPaletteChange = (value: string) => {
    setPaletteColor(value);
    onSelectChange(getColorObject(value));
  };

  return (
    <>
      <EuiTitle size="xxs">
        <h3>{title}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiFlexGroup gutterSize={'xs'}>
        <EuiFlexItem grow={3}>
          <EuiColorPalettePicker
            palettes={heatmapOptions}
            onChange={onPaletteChange}
            valueOfSelected={paletteColor}
            selectionDisplay={'title'}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};

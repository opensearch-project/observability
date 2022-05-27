/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  EuiTitle,
  EuiSpacer,
  EuiFlexItem,
  EuiFlexGroup,
  EuiColorPalettePicker,
} from '@elastic/eui';

export const HeatmapColorPalettePicker = ({
  title,
  colorPalettes,
  selectedColor,
  onSelectChange,
}: any) => {
  const getColorObject = (name: string) => {
    return {
      name,
      color: name,
    };
  };

  const heatmapOptions = colorPalettes.filter((color) => color.type !== 'text');
  console.log(selectedColor, 'selectedColor');

  const onPaletteChange = (value: string) => {
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
            valueOfSelected={selectedColor.name}
            selectionDisplay={'title'}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};

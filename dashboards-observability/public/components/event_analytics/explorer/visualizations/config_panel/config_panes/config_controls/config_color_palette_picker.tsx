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
  MULTI_COLOR_PALETTE,
  SINGLE_COLOR_PALETTE,
} from '../../../../../../../../common/constants/colors';

export const ColorPalettePicker = ({
  title,
  selectedColor,
  showParentColorPicker,
  colorPalettes,
  onSelectChange,
}: any) => {
  const getColorObject = (
    name: string = DEFAULT_PALETTE,
    childColor?: string,
    parentColor?: string
  ) => ({
    name,
    childColor: childColor ?? name,
    parentColor: parentColor ?? name,
  });

  const [childColor, setChildColor] = useState('#000000');
  const [parentColor, setParentColor] = useState('#000000');

  const onPaletteChange = (value: string) => {
    if (value === SINGLE_COLOR_PALETTE)
      onSelectChange(getColorObject(SINGLE_COLOR_PALETTE, childColor));
    else if (value === MULTI_COLOR_PALETTE)
      onSelectChange(getColorObject(MULTI_COLOR_PALETTE, childColor, parentColor));
    else onSelectChange(getColorObject(value));
  };

  const onChildColorChange = (value: string) => {
    setChildColor(value);
    onSelectChange(getColorObject(selectedColor.name, value, parentColor));
  };

  const onParentColorChange = (value: string) => {
    setParentColor(value);
    onSelectChange(getColorObject(selectedColor.name, childColor, value));
  };

  return (
    <>
      <EuiTitle size="xxs">
        <h3>{title}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiFlexGroup gutterSize={'xs'}>
        {[SINGLE_COLOR_PALETTE, MULTI_COLOR_PALETTE].includes(selectedColor.name) && (
          <EuiFlexItem grow={1}>
            <EuiFormRow helpText={selectedColor.name === MULTI_COLOR_PALETTE && 'Child field'}>
              <EuiColorPicker onChange={onChildColorChange} color={childColor} />
            </EuiFormRow>
          </EuiFlexItem>
        )}
        {selectedColor.name === MULTI_COLOR_PALETTE && showParentColorPicker && (
          <EuiFlexItem grow={1}>
            <EuiFormRow helpText="Parent field">
              <EuiColorPicker onChange={onParentColorChange} color={parentColor} />
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

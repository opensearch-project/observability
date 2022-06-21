/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
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
  numberOfParents,
  colorPalettes,
  onSelectChange,
}: any) => {
  const getColorObject = (
    name: string = DEFAULT_PALETTE,
    childColor?: string,
    parentColors?: string[]
  ) => ({
    name,
    childColor: childColor ?? name,
    parentColors: parentColors ?? [],
  });

  const [childColor, setChildColor] = useState('#000000');
  const [parentColors, setParentColors] = useState<string[]>([]);

  const onPaletteChange = (value: string) => {
    if (value === SINGLE_COLOR_PALETTE)
      onSelectChange(getColorObject(SINGLE_COLOR_PALETTE, childColor));
    else if (value === MULTI_COLOR_PALETTE)
      onSelectChange(getColorObject(MULTI_COLOR_PALETTE, childColor, parentColors));
    else onSelectChange(getColorObject(value));
  };

  const onChildColorChange = (value: string) => {
    setChildColor(value);
    onSelectChange(getColorObject(selectedColor.name, value, parentColors));
  };

  const onParentColorChange = (parentIndex: number) => (value: string) => {
    const newColors = [
      ...parentColors.slice(0, parentIndex),
      value,
      ...parentColors.slice(parentIndex + 1, parentColors.length),
    ];
    setParentColors(newColors);
    onSelectChange(getColorObject(selectedColor.name, childColor, newColors));
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
        {selectedColor.name === MULTI_COLOR_PALETTE &&
          numberOfParents > 0 &&
          Array(numberOfParents)
            .fill(0)
            .map((_, i) => (
              <EuiFlexItem grow={1}>
                <EuiFormRow helpText={`Parent ${i + 1} field`}>
                  <EuiColorPicker
                    onChange={onParentColorChange(i)}
                    color={parentColors[i] ?? '#000000'}
                  />
                </EuiFormRow>
              </EuiFlexItem>
            ))}
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

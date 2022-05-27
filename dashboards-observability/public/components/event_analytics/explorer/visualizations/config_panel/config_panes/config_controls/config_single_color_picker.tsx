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
  EuiColorPicker,
  EuiFormRow,
  colorPalette,
} from '@elastic/eui';
import { lightenColor } from '../../../../../../event_analytics/utils/utils';
import { SINGLE_COLOR_PALETTE } from '../../../../../../../../common/constants/colors';

export const SingleColorPicker = ({ title, selectedColor, onSelectChange, vizState }: any) => {
  const getColorObject = (name: string, color: string) => {
    return {
      name,
      color: color ?? name,
    };
  };

  const onColorChange = (value: string) => {
    onSelectChange(getColorObject(SINGLE_COLOR_PALETTE, value));
  };

  return (
    <>
      <EuiTitle size="xxs">
        <h3>{title}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiFlexGroup gutterSize={'xs'}>
        <EuiFlexItem grow={3}>
          <EuiFormRow>
            <EuiColorPicker onChange={onColorChange} color={selectedColor.color} />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="m" />
      <EuiFlexGroup gutterSize="none" responsive={false}>
        {colorPalette([lightenColor(selectedColor.color, 50), selectedColor.color], 10).map(
          (hexCode) => (
            <EuiFlexItem key={hexCode} grow={3} style={{ height: '16px', width: '16px' }}>
              <span
                title={hexCode}
                style={{ backgroundColor: hexCode, height: '16px', width: 'auto' }}
              />
            </EuiFlexItem>
          )
        )}
      </EuiFlexGroup>
    </>
  );
};

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { uniqueId } from 'lodash';
import { EuiSpacer, EuiFormRow, EuiSwitch } from '@elastic/eui';

interface EUISwitch {
  label: string;
  disabled: boolean;
  checked: boolean;
  handleChange: (isChecked: boolean) => void;
}
export const ConfigSwitch: React.FC<EUISwitch> = ({ label, disabled, checked, handleChange }) => (
  <>
    <EuiFormRow label={label}>
      <EuiSwitch
        id={uniqueId('switch-button')}
        showLabel={false}
        disabled={disabled}
        label={label}
        checked={checked}
        onChange={(e) => handleChange(e.target.checked)}
        compressed
      />
    </EuiFormRow>
    <EuiSpacer size="s" />
  </>
);

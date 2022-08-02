/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiSpacer, EuiFormRow, EuiSwitch, htmlIdGenerator } from '@elastic/eui';

interface EUISwitch {
  label: string;
  disabled: boolean;
  checked: boolean;
  handleChange: (isChecked: boolean) => void;
}
export const ConfigSwitch: React.FC<EUISwitch> = ({ label, disabled, checked, handleChange }) => (
  <React.Fragment key={`config-switch-${label}`}>
    <EuiFormRow label={label}>
      <EuiSwitch
        id={htmlIdGenerator('switch-button')()}
        showLabel={false}
        disabled={disabled}
        label={label}
        checked={checked}
        onChange={(e) => handleChange(e.target.checked)}
        compressed
      />
    </EuiFormRow>
    <EuiSpacer size="s" />
  </React.Fragment>
);

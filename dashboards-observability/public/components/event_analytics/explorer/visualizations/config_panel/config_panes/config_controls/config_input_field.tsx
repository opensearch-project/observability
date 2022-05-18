/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiFormRow, EuiFieldNumber } from '@elastic/eui';

export const ConfigInputField = ({ title, currentValue, handleInputChange }: any) => {
  return (
    <>
      <EuiFormRow fullWidth label={title}>
        <EuiFieldNumber
          placeholder="auto"
          onChange={(e) => handleInputChange(e.target.value)}
          value={currentValue}
        />
      </EuiFormRow>
    </>
  );
};

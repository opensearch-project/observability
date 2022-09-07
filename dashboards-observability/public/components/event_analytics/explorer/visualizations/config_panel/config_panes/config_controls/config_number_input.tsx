/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { EuiFieldNumber, EuiTitle, EuiSpacer, htmlIdGenerator } from '@elastic/eui';

interface InputFieldProps {
  title: string;
  numValue: number;
  handleInputChange: (value?: any) => void;
}

export const InputFieldItem: React.FC<InputFieldProps> = ({
  title,
  numValue,
  handleInputChange,
}) => {
  const [fieldValue, setFieldValue] = useState<number | string>(numValue);

  useEffect(() => {
    setFieldValue('');
    if (numValue !== undefined || numValue !== '') {
      setFieldValue(numValue);
    }
  }, [numValue]);

  return (
    <>
      <EuiTitle size="xxs">
        <h3>{title}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiFieldNumber
        id={htmlIdGenerator('input-number')()}
        fullWidth
        placeholder="auto"
        value={fieldValue}
        min={1}
        onChange={(e) => setFieldValue(e.target.value)}
        onBlur={() => handleInputChange(fieldValue)}
        data-test-subj="valueFieldNumber"
      />
    </>
  );
};

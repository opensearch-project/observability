/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { EuiFieldText, EuiTitle, EuiSpacer, htmlIdGenerator } from '@elastic/eui';

interface InputFieldProps {
  name: string;
  title: string;
  currentValue: string;
  handleInputChange: (value: string) => void;
}

export const TextInputFieldItem: React.FC<InputFieldProps> = ({
  name,
  title,
  currentValue,
  handleInputChange,
}) => {
  const [fieldValue, setFieldValue] = useState<string>('');

  useEffect(() => {
    if (currentValue !== undefined || currentValue !== '') {
      setFieldValue(currentValue);
    }
  }, [currentValue]);

  return (
    <>
      <EuiTitle size="xxs">
        <h3>{title}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiFieldText
        id={htmlIdGenerator('input-text')()}
        name={name}
        fullWidth
        placeholder={title}
        value={fieldValue}
        onChange={(e) => setFieldValue(e.target.value)}
        onBlur={() => handleInputChange(fieldValue)}
        data-test-subj="valueFieldText"
      />
    </>
  );
};

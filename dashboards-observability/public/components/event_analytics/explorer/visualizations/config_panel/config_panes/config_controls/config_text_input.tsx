/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EuiFieldText, EuiTitle, EuiSpacer, htmlIdGenerator } from '@elastic/eui';

interface InputFieldProps {
  title: string;
  numValue: number;
  handleInputChange: (value?: any) => void;
}

export const TextInputFieldItem: React.FC<InputFieldProps> = ({
  title,
  numValue,
  handleInputChange,
}) => {
  const [fieldValue, setFieldValue] = useState<number | string>(numValue);

  return (
    <>
      <EuiTitle size="xxs">
        <h3>{title}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiFieldText
        name='metric'
        fullWidth
        placeholder={title}
        value={fieldValue}
        onChange={(e) => setFieldValue(e.target.value)}
        onBlur={() => handleInputChange(fieldValue)}
        data-test-subj="valueFieldNumber"
      />
    </>
  );
};

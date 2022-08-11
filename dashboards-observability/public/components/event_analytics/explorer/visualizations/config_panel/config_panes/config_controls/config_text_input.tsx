/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EuiFieldText, EuiTitle, EuiSpacer, htmlIdGenerator } from '@elastic/eui';

interface InputFieldProps {
  name: string;
  title: string;
  numValue: number;
  handleInputChange: (value?: any) => void;
}

export const TextInputFieldItem: React.FC<InputFieldProps> = ({
  name,
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
        id={htmlIdGenerator('input-number')()}
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

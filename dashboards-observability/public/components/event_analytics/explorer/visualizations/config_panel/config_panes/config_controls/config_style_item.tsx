/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { uniqueId } from 'lodash';
import { EuiTitle, EuiSpacer, EuiButtonGroup } from '@elastic/eui';

export const StyleItem = ({
  title, legend, groupOptions, idSelected, handleButtonChange
}: any) => {
  return (
    <>
      <EuiTitle size="xxs">
        <h3>{title}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />

      <EuiButtonGroup
        id={uniqueId('button-select-')}
        name={title}
        legend={legend}
        options={groupOptions}
        idSelected={idSelected}
        onChange={handleButtonChange}
        buttonSize="compressed"
        isFullWidth
      />
    </>
  );
};

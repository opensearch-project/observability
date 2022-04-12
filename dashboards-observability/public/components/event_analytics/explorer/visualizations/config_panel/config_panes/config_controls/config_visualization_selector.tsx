/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiAccordion } from '@elastic/eui';

export const ConfigVisualizationSelector = ({ children }: any) => {
  return (
    <EuiAccordion
      initialIsOpen
      id="configPanel__valueOptions"
      buttonContent="Value options"
      paddingSize="s"
    >
      {children}
    </EuiAccordion>
  );
};

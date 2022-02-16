/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiButton, EuiAccordion } from '@elastic/eui';

export const ConfigThresholds = (props: any) => {
  return (
    <EuiAccordion id="configPanel__thresholds" buttonContent="Thresholds" paddingSize="s">
      <EuiButton size="s">+ Add threadshold</EuiButton>
    </EuiAccordion>
  );
};

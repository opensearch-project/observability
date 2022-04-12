/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiAccordion, EuiButton } from '@elastic/eui';

export const ConfigDataLinks = (props: any) => {
  return (
    <EuiAccordion id="configPanel__dataLinks" buttonContent="Data links" paddingSize="s">
      <EuiButton size="s">+ Add link</EuiButton>
    </EuiAccordion>
  );
};

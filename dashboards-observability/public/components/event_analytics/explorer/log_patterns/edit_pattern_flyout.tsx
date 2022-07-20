/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiAccordion,
  EuiFieldText,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiForm,
  EuiFormRow,
  EuiPanel,
  EuiTitle,
} from '@elastic/eui';
import React from 'react';
import { PatternType } from './patterns_tab';

interface EditPatternFlyoutProps {
  patternName: string;
  closeFlyout: () => void;
}

export function EditPatternFlyout(props: EditPatternFlyoutProps) {
  const { patternName, closeFlyout } = props;

  const flyoutHeader = (
    <EuiTitle size="s">
      <h5>{patternName}</h5>
    </EuiTitle>
  );

  const flyoutBody = (
    <EuiPanel>
      <EuiTitle size="xs">
        <h4>Patterns</h4>
      </EuiTitle>
      <EuiAccordion id="renameAccordion" buttonContent="Punctuation Signature">
        <EuiForm>
          <EuiFormRow label="Pattern Name">
            <EuiFieldText />
          </EuiFormRow>
        </EuiForm>
      </EuiAccordion>
    </EuiPanel>
  );

  return (
    <EuiFlyout onClose={closeFlyout} size="s">
      <EuiFlyoutHeader hasBorder>{flyoutHeader}</EuiFlyoutHeader>
      <EuiFlyoutBody>{flyoutBody}</EuiFlyoutBody>
    </EuiFlyout>
  );
}

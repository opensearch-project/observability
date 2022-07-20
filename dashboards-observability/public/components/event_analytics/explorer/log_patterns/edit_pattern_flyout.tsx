/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiForm,
  EuiFormRow,
  EuiTitle,
} from '@elastic/eui';
import React, { useState } from 'react';

interface EditPatternFlyoutProps {
  patternName: string;
  onRename: (newName: string) => void;
  closeFlyout: () => void;
}

export function EditPatternFlyout(props: EditPatternFlyoutProps) {
  const { patternName, onRename, closeFlyout } = props;
  const [tempName, setTempName] = useState(patternName);

  const flyoutHeader = (
    <EuiTitle size="xs">
      <h5>Edit name</h5>
    </EuiTitle>
  );

  const flyoutBody = (
    <EuiForm>
      <EuiFormRow label="Pattern name">
        <EuiFieldText name="name" value={tempName} onChange={(e) => setTempName(e.target.value)} />
      </EuiFormRow>
    </EuiForm>
  );

  const flyoutFooter = (
    <EuiFlexGroup justifyContent="spaceBetween">
      <EuiFlexItem grow={false}>
        <EuiButton onClick={closeFlyout}>Cancel</EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton onClick={() => onRename(tempName)} fill>
          Update
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  return (
    <EuiFlyout onClose={closeFlyout} size="s">
      <EuiFlyoutHeader hasBorder>{flyoutHeader}</EuiFlyoutHeader>
      <EuiFlyoutBody>{flyoutBody}</EuiFlyoutBody>
      <EuiFlyoutFooter>{flyoutFooter}</EuiFlyoutFooter>
    </EuiFlyout>
  );
}

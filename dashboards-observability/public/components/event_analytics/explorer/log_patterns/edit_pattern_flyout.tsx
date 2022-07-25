/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiForm,
  EuiFormRow,
  EuiTitle,
} from '@elastic/eui';
import React, { useState } from 'react';
import { FlyoutContainers } from '../../../../components/common/flyout_containers/flyout_containers';

interface EditPatternFlyoutProps {
  patternName: string;
  onRename: (newName: string) => void;
  closeFlyout: () => void;
}

export function EditPatternFlyout(props: EditPatternFlyoutProps) {
  const { patternName, onRename, closeFlyout } = props;
  const [tempName, setTempName] = useState(patternName);

  const flyoutHeader = (
    <EuiFlyoutHeader>
      <EuiTitle size="xs">
        <h5>Edit name</h5>
      </EuiTitle>
    </EuiFlyoutHeader>
  );

  const flyoutBody = (
    <EuiFlyoutBody>
      <EuiForm>
        <EuiFormRow label="Pattern name">
          <EuiFieldText
            name="name"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
        </EuiFormRow>
      </EuiForm>
    </EuiFlyoutBody>
  );

  const flyoutFooter = (
    <EuiFlyoutFooter>
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
    </EuiFlyoutFooter>
  );

  return (
    <FlyoutContainers
      closeFlyout={closeFlyout}
      flyoutHeader={flyoutHeader}
      flyoutBody={flyoutBody}
      flyoutFooter={flyoutFooter}
      ariaLabel={'eventsDocFyout'}
      size={'s'}
    />
  );
}

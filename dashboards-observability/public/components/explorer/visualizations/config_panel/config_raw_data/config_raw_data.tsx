/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiForm, EuiFlexGroup, EuiFlexItem, EuiPanel } from '@elastic/eui';

export const VizDataPanel = ({ dimensions }: any) => {
  return (
    <div className="visEditorSidebar__config">
      <EuiFlexGroup
        className="visEditorSidebar"
        direction="column"
        justifyContent="spaceBetween"
        gutterSize="none"
        responsive={false}
      >
        <EuiFlexItem className="visEditorSidebar__formWrapper">
          <EuiForm className="visEditorSidebar__form">
            <EuiPanel paddingSize="m">{dimensions}</EuiPanel>
          </EuiForm>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};

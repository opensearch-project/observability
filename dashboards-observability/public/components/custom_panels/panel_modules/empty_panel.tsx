/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiSpacer, EuiText, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import React from 'react';

/*
 * EmptyPanelView - This Sub-component is shown to the user when a operational panel is empty
 *
 * Props taken in as params are:
 * addVizDisabled -> Boolean to enable/disable the add visualization button
 * getVizContextPanels -> Function to populate the add visualization popover
 */

interface EmptyPanelViewProps {
  addButton: any;
}

export const EmptyPanelView = ({ addButton }: EmptyPanelViewProps) => {
  return (
    <div>
      <EuiSpacer size="xxl" />
      <EuiText textAlign="center">
        <h2>Start by adding your first visualization</h2>
        <EuiSpacer size="m" />
        <EuiText color="subdued" size="m">
          Use PPL Queries to fetch &amp; filter observability data and create visualizations
        </EuiText>
      </EuiText>
      <EuiSpacer size="m" />
      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem grow={false}>{addButton}</EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xxl" />
    </div>
  );
};

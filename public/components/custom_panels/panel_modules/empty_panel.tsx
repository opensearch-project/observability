/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import { EuiSpacer, EuiText, EuiFlexGroup, EuiFlexItem, EuiButton } from '@elastic/eui';
import React from 'react';

type Props = {
  addVizWindow: () => void;
  addVizDisabled: boolean;
};

// EmptyPanelView
// This Sub-component is shown to the user when a operational panel is empty
// Props:
// addVizWindow -> This function shows the add visualization window in operational panels view

export const EmptyPanelView = ({ addVizWindow, addVizDisabled }: Props) => {
  return (
    <div>
      <EuiSpacer size="xxl" />
      <EuiText textAlign="center">
        <h2>Start by adding your first visualization</h2>
        <EuiSpacer size="m" />
        <EuiText color="subdued" size="m">
          Use PPL Queries to fetch and filter Observability Data to Create Visualizations
        </EuiText>
      </EuiText>
      <EuiSpacer size="m" />
      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem grow={false}>
          <EuiButton fullWidth={false} disabled={addVizDisabled} fill onClick={addVizWindow}>
            Add Visualization
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xxl" />
    </div>
  );
};

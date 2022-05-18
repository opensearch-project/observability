/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiSpacer, EuiText, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import React, { useState } from 'react';
import { AddVisualizationPopover } from '../helpers/add_visualization_popover';

/*
 * EmptyPanelView - This Sub-component is shown to the user when a operational panel is empty
 *
 * Props taken in as params are:
 * addVizDisabled -> Boolean to enable/disable the add visualization button
 * getVizContextPanels -> Function to populate the add visualization popover
 */

interface EmptyPanelViewProps {
  addButton?: any;
  addVizDisabled: boolean;
  showFlyout: (isReplacement?: boolean, replaceVizId?: string) => void;
}

export const EmptyPanelView = ({
  addVizDisabled,
  showFlyout,
  addButton = <AddVisualizationPopover addVizDisabled={addVizDisabled} showFlyout={showFlyout} />,
}: EmptyPanelViewProps) => {
  return (
    <div>
      <EuiSpacer size="xxl" />
      <EuiText data-test-subj="addFirstVisualizationText" textAlign="center">
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

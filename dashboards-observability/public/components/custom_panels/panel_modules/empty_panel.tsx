/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiSpacer,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiPopover,
  EuiContextMenu,
} from '@elastic/eui';
import React, { useState } from 'react';

/*
 * EmptyPanelView - This Sub-component is shown to the user when a operational panel is empty
 *
 * Props taken in as params are:
 * addVizDisabled -> Boolean to enable/disable the add visualization button
 * getVizContextPanels -> Function to populate the add visualization popover
 */

interface Props {
  addVizDisabled: boolean;
  page?: string;
  getVizContextPanels: (
    closeVizPopover?: (() => void) | undefined
  ) => Array<{
    id: number;
    title: string;
    items: Array<{
      name: string;
      onClick: () => void;
    }>;
  }>;
  switchToEvent?: any;
}

export const EmptyPanelView = ({
  addVizDisabled,
  page,
  getVizContextPanels,
  switchToEvent,
}: Props) => {
  const [isVizPopoverOpen, setVizPopoverOpen] = useState(false);

  const onPopoverClick = () => {
    setVizPopoverOpen(!isVizPopoverOpen);
  };

  const closeVizPopover = () => {
    setVizPopoverOpen(false);
  };

  // Add Visualization Button
  const addVisualizationButton = (
    <EuiButton
      iconType="arrowDown"
      iconSide="right"
      disabled={addVizDisabled}
      onClick={onPopoverClick}
    >
      Add Visualization
    </EuiButton>
  );

  return (
    <div>
      <EuiSpacer size="xxl" />
      <EuiText textAlign="center">
        <h2>Start by adding your first visualization</h2>
        <EuiSpacer size="m" />
        <EuiText color="subdued" size="m">
          Use PPL Queries to fetch &amp; filter Observability Data and Create Visualizations
        </EuiText>
      </EuiText>
      <EuiSpacer size="m" />
      <EuiFlexGroup justifyContent="center">
        {page === 'app' ? (
          <EuiFlexItem grow={false}>
            <EuiButton isDisabled={addVizDisabled} onClick={switchToEvent}>
              Add Visualization
            </EuiButton>
          </EuiFlexItem>
        ) : (
          <EuiFlexItem grow={false}>
            <EuiPopover
              id="addVisualizationContextMenu"
              button={addVisualizationButton}
              isOpen={isVizPopoverOpen}
              closePopover={closeVizPopover}
              panelPaddingSize="none"
              anchorPosition="downLeft"
            >
              <EuiContextMenu initialPanelId={0} panels={getVizContextPanels(closeVizPopover)} />
            </EuiPopover>
          </EuiFlexItem>
        )}
      </EuiFlexGroup>
      <EuiSpacer size="xxl" />
    </div>
  );
};

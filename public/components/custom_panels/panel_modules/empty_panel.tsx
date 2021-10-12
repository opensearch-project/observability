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

import {
  EuiSpacer,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiContextMenuPanelDescriptor,
  EuiPopover,
  EuiContextMenu,
} from "@elastic/eui";
import React, { useState } from "react";

/*
 * EmptyPanelView
 * This Sub-component is shown to the user when a operational panel is empty
 * Props:
 * showFlyout -> This function shows the add visualization window in operational panels view
 */

type Props = {
  addVizDisabled: boolean;
  getVizContextPanels: (closeVizPopover?: (() => void) | undefined) => {
    id: number;
    title: string;
    items: {
      name: string;
      onClick: () => void;
    }[];
  }[];
};

export const EmptyPanelView = ({
  addVizDisabled,
  getVizContextPanels,
}: Props) => {
  const [isVizPopoverOpen, setVizPopoverOpen] = useState(false);

  const onPopoverClick = () => {
    setVizPopoverOpen(!isVizPopoverOpen);
  };

  const closeVizPopover = () => {
    setVizPopoverOpen(false);
  };

  //Add Visualization Button
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
          Use PPL Queries to fetch and filter Observability Data to Create
          Visualizations
        </EuiText>
      </EuiText>
      <EuiSpacer size="m" />
      <EuiFlexGroup justifyContent="center">
        <EuiFlexItem grow={false}>
          <EuiPopover
            id="addVisualizationContextMenu"
            button={addVisualizationButton}
            isOpen={isVizPopoverOpen}
            closePopover={closeVizPopover}
            panelPaddingSize="none"
            anchorPosition="downLeft"
          >
            <EuiContextMenu
              initialPanelId={0}
              panels={getVizContextPanels(closeVizPopover)}
            />
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xxl" />
    </div>
  );
};

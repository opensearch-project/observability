/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiButton, EuiContextMenu, EuiPopover } from '@elastic/eui';
import React, { useState } from 'react';

interface AddVisualizationPopoverProps {
  showFlyout: (isReplacement?: boolean, replaceVizId?: string) => void;
  addVizDisabled: boolean;
}

export const AddVisualizationPopover = ({
  addVizDisabled,
  showFlyout,
}: AddVisualizationPopoverProps) => {
  const [isVizPopoverOpen, setVizPopoverOpen] = useState(false); // Add Visualization Popover

  const onPopoverClick = () => {
    setVizPopoverOpen(!isVizPopoverOpen);
  };

  const closeVizPopover = () => {
    setVizPopoverOpen(false);
  };

  const advancedVisualization = () => {
    closeVizPopover();
    window.location.assign('#/event_analytics/explorer');
  };

  const getVizContextPanels = () => {
    return [
      {
        id: 0,
        title: 'Add visualization',
        items: [
          {
            name: 'Select existing visualization',
            onClick: () => {
              if (closeVizPopover != null) {
                closeVizPopover();
              }
              showFlyout();
            },
          },
          {
            name: 'Create new visualization',
            onClick: () => {
              advancedVisualization();
            },
          },
        ],
      },
    ];
  };

  const addVisualizationButton = (
    <EuiButton
      iconType="arrowDown"
      iconSide="right"
      disabled={addVizDisabled}
      onClick={onPopoverClick}
    >
      Add visualization
    </EuiButton>
  );
  return (
    <EuiPopover
      id="addVisualizationContextMenu"
      button={addVisualizationButton}
      isOpen={isVizPopoverOpen}
      closePopover={closeVizPopover}
      panelPaddingSize="none"
      anchorPosition="downLeft"
    >
      <EuiContextMenu initialPanelId={0} panels={getVizContextPanels()} />
    </EuiPopover>
  );
};

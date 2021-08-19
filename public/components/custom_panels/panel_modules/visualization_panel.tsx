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
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiContextMenu,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiContextMenuPanelDescriptor,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiPopover,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import React, { useEffect, useRef, useState } from 'react';
import { PlotSample } from './plot_sample';

// Visualization Panel module allows view added viz modules.

type Props = {
  editMode: boolean;
  visualizationId: string;
  visualizationTitle: string;
  data: any[];
  fromTime?: string;
  toTime?: string;
};

export const VisualizationPanel = ({
  editMode,
  visualizationId,
  visualizationTitle,
  data,
  fromTime,
  toTime,
}: Props) => {
  const [isPopoverOpen1, setIsPopoverOpen1] = useState(false);
  const [disablePopover, setDisablePopover] = useState(false);
  const onButtonClick1 = () => setIsPopoverOpen1((isPopoverOpen1) => !isPopoverOpen1);
  const closePopover1 = () => setIsPopoverOpen1(false);
  const plotRef = useRef(null);

  const popoverPanel = [
    <EuiContextMenuItem key="viewEvents" disabled={disablePopover}>
      View events <EuiIcon type="popout" style={{ marginLeft: '1vw' }} />
    </EuiContextMenuItem>,
    <EuiContextMenuItem key="Edit" disabled={disablePopover}>
      Edit
    </EuiContextMenuItem>,
    <EuiContextMenuItem key="Duplicate" disabled={disablePopover}>
      Duplicate
    </EuiContextMenuItem>,
    <EuiContextMenuItem key="Remove" disabled={disablePopover}>
      Remove
    </EuiContextMenuItem>,
  ];

  useEffect(() => {
    editMode ? setDisablePopover(true) : setDisablePopover(false);
  }, [editMode]);

  return (
    <EuiPanel style={{ width: '100%', height: '100%' }} grow={false}>
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiText grow={false}>
            <h5>{visualizationTitle}</h5>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiPopover
            button={<EuiButtonIcon iconType="boxesHorizontal" onClick={onButtonClick1} />}
            isOpen={isPopoverOpen1}
            closePopover={closePopover1}
            anchorPosition="downLeft"
          >
            <EuiContextMenuPanel items={popoverPanel} />
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>
      <div style={{ width: '100%', height: '90%', overflow: 'scroll' }}>
        <PlotSample data={data} />
      </div>
    </EuiPanel>
  );
};

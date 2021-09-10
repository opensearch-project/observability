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
  EuiButtonIcon,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiLoadingChart,
  EuiPanel,
  EuiPopover,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import { Plt } from '../../visualizations/plotly/plot';
import React, { useEffect, useRef, useState } from 'react';
import PPLService from '../../../services/requests/ppl';
import { getQueryResponse } from '../helpers/utils';

// Visualization Panel module allows view added viz modules.

type Props = {
  editMode: boolean;
  visualizationId: string;
  visualizationTitle: string;
  query: string;
  pplService: PPLService;
  type: string;
  fromTime: string;
  toTime: string;
  onRefresh: boolean;
  cloneVisualization: (
    newVisualizationTitle: string,
    pplQuery: string,
    newVisualizationType: string
  ) => void;
  deleteVisualization: (visualizationId: string, visualizationName: string) => void;
  pplFilterValue: string;
};

export const VisualizationContainer = ({
  editMode,
  visualizationId,
  visualizationTitle,
  pplService,
  query,
  type,
  fromTime,
  toTime,
  onRefresh,
  cloneVisualization,
  deleteVisualization,
  pplFilterValue,
}: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [disablePopover, setDisablePopover] = useState(false);
  const [visualizationData, setVisualizationData] = useState<Plotly.Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState('');
  const onActionsMenuClick = () => setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closeActionsMenu = () => setIsPopoverOpen(false);

  const popoverPanel = [
    <EuiContextMenuItem key="viewEvents" disabled={disablePopover}>
      View events <EuiIcon type="popout" style={{ marginLeft: '1vw' }} />
    </EuiContextMenuItem>,
    <EuiContextMenuItem key="Edit" disabled={disablePopover}>
      Edit
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="Duplicate"
      disabled={disablePopover}
      onClick={() => cloneVisualization(visualizationTitle, query, type)}
    >
      Duplicate
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="Remove"
      disabled={disablePopover}
      onClick={() => deleteVisualization(visualizationId, visualizationTitle)}
    >
      Remove
    </EuiContextMenuItem>,
  ];

  const loadVisaulization = async () => {
    await getQueryResponse(
      pplService,
      query,
      type,
      fromTime,
      toTime,
      setVisualizationData,
      setIsLoading,
      setIsError,
      pplFilterValue,
    );
  };

  useEffect(() => {
    loadVisaulization();
  }, [query, onRefresh]);

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
            button={<EuiButtonIcon iconType="boxesHorizontal" onClick={onActionsMenuClick} />}
            isOpen={isPopoverOpen}
            closePopover={closeActionsMenu}
            anchorPosition="downLeft"
          >
            <EuiContextMenuPanel items={popoverPanel} />
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>
      <div style={{ width: '100%', height: '90%', overflow: 'scroll', textAlign: 'center' }}>
        {isLoading ? (
          <EuiLoadingChart
            size="xl"
            mono
            style={{
              margin: 0,
              position: 'absolute',
              top: '50%',
              left: '50%',
              msTransform: 'translate(-50%, -50%)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ) : isError != '' ? (
          <div
            style={{
              overflow: 'scroll',
            }}
          >
            <EuiSpacer size="l" />
            <EuiIcon type="alert" color="danger" size="l" />
            <EuiSpacer size="l" />
            <EuiText>
              <h2>Error in rendering the visualizaiton</h2>
            </EuiText>
            <EuiSpacer size="l" />
            <EuiText>
              <p>{isError}</p>
            </EuiText>
          </div>
        ) : (
          <Plt data={visualizationData} />
        )}
      </div>
    </EuiPanel>
  );
};

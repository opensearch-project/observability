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
import React, { useEffect, useMemo, useRef, useState } from 'react';
import PPLService from '../../../services/requests/ppl';
import { displayVisualization, getQueryResponse } from '../helpers/utils';
import './visualization_container.scss';

// Visualization Panel module allows view added viz modules.

type Props = {
  editMode: boolean;
  visualizationId: string;
  visualizationTitle: string;
  query: string;
  pplService: PPLService;
  type: string;
  timeField: string;
  fromTime: string;
  toTime: string;
  onRefresh: boolean;
  cloneVisualization: (
    newVisualizationTitle: string,
    pplQuery: string,
    newVisualizationType: string,
    newVisualizationTimeField: string
  ) => void;
  deleteVisualization: (visualizationId: string, visualizationName: string) => void;
  pplFilterValue: string;
  showFlyout: (isReplacement?: boolean | undefined, replaceVizId?: string | undefined) => void;
  removeVisualization: (visualizationId: string, visualizationName: string) => void;
};

export const VisualizationContainer = ({
  editMode,
  visualizationId,
  visualizationTitle,
  pplService,
  query,
  type,
  timeField,
  fromTime,
  toTime,
  onRefresh,
  cloneVisualization,
  deleteVisualization,
  pplFilterValue,
  showFlyout,
  removeVisualization,
}: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [disablePopover, setDisablePopover] = useState(false);
  const [visualizationData, setVisualizationData] = useState<Plotly.Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState('');
  const onActionsMenuClick = () => setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closeActionsMenu = () => setIsPopoverOpen(false);

  const popoverPanel = [
    <EuiContextMenuItem
      key="Edit"
      disabled={disablePopover}
      onClick={() => {
        closeActionsMenu();
        showFlyout(true, visualizationId);
      }}
    >
      Replace
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="Duplicate"
      disabled={disablePopover}
      onClick={() => {
        closeActionsMenu();
        cloneVisualization(visualizationTitle, query, type, timeField);
      }}
    >
      Duplicate
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
      timeField
    );
  };

  const memoisedVisualizationBox = useMemo(
    () => (
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
              position: 'relative',
              top: '50%',
              left: '50%',
              msTransform: 'translate(-50%, -50%)',
              transform: 'translate(-50%, -50%)',
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
          displayVisualization(visualizationData, type)
        )}
      </div>
    ),
    [onRefresh, isLoading, isError, visualizationData, type]
  );

  useEffect(() => {
    loadVisaulization();
  }, [onRefresh]);

  useEffect(() => {
    editMode ? setDisablePopover(true) : setDisablePopover(false);
  }, [editMode]);

  return (
    <EuiPanel style={{ width: '100%', height: '100%' }} grow={false}>
      <div className={editMode ? 'mouseGrabber' : ''}>
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <EuiText grow={false}>
              <h5>{visualizationTitle}</h5>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            {disablePopover ? (
              <EuiIcon
                type="crossInACircleFilled"
                onClick={() => {
                  removeVisualization(visualizationId, visualizationTitle);
                }}
              />
            ) : (
              <EuiPopover
                button={
                  <EuiButtonIcon
                    aria-label="actionMenuButton"
                    iconType="boxesHorizontal"
                    onClick={onActionsMenuClick}
                  />
                }
                isOpen={isPopoverOpen}
                closePopover={closeActionsMenu}
                anchorPosition="downLeft"
              >
                <EuiContextMenuPanel items={popoverPanel} />
              </EuiPopover>
            )}
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
      {memoisedVisualizationBox}
    </EuiPanel>
  );
};

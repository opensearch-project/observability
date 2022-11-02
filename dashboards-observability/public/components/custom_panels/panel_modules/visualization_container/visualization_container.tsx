/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
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
  EuiToolTip,
} from '@elastic/eui';
import React, { useEffect, useMemo, useState } from 'react';
import { CoreStart } from '../../../../../../../src/core/public';
import PPLService from '../../../../services/requests/ppl';
import {
  displayVisualization,
  renderCatalogVisualization,
  renderSavedVisualization,
} from '../../helpers/utils';
import './visualization_container.scss';

/*
 * Visualization container - This module is a placeholder to add visualizations in react-grid-layout
 *
 * Props taken in as params are:
 * editMode: boolean to check if the panel is in edit mode
 * visualizationId: unique visualization id
 * visualizationTitle: visualization name
 * query: ppl query to load the visualization
 * pplService: ppl requestor service
 * type: type of visualization [bar, horizontal_bar, line]
 * fromTime: start time in date filter
 * toTime: end time in date filter
 * onRefresh: boolean value to trigger refresh of visualizations
 * cloneVisualization: function to clone a visualization in panel
 * pplFilterValue: string with panel PPL filter value
 * showFlyout: function to show the flyout
 * removeVisualization: function to remove all the visualizations
 * catalogVisualization: boolean pointing if the container is used for catalog metrics
 * spanParam: Override the span(timestamp, 1h) in visualization to span(timestamp, spanParam)
 */

interface Props {
  http: CoreStart['http'];
  editMode: boolean;
  visualizationId: string;
  savedVisualizationId: string;
  pplService: PPLService;
  fromTime: string;
  toTime: string;
  onRefresh: boolean;
  pplFilterValue: string;
  usedInNotebooks?: boolean;
  onEditClick: (savedVisualizationId: string) => any;
  cloneVisualization?: (visualzationTitle: string, savedVisualizationId: string) => void;
  showFlyout?: (isReplacement?: boolean | undefined, replaceVizId?: string | undefined) => void;
  removeVisualization?: (visualizationId: string) => void;
  catalogVisualization?: boolean;
  spanParam?: string;
}

export const VisualizationContainer = ({
  http,
  editMode,
  visualizationId,
  savedVisualizationId,
  pplService,
  fromTime,
  toTime,
  onRefresh,
  pplFilterValue,
  usedInNotebooks,
  onEditClick,
  cloneVisualization,
  showFlyout,
  removeVisualization,
  catalogVisualization,
  spanParam,
}: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [disablePopover, setDisablePopover] = useState(false);
  const [visualizationTitle, setVisualizationTitle] = useState('');
  const [visualizationType, setVisualizationType] = useState('');
  const [visualizationMetaData, setVisualizationMetaData] = useState();
  const [visualizationData, setVisualizationData] = useState<Plotly.Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState('');
  const onActionsMenuClick = () => setIsPopoverOpen((currPopoverOpen) => !currPopoverOpen);
  const closeActionsMenu = () => setIsPopoverOpen(false);

  let popoverPanel = [
    <EuiContextMenuItem
      data-test-subj="editVizContextMenuItem"
      key="Edit"
      disabled={disablePopover}
      onClick={() => {
        closeActionsMenu();
        onEditClick(savedVisualizationId);
      }}
    >
      Edit
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="Replace"
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
        cloneVisualization(visualizationTitle, savedVisualizationId);
      }}
    >
      Duplicate
    </EuiContextMenuItem>,
  ];

  if (usedInNotebooks) {
    popoverPanel = [popoverPanel[0]];
  }

  const loadVisaulization = async () => {
    if (catalogVisualization)
      await renderCatalogVisualization(
        http,
        pplService,
        savedVisualizationId,
        fromTime,
        toTime,
        pplFilterValue,
        spanParam,
        setVisualizationTitle,
        setVisualizationType,
        setVisualizationData,
        setVisualizationMetaData,
        setIsLoading,
        setIsError
      );
    else
      await renderSavedVisualization(
        http,
        pplService,
        savedVisualizationId,
        fromTime,
        toTime,
        pplFilterValue,
        spanParam,
        setVisualizationTitle,
        setVisualizationType,
        setVisualizationData,
        setVisualizationMetaData,
        setIsLoading,
        setIsError
      );
  };

  const memoisedVisualizationBox = useMemo(
    () => (
      <div className="visualization-div">
        {isLoading ? (
          <EuiLoadingChart size="xl" mono className="visualization-loading-chart" />
        ) : isError !== '' ? (
          <div className="visualization-error-div">
            <EuiIcon type="alert" color="danger" size="s" />
            <EuiSpacer size="s" />
            <EuiText size="s">
              <p>{isError}</p>
            </EuiText>
          </div>
        ) : (
          displayVisualization(visualizationMetaData, visualizationData, visualizationType)
        )}
      </div>
    ),
    [onRefresh, isLoading, isError, visualizationData, visualizationType, visualizationMetaData]
  );

  useEffect(() => {
    loadVisaulization();
  }, [onRefresh]);

  useEffect(() => {
    editMode ? setDisablePopover(true) : setDisablePopover(false);
  }, [editMode]);

  return (
    <EuiPanel
      data-test-subj={`${visualizationTitle}VisualizationPanel`}
      className="panel-full-width"
      grow={false}
    >
      <div className={editMode ? 'mouseGrabber' : ''}>
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem
            style={{
              width: '35%',
            }}
          >
            <EuiText grow={false} className="panels-title-text">
              <EuiToolTip delay="long" position="top" content={visualizationTitle}>
                <h5>{visualizationTitle}</h5>
              </EuiToolTip>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem grow={false} className="visualization-action-button">
            {disablePopover ? (
              <EuiIcon
                type="crossInACircleFilled"
                onClick={() => {
                  removeVisualization(visualizationId);
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

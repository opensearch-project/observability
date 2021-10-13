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
} from "@elastic/eui";
import React, { useEffect, useMemo, useState } from "react";
import PPLService from "../../../../services/requests/ppl";
import { displayVisualization, getQueryResponse } from "../../helpers/utils";
import "./visualization_container.scss";

// Visualization Panel module allows view added viz modules.

/*
 * Visualization container - This module is places all visualizations in react-grid-layout
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
 */

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
  pplFilterValue: string;
  showFlyout: (
    isReplacement?: boolean | undefined,
    replaceVizId?: string | undefined
  ) => void;
  removeVisualization: (
    visualizationId: string,
    visualizationName: string
  ) => void;
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
  pplFilterValue,
  showFlyout,
  removeVisualization,
}: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [disablePopover, setDisablePopover] = useState(false);
  const [visualizationData, setVisualizationData] = useState<Plotly.Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const onActionsMenuClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
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
      <div className="visualization-div">
        {isLoading ? (
          <EuiLoadingChart size="xl" mono className="visualization-loading-chart" />
        ) : isError != "" ? (
          <div className="visualization-error-div">
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
    <EuiPanel className="panel-full-width" grow={false}>
      <div className={editMode ? "mouseGrabber" : ""}>
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

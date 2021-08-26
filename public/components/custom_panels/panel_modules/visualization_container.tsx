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
import React, { useEffect, useRef, useState } from 'react';
import PPLService from '../../../services/requests/ppl';
import { PlotSample } from '../helpers/plot_sample';
import { getQueryResponse } from '../helpers/utils';

// Visualization Panel module allows view added viz modules.

type Props = {
  editMode: boolean;
  visualizationId: string;
  visualizationTitle: string;
  query: string;
  pplService: PPLService;
  type: string;
  fromTime?: string;
  toTime?: string;
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
}: Props) => {
  const [isPopoverOpen1, setIsPopoverOpen1] = useState(false);
  const [disablePopover, setDisablePopover] = useState(false);
  const [visualizationData, setVisualizationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState('');
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
    getQueryResponse(pplService, query, type, setVisualizationData, setIsLoading, setIsError);
  }, [query]);

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
          <PlotSample data={visualizationData} />
        )}
      </div>
    </EuiPanel>
  );
};

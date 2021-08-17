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
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiGlobalToastList,
  EuiPage,
  EuiPageBody,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiSpacer,
  EuiSuperDatePicker,
  EuiTitle,
} from '@elastic/eui';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';
import _ from 'lodash';
import React, { ReactChild, useCallback, useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { CoreStart } from '../../../../../src/core/public';
import { EmptyPanelView } from './sub_components/empty_panel_view';
import { AddVizView } from './sub_components/add_visualization';
import { VisualizationPanel } from './sub_components/visualization_panel';
import { CUSTOM_PANELS_API_PREFIX } from '../../../common/constants/custom_panels';

// "CustomPanelsView" module used to render saved Custom Operational Panels

type Props = {
  panelId: string;
  panelType: string;
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  parentBreadcrumb: { text: string; href: string }[];
};

type VisualizationType = {
  id: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  fromTime?: string;
  toTime?: string;
};

// HOC container to provide dynamic width for Grid layout
const ResponsiveGridLayout = WidthProvider(Responsive);

export const CustomPanelView = ({ panelId, panelType, http, chrome, parentBreadcrumb }: Props) => {
  const [openPanelName, setOpenPanelName] = useState('');
  const [panelCreatedTime, setPanelCreatedTime] = useState('');
  const [toasts, setToasts] = useState<Array<Toast>>([]);
  const [filterBarValue, setFilterBarValue] = useState('');
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');
  const [isPaused, setIsPaused] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState();
  const [inputDisabled, setInputDisabled] = useState(true);
  const [showVizPanel, setShowVizPanel] = useState(false);
  const [panelVisualizations, setPanelVisualizations] = useState<Array<VisualizationType>>([
    // { id: '1', title: 'Viz 1', x: 0, y: 0, w: 1, h: 2 },
    // { id: '2', title: 'Viz 2', x: 1, y: 0, w: 3, h: 2 },
  ]);

  const layout = [
    { i: '1', x: 0, y: 0, w: 1, h: 2 },
    { i: '2', x: 1, y: 0, w: 1, h: 2 },
    // { i: '3', x: 2, y: 0, w: 1, h: 2 },
    // { i: '4', x: 3, y: 0, w: 1, h: 2 },
    // { i: '5', x: 4, y: 0, w: 1, h: 2 },
    // { i: '6', x: 5, y: 0, w: 1, h: 2 },
    // { i: '7', x: 6, y: 0, w: 1, h: 2 },
    // { i: '8', x: 7, y: 0, w: 1, h: 2 },
    // { i: '9', x: 8, y: 0, w: 1, h: 2 },
    // { i: '10', x: 9, y: 0, w: 1, h: 2 },
    // { i: '11', x: 10, y: 0, w: 1, h: 2 },
    // { i: '12', x: 11, y: 0, w: 1, h: 2 },
  ];

  const onTimeChange = ({ start, end }) => {
    const recentlyUsedRange = recentlyUsedRanges.filter((recentlyUsedRange) => {
      const isDuplicate = recentlyUsedRange.start === start && recentlyUsedRange.end === end;
      return !isDuplicate;
    });
    recentlyUsedRange.unshift({ start, end });
    setStart(start);
    setEnd(end);
    setRecentlyUsedRanges(
      recentlyUsedRange.length > 10 ? recentlyUsedRange.slice(0, 9) : recentlyUsedRange
    );
    setIsLoading(true);
    startLoading();
  };

  const startLoading = () => {
    setTimeout(stopLoading, 1000);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const fetchCustomPanel = async () => {
    return http
      .get(`${CUSTOM_PANELS_API_PREFIX}/panels/${panelId}`)
      .then((res) => {
        setOpenPanelName(res.panel.name);
        setPanelCreatedTime(res.panel.dateCreated);
        setPanelVisualizations(res.panel.visualizations);
      })
      .catch((err) => {
        console.error('Issue in fetching the custom operational panels', err);
      });
  };

  const closeVizWindow = () => {
    setShowVizPanel(false);
    // setIsPanelEmpty(true);
  };

  const addVizWindow = () => {
    setShowVizPanel(true);
    // setIsPanelEmpty(false);
  };


  const loadVisualizations = () => {
    return panelVisualizations.map((panelVisualization: VisualizationType, index: number) => {
      return (<div key={panelVisualization.id}>
        <VisualizationPanel
          visualizationId={panelVisualization.id}
          visualizationTitle={panelVisualization.title}
        />
      </div>)
    });
  }

  useEffect(() => {
    fetchCustomPanel();
  }, []);

  useEffect(()=>{
    chrome.setBreadcrumbs([
      ...parentBreadcrumb,
      { text: openPanelName, href: `${_.last(parentBreadcrumb).href}${panelId}` },
    ]);
  }, [openPanelName]);

  const onChange = (e) => {
    setFilterBarValue(e.target.value);
  };

  return (
    <div>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={(removedToast) => {
          setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
        }}
        toastLifeTimeMs={6000}
      />
      <EuiPage>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>{openPanelName}</h1>
              </EuiTitle>
              <EuiFlexItem>
                <EuiSpacer size="s" />
              </EuiFlexItem>
              Created on {panelCreatedTime}
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
              <EuiFlexGroup gutterSize="s">
                <EuiFlexItem>
                  <EuiButton color="danger">Delete</EuiButton>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiButton>Export</EuiButton>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiButton>Edit name</EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPageHeaderSection>
          </EuiPageHeader>

          <EuiPageContentBody>
            <EuiFlexGroup gutterSize="s">
              <EuiFlexItem>
                <EuiFieldText
                  placeholder="Use PPL to query log indices below. Use “source=” to quickly switch to a different index."
                  value={filterBarValue}
                  fullWidth={true}
                  onChange={(e) => onChange(e)}
                  disabled={inputDisabled}
                />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiSuperDatePicker
                  isLoading={isLoading}
                  start={start}
                  end={end}
                  onTimeChange={onTimeChange}
                  showUpdateButton={false}
                  isDisabled={inputDisabled}
                />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton isDisabled={inputDisabled}>Refresh</EuiButton>
              </EuiFlexItem>
              <EuiFlexItem grow={false} onClick={addVizWindow}>
                <EuiButton fill>Add visualization</EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer size="l" />
            {panelVisualizations.length == 0 ? (
              !showVizPanel && <EmptyPanelView addVizWindow={addVizWindow} />
            ) : (
              <ResponsiveGridLayout
                layouts={{ lg: layout, md: layout, sm: layout }}
                style={{ minWidth: '100%', maxWidth: '100%' }}
                className="layout"
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 12, sm: 12, xs: 1, xxs: 1 }}
              >
                {loadVisualizations()}
              </ResponsiveGridLayout>
            )}
            <>{showVizPanel && <AddVizView closeVizWindow={closeVizWindow} />}</>
          </EuiPageContentBody>
        </EuiPageBody>
      </EuiPage>
    </div>
  );
};

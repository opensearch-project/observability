/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './index.scss';
import {
  EuiButtonIcon,
  EuiPage,
  EuiPageBody,
  htmlIdGenerator,
  OnTimeChangeProps,
  ShortDate,
} from '@elastic/eui';
import { DurationRange } from '@elastic/eui/src/components/date_picker/types';
import React, { useEffect, useState } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames';
import { StaticContext } from 'react-router-dom';
import { ChromeBreadcrumb, CoreStart } from '../../../../../src/core/public';
import { getMinSpanInterval, getNewVizDimensions, onTimeChange } from './helpers/utils';
import { Sidebar } from './sidebar/sidebar';
import { EmptyMetricsView } from './view/empty_view';
import PPLService from '../../services/requests/ppl';
import { TopMenu } from './top_menu/top_menu';
import { MetricData, MetricType } from '../../../common/types/metrics';
import { MetricsGrid } from './view/metrics_grid';
import { useDispatch, useSelector } from 'react-redux';
import {
  deSelectMetric,
  selectedMetricsSelector,
  selectMetric,
} from './redux/slices/metrics_slice';
import { resolutionOptions } from '../../../common/constants/metrics';

interface MetricsProps {
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  parentBreadcrumb: ChromeBreadcrumb;
  renderProps: RouteComponentProps<any, StaticContext, any>;
  pplService: PPLService;
}

export const Home = ({ http, chrome, parentBreadcrumb, renderProps, pplService }: MetricsProps) => {
  // Date picker constants
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState<DurationRange[]>([]);
  const [startTime, setStartTime] = useState<ShortDate>('now-1d');
  const [endTime, setEndTime] = useState<ShortDate>('now');
  const [dateDisabled, setDateDisabled] = useState(false);

  // Top panel
  const [IsTopPanelDisabled, setIsTopPanelDisabled] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [onRefresh, setOnRefresh] = useState(false);
  const [editActionType, setEditActionType] = useState('');
  const [resolutionValue, setResolutionValue] = useState(resolutionOptions[2].value);
  const [spanValue, setSpanValue] = useState(1);
  const resolutionSelectId = htmlIdGenerator('resolutionSelect')();

  // Side bar constants
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  // Metrics constants
  const [panelVisualizations, setPanelVisualizations] = useState<MetricType[]>([]);
  const dispatch = useDispatch();
  const selectedMetrics = useSelector(selectedMetricsSelector);

  const handleAddMetric = (metric: any) => dispatch(selectMetric(metric));

  const handleRemoveMetric = (metric: any) => {
    dispatch(deSelectMetric(metric));
  };

  const onRefreshFilters = (startTime: ShortDate, endTime: ShortDate) => {
    console.log('spanParam', spanValue + resolutionValue);
    // const autoResolutionValue = getMinSpanInterval(startTime, endTime);
    // setResolutionValue(
    //   resolutionOptions.filter((option) => option.value === autoResolutionValue)[0].value
    // );
    setOnRefresh(!onRefresh);
  };

  const onDatePickerChange = (props: OnTimeChangeProps) => {
    onTimeChange(
      props.start,
      props.end,
      recentlyUsedRanges,
      setRecentlyUsedRanges,
      setStartTime,
      setEndTime
    );
    onRefreshFilters(props.start, props.end);
  };

  const onEditClick = (savedVisualizationId: string) => {
    window.location.assign(`#/event_analytics/explorer/${savedVisualizationId}`);
  };

  const updateVisualizations = (selectedMetrics: MetricData[]) => {
    let metricVisualizations: MetricType[] = [];

    selectedMetrics.map((selectedMetric: any, index: number) => {
      const newDimensions = getNewVizDimensions(metricVisualizations);

      const metricVisualization: MetricType = {
        id: index + '',
        savedVisualizationId: selectedMetric.id,
        x: newDimensions.x,
        y: newDimensions.y,
        h: newDimensions.h,
        w: newDimensions.w,
        metricType:
          selectedMetric.catalog === 'CUSTOM_METRICS' ? 'savedCustomMetric' : 'prometheusMetric',
      };
      metricVisualizations.push(metricVisualization);
    });

    setPanelVisualizations(metricVisualizations);
  };

  const reloadVisualizations = () => {
    updateVisualizations(selectedMetrics);
  };

  const onSideBarClick = () => {
    console.log('side bar clicked');
    setIsSidebarClosed((staleState) => {
      return !staleState;
    });
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  };

  useEffect(() => {
    selectedMetrics.length > 0 ? setIsTopPanelDisabled(false) : setIsTopPanelDisabled(true);
    updateVisualizations(selectedMetrics);
    console.log('selectedMetrics', selectedMetrics);
    setOnRefresh(!onRefresh);
  }, [selectedMetrics]);

  const mainSectionClassName = classNames({
    'col-md-9': !isSidebarClosed,
    'col-md-12': isSidebarClosed,
  });

  return (
    <>
      <Route
        exact
        path="/metrics"
        render={(props) => (
          <div>
            <EuiPage>
              <EuiPageBody component="div">
                <TopMenu
                  IsTopPanelDisabled={IsTopPanelDisabled}
                  setIsTopPanelDisabled={setIsTopPanelDisabled}
                  startTime={startTime}
                  endTime={endTime}
                  onDatePickerChange={onDatePickerChange}
                  recentlyUsedRanges={recentlyUsedRanges}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  setEditActionType={setEditActionType}
                  reloadVisualizations={reloadVisualizations}
                  panelVisualizations={panelVisualizations}
                  setPanelVisualizations={setPanelVisualizations}
                  resolutionValue={resolutionValue}
                  setResolutionValue={setResolutionValue}
                  spanValue={spanValue}
                  setSpanValue={setSpanValue}
                  resolutionSelectId={resolutionSelectId}
                />
                <div className="dscAppContainer">
                  <div className="col-md-3 dscSidebar__container dscCollapsibleSidebar">
                    <div className="">
                      {!isSidebarClosed && <Sidebar http={http} pplService={pplService} />}
                      <EuiButtonIcon
                        iconType={isSidebarClosed ? 'menuRight' : 'menuLeft'}
                        iconSize="m"
                        size="s"
                        onClick={() => onSideBarClick()}
                        data-test-subj="collapseSideBarButton"
                        aria-controls="discover-sidebar"
                        aria-expanded={isSidebarClosed ? 'false' : 'true'}
                        aria-label="Toggle sidebar"
                        className="dscCollapsibleSidebar__collapseButton"
                      />
                    </div>
                  </div>
                  <div className={`dscWrapper ${mainSectionClassName}`}>
                    {selectedMetrics.length > 0 ? (
                      <MetricsGrid
                        http={http}
                        chrome={chrome}
                        panelVisualizations={panelVisualizations}
                        setPanelVisualizations={setPanelVisualizations}
                        editMode={editMode}
                        pplService={pplService}
                        startTime={startTime}
                        endTime={endTime}
                        setStartTime={setStartTime}
                        setEndTime={setEndTime}
                        moveToEvents={onEditClick}
                        onRefresh={onRefresh}
                        editActionType={editActionType}
                        spanParam={spanValue + resolutionValue}
                      />
                    ) : (
                      <EmptyMetricsView />
                    )}
                  </div>
                </div>
              </EuiPageBody>
            </EuiPage>
          </div>
        )}
      />
    </>
  );
};

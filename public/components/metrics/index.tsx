/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './index.scss';
import {
  EuiButtonIcon,
  EuiGlobalToastList,
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
import { ChromeBreadcrumb, CoreStart, Toast } from '../../../../../src/core/public';
import { onTimeChange } from './helpers/utils';
import { Sidebar } from './sidebar/sidebar';
import { EmptyMetricsView } from './view/empty_view';
import PPLService from '../../services/requests/ppl';
import { TopMenu } from './top_menu/top_menu';
import { MetricType } from '../../../common/types/metrics';
import { MetricsGrid } from './view/metrics_grid';
import { useSelector } from 'react-redux';
import { metricsLayoutSelector, selectedMetricsSelector } from './redux/slices/metrics_slice';
import { resolutionOptions } from '../../../common/constants/metrics';
import SavedObjects from '../../services/saved_objects/event_analytics/saved_objects';

interface MetricsProps {
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  parentBreadcrumb: ChromeBreadcrumb;
  renderProps: RouteComponentProps<any, StaticContext, any>;
  pplService: PPLService;
  savedObjects: SavedObjects;
}

export const Home = ({
  http,
  chrome,
  parentBreadcrumb,
  renderProps,
  pplService,
  savedObjects,
}: MetricsProps) => {
  // Redux tools
  const selectedMetrics = useSelector(selectedMetricsSelector);
  const metricsLayout = useSelector(metricsLayoutSelector);

  // Date picker constants
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState<DurationRange[]>([]);
  const [startTime, setStartTime] = useState<ShortDate>('now-1d');
  const [endTime, setEndTime] = useState<ShortDate>('now');

  // Top panel
  const [IsTopPanelDisabled, setIsTopPanelDisabled] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [onRefresh, setOnRefresh] = useState(false);
  const [editActionType, setEditActionType] = useState('');
  const [resolutionValue, setResolutionValue] = useState(resolutionOptions[2].value);
  const [spanValue, setSpanValue] = useState(1);
  const resolutionSelectId = htmlIdGenerator('resolutionSelect')();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastRightSide, setToastRightSide] = useState<boolean>(true);

  // Side bar constants
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  // Metrics constants
  const [panelVisualizations, setPanelVisualizations] = useState<MetricType[]>([]);

  const setToast = (title: string, color = 'success', text?: ReactChild, side?: string) => {
    if (!text) text = '';
    setToastRightSide(!side ? true : false);
    setToasts([...toasts, { id: new Date().toISOString(), title, text, color } as Toast]);
  };

  const onRefreshFilters = (startTime: ShortDate, endTime: ShortDate) => {
    if (spanValue < 1) {
      setToast('Please add a valid span interval', 'danger');
      return;
    }
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

  const onSideBarClick = () => {
    setIsSidebarClosed((staleState) => {
      return !staleState;
    });
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  };

  useEffect(() => {
    if (!editMode) {
      selectedMetrics.length > 0 ? setIsTopPanelDisabled(false) : setIsTopPanelDisabled(true);
    } else {
      setIsTopPanelDisabled(true);
    }
  }, [selectedMetrics, editMode]);

  useEffect(() => {
    setPanelVisualizations(metricsLayout);
  }, [metricsLayout]);

  const mainSectionClassName = classNames({
    'col-md-10': !isSidebarClosed,
    'col-md-12': isSidebarClosed,
  });

  const sidebarClassName = classNames({
    closed: isSidebarClosed,
  });

  return (
    <>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={(removedToast) => {
          setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
        }}
        side={toastRightSide ? 'right' : 'left'}
        toastLifeTimeMs={6000}
      />
      <Route
        exact
        path="/metrics"
        render={(props) => (
          <div>
            <EuiPage>
              <EuiPageBody component="div">
                <TopMenu
                  http={http}
                  IsTopPanelDisabled={IsTopPanelDisabled}
                  startTime={startTime}
                  endTime={endTime}
                  onDatePickerChange={onDatePickerChange}
                  recentlyUsedRanges={recentlyUsedRanges}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  setEditActionType={setEditActionType}
                  panelVisualizations={panelVisualizations}
                  setPanelVisualizations={setPanelVisualizations}
                  resolutionValue={resolutionValue}
                  setResolutionValue={setResolutionValue}
                  spanValue={spanValue}
                  setSpanValue={setSpanValue}
                  resolutionSelectId={resolutionSelectId}
                  savedObjects={savedObjects}
                  setToast={setToast}
                />
                <div className="dscAppContainer">
                  <div
                    className={`col-md-2 dscSidebar__container dscCollapsibleSidebar ${sidebarClassName}`}
                  >
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

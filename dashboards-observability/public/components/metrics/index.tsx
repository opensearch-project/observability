/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable no-console */

import './index.scss';
import {
  EuiButtonIcon,
  EuiPage,
  EuiPageBody,
  EuiSpacer,
  EuiSuperDatePicker,
  EuiSuperDatePickerProps,
  EuiText,
  EuiTitle,
  EuiTabbedContent,
  OnRefreshChangeProps,
  OnRefreshProps,
  OnTimeChangeProps,
  ShortDate,
  EuiPageContentBody,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';
import { DurationRange } from '@elastic/eui/src/components/date_picker/types';
import React, { Fragment, useEffect, useState } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { StaticContext } from 'react-router-dom';
import { CUSTOM_PANELS_API_PREFIX } from ' ../../../common/constants/custom_panels';
import { uiSettingsService } from '../../../common/utils';
import { ChromeBreadcrumb, CoreStart } from '../../../../../src/core/public';
import { onTimeChange } from './helpers/utils';
import { Sidebar } from './sidebar/sidebar';
import { EmptyMetricsView } from './view/empty_view';
// import { metricsSelector } from './redux/slices/metrics_slice';

interface MetricsProps {
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  parentBreadcrumb: ChromeBreadcrumb;
  renderProps: RouteComponentProps<any, StaticContext, any>;
}

export const Home = ({ http, chrome, parentBreadcrumb, renderProps }: MetricsProps) => {
  // Date picker constants
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState<DurationRange[]>([]);
  const [start, setStart] = useState<ShortDate>('now-30m');
  const [end, setEnd] = useState<ShortDate>('now');
  const [dateDisabled, setDateDisabled] = useState(false);

  // Side bar constants
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  // const metricsList = useSelector(metricsSelector);

  // Using Visualizations for recently created custom metrics for now
  const [visualizationsList, setVisualizationsList] = useState<any>([]);
  // Fetch Saved Visualizations
  const fetchVisualizations = async () => {
    let savedVisualizations;
    await http
      .get(`${CUSTOM_PANELS_API_PREFIX}/visualizations/`)
      .then((res) => {
        setVisualizationsList(res.visualizations);
      })
      .catch((err) => {
        console.error('Issue in fetching all saved visualizations', err);
      });
    return savedVisualizations;
  };
  useEffect(() => {
    fetchVisualizations();
  }, []);

  // Date Picker functions
  // Empty functions for now
  const onRefreshFilters = (startTime: ShortDate, endTime: ShortDate) => {};
  const onDatePickerChange = (props: OnTimeChangeProps) => {
    onTimeChange(
      props.start,
      props.end,
      recentlyUsedRanges,
      setRecentlyUsedRanges,
      setStart,
      setEnd
    );
    onRefreshFilters(props.start, props.end);
  };

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
                <EuiFlexGroup gutterSize="s" justifyContent="flexEnd">
                  <EuiFlexItem grow={false}>
                    <EuiSuperDatePicker
                      dateFormat={uiSettingsService.get('dateFormat')}
                      start={start}
                      end={end}
                      onTimeChange={onDatePickerChange}
                      recentlyUsedRanges={recentlyUsedRanges}
                      isDisabled={dateDisabled}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
                <div className="dscAppContainer">
                  <div className="col-md-3 dscSidebar__container dscCollapsibleSidebar">
                    <div className="">
                      {!isSidebarClosed && <Sidebar />}
                      <EuiButtonIcon
                        iconType={isSidebarClosed ? 'menuRight' : 'menuLeft'}
                        iconSize="m"
                        size="s"
                        onClick={() => {
                          setIsSidebarClosed((staleState) => {
                            return !staleState;
                          });
                        }}
                        data-test-subj="collapseSideBarButton"
                        aria-controls="discover-sidebar"
                        aria-expanded={isSidebarClosed ? 'false' : 'true'}
                        aria-label="Toggle sidebar"
                        className="dscCollapsibleSidebar__collapseButton"
                      />
                    </div>
                  </div>
                  <div className={`dscWrapper ${mainSectionClassName}`}>
                    <div className="dscWrapper__content">
                      <div className="dscResults">
                        <EmptyMetricsView />
                      </div>
                    </div>
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

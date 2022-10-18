/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './index.scss';
import {
  EuiButtonIcon,
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
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
import React, { Fragment, useState } from 'react';
import { StaticContext } from 'react-router-dom';
import { Route, RouteComponentProps } from 'react-router-dom';
import { uiSettingsService } from '../../../common/utils';
import { ChromeBreadcrumb, CoreStart } from '../../../../../src/core/public';
import { ObservabilitySideBar } from '../common/side_nav';
import { onTimeChange } from './helpers/utils';
import { Sidebar } from './sidebar/sidebar';
import { EuiAccordion } from '@opensearch-project/oui';
import { EmptyMetricsView } from './view/empty_view';

interface MetricsProps {
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  parentBreadcrumb: ChromeBreadcrumb;
  renderProps: RouteComponentProps<any, StaticContext, any>;
}

export const Home = ({
  http,
  chrome,
  parentBreadcrumb,
  renderProps,
}: MetricsProps) => {

  // Date picker constants
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState<DurationRange[]>([]);
  const [start, setStart] = useState<ShortDate>('now-30m');
  const [end, setEnd] = useState<ShortDate>('now');
  const [dateDisabled, setDateDisabled] = useState(false);

  // Side bar constants
  const [ isSidebarClosed, setIsSidebarClosed ] = useState(false);
  const recentlyCreatedFields = ['1', '2', '3', '4']

  const onRefreshFilters = (startTime: ShortDate, endTime: ShortDate) => {
    // if (!isDateValid(convertDateTime(startTime), convertDateTime(endTime, false), setToast)) {
    //   return;
    // }

    console.log('refreshed date picker');
  };

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

  return (
    <>
      <Route
        exact
        path="/metrics"
        render={(props) => (
          <div>
            <EuiPage>
              <EuiPageBody component="div">
                {/* <EuiPageHeader>
                  <EuiPageHeaderSection>
                    <EuiTitle size="l">
                      <h1>Metrics</h1>
                    </EuiTitle>
                  </EuiPageHeaderSection>
                </EuiPageHeader> */}
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
                {/* <EuiPageContentBody> */}
                </EuiFlexGroup>
                <div className="row">
                  {!isSidebarClosed && <Sidebar recentlyCreatedFields={recentlyCreatedFields} />}
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
                <EmptyMetricsView />
                {/* </EuiPageContentBody> */}
              </EuiPageBody>
            </EuiPage>
          </div>
        )}
      />
    </>
  );
};

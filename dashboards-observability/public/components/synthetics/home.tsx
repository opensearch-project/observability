/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiButton,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiInMemoryTable,
  EuiLink,
  EuiOverlayMask,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPopover,
  EuiSpacer,
  EuiTableFieldDataColumnType,
  EuiText,
  EuiTitle,
  EuiBreadcrumb,
  EuiBreadcrumbs,
  EuiListGroup,
  EuiBasicTable,
  EuiTab,
  EuiTabbedContent,
  EuiFacetGroup,
  EuiFacetButton,
  EuiFieldText,
  ShortDate,
  EuiSuperDatePicker,
  OnTimeChangeProps
} from '@elastic/eui';
import React, { ChangeEvent, Fragment, useState } from 'react';
import { StaticContext } from 'react-router';
import { Route, RouteComponentProps } from 'react-router-dom';
import { ChromeBreadcrumb, CoreStart } from '../../../../../src/core/public';
import { ObservabilitySideBar } from '../common/side_nav';
import PPLService from '../../services/requests/ppl';
import { Search } from '../common/search/search';
import { ReactChild, ReactFragment, ReactPortal } from 'react';
import { formatDate } from '@elastic/eui';
import { type } from 'os';
import { SyntheticHomeTab } from './home_view';
import { DurationRange } from '@elastic/eui/src/components/date_picker/types';
import { VisualizationType } from 'common/types/custom_panels';
import { uiSettingsService } from 'common/utils';
import { onTimeChange } from '../custom_panels/helpers/utils';

export interface SyntheticProps {
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  parentBreadcrumb: ChromeBreadcrumb;
  pplService: any;
  renderProps: RouteComponentProps<any, StaticContext, any>;
}

export const Home = ({ http, chrome, parentBreadcrumb, pplService, renderProps }: SyntheticProps) => {
  // {tabs} displays all the tabs on the top of the page, and leads to the other components
  const tabs = [
    {
      id: 'home--id',
      name: 'Home',
      content: (
        <Fragment>
          <EuiSpacer size="m" />
          <SyntheticHomeTab
            pplService={pplService}
          />
        </Fragment>
      ),
    },
    {
      id: 'test-suites_tab--id',
      name: 'Test-Suites',
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiText>
            <p>
              In progress
            </p>
          </EuiText>
        </Fragment>
      ),
    },
    {
      id: 'certificates--id',
      name: 'Certificates',
      disabled: true,
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiText>
            <p>
              In progress
            </p>
          </EuiText>
        </Fragment>
      ),
    },
    {
      id: 'alerting--id',
      name: 'Alerting',
      disabled: true,
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiText>
            <p>
              In progress
            </p>
          </EuiText>
        </Fragment>
      ),
    },
    {
      id: 'settings--id',
      name: 'Settings',
      disabled: true,
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiText>
            <p>
              In progress
            </p>
          </EuiText>
        </Fragment>
      ),
    },
  ];

  return (
    <>
      <Route
        exact
        path="/synthetics"
        render={(props) => (
          <ObservabilitySideBar>
            <div>
              <EuiPage>
                <EuiPageBody component="div">
                  <EuiPageHeader>
                    <EuiPageHeaderSection>
                      <EuiTitle size="l">
                        <h1>Synthetics</h1>
                      </EuiTitle>
                    </EuiPageHeaderSection>
                  </EuiPageHeader>
                  <EuiTabbedContent
                    tabs={tabs}
                    initialSelectedTab={tabs[0]}
                    autoFocus="selected"
                  />
                </EuiPageBody>
              </EuiPage>
            </div>
          </ObservabilitySideBar>
        )}
      />
    </>
  );
};

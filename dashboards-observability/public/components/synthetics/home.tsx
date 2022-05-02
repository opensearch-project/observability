/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiTabbedContent,
} from '@elastic/eui';
import React, { Fragment } from 'react';
import { StaticContext } from 'react-router';
import { Route, RouteComponentProps } from 'react-router-dom';
import { ChromeBreadcrumb, CoreStart } from '../../../../../src/core/public';
import { ObservabilitySideBar } from '../common/side_nav';
import { SyntheticHomeTab } from './home_view';

export interface SyntheticProps {
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  parentBreadcrumb: ChromeBreadcrumb;
  pplService: any;
  renderProps: RouteComponentProps<any, StaticContext, any>;
}

export const Home = ({
  http,
  chrome,
  parentBreadcrumb,
  pplService,
  renderProps,
}: SyntheticProps) => {
  // {tabs} displays all the tabs on the top of the page, and leads to the other components
  const tabs = [
    {
      id: 'home--id',
      name: 'Home',
      content: (
        <Fragment>
          <EuiSpacer size="m" />
          <SyntheticHomeTab pplService={pplService} />
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
            <p>In progress</p>
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
            <p>In progress</p>
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
            <p>In progress</p>
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
            <p>In progress</p>
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
                  <EuiTabbedContent tabs={tabs} initialSelectedTab={tabs[0]} autoFocus="selected" />
                </EuiPageBody>
              </EuiPage>
            </div>
          </ObservabilitySideBar>
        )}
      />
    </>
  );
};

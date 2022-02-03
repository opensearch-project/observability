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
  EuiBreadcrumbs
} from '@elastic/eui';
import React from 'react';
import { StaticContext } from 'react-router';
import { Route, RouteComponentProps } from 'react-router-dom';
import { ChromeBreadcrumb, CoreStart } from '../../../../../src/core/public';
import { ObservabilitySideBar } from '../common/side_nav';
import PPLService from '../../services/requests/ppl';

export interface UptimeProps {
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  // setBreadcrumbs: (newBreadcrumbs: ChromeBreadcrumb[]) => void;
  parentBreadcrumb: ChromeBreadcrumb;
  pplService: any;
  renderProps: RouteComponentProps<any, StaticContext, any>;
}

type QueryResultProp = {
  pplService: PPLService
  query: string
};

type QueryResultState = {
  value: string[]
  interval: NodeJS.Timer
};

class PPLQuery extends React.Component<QueryResultProp, QueryResultState> {
  constructor(props: Readonly<QueryResultProp>) {
    super(props);
    this.pplServiceRequestor(this.props.query)
    this.state = {
      value: ["something"],
      interval: setInterval(() => this.pplServiceRequestor(this.props.query), 2000),
    };
  }

  pplServiceRequestor = async (
    finalQuery: string,
    // type: string,
    // setVisualizationData: React.Dispatch<React.SetStateAction<any[]>>,
    // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    // setIsError: React.Dispatch<React.SetStateAction<string>>
  ) => {
    console.log(finalQuery)
    await this.props.pplService
      .fetch({ query: finalQuery, format: 'viz' })
      .then((res) => {
        // if (res === undefined) setIsError('Please check the validity of PPL Filter');
        // console.log(res)
        var fie = Object.keys(res['data'])[0]
        this.setState({value: res['data'][fie]})
        // console.log(JSON.stringify(this.state.value))
        // setVisualizationData(res);
      })
      .catch((error: Error) => {
        // setIsError(error.stack);
        console.error(error);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    // console.log(this.state.value)
    return (
      this.state.value
    );
  }
};

export const Home = ({ http, chrome, parentBreadcrumb, pplService, renderProps }: UptimeProps) => {
  return (
    <>
      <Route
      exact
        path="/uptime"
        render={(props) => (
          <ObservabilitySideBar>
            <div>
              <EuiPage>
                <EuiPageBody component="div">
                  <EuiPageHeader>
                    <EuiPageHeaderSection>
                      <EuiTitle size="l">
                        <h1>Uptime Monitoring</h1>
                      </EuiTitle>
                    </EuiPageHeaderSection>
                  </EuiPageHeader>
                  <EuiPageContent>
                    <EuiPageContentHeader>
                      <EuiPageContentHeaderSection>
                        <EuiTitle size="s">
                          <h3>
                            Monitors will show and ping
                          </h3>
                        </EuiTitle>
                        <EuiSpacer size="s" />
                        <EuiText size="s" color="subdued">
                          Graphs will display
                        </EuiText>
                      </EuiPageContentHeaderSection>
                      <EuiPageContentHeaderSection>
                        <EuiFlexGroup gutterSize="s">
                          <EuiFlexItem>
                          </EuiFlexItem>
                        </EuiFlexGroup>
                      </EuiPageContentHeaderSection>
                    </EuiPageContentHeader>
                    <EuiHorizontalRule margin="m" />
                    <h2>
                      Total number of logs: {<PPLQuery pplService={pplService} query={"source = uptime-logs | stats count(startTime)"}/>}
                    </h2>
                    <EuiHorizontalRule margin="m" />
                    <h3>
                      Endpoints:
                      <PPLQuery pplService={pplService} query={"search source = uptime-logs | dedup URL | fields URL"}/>
                    </h3>
                  </EuiPageContent>
                </EuiPageBody>
              </EuiPage>
            </div>
          </ObservabilitySideBar>
        )}
      />
    </>
  );
};

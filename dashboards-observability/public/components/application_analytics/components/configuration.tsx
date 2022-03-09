/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  EuiBreadcrumb,
  EuiButton,
  EuiCode,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { ApplicationType } from 'common/types/app_analytics';
import React, { useEffect } from 'react';

interface ConfigProps {
  appId: string;
  application: ApplicationType;
  parentBreadcrumb: EuiBreadcrumb;
  switchToEditViz: (savedVizId: string) => void;
}

export const Configuration = (props: ConfigProps) => {
  const { appId, application, parentBreadcrumb, switchToEditViz } = props;
  useEffect(() => {
    switchToEditViz('');
  }, []);

  return (
    <div>
      <EuiPage>
        <EuiPageBody component="div">
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle>
                  <h3 style={{ paddingTop: '10px' }}>Configuration details</h3>
                </EuiTitle>
              </EuiPageContentHeaderSection>
              <EuiPageContentHeaderSection>
                <EuiFlexGroup gutterSize="s">
                  <EuiFlexItem>
                    <EuiButton
                      fill
                      onClick={() => {
                        window.location.assign(
                          `${parentBreadcrumb.href}application_analytics/edit/${appId}`
                        );
                      }}
                    >
                      Edit
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiHorizontalRule margin="m" />
            <EuiPageContentBody>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiText>
                    <h4>Log source</h4>
                  </EuiText>
                  <EuiSpacer size="m" />
                  <p>
                    <EuiCode>{application.baseQuery}</EuiCode>
                  </p>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiText>
                    <h4>Services & entities</h4>
                  </EuiText>
                  <EuiSpacer size="m" />
                  <EuiText size="m">
                    <ul aria-label="List of services and entities">
                      {application.servicesEntities.map((group) => (
                        <li>{decodeURI(group)}</li>
                      ))}
                    </ul>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiText>
                    <h4>Trace groups</h4>
                  </EuiText>
                  <EuiSpacer size="m" />
                  <EuiText size="m">
                    <ul aria-label="List of trace groups">
                      {application.traceGroups.map((group) => (
                        <li>{decodeURI(group)}</li>
                      ))}
                    </ul>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem />
              </EuiFlexGroup>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </div>
  );
};

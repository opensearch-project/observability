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
  EuiSelect,
  EuiSelectOption,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { ApplicationType } from 'common/types/app_analytics';
import React, { useEffect, useState } from 'react';

interface ConfigProps {
  appId: string;
  application: ApplicationType;
  parentBreadcrumb: EuiBreadcrumb;
  visWithAvailability: EuiSelectOption[];
  switchToEditViz: (savedVizId: string) => void;
  updateApp: (appId: string, updateAppData: Partial<ApplicationType>, type: string) => void;
}

export const Configuration = (props: ConfigProps) => {
  const {
    appId,
    application,
    parentBreadcrumb,
    visWithAvailability,
    updateApp,
    switchToEditViz,
  } = props;
  const [availabilityVisId, setAvailabilityVisId] = useState(application.availabilityVisId || '');
  useEffect(() => {
    switchToEditViz('');
  }, []);

  const onAvailabilityVisChange = (event: any) => {
    setAvailabilityVisId(event.target.value);
    updateApp(appId, { availabilityVisId: event.target.value }, 'editAvailability');
  };

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
                    <h4>Services & Entities</h4>
                  </EuiText>
                  <EuiSpacer size="m" />
                  <EuiText size="m">
                    <ul aria-label="List of services and entities">
                      {application.servicesEntities.map((group) => (
                        <li key={`${decodeURI(group)}-item`}>{decodeURI(group)}</li>
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
                        <li key={`${decodeURI(group)}-item`}>{decodeURI(group)}</li>
                      ))}
                    </ul>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiText>
                    <h4>Availability</h4>
                  </EuiText>
                  <EuiSpacer size="m" />
                  <EuiSelect
                    options={visWithAvailability}
                    value={availabilityVisId}
                    onChange={onAvailabilityVisChange}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    </div>
  );
};

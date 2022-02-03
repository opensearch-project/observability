/* eslint-disable react-hooks/exhaustive-deps */
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiButton,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiSpacer,
  EuiTitle,
  EuiToolTip,
} from '@elastic/eui';
import DSLService from 'public/services/requests/dsl';
import React, { useEffect, useState } from 'react';
import { AppAnalyticsComponentDeps } from '../home';
import { TraceConfig } from './config_components/trace_config';
import { ServiceConfig } from './config_components/service_config';
import { LogConfig } from './config_components/log_config';
import { PPLReferenceFlyout } from '../../../components/common/helpers';
import { OptionType } from '../../../../common/types/app_analytics';

interface CreateAppProps extends AppAnalyticsComponentDeps {
  dslService: DSLService;
  createApp: (
    name: string,
    description: string,
    query: string,
    selectedServices: OptionType[],
    selectedTraces: OptionType[]
  ) => void;
  clearStorage: () => void;
}

export const CreateApp = (props: CreateAppProps) => {
  const {
    parentBreadcrumb,
    chrome,
    query,
    createApp,
    name,
    description,
    setNameWithStorage,
    setDescriptionWithStorage,
    clearStorage,
  } = props;
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [selectedServices, setSelectedServices] = useState<OptionType[]>([]);
  const [selectedTraces, setSelectedTraces] = useState<OptionType[]>([]);

  useEffect(() => {
    chrome.setBreadcrumbs([
      parentBreadcrumb,
      {
        text: 'Application analytics',
        href: '#/application_analytics',
      },
      {
        text: 'Create',
        href: '#/application_analytics/create',
      },
    ]);
  }, []);

  const closeFlyout = () => {
    setIsFlyoutVisible(false);
  };

  let flyout;
  if (isFlyoutVisible) {
    flyout = <PPLReferenceFlyout module="explorer" closeFlyout={closeFlyout} />;
  }

  const isDisabled = !name || !query || !selectedTraces.length || !selectedServices.length;

  const missingField = () => {
    if (isDisabled) {
      let popoverContent = '';
      if (!name) {
        popoverContent = 'Name is required.';
      } else if (!query) {
        popoverContent = 'Log Source is required.';
      } else if (!selectedServices.length) {
        popoverContent = 'Services & Entities is required.';
      } else if (!selectedTraces.length) {
        popoverContent = 'Trace Groups are required.';
      }
      return <p>{popoverContent}</p>;
    }
  };

  const onCreate = () => {
    createApp(name, description, query, selectedServices, selectedTraces);
  };

  const onCancel = () => {
    clearStorage();
    window.location.assign(`${parentBreadcrumb.href}application_analytics`);
  };

  return (
    <div style={{ maxWidth: '1130px' }}>
      <EuiPage>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Create application</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent id="appInfo">
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle size="m">
                  <h2>Application information</h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiHorizontalRule />
            <EuiForm component="form">
              <EuiFormRow label="Name">
                <EuiFieldText
                  name="name"
                  value={name}
                  onChange={(e) => setNameWithStorage(e.target.value)}
                />
              </EuiFormRow>
              <EuiFormRow label="Description">
                <EuiFieldText
                  name="description"
                  value={description}
                  onChange={(e) => setDescriptionWithStorage(e.target.value)}
                />
              </EuiFormRow>
            </EuiForm>
          </EuiPageContent>
          <EuiSpacer />
          <EuiPageContent id="composition">
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle size="m">
                  <h2>Composition</h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiHorizontalRule />
            <LogConfig setIsFlyoutVisible={setIsFlyoutVisible} {...props} />
            <EuiHorizontalRule />
            <ServiceConfig
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
              {...props}
            />
            <EuiHorizontalRule />
            <TraceConfig
              selectedTraces={selectedTraces}
              setSelectedTraces={setSelectedTraces}
              {...props}
            />
          </EuiPageContent>
          <EuiSpacer />
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiButton onClick={onCancel}>Cancel</EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiToolTip position="top" content={missingField()}>
                <EuiButton isDisabled={isDisabled} onClick={onCreate} fill>
                  Create
                </EuiButton>
              </EuiToolTip>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageBody>
      </EuiPage>
      {flyout}
    </div>
  );
};

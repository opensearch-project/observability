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
import React, { ReactChild, useEffect, useState } from 'react';
import { AppAnalyticsComponentDeps } from '../home';
import { TraceConfig } from './config_components/trace_config';
import { ServiceConfig } from './config_components/service_config';
import { LogConfig } from './config_components/log_config';
import { PPLReferenceFlyout } from '../../../components/common/helpers';
import { ApplicationType, OptionType } from '../../../../common/types/app_analytics';
import { fetchAppById } from '../helpers/utils';

interface CreateAppProps extends AppAnalyticsComponentDeps {
  dslService: DSLService;
  setToasts: (title: string, color?: string, text?: ReactChild) => void;
  createApp: (app: ApplicationType) => void;
  updateApp: (appId: string, updateAppData: Partial<ApplicationType>, edit: boolean) => void;
  clearStorage: () => void;
  existingAppId: string;
}

export const CreateApp = (props: CreateAppProps) => {
  const {
    parentBreadcrumb,
    chrome,
    http,
    query,
    name,
    description,
    createApp,
    updateApp,
    setToasts,
    setNameWithStorage,
    setDescriptionWithStorage,
    setQueryWithStorage,
    setFilters,
    clearStorage,
    existingAppId,
  } = props;
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [selectedServices, setSelectedServices] = useState<OptionType[]>([]);
  const [selectedTraces, setSelectedTraces] = useState<OptionType[]>([]);

  const editMode = existingAppId !== 'undefined';
  const [existingApp, setExistingApp] = useState<ApplicationType>({
    name: '',
    description: '',
    baseQuery: '',
    servicesEntities: [],
    traceGroups: [],
    panelId: '',
  });

  useEffect(() => {
    chrome.setBreadcrumbs([
      parentBreadcrumb,
      {
        text: 'Application analytics',
        href: '#/application_analytics',
      },
      {
        text: editMode ? 'Edit' : 'Create',
        href: `#/application_analytics/${editMode ? 'edit' : 'create'}`,
      },
    ]);
  }, []);

  useEffect(() => {
    if (editMode && existingAppId) {
      fetchAppById(http, existingAppId, setExistingApp, setFilters, setToasts);
    }
  }, [existingAppId]);

  useEffect(() => {
    setNameWithStorage(existingApp.name);
    setDescriptionWithStorage(existingApp.description);
    setQueryWithStorage(existingApp.baseQuery);
  }, [existingApp]);

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
    const appData = {
      name,
      description,
      baseQuery: query,
      servicesEntities: selectedServices.map((option) => option.label),
      traceGroups: selectedTraces.map((option) => option.label),
      panelId: '',
    };
    createApp(appData);
  };

  const onUpdate = () => {
    const appData = {
      name,
      description,
      servicesEntities: selectedServices.map((option) => option.label),
      traceGroups: selectedTraces.map((option) => option.label),
    };
    updateApp(existingAppId, appData, true);
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
                <h1>{editMode ? 'Edit' : 'Create'} application</h1>
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
                <EuiButton isDisabled={isDisabled} onClick={editMode ? onUpdate : onCreate} fill>
                  {editMode ? 'Edit' : 'Create'}
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

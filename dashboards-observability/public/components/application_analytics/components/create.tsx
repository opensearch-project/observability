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
  EuiSelect, 
  EuiSpacer,
  EuiTitle 
} from "@elastic/eui";
import DSLService from "public/services/requests/dsl";  
import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { AppAnalyticsComponentDeps } from "../home";
import { TraceConfig } from './config_components/trace_config';
import { ServiceConfig } from "./config_components/service_config";
import { LogConfig } from "./config_components/log_config";
import { PPLReferenceFlyout } from "../../../components/common/helpers";
import { optionType } from "common/constants/application_analytics";

interface CreateAppProps extends AppAnalyticsComponentDeps {
  dslService: DSLService;
};

export const CreateApp = (props: CreateAppProps) => {
  const { parentBreadcrumb, chrome, query, filters } = props;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [selectedServices, setSelectedServices] = useState(filters.map((f) => { return { label: f.value }}));
  const [selectedTraces, setSelectedTraces] = useState<Array<optionType>>([]);
  const [state, setState] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    chrome.setBreadcrumbs(
      [
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
    }, [])

  const closeFlyout = () => {
    setIsFlyoutVisible(false);
  };

    let flyout;
    if (isFlyoutVisible) {
      flyout = <PPLReferenceFlyout module="explorer" closeFlyout={closeFlyout} />;
    }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{maxWidth: '1130px'}}>
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
                value={state.name}
                onChange={(e) => onChange(e)}
              />
            </EuiFormRow>
            <EuiFormRow label="Description">
              <EuiFieldText 
                name="description"
                value={state.description}
                onChange={(e) => onChange(e)}
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
           <ServiceConfig selectedServices={selectedServices} setSelectedServices={setSelectedServices} {...props} />
          <EuiHorizontalRule />
            <TraceConfig selectedTraces={selectedTraces} setSelectedTraces={setSelectedTraces} {...props}/>
        </EuiPageContent>
        <EuiSpacer/>
        <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiButton>
          Cancel
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton isDisabled={!state.name || !query || !selectedTraces.length || !selectedServices} fill>
          Create
          </EuiButton>
        </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageBody>
    </EuiPage>
    {flyout}
    </div>
  );
}

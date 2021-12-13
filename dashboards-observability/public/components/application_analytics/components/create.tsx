/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiBasicTable,
  EuiButton,
  EuiFieldText, 
  EuiFlexGroup, 
  EuiFlexItem, 
  EuiForm, 
  EuiFormRow, 
  EuiHealth, 
  EuiHorizontalRule, 
  EuiPage, 
  EuiPageBody, 
  EuiPageContent, 
  EuiPageContentHeader, 
  EuiPageContentHeaderSection, 
  EuiPageHeader, 
  EuiPageHeaderSection, 
  EuiPopover, 
  EuiSelect, 
  EuiSpacer, 
  EuiTableFieldDataColumnType,
  EuiTitle 
} from "@elastic/eui";
import DSLService from "public/services/requests/dsl";  
import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { AppAnalyticsComponentDeps } from "../home";
import { TraceConfig } from './trace_config';
import { ServiceConfig } from "./service_config";
import { LogConfig } from "./log_config";
import { PPLReferenceFlyout } from "../../../components/common/helpers";

interface CreateAppProps extends AppAnalyticsComponentDeps {
  dslService: DSLService;
};

export const CreateApp = (props: CreateAppProps) => {
  const { parentBreadcrumb, chrome } = props;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
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

  const dummyItems = [{id: '1', level: "Unavailable", color: "danger", conditions: "WHEN errorRate() IS ABOVE OR EQUAL TO 2%"}];
  const tableColumns = [
    {
      field: 'level',
      name: 'Level',
      truncateText: true,
      render: (value, record) => 
        <EuiHealth color={record.color}>{value}</EuiHealth>
      ,
    },
    {
      field: 'conditions',
      name: 'Conditions',
      render: (value) => value,
    }
  ] as Array<
  EuiTableFieldDataColumnType<{
    level: string;
    id: string;
    color: string;
    conditions: string;
  }>
  >;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const popoverButton = (
    <EuiButton
      iconType="arrowDown"
      iconSide="right"
      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
    >
      Add custom level
    </EuiButton>
  );

  const popoverContent = (
    <EuiFlexGroup direction="column">
      <EuiFlexGroup>
      <EuiFlexItem>
        <EuiFormRow label="Color">
          <EuiSelect/>
        </EuiFormRow>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFormRow label="Label">
          <EuiFieldText />
        </EuiFormRow>
      </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer/>
      <EuiFlexGroup alignItems="flexStart">
        <EuiFlexItem grow={false}>
          <EuiButton>
          Cancel
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton fill>
          Add
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexGroup>
  );

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
           <ServiceConfig {...props} />
          <EuiHorizontalRule />
            <TraceConfig {...props}/>
        </EuiPageContent>
        <EuiSpacer/>
        <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiButton>
          Cancel
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton fill>
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

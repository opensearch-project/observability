/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import { 
  EuiAccordion,
  EuiBadge,
  EuiBasicTable,
  EuiButton,
  EuiContextMenuItem,
  EuiContextMenuPanel,
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
  EuiText, 
  EuiTextColor, 
  EuiTitle 
} from "@elastic/eui";
import { TraceAnalyticsComponentDeps } from "public/components/trace_analytics/home";
import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";

interface CreateAppProps extends TraceAnalyticsComponentDeps {};

export const CreateApp = (props: CreateAppProps) => {
  const { parentBreadcrumb, chrome } = props;
  const [state, setState] = useState({
    name: '',
    description: ''
  });
  const [logOpen, setLogOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [traceOpen, setTraceOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
    })

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
          <EuiAccordion
            id="logSources"
            buttonContent={
              <>
              <EuiText size="s">
              <h3>
                Log Sources  <EuiBadge>0</EuiBadge>
              </h3>
              </EuiText>
              <EuiSpacer size="s" />
              <EuiText size="s" color="subdued">
              Configure index patterns and timestamp fields
              </EuiText>
              </>
            }
            extraAction={<EuiButton size="s" disabled={!logOpen}>Clear all</EuiButton>}
            onToggle={(isOpen) => {setLogOpen(isOpen)}}
            paddingSize="l"
          >
            <EuiFormRow
            label="Log Source"
            helpText="The default log event indices you query the most often. You can include one or multiple indices."
            >
              <EuiSelect
              hasNoInitialSelection
              onChange={() => {}}
              options={[
                { value: 'index_1', text: 'index_1' },
                { value: 'ingest_logs_all', text: 'ingest_logs_all' },
              ]}
              />
            </EuiFormRow>
          </EuiAccordion>
          <EuiHorizontalRule />
          <EuiAccordion
            id="servicesEntities"
            buttonContent={
              <>
                <EuiText size="s">
                <h3>
                Services & Entities  <EuiBadge>0</EuiBadge>
                </h3>
              </EuiText>
              <EuiSpacer size="s" />
              <EuiText size="s" color="subdued">
                Select services & entities to include in this application
              </EuiText>
              </>
              }
            extraAction={<EuiButton size="s" disabled={!servicesOpen}>Clear all</EuiButton>}
            onToggle={(isOpen) => {setServicesOpen(isOpen)}}
            paddingSize="l"
          >
            <EuiFormRow
            label="Services & Entities"
            >
              <EuiSelect
              hasNoInitialSelection
              onChange={() => {}}
              options={[
                { value: 'payment', text: 'Payment' },
                { value: 'user', text: 'Users' },
                { value: 'purchase', text: 'Purchase' },
              ]}
              />
            </EuiFormRow>
          </EuiAccordion>
          <EuiHorizontalRule />
          <EuiAccordion
            id="traceGroups"
            buttonContent={
              <>
                <EuiText size="s">
                <h3>
                Trace Groups  <EuiBadge>0</EuiBadge>
                </h3>
              </EuiText>
              <EuiSpacer size="s" />
              <EuiText size="s" color="subdued">
                Constrain your application to specific trace groups
              </EuiText>
              </>
              }
            extraAction={<EuiButton size="s" disabled={!traceOpen}>Clear all</EuiButton>}
            onToggle={(isOpen) => {setTraceOpen(isOpen)}}
            paddingSize="l"
          >
            <EuiFormRow
            label="Trace Groups"
            helpText="Select one or multiple trace groups, or type a custom one"
            >
              <EuiSelect
              hasNoInitialSelection
              onChange={() => {}}
              options={[
                { value: 'payment', text: 'Payment.auto' },
                { value: 'user', text: 'Users.admin' },
                { value: 'purchase', text: 'Purchase.source' },
              ]}
              />
            </EuiFormRow>
          </EuiAccordion>
        </EuiPageContent>
        <EuiSpacer />
        <EuiPageContent id="availability">
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle size="m">
                <h2>Availability</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiHorizontalRule />
          <EuiBasicTable
          items={dummyItems}
          columns={tableColumns}
          />
          <EuiSpacer/>
          <EuiFlexGroup gutterSize="s">
            <EuiFlexItem>
            <EuiPopover
              panelPaddingSize="l"
              button={popoverButton}
              isOpen={isPopoverOpen}
              closePopover={() => setIsPopoverOpen(false)}
            >
            {popoverContent}
            </EuiPopover>
            </EuiFlexItem>
          </EuiFlexGroup>
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
  );
}
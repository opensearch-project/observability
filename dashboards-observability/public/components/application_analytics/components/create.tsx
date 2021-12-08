/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  EuiAccordion,
  EuiBadge,
  EuiBasicTable,
  EuiButton,
  EuiComboBox,
  EuiComboBoxOptionOption,
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
  EuiTitle 
} from "@elastic/eui";
import { Autocomplete } from "../../common/search/autocomplete";
import DSLService from "public/services/requests/dsl";
import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { PPLReferenceFlyout } from "../../common/helpers";
import { uiSettingsService } from "../../../../common/utils";
import { AppAnalyticsComponentDeps } from "../home";
import { ServiceMap } from "../../../components/trace_analytics/components/services";
import { handleServiceMapRequest } from "../../../components/trace_analytics/requests/services_request_handler";
import { ServiceObject } from "../../../components/trace_analytics/components/common/plots/service_map";
import { FilterType } from "../../../components/trace_analytics/components/common/filters/filters";
import { TraceConfig } from './trace_config';

interface CreateAppProps extends AppAnalyticsComponentDeps {
  dslService: DSLService;
};

export const CreateApp = (props: CreateAppProps) => {
  const { parentBreadcrumb, chrome, dslService, query, setQuery, filters, setFilters, http } = props;
  const [state, setState] = useState({
    name: '',
    description: ''
  });
  const [logOpen, setLogOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [traceOpen, setTraceOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [tempQuery, setTempQuery] = useState<string>('');
  const [serviceMap, setServiceMap] = useState<ServiceObject>({});
  const [serviceMapIdSelected, setServiceMapIdSelected] = useState<'latency' | 'error_rate' | 'throughput'>('latency');
  const [selectedServices, setSelectedServices] = useState(filters.map((f) => { return { label: f.value }}));


  useEffect (() => {
    const serviceOptions = filters.filter(f => f.field === 'serviceName').map((f) => { return { label: f.value }});
    const noDups = serviceOptions.filter((s, index) => { return serviceOptions.findIndex(ser => ser.label === s.label) === index });
    setSelectedServices(noDups);
  }, [filters])

  const addFilter = (filter: FilterType) => {
    for (const addedFilter of filters) {
      if (
        addedFilter.field === filter.field &&
        addedFilter.operator === filter.operator &&
        addedFilter.value === filter.value
      ) {
        return;
      }
    }
    const newFilters = [...filters, filter];
    setFilters(newFilters);
  };

  const onServiceChange = (selectedServices: any) => {
    const serviceFilter = selectedServices.map((option: EuiComboBoxOptionOption<string>) => { 
      return {
        field: 'serviceName', 
        operator: 'is', 
        value: option.label, 
        inverted: false, 
        disabled: false 
      }
    })
    setFilters(serviceFilter);
  };

  const services = Object.keys(serviceMap).map((service) => { return { label: service } });

  const handleQueryChange = async (query: string) => setQuery(query);

  const closeFlyout = () => {
    setIsFlyoutVisible(false);
  };

  const showFlyout = () => {
    setIsFlyoutVisible(true);
  };

  let flyout;
  if (isFlyoutVisible) {
    flyout = <PPLReferenceFlyout module="explorer" closeFlyout={closeFlyout} />;
  }

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
    handleServiceMapRequest(http, dslService, serviceMap, setServiceMap);
    }, [])

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
          <EuiAccordion
            id="logSource"
            buttonContent={
              <>
              <EuiText size="s">
              <h3>Log Source</h3>
              </EuiText>
              <EuiSpacer size="s" />
              <EuiText size="s" color="subdued">
              Configure your application base query
              </EuiText>
              </>
            }
            extraAction={<EuiButton size="s" disabled={!logOpen} onClick={() => { handleQueryChange('') }}>Clear all</EuiButton>}
            onToggle={(isOpen) => {setLogOpen(isOpen)}}
            paddingSize="l"
          >
            <EuiFormRow
            label="PPL Base Query"
            helpText="The default logs view in the application will be filtered by this query."
            >
              <EuiFlexItem grow={false} key="query-bar" className="query-area">
                <Autocomplete
                  key={'autocomplete-bar'}
                  query={query}
                  tempQuery={tempQuery}
                  handleQueryChange={handleQueryChange}
                  handleQuerySearch={() => {}}
                  dslService={dslService}
                />
                <EuiBadge 
                  className={`ppl-link ${uiSettingsService.get('theme:darkMode') ? "ppl-link-dark" : "ppl-link-light"}`}
                  color="hollow"
                  onClick={() => showFlyout()}
                  onClickAriaLabel={"pplLinkShowFlyout"}
                >
                  PPL
                </EuiBadge>
              </EuiFlexItem>
            </EuiFormRow>
          </EuiAccordion>
          <EuiHorizontalRule />
          <EuiAccordion
            id="servicesEntities"
            buttonContent={
              <>
                <EuiText size="s">
                <h3>
                Services & Entities  <EuiBadge>{selectedServices.length}</EuiBadge>
                </h3>
              </EuiText>
              <EuiSpacer size="s" />
              <EuiText size="s" color="subdued">
                Select services & entities to include in this application
              </EuiText>
              </>
              }
            extraAction={<EuiButton size="s" disabled={!servicesOpen} onClick={() => {setFilters([])}}>Clear all</EuiButton>}
            onToggle={(isOpen) => {setServicesOpen(isOpen)}}
            paddingSize="l"
          >
            <EuiFormRow
            label="Services & Entities"
            >
              <EuiComboBox
                aria-label="Select services and entities"
                placeholder="Select services and entities"
                options={services}
                selectedOptions={selectedServices}
                onChange={onServiceChange}
                isClearable={false}
                data-test-subj="servicesEntitiesComboBox"
              />
            </EuiFormRow>
            <EuiSpacer />
            <ServiceMap
              serviceMap={serviceMap}
              idSelected={serviceMapIdSelected}
              setIdSelected={setServiceMapIdSelected}
              addFilter={addFilter}
            />
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
            <TraceConfig {...props}/>
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
    {flyout}
    </div>
  );
}

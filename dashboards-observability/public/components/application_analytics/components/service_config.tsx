/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiAccordion, EuiBadge, EuiButton, EuiComboBox, EuiComboBoxOptionOption, EuiFormRow, EuiSpacer, EuiText } from "@elastic/eui";
import { FilterType } from "../../../components/trace_analytics/components/common/filters/filters";
import { ServiceObject } from "../../../components/trace_analytics/components/common/plots/service_map";
import { ServiceMap } from "../../../components/trace_analytics/components/services";
import { handleServiceMapRequest } from "../../../components/trace_analytics/requests/services_request_handler";
import DSLService from "public/services/requests/dsl";
import React, { useState } from "react";
import { useEffect } from "react";
import { AppAnalyticsComponentDeps } from "../home";

interface ServiceConfigProps extends AppAnalyticsComponentDeps {
  dslService: DSLService;
}

export const ServiceConfig = (props: ServiceConfigProps) => {
  const { parentBreadcrumb, chrome, dslService, query, setQuery, filters, setFilters, http } = props;
  const [servicesOpen, setServicesOpen] = useState(false);
  const [serviceMap, setServiceMap] = useState<ServiceObject>({});
  const [serviceMapIdSelected, setServiceMapIdSelected] = useState<'latency' | 'error_rate' | 'throughput'>('latency');
  const [selectedServices, setSelectedServices] = useState(filters.map((f) => { return { label: f.value }}));

  useEffect(() => {
    handleServiceMapRequest(http, dslService, serviceMap, setServiceMap);
  }, [])

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

  return (
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
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EuiAccordion,
  EuiBadge,
  EuiButton,
  EuiComboBox,
  EuiFormRow,
  EuiOverlayMask,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import DSLService from 'public/services/requests/dsl';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FilterType } from '../../../trace_analytics/components/common/filters/filters';
import { ServiceObject } from '../../../trace_analytics/components/common/plots/service_map';
import { ServiceMap } from '../../../trace_analytics/components/services';
import { handleServiceMapRequest } from '../../../trace_analytics/requests/services_request_handler';
import { AppAnalyticsComponentDeps } from '../../home';
import { OptionType } from '../../../../../common/types/app_analytics';
import { getClearModal } from '../../helpers/modal_containers';

interface ServiceConfigProps extends AppAnalyticsComponentDeps {
  dslService: DSLService;
  selectedServices: OptionType[];
  setSelectedServices: (services: OptionType[]) => void;
  page?: string;
}

export const ServiceConfig = (props: ServiceConfigProps) => {
  const {
    dslService,
    filters,
    setFiltersWithStorage,
    http,
    selectedServices,
    setSelectedServices,
    page,
  } = props;
  const [servicesOpen, setServicesOpen] = useState(false);
  const [serviceMap, setServiceMap] = useState<ServiceObject>({});
  const [serviceMapIdSelected, setServiceMapIdSelected] = useState<
    'latency' | 'error_rate' | 'throughput'
  >('latency');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalLayout, setModalLayout] = useState(<EuiOverlayMask />);

  useEffect(() => {
    handleServiceMapRequest(http, dslService, serviceMap, setServiceMap);
  }, []);

  useEffect(() => {
    const serviceOptions = filters
      .filter((f) => f.field === 'serviceName')
      .map((f) => {
        return { label: f.value };
      });
    const noDups = serviceOptions.filter((s, index) => {
      return serviceOptions.findIndex((ser) => ser.label === s.label) === index;
    });
    setSelectedServices(noDups);
  }, [filters]);

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
    setFiltersWithStorage(newFilters);
  };

  const onServiceChange = (newServices: any) => {
    const serviceFilters = newServices.map((option: OptionType) => {
      return {
        field: 'serviceName',
        operator: 'is',
        value: option.label,
        inverted: false,
        disabled: false,
      };
    });
    const nonServiceFilters = filters.filter((f) => f.field !== 'serviceName');
    setFiltersWithStorage([...nonServiceFilters, ...serviceFilters]);
  };

  const clearServices = () => {
    const withoutServices = filters.filter((f) => f.field !== 'serviceName');
    setFiltersWithStorage(withoutServices);
  };

  const services = Object.keys(serviceMap).map((service) => {
    return { label: service };
  });

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onConfirm = () => {
    clearServices();
    closeModal();
  };

  const clearAllModal = () => {
    setModalLayout(
      getClearModal(
        onCancel,
        onConfirm,
        'Clear services & entities?',
        'This will clear all information in services & entities configuration.',
        'Clear All'
      )
    );
    showModal();
  };

  return (
    <div>
      <EuiAccordion
        id="servicesEntities"
        buttonContent={
          <>
            <EuiText size="s">
              <h3>
                Services & Entities <EuiBadge>{selectedServices.length}</EuiBadge>
              </h3>
            </EuiText>
            <EuiSpacer size="s" />
            <EuiText size="s" color="subdued">
              Select services & entities to include in this application
            </EuiText>
          </>
        }
        extraAction={
          <EuiButton
            size="s"
            disabled={!servicesOpen || !selectedServices.length}
            onClick={clearAllModal}
          >
            Clear all
          </EuiButton>
        }
        onToggle={(isOpen) => {
          setServicesOpen(isOpen);
        }}
        paddingSize="l"
      >
        <EuiFormRow label="Services & Entities">
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
          page={page}
        />
      </EuiAccordion>
      {isModalVisible && modalLayout}
    </div>
  );
};

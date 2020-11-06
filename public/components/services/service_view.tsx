import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiI18nNumber,
  EuiLink,
  EuiPage,
  EuiPageBody,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  handleServiceMapRequest,
  handleServiceViewRequest,
} from '../../requests/services_request_handler';
import { CoreDeps } from '../app';
import { filtersToDsl, PanelTitle, renderDatePicker, SearchBarProps } from '../common';
import { FilterType } from '../common/filters/filters';
import { ServiceMap, ServiceObject } from '../common/plots/service_map';

const renderTitle = (
  serviceName: string,
  startTime: SearchBarProps['startTime'],
  setStartTime: SearchBarProps['setStartTime'],
  endTime: SearchBarProps['endTime'],
  setEndTime: SearchBarProps['setEndTime'],
  addFilter: (filter: FilterType) => void
) => {
  return (
    <>
      <EuiFlexItem>
        <EuiTitle size="l">
          <h2 className="overview-content">{serviceName}</h2>
        </EuiTitle>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        {renderDatePicker(startTime, setStartTime, endTime, setEndTime)}
      </EuiFlexItem>
      <EuiFlexItem grow={false} />
      <EuiFlexItem grow={false}>
        <EuiButton
          onClick={() => {
            addFilter({
              field: 'serviceName',
              operator: 'is',
              value: serviceName,
              inverted: false,
              disabled: false,
              custom: {
                serviceName: serviceName,
              },
            });
            setTimeout(() => {
              location.assign('#/dashboard');
            }, 300);
          }}
        >
          View in dashboard
        </EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton
          onClick={() => {
            addFilter({
              field: 'serviceName',
              operator: 'is',
              value: serviceName,
              inverted: false,
              disabled: false,
              custom: {
                serviceName: serviceName,
              },
            });
            setTimeout(() => {
              location.assign('#/traces');
            }, 300);
          }}
        >
          View related traces
        </EuiButton>
      </EuiFlexItem>
    </>
  );
};

const renderOverview = (fields, addFilter, serviceName) => {
  return (
    <EuiPanel>
      <PanelTitle title="Overview" />
      <EuiHorizontalRule margin="m" />
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFlexGroup direction="column">
            <EuiFlexItem grow={false}>
              <EuiText className="overview-title">Name</EuiText>
              <EuiText size="s" className="overview-content">
                {serviceName || '-'}
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiText className="overview-title">Number of connected services</EuiText>
              <EuiText size="s" className="overview-content">
                {fields.number_of_connected_services || 0}
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiText className="overview-title">Connected services</EuiText>
              <EuiText size="s" className="overview-content">
                {fields.connected_services || '-'}
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFlexGroup direction="column">
            <EuiFlexItem grow={false}>
              <EuiText className="overview-title">Average latency (ms)</EuiText>
              <EuiText size="s" className="overview-content">
                {fields.average_latency || '-'}
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiText className="overview-title">Error rate</EuiText>
              <EuiText size="s" className="overview-content">
                {fields.error_rate || fields.error_rate === 0
                  ? _.round(fields.error_rate, 2).toString() + '%'
                  : '-'}
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiText className="overview-title">Throughput</EuiText>
              <EuiText size="s" className="overview-content">
                {fields.throughput ? <EuiI18nNumber value={fields.throughput} /> : '-'}
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiText className="overview-title">Traces</EuiText>
              <EuiText size="s" className="overview-content">
                <EuiLink
                  onClick={() => {
                    addFilter({
                      field: 'serviceName',
                      operator: 'is',
                      value: serviceName,
                      inverted: false,
                      disabled: false,
                      custom: {
                        serviceName: serviceName,
                      },
                    });
                    setTimeout(() => {
                      location.assign('#/traces');
                    }, 300);
                  }}
                >
                  <EuiI18nNumber value={fields.traces || 0} />
                </EuiLink>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
    </EuiPanel>
  );
};

interface ServiceViewProps extends SearchBarProps, CoreDeps {
  serviceName: string;
  addFilter: (filter: FilterType) => void;
}

export function ServiceView(props: ServiceViewProps) {
  const [fields, setFields] = useState({});
  const [serviceMap, setServiceMap] = useState<ServiceObject>({});
  const [serviceMapIdSelected, setServiceMapIdSelected] = useState('latency');

  useEffect(() => {
    props.setBreadcrumbs([
      {
        text: 'Trace analytics',
        href: '#',
      },
      {
        text: 'Services',
        href: '#services',
      },
      {
        text: props.serviceName,
        href: `#services/${encodeURIComponent(props.serviceName)}`,
      },
    ]);
  }, []);

  useEffect(() => {
    refresh();
  }, [props.startTime, props.endTime]);

  const refresh = () => {
    const DSL = filtersToDsl([], '', props.startTime, props.endTime);
    handleServiceViewRequest(props.serviceName, props.http, DSL, fields, setFields);
    handleServiceMapRequest(props.http, {}, serviceMap, setServiceMap);
  };

  return (
    <>
      <EuiPage>
        <EuiPageBody>
          <EuiFlexGroup alignItems="center" gutterSize="s">
            {renderTitle(
              props.serviceName,
              props.startTime,
              props.setStartTime,
              props.endTime,
              props.setEndTime,
              props.addFilter
            )}
          </EuiFlexGroup>
          <EuiSpacer size="xl" />
          {renderOverview(fields, props.addFilter, props.serviceName)}
          <EuiSpacer />
          <ServiceMap
            serviceMap={serviceMap}
            idSelected={serviceMapIdSelected}
            setIdSelected={setServiceMapIdSelected}
            currService={props.serviceName}
          />
        </EuiPageBody>
      </EuiPage>
    </>
  );
}

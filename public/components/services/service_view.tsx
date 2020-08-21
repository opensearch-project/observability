import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { CoreDeps } from '../app';
import { PanelTitle } from '../common';
import { renderDatePicker, SearchBarProps } from '../common';
import { ServiceMap } from './service_map';
import { handleServiceViewRequest } from '../../requests/services_request_handler';
import { EuiI18nNumber } from '@elastic/eui';
import { EuiLink } from '@elastic/eui';

const renderTitle = (serviceName, startTime, setStartTime, endTime, setEndTime) => {
  return (
    <>
      <EuiFlexItem>
        <EuiTitle size="l">
          <h2 style={{ fontWeight: 430 }}>{serviceName}</h2>
        </EuiTitle>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        {renderDatePicker(startTime, setStartTime, endTime, setEndTime)}
      </EuiFlexItem>
      <EuiFlexItem grow={false} />
      <EuiFlexItem grow={false}>
        <EuiButton>View in dashboard</EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton>View related traces</EuiButton>
      </EuiFlexItem>
    </>
  );
};

const renderOverview = (fields) => {
  return (
    <EuiPanel>
      <PanelTitle title="Overview" />
      <EuiHorizontalRule margin="m" />
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFlexGroup direction="column">
            <EuiFlexItem grow={false}>
              <EuiText style={{ color: '#333333', fontWeight: 370 }}>Name</EuiText>
              <EuiText size="s" style={{ fontWeight: 430 }}>{fields.name}</EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiText style={{ color: '#333333', fontWeight: 370 }}>Number of connected services</EuiText>
              <EuiText size="s" style={{ fontWeight: 430 }}>{fields.number_of_connected_services}</EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiText style={{ color: '#333333', fontWeight: 370 }}>Connected services</EuiText>
              <EuiText size="s" style={{ fontWeight: 430 }}>{fields.connected_services}</EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFlexGroup direction="column">
            <EuiFlexItem>
              <EuiText style={{ color: '#333333', fontWeight: 370 }}>Average latency (ms)</EuiText>
              <EuiText size="s" style={{ fontWeight: 430 }}>{_.round(fields.average_latency, 2)}</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiText style={{ color: '#333333', fontWeight: 370 }}>Error rate</EuiText>
              <EuiText size="s" style={{ fontWeight: 430 }}>{_.round(fields.error_rate, 2)}%</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiText style={{ color: '#333333', fontWeight: 370 }}>Throughput</EuiText>
              <EuiText size="s" style={{ fontWeight: 430 }}><EuiI18nNumber value={fields.throughput} /></EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiText style={{ color: '#333333', fontWeight: 370 }}>Traces</EuiText>
              <EuiText size="s" style={{ fontWeight: 430 }}>
                <EuiLink href='#traces'>
                  <EuiI18nNumber value={fields.traces} />
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
}

export function ServiceView(props: ServiceViewProps) {
  const [fields, setFields] = useState({});

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
        href: `#services/${props.serviceName}`,
      },
    ]);
    handleServiceViewRequest(props.serviceName, props.http, fields, setFields);
  }, []);

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
              props.setEndTime
            )}
          </EuiFlexGroup>
          <EuiSpacer size="xl" />
          {renderOverview(fields)}
          <EuiSpacer />
          <ServiceMap />
        </EuiPageBody>
      </EuiPage>
    </>
  );
}

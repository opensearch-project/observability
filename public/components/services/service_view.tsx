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
import React, { useEffect } from 'react';
import { CoreDeps } from '../app';
import { PanelTitle } from '../common';
import { renderDatePicker, SearchBarProps } from '../common';
import { ServiceMap } from './service_map';

const renderTitle = (serviceId, startTime, setStartTime, endTime, setEndTime) => {
  return (
    <>
      <EuiFlexItem>
        <EuiTitle size="l">
          <h2 style={{ fontWeight: 430 }}>{serviceId}</h2>
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

const renderField = (field, value, grow = true) => {
  return (
    <>
      <EuiFlexItem grow={grow}>
        {field && value && (
          <>
            <EuiText style={{ color: '#333333', fontWeight: 370 }}>{field}</EuiText>
            <EuiText size="s" style={{ fontWeight: 430 }}>
              {value}
            </EuiText>
          </>
        )}
      </EuiFlexItem>
    </>
  );
};

const renderOverview = () => {
  const fields = [
    'Name',
    'Number of connected services',
    'Connected services',
    'Average latency (ms)',
    'Error rate',
    'Throughput',
    'Traces',
  ];
  const values = [
    'Payment',
    '4',
    'Order, BankVerify, Account, Order',
    '68',
    '20%',
    '24,000',
    '1,500',
  ];
  return (
    <EuiPanel>
      <PanelTitle title="Overview" />
      <EuiHorizontalRule margin="m" />
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFlexGroup direction="column">
            {fields.slice(0, 3).map((field, i) => renderField(field, values[i], false))}
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFlexGroup direction="column">
            {fields.slice(3).map((field, i) => renderField(field, values[i + 3]))}
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
    </EuiPanel>
  );
};

interface ServiceViewProps extends SearchBarProps, CoreDeps {
  serviceId: string;
}

export function ServiceView(props: ServiceViewProps) {
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
        text: props.serviceId,
        href: `#services/${props.serviceId}`,
      },
    ]);
  });

  return (
    <>
      <EuiPage>
        <EuiPageBody>
          <EuiFlexGroup alignItems="center" gutterSize="s">
            {renderTitle(
              props.serviceId,
              props.startTime,
              props.setStartTime,
              props.endTime,
              props.setEndTime
            )}
          </EuiFlexGroup>
          <EuiSpacer size="xl" />
          {renderOverview()}
          <EuiSpacer />
          <ServiceMap />
        </EuiPageBody>
      </EuiPage>
    </>
  );
}

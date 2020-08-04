import { EuiButton, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiHorizontalRule, EuiPage, EuiPageBody, EuiPanel, EuiSpacer, EuiSuperSelect, EuiText, EuiTitle } from '@elastic/eui';
import React, { useEffect } from 'react';
import { PanelTitle } from '../common/panel_title';
import { EuiCodeBlock } from '@elastic/eui';
import { traceViewPayloadData } from '../../data/trace_view_payload_data';
import { renderDatePicker } from '../common/search_bar';
import { ServiceMap } from '../dashboard/service_map';


const renderTitle = (ID) => {
  return (
    <>
      <EuiFlexItem>
        <EuiTitle size='l'><h2 style={{ fontWeight: 430 }}>{ID}</h2></EuiTitle>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        {renderDatePicker()}
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton >View in dashboard</EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton >View related traces</EuiButton>
      </EuiFlexItem>
    </>
  )
}

const renderField = (field, value, grow=true) => {
  return (
    <>
      <EuiFlexItem grow={grow}>
        {field && value && (
          <>
            <EuiText style={{ color: '#333333', fontWeight: 370 }}>{field}</EuiText>
            <EuiText size='s' style={{ fontWeight: 430 }}>{value}</EuiText>
          </>
        )}
      </EuiFlexItem>
    </>
  )
}

const renderOverview = () => {
  const fields = [
    'Name',
    'Number of connected services',
    'Connected services',
    'Average latency (ms)',
    'Error rate',
    'Throughput',
    'Traces',
  ]
  const values = [
    'Payment',
    '4',
    'Order, BankVerify, Account, Order',
    '68',
    '20%',
    '24,000',
    '1,500',
  ]
  return (
    <EuiPanel>
      <PanelTitle title='Overview' />
      <EuiHorizontalRule margin='m' />
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFlexGroup direction='column'>
            {fields.slice(0, 3).map((field, i) =>
              renderField(field, values[i], false)
            )}
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFlexGroup direction='column'>
            {fields.slice(3).map((field, i) =>
              renderField(field, values[i + 3])
            )}
          </EuiFlexGroup>
            </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
    </EuiPanel>
  )
}

export function ServiceView(props) {
  
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
          <EuiFlexGroup alignItems='center' gutterSize='s'>
            {renderTitle(props.serviceId)}
          </EuiFlexGroup>
          <EuiSpacer size='xl' />
          {renderOverview()}
          <EuiSpacer />
        <ServiceMap />
        </EuiPageBody>
      </EuiPage>
    </>
  )
}

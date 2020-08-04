import { EuiButton, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiHorizontalRule, EuiPage, EuiPageBody, EuiPanel, EuiSpacer, EuiSuperSelect, EuiText, EuiTitle } from '@elastic/eui';
import React, { useEffect } from 'react';
import { PanelTitle } from '../common/panel_title';
import { EuiCodeBlock } from '@elastic/eui';
import { traceViewPayloadData } from '../../data/trace_view_payload_data';


const renderTitle = (ID) => {
  return (
    <>
      <EuiFlexItem>
        <EuiTitle size='l'><h2 style={{ fontWeight: 430 }}>{ID}</h2></EuiTitle>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiText size='xs'>Benchmark</EuiText>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiSuperSelect
          options={[
            {
              value: 'option_one',
              inputDisplay: 'This time last week',
            },
            {
              value: 'option_2',
              inputDisplay: 'This time last week',
            },
            {
              value: 'option_3',
              inputDisplay: 'This time last week',
            }
          ]}
          valueOfSelected={'option_one'}
          onChange={() => { }}
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton iconType='popout' iconSide='right' >View log</EuiButton>
      </EuiFlexItem>
    </>
  )
}

const renderField = (field, value) => {
  return (
    <>
      <EuiFlexItem>
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
    'Trace ID',
    'Trace group name',
    'Last updated',
    'User ID',
    'Latency',
    'Latency vs Benchmark',
    'Percentile in trace group',
    '',
    'Errors',
    'Errors vs benchmark',
  ]
  const values = [
    'afe',
    'makePayment.auto',
    '03/20/2020 08:03',
    'admin123',
    '75ms',
    '30%',
    '99th',
    '',
    '4',
    '300%',
  ]
  return (
    <EuiPanel>
      <PanelTitle title='Overview' />
      <EuiHorizontalRule margin='m' />
      <EuiFlexGrid columns={3} direction='column'>
        {fields.map((field, i) =>
          renderField(field, values[i])
        )}
      </EuiFlexGrid>
    </EuiPanel>
  )
}

export function TraceView(props) {
  
  useEffect(() => {
    props.setBreadcrumbs([
      {
        text: 'Trace analytics',
        href: '#',
      },
      {
        text: 'Traces',
        href: '#traces',
      },
      {
        text: props.traceId,
        href: `#traces/${props.traceId}`,
      },
    ]);
  });

  return (
    <>
      <EuiPage>
        <EuiPageBody>
          <EuiFlexGroup alignItems='center' gutterSize='s'>
            {renderTitle(props.traceId)}
          </EuiFlexGroup>
          <EuiSpacer size='xl' />
          {renderOverview()}

          <EuiSpacer />
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiPanel>
                <PanelTitle title='Service breakdown' />
                <EuiHorizontalRule margin='m' />
                <div style={{ width: 400, height: 400 }}></div>
              </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiPanel>
                <PanelTitle title='Span detail' />
                <EuiHorizontalRule margin='m' />
                <div style={{ width: 650, height: 400 }}></div>
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />

          <EuiPanel>
            <EuiFlexGroup>
              <EuiFlexItem>
                <PanelTitle title='Payload' />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton iconType='popout' iconSide='right' >View log</EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiHorizontalRule margin='m' />
            <EuiCodeBlock language="json" paddingSize="s" isCopyable overflowHeight={500}>
              {traceViewPayloadData}
            </EuiCodeBlock>
          </EuiPanel>

        </EuiPageBody>
      </EuiPage>
    </>
  )
}

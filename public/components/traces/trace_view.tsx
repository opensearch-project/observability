import {
  EuiButton,
  EuiCodeBlock,
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPanel,
  EuiSpacer,
  EuiSuperSelect,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import React, { useEffect } from 'react';
import { traceViewPayloadData } from '../../data/trace_view_payload_data';
// import { traceViewPayloadData } from '../../data/trace_view_data';
import { PanelTitle } from '../common';
import { CoreDeps } from '../app';
import { SpanDetailPlt } from './span_detail_plt';
import { ServiceBreakdownPlt } from './service_breakdown_plt';

const renderTitle = (ID) => {
  return (
    <>
      <EuiFlexItem>
        <EuiTitle size="l">
          <h2 style={{ fontWeight: 430 }}>{ID}</h2>
        </EuiTitle>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiText size="xs">Benchmark</EuiText>
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
              inputDisplay: 'This time yesterday',
            },
            {
              value: 'option_3',
              inputDisplay: 'This time last month',
            },
          ]}
          valueOfSelected={'option_one'}
          onChange={() => {}}
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton iconType="popout" iconSide="right">
          View log
        </EuiButton>
      </EuiFlexItem>
    </>
  );
};

const renderField = (field, value) => {
  return (
    <>
      <EuiFlexItem>
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
  ];
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
  ];
  return (
    <EuiPanel>
      <PanelTitle title="Overview" />
      <EuiHorizontalRule margin="m" />
      <EuiFlexGrid columns={3} direction="column">
        {fields.map((field, i) => renderField(field, values[i]))}
      </EuiFlexGrid>
    </EuiPanel>
  );
};

interface TraceViewProps extends CoreDeps {
  traceId: string;
}

export function TraceView(props: TraceViewProps) {
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
  }, []);

  return (
    <>
      <EuiPage>
        <EuiPageBody>
          <EuiFlexGroup alignItems="center" gutterSize="s">
            {renderTitle(props.traceId)}
          </EuiFlexGroup>
          <EuiSpacer size="xl" />
          {renderOverview()}

          <EuiSpacer />
          <EuiFlexGroup>
            <EuiFlexItem grow={3}>
              <ServiceBreakdownPlt />
            </EuiFlexItem>
            <EuiFlexItem grow={7}>
              <SpanDetailPlt />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />

          <EuiPanel>
            <EuiFlexGroup>
              <EuiFlexItem>
                <PanelTitle title="Payload" />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton iconType="popout" iconSide="right">
                  View log
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiHorizontalRule margin="m" />
            <EuiCodeBlock language="json" paddingSize="s" isCopyable overflowHeight={500}>
              {traceViewPayloadData}
            </EuiCodeBlock>
          </EuiPanel>
        </EuiPageBody>
      </EuiPage>
    </>
  );
}

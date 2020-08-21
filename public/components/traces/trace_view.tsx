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
import React, { useEffect, useState } from 'react';
import { traceViewPayloadData } from '../../data/trace_view_payload_data';
// import { traceViewPayloadData } from '../../data/trace_view_data';
import { PanelTitle, renderBenchmark } from '../common';
import { CoreDeps } from '../app';
import { SpanDetailPlt } from './span_detail_plt';
import { ServiceBreakdownPlt } from './service_breakdown_plt';
import { handleTraceViewRequest } from '../../requests/traces_request_handler';

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
          onChange={() => { }}
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

const renderOverview = (fields) => {
  return (
    <EuiPanel>
      <PanelTitle title="Overview" />
      <EuiHorizontalRule margin="m" />
      <EuiFlexGrid columns={3} direction="column">
        {/* {fields.map((field, i) => renderField(field, values[i]))} */}
        <EuiFlexItem>
          <EuiText style={{ color: '#333333', fontWeight: 370 }}>Trace ID</EuiText>
          <EuiText size="s" style={{ fontWeight: 430 }}>{fields.trace_id}</EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText style={{ color: '#333333', fontWeight: 370 }}>Trace group name</EuiText>
          <EuiText size="s" style={{ fontWeight: 430 }}>{fields.trace_group}</EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText style={{ color: '#333333', fontWeight: 370 }}>Last updated</EuiText>
          <EuiText size="s" style={{ fontWeight: 430 }}>{fields.last_updated}</EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText style={{ color: '#333333', fontWeight: 370 }}>User ID</EuiText>
          <EuiText size="s" style={{ fontWeight: 430 }}>{fields.user_id}</EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText style={{ color: '#333333', fontWeight: 370 }}>Latency</EuiText>
          <EuiText size="s" style={{ fontWeight: 430 }}>{fields.latency}</EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText style={{ color: '#333333', fontWeight: 370 }}>Latency vs Benchmark</EuiText>
          <EuiText size="s" style={{ fontWeight: 430 }}>{renderBenchmark(fields.latency_vs_benchmark) || '-'}</EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText style={{ color: '#333333', fontWeight: 370 }}>Percentile in trace group</EuiText>
          <EuiText size="s" style={{ fontWeight: 430 }}>{fields.percentile_in_trace_group}</EuiText>
        </EuiFlexItem>
        <EuiFlexItem />
        <EuiFlexItem>
          <EuiText style={{ color: '#333333', fontWeight: 370 }}>Errors</EuiText>
          <EuiText size="s" style={{ fontWeight: 430 }}>{fields.error_count}</EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText style={{ color: '#333333', fontWeight: 370 }}>Errors vs Benchmark</EuiText>
          <EuiText size="s" style={{ fontWeight: 430 }}>{renderBenchmark(fields.errors_vs_benchmark) || '-'}</EuiText>
        </EuiFlexItem>
      </EuiFlexGrid>
    </EuiPanel>
  );
};

interface TraceViewProps extends CoreDeps {
  traceId: string;
}

export function TraceView(props: TraceViewProps) {
  const [fields, setFields] = useState({});

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
    handleTraceViewRequest(props.traceId, props.http, fields, setFields);
  }, []);

  return (
    <>
      <EuiPage>
        <EuiPageBody>
          <EuiFlexGroup alignItems="center" gutterSize="s">
            {renderTitle(props.traceId)}
          </EuiFlexGroup>
          <EuiSpacer size="xl" />
          {renderOverview(fields)}

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

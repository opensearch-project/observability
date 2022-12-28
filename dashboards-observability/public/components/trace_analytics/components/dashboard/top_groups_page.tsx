import { EuiAccordion, EuiButtonGroup, EuiHorizontalRule, EuiPanel, EuiSpacer, EuiTableRow } from '@elastic/eui';
import React, { useState } from 'react';
import { FilterType } from '../common/filters/filters';
import { ErrorRatePlt } from '../common/plots/error_rate_plt';
import { ThroughputPlt } from '../common/plots/throughput_plt';
import { ErrorRatesTable } from './top_error_rates_table';
import { LatencyTable } from './top_latency_table';

export function TopGroupsPage( props: {
    filters: FilterType[],
    addFilter: (filter: FilterType) => void,
    addFilters: (filter: FilterType[]) => void,
    addPercentileFilter: (condition?: 'gte' | 'lte', additionalFilters?: FilterType[]) => void,
    setRedirect: (redirect: boolean) => void,
    loading: boolean,
    page: 'dashboard' | 'traces' | 'services' | 'app',
    throughPutItems: { items: any[]; fixedInterval: string },
    jaegerErrorRatePltItems: {items: any[]; fixedInterval: string},
    jaegerErrorTableItems: any[],
    jaegerTableItems: any[],
    setStartTime: (time: string) => void,
    setEndTime: (time: string) => void,
} ) {
  const toggleButtons = [
    {
      id: 'error_rate',
      label: 'Error rate',
    },
    {
      id: 'throughput',
      label: 'Throughput',
    },
  ];
  const [idSelected, setIdSelected] = useState('error_rate')
      return (
        <>
        { idSelected === 'error_rate' ? (
        <EuiPanel>
          <EuiSpacer size="m" />
          <EuiButtonGroup
            options={toggleButtons}
            idSelected={idSelected}
            onChange={(id) => setIdSelected(id as 'error_rate' | 'throughput')}
            buttonSize="s"
            color="text"
          />
          <EuiHorizontalRule margin="m"/>
          <ErrorRatePlt items={props.jaegerErrorRatePltItems} setStartTime={props.setStartTime} setEndTime={props.setEndTime}/>
          <EuiHorizontalRule margin="m" />
          <ErrorRatesTable title={'Top Service and Operation Error Rates'}items={props.jaegerErrorTableItems} {...props}/>
        </EuiPanel>) : (
          <EuiPanel>
          <EuiSpacer size="m" />
          <EuiButtonGroup
            options={toggleButtons}
            idSelected={idSelected}
            onChange={(id) => setIdSelected(id as 'error_rate' | 'throughput')}
            buttonSize="s"
            color="text"
          />
          <EuiHorizontalRule margin="m"/>
          <ThroughputPlt items={props.throughPutItems} setStartTime={props.setStartTime} setEndTime={props.setEndTime}/>
          <EuiHorizontalRule margin="m" />
          <LatencyTable title={'Top Service and Operation Latency'}items={props.jaegerTableItems} {...props}/>
        </EuiPanel> )}
        </>
      )
  }
import { EuiHorizontalRule, EuiPanel, EuiFlexGrid, EuiFlexItem, EuiText, EuiFormLegend, EuiFlexGroup, EuiSpacer, EuiHealth } from '@elastic/eui';
import React from 'react';
import { serviceBreakdownData, serviceBreakdownLayout, serviceBreakdownMetadata } from '../../data/trace_view_data';
import { PanelTitle } from '../common';
import { Plt } from '../common/plt';
import { renderBenchmark } from '../common';

const renderStats = (serviceBreakdownData) => {
  return serviceBreakdownData.length > 0 ? (
    <EuiFlexGroup>
      <EuiFlexGroup direction='column' alignItems='flexStart' gutterSize='m'>
        <EuiFlexItem />
        {serviceBreakdownData[0].marker.colors.map((color, i) => (
          <EuiFlexItem>
            <EuiHealth color={color}>{serviceBreakdownData[0].labels[i]}</EuiHealth>
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
      <EuiFlexItem />
      <EuiFlexGroup direction='column' alignItems='flexEnd' gutterSize='m'>
        <EuiFlexItem><EuiText size='s'>%time spent</EuiText></EuiFlexItem>
        {serviceBreakdownData[0].values.map(value => (
          <EuiFlexItem>
            <EuiText size='s'>{_.round(value, 2)}%</EuiText>
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
      <EuiFlexItem />
      <EuiFlexGroup direction='column' alignItems='flexEnd' gutterSize='m'>
        <EuiFlexItem><EuiText size='s'>vs benchmark</EuiText></EuiFlexItem>
        {serviceBreakdownData[0].benchmarks.map(benchmark => (
          <EuiFlexItem>
            {renderBenchmark(benchmark)}
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
    </EuiFlexGroup>
  ) : (null)
}

export function ServiceBreakdownPlt(props) {
  return (
    <>
      <EuiPanel>
        <PanelTitle title="Service breakdown" />
        <EuiHorizontalRule margin="m" />
        <EuiFlexGroup direction='column' alignItems='center'>
          <EuiFlexItem>
            {props.data?.length > 0 ? <Plt data={props.data} layout={serviceBreakdownLayout} /> : (null)}
          </EuiFlexItem>
          <EuiSpacer />
          <EuiFlexItem>
            {renderStats(props.data)}
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />
      </EuiPanel>
    </>
  );
}

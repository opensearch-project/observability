import { EuiHorizontalRule, EuiPanel, EuiFlexGrid, EuiFlexItem, EuiText, EuiFormLegend, EuiFlexGroup, EuiSpacer, EuiHealth } from '@elastic/eui';
import React from 'react';
import { PanelTitle } from '../common';
import { Plt } from '../common/plt';
import { renderBenchmark } from '../common';

const renderStats = (serviceBreakdownData) => {
  return serviceBreakdownData.length > 0 ? (
    <EuiFlexGroup>
      <EuiFlexGroup direction='column' alignItems='flexStart' gutterSize='m'>
        <EuiFlexItem />
        {serviceBreakdownData[0].marker.colors.map((color, i) => (
          <EuiFlexItem key={`label-${i}`}>
            <EuiHealth color={color}>{serviceBreakdownData[0].labels[i]}</EuiHealth>
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
      <EuiFlexItem />
      <EuiFlexGroup direction='column' alignItems='flexEnd' gutterSize='m'>
        <EuiFlexItem><EuiText size='s'>%time spent</EuiText></EuiFlexItem>
        {serviceBreakdownData[0].values.map((value, i) => (
          <EuiFlexItem key={`value-${i}`}>
            <EuiText size='s'>{_.round(value, 2)}%</EuiText>
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
      <EuiFlexItem />
      <EuiFlexGroup direction='column' alignItems='flexEnd' gutterSize='m'>
        <EuiFlexItem><EuiText size='s'>vs benchmark</EuiText></EuiFlexItem>
        {serviceBreakdownData[0].benchmarks.map((benchmark, i) => (
          <EuiFlexItem key={`benchmark-${i}`}>
            {renderBenchmark(benchmark)}
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
    </EuiFlexGroup>
  ) : (null)
}

const layout = {
  height: 200,
  width: 200,
  // showlegend: false,
  legend: {
    orientation: 'h',
    traceorder: 'normal',
    x: 0,
    xanchor: 'left',
    y: 1.5
  },
  margin: {
    l: 5,
    r: 5,
    b: 5,
    t: 5,  // 10
  },
}

export function ServiceBreakdownPlt(props) {
  return (
    <>
      <EuiPanel>
        <PanelTitle title="Service breakdown" />
        <EuiHorizontalRule margin="m" />
        <EuiFlexGroup direction='column' alignItems='center'>
          <EuiFlexItem>
            {props.data?.length > 0 ? <Plt data={props.data} layout={layout} /> : (null)}
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

import { EuiHorizontalRule, EuiPanel, EuiFlexGrid, EuiFlexItem, EuiText, EuiFormLegend, EuiFlexGroup, EuiSpacer, EuiHealth } from '@elastic/eui';
import React from 'react';
import { serviceBreakdownData, serviceBreakdownLayout, serviceBreakdownMetadata } from '../../data/trace_view_data';
import { PanelTitle } from '../common/helper_functions';
import { Plt } from '../common/plt';
import { renderBenchmark } from '../common/helper_functions';


const renderStats = (metadata) => {
  return (
    <EuiFlexGroup gutterSize='xl'>
      <EuiFlexGroup direction='column' alignItems='flexStart' gutterSize='m'>
        <EuiFlexItem />
        {metadata.map(service => (
          <EuiFlexItem>
            <EuiHealth color={service.color}>{service.name}</EuiHealth>
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
      <EuiFlexItem />
      <EuiFlexGroup direction='column' alignItems='flexEnd' gutterSize='m'>
        <EuiFlexItem><EuiText size='s'>%time spent</EuiText></EuiFlexItem>
        {metadata.map(service => (
          <EuiFlexItem>
            <EuiText size='s'>{service.value}%</EuiText>
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
      <EuiFlexItem />
      <EuiFlexGroup direction='column' alignItems='flexEnd' gutterSize='m'>
        <EuiFlexItem><EuiText size='s'>vs benchmark</EuiText></EuiFlexItem>
        {metadata.map(service => (
          <EuiFlexItem>
            {renderBenchmark(service.benchmark)}
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
    </EuiFlexGroup>
  )
}

export function ServiceBreakdownPlt() {
  return (
    <>
      <EuiPanel>
        <PanelTitle title="Service breakdown" />
        <EuiHorizontalRule margin="m" />
        <EuiFlexGroup direction='column' alignItems='center'>
          <EuiFlexItem>
            <Plt data={serviceBreakdownData} layout={serviceBreakdownLayout} />
          </EuiFlexItem>
          <EuiSpacer />
          <EuiFlexItem>
            {renderStats(serviceBreakdownMetadata)}
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </>
  );
}

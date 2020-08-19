import { EuiHorizontalRule, EuiPanel, EuiSpacer, EuiFlexItem, EuiFlexGroup, EuiText } from '@elastic/eui';
import React from 'react';
import { PanelTitle } from '../common';
import { dashboardThroughputData, dashboardThroughputLayout } from '../../data/dashboard_data';
import { Plt } from '../common/plt';
import { spanDetailLayout, spanDetailData } from '../../data/trace_view_data';

const renderStats = () => {
  return (
    <EuiFlexGroup direction='column' gutterSize='xs'>
      <EuiFlexItem><EuiText size='s'>Time spent</EuiText></EuiFlexItem>
      <EuiFlexItem><EuiText size='s'>80ms</EuiText></EuiFlexItem>
      <EuiFlexItem><EuiText size='s'>74ms</EuiText></EuiFlexItem>
      <EuiFlexItem><EuiText size='s'>60ms</EuiText></EuiFlexItem>
      <EuiFlexItem><EuiText size='s'>40ms</EuiText></EuiFlexItem>
      <EuiFlexItem><EuiText size='s'>32ms</EuiText></EuiFlexItem>
      <EuiFlexItem><EuiText size='s'>24ms</EuiText></EuiFlexItem>
      <EuiFlexItem><EuiText size='s'>32ms</EuiText></EuiFlexItem>
      <EuiFlexItem><EuiText size='s'>18ms</EuiText></EuiFlexItem>
      <EuiFlexItem><EuiText size='s'>12ms</EuiText></EuiFlexItem>
      <EuiFlexItem><EuiText size='s'>12ms</EuiText></EuiFlexItem>
    </EuiFlexGroup>
  )
}

export function SpanDetailPlt() {
  return (
    <>
      <EuiPanel>
        <PanelTitle title="Span detail" />
        <EuiHorizontalRule margin="m" />
        <EuiFlexGroup justifyContent='flexEnd' >
          {/* <EuiFlexItem grow={false}>
            {renderStats()}
          </EuiFlexItem> */}
          <EuiFlexItem>
            <Plt data={spanDetailData} layout={spanDetailLayout} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </>
  );
}

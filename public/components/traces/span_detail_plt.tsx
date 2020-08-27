import { EuiHorizontalRule, EuiPanel, EuiSpacer, EuiFlexItem, EuiFlexGroup, EuiText } from '@elastic/eui';
import React from 'react';
import { PanelTitle } from '../common';
import { dashboardThroughputData, dashboardThroughputLayout } from '../../data/dashboard_data';
import { Plt } from '../common/plt';

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

const getSpanDetailLayout = (data) => {
  // remove uuid when displaying y-ticks
  const yLabels = data.map(d => d.y[0]).filter((label, i, self) => self.indexOf(label) === i);
  const yTexts = yLabels.map(label => label.substring(0, label.length - 36))

  return {
    height: 500,
    width: 800,
    margin: {
      l: 200,
      r: 5,
      b: 30,
      t: 30,  // 10
    },
    xaxis: {
      autorange: true,
      ticksuffix: " ms",
      side: 'top',
      color: '#91989c',
      showline: true,
    },
    yaxis: {
      showgrid: false,
      tickvals: yLabels,
      ticktext: yTexts,
    }
  }
}

export function SpanDetailPlt(props) {
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
            <Plt data={props.data} layout={getSpanDetailLayout(props.data)} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </>
  );
}

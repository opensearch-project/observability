import { EuiHorizontalRule, EuiPanel, EuiSpacer, EuiFlexItem, EuiFlexGroup, EuiText } from '@elastic/eui';
import React from 'react';
import { PanelTitle, renderBenchmark } from '../common';
import { Plt } from '../common/plt';

const renderStats = (spanDetailData) => {
  return spanDetailData.length > 0 ? (
    <EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFlexGroup direction='column' alignItems='flexStart' gutterSize='m'>
            <EuiFlexItem />
            {spanDetailData.map((span, i) => (
              <EuiFlexItem key={`label-${i}`}>
                <EuiText size='s'>{span.y[0].substring(0, span.y[0].length - 36)}</EuiText>
              </EuiFlexItem>
            ))}
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem />
        <EuiFlexItem>
          <EuiFlexGroup direction='column' alignItems='flexEnd' gutterSize='m'>
            <EuiFlexItem><EuiText size='s'>Time spent</EuiText></EuiFlexItem>
            {spanDetailData.map((span, i) => (
              <EuiFlexItem key={`latency-${i}`}>
                <EuiText size='s'>{span.x[0]}</EuiText>
              </EuiFlexItem>
            ))}
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem />
        <EuiFlexItem>
          <EuiFlexGroup direction='column' alignItems='flexEnd' gutterSize='m'>
            <EuiFlexItem><EuiText size='s'>vs benchmark</EuiText></EuiFlexItem>
            {spanDetailData.map((span, i) => (
              <EuiFlexItem key={`benchmark-${i}`}>
                {renderBenchmark(0)}
              </EuiFlexItem>
            ))}
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexGroup>
  ) : (null)
}

const getSpanDetailLayout = (plotTraces) => {
  // get unique labels from traces
  const yLabels = plotTraces.map(d => d.y[0]).filter((label, i, self) => self.indexOf(label) === i);
  // remove uuid when displaying y-ticks
  const yTexts = yLabels.map(label => label.substring(0, label.length - 36))

  return {
    height: 25 * plotTraces.length + 60,
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
        <EuiFlexGroup justifyContent='center' >
          {/* <EuiFlexItem grow={false}>
            {renderStats(props.data)}
          </EuiFlexItem> */}
          <EuiFlexItem style={{ overflowY: 'auto', maxHeight: 500 }}>
            <Plt data={props.data} layout={getSpanDetailLayout(props.data)} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </>
  );
}

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiHealth,
  EuiHorizontalRule,
  EuiPanel,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import _ from 'lodash';
import React from 'react';
import { PanelTitle, renderBenchmark } from '../common';
import { Plt } from '../common/plots/plt';

const renderStats = (serviceBreakdownData) => {
  return serviceBreakdownData.length > 0 ? (
    <EuiFlexGroup responsive={false}>
      <EuiFlexItem>
        <EuiFlexGroup direction="column" alignItems="flexStart" gutterSize="m" responsive={false}>
          {serviceBreakdownData[0].marker.colors.map((color, i) => (
            <EuiFlexItem key={`label-${i}`}>
              <EuiHealth color={color}>{serviceBreakdownData[0].labels[i]}</EuiHealth>
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem />
      <EuiFlexItem />
      <EuiFlexItem>
        <EuiFlexGroup direction="column" alignItems="flexEnd" gutterSize="m" responsive={false}>
          {serviceBreakdownData[0].values.map((value, i) => (
            <EuiFlexItem key={`value-${i}`}>
              <EuiText size="s">{_.round(value, 2)}%</EuiText>
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  ) : null;
};

const layout = {
  height: 200,
  width: 200,
  // showlegend: false,
  legend: {
    orientation: 'h',
    traceorder: 'normal',
    x: 0,
    xanchor: 'left',
    y: 1.5,
  },
  margin: {
    l: 5,
    r: 5,
    b: 5,
    t: 5, // 10
  },
} as Partial<Plotly.Layout>;

export function ServiceBreakdownPanel(props: { data: Plotly.Data[] }) {
  return (
    <>
      <EuiPanel>
        <PanelTitle title="Time spent by service" />
        <EuiHorizontalRule margin="m" />
        <EuiFlexGroup direction="column" alignItems="center">
          <EuiFlexItem>
            {props.data?.length > 0 ? <Plt data={props.data} layout={layout} /> : null}
          </EuiFlexItem>
          <EuiSpacer />
          <EuiFlexItem>{renderStats(props.data)}</EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />
      </EuiPanel>
    </>
  );
}

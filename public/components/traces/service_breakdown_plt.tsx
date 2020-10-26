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
import { Plt } from '../common/plt';

// breaks when window width too small
// const renderStats = (serviceBreakdownData) => {
//   if (serviceBreakdownData.length === 0)
//     return null;
//   const trace = serviceBreakdownData[0];
//   return (
//     <EuiFlexGrid columns={3} responsive={false}>
//       <EuiFlexItem />
//       <EuiFlexItem>
//         <EuiText size='s'>%time spent</EuiText>
//       </EuiFlexItem>
//       <EuiFlexItem>
//         <EuiText size='s'>%time spent</EuiText>
//       </EuiFlexItem>
//       {serviceBreakdownData[0].labels.map((label, i) => (
//         <>
//           <EuiFlexItem key={`row-${i}`}>
//             <EuiHealth color={trace.marker.colors[i]}>{label}</EuiHealth>
//           </EuiFlexItem>
//           <EuiFlexItem>
//             <EuiText size='s'>{_.round(trace.values[i], 2)}%</EuiText>
//           </EuiFlexItem>
//           <EuiFlexItem>
//             {renderBenchmark(trace.benchmarks[i])}
//           </EuiFlexItem>
//         </>
//       ))}
//     </EuiFlexGrid>
//   );
// }

const renderStats = (serviceBreakdownData) => {
  return serviceBreakdownData.length > 0 ? (
    <EuiFlexGroup responsive={false}>
      <EuiFlexGroup direction="column" alignItems="flexStart" gutterSize="m" responsive={false}>
        <EuiFlexItem />
        {serviceBreakdownData[0].marker.colors.map((color, i) => (
          <EuiFlexItem key={`label-${i}`}>
            <EuiHealth color={color}>{serviceBreakdownData[0].labels[i]}</EuiHealth>
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
      <EuiFlexItem />
      <EuiFlexGroup direction="column" alignItems="flexEnd" gutterSize="m" responsive={false}>
        <EuiFlexItem>
          <EuiText size="s">%time spent</EuiText>
        </EuiFlexItem>
        {serviceBreakdownData[0].values.map((value, i) => (
          <EuiFlexItem key={`value-${i}`}>
            <EuiText size="s">{_.round(value, 2)}%</EuiText>
          </EuiFlexItem>
        ))}
      </EuiFlexGroup>
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

export function ServiceBreakdownPlt(props: { data: Plotly.Data[] }) {
  return (
    <>
      <EuiPanel>
        <PanelTitle title="Service breakdown" />
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

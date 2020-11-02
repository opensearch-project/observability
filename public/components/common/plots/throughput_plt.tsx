import { EuiHorizontalRule, EuiPanel } from '@elastic/eui';
import React from 'react';
import { fixedIntervalToTickFormat, PanelTitle } from '..';
import { Plt } from './plt';

export function ThroughputPlt(props: { items: { items: Plotly.Data[]; fixedInterval: string } }) {
  const layout = {
    width: 400,
    height: 217,
    margin: {
      l: 50,
      r: 5,
      b: 50,
      t: 30, // 10
      pad: 4,
    },
    annotations: props.items.items.length > 0 && [
      {
        x: props.items.items[0].x[props.items.items[0].x.length - 1],
        y: 0,
        showarrow: true,
        arrowhead: 0,
        xref: 'x',
        yref: 'y',
        text: `Now: ${props.items.items[0].y[props.items.items[0].y.length - 1]}`,
        ax: 0,
        ay: -160,
        borderpad: 10,
        arrowwidth: 0.7,
      },
    ],
    xaxis: {
      fixedrange: true,
      showgrid: false,
      visible: true,
      type: 'date',
      tickformat: fixedIntervalToTickFormat(props.items.fixedInterval),
      color: '#899195',
    },
    yaxis: {
      title: {
        text: 'Throughput',
        font: {
          size: 12,
        },
      },
      fixedrange: true,
      gridcolor: '#d9d9d9',
      showgrid: true,
      // showline: true,
      // zeroline: true,
      visible: true,
      color: '#899195',
    },
  } as Partial<Plotly.Layout>;

  return (
    <>
      <EuiPanel>
        <PanelTitle title="Throughput over time" />
        <EuiHorizontalRule margin="m" />
        <Plt data={props.items.items} layout={layout} />
      </EuiPanel>
    </>
  );
}

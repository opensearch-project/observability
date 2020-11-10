import _ from 'lodash';
import React, { useMemo } from 'react';
import { Plt } from './plt';

export function LinePlt(props: { data: Plotly.Data[] }) {
  const layout = useMemo(
    () => ({
      plot_bgcolor: 'rgba(0, 0, 0, 0)',
      paper_bgcolor: 'rgba(0, 0, 0, 0)',
      xaxis: {
        // range: [props.min, props.max],
        fixedrange: true,
        showgrid: false,
        visible: false,
      },
      yaxis: {
        // range: [-0.45, 0.45],
        fixedrange: true,
        showgrid: false,
        visible: false,
      },
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
        pad: 0,
      },
      height: 15,
      width: 60,
    }),
    [props.data]
  );
  return props.data[0].x.length > 1 ? <Plt data={props.data} layout={layout} /> : <div>-</div>;
}

export function LatencyPlt(props: { data: Plotly.Data[] }) {
  const layout = useMemo(
    () =>
      ({
        xaxis: {
          showgrid: false,
          type: 'date',
          tickmode: 'auto',
          color: '#899195',
        },
        yaxis: {
          title: {
            text: 'Hourly latency (ms)',
            font: {
              size: 12,
            },
          },
          // showline: true,
          gridcolor: '#d9d9d9',
          color: '#899195',
        },
        annotations: [
          {
            x: props.data[0].x[props.data[0].x.length - 1],
            y: 0,
            showarrow: true,
            arrowhead: 0,
            xref: 'x',
            yref: 'y',
            text: `Now: ${_.round(props.data[0].y[props.data[0].y.length - 1] as number, 2)}ms`,
            ax: 0,
            ay: -140,
            borderpad: 10,
            arrowwidth: 0.7,
          },
        ],
        margin: {
          l: 50,
          r: 30,
          b: 50,
          t: 30,
          pad: 0,
        },
        height: 200,
        width: 400,
      } as Partial<Plotly.Layout>),
    [props.data]
  );
  return (
    <>
      <Plt data={props.data} layout={layout} />
    </>
  );
}

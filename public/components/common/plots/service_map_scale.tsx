import React from 'react';
import { Plt } from './plt';

export function ServiceMapScale(props: { idSelected }) {
  const scaleData = {
    latency: {
      data: {
        y: [20, 20, 20, 20, 20],
        marker: {
          color: ['#dad6e3', '#c7b2f1', '#987dcb', '#6448a0', '#330a5f'],
        },
      },
      layout: {
        yaxis: {
          range: [0, 100],
          title: {
            text: 'Latency (ms)',
          },
        },
      },
    },
    error_rate: {
      data: {
        y: [5, 5, 5, 5, 5],
        marker: {
          color: ['#efe0e6', '#f19ebb', '#ec6592', '#be3c64', '#7a1e39'],
        },
      },
      layout: {
        yaxis: {
          range: [0, 25],
          ticksuffix: '%',
          title: {
            text: 'Error rate',
          },
        },
      },
    },
    throughput: {
      data: {
        y: [100, 100, 100, 100, 100],
        marker: {
          color: ['#d6d7d7', '#deecf7', '#abd3f0', '#5f9fd4', '#1f4e78'],
        },
      },
      layout: {
        yaxis: {
          range: [0, 500],
          title: {
            text: 'Throughput',
          },
        },
      },
    },
  };
  const layout = _.merge(
    {
      plot_bgcolor: 'rgba(0, 0, 0, 0)',
      paper_bgcolor: 'rgba(0, 0, 0, 0)',
      xaxis: {
        range: [-0.35, 0.35],
        fixedrange: true,
        showgrid: false,
        showline: false,
        zeroline: false,
        showticklabels: false,
      },
      yaxis: {
        side: 'right',
        fixedrange: true,
        showgrid: false,
        showline: false,
        zeroline: false,
        showticklabels: true,
      },
      margin: {
        l: 0,
        r: 45,
        b: 10,
        t: 10,
        pad: 0,
      },
      height: 400,
      width: 65,
    },
    scaleData[props.idSelected].layout
  ) as Partial<Plotly.Layout>;

  const data = [
    {
      x: [0, 0, 0, 0, 0],
      type: 'bar',
      orientation: 'v',
      width: 0.4,
      hoverinfo: 'none',
      showlegend: false,
      ...scaleData[props.idSelected].data,
    },
  ];

  return (
    <div>
      <Plt data={data} layout={layout} />
    </div>
  );
}

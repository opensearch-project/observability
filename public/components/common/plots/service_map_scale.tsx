import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { calculateTicks, getServiceMapScaleColor } from '..';
import { Plt } from './plt';
import { ServiceObject } from './service_map';

export function ServiceMapScale(props: { idSelected: string; serviceMap: ServiceObject }) {
  const [scaleProps, setScaleProps] = useState({});
  const getScaleData = (min, max) => {
    const ticks = calculateTicks(min, max);
    const delta = ticks[1] - ticks[0];
    const title = { latency: 'Latency (ms)', error_rate: 'Error rate', throughput: 'Throughput' }[
      props.idSelected
    ];
    const percent = 1 / (ticks.length + 1);
    const percents = Array.from({ length: ticks.length - 1 }, (v, i) => percent * i);
    const color = percents
      .map((percent) => getServiceMapScaleColor(percent, props.idSelected))
      .map((color) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`);

    // console.log('percents', percents);
    // console.log('color:', color);
    // console.log('y', [delta + ticks[0], ...Array.from({ length: ticks.length - 1 }, () => delta)]);
    // console.log('range', [ticks[0], ticks[ticks.length - 1]]);

    const result = {
      data: {
        y: [delta + ticks[0], ...Array.from({ length: ticks.length - 1 }, () => delta)],
        marker: {
          color: color,
        },
      },
      layout: {
        yaxis: {
          range: [ticks[0], ticks[ticks.length - 1]],
          ticksuffix: props.idSelected === 'error_rate' ? '%' : '',
          title: {
            text: title,
          },
        },
      },
    };
    return result;
  };

  const getScaleProps = (min, max) => {
    const result = getScaleData(min, max);
    const scaleData = result.data;
    const scaleLayout = result.layout;
    const data = [
      {
        x: Array.from({ length: result.data.y.length }, () => 0),
        type: 'bar',
        orientation: 'v',
        width: 0.4,
        hoverinfo: 'none',
        showlegend: false,
        ...scaleData,
      },
    ] as Plotly.Data;

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
      scaleLayout
    ) as Partial<Plotly.Layout>;
    return { data, layout };
  };
  
  useEffect(() => {
    setScaleProps(getScaleProps(231, 1231))
  }, [props.idSelected, props.serviceMap]);

  return (
    <div style={{minHeight: 400, minWidth: 65}}>
      <Plt {...scaleProps} />
    </div>
  );
}

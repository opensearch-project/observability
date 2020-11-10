import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { getServiceMapScaleColor } from '..';
import { Plt } from './plt';
import { ServiceObject } from './service_map';

export function ServiceMapScale(props: {
  idSelected: string;
  serviceMap: ServiceObject;
  ticks: number[];
}) {
  const [scaleProps, setScaleProps] = useState({});
  const getScaleData = () => {
    const ticks = props.ticks;
    const delta = ticks[1] - ticks[0];
    const title = { latency: 'Latency (ms)', error_rate: 'Error rate', throughput: 'Throughput' }[
      props.idSelected
    ];
    const percentInterval = 1 / Math.max(ticks.length - 1, 1);
    const percents = Array.from({ length: ticks.length - 1 }, (v, i) => percentInterval * i);
    const color = percents
      .map((percent) => getServiceMapScaleColor(percent, props.idSelected))
      .map((rgb) => `rgb(${rgb})`);

    const result = {
      data: {
        y: [delta + ticks[0], ...Array.from({ length: ticks.length - 1 }, () => delta)],
        marker: {
          color,
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

  const getScaleProps = () => {
    const result = getScaleData();
    const data = [
      {
        x: Array.from({ length: result.data.y.length }, () => 0),
        type: 'bar',
        orientation: 'v',
        width: 0.4,
        hoverinfo: 'none',
        showlegend: false,
        ...result.data,
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
          tickvals: props.ticks,
          ticktexts: props.ticks,
        },
        margin: {
          l: 0,
          r: 45,
          b: 10,
          t: 10,
          pad: 0,
        },
        height: 270,
        width: 62,
      },
      result.layout
    ) as Partial<Plotly.Layout>;
    return { data, layout };
  };

  useEffect(() => {
    if (Object.keys(props.ticks).length > 0) setScaleProps(getScaleProps());
  }, [props.idSelected, props.serviceMap, props.ticks]);

  return (
    <div style={{ minHeight: 400, minWidth: 65 }}>
      {Object.keys(props.ticks).length > 0 && <Plt {...scaleProps} />}
    </div>
  );
}

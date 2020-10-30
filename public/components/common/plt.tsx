import React from 'react';
import Plot from 'react-plotly.js';

interface PltProps {
  data: Plotly.Data[];
  layout?: Partial<Plotly.Layout>;
  onHoverHandler?: (event: Readonly<Plotly.PlotMouseEvent>) => void;
  onClickHandler?: (event: Readonly<Plotly.PlotMouseEvent>) => void;
}

export function Plt(props: PltProps) {
  return (
    <Plot
      data={props.data}
      style={{ width: '100%', height: '100%' }}
      onHover={props.onHoverHandler}
      onClick={props.onClickHandler}
      useResizeHandler
      config={{ displayModeBar: false }}
      layout={{
        autosize: true,
        margin: {
          l: 30,
          r: 5,
          b: 30,
          t: 5, // 10
          pad: 4,
        },
        barmode: 'stack',
        legend: {
          orientation: 'h',
          traceorder: 'normal',
        },
        showlegend: false,
        hovermode: 'closest',
        xaxis: {
          showgrid: true,
          zeroline: false,
          // type: 'auto',
          rangemode: 'normal',
        },
        yaxis: {
          showgrid: true,
          zeroline: false,
          // type: 'linear',
          // type: 'category',
          // gridcolor: 'rgb(60,61,64)',
          rangemode: 'normal',
        },
        ...props.layout,
      }}
    />
  );
}

import React from 'react'
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js/dist/plotly';

export function Plt(props) {
  return (
    <Plot
        data={props.data}
        style={{ width: "100%", height: "100%" }}
        onHover={props.onHoverHandler}
        useResizeHandler
        config={{ displayModeBar: false }}
        layout={{
          // plot_bgcolor: "rgb(20,22,25)",  // 30, 31, 36
          // paper_bgcolor: "rgb(20,22,25)",
          // font: {
          //   color: "rgb(201,208,216)"
          // },
          autosize: true,
          margin: {
            l: 30,
            r: 5,
            b: 30,
            t: 5,  // 10
            pad: 4
          },
          barmode: 'stack',
          legend: {
            orientation: 'h',
            traceorder: 'normal',
          },
          showlegend: false,
          // dragmode: 'lasso', // (enumerated: "zoom" | "pan" | "select" | "lasso" | "orbit" | "turntable" )
          hovermode: 'closest',
          xaxis: {
            showgrid: true,
            zeroline: false,
            // type: 'auto',
            rangemode: 'normal', // (enumerated: "normal" | "tozero" | "nonnegative" )
          },
          yaxis: {
            showgrid: true,
            zeroline: false,
            // type: 'linear',
            // type: 'category',
            // gridcolor: 'rgb(60,61,64)',
            rangemode: 'normal', // (enumerated: "normal" | "tozero" | "nonnegative" ),
          },
          zaxis: {
            showgrid: true,
            zeroline: false,
            // type: 'linear',
            rangemode: 'normal', // (enumerated: "normal" | "tozero" | "nonnegative" )
          },
          ...props.layout,
        }}
      />
  )
}

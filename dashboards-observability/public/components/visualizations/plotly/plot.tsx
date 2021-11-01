/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import React from 'react';
import plotComponentFactory from 'react-plotly.js/factory';
import Plotly from 'plotly.js-dist';

interface PltProps {
  data: Plotly.Data[];
  layout?: Partial<Plotly.Layout>;
  config?: Partial<Plotly.Config>;
  onHoverHandler?: (event: Readonly<Plotly.PlotMouseEvent>) => void;
  onUnhoverHandler?: (event: Readonly<Plotly.PlotMouseEvent>) => void;
  height?: string;
}

export function Plt(props: PltProps) {
  const PlotComponent = plotComponentFactory(Plotly);
  return (
    <PlotComponent
      data={props.data}
      style={{ width: '100%', height: props.height || '100%' }}
      onHover={props.onHoverHandler}
      onUnhover={props.onUnhoverHandler}
      useResizeHandler
      config={{
        displayModeBar: false,
        ...props.config,
      }}
      layout={{
        autosize: true,
        margin: {
          l: 30,
          r: 5,
          b: 30,
          t: 5,
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
          rangemode: 'normal',
          automargin: true,
        },
        yaxis: {
          showgrid: true,
          zeroline: false,
          rangemode: 'normal',
        },
        ...props.layout,
      }}
    />
  );
}

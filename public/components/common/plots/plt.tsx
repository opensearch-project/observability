/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import React from 'react';
import plotComponentFactory from 'react-plotly.js/factory';
import Plotly from 'plotly.js-dist';

interface PltProps {
  data: Plotly.Data[];
  layout?: Partial<Plotly.Layout>;
  onHoverHandler?: (event: Readonly<Plotly.PlotMouseEvent>) => void;
  onClickHandler?: (event: Readonly<Plotly.PlotMouseEvent>) => void;
  height?: string;
}

export function Plt(props: PltProps) {
  const PlotComponent = plotComponentFactory(Plotly);

  return (
    <PlotComponent
      data={props.data}
      style={{ width: '100%', height: props.height || '100%' }}
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

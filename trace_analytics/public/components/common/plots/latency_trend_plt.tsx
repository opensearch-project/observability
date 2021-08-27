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

import _ from 'lodash';
import React, { useMemo } from 'react';
import { Plt } from './plt';

export function LinePlt(props: { data: Plotly.Data[] }) {
  const maxY = props.data[0]?.y ? Math.max(...props.data[0].y) : 0;
  const layout = useMemo(
    () => ({
      plot_bgcolor: 'rgba(0, 0, 0, 0)',
      paper_bgcolor: 'rgba(0, 0, 0, 0)',
      xaxis: {
        fixedrange: true,
        showgrid: false,
        visible: false,
      },
      yaxis: {
        fixedrange: true,
        showgrid: false,
        visible: false,
        range: [0, maxY * 1.1],
      },
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
        pad: 0,
      },
      height: 20,
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

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

import { EuiHorizontalRule, EuiPanel } from '@elastic/eui';
import React, { useMemo } from 'react';
import { PanelTitle } from '../common';
import { Plt } from '../common/plots/plt';

export function SpanDetailPanel(props: {
  data: { gantt: Plotly.Data[]; table: any[]; ganttMaxX: number };
}) {
  const getSpanDetailLayout = (plotTraces: Plotly.Data[], maxX: number): Partial<Plotly.Layout> => {
    // get unique labels from traces
    const yLabels = plotTraces
      .map((d) => d.y[0])
      .filter((label, i, self) => self.indexOf(label) === i);
    // remove uuid when displaying y-ticks
    const yTexts = yLabels.map((label) => label.substring(0, label.length - 36));

    return {
      height: 25 * plotTraces.length + 60,
      width: 800,
      margin: {
        l: 260,
        r: 5,
        b: 30,
        t: 30,
      },
      xaxis: {
        ticksuffix: ' ms',
        side: 'top',
        color: '#91989c',
        showline: true,
        range: [0, maxX * 1.2],
      },
      yaxis: {
        showgrid: false,
        tickvals: yLabels,
        ticktext: yTexts,
      },
    };
  };

  const layout = useMemo(() => getSpanDetailLayout(props.data.gantt, props.data.ganttMaxX), [
    props.data.gantt,
    props.data.ganttMaxX,
  ]);

  return (
    <>
      <EuiPanel>
        <PanelTitle title="Span detail" />
        <EuiHorizontalRule margin="m" />
        <div style={{ overflowY: 'auto', maxHeight: 500 }}>
          <Plt data={props.data.gantt} layout={layout} />
        </div>
      </EuiPanel>
    </>
  );
}

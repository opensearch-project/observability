/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiFlexGrid, EuiFlexItem, EuiText, EuiToolTip } from '@elastic/eui';
import { BarOrientation } from '../../../../../../common/constants/shared';
import React, { useMemo, useState } from 'react';
import { Plt } from '../../../../visualizations/plotly/plot';

interface PlotParamsType {
  min: number;
  max: number;
  left: number;
  mid: number;
  right: number;
  currPercentileFilter: string;
  addFilter: (condition: 'gte' | 'lte') => void;
}

export function BoxPlt({ plotParams }: { plotParams: PlotParamsType }) {
  const [hovered, setHovered] = useState('');

  const getLayout = () =>
    ({
      plot_bgcolor: 'rgba(0, 0, 0, 0)',
      paper_bgcolor: 'rgba(0, 0, 0, 0)',
      xaxis: {
        range: [plotParams.min, plotParams.max],
        fixedrange: true,
        showgrid: false,
        visible: false,
      },
      yaxis: {
        range: [-0.6, 0.6],
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
      width: 250,
    } as Partial<Plotly.Layout>);

  const getData = () =>
    [
      {
        x: [plotParams.left],
        y: [0],
        type: 'bar',
        orientation: BarOrientation.horizontal,
        width: 1,
        marker: { color: 'rgba(0, 0, 0, 0)' },
        hoverinfo: 'none',
        showlegend: false,
      },
      {
        x: [plotParams.mid - plotParams.left],
        y: [0],
        type: 'bar',
        orientation: BarOrientation.horizontal,
        width: 1,
        marker: {
          color: plotParams.currPercentileFilter === '< 95th' ? '#fcfcfc' : '#ffffff',
          line: {
            color:
              plotParams.currPercentileFilter === '< 95th'
                ? '#eceded'
                : hovered === 'lower'
                ? '#2e73b5'
                : '#957ac9',
            width: hovered === 'lower' ? 3 : 1,
          },
        },
      },
      {
        x: [plotParams.right - plotParams.mid],
        y: [0],
        type: 'bar',
        orientation: BarOrientation.horizontal,
        width: 1,
        marker: {
          color: plotParams.currPercentileFilter === '>= 95th' ? '#aea4d1' : '#957ac9',
          line: {
            color: hovered === 'upper' ? '#2e73b5' : '#957ac9',
            width: hovered === 'upper' ? 3 : 1,
          },
        },
      },
    ] as Plotly.Data[];

  const renderTooltip = () => {
    return (
      <EuiFlexGrid columns={2} gutterSize="s" responsive={false}>
        <EuiFlexItem>
          <EuiText size="xs" style={{ color: hovered === 'lower' ? '#ffffff' : '#c9cbce' }}>
            <p>Latency &lt;95 percentile</p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText size="xs" style={{ color: hovered === 'lower' ? '#ffffff' : '#c9cbce' }}>
            <p>{`${Math.round(plotParams.left)}ms - ${Math.round(plotParams.mid)}ms`}</p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText size="xs" style={{ color: hovered === 'upper' ? '#ffffff' : '#c9cbce' }}>
            <p>Latency &gt;=95 percentile</p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText size="xs" style={{ color: hovered === 'upper' ? '#ffffff' : '#c9cbce' }}>
            <p>{`${Math.round(plotParams.mid)}ms - ${Math.round(plotParams.right)}ms`}</p>
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGrid>
    );
  };

  const layout = useMemo(() => getLayout(), [plotParams]);
  const data = useMemo(() => getData(), [plotParams, hovered]);
  const tooltip = useMemo(() => renderTooltip(), [plotParams, hovered]);

  const onHoverHandler = (e) => {
    if (plotParams.currPercentileFilter) return;
    const mouseX = e.xvals[0];
    if (plotParams.left <= mouseX && mouseX <= plotParams.mid) setHovered('lower');
    else if (plotParams.mid <= mouseX && mouseX <= plotParams.right) setHovered('upper');
    else setHovered('');
  };

  const onClickHandler = (e) => {
    if (plotParams.currPercentileFilter) return;
    if (e.points[0].fullData.index === 1) plotParams.addFilter('lte');
    else if (e.points[0].fullData.index === 2) plotParams.addFilter('gte');
  };

  return (
    <>
      <EuiToolTip content={tooltip} position="bottom" onMouseOut={() => setHovered('')}>
        <Plt
          data={data}
          layout={layout}
          onHoverHandler={onHoverHandler}
          onClickHandler={onClickHandler}
        />
      </EuiToolTip>
    </>
  );
}

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { uniq, has, isEmpty, indexOf } from 'lodash';
import Plotly from 'plotly.js-dist';
import { colorPalette } from '@elastic/eui';
import { Plt } from '../../plotly/plot';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import {
  HEATMAP_PALETTE_COLOR,
  SINGLE_COLOR_PALETTE,
  OPACITY,
  HEATMAP_SINGLE_COLOR,
} from '../../../../../common/constants/colors';
import { hexToRgb, lightenColor } from '../../../../components/event_analytics/utils/utils';
import { NUMERICAL_FIELDS } from '../../../../../common/constants/shared';

export const HeatMap = ({ visualizations, layout, config }: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;

  if (fields.length < 3) return <EmptyPlaceholder icon={visualizations?.vis?.icontype} />;

  const xaxisField = dataConfig?.dimensions[0];
  const yaxisField = dataConfig?.dimensions[1];
  const zMetrics = dataConfig?.metrics[0];

  if (
    isEmpty(xaxisField) ||
    isEmpty(yaxisField) ||
    isEmpty(zMetrics) ||
    isEmpty(data[xaxisField.label]) ||
    isEmpty(data[yaxisField.label]) ||
    isEmpty(data[`${zMetrics.aggregation}(${zMetrics.name})`]) ||
    dataConfig?.dimensions.length > 2 ||
    dataConfig?.metrics.length > 1
  )
    return <EmptyPlaceholder icon={visualizations?.vis?.icontype} />;

  const uniqueYaxis = uniq(data[yaxisField.label]);
  const uniqueXaxis = uniq(data[xaxisField.label]);
  const uniqueYaxisLength = uniqueYaxis.length;
  const uniqueXaxisLength = uniqueXaxis.length;
  const tooltipMode =
    dataConfig?.tooltipOptions?.tooltipMode !== undefined
      ? dataConfig.tooltipOptions.tooltipMode
      : 'show';
  const tooltipText =
    dataConfig?.tooltipOptions?.tooltipText !== undefined
      ? dataConfig.tooltipOptions.tooltipText
      : 'all';

  const colorField = dataConfig?.chartStyles
    ? dataConfig?.chartStyles.colorMode && dataConfig?.chartStyles.colorMode[0].name === OPACITY
      ? dataConfig?.chartStyles.color ?? HEATMAP_SINGLE_COLOR
      : dataConfig?.chartStyles.scheme ?? HEATMAP_PALETTE_COLOR
    : HEATMAP_PALETTE_COLOR;
  const showColorscale = dataConfig?.legend?.showLegend ?? 'show';

  const traceColor: any = [];
  if (colorField.name === SINGLE_COLOR_PALETTE) {
    const colorsArray = colorPalette([lightenColor(colorField.color, 50), colorField.color], 10);
    colorsArray.map((hexCode, index) => {
      traceColor.push([
        (index !== colorsArray.length - 1 ? index : 10) / 10,
        hexToRgb(hexCode, 1, false),
      ]);
    });
  }

  const calculatedHeapMapZaxis: Plotly.Data[] = useMemo(() => {
    const heapMapZaxis = [];
    const buckets = {};

    // maps bukcets to metrics
    for (let i = 0; i < data[xaxisField.label].length; i++) {
      buckets[`${data[xaxisField.label][i]},${data[yaxisField.label][i]}`] =
        data[`${zMetrics.aggregation}(${zMetrics.name})`][i];
    }

    // initialize empty 2 dimensional array, inner loop for each xaxis field, outer loop for yaxis
    for (let i = 0; i < uniqueYaxisLength; i++) {
      const innerBuckets = [];
      for (let j = 0; j < uniqueXaxisLength; j++) {
        innerBuckets.push(null);
      }
      heapMapZaxis.push(innerBuckets);
    }

    // fill in each bucket
    for (let i = 0; i < uniqueYaxisLength; i++) {
      for (let j = 0; j < uniqueXaxisLength; j++) {
        if (has(buckets, `${uniqueXaxis[j]},${uniqueYaxis[i]}`)) {
          heapMapZaxis[i][j] = buckets[`${uniqueXaxis[j]},${uniqueYaxis[i]}`];
        }
      }
    }

    return heapMapZaxis;
  }, [
    data,
    uniqueYaxis,
    uniqueXaxis,
    uniqueYaxisLength,
    uniqueXaxisLength,
    xaxisField,
    yaxisField,
    zMetrics,
  ]);

  const heapMapData = [
    {
      z: calculatedHeapMapZaxis,
      x: uniqueXaxis,
      y: uniqueYaxis,
      hoverinfo: tooltipMode === 'hidden' ? 'none' : tooltipText,
      colorscale: colorField.name === SINGLE_COLOR_PALETTE ? traceColor : colorField.name,
      type: 'heatmap',
      showscale: showColorscale === 'show',
    },
  ];

  const mergedLayout = {
    ...layout,
    ...(layoutConfig.layout && layoutConfig.layout),
    title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
  };

  const mergedConfigs = useMemo(
    () => ({
      ...config,
      ...(layoutConfig.config && layoutConfig.config),
    }),
    [config, layoutConfig.config]
  );

  return <Plt data={heapMapData} layout={mergedLayout} config={mergedConfigs} />;
};

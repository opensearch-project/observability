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
  const { defaultAxes } = visualizations.data;
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;
  const yaxis = defaultAxes.yaxis ?? [];

  if (fields.length < 3) return <EmptyPlaceholder icon={visualizations?.vis?.iconType} />;

  const xaxisField = visualizations.data?.rawVizData?.dataConfig?.dimensions[0];
  const yaxisField = visualizations.data?.rawVizData?.dataConfig?.dimensions[1];
  const zMetrics = visualizations.data?.rawVizData?.dataConfig?.metrics[0];

  if (
    isEmpty(xaxisField) ||
    isEmpty(yaxisField) ||
    isEmpty(zMetrics) ||
    isEmpty(data[xaxisField.label]) ||
    isEmpty(data[yaxisField.label]) ||
    isEmpty(data[zMetrics.label]) ||
    indexOf(NUMERICAL_FIELDS, zMetrics.type) < 0
  )
    return <EmptyPlaceholder icon={visualizations?.vis?.iconType} />;

  const uniqueYaxis = uniq(data[yaxisField.label]);
  const uniqueXaxis = uniq(data[xaxisField.label]);
  const uniqueYaxisLength = uniqueYaxis.length;
  const uniqueXaxisLength = uniqueXaxis.length;

  const colorField = dataConfig?.chartStyles
    ? dataConfig?.chartStyles.colorMode && dataConfig?.chartStyles.colorMode[0].name === OPACITY
      ? dataConfig?.chartStyles.color ?? HEATMAP_SINGLE_COLOR
      : dataConfig?.chartStyles.scheme ?? HEATMAP_PALETTE_COLOR
    : HEATMAP_PALETTE_COLOR;

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
      buckets[`${data[xaxisField.label][i]},${data[yaxisField.label][i]}`] = data[zMetrics.label][i];
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
      colorscale: colorField.name === SINGLE_COLOR_PALETTE ? traceColor : colorField.name,
      type: 'heatmap',
    },
  ];

  const mergedLayout = {
    ...layout,
    ...(layoutConfig.layout && layoutConfig.layout),
    title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
  };

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={heapMapData} layout={mergedLayout} config={mergedConfigs} />;
};

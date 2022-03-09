/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { uniq, has, isArray, isEmpty } from 'lodash';
import Plotly from 'plotly.js-dist';
import { Plt } from '../../plotly/plot';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';
import { EmptyPlaceholder } from '../../../../components/explorer/visualizations/shared_components/empty_placeholder';

export const HeatMap = ({ visualizations, layout, config }: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;

  if (fields.length < 3) return <EmptyPlaceholder icon={visualizations?.vis?.iconType} />;

  const xaxisField = fields[fields.length - 2];
  const yaxisField = fields[fields.length - 1];
  const zMetrics =
    dataConfig?.valueOptions && dataConfig?.valueOptions.zaxis
      ? dataConfig?.valueOptions.zaxis[0]
      : fields[fields.length - 3];
  const uniqueYaxis = uniq(data[yaxisField.name]);
  const uniqueXaxis = uniq(data[xaxisField.name]);
  const uniqueYaxisLength = uniqueYaxis.length;
  const uniqueXaxisLength = uniqueXaxis.length;

  if (
    isEmpty(xaxisField) ||
    isEmpty(yaxisField) ||
    isEmpty(zMetrics) ||
    isEmpty(data[xaxisField.name]) ||
    isEmpty(data[yaxisField.name]) ||
    isEmpty(data[zMetrics.name])
  )
    return <EmptyPlaceholder icon={visualizations?.vis?.iconType} />;

  const colorScaleValues = [...PLOTLY_COLOR.map((clr, index) => [index, clr])];

  const calculatedHeapMapZaxis: Plotly.Data[] = useMemo(() => {
    const heapMapZaxis = [];
    const buckets = {};

    // maps bukcets to metrics
    for (let i = 0; i < data[xaxisField.name].length; i++) {
      buckets[`${data[xaxisField.name][i]},${data[yaxisField.name][i]}`] = data[zMetrics.name][i];
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
      colorscale: colorScaleValues,
      type: 'heatmap',
    },
  ];

  const mergedLayout = {
    ...layout,
    ...(layoutConfig.layout && layoutConfig.layout),
    title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || zMetrics.name || '',
  };

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={heapMapData} layout={mergedLayout} config={mergedConfigs} />;
};

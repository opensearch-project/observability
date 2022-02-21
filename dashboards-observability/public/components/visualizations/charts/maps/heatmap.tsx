/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { uniq, chunk, zip } from 'lodash';
import { Plt } from '../../plotly/plot';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';

export const HeatMap = ({ visualizations, layout, config }: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { dataConfig = {} } = visualizations?.data?.userConfigs;

  const xaxisField = fields[fields.length - 1];
  const yaxisField = fields[fields.length - 2];
  const zMetrics =
    dataConfig?.valueOptions && dataConfig?.valueOptions.zaxis
      ? dataConfig?.valueOptions.zaxis[0]
      : fields[fields.length - 3];
  const uniqueYaxis = uniq(data[yaxisField.name]);
  const uniqueXaxis = uniq(data[xaxisField.name]);
  const uniqueYaxisLength = uniqueYaxis.length;
  const uniqueXaxisLength = uniqueXaxis.length;
  const heapMapZaxis = [];
  const buckets = {};

  for (let i = 0; i < data[xaxisField.name].length; i++) {
    buckets[`${data[xaxisField.name][i]},${data[yaxisField.name][i]}`] = data[zMetrics.name][i];
  }

  for (let i = 0; i < uniqueYaxisLength; i++) {
    const innerBuckets = [];
    for (let j = 0; j < uniqueXaxisLength; j++) {
      innerBuckets.push(null);
    }
    heapMapZaxis.push(innerBuckets);
  }

  for (let i = 0; i < uniqueYaxisLength; i++) {
    for (let j = 0; j < uniqueXaxisLength; j++) {
      if (buckets[`${uniqueXaxis[j]},${uniqueYaxis[i]}`]) {
        heapMapZaxis[i][j] = buckets[`${uniqueXaxis[j]},${uniqueYaxis[i]}`];
      }
    }
  }

  const heapMapData = [
    {
      z: heapMapZaxis,
      x: uniqueXaxis,
      y: uniqueYaxis,
      type: 'heatmap',
    },
  ];

  return <Plt data={heapMapData} layout={layout} config={config} />;
};

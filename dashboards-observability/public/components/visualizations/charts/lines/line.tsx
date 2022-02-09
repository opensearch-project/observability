/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { take, isEmpty } from 'lodash';
import { Plt } from '../../plotly/plot';

export const Line = ({ visualizations, layout, config }: any) => {
  const {
    data = {},
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { vis } = visualizations;
  const { defaultAxes } = visualizations.data;
  const { xaxis = [], yaxis = [] } = visualizations?.data?.customVizConfigs;
  const lastIndex = fields.length - 1;

  let valueSeries;
  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    valueSeries = [
      ...visualizations?.data?.customVizConfigs[vis.seriesAxis].map((item) => ({
        ...item,
        name: item.label,
      })),
    ];
  } else {
    valueSeries = defaultAxes.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1);
  }

  const lineValues = valueSeries.map((field: any) => {
    return {
      x: data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name],
      y: data[field.name],
      type: 'line',
      name: field.name,
    };
  });

  return <Plt data={lineValues} layout={layout} config={config} />;
};

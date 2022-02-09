/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Plt } from '../../plotly/plot';

export const Gauge = ({ visualizations, layout, config }: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { xaxis, yaxis } = visualizations.data.customVizConfigs;

  let guageData = xaxis || fields;
  guageData = guageData.map((field, index) => {
    return {
      type: 'indicator',
      mode: 'gauge+number+delta',
      value: data[field.name][0] || 0,
      title: {
        text: field.name,
        font: { size: 24 },
      },
      domain: { row: 0, column: index },
    };
  });

  const guageLayout = {
    grid: { rows: 1, columns: guageData.length, pattern: 'independent' },
  };

  const finalLayout = {
    ...guageLayout,
    ...layout,
  };

  return <Plt data={guageData} layout={finalLayout} config={config} />;
};

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Plt } from '../../plotly/plot';

export const Gauge = ({ visualizations }: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { xaxis } = visualizations.data.customVizConfigs;

  const guageData = [
    {
      type: 'indicator',
      mode: 'gauge+number+delta',
      value: data[fields[0].name][0] || 0,
      title: {
        text: fields[0].name,
        font: { size: 24 },
      },
      gauge: {
        bar: { color: 'darkblue' },
        bgcolor: 'white',
        borderwidth: 2,
        bordercolor: 'gray',
      },
    },
  ];

  const layout = {
    width: 500,
    height: 400,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: 'lavender',
    font: { color: 'darkblue', family: 'Arial' },
  };

  return <Plt data={guageData} layout={layout} />;
};

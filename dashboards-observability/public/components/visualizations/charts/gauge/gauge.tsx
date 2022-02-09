/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { isEmpty } from 'lodash';
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
      gauge: {
        // bar: { color: 'darkblue' },
        // bgcolor: 'white',
        // borderwidth: 2,
        // bordercolor: 'gray',
      },
      domain: { row: 0, column: index },
    };
  });

  // const guageData = [
  //   {
  //     type: 'indicator',
  //     mode: 'gauge+number+delta',
  //     value: data[fields[0].name][0] || 0,
  //     title: {
  //       text: fields[0].name,
  //       font: { size: 24 },
  //     },
  //     gauge: {
  //       bar: { color: 'darkblue' },
  //       bgcolor: 'white',
  //       borderwidth: 2,
  //       bordercolor: 'gray',
  //     },
  //   },
  // ];

  const guageLayout = {
    // width: 500,
    // height: 400,
    // margin: { t: 25, r: 25, l: 25, b: 25 },
    // paper_bgcolor: 'lavender',
    // font: { color: 'darkblue', family: 'Arial' },
    grid: { rows: 1, columns: guageData.length, pattern: 'independent' },
  };

  const finalLayout = {
    ...guageLayout,
    ...layout,
  };

  return <Plt data={guageData} layout={finalLayout} config={config} />;
};

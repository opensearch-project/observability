/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { take, merge, isEmpty } from 'lodash';
import { Plt } from '../../plotly/plot';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';

export const HeatMap = ({
  visualizations,
  figureConfig = {},
  layoutConfig = {},
  dispatch,
  customVizData = {},
}: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  // const lineLength = fields.length - 1;
  // // let lineValues;
  // // if (isEmpty(customVizData)) {
  // const lineValues = take(fields, lineLength).map((field: any) => {
  //   return {
  //     values: data[field.name],
  //     labels: data[fields[lineLength].name],
  //     type: 'heatmap',
  //     name: field.name,
  //   };
  // });
  // } else {
  //   lineValues = [...customVizData];
  // }

  const heapMapData = [
    {
      z: [
        [35, 65, 3, 55, 13],
        [44, 68, 9, 57, 3],
        [29, 17, 25, 61, 5],
      ],
      x: [
        '2022-01-21 00:00:00',
        '2022-01-22 00:00:00',
        '2022-01-23 00:00:00',
        '2022-01-24 00:00:00',
        '2022-01-25 00:00:00',
      ],
      y: [
        'www.opensearch.org',
        'cdn.opensearch-opensearch-opensearch.org',
        'artifacts.opensearch.org',
      ],
      type: 'heatmap',
    },
  ];

  const config = {
    // barmode: 'pie',
    xaxis: {
      automargin: true,
    },
    yaxis: {
      automargin: true,
    },
  };
  const lineLayoutConfig = merge(config, layoutConfig);

  return (
    <Plt
      data={heapMapData}
      layout={{
        colorway: PLOTLY_COLOR,
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        xaxis: {
          fixedrange: true,
          showgrid: false,
          visible: true,
        },
        yaxis: {
          fixedrange: true,
          showgrid: false,
          visible: true,
        },
        ...lineLayoutConfig,
      }}
      config={figureConfig}
      dispatch={dispatch}
    />
  );
};

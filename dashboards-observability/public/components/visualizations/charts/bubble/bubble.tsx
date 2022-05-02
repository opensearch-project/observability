/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { take, merge, isEmpty } from 'lodash';
import { Plt } from '../../plotly/plot';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';

export const Bubble = ({
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
  const lineLength = fields.length - 1;
  // let lineValues;
  // if (isEmpty(customVizData)) {
  const lineValues = take(fields, lineLength).map((field: any) => {
    return {
      x: data[field.name],
      y: data[fields[lineLength].name],
      mode: 'markers',
      // type: 'pie',
      name: field.name,
    };
  });
  // } else {
  //   lineValues = [...customVizData];
  // }

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
      data={lineValues}
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

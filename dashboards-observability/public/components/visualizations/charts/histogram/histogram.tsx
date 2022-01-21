/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { take, merge, isEmpty } from 'lodash';
import { Plt } from '../../plotly/plot';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';

export const Histogram = ({
  visualizations,
  figureConfig = {},
  layoutConfig = {},
  dispatch,
  customVizData = {},
}: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations;
  const lineLength = fields.length - 1;
  const lineValues = take(fields, lineLength).map((field: any) => {
    return {
      // x: data[fields[lineLength].name],
      y: data[field.name],
      type: 'histogram',
      name: field.name,
    };
  });

  const config = {
    barmode: 'line',
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

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { take, merge, isEmpty } from 'lodash';
import { Plt } from '../../plotly/plot';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';

export const Line = ({
  visualizations,
  figureConfig = {},
  layoutConfig = {},
  dispatch,
  customVizData = {},
}: any) => {
  const {
    data = {},
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { defaultAxes } = visualizations.data.defaultAxes;
  const { xaxis, yaxis, layout = {} } = visualizations.data.customVizConfigs;
  const lineLength = fields.length - 1;
  let filteredFields =
    defaultAxes?.yaxis && defaultAxes?.yaxis?.length > 0
      ? defaultAxes.yaxis
      : take(fields, lineLength > 0 ? lineLength : 1);
  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    filteredFields = fields.filter((field) => {
      // if (isVertical) {
      return (
        field.name !== xaxis[0].label && !isEmpty(yaxis.filter((item) => item.label === field.name))
      );
    });
    // } else {
  }
  const lineValues = take(filteredFields, lineLength).map((field: any) => {
    return {
      x: data[xaxis ? xaxis[0]?.label : fields[lineLength].name],
      y: data[field.name],
      type: 'line',
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

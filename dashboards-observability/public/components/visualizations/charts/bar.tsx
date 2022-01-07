/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

import { take, merge } from 'lodash';
import { Plt } from '../plotly/plot';
import { LONG_CHART_COLOR, PLOTLY_COLOR } from '../../../../common/constants/shared';

export const Bar = ({
  visualizations,
  barConfig = {},
  layoutConfig = {},
  isUniColor = false,
  setInitialConfig = null,
}: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations;
  const stackLength = fields.length - 1;

  // Individual bars have different colors
  // when: stackLength = 1 and length of result buckets < 16 and chart is not unicolor
  // Else each stacked bar has its own color using colorway
  let marker = {};
  if (stackLength == 1 && data[fields[stackLength].name].length < 16 && !isUniColor) {
    marker = {
      color: data[fields[stackLength].name].map((_: string, index: number) => {
        return PLOTLY_COLOR[index % PLOTLY_COLOR.length];
      }),
    };
  }

  const barValues = take(fields, stackLength > 0 ? stackLength : 1).map((field: any) => {
    return {
      x: barConfig.orientation !== 'h' ? data[fields[stackLength].name] : data[field.name],
      y: barConfig.orientation !== 'h' ? data[field.name] : data[fields[stackLength].name],
      type: 'bar',
      marker,
      name: field.name,
      ...barConfig,
    };
  });

  const barLayoutConfig = merge(
    {
      xaxis: {
        automargin: true,
      },
      yaxis: {
        automargin: true,
      },
    },
    layoutConfig
  );

  // If chart has length of result buckets < 16
  // then use the LONG_CHART_COLOR for all the bars in the chart
  const plotlyColorway =
    data[fields[stackLength].name].length < 16 ? PLOTLY_COLOR : [LONG_CHART_COLOR];

  return (
    <Plt
      data={barValues}
      layout={{
        colorway: plotlyColorway,
        xaxis: {
          showgrid: false,
          visible: true,
        },
        yaxis: {
          showgrid: false,
          visible: true,
        },
        ...barLayoutConfig,
      }}
      config={barConfig}
    />
  );
};

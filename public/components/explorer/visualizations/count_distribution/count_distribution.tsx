/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LONG_CHART_COLOR } from '../../../../../common/constants/shared';
import { Plt } from '../../../visualizations/plotly/plot';

export const CountDistribution = ({ countDistribution }: any) => {
  if (
    !countDistribution ||
    !countDistribution.data ||
    !countDistribution.metadata ||
    !countDistribution.metadata.fields
  )
    return null;

  const {
    data,
    metadata: { fields },
  } = countDistribution;

  const finalData = [
    {
      x: [...data[fields[1].name]],
      y: [...data[fields[0].name]],
      type: 'bar',
      name: fields[0],
      orientation: 'v',
    },
  ];

  return (
    <Plt
      data={finalData}
      layout={{
        showlegend: true,
        margin: {
          l: 60,
          r: 10,
          b: 15,
          t: 30,
          pad: 0,
        },
        height: 220,
        colorway: [LONG_CHART_COLOR],
      }}
    />
  );
};

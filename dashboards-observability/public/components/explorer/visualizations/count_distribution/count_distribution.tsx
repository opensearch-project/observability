/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { LONG_CHART_COLOR } from '../../../../../common/constants/shared';
import React from 'react';
import { Bar } from '../../../visualizations/charts/bar';

export const CountDistribution = ({ countDistribution }: any) => {
  if (
    !countDistribution ||
    !countDistribution.data ||
    !countDistribution.metadata ||
    !countDistribution.metadata.fields
  )
    return null;

  const layout = {
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
  };

  return (
    <Bar
      visualizations={countDistribution}
      name="Event counts"
      layoutConfig={layout}
      isUniColor={true}
    />
  );
};

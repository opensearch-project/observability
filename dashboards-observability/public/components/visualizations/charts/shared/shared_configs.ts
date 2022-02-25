/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { forIn } from 'lodash';

export const getPlotlySharedConfigs = () => {
  return {
    layout: {
      showlegend: true,
      margin: {
        l: 50,
        r: 30,
        b: 30,
        t: 50,
        pad: 0,
      },
      height: 500,
      legend: {
        orientation: 'v',
        traceorder: 'normal',
      },
    },
    config: {
      displaylogo: false,
      responsive: true,
    },
  };
};

enum VIS_CATEGORY {
  BASICS = 'Visualizations',
<<<<<<< HEAD
=======
  // STATISTIC = 'statistic',
  // SCIENTIFIC = 'scientific',
  // FINANCIAL = 'financial',
  // MAPS = 'maps',
  // THREED = '3d',
>>>>>>> synced
}

export const getPlotlyCategory = (type = 'enum') => {
  switch (type) {
    case 'enum':
      return VIS_CATEGORY;
    case 'list':
      return Object.values(VIS_CATEGORY);
    case 'keys':
      return Object.keys(VIS_CATEGORY);
    default:
      return VIS_CATEGORY;
  }
};

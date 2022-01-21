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
        r: 10,
        b: 30,
        t: 30,
        pad: 0,
      },
      // height: 500,
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
  BASICS = 'basic',
  STATISTIC = 'statistic',
  SCIENTIFIC = 'scientific',
  FINANCIAL = 'financial',
  MAPS = 'maps',
  THREED = '3d',
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

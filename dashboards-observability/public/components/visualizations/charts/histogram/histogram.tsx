/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { take, merge, isEmpty } from 'lodash';
import { Plt } from '../../plotly/plot';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';

export const Histogram = ({ visualizations, layout, config }: any) => {
  const { vis } = visualizations;
  const {
    data = {},
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { defaultAxes } = visualizations.data.defaultAxes;
  const { xaxis = null, yaxis = null } = visualizations.data.userConfigs;
  const lastIndex = fields.length - 1;
  // let filteredFields =
  //   defaultAxes?.yaxis && defaultAxes?.yaxis?.length > 0
  //     ? defaultAxes.yaxis
  //     : take(fields, lineLength > 0 ? lineLength : 1);
  // if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
  //   filteredFields = fields.filter((field) => {
  //     // if (isVertical) {
  //     return (
  //       field.name !== xaxis[0].label && !isEmpty(yaxis.filter((item) => item.label === field.name))
  //     );
  //   });
  //   // } else {
  // }

  let valueSeries;
  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    valueSeries = [
      ...visualizations?.data?.userConfigs[vis.seriesAxis].map((item) => ({
        ...item,
        name: item.label,
      })),
    ];
  } else {
    valueSeries = defaultAxes.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1);
  }

  const hisValues = valueSeries.map((field: any) => {
    return {
      x: data[xaxis ? xaxis[0]?.label : fields[lastIndex].name],
      type: 'histogram',
      name: field.name,
    };
  });

  return <Plt data={hisValues} layout={layout} config={config} />;
};

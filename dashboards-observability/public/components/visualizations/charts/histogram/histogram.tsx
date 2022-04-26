/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { take, isEmpty } from 'lodash';
import { Plt } from '../../plotly/plot';

export const Histogram = ({ visualizations, layout, config }: any) => {
  const {
    data = {},
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { defaultAxes } = visualizations?.data;
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;
  const lastIndex = fields.length - 1;

  const xaxis =
    dataConfig.valueOptions && dataConfig.valueOptions.xaxis ? dataConfig.valueOptions.xaxis : [];

  let valueSeries;
  if (!isEmpty(xaxis)) {
    valueSeries = [
      ...xaxis.map((item) => ({
        ...item,
        name: item.label,
      })),
    ];
  } else {
    valueSeries = defaultAxes?.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1);
  }

  const hisValues = valueSeries.map((field: any) => {
    return {
      x: data[field.name],
      type: 'histogram',
      name: field.name,
    };
  });

  const mergedLayout = {
    ...layout,
    ...(layoutConfig.layout && layoutConfig.layout),
    title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
    barmode: 'group',
  };

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={hisValues} layout={mergedLayout} config={mergedConfigs} />;
};

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { take, isEmpty, last } from 'lodash';
import { Plt } from '../../plotly/plot';

export const Line = ({ visualizations, layout, config }: any) => {
  const {
    data = {},
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { vis } = visualizations;
  const { defaultAxes } = visualizations.data;
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;
  const xaxis =
    dataConfig?.valueOptions && dataConfig?.valueOptions.xaxis
      ? dataConfig?.valueOptions.xaxis
      : [];
  const yaxis =
    dataConfig?.valueOptions && dataConfig?.valueOptions.xaxis
      ? dataConfig?.valueOptions.yaxis
      : [];
  const lastIndex = fields.length - 1;
  const mode =
    dataConfig?.chartOptions && dataConfig?.chartOptions.mode
      ? dataConfig?.chartOptions.mode[0].modeId
      : 'line';

  let valueSeries;
  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    valueSeries = [...yaxis];
  } else {
    valueSeries = defaultAxes.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1);
  }

  const lineValues = valueSeries.map((field: any) => {
    return {
      x: data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name],
      y: data[field.name],
      type: 'line',
      name: field.name,
      mode,
    };
  });

  const mergedLayout = {
    ...layout,
    ...layoutConfig.layout,
    title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
  };

  // threshold(s)
  if (dataConfig.thresholds) {
    mergedLayout.shapes = [
      ...dataConfig.thresholds.map((thr) => {
        return {
          type: 'line',
          x0: data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name][0],
          y0: thr.value,
          x1: last(data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name]),
          y1: thr.value,
          line: {
            color: thr.color,
            width: 4,
            dash: 'dashdot',
          },
        };
      }),
    ];
  }

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={lineValues} layout={mergedLayout} config={mergedConfigs} />;
};

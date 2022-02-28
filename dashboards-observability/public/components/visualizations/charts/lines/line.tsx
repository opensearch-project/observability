/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { take, isEmpty, last } from 'lodash';
import { Plt } from '../../plotly/plot';

export const Line = ({ visualizations, layout, config }: any) => {
  const {
    data = {},
    metadata: { fields },
  } = visualizations.data.rawVizData;
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
    dataConfig?.chartOptions && 
    dataConfig?.chartOptions.mode && 
    dataConfig?.chartOptions.mode[0]
      ? dataConfig?.chartOptions.mode[0].modeId
      : 'line';

  let valueSeries;
  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    valueSeries = [...yaxis];
  } else {
    valueSeries = defaultAxes.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1);
  }

  const lineValues = useMemo(() => {
    return valueSeries.map((field: any) => {
      return {
        x: data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name],
        y: data[field.name],
        type: 'line',
        name: field.name,
        mode,
      };
    });
  }, [data, xaxis, yaxis, fields, lastIndex, mode]);

  // threshold(s)
  const calculatedLayout = useMemo(() => {
    const mergedLayout = {
      ...layout,
      ...layoutConfig.layout,
      title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
    };

    if (dataConfig.thresholds) {
      const thresholdTraces = {
        x: [],
        y: [],
        mode: 'text',
        text: [],
      };
      mergedLayout.shapes = [
        ...dataConfig.thresholds.map((thr) => {
          thresholdTraces.x.push(
            data[!isEmpty(xaxis) ? xaxis[xaxis.length - 1]?.label : fields[lastIndex].name][0]
          );
          thresholdTraces.y.push(thr.value * (1 + 0.005));
          thresholdTraces.text.push(thr.name);
          return {
            type: 'line',
            x0: data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name][0],
            y0: thr.value,
            x1: last(data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name]),
            y1: thr.value,
            name: thr.name || '',
            line: {
              color: thr.color,
              width: 4,
              dash: 'dashdot',
            },
          };
        }),
      ];
      lineValues.push(thresholdTraces);
    }
    return mergedLayout;
  }, [data, fields, lastIndex, layout, layoutConfig, lineValues, xaxis]);

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={lineValues} layout={calculatedLayout} config={mergedConfigs} />;
};

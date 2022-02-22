/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { indexOf } from 'lodash';
import { Plt } from '../../../plotly/plot';

export const Gauge = ({ visualizations, layout, config }: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { dataConfig } = visualizations.data.userConfigs;
  const xaxis =
    dataConfig?.valueOptions && dataConfig?.valueOptions.xaxis
      ? dataConfig?.valueOptions.xaxis
      : [];
  const series =
    dataConfig?.valueOptions && dataConfig?.valueOptions?.series
      ? dataConfig.valueOptions.series
      : dataConfig?.valueOptions.xaxis;

  const value =
    dataConfig?.valueOptions && dataConfig?.valueOptions?.value
      ? dataConfig.valueOptions.value
      : [];

  let guageData = [];
  const numericalTypes = ['short', 'integer', 'long', 'float', 'double'];
  if (series && series[0]) {
    if (indexOf(numericalTypes, series[0].type) > 0) {
      guageData = [...value.map((val) => ({ field_name: series[0].name, value: val.name }))];
    } else if (value) {
      value.map((val) => {
        const selectedSeriesIndex = indexOf(data[series[0].name], val.name);
        fields.map((field) => {
          if (field.name !== series[0].name) {
            guageData.push({
              field_name: field.name,
              value: data[field.name][selectedSeriesIndex],
            });
          }
        });
      });
    }
  }

  guageData = guageData.map((gauge, index) => {
    return {
      type: 'indicator',
      mode: 'gauge+number+delta',
      value: gauge.value || 0,
      title: {
        text: gauge.field_name,
        font: { size: 24 },
      },
      domain: { row: 0, column: index },
      gauge: {},
    };
  });

  const guageLayout = {
    grid: { rows: 1, columns: guageData.length, pattern: 'independent' },
  };

  const finalLayout = {
    ...guageLayout,
    ...layout,
  };

  return <Plt data={guageData} layout={finalLayout} config={config} />;
};

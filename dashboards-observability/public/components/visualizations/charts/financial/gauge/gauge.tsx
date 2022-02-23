/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { indexOf } from 'lodash';
import { Plt } from '../../../plotly/plot';
import { NUMERICAL_FIELDS } from '../../../../../../common/constants/shared';

export const Gauge = ({ visualizations, layout, config }: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { dataConfig } = visualizations.data.userConfigs;

  const series =
    dataConfig?.valueOptions && dataConfig?.valueOptions?.series
      ? dataConfig.valueOptions.series
      : [];

  const value =
    dataConfig?.valueOptions && dataConfig?.valueOptions?.value
      ? dataConfig.valueOptions.value
      : [];

  let guageData = useMemo(() => {
    let calculatedGaugeData = [];
    if (series && series[0]) {
      if (indexOf(NUMERICAL_FIELDS, series[0].type) > 0) {
        calculatedGaugeData = [
          ...value.map((val) => ({ field_name: series[0].name, value: val.name })),
        ];
      } else if (value) {
        value.map((val) => {
          const selectedSeriesIndex = indexOf(data[series[0].name], val.name);
          fields.map((field) => {
            if (field.name !== series[0].name) {
              calculatedGaugeData.push({
                field_name: field.name,
                value: data[field.name][selectedSeriesIndex],
              });
            }
          });
        });
      }
    }
    return calculatedGaugeData;
  }, [series, value, data, fields]);

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
    title: dataConfig?.panelOptions?.title || '',
  };

  return <Plt data={guageData} layout={finalLayout} config={config} />;
};

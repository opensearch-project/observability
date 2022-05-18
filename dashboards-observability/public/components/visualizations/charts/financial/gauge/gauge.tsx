/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { indexOf, isEmpty } from 'lodash';
import Plotly from 'plotly.js-dist';
import { Plt } from '../../../plotly/plot';
import { NUMERICAL_FIELDS } from '../../../../../../common/constants/shared';
import { EmptyPlaceholder } from '../../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';

import { PLOTLY_GAUGE_COLUMN_NUMBER } from '../../../../../../common/constants/explorer';

export const Gauge = ({ visualizations, layout, config }: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;

  const { dataConfig = {}, layoutConfig = {} } = visualizations.data.userConfigs;

  const series =
    dataConfig?.valueOptions && dataConfig?.valueOptions?.series
      ? dataConfig.valueOptions.series
      : [];

  const value =
    dataConfig?.valueOptions && dataConfig?.valueOptions?.value
      ? dataConfig.valueOptions.value
      : [];

  const thresholds = dataConfig?.thresholds || [];

  console.log(dataConfig, 'DataConfig in gauge');
  const minValue = dataConfig?.standardOptions?.min ? dataConfig?.standardOptions?.min : 0;
  const maxValue = dataConfig?.standardOptions?.max ? dataConfig?.standardOptions?.max : 100;

  if (isEmpty(series) || isEmpty(value)) {
    return <EmptyPlaceholder icon={visualizations?.vis?.iconType} />;
  }


  const gaugeData: Plotly.Data[] = useMemo(() => {
    let calculatedGaugeData: Plotly.Data[] = [];
    if (series && series[0] && value && value[0]) {
      if (indexOf(NUMERICAL_FIELDS, series[0].type) > 0) {
        calculatedGaugeData = [
          ...data[value[0].name].map((dimesionSlice, index) => ({
            field_name: dimesionSlice,
            value: data[series[0].name][index],
          })),
        ];
      } else {
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

      return calculatedGaugeData.map((gauge, index) => {
        const row = Math.floor(index / PLOTLY_GAUGE_COLUMN_NUMBER);
        const column = index % PLOTLY_GAUGE_COLUMN_NUMBER;

        return {
          type: 'indicator',
          mode: 'gauge+number+delta',
          value: gauge.value || 0,
          title: {
            text: gauge.field_name,
            font: { size: 14 },
          },
          domain: {
            row,
            column,
          },
          gauge: {
            ...(thresholds && {
              axis: { range: [minValue, maxValue] },
              threshold: {
                line: { color: thresholds[0]?.color || 'red', width: 4 },
                thickness: 0.75,
                value: thresholds[0]?.value || 0,
              },
            }),
          },
        };
      });
    }
    return calculatedGaugeData;
  }, [series, value, data, fields, thresholds]);

  const mergedLayout = useMemo(() => {
    const isAtleastOneFullRow = Math.floor(gaugeData.length / PLOTLY_GAUGE_COLUMN_NUMBER) > 0;
    const rows = Math.floor(gaugeData.length / PLOTLY_GAUGE_COLUMN_NUMBER) + 1;
    const columns = isAtleastOneFullRow ? PLOTLY_GAUGE_COLUMN_NUMBER : gaugeData.length;
    return {
      grid: {
        rows,
        columns,
        pattern: 'independent',
      },
      ...layout,
      ...(layoutConfig.layout && layoutConfig.layout),
      title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
    };
  }, [layout, gaugeData.length, layoutConfig.layout, dataConfig?.panelOptions?.title]);

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={gaugeData} layout={mergedLayout} config={mergedConfigs} />;
};

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { take, isEmpty, last } from 'lodash';
import { Plt } from '../../plotly/plot';
import { AvailabilityUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { ThresholdUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';

export const Line = ({ visualizations, layout, config }: any) => {
  const {
    data = {},
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { defaultAxes } = visualizations.data;
  const {
    dataConfig = {},
    layoutConfig = {},
    availabilityConfig = {},
  } = visualizations?.data?.userConfigs;
  const xaxis =
    dataConfig?.valueOptions && dataConfig.valueOptions.xaxis ? dataConfig.valueOptions.xaxis : [];
  const yaxis =
    dataConfig?.valueOptions && dataConfig.valueOptions.xaxis ? dataConfig.valueOptions.yaxis : [];
  const lastIndex = fields.length - 1;
  const mode =
    dataConfig?.chartOptions && dataConfig.chartOptions.mode && dataConfig.chartOptions.mode[0]
      ? dataConfig.chartOptions.mode[0].modeId
      : 'line';

  let valueSeries;
  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    valueSeries = [...yaxis];
  } else {
    valueSeries = defaultAxes.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1);
  }

  const [calculatedLayout, lineValues] = useMemo(() => {
    let calculatedLineValues = valueSeries.map((field: any) => {
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

    if (dataConfig.thresholds || availabilityConfig.level) {
      const thresholdTraces = {
        x: [],
        y: [],
        mode: 'text',
        text: [],
      };
      const thresholds = dataConfig.thresholds ? dataConfig.thresholds : [];
      const levels = availabilityConfig.level ? availabilityConfig.level : [];

      const mapToLine = (list: ThresholdUnitType[] | AvailabilityUnitType[], lineStyle: any) => {
        return list.map((thr: ThresholdUnitType) => {
          thresholdTraces.x.push(
            data[!isEmpty(xaxis) ? xaxis[xaxis.length - 1]?.label : fields[lastIndex].name][0]
          );
          thresholdTraces.y.push(thr.value * (1 + 0.06));
          thresholdTraces.text.push(thr.name);
          return {
            type: 'line',
            x0: data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name][0],
            y0: thr.value,
            x1: last(data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name]),
            y1: thr.value,
            name: thr.name || '',
            opacity: 0.7,
            line: {
              color: thr.color,
              width: 3,
              ...lineStyle,
            },
          };
        });
      };

      mergedLayout.shapes = [
        ...mapToLine(thresholds, { dash: 'dashdot' }),
        ...mapToLine(levels, {}),
      ];
      calculatedLineValues = [...calculatedLineValues, thresholdTraces];
    }
    return [mergedLayout, calculatedLineValues];
  }, [data, fields, lastIndex, layout, layoutConfig, xaxis, yaxis, mode, valueSeries]);

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={lineValues} layout={calculatedLayout} config={mergedConfigs} />;
};

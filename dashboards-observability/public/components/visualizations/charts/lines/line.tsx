/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { take, isEmpty, last } from 'lodash';
import { Plt } from '../../plotly/plot';
import { DefaultChartStyles } from '../../../../../common/constants/shared';

export const Line = ({ visualizations, layout, config }: any) => {
  const {  DefaultMode,Interpolation,LineWidth,FillOpacity } = DefaultChartStyles;
  const {
    data = {},
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { defaultAxes } = visualizations.data;
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;
  const xaxis =
    dataConfig?.valueOptions && dataConfig.valueOptions.xaxis ? dataConfig.valueOptions.xaxis : [];
  const yaxis =
    dataConfig?.valueOptions && dataConfig.valueOptions.xaxis ? dataConfig.valueOptions.yaxis : [];
  const lastIndex = fields.length - 1;

  const mode = dataConfig?.chartStyles?.style || DefaultMode;
  const lineShape = dataConfig?.chartStyles?.interpolation || Interpolation;
  const lineWidth = dataConfig?.chartStyles?.lineWidth || LineWidth;
  const showLegend = dataConfig?.legend?.showLegend === 'hidden' ? false : true;
  const legendPosition = dataConfig?.legend?.position || 'v';
  const markerSize = dataConfig?.chartStyles?.pointSize || 5;

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
        type: mode === 'bar' ? 'bar' : 'scatter',
        name: field.name,
        mode,
        line: { shape: lineShape, width: lineWidth },
        marker: {
          size: markerSize
        },
      };
    });
    
    const mergedLayout = {
      ...layout,
      ...layoutConfig.layout,
      title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
      legend:{
        ...layout.legend,
        orientation: legendPosition,
      },
      showlegend: showLegend,
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
              width: 4,
              dash: 'dashdot',
            },
          };
        }),
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

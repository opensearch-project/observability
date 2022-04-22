/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { isEmpty, take } from 'lodash';
import { Plt } from '../../plotly/plot';
import { LONG_CHART_COLOR, PLOTLY_COLOR } from '../../../../../common/constants/shared';

export const TimeSeries = ({ visualizations, layout, config }: any) => {
  console.log("visualizations:::>", visualizations)
  const { vis } = visualizations;
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { isUniColor } = vis?.visConfig;
  const lastIndex = fields.length - 1;
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;
  const xaxis =
    dataConfig.valueOptions && dataConfig.valueOptions.xaxis ? dataConfig.valueOptions.xaxis : [];
  const yaxis =
    dataConfig.valueOptions && dataConfig.valueOptions.xaxis ? dataConfig?.valueOptions.yaxis : [];
  const seriesOrientation =
    dataConfig?.chartOptions?.orientation &&
    dataConfig.chartOptions.orientation[0] &&
    dataConfig.chartOptions.orientation[0].orientationId
      ? dataConfig.chartOptions.orientation[0].orientationId
      : visualizations.vis.orientation;
  const { defaultAxes } = visualizations.data;

  const isVertical = seriesOrientation === 'v';

  // when: stackLength = 1 and length of result buckets < 16 and chart is not unicolor
  // Else each stacked series has its own color using colorway
  let marker = {};
  if (lastIndex === 1 && data[fields[lastIndex].name].length < 16 && !isUniColor) {
    marker = {
      color: data[fields[lastIndex].name].map((_: string, index: number) => {
        return PLOTLY_COLOR[index % PLOTLY_COLOR.length];
      }),
    };
  }

  let valueSeries;
  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    valueSeries = isVertical ? [...yaxis] : [...xaxis];
  } else {
    valueSeries = defaultAxes.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1);
  }

  const timeSeries = valueSeries.map((field: any) => {
    return {
      x: isVertical
        ? data[!isEmpty(xaxis) ? xaxis[0].label : fields[lastIndex].name]
        : data[field.name],
      y: isVertical
        ? data[field.name]
        : data[!isEmpty(yaxis) ? yaxis[0]?.label : fields[lastIndex].name],
      type: vis.type,
      marker,
      name: field.name,
      orientation: seriesOrientation,
    };
  });
  console.log("fields::", fields);
  console.log("valueSeries:", valueSeries);

  console.log("timeSeries::", timeSeries);
  // If chart has length of result buckets < 16
  // then use the LONG_CHART_COLOR for all the series in the chart
  const plotlyColorway =
    data[fields[lastIndex].name].length < 16 ? PLOTLY_COLOR : [LONG_CHART_COLOR];

  const mergedLayout = {
    colorway: plotlyColorway,
    ...layout,
    ...(layoutConfig.layout && layoutConfig.layout),
    title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
    barmode:
      dataConfig?.chartOptions?.mode &&
      dataConfig.chartOptions.mode[0] &&
      dataConfig.chartOptions.mode[0].modeId
        ? dataConfig.chartOptions.mode[0].modeId
        : '',
  };

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={timeSeries} layout={mergedLayout} config={mergedConfigs} />;
};

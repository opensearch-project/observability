/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { take, isEmpty } from 'lodash';
import { Plt } from '../../plotly/plot';
import { DefaultChartStyles, PLOTLY_COLOR } from '../../../../../common/constants/shared';
import { hexToRgba } from '../../../../components/event_analytics/utils/utils';

export const Histogram = ({ visualizations, layout, config }: any) => {
  const { LineWidth, FillOpacity } = DefaultChartStyles;
  const {
    data = {},
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { defaultAxes } = visualizations?.data;
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;
  const lastIndex = fields.length - 1;
  const showLegend = dataConfig?.legend?.showLegend === 'hidden' ? false : true;
  const legendPosition = dataConfig?.legend?.position || 'v';
  const lineWidth = dataConfig?.chartStyles?.lineWidth || LineWidth;
  const fillOpacity = (dataConfig?.chartStyles?.fillOpacity || FillOpacity) / 100;

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

  const xbins: any = {};
  if (dataConfig?.chartStyles?.bucketSize) {
    xbins.size = dataConfig?.chartStyles?.bucketSize;
  }
  if (dataConfig?.chartStyles?.bucketOffset) {
    xbins.start = dataConfig?.chartStyles?.bucketOffset;
  }

  const selectedColorTheme = (field: any, index: number, opacity?: number) => {
    let newColor;
    if (dataConfig?.colorTheme && dataConfig?.colorTheme.length !== 0) {
      newColor = dataConfig.colorTheme.find(
        (colorSelected) => colorSelected.name.name === field.name
      );
    }
    return hexToRgba(
      newColor ? newColor.color : PLOTLY_COLOR[index % PLOTLY_COLOR.length],
      opacity
    );
  };

  const hisValues = valueSeries.map((field: any, index: number) => {
    return {
      x: data[field.name],
      type: 'histogram',
      name: field.name,
      marker: {
        color: selectedColorTheme(field, index, fillOpacity),
        line: {
          color: selectedColorTheme(field, index),
          width: lineWidth,
        },
      },
      xbins: !isEmpty(xbins) ? xbins : undefined,
    };
  });

  const mergedLayout = {
    ...layout,
    ...(layoutConfig.layout && layoutConfig.layout),
    title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
    barmode: 'group',
    legend: {
      ...layout.legend,
      orientation: legendPosition,
    },
    showlegend: showLegend,
  };

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={hisValues} layout={mergedLayout} config={mergedConfigs} />;
};

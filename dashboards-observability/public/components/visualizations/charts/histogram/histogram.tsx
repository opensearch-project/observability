/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { take, isEmpty, last } from 'lodash';
import { Plt } from '../../plotly/plot';
import {
  DefaultChartStyles,
  PLOTLY_COLOR,
  FILLOPACITY_DIV_FACTOR,
  visChartTypes,
} from '../../../../../common/constants/shared';
import { hexToRgb } from '../../../../components/event_analytics/utils/utils';

export const Histogram = ({ visualizations, layout, config }: any) => {
  const { LineWidth, FillOpacity, LegendPosition, ShowLegend } = DefaultChartStyles;
  const {
    data = {},
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { defaultAxes } = visualizations?.data;
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;
  const lastIndex = fields.length - 1;
  const lineWidth = dataConfig?.chartStyles?.lineWidth || LineWidth;
  const showLegend =
    dataConfig?.legend?.showLegend && dataConfig.legend.showLegend !== ShowLegend ? false : true;
  const legendPosition = dataConfig?.legend?.position || LegendPosition;
  const fillOpacity =
    (dataConfig?.chartStyles?.fillOpacity || FillOpacity) / FILLOPACITY_DIV_FACTOR;
  const tooltipMode =
    dataConfig?.tooltipOptions?.tooltipMode !== undefined
      ? dataConfig.tooltipOptions.tooltipMode
      : 'show';
  const tooltipText =
    dataConfig?.tooltipOptions?.tooltipText !== undefined
      ? dataConfig.tooltipOptions.tooltipText
      : 'all';
  const valueSeries = defaultAxes?.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1);

  const xbins: any = {};
  if (dataConfig?.dimensions[0].bucketSize) {
    xbins.size = dataConfig.dimensions[0].bucketSize;
  }
  if (dataConfig?.dimensions[0].bucketOffset) {
    xbins.start = dataConfig.dimensions[0].bucketOffset;
  }

  const selectedColorTheme = (field: any, index: number, opacity?: number) => {
    let newColor;
    if (dataConfig?.colorTheme && dataConfig?.colorTheme.length !== 0) {
      newColor = dataConfig.colorTheme.find(
        (colorSelected) => colorSelected.name.name === field.name
      );
    }
    return hexToRgb(newColor ? newColor.color : PLOTLY_COLOR[index % PLOTLY_COLOR.length], opacity);
  };

  const hisValues = useMemo(
    () =>
      valueSeries.map((field: any, index: number) => ({
        x: data[field.name],
        type: visChartTypes.Histogram,
        name: field.name,
        hoverinfo: tooltipMode === 'hidden' ? 'none' : tooltipText,
        marker: {
          color: selectedColorTheme(field, index, fillOpacity),
          line: {
            color: selectedColorTheme(field, index),
            width: lineWidth,
          },
        },
        xbins: !isEmpty(xbins) ? xbins : undefined,
      })),
    [valueSeries, data, fillOpacity, lineWidth, xbins, selectedColorTheme]
  );

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

  const mergedConfigs = useMemo(
    () => ({
      ...config,
      ...(layoutConfig.config && layoutConfig.config),
    }),
    [config, layoutConfig.config]
  );

  return <Plt data={hisValues} layout={mergedLayout} config={mergedConfigs} />;
};

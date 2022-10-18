/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { isEmpty, take } from 'lodash';
import React, { useMemo } from 'react';
import { GROUPBY } from '../../../../../common/constants/explorer';
import {
  DEFAULT_CHART_STYLES,
  FILLOPACITY_DIV_FACTOR,
  PLOTLY_COLOR,
  VIS_CHART_TYPES,
} from '../../../../../common/constants/shared';
import { IVisualizationContainerProps } from '../../../../../common/types/explorer';
import { hexToRgb } from '../../../../components/event_analytics/utils/utils';
import { Plt } from '../../plotly/plot';

export const Histogram = ({ visualizations, layout, config }: any) => {
  const { LineWidth, FillOpacity, LegendPosition, ShowLegend } = DEFAULT_CHART_STYLES;
  const {
    data: {
      defaultAxes,
      indexFields,
      query,
      rawVizData: {
        data: queriedVizData,
        metadata: { fields },
      },
      userConfigs,
    },
    vis: visMetaData,
  }: IVisualizationContainerProps = visualizations;
  const { dataConfig = {}, layoutConfig = {} } = userConfigs;

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
  if (dataConfig[GROUPBY] && dataConfig[GROUPBY][0].bucketSize) {
    xbins.size = dataConfig[GROUPBY][0].bucketSize;
  }
  if (dataConfig[GROUPBY] && dataConfig[GROUPBY][0].bucketOffset) {
    xbins.start = dataConfig[GROUPBY][0].bucketOffset;
  }

  const selectedColorTheme = (field: string, index: number, opacity?: number) => {
    let newColor;
    if (dataConfig?.colorTheme && dataConfig?.colorTheme.length !== 0) {
      newColor = dataConfig.colorTheme.find((colorSelected) => colorSelected.name.name === field);
    }
    return hexToRgb(newColor ? newColor.color : PLOTLY_COLOR[index % PLOTLY_COLOR.length], opacity);
  };

  const hisValues = useMemo(
    () =>
      valueSeries.map((field: any, index: number) => ({
        x: queriedVizData[field.name],
        type: VIS_CHART_TYPES.Histogram,
        name: field.name,
        hoverinfo: tooltipMode === 'hidden' ? 'none' : tooltipText,
        marker: {
          color: selectedColorTheme(field.name, index, fillOpacity),
          line: {
            color: selectedColorTheme(field.name, index),
            width: lineWidth,
          },
        },
        xbins: !isEmpty(xbins) ? xbins : undefined,
      })),
    [valueSeries, queriedVizData, fillOpacity, lineWidth, xbins, selectedColorTheme]
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

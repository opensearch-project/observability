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
  PLOT_MARGIN,
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
      userConfigs: {
        dataConfig: {
          chartStyles = {},
          legend = {},
          tooltipOptions = {},
          colorTheme = [],
          panelOptions = {},
          [GROUPBY]: dimensions = [],
        },
        layoutConfig = {},
      },
    },
    vis: visMetaData,
  }: IVisualizationContainerProps = visualizations;

  const lastIndex = fields.length - 1;
  const lineWidth = chartStyles.lineWidth || LineWidth;
  const showLegend = legend.showLegend && legend.showLegend !== ShowLegend ? false : true;
  const legendPosition = legend.position || LegendPosition;
  const fillOpacity = (chartStyles.fillOpacity || FillOpacity) / FILLOPACITY_DIV_FACTOR;
  const tooltipMode =
    tooltipOptions.tooltipMode !== undefined ? tooltipOptions.tooltipMode : 'show';
  const tooltipText = tooltipOptions.tooltipText !== undefined ? tooltipOptions.tooltipText : 'all';
  const valueSeries = defaultAxes?.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1);

  const xbins: any = {};
  if (dimensions && dimensions[0]?.bucketSize) {
    xbins.size = dimensions[0]?.bucketSize;
  }
  if (dimensions && dimensions[0]?.bucketOffset) {
    xbins.start = dimensions[0]?.bucketOffset;
  }

  const selectedColorTheme = (field: string, index: number, opacity?: number) => {
    let newColor;
    if (colorTheme && colorTheme.length !== 0) {
      newColor = colorTheme.find((colorSelected) => colorSelected.name.name === field);
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
    title: panelOptions.title || layoutConfig.layout?.title || '',
    barmode: 'group',
    legend: {
      ...layout.legend,
      orientation: legendPosition,
    },
    showlegend: showLegend,
    margin: PLOT_MARGIN,
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

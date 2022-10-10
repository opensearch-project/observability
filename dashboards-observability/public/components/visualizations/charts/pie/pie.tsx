/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { find, isEmpty } from 'lodash';
import React, { useMemo } from 'react';
import { DEFAULT_PALETTE, HEX_CONTRAST_COLOR } from '../../../../../common/constants/colors';
import {
  AGGREGATIONS,
  GROUPBY,
  PIE_XAXIS_GAP,
  PIE_YAXIS_GAP,
  PLOTLY_PIE_COLUMN_NUMBER,
} from '../../../../../common/constants/explorer';
import {
  ConfigListEntry,
  IVisualizationContainerProps,
} from '../../../../../common/types/explorer';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { getPropName, getTooltipHoverInfo } from '../../../event_analytics/utils/utils';
import { Plt } from '../../plotly/plot';

export const Pie = ({ visualizations, layout, config }: any) => {
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
    vis: { mode, icontype, showlegend, legendSize, labelSize, legendposition },
  }: IVisualizationContainerProps = visualizations;

  const {
    dataConfig: {
      chartStyles = {},
      span = {},
      legend = {},
      panelOptions = {},
      tooltipOptions = {},
      [GROUPBY]: dimensions = [],
      [AGGREGATIONS]: series = [],
    },
    layoutConfig = {},
  } = visualizations?.data?.userConfigs;
  const type = chartStyles.mode || mode;
  const colorTheme = chartStyles.colorTheme ? chartStyles.colorTheme : { name: DEFAULT_PALETTE };
  const showLegend = legend.showLegend === 'hidden' ? false : showlegend;
  const chartLegendSize = legend.size || legendSize;
  const chartLabelSize = chartStyles.labelSize || labelSize;
  const title = panelOptions.title || layoutConfig.layout?.title || '';
  const timestampField = find(fields, (field) => field.type === 'timestamp');

  /**
   * determine x axis
   */
  let xaxes: ConfigListEntry[] = [];
  if (span && span.time_field && timestampField) {
    xaxes = [timestampField, ...dimensions];
  } else {
    xaxes = dimensions;
  }

  if (isEmpty(xaxes) || isEmpty(series)) {
    return <EmptyPlaceholder icon={icontype} />;
  }

  const invertHex = (hex: string) =>
    (Number(`0x1${hex}`) ^ HEX_CONTRAST_COLOR).toString(16).substr(1).toUpperCase();

  const labelsOfXAxis = xaxes.reduce((prev, cur) => {
    if (queriedVizData[cur.name]) {
      if (prev.length === 0) return queriedVizData[cur.name].flat();
      return prev.map(
        (item: string | number, index: number) => `${item}, ${queriedVizData[cur.name][index]}`
      );
    }
  }, []);

  const hexColor = invertHex(colorTheme);

  const pies = useMemo(
    () =>
      series.map((field: any, index: number) => {
        const fieldName = getPropName(field);
        const marker =
          colorTheme.name !== DEFAULT_PALETTE
            ? {
                marker: {
                  colors: [...Array(queriedVizData[fieldName].length).fill(colorTheme.childColor)],
                  line: {
                    color: hexColor,
                    width: 1,
                  },
                },
              }
            : undefined;
        return {
          labels: labelsOfXAxis,
          values: queriedVizData[fieldName],
          type: 'pie',
          name: getPropName(field),
          hole: type === 'pie' ? 0 : 0.5,
          text: fieldName,
          textinfo: 'percent',
          hoverinfo: getTooltipHoverInfo({
            tooltipMode: tooltipOptions.tooltipMode,
            tooltipText: tooltipOptions.tooltipText,
          }),
          automargin: true,
          textposition: 'outside',
          title: { text: fieldName },
          domain: {
            row: Math.floor(index / PLOTLY_PIE_COLUMN_NUMBER),
            column: index % PLOTLY_PIE_COLUMN_NUMBER,
          },
          ...marker,
          outsidetextfont: {
            size: chartLabelSize,
          },
        };
      }),
    [series, queriedVizData, chartLabelSize, labelsOfXAxis, colorTheme]
  );

  const mergedLayout = useMemo(() => {
    const isAtleastOneFullRow = Math.floor(series.length / PLOTLY_PIE_COLUMN_NUMBER) > 0;
    return {
      grid: {
        xgap: PIE_XAXIS_GAP,
        ygap: PIE_YAXIS_GAP,
        rows: Math.floor(series.length / PLOTLY_PIE_COLUMN_NUMBER) + 1,
        columns: isAtleastOneFullRow ? PLOTLY_PIE_COLUMN_NUMBER : series.length,
        pattern: 'independent',
      },
      ...layout,
      ...(layoutConfig.layout && layoutConfig.layout),
      title,
      legend: {
        ...layout.legend,
        orientation: legend.position || legendposition,
        ...(chartLegendSize && {
          font: { size: chartLegendSize },
        }),
      },
      showlegend: showLegend,
    };
  }, [series, layoutConfig.layout, title, layout.legend]);

  const mergedConfigs = useMemo(
    () => ({
      ...config,
      ...(layoutConfig.config && layoutConfig.config),
    }),
    [config, layoutConfig.config]
  );

  return <Plt data={pies} layout={mergedLayout} config={mergedConfigs} />;
};

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { isEmpty, find } from 'lodash';
import { Plt } from '../../plotly/plot';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { getTooltipHoverInfo, getPropName } from '../../../event_analytics/utils/utils';
import {
  ConfigListEntry,
  IVisualizationContainerProps,
} from '../../../../../common/types/explorer';
import { DEFAULT_PALETTE, HEX_CONTRAST_COLOR } from '../../../../../common/constants/colors';
import {
  PLOTLY_PIE_COLUMN_NUMBER,
  PIE_YAXIS_GAP,
  PIE_XAXIS_GAP,
  AGGREGATIONS,
  GROUPBY,
} from '../../../../../common/constants/explorer';
import { PLOT_MARGIN } from '../../../../../common/constants/shared';

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
    vis: visMetaData,
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
  const type = chartStyles.mode || visMetaData.mode;
  const colorTheme = chartStyles.colorTheme ? chartStyles.colorTheme : { name: DEFAULT_PALETTE };
  const showLegend = legend.showLegend === 'hidden' ? false : visMetaData.showlegend;
  const legendSize = legend.size || visMetaData.legendSize;
  const labelSize = chartStyles.labelSize || visMetaData.labelSize;
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
    return <EmptyPlaceholder icon={visMetaData.icontype} />;
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
            size: labelSize,
          },
        };
      }),
    [series, queriedVizData, labelSize, labelsOfXAxis, colorTheme]
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
      legend: {
        ...layout.legend,
        orientation: legend.position || visMetaData.legendposition,
        ...(legendSize && {
          font: { size: legendSize },
        }),
      },
      showlegend: showLegend,
      margin: {
        ...PLOT_MARGIN,
        t: 100,
      },
      title: {
        text: title,
        xanchor: 'right',
        yanchor: 'top',
        x: 1,
        y: 1,
        xref: 'paper',
        yref: 'container',
      },
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

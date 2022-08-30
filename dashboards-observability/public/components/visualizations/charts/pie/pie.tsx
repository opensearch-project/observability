/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { take, isEmpty } from 'lodash';
import { Plt } from '../../plotly/plot';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import {
  filterDataConfigParameter,
  getTooltipHoverInfo,
} from '../../../event_analytics/utils/utils';
import { DEFAULT_PALETTE, HEX_CONTRAST_COLOR } from '../../../../../common/constants/colors';
import {
  PLOTLY_PIE_COLUMN_NUMBER,
  PIE_YAXIS_GAP,
  PIE_XAXIS_GAP,
} from '../../../../../common/constants/explorer';

export const Pie = ({ visualizations, layout, config }: any) => {
  const { vis } = visualizations;
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { defaultAxes } = visualizations.data;
  const {
    dataConfig: {
      chartStyles = {},
      valueOptions = {},
      legend = {},
      panelOptions = {},
      tooltipOptions = {},
    },
    layoutConfig = {},
  } = visualizations?.data?.userConfigs;
  const xaxis = valueOptions.dimensions ? filterDataConfigParameter(valueOptions.dimensions) : [];
  const yaxis = valueOptions.metrics ? filterDataConfigParameter(valueOptions.metrics) : [];
  const type = chartStyles.mode || vis.mode;
  const lastIndex = fields.length - 1;
  const colorTheme = chartStyles.colorTheme ? chartStyles.colorTheme : { name: DEFAULT_PALETTE };
  const showLegend = legend.showLegend === 'hidden' ? false : vis.showlegend;
  const legendSize = legend.legendSize;
  const labelSize = chartStyles.labelSize;
  const title = panelOptions.title || layoutConfig.layout?.title || '';

  if (isEmpty(xaxis) || isEmpty(yaxis))
    return <EmptyPlaceholder icon={visualizations?.vis?.icontype} />;

  let valueSeries;
  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    valueSeries = [...yaxis];
  } else {
    valueSeries = defaultAxes.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1);
  }

  const invertHex = (hex: string) =>
    (Number(`0x1${hex}`) ^ HEX_CONTRAST_COLOR).toString(16).substr(1).toUpperCase();

  const createLegendLabels = (dimLabels: string[], xaxisLables: string[]) => {
    return dimLabels.map((label: string, index: number) => {
      return [xaxisLables[index], label].join(',');
    });
  };

  const labelsOfXAxis = useMemo(() => {
    let legendLabels = [];
    if (xaxis.length > 0) {
      let dimLabelsArray = data[xaxis[0].label];
      for (let i = 0; i < xaxis.length - 1; i++) {
        dimLabelsArray = createLegendLabels(dimLabelsArray, data[xaxis[i + 1].label]);
      }
      legendLabels = dimLabelsArray;
    } else {
      legendLabels = data[fields[lastIndex].name];
    }
    return legendLabels;
  }, [xaxis, data, fields, createLegendLabels]);

  const hexColor = invertHex(colorTheme);
  const pies = useMemo(
    () =>
      valueSeries.map((field: any, index: number) => {
        const marker =
          colorTheme.name !== DEFAULT_PALETTE
            ? {
                marker: {
                  colors: [...Array(data[field.name].length).fill(colorTheme.childColor)],
                  line: {
                    color: hexColor,
                    width: 1,
                  },
                },
              }
            : undefined;
        return {
          labels: labelsOfXAxis,
          values: data[field.label],
          type: 'pie',
          name: field.name,
          hole: type === 'pie' ? 0 : 0.5,
          text: field.name,
          textinfo: 'percent',
          automargin: true,
          textposition: 'outside',
          title: { text: field.label },
          domain: {
            row: Math.floor(index / PLOTLY_PIE_COLUMN_NUMBER),
            column: index % PLOTLY_PIE_COLUMN_NUMBER,
          },
          ...marker,
          outsidetextfont: {
            size: labelSize,
          },
          hoverinfo: getTooltipHoverInfo({
            tooltipMode: tooltipOptions.tooltipMode,
            tooltipText: tooltipOptions?.tooltipText,
          }),
        };
      }),
    [valueSeries, data, labelSize, labelsOfXAxis, colorTheme]
  );

  const mergedLayout = useMemo(() => {
    const isAtleastOneFullRow = Math.floor(valueSeries.length / PLOTLY_PIE_COLUMN_NUMBER) > 0;
    return {
      grid: {
        xgap: PIE_XAXIS_GAP,
        ygap: PIE_YAXIS_GAP,
        rows: Math.floor(valueSeries.length / PLOTLY_PIE_COLUMN_NUMBER) + 1,
        columns: isAtleastOneFullRow ? PLOTLY_PIE_COLUMN_NUMBER : valueSeries.length,
        pattern: 'independent',
      },
      ...layout,
      ...(layoutConfig.layout && layoutConfig.layout),
      title,
      legend: {
        ...layout.legend,
        orientation: legend.position || vis.legendposition,
        ...(legendSize && {
          font: { size: legendSize },
        }),
      },
      showlegend: showLegend,
    };
  }, [valueSeries, layoutConfig.layout, title, layout.legend]);

  const mergedConfigs = useMemo(
    () => ({
      ...config,
      ...(layoutConfig.config && layoutConfig.config),
    }),
    [config, layoutConfig.config]
  );

  return <Plt data={pies} layout={mergedLayout} config={mergedConfigs} />;
};

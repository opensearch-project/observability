/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useMemo } from 'react';
import { colorPalette } from '@elastic/eui';
import { has, isEmpty, uniq } from 'lodash';
import Plotly from 'plotly.js-dist';
import {
  HEATMAP_PALETTE_COLOR,
  HEATMAP_SINGLE_COLOR,
  OPACITY,
  SINGLE_COLOR_PALETTE,
} from '../../../../../common/constants/colors';
import {
  hexToRgb,
  lightenColor,
  getPropName,
} from '../../../../components/event_analytics/utils/utils';
import { IVisualizationContainerProps } from '../../../../../common/types/explorer';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { Plt } from '../../plotly/plot';
import { AGGREGATIONS, GROUPBY } from '../../../../../common/constants/explorer';

export const HeatMap = ({ visualizations, layout, config }: any) => {
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
    vis: { icontype },
  }: IVisualizationContainerProps = visualizations;
  const {
    dataConfig: {
      chartStyles = {},
      legend = {},
      tooltipOptions = {},
      panelOptions = {},
      [GROUPBY]: dimensions = [],
      [AGGREGATIONS]: series = [],
    },
    layoutConfig = {},
  } = userConfigs;

  if (fields.length < 3) return <EmptyPlaceholder icon={icontype} />;

  const xaxisField = dimensions[0];
  const yaxisField = dimensions[1];
  const zMetrics = series[0];

  if (
    isEmpty(xaxisField) ||
    isEmpty(yaxisField) ||
    isEmpty(zMetrics) ||
    isEmpty(queriedVizData[xaxisField.label]) ||
    isEmpty(queriedVizData[yaxisField.label]) ||
    isEmpty(queriedVizData[getPropName(zMetrics)]) ||
    dimensions.length > 2 ||
    series.length > 1
  )
    return <EmptyPlaceholder icon={icontype} />;

  const uniqueYaxis = uniq(queriedVizData[yaxisField.label]);
  const uniqueXaxis = uniq(queriedVizData[xaxisField.label]);
  const uniqueYaxisLength = uniqueYaxis.length;
  const uniqueXaxisLength = uniqueXaxis.length;
  const tooltipMode =
    tooltipOptions.tooltipMode !== undefined ? tooltipOptions.tooltipMode : 'show';
  const tooltipText = tooltipOptions.tooltipText !== undefined ? tooltipOptions.tooltipText : 'all';

  const colorField = chartStyles
    ? chartStyles.colorMode && chartStyles.colorMode[0].name === OPACITY
      ? chartStyles.color ?? HEATMAP_SINGLE_COLOR
      : chartStyles.scheme ?? HEATMAP_PALETTE_COLOR
    : HEATMAP_PALETTE_COLOR;
  const showColorscale = legend.showLegend ?? 'show';

  const traceColor: any = [];
  if (colorField.name === SINGLE_COLOR_PALETTE) {
    const colorsArray = colorPalette([lightenColor(colorField.color, 50), colorField.color], 10);
    colorsArray.map((hexCode, index) => {
      traceColor.push([
        (index !== colorsArray.length - 1 ? index : 10) / 10,
        hexToRgb(hexCode, 1, false),
      ]);
    });
  }

  const calculatedHeapMapZaxis: Plotly.Data[] = useMemo(() => {
    const heapMapZaxis = [];
    const buckets = {};

    // maps bukcets to metrics
    for (let i = 0; i < queriedVizData[xaxisField.label].length; i++) {
      buckets[`${queriedVizData[xaxisField.label][i]},${queriedVizData[yaxisField.label][i]}`] =
        queriedVizData[getPropName(zMetrics)][i];
    }

    // initialize empty 2 dimensional array, inner loop for each xaxis field, outer loop for yaxis
    for (let i = 0; i < uniqueYaxisLength; i++) {
      const innerBuckets = [];
      for (let j = 0; j < uniqueXaxisLength; j++) {
        innerBuckets.push(null);
      }
      heapMapZaxis.push(innerBuckets);
    }

    // fill in each bucket
    for (let i = 0; i < uniqueYaxisLength; i++) {
      for (let j = 0; j < uniqueXaxisLength; j++) {
        if (has(buckets, `${uniqueXaxis[j]},${uniqueYaxis[i]}`)) {
          heapMapZaxis[i][j] = buckets[`${uniqueXaxis[j]},${uniqueYaxis[i]}`];
        }
      }
    }

    return heapMapZaxis;
  }, [
    queriedVizData,
    uniqueYaxis,
    uniqueXaxis,
    uniqueYaxisLength,
    uniqueXaxisLength,
    xaxisField,
    yaxisField,
    zMetrics,
  ]);

  const heapMapData = [
    {
      z: calculatedHeapMapZaxis,
      x: uniqueXaxis,
      y: uniqueYaxis,
      hoverinfo: tooltipMode === 'hidden' ? 'none' : tooltipText,
      colorscale: colorField.name === SINGLE_COLOR_PALETTE ? traceColor : colorField.name,
      type: 'heatmap',
      showscale: showColorscale === 'show',
    },
  ];

  const mergedLayout = {
    ...layout,
    ...(layoutConfig.layout && layoutConfig.layout),
    title: panelOptions.title || layoutConfig.layout?.title || '',
  };

  const mergedConfigs = useMemo(
    () => ({
      ...config,
      ...(layoutConfig.config && layoutConfig.config),
    }),
    [config, layoutConfig.config]
  );

  return <Plt data={heapMapData} layout={mergedLayout} config={mergedConfigs} />;
};

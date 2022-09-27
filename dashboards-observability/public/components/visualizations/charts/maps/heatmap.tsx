/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

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
    vis: visMetaData,
  }: IVisualizationContainerProps = visualizations;
  const { dataConfig = {}, layoutConfig = {} } = userConfigs;

  if (fields.length < 3) return <EmptyPlaceholder icon={visMetaData?.icontype} />;

  const xaxisField = dataConfig[GROUPBY][0];
  const yaxisField = dataConfig[GROUPBY][1];
  const zMetrics = dataConfig[AGGREGATIONS][0];

  if (
    isEmpty(xaxisField) ||
    isEmpty(yaxisField) ||
    isEmpty(zMetrics) ||
    isEmpty(queriedVizData[xaxisField.label]) ||
    isEmpty(queriedVizData[yaxisField.label]) ||
    isEmpty(queriedVizData[getPropName(zMetrics)]) ||
    dataConfig[GROUPBY].length > 2 ||
    dataConfig[AGGREGATIONS].length > 1
  )
    return <EmptyPlaceholder icon={visMetaData?.icontype} />;

  const uniqueYaxis = uniq(queriedVizData[yaxisField.label]);
  const uniqueXaxis = uniq(queriedVizData[xaxisField.label]);
  const uniqueYaxisLength = uniqueYaxis.length;
  const uniqueXaxisLength = uniqueXaxis.length;
  const tooltipMode =
    dataConfig?.tooltipOptions?.tooltipMode !== undefined
      ? dataConfig.tooltipOptions.tooltipMode
      : 'show';
  const tooltipText =
    dataConfig?.tooltipOptions?.tooltipText !== undefined
      ? dataConfig.tooltipOptions.tooltipText
      : 'all';

  const colorField = dataConfig?.chartStyles
    ? dataConfig?.chartStyles.colorMode && dataConfig?.chartStyles.colorMode[0].name === OPACITY
      ? dataConfig?.chartStyles.color ?? HEATMAP_SINGLE_COLOR
      : dataConfig?.chartStyles.scheme ?? HEATMAP_PALETTE_COLOR
    : HEATMAP_PALETTE_COLOR;
  const showColorscale = dataConfig?.legend?.showLegend ?? 'show';

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
    title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
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

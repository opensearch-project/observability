/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { uniq, has, isEmpty } from 'lodash';
import Plotly from 'plotly.js-dist';
import { colorPalette } from '@elastic/eui';
import { Plt } from '../../plotly/plot';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { REDS_PALETTE } from '../../../../../common/constants/colors';
import { hexToRgb, lightenColor } from '../../../../components/event_analytics/utils/utils';

export const HeatMap = ({ visualizations, layout, config }: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;

  if (fields.length < 3) return <EmptyPlaceholder icon={visualizations?.vis?.iconType} />;

  const xaxisField = fields[fields.length - 2];
  const yaxisField = fields[fields.length - 1];
  const zMetrics =
    dataConfig?.valueOptions && dataConfig?.valueOptions.zaxis
      ? dataConfig?.valueOptions.zaxis[0]
      : fields[fields.length - 3];
  const uniqueYaxis = uniq(data[yaxisField.name]);
  const uniqueXaxis = uniq(data[xaxisField.name]);
  const uniqueYaxisLength = uniqueYaxis.length;
  const uniqueXaxisLength = uniqueXaxis.length;

  if (
    isEmpty(xaxisField) ||
    isEmpty(yaxisField) ||
    isEmpty(zMetrics) ||
    isEmpty(data[xaxisField.name]) ||
    isEmpty(data[yaxisField.name]) ||
    isEmpty(data[zMetrics.name])
  )
    return <EmptyPlaceholder icon={visualizations?.vis?.iconType} />;

  const getColorField = () => {
    return dataConfig?.chartStyles
      ? dataConfig?.chartStyles.colorMode && dataConfig?.chartStyles.colorMode[0].name === 'opacity'
        ? dataConfig?.chartStyles.color ?? { name: 'singleColor', color: '#000000' }
        : dataConfig?.chartStyles.scheme ?? { name: REDS_PALETTE.label, color: REDS_PALETTE.label }
      : { name: REDS_PALETTE.label, color: REDS_PALETTE.label };
  };

  const colorField = getColorField();
  const fillColor: any = [];
  if (colorField.name === 'singleColor') {
    const colorsArray = colorPalette([lightenColor(colorField.color, 50), colorField.color], 10);
    colorsArray.map((hexCode, index) => {
      fillColor.push([
        (index !== colorsArray.length - 1 ? index : 10) / 10,
        hexToRgb(hexCode, 1, false),
      ]);
    });
  }

  const calculatedHeapMapZaxis: Plotly.Data[] = useMemo(() => {
    const heapMapZaxis = [];
    const buckets = {};

    // maps bukcets to metrics
    for (let i = 0; i < data[xaxisField.name].length; i++) {
      buckets[`${data[xaxisField.name][i]},${data[yaxisField.name][i]}`] = data[zMetrics.name][i];
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
    data,
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
      colorscale: colorField.name === 'singleColor' ? fillColor : colorField.name,
      type: 'heatmap',
    },
  ];

  const mergedLayout = {
    ...layout,
    ...(layoutConfig.layout && layoutConfig.layout),
    title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || zMetrics.name || '',
  };

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={heapMapData} layout={mergedLayout} config={mergedConfigs} />;
};

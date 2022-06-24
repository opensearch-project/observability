/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { take, isEmpty } from 'lodash';
import { Plt } from '../../plotly/plot';
import { DEFAULT_PALETTE, HEX_CONTRAST_COLOR } from '../../../../../common/constants/colors';

export const Pie = ({ visualizations, layout, config }: any) => {
  const { vis } = visualizations;
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { defaultAxes } = visualizations.data;
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;
  const xaxis = visualizations.data?.rawVizData?.dataConfig?.dimensions
    ? visualizations.data?.rawVizData?.dataConfig?.dimensions
    : [];
  const yaxis = visualizations.data?.rawVizData?.dataConfig?.metrics
    ? visualizations.data?.rawVizData?.dataConfig?.metrics
    : [];
  const type = dataConfig?.chartStyles?.mode ? dataConfig?.chartStyles?.mode[0]?.modeId : 'pie';
  const lastIndex = fields.length - 1;
  const colorTheme = dataConfig?.chartStyles?.colorTheme
    ? dataConfig?.chartStyles?.colorTheme
    : { name: DEFAULT_PALETTE };
  const showLegend = dataConfig?.legend?.showLegend === 'hidden' ? false : vis.showLegend;
  const legendPosition = dataConfig?.legend?.position || vis.legendPosition;
  const legendSize = dataConfig?.legend?.size || vis.legendSize;
  const labelSize = dataConfig?.chartStyles?.labelSize || vis.labelSize;

  let valueSeries;
  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    valueSeries = [...yaxis];
  } else {
    valueSeries = defaultAxes.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1);
  }

  const invertHex = (hex: string) =>
    (Number(`0x1${hex}`) ^ HEX_CONTRAST_COLOR).toString(16).substr(1).toUpperCase();

  const pies = valueSeries.map((field: any, index) => {
    const marker =
      colorTheme.name !== DEFAULT_PALETTE
        ? {
            marker: {
              colors: [...Array(data[field.name].length).fill(colorTheme.childColor)],
              line: {
                color: invertHex(colorTheme),
                width: 1,
              },
            },
          }
        : undefined;
    return {
      labels: data[xaxis ? xaxis[0]?.label : fields[lastIndex].name],
      values: data[field.label],
      type: 'pie',
      name: field.name,
      hole: type === 'pie' ? 0 : 0.5,
      text: field.name,
      textinfo: 'percent',
      automargin: true,
      textposition: 'outside',
      domain: {
        row: Math.floor(index / 3),
        column: index % 3,
      },
      ...marker,
      outsidetextfont: {
        size: labelSize,
      },
    };
  });

  const isAtleastOneFullRow = Math.floor(valueSeries.length / 3) > 0;

  const mergedLayout = {
    grid: {
      rows: Math.floor(valueSeries.length / 3) + 1,
      columns: isAtleastOneFullRow ? 3 : valueSeries.length,
    },
    ...layout,
    ...(layoutConfig.layout && layoutConfig.layout),
    title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
    legend: {
      ...layout.legend,
      orientation: legendPosition,
      font: { size: legendSize },
    },
    showlegend: showLegend,
  };

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={pies} layout={mergedLayout} config={mergedConfigs} />;
};

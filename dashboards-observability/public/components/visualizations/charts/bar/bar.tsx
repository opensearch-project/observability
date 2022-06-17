/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { isEmpty, last, take } from 'lodash';
import { Plt } from '../../plotly/plot';
import { LONG_CHART_COLOR, PLOTLY_COLOR } from '../../../../../common/constants/shared';
import { AvailabilityUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { ThresholdUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import { hexToRgba } from '../../../event_analytics/utils/utils';
import {  FILLOPACITY_DIV_FACTOR } from '../../../../../common/constants/shared';

export const Bar = ({ visualizations, layout, config }: any) => {
  const { vis } = visualizations;
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { isUniColor } = vis.visConfig;
  const lastIndex = fields.length - 1;
  const {
    dataConfig = {},
    layoutConfig = {},
    availabilityConfig = {},
  } = visualizations?.data?.userConfigs;
  const xaxis =
    dataConfig.valueOptions && dataConfig.valueOptions.xaxis ? dataConfig.valueOptions.xaxis : [];
  const yaxis =
    dataConfig.valueOptions && dataConfig.valueOptions.xaxis ? dataConfig?.valueOptions.yaxis : [];
  const barOrientation = dataConfig?.chartStyles?.orientation || vis.orientation;
  const { defaultAxes } = visualizations.data;
  const tickAngle = dataConfig?.chartStyles?.rotateBarLabels || vis.labelAngle
  const lineWidth = dataConfig?.chartStyles?.lineWidth || vis.lineWidth;
  const fillOpacity = dataConfig?.chartStyles?.fillOpacity !== undefined ? dataConfig?.chartStyles?.fillOpacity / FILLOPACITY_DIV_FACTOR : vis.fillOpacity / FILLOPACITY_DIV_FACTOR;
  const barWidth = 1 - (dataConfig?.chartStyles?.barWidth || vis.barWidth);
  const groupWidth = 1 - (dataConfig?.chartStyles?.groupWidth || vis.groupWidth);
  const isVertical = barOrientation === vis.orientation;
  const showLegend = !(dataConfig?.legend?.showLegend && dataConfig.legend.showLegend !== vis.showLegend);
  const legendPosition = dataConfig?.legend?.position || vis.legendPosition;

  const getSelectedColorTheme = (field: any, index: number) => dataConfig?.colorTheme?.length > 0 && dataConfig.colorTheme.find(
    (colorSelected) => colorSelected.name.name === field.name)?.color || PLOTLY_COLOR[index % PLOTLY_COLOR.length];

  let valueSeries;
  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    valueSeries = isVertical ? [...yaxis] : [...xaxis];
  } else {
    valueSeries = defaultAxes.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1);
  }

  // determine category axis
  let bars = valueSeries.map((field: any, index: number) => {
    const selectedColor = getSelectedColorTheme(field, index);
    return {
      x: isVertical
        ? data[!isEmpty(xaxis) ? xaxis[0].label : fields[lastIndex].name]
        : data[field.name],
      y: isVertical
        ? data[field.name]
        : data[!isEmpty(yaxis) ? yaxis[0]?.label : fields[lastIndex].name],
      type: vis.type,
      marker: {
        color: hexToRgba(selectedColor, fillOpacity),
        line: {
          color: selectedColor,
          width: lineWidth
        }
      },
      name: field.name,
      orientation: barOrientation,
    };
  });

  // If chart has length of result buckets < 16
  // then use the LONG_CHART_COLOR for all the bars in the chart
  const plotlyColorway =
    data[fields[lastIndex].name].length < 16 ? PLOTLY_COLOR : [LONG_CHART_COLOR];

  const mergedLayout = {
    colorway: plotlyColorway,
    ...layout,
    ...(layoutConfig.layout && layoutConfig.layout),
    title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
    barmode: dataConfig?.chartStyles?.mode || visualizations.vis.mode,
    xaxis: {
      tickangle: tickAngle,
      automargin: true,
    },
    bargap: groupWidth,
    bargroupgap: barWidth,
    legend: {
      ...layout.legend,
      orientation: legendPosition,
    },
    showlegend: showLegend,
  };

  if (dataConfig.thresholds || availabilityConfig.level) {
    const thresholdTraces = {
      x: [],
      y: [],
      mode: 'text',
      text: [],
    };
    const thresholds = dataConfig.thresholds ? dataConfig.thresholds : [];
    const levels = availabilityConfig.level ? availabilityConfig.level : [];

    const mapToLine = (list: ThresholdUnitType[] | AvailabilityUnitType[], lineStyle: any) => {
      return list.map((thr: ThresholdUnitType) => {
        thresholdTraces.x.push(
          data[!isEmpty(xaxis) ? xaxis[xaxis.length - 1]?.label : fields[lastIndex].name][0]
        );
        thresholdTraces.y.push(thr.value * (1 + 0.06));
        thresholdTraces.text.push(thr.name);
        return {
          type: 'line',
          x0: data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name][0],
          y0: thr.value,
          x1: last(data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name]),
          y1: thr.value,
          name: thr.name || '',
          opacity: 0.7,
          line: {
            color: thr.color,
            width: 3,
            ...lineStyle,
          },
        };
      });
    };

    mergedLayout.shapes = [...mapToLine(thresholds, { dash: 'dashdot' }), ...mapToLine(levels, {})];
    bars = [...bars, thresholdTraces];
  }

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={bars} layout={mergedLayout} config={mergedConfigs} />;
};

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
import { hexToRgb, filterDataConfigParameter } from '../../../event_analytics/utils/utils';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { FILLOPACITY_DIV_FACTOR } from '../../../../../common/constants/shared';
import { ConfigListEntry } from '../../../../../common/types/explorer';

export const BoxPlot = ({ visualizations, layout, config }: any) => {
  const DEFAULT_LABEL_SIZE = 10;
  const { vis } = visualizations;
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const lastIndex = fields.length - 1;
  const {
    dataConfig = {},
    layoutConfig = {},
    availabilityConfig = {},
  } = visualizations?.data?.userConfigs;
  console.log('data====', data);
  const xaxis = dataConfig?.valueOptions?.dimensions
    ? filterDataConfigParameter(dataConfig.valueOptions.dimensions)
    : [];
  const yaxis = dataConfig?.valueOptions?.metrics
    ? filterDataConfigParameter(dataConfig.valueOptions.metrics)
    : [];
  const boxOrientation = dataConfig?.chartStyles?.orientation || vis.orientation;
  const isVertical = boxOrientation === vis.orientation;

  let box, valueSeries, valueForXSeries;
  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    // valueSeries = isVertical ? [...yaxis] : [...xaxis];
    // valueForXSeries = isVertical ? [...xaxis] : [...yaxis];
    valueSeries = [...yaxis]
    valueForXSeries = [...xaxis]
  } else {
    return <EmptyPlaceholder icon={visualizations?.vis?.iconType} />;
  }

  const tickAngle = dataConfig?.chartStyles?.rotateBoxLabels || vis.labelAngle;
  const lineWidth = dataConfig?.chartStyles?.lineWidth || vis.lineWidth;
  const fillOpacity =
    dataConfig?.chartStyles?.fillOpacity !== undefined
      ? dataConfig?.chartStyles?.fillOpacity / FILLOPACITY_DIV_FACTOR
      : vis.fillopacity / FILLOPACITY_DIV_FACTOR;
  const boxWidth = 1 - (dataConfig?.chartStyles?.boxWidth || vis.boxWidth);
  const groupWidth = 1 - (dataConfig?.chartStyles?.groupWidth || vis.groupWidth);
  const showLegend = !(
    dataConfig?.legend?.showLegend && dataConfig.legend.showLegend !== vis.showLegend
  );
  const legendPosition = dataConfig?.legend?.position || vis.legendPosition;
  visualizations.data?.rawVizData?.dataConfig?.metrics
    ? visualizations.data?.rawVizData?.dataConfig?.metrics
    : [];
  const labelSize = dataConfig?.chartStyles?.labelSize || DEFAULT_LABEL_SIZE;

  const getSelectedColorTheme = (field: any, index: number) =>
    (dataConfig?.colorTheme?.length > 0 &&
      dataConfig.colorTheme.find((colorSelected) => colorSelected.name.name === field.label)
        ?.color) ||
    PLOTLY_COLOR[index % PLOTLY_COLOR.length];

  const prepareData = (valueForXSeries) => {
    return valueForXSeries
      .map((dimension: ConfigListEntry) => data[dimension.label])
      ?.reduce((prev, cur) => {
        return prev.map((i, j) => `${i}, ${cur[j]}`);
      });
  };

  const metricsData = prepareData(valueSeries);
  box = valueSeries.map((field: any, index: number) => {
    const selectedColor = getSelectedColorTheme(field, index);
    return {
      ...(isVertical && {
        y: data[field.name],
        boxpoints: 'all',
        jitter: 0.3,
        pointpos: -1.8,
      }),
      ...(!isVertical && { x: metricsData }),
      type: vis.type,
      marker: {
        color: hexToRgb(selectedColor, fillOpacity),
        line: {
          color: selectedColor,
          width: lineWidth,
        },
      },
      name: field.name,
      orientation: boxOrientation,
    };
  });

  // then use the LONG_CHART_COLOR for all the box in the chart
  const plotlyColorway =
    data[fields[lastIndex].name].length < 16 ? PLOTLY_COLOR : [LONG_CHART_COLOR];
  const mergedLayout = {
    colorway: plotlyColorway,
    ...layout,
    ...(layoutConfig.layout && layoutConfig.layout),
    title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
    boxmode: dataConfig?.chartStyles?.mode || visualizations.vis.mode,
    font: {
      size: labelSize,
    },
    ...(isVertical
      ? {
          xaxis: {
            tickangle: tickAngle,
            automargin: true,
          },
        }
      : {
          yaxis: {
            tickangle: tickAngle,
            automargin: true,
          },
        }),
    boxgap: groupWidth,
    boxgroupgap: boxWidth,
    legend: {
      ...layout.legend,
      orientation: legendPosition,
    },
    showlegend: showLegend,
  };
  if (availabilityConfig.level) {
    const thresholdTraces = {
      x: [],
      y: [],
      mode: 'text',
      text: [],
    };
    const levels = availabilityConfig.level ? availabilityConfig.level : [];

    const mapToLine = (list: ThresholdUnitType[] | AvailabilityUnitType[], lineStyle: any) => {
      return list.map((thr: ThresholdUnitType) => {
        thresholdTraces.x.push(
          data[!isEmpty(xaxis) ? xaxis[xaxis.length - 1]?.label : fields[lastIndex].name][0]
        );
        thresholdTraces.y.push(thr.value * (1 + 0.06));
        thresholdTraces.text.push(thr.name);
        return {
          type: 'box',
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

    mergedLayout.shapes = [...mapToLine(levels, {})];
    box = [...box, thresholdTraces];
  }
  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={box} layout={mergedLayout} config={mergedConfigs} />;
};

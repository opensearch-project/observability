/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { isEmpty, last } from 'lodash';
import { Plt } from '../../plotly/plot';
import { LONG_CHART_COLOR, PLOTLY_COLOR } from '../../../../../common/constants/shared';
import { AvailabilityUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { ThresholdUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import { hexToRgb, filterDataConfigParameter } from '../../../event_analytics/utils/utils';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { FILLOPACITY_DIV_FACTOR } from '../../../../../common/constants/shared';
import { ConfigListEntry } from '../../../../../common/types/explorer';
import { DefaultBoxChartStyles } from '../../../../../common/constants/explorer';

const { PointPosition } = DefaultBoxChartStyles;
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
  const valueForXSeries = dataConfig?.valueOptions?.dimensions
    ? filterDataConfigParameter(dataConfig.valueOptions.dimensions)
    : [];
  const valueSeries = dataConfig?.valueOptions?.metrics
    ? filterDataConfigParameter(dataConfig.valueOptions.metrics)
    : [];
  const boxOrientation = dataConfig?.chartStyles?.orientation || vis.orientation;
  const isVertical = boxOrientation === vis.orientation;
  const boxMode = dataConfig?.chartStyles?.boxMode || visualizations.vis.boxmode;
  let box;

  if (isEmpty(valueSeries) || (boxMode === 'group' && valueForXSeries.length === 0)) {
    return <EmptyPlaceholder icon={visualizations?.vis?.icontype} />;
  }

  const tickAngle = dataConfig?.chartStyles?.rotateBoxLabels || vis.labelangle;
  const markerSize = dataConfig?.chartStyles?.markerSize || vis.markersize;
  const fillOpacity =
    dataConfig?.chartStyles?.fillOpacity !== undefined
      ? dataConfig?.chartStyles?.fillOpacity / FILLOPACITY_DIV_FACTOR
      : vis.fillopacity / FILLOPACITY_DIV_FACTOR;
  const showLegend = !(
    dataConfig?.legend?.showLegend && dataConfig.legend.showLegend !== vis.showlegend
  );
  const legendPosition = dataConfig?.legend?.position || vis.legendposition;
  const labelSize = dataConfig?.chartStyles?.labelSize || DEFAULT_LABEL_SIZE;
  const boxGap = dataConfig?.chartStyles?.boxGap || visualizations.vis.boxgap;
  const jitter = dataConfig?.chartStyles?.jitter || visualizations.vis.jitter;

  const getSelectedColorTheme = (field: ConfigListEntry, index: number) =>
    (dataConfig?.colorTheme?.length > 0 &&
      dataConfig.colorTheme.find((colorSelected: any) => colorSelected?.name.name === field.label)
        ?.color) ||
    PLOTLY_COLOR[index % PLOTLY_COLOR.length];

  const dimensionData = valueForXSeries.reduce((prev, cur) => {
    if (prev.length === 0) return data[cur.name].flat();
    return prev.map(
      (item: string | number, index: number) => `${item},<br>${data[cur.name][index]}`
    );
  }, []);
  box = valueSeries.map((field: ConfigListEntry, index: number) => {
    const selectedColor = getSelectedColorTheme(field, index);
    const axis = isVertical ? 'y' : 'x';
    const alernateAxis = isVertical ? 'x' : 'y';
    return {
      [axis]: data[field.name],
      ...(boxMode === 'group' && {
        [alernateAxis]: dimensionData,
      }),
      boxpoints: 'all',
      jitter: jitter,
      pointpos: PointPosition,
      type: 'box',
      fillcolor: hexToRgb(selectedColor, fillOpacity),
      marker: {
        color: hexToRgb(selectedColor, fillOpacity),
        line: {
          color: selectedColor,
          width: markerSize,
        },
      },
      name: field.name,
      boxmean: true,
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
    boxmode: boxMode,
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
    boxgap: boxGap,
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

    mergedLayout.shapes = mapToLine(levels, {});
    box = [...box, thresholdTraces];
  }
  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={box} layout={mergedLayout} config={mergedConfigs} />;
};
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { isEmpty, last } from 'lodash';
import { Plt } from '../../plotly/plot';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { AvailabilityUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { ThresholdUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import { ConfigListEntry } from '../../../../../common/types/explorer';
import { hexToRgb, filterDataConfigParameter } from '../../../event_analytics/utils/utils';
import { FILLOPACITY_DIV_FACTOR } from '../../../../../common/constants/shared';
import {
  LONG_CHART_COLOR,
  PLOTLY_COLOR,
  THRESHOLD_LINE_WIDTH,
  THRESHOLD_LINE_OPACITY,
  MAX_BUCKET_LENGTH,
} from '../../../../../common/constants/shared';
import { DefaultBoxChartStyles } from '../../../../../common/constants/explorer';

const { PointPosition, MarkerLineWidth } = DefaultBoxChartStyles;
export const BoxPlot = ({ visualizations, layout, config }: any) => {
  const { vis } = visualizations;
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const lastIndex = fields.length - 1;
  const {
    dataConfig: {
      chartStyles = {},
      valueOptions = {},
      legend = {},
      colorTheme = [],
      panelOptions = {},
      tooltipOptions = {},
    },
    layoutConfig = {},
    availabilityConfig = {},
  } = visualizations?.data?.userConfigs;

  const valueForXSeries = valueOptions.dimensions
    ? filterDataConfigParameter(valueOptions.dimensions)
    : [];
  const valueSeries = valueOptions.metrics ? filterDataConfigParameter(valueOptions.metrics) : [];
  const boxOrientation = chartStyles.orientation || vis.orientation;
  const isVertical = boxOrientation === vis.orientation;
  const boxMode = chartStyles.boxMode || vis.boxmode;
  let box;

  if (isEmpty(valueSeries) || (boxMode === 'group' && valueForXSeries.length === 0)) {
    return <EmptyPlaceholder icon={visualizations?.vis?.icontype} />;
  }
  const tickAngle = chartStyles.rotateBoxLabels || vis.labelangle;
  const fillOpacity =
    chartStyles.fillOpacity !== undefined
      ? chartStyles.fillOpacity / FILLOPACITY_DIV_FACTOR
      : vis.fillopacity / FILLOPACITY_DIV_FACTOR;
  const showLegend = !(legend.showLegend && legend.showLegend !== vis.showlegend);
  const labelSize = chartStyles.labelSize;
  const legendSize = legend.legendSize;

  const getHoverText = () => {
    if (tooltipOptions.tooltipMode === 'hidden') {
      return 'none';
    } else {
      if (tooltipOptions.tooltipText === undefined) {
        return 'all';
      } else {
        return tooltipOptions.tooltipText;
      }
    }
  };

  const getSelectedColorTheme = (field: ConfigListEntry, index: number) =>
    (colorTheme.length > 0 &&
      colorTheme.find((colorSelected: any) => colorSelected?.name.name === field.label)?.color) ||
    PLOTLY_COLOR[index % PLOTLY_COLOR.length];

  const dimensionData = valueForXSeries.reduce((prev, cur) => {
    if (prev.length === 0) {
      return data[cur.name].flat();
    }
    return prev.map(
      (item: string | number, index: number) => `${item},<br>${data[cur.name][index]}`
    );
  }, []);

  box = valueSeries.map((field: ConfigListEntry, index: number) => {
    const selectedColor = getSelectedColorTheme(field, index);
    const axis = isVertical ? 'y' : 'x';
    const alternateAxis = isVertical ? 'x' : 'y';
    return {
      [axis]: data[field.name],
      ...(boxMode === 'group' && {
        [alternateAxis]: dimensionData,
        orientation: boxOrientation,
      }),
      boxpoints: 'all',
      jitter: chartStyles.jitter || vis.jitter,
      pointpos: PointPosition,
      type: 'box',
      line: {
        color: selectedColor,
      },
      fillcolor: hexToRgb(selectedColor, fillOpacity),
      marker: {
        size: chartStyles.markerSize || vis.markersize,
        color: selectedColor,
        opacity: fillOpacity,
        line: {
          color: selectedColor,
          width: MarkerLineWidth,
        },
      },
      name: field.name,
      boxmean: true,
      hoverinfo: getHoverText(),
      hovertext: panelOptions.description,
    };
  });

  // If chart has length of result buckets < 16
  // then use the LONG_CHART_COLOR for all the bars in the chart
  const plotlyColorway =
    data[fields[lastIndex].name].length < MAX_BUCKET_LENGTH ? PLOTLY_COLOR : [LONG_CHART_COLOR];
  const mergedLayout = {
    colorway: plotlyColorway,
    ...layout,
    ...(layoutConfig.layout && layoutConfig.layout),
    title: panelOptions?.title || layoutConfig.layout?.title || '',
    boxmode: boxMode,
    xaxis: {
      ...(isVertical && { tickangle: tickAngle }),
      automargin: true,
      tickfont: {
        ...(labelSize && {
          size: labelSize,
        }),
      },
    },
    yaxis: {
      ...(!isVertical && { tickangle: tickAngle }),
      automargin: true,
      tickfont: {
        ...(labelSize && {
          size: labelSize,
        }),
      },
    },
    boxgap: chartStyles.boxGap || vis.boxgap,
    legend: {
      ...layout.legend,
      orientation: legend.position || vis.legendposition,
      ...(legendSize && {
        font: {
          size: legendSize,
        },
      }),
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
          data[
            !isEmpty(valueForXSeries)
              ? valueForXSeries[valueForXSeries.length - 1]?.label
              : fields[lastIndex].name
          ][0]
        );
        thresholdTraces.y.push(thr.value * (1 + 0.06));
        thresholdTraces.text.push(thr.name);
        return {
          type: 'line',
          x0:
            data[!isEmpty(valueForXSeries) ? valueForXSeries[0]?.label : fields[lastIndex].name][0],
          y0: thr.value,
          x1: last(
            data[!isEmpty(valueForXSeries) ? valueForXSeries[0]?.label : fields[lastIndex].name]
          ),
          y1: thr.value,
          name: thr.name || '',
          opacity: THRESHOLD_LINE_OPACITY,
          line: {
            color: thr.color,
            width: THRESHOLD_LINE_WIDTH,
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

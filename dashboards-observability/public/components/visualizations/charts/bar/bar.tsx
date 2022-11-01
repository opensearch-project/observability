/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { isEmpty, last } from 'lodash';
import {
  AGGREGATIONS,
  BREAKDOWNS,
  DEFAULT_BAR_CHART_STYLES,
  GROUPBY,
} from '../../../../../common/constants/explorer';
import {
  BarOrientation,
  FILLOPACITY_DIV_FACTOR,
  LONG_CHART_COLOR,
  PLOTLY_COLOR,
  THRESHOLD_LINE_OPACITY,
  THRESHOLD_LINE_WIDTH,
  PLOT_MARGIN,
} from '../../../../../common/constants/shared';
import { IVisualizationContainerProps } from '../../../../../common/types/explorer';
import { AvailabilityUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { ThresholdUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { hexToRgb } from '../../../event_analytics/utils/utils';
import { Plt } from '../../plotly/plot';
import { transformPreprocessedDataToTraces, preprocessJsonData } from '../shared/common';

export const Bar = ({ visualizations, layout, config }: any) => {
  const {
    data: {
      rawVizData: {
        data: queriedVizData,
        jsonData,
        metadata: { fields },
      },
      userConfigs: {
        dataConfig: {
          colorTheme = [],
          chartStyles = {},
          span = {},
          legend = {},
          panelOptions = {},
          tooltipOptions = {},
          [GROUPBY]: dimensions = [],
          [AGGREGATIONS]: series = [],
          [BREAKDOWNS]: breakdowns = [],
        } = {},
        layoutConfig = {},
        availabilityConfig = {},
      } = {},
    },
    vis: {
      type,
      icontype,
      fillopacity,
      orientation,
      labelangle,
      linewidth,
      barwidth,
      groupwidth,
      showlegend,
      legendposition,
    },
  }: IVisualizationContainerProps = visualizations;

  const lastIndex = fields.length - 1;

  /**
   * determine stylings
   */
  const barOrientation = chartStyles.orientation || orientation;
  const isVertical = barOrientation === BarOrientation.vertical;
  const tickAngle = chartStyles.rotateBarLabels || labelangle;
  const lineWidth = chartStyles.lineWidth || linewidth;
  const fillOpacity =
    chartStyles.fillOpacity !== undefined
      ? chartStyles.fillOpacity / FILLOPACITY_DIV_FACTOR
      : fillopacity / FILLOPACITY_DIV_FACTOR;
  const tooltipMode =
    tooltipOptions.tooltipMode !== undefined ? tooltipOptions.tooltipMode : 'show';
  const tooltipText = tooltipOptions.tooltipText !== undefined ? tooltipOptions.tooltipText : 'all';
  const barWidth = 1 - (chartStyles.barWidth || barwidth);
  const groupWidth = 1 - (chartStyles.groupWidth || groupwidth);
  const showLegend = legend.showLegend ?? showlegend;
  const legendPosition = legend.position || legendposition;
  const labelSize = chartStyles.labelSize || DEFAULT_BAR_CHART_STYLES.LabelSize;
  const legendSize = legend.legendSize;
  const getSelectedColorTheme = (field: any, index: number) =>
    (colorTheme.length > 0 &&
      colorTheme.find((colorSelected) => colorSelected.name.label === field)?.color) ||
    PLOTLY_COLOR[index % PLOTLY_COLOR.length];
  // If chart has length of result buckets < 16
  // then use the LONG_CHART_COLOR for all the bars in the chart
  const plotlyColorway =
    queriedVizData[fields[lastIndex].name].length < 16 ? PLOTLY_COLOR : [LONG_CHART_COLOR];

  if (
    isEmpty(queriedVizData) ||
    !Array.isArray(dimensions) ||
    !Array.isArray(series) ||
    (breakdowns && !Array.isArray(breakdowns))
  )
    return <EmptyPlaceholder icon={icontype} />;

  const addStylesToTraces = (traces, traceStyles) => {
    const { barOrientation, fillOpacity, tooltipMode, tooltipText, lineWidth } = traceStyles;
    return traces.map((trace, idx: number) => {
      const selectedColor = getSelectedColorTheme(trace.aggName, idx);
      return {
        ...trace,
        type,
        orientation: barOrientation,
        hoverinfo: tooltipMode === 'hidden' ? 'none' : tooltipText,
        ...{
          marker: {
            color: hexToRgb(selectedColor, fillOpacity),
            line: {
              color: selectedColor,
              width: lineWidth,
            },
          },
        },
      };
    });
  };

  let bars = useMemo(() => {
    const visConfig = {
      dimensions,
      series,
      breakdowns,
      span,
      isVertical,
    };
    const traceStyles = {
      barOrientation,
      fillOpacity,
      tooltipMode,
      tooltipText,
      lineWidth,
    };

    return addStylesToTraces(
      transformPreprocessedDataToTraces(preprocessJsonData(jsonData, visConfig), visConfig),
      { ...traceStyles }
    );
  }, [chartStyles, jsonData, dimensions, series, breakdowns, span, tooltipOptions]);

  const mergedLayout = useMemo(() => {
    return {
      colorway: plotlyColorway,
      ...layout,
      title: panelOptions.title || layoutConfig.layout?.title || '',
      barmode: chartStyles.mode || visualizations.vis.mode,
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
      bargap: groupWidth,
      bargroupgap: barWidth,
      legend: {
        ...layout.legend,
        orientation: legendPosition,
        ...(legendSize && {
          font: {
            size: legendSize,
          },
        }),
      },
      showlegend,
      hovermode: 'closest',
      margin: PLOT_MARGIN,
    };
  }, [visualizations, layout, panelOptions, showLegend, chartStyles]);

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
          queriedVizData[
            !isEmpty(xaxis) ? xaxis[xaxis.length - 1]?.label : fields[lastIndex].name
          ][0]
        );
        thresholdTraces.y.push(thr.value * (1 + 0.06));
        thresholdTraces.text.push(thr.name);
        return {
          type: 'line',
          x0: queriedVizData[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name][0],
          y0: thr.value,
          x1: last(queriedVizData[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name]),
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
    bars = [...bars, thresholdTraces];
  }

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={bars} layout={mergedLayout} config={mergedConfigs} />;
};

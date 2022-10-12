/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { find, isEmpty, last, some } from 'lodash';
import React, { useMemo } from 'react';
import {
  AGGREGATIONS,
  BREAKDOWNS,
  DEFAULT_BAR_CHART_STYLES,
  GROUPBY,
} from '../../../../../common/constants/explorer';
import {
  BarOrientation,
  LONG_CHART_COLOR,
  PLOTLY_COLOR,
  THRESHOLD_LINE_OPACITY,
  THRESHOLD_LINE_WIDTH,
} from '../../../../../common/constants/shared';
import { IVisualizationContainerProps } from '../../../../../common/types/explorer';
import { AvailabilityUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { ThresholdUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { getPropName } from '../../../event_analytics/utils/utils';
import { Plt } from '../../plotly/plot';

export const Bar = ({ visualizations, layout, config }: any) => {
  const {
    data: {
      defaultAxes,
      indexFields,
      query,
      rawVizData: {
        data: queriedVizData,
        metadata: { fields },
      },
      userConfigs: {
        dataConfig: {
          colorTheme = [],
          chartStyles = {},
          span = {},
          legend = {},
          panelOptions = {},
          thresholds = [],
          [GROUPBY]: dimensions = [],
          [AGGREGATIONS]: series = [],
          [BREAKDOWNS]: breakdowns = [],
        } = {},
        layoutConfig = {},
        availabilityConfig = {},
      },
    },
    vis: {
      type,
      icontype,
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

  if (
    isEmpty(queriedVizData) ||
    !Array.isArray(dimensions) ||
    !Array.isArray(series) ||
    (breakdowns && !Array.isArray(breakdowns))
  )
    return <EmptyPlaceholder icon={icontype} />;

  /**
   * determine stylings
   */
  const barOrientation = chartStyles.orientation || orientation;
  const isVertical = barOrientation === BarOrientation.vertical;
  const tickAngle = chartStyles.rotateBarLabels || labelangle;
  const lineWidth = chartStyles.lineWidth || linewidth;
  const barWidth = 1 - (chartStyles.barWidth || barwidth);
  const groupWidth = 1 - (chartStyles.groupWidth || groupwidth);
  const showLegend = !(legend.showLegend && legend.showLegend !== showlegend);
  const legendPosition = legend.position || legendposition;

  visualizations.data?.rawVizData?.dataConfig?.metrics
    ? visualizations.data.rawVizData.dataConfig.metrics
    : [];
  const labelSize = chartStyles.labelSize || DEFAULT_BAR_CHART_STYLES.LabelSize;
  const legendSize = legend.legendSize;
  const getSelectedColorTheme = (field: any, index: number) =>
    (colorTheme.length > 0 &&
      colorTheme.find((colorSelected) => colorSelected.name.name === field.label)?.color) ||
    PLOTLY_COLOR[index % PLOTLY_COLOR.length];

  let bars;

  /**
   * determine x axis
   */
  const xaxes = useMemo(() => {
    // breakdown selections
    if (breakdowns) {
      return [
        ...dimensions.filter(
          (dimension) => !some(breakdowns, (breakdown) => breakdown.label === dimension.label)
        ),
      ];
    }

    // span selection
    const timestampField = find(fields, (field) => field.type === 'timestamp');
    if (span && span.time_field && timestampField) {
      return [timestampField, ...dimensions];
    }

    return [...dimensions];
  }, [dimensions, breakdowns]);

  /**
   * determine y axis
   */
  const yaxes = useMemo(() => {
    return Array.isArray(series) ? [...series] : [];
  }, [series]);

  /**
   * prepare data for visualization, map x-xais to y-xais
   */
  const chartAxis = useMemo(() => {
    return Array.isArray(queriedVizData[getPropName(yaxes[0])])
      ? queriedVizData[getPropName(yaxes[0])].map((_, idx) => {
          // let combineXaxis = '';
          const xaxisName = xaxes.map((xaxis) => {
            return queriedVizData[xaxis.name] && queriedVizData[xaxis.name][idx]
              ? queriedVizData[xaxis.name][idx]
              : '';
          });
          return xaxisName.join(', ');
        })
      : [];
  }, [queriedVizData, xaxes, yaxes]);

  bars = yaxes?.map((yMetric, idx) => {
    return {
      y: isVertical ? queriedVizData[getPropName(yMetric)] : chartAxis,
      x: isVertical ? chartAxis : queriedVizData[getPropName(yMetric)],
      type: type,
      marker: {
        color: getSelectedColorTheme(yMetric, idx),
        line: {
          color: getSelectedColorTheme(yMetric, idx),
          width: lineWidth,
        },
      },
      name: getPropName(yMetric),
      orientation: barOrientation,
    };
  });

  // If chart has length of result buckets < 16
  // then use the LONG_CHART_COLOR for all the bars in the chart
  const plotlyColorway =
    queriedVizData[fields[lastIndex].name].length < 16 ? PLOTLY_COLOR : [LONG_CHART_COLOR];

  const mergedLayout = {
    colorway: plotlyColorway,
    ...layout,
    ...(layoutConfig.layout && layoutConfig.layout),
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
    showlegend: showLegend,
    hovermode: 'closest',
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

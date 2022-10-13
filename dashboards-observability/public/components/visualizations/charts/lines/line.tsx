/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { find, isEmpty, last, take } from 'lodash';
import React, { useMemo } from 'react';
import { AGGREGATIONS, GROUPBY } from '../../../../../common/constants/explorer';
import {
  DEFAULT_CHART_STYLES,
  FILLOPACITY_DIV_FACTOR,
  PLOTLY_COLOR,
  VIS_CHART_TYPES,
} from '../../../../../common/constants/shared';
import { IVisualizationContainerProps } from '../../../../../common/types/explorer';
import { getPropName, hexToRgb } from '../../../../components/event_analytics/utils/utils';
import { AvailabilityUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { ThresholdUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { Plt } from '../../plotly/plot';

export const Line = ({ visualizations, layout, config }: any) => {
  const {
    DefaultModeLine,
    Interpolation,
    LineWidth,
    FillOpacity,
    MarkerSize,
    LegendPosition,
    ShowLegend,
    DefaultModeScatter,
    LabelAngle,
  } = DEFAULT_CHART_STYLES;

  const {
    data: {
      rawVizData: {
        data: queriedVizData,
        metadata: { fields },
      },
      userConfigs: {
        dataConfig: {
          chartStyles = {},
          legend = {},
          span = {},
          colorTheme = [],
          thresholds = [],
          tooltipOptions = {},
          panelOptions = {},
          [GROUPBY]: dimensions = [],
          [AGGREGATIONS]: series = [],
        } = {},
        layoutConfig = {},
        availabilityConfig = {},
      } = {},
    },
    vis: { icontype, name },
  }: IVisualizationContainerProps = visualizations;

  const tooltipMode =
    tooltipOptions.tooltipMode !== undefined ? tooltipOptions.tooltipMode : 'show';
  const tooltipText = tooltipOptions.tooltipText !== undefined ? tooltipOptions.tooltipText : 'all';

  const lastIndex = fields.length - 1;
  const visType: string = name;
  const mode =
    chartStyles.style || (visType === VIS_CHART_TYPES.Line ? DefaultModeLine : DefaultModeScatter);
  const lineShape = chartStyles.interpolation || Interpolation;
  const lineWidth = chartStyles.lineWidth || LineWidth;
  const showLegend = !(legend.showLegend && legend.showLegend !== ShowLegend);
  const legendPosition = legend.position || LegendPosition;
  const markerSize = chartStyles.pointSize || MarkerSize;
  const fillOpacity =
    chartStyles.fillOpacity !== undefined
      ? chartStyles.fillOpacity / FILLOPACITY_DIV_FACTOR
      : FillOpacity / FILLOPACITY_DIV_FACTOR;
  const tickAngle = chartStyles.rotateLabels || LabelAngle;
  const labelSize = chartStyles.labelSize;
  const legendSize = legend.legendSize;

  const getSelectedColorTheme = (field: any, index: number) =>
    (colorTheme.length > 0 &&
      colorTheme.find((colorSelected) => colorSelected.name.name === field)?.color) ||
    PLOTLY_COLOR[index % PLOTLY_COLOR.length];
  const timestampField = find(fields, (field) => field.type === 'timestamp');

  let xaxis;
  if (span && span.time_field && timestampField) {
    xaxis = dimensions ? [timestampField, ...dimensions] : [timestampField, []];
  } else {
    xaxis = dimensions;
  }

  if (!timestampField || xaxis.length !== 1 || isEmpty(series))
    return <EmptyPlaceholder icon={icontype} />;

  let multiMetrics = {};
  const [calculatedLayout, lineValues] = useMemo(() => {
    const isBarMode = mode === 'bar';
    let calculatedLineValues = series.map((field: any, index: number) => {
      const selectedColor = getSelectedColorTheme(field.name, index);
      const fillColor = hexToRgb(selectedColor, fillOpacity);
      const barMarker = {
        color: fillColor,
        line: {
          color: selectedColor,
          width: lineWidth,
        },
      };
      const fillProperty = {
        fill: 'tozeroy',
        fillcolor: fillColor,
      };
      const multiYaxis = { yaxis: `y${index + 1}` };
      multiMetrics = {
        ...multiMetrics,
        [`yaxis${index > 0 ? index + 1 : ''}`]: {
          titlefont: {
            color: selectedColor,
          },
          tickfont: {
            color: selectedColor,
            ...(labelSize && {
              size: labelSize,
            }),
          },
          ...(index > 0 && { overlaying: 'y' }),
          side: field.side,
        },
      };

      return {
        x: queriedVizData[!isEmpty(xaxis) ? xaxis[0]?.name : fields[lastIndex].name],
        y: queriedVizData[getPropName(field)],
        type: isBarMode ? 'bar' : 'scatter',
        name: getPropName(field),
        mode,
        ...(!['bar', 'markers'].includes(mode) && fillProperty),
        line: {
          shape: lineShape,
          width: lineWidth,
          color: selectedColor,
        },
        hoverinfo: tooltipMode === 'hidden' ? 'none' : tooltipText,
        marker: {
          size: markerSize,
          ...(isBarMode && barMarker),
        },
        ...(index >= 1 && multiYaxis),
      };
    });

    const layoutForBarMode = {
      barmode: 'group',
    };
    const axisLabelsStyle = {
      automargin: true,
      tickfont: {
        ...(labelSize && {
          size: labelSize,
        }),
      },
    };
    const mergedLayout = {
      ...layout,
      ...layoutConfig.layout,
      title: panelOptions.title || layoutConfig.layout?.title || '',
      legend: {
        ...layout.legend,
        orientation: legendPosition,
        ...(legendSize && {
          font: {
            size: legendSize,
          },
        }),
      },
      autosize: true,
      xaxis: {
        tickangle: tickAngle,
        ...axisLabelsStyle,
      },
      yaxis: {
        ...axisLabelsStyle,
      },
      showlegend: showLegend,
      ...(isBarMode && layoutForBarMode),
      ...(multiMetrics && multiMetrics),
    };

    if (thresholds || availabilityConfig.level) {
      const thresholdTraces = {
        x: [],
        y: [],
        mode: 'text',
        text: [],
        showlegend: false,
      };
      const threshold = thresholds ? thresholds : [];
      const levels = availabilityConfig.level ? availabilityConfig.level : [];

      const mapToLine = (list: ThresholdUnitType[] | AvailabilityUnitType[], lineStyle: any) => {
        return list.map((thr: ThresholdUnitType) => {
          thresholdTraces.x.push(
            queriedVizData[
              !isEmpty(xaxis) ? xaxis[xaxis.length - 1]?.name : fields[lastIndex].name
            ][0]
          );
          thresholdTraces.y.push(thr.value * (1 + 0.06));
          thresholdTraces.text.push(thr.name);
          return {
            type: 'line',
            x0: queriedVizData[!isEmpty(xaxis) ? xaxis[0]?.name : fields[lastIndex].name][0],
            y0: thr.value,
            x1: last(queriedVizData[!isEmpty(xaxis) ? xaxis[0]?.name : fields[lastIndex].name]),
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

      mergedLayout.shapes = [
        ...mapToLine(
          thresholds.filter((i: ThresholdUnitType) => i.value !== ''),
          { dash: 'dashdot' }
        ),
        ...mapToLine(levels, {}),
      ];
      calculatedLineValues = [...calculatedLineValues, thresholdTraces];
    }
    return [mergedLayout, calculatedLineValues];
  }, [queriedVizData, fields, lastIndex, layout, layoutConfig, xaxis, mode, series, labelSize]);

  const mergedConfigs = useMemo(
    () => ({
      ...config,
      ...(layoutConfig.config && layoutConfig.config),
    }),
    [config, layoutConfig.config]
  );

  return <Plt data={lineValues} layout={calculatedLayout} config={mergedConfigs} />;
};

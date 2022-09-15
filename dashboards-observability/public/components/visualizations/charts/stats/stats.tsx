/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import Plotly from 'plotly.js-dist';
import { uniqBy, find, isEmpty } from 'lodash';
import { Plt } from '../../plotly/plot';
import { ThresholdUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { ConfigListEntry } from '../../../../../common/types/explorer';
import { hexToRgb, getRoundOf, getTooltipHoverInfo } from '../../../event_analytics/utils/utils';
import { uiSettingsService } from '../../../../../common/utils';
import {
  STATS_GRID_SPACE_BETWEEN_X_AXIS,
  STATS_GRID_SPACE_BETWEEN_Y_AXIS,
  DefaultStatsParameters,
  STATS_AXIS_MARGIN,
  STATS_ANNOTATION,
  STATS_REDUCE_VALUE_SIZE_PERCENTAGE,
  STATS_REDUCE_TITLE_SIZE_PERCENTAGE,
  STATS_REDUCE_METRIC_UNIT_SIZE_PERCENTAGE,
  STATS_METRIC_UNIT_SUBSTRING_LENGTH,
} from '../../../../../common/constants/explorer';
import { DefaultChartStyles, FILLOPACITY_DIV_FACTOR } from '../../../../../common/constants/shared';
import { COLOR_BLACK, COLOR_WHITE } from '../../../../../common/constants/colors';
import { IVisualizationContainerProps } from '../../../../../common/types/explorer';

const {
  DefaultOrientation,
  DefaultTextMode,
  DefaultChartType,
  BaseThreshold,
} = DefaultStatsParameters;

interface CreateAnnotationType {
  index: number;
  label: string;
  value: number | string;
  valueColor: string;
}

export const Stats = ({ visualizations, layout, config }: any) => {
  const {
    data: {
      rawVizData: {
        data: queriedVizData,
        metadata: { fields },
      },
      userConfigs,
    },
    vis: visMetaData,
  }: IVisualizationContainerProps = visualizations;

  // data config parametrs
  const {
    dataConfig: {
      span = {},
      dimensions = [],
      metrics = [],
      chartStyles = {},
      panelOptions = {},
      tooltipOptions = {},
      thresholds = [],
    },
    layoutConfig = {},
  } = userConfigs;

  /**
   * determine x axis
   */
  const selectedDimensions = useMemo(() => {
    // span selection
    const timestampField = find(fields, (field) => field.type === 'timestamp');
    if (span && span.time_field && timestampField) {
      return [timestampField, ...dimensions];
    }
    return [...dimensions];
  }, [dimensions, fields, span]);

  const metricsLength = metrics.length;
  const chartType = chartStyles.chartType || visMetaData.charttype;

  if (
    isEmpty(queriedVizData) ||
    (chartType === DefaultChartType && selectedDimensions.length === 0) ||
    metricsLength === 0 ||
    chartType !== DefaultChartType
  )
    return <EmptyPlaceholder icon={visualizations?.vis?.icontype} />;
  // thresholds
  const appliedThresholds = thresholds.length ? thresholds : [BaseThreshold];
  const sortedThresholds = uniqBy(
    [...appliedThresholds].sort((a: ThresholdUnitType, b: ThresholdUnitType) => a.value - b.value),
    'value'
  );
  // style panel parameters
  const titleSize =
    chartStyles.titleSize ||
    visMetaData.titlesize -
      visMetaData.titlesize * metricsLength * STATS_REDUCE_TITLE_SIZE_PERCENTAGE;
  const valueSize =
    chartStyles.valueSize ||
    visMetaData.valuesize -
      visMetaData.valuesize * metricsLength * STATS_REDUCE_VALUE_SIZE_PERCENTAGE;
  const selectedOrientation = chartStyles.orientation || visMetaData.orientation;
  const orientation =
    selectedOrientation === DefaultOrientation || selectedOrientation === 'v'
      ? DefaultOrientation
      : 'h';
  const selectedTextMode = chartStyles.textMode || visMetaData.textmode;
  const textMode =
    selectedTextMode === DefaultTextMode || selectedTextMode === 'values+names'
      ? DefaultTextMode
      : selectedTextMode;
  const precisionValue = chartStyles.precisionValue || visMetaData.precisionvalue;
  const metricUnits =
    chartStyles.metricUnits?.substring(0, STATS_METRIC_UNIT_SUBSTRING_LENGTH) || '';
  const metricUnitsSize = valueSize - valueSize * STATS_REDUCE_METRIC_UNIT_SIZE_PERCENTAGE;
  const isDarkMode = uiSettingsService.get('theme:darkMode');

  // margin from left of grid cell for label/value
  const ANNOTATION_MARGIN_LEFT = metricsLength > 1 ? 0.01 : 0;
  let autoChartLayout: object = {
    annotations: [],
  };
  const selectedDimensionsData = selectedDimensions.reduce((prev, cur) => {
    if (queriedVizData[cur.name]) {
      if (prev.length === 0) return queriedVizData[cur.name].flat();
      return prev.map(
        (item: string | number, index: number) => `${item},<br>${queriedVizData[cur.name][index]}`
      );
    }
  }, []);

  const createValueText = (value: string | number) =>
    `<b>${value}${
      metricUnits ? `<span style="font-size: ${metricUnitsSize}px"}> ${metricUnits}</span>` : ''
    }</b>`;

  const calculateTextCooridinate = (metricLength: number, index: number) => {
    // calculating center of each subplot based on orienation vertical(single column) or horizontal(single row)
    // splitting whole plot area with metric length and find center of each individual subplot w.r.t index of metric
    if (metricLength === 1) {
      return 0.5;
    } else if (index === 0) {
      return 1 / metricLength / 2;
    }
    return (index + 1) / metricLength - 1 / metricLength / 2;
  };

  const createAnnotationsAutoModeHorizontal = ({
    label,
    value,
    index,
    valueColor,
  }: CreateAnnotationType) => {
    const yCordinate = index > 0 ? (index + 1) / metricsLength : 1 / metricsLength;
    return textMode === DefaultTextMode
      ? [
          {
            ...STATS_ANNOTATION,
            x: ANNOTATION_MARGIN_LEFT,
            y: yCordinate,
            xanchor: 'left',
            yanchor: 'top',
            text: label,
            font: {
              size: titleSize,
              color: isDarkMode ? COLOR_WHITE : COLOR_BLACK,
              family: 'Roboto',
            },
            type: 'name',
            metricValue: value,
          },
          {
            ...STATS_ANNOTATION,
            x: 1,
            y: yCordinate,
            xanchor: 'right',
            yanchor: 'top',
            text: createValueText(value),
            font: {
              size: valueSize,
              color: valueColor,
              family: 'Roboto',
            },
            type: 'value',
            metricValue: value,
          },
        ]
      : [
          {
            ...STATS_ANNOTATION,
            x: 0.5,
            y: calculateTextCooridinate(metricsLength, index),
            xanchor: 'center',
            yanchor: 'bottom',
            text: textMode === 'values' ? createValueText(value) : label,
            font: {
              size: textMode === 'values' ? valueSize : titleSize,
              color: textMode === 'names' ? (isDarkMode ? COLOR_WHITE : COLOR_BLACK) : valueColor,
              family: 'Roboto',
            },
            type: textMode === 'names' ? 'name' : 'value',
            metricValue: value,
          },
        ];
  };

  const createAnnotationAutoModeVertical = ({
    label,
    value,
    index,
    valueColor,
  }: CreateAnnotationType) => {
    const xCoordinate = index / metricsLength + ANNOTATION_MARGIN_LEFT;
    return textMode === DefaultTextMode
      ? [
          {
            ...STATS_ANNOTATION,
            xanchor: 'left',
            yanchor: 'bottom',
            text: label,
            font: {
              size: titleSize,
              color: isDarkMode ? COLOR_WHITE : COLOR_BLACK,
              family: 'Roboto',
            },
            x: xCoordinate,
            y: 1,
            metricValue: value,
            type: 'name',
          },
          {
            ...STATS_ANNOTATION,
            xanchor: 'left',
            yanchor: 'top',
            text: createValueText(value),
            font: {
              size: valueSize,
              color: valueColor,
              family: 'Roboto',
            },
            x: xCoordinate,
            y: 1,
            type: 'value',
            metricValue: value,
          },
        ]
      : [
          {
            ...STATS_ANNOTATION,
            x: calculateTextCooridinate(metricsLength, index),
            xanchor: 'center',
            y: 0.95,
            yanchor: 'bottom',
            text: textMode === 'values' ? createValueText(value) : label,
            font: {
              size: textMode === 'values' ? valueSize : titleSize,
              color: textMode === 'names' ? (isDarkMode ? COLOR_WHITE : COLOR_BLACK) : valueColor,
              family: 'Roboto',
            },
            type: textMode === 'names' ? 'name' : 'value',
            metricValue: value,
          },
        ];
  };

  // extend y axis range to increase height of subplot w.r.t metric data
  const extendYaxisRange = (metricLabel: string) => {
    const sortedData = queriedVizData[metricLabel]
      .slice()
      .sort((curr: number, next: number) => next - curr);
    return isNaN(sortedData[0]) ? 100 : sortedData[0] + sortedData[0] / 2;
  };

  const getMetricValue = (label: string) =>
    typeof queriedVizData[label][queriedVizData[label].length - 1] === 'number'
      ? getRoundOf(
          queriedVizData[label][queriedVizData[label].length - 1],
          Math.abs(precisionValue)
        )
      : 0;

  const generateLineTraces = () => {
    return metrics.map((metric: ConfigListEntry, metricIndex: number) => {
      const metricLabel = `${
        metric.alias ? metric.alias : `${metric.aggregation}(${metric.name})`
      }`;
      const isLabelExisted = queriedVizData[metricLabel] ? true : false;
      const annotationOption = {
        label: metricLabel,
        value: isLabelExisted ? getMetricValue(metricLabel) : 0,
        index: metricIndex,
        valueColor: '',
      };
      const layoutAxisIndex = metricIndex > 0 ? metricIndex + 1 : '';
      autoChartLayout = {
        ...autoChartLayout,
        annotations: autoChartLayout.annotations.concat(
          orientation === DefaultOrientation || metricsLength === 1
            ? createAnnotationAutoModeVertical(annotationOption)
            : createAnnotationsAutoModeHorizontal(annotationOption)
        ),
        [`xaxis${layoutAxisIndex}`]: {
          visible: false,
          showgrid: false,
          anchor: `y${layoutAxisIndex}`,
          layoutFor: metricLabel,
        },
        [`yaxis${layoutAxisIndex}`]: {
          visible: false,
          showgrid: false,
          anchor: `x${layoutAxisIndex}`,
          range: isLabelExisted ? [0, extendYaxisRange(metricLabel)] : [0, 100],
          layoutFor: metricLabel,
        },
      };

      return {
        x: selectedDimensionsData,
        y: queriedVizData[metricLabel],
        metricValue: isLabelExisted ? getMetricValue(metricLabel) : 0,
        fill: 'tozeroy',
        mode: 'lines',
        type: 'scatter',
        fillcolor: '',
        line: {
          color: '',
        },
        name: metricLabel,
        ...(metricIndex > 0 && {
          xaxis: `x${metricIndex + 1}`,
          yaxis: `y${metricIndex + 1}`,
        }),
        hoverinfo: getTooltipHoverInfo({
          tooltipMode: tooltipOptions.tooltipMode,
          tooltipText: tooltipOptions.tooltipText,
        }),
      };
    });
  };

  const [statsData, statsLayout]: Plotly.Data[] = useMemo(() => {
    let calculatedStatsData: Plotly.Data[] = [];
    calculatedStatsData = generateLineTraces();

    if (sortedThresholds.length) {
      const sortedStatsData = calculatedStatsData
        .map((stat, statIndex) => ({ ...stat, oldIndex: statIndex }))
        .sort((statCurrent, statNext) => statCurrent.metricValue - statNext.metricValue);
      // threshold ranges with min, max values
      let thresholdRanges: number[][] = [];
      thresholdRanges = sortedThresholds.map((thresh, index) => [
        thresh.value,
        index === sortedThresholds.length - 1
          ? sortedStatsData[sortedStatsData.length - 1].metricValue
          : sortedThresholds[index + 1].value,
      ]);

      if (thresholdRanges.length) {
        // change color for line traces
        for (let statIndex = 0; statIndex < sortedStatsData.length; statIndex++) {
          for (let threshIndex = 0; threshIndex < thresholdRanges.length; threshIndex++) {
            if (
              Number(sortedStatsData[statIndex].metricValue) >=
                Number(thresholdRanges[threshIndex][0]) &&
              Number(sortedStatsData[statIndex].metricValue) <=
                Number(thresholdRanges[threshIndex][1])
            ) {
              calculatedStatsData[sortedStatsData[statIndex].oldIndex].fillcolor = hexToRgb(
                sortedThresholds[threshIndex].color,
                DefaultChartStyles.FillOpacity / FILLOPACITY_DIV_FACTOR
              );
              calculatedStatsData[sortedStatsData[statIndex].oldIndex].line.color =
                sortedThresholds[threshIndex].color;
            }
          }
        }

        // change color of text annotations
        for (
          let annotationIndex = 0;
          annotationIndex < autoChartLayout.annotations.length;
          annotationIndex++
        ) {
          const isMetricValueText = autoChartLayout.annotations[annotationIndex].type === 'value';
          const metricValue = Number(autoChartLayout.annotations[annotationIndex].metricValue);
          for (let threshIndex = 0; threshIndex < thresholdRanges.length; threshIndex++) {
            if (
              isMetricValueText &&
              metricValue >= Number(thresholdRanges[threshIndex][0]) &&
              metricValue <= Number(thresholdRanges[threshIndex][1])
            ) {
              autoChartLayout.annotations[annotationIndex].font.color =
                sortedThresholds[threshIndex].color;
            }
          }
        }
      }
    }
    return [calculatedStatsData, autoChartLayout];
  }, [
    dimensions,
    metrics,
    fields,
    appliedThresholds,
    orientation,
    titleSize,
    valueSize,
    textMode,
    metricUnits,
    queriedVizData,
    precisionValue,
  ]);

  const mergedLayout = useMemo(() => {
    return {
      ...layout,
      ...(layoutConfig.layout && layoutConfig.layout),
      showlegend: false,
      margin: STATS_AXIS_MARGIN,
      ...statsLayout,
      grid: {
        ...(orientation === DefaultOrientation
          ? {
              rows: 1,
              columns: metricsLength,
              xgap: STATS_GRID_SPACE_BETWEEN_X_AXIS,
            }
          : {
              rows: metricsLength,
              columns: 1,
              ygap: STATS_GRID_SPACE_BETWEEN_Y_AXIS,
            }),
        pattern: 'independent',
        roworder: 'bottom to top',
      },
      title: panelOptions?.title || layoutConfig.layout?.title || '',
    };
  }, [layout, layoutConfig.layout, panelOptions?.title, orientation, metricsLength, statsLayout]);

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={statsData} layout={mergedLayout} config={mergedConfigs} />;
};

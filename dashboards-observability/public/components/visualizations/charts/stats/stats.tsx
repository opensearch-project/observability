/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import Plotly from 'plotly.js-dist';
import { uniqBy } from 'lodash';
import { Plt } from '../../plotly/plot';
import { ThresholdUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { ConfigListEntry } from '../../../../../common/types/explorer';
import {
  hexToRgb,
  filterDataConfigParameter,
  getRoundOf,
  getTooltipHoverInfo,
} from '../../../event_analytics/utils/utils';
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
  const { vis } = visualizations;
  const {
    data,
    metadata: { fields },
  } = visualizations?.data?.rawVizData;

  // data config parametrs
  const {
    dataConfig: {
      chartStyles = {},
      valueOptions = {},
      panelOptions = {},
      tooltipOptions = {},
      thresholds = [],
    },
    layoutConfig = {},
  } = visualizations?.data?.userConfigs;
  const dimensions = valueOptions?.dimensions
    ? filterDataConfigParameter(valueOptions.dimensions)
    : [];
  const metrics = valueOptions?.metrics ? filterDataConfigParameter(valueOptions.metrics) : [];
  const metricsLength = metrics.length;
  const chartType = chartStyles.chartType || vis.charttype;

  if (
    (chartType === DefaultChartType && dimensions.length === 0) ||
    metricsLength === 0 ||
    chartType !== DefaultChartType
  )
    return <EmptyPlaceholder icon={visualizations?.vis?.icontype} />;
  // thresholds
  const appliedThresholds = thresholds.length ? thresholds : [BaseThreshold];
  const sortedThresholds = uniqBy(
    appliedThresholds
      .slice()
      .sort((a: ThresholdUnitType, b: ThresholdUnitType) => a.value - b.value),
    'value'
  );
  // style panel parameters
  const titleSize =
    chartStyles.titleSize ||
    vis.titlesize - vis.titlesize * metricsLength * STATS_REDUCE_TITLE_SIZE_PERCENTAGE;
  const valueSize =
    chartStyles.valueSize ||
    vis.valuesize - vis.valuesize * metricsLength * STATS_REDUCE_VALUE_SIZE_PERCENTAGE;
  const selectedOrientation = chartStyles.orientation || vis.orientation;
  const orientation =
    selectedOrientation === DefaultOrientation || selectedOrientation === 'v'
      ? DefaultOrientation
      : 'h';
  const selectedTextMode = chartStyles.textMode || vis.textmode;
  const textMode =
    selectedTextMode === DefaultTextMode || selectedTextMode === 'values+names'
      ? DefaultTextMode
      : selectedTextMode;
  const precisionValue = chartStyles.precisionValue || vis.precisionvalue;
  const metricUnits =
    chartStyles.metricUnits?.substring(0, STATS_METRIC_UNIT_SUBSTRING_LENGTH) || '';
  const metricUnitsSize = valueSize - valueSize * STATS_REDUCE_METRIC_UNIT_SIZE_PERCENTAGE;
  const isDarkMode = uiSettingsService.get('theme:darkMode');

  // margin from left of grid cell for label/value
  const ANNOTATION_MARGIN_LEFT = metricsLength > 1 ? 0.01 : 0;
  let autoChartLayout: object = {
    annotations: [],
  };

  const selectedDimensionsData = dimensions.reduce((prev, cur) => {
    if (prev.length === 0) return data[cur.name].flat();
    return prev.map(
      (item: string | number, index: number) => `${item},<br>${data[cur.name][index]}`
    );
  }, []);

  const createValueText = (value: string | number) =>
    `<b>${value}${
      metricUnits ? `<span style="font-size: ${metricUnitsSize}px"}> ${metricUnits}</span>` : ''
    }</b>`;

  const calculateTextCooridinate = (metricLength: number, index: number) => {
    if (metricLength === 1) {
      return 0.5;
    } else {
      if (index === 0) {
        return ((1 / metricLength) * 1) / 2;
      } else {
        return (index + 1) / metricLength - ((1 / metricLength) * 1) / 2;
      }
    }
  };

  const createAnnotationsAutoModeHorizontal = ({
    label,
    value,
    index,
    valueColor,
  }: CreateAnnotationType) => {
    return textMode === 'values+names' || textMode === DefaultTextMode
      ? [
          {
            ...STATS_ANNOTATION,
            x: 0 + ANNOTATION_MARGIN_LEFT,
            y: index > 0 ? (index + 1) / metricsLength : 1 / metricsLength,
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
            y: index > 0 ? (index + 1) / metricsLength : 1 / metricsLength,
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
    return textMode === 'values+names' || textMode === DefaultTextMode
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
            x: index / metricsLength + ANNOTATION_MARGIN_LEFT,
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
            x: index / metricsLength + ANNOTATION_MARGIN_LEFT,
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
  const extendYaxisRange = (metric: ConfigListEntry) => {
    const sortedData = data[metric.label].slice().sort((curr: number, next: number) => next - curr);
    return isNaN(sortedData[0]) ? 100 : sortedData[0] + sortedData[0] / 2;
  };

  const getMetricValue = (label: string) =>
    typeof data[label][data[label].length - 1] === 'number'
      ? getRoundOf(data[label][data[label].length - 1], Math.abs(precisionValue))
      : 0;

  const generateLineTraces = () => {
    return metrics.map((metric: ConfigListEntry, metricIndex: number) => {
      const annotationOption = {
        label: metric.label,
        value: getMetricValue(metric.label),
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
          layoutFor: metric.label,
        },
        [`yaxis${layoutAxisIndex}`]: {
          visible: false,
          showgrid: false,
          anchor: `x${layoutAxisIndex}`,
          range: [0, extendYaxisRange(metric)],
          layoutFor: metric.label,
        },
      };

      return {
        x: selectedDimensionsData,
        y: data[metric.label],
        metricValue: getMetricValue(metric.label),
        fill: 'tozeroy',
        mode: 'lines',
        type: 'scatter',
        fillcolor: '',
        line: {
          color: '',
        },
        name: metric.label,
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
      const thresholdRanges: number[][] = [];
      sortedThresholds.forEach((thresh, index) => {
        thresholdRanges.push([
          thresh.value,
          index === sortedThresholds.length - 1
            ? sortedStatsData[sortedStatsData.length - 1].metricValue
            : sortedThresholds[index + 1].value,
        ]);
      });

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
          for (let threshIndex = 0; threshIndex < thresholdRanges.length; threshIndex++) {
            if (
              autoChartLayout.annotations[annotationIndex].type === 'value' &&
              Number(autoChartLayout.annotations[annotationIndex].metricValue) >=
                Number(thresholdRanges[threshIndex][0]) &&
              Number(autoChartLayout.annotations[annotationIndex].metricValue) <=
                Number(thresholdRanges[threshIndex][1])
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
    data,
    fields,
    appliedThresholds,
    orientation,
    titleSize,
    valueSize,
    textMode,
    metricUnits,
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

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import Plotly from 'plotly.js-dist';
import { Plt } from '../../plotly/plot';
import { ThresholdUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { uniqBy } from 'lodash';
import { ConfigListEntry } from '../../../../../common/types/explorer';
import {
  hexToRgb,
  filterDataConfigParameter,
  getRoundOf,
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
import {
  DefaultChartStyles,
  PLOTLY_COLOR,
  FILLOPACITY_DIV_FACTOR,
} from '../../../../../common/constants/shared';
import { COLOR_BLACK, COLOR_WHITE } from '../../../../../common/constants/colors';
import { current } from 'immer';
const {
  DefaultOrientation,
  DefaultTextMode,
  DefaultChartType,
  BaseThreshold,
} = DefaultStatsParameters;

interface createAnnotationType {
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
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;
  const dimensions = dataConfig?.valueOptions?.dimensions
    ? filterDataConfigParameter(dataConfig.valueOptions.dimensions)
    : [];
  const metrics = dataConfig?.valueOptions?.metrics
    ? filterDataConfigParameter(dataConfig.valueOptions.metrics)
    : [];
  const metricsLength = metrics.length;
  const chartType = dataConfig?.chartStyles?.chartType || vis.charttype;

  if (
    (chartType === DefaultChartType && dimensions.length === 0) ||
    metricsLength === 0 ||
    chartType !== DefaultChartType
  )
    return <EmptyPlaceholder icon={visualizations?.vis?.icontype} />;

  // style panel parameters
  const thresholds = Array.isArray(dataConfig?.thresholds)
    ? dataConfig?.thresholds
    : [BaseThreshold];
  const sortedThresholds = uniqBy(
    thresholds.slice().sort((a: ThresholdUnitType, b: ThresholdUnitType) => a.value - b.value),
    'value'
  );
  const titleSize =
    dataConfig?.chartStyles?.titleSize ||
    vis.titlesize - vis.titlesize * metricsLength * STATS_REDUCE_TITLE_SIZE_PERCENTAGE;
  const valueSize =
    dataConfig?.chartStyles?.valueSize ||
    vis.valuesize - vis.valuesize * metricsLength * STATS_REDUCE_VALUE_SIZE_PERCENTAGE;
  const selectedOrientation = dataConfig?.chartStyles?.orientation || vis.orientation;
  const orientation =
    selectedOrientation === DefaultOrientation || selectedOrientation === 'v'
      ? DefaultOrientation
      : 'h';
  const selectedTextMode = dataConfig?.chartStyles?.textMode || vis.textmode;
  const textMode =
    selectedTextMode === DefaultTextMode || selectedTextMode === 'values+names'
      ? DefaultTextMode
      : selectedTextMode;
  const precisionValue = dataConfig?.chartStyles?.precisionValue || vis.precisionvalue;
  const metricUnits =
    dataConfig?.chartStyles?.metricUnits?.substring(0, STATS_METRIC_UNIT_SUBSTRING_LENGTH) || '';
  const metricUnitsSize = valueSize - valueSize * STATS_REDUCE_METRIC_UNIT_SIZE_PERCENTAGE;
  const isDarkMode = uiSettingsService.get('theme:darkMode');

  // margin from left of grid cell for label/value
  const ANNOTATION_MARGIN_LEFT = metricsLength > 1 ? 0.01 : 0;
  let autoChartLayout: object = {
    xaxis: {
      visible: false,
      showgrid: false,
      anchor: 'y1',
    },
    yaxis: {
      visible: false,
      showgrid: false,
      anchor: 'x1',
    },
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

  const createAnnotationsHorizontalOrientation = ({
    label,
    value,
    index,
    valueColor,
  }: createAnnotationType) =>
    textMode === 'values+names' || textMode === DefaultTextMode
      ? [
          {
            ...STATS_ANNOTATION,
            x: 0 + ANNOTATION_MARGIN_LEFT,
            y:
              index > 0
                ? (index + 1) / metricsLength - ANNOTATION_MARGIN_LEFT
                : 1 / metricsLength - ANNOTATION_MARGIN_LEFT,
            xanchor: 'left',
            yanchor: 'bottom',
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
            y:
              index > 0
                ? (index + 1) / metricsLength - ANNOTATION_MARGIN_LEFT
                : 1 / metricsLength - ANNOTATION_MARGIN_LEFT,
            xanchor: 'right',
            yanchor: 'bottom',
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
            y:
              metricsLength === 1
                ? 0.5
                : index === 0
                ? ((1 / metricsLength) * 1) / 2
                : (index + 1) / metricsLength - ((1 / metricsLength) * 1) / 2,
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

  const createAnnotationVerticalOrientation = ({
    label,
    value,
    index,
    valueColor,
  }: createAnnotationType) =>
    textMode === 'values+names' || textMode === DefaultTextMode
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
            x:
              metricsLength === 1
                ? 0.5
                : index === 0
                ? ((1 / metricsLength) * 1) / 2
                : (index + 1) / metricsLength - ((1 / metricsLength) * 1) / 2,
            xanchor: 'center',
            // y: 1 - 0.05,
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

  const extendYaxisRange = (metric: ConfigListEntry) => {
    const sortedData = data[metric.label].slice().sort((curr: number, next: number) => next - curr);
    const avgSeriesDiff = sortedData.slice(0, 5).reduce(function (prev, curr, index: number) {
      if (data[metric.label][index + 1])
        return (prev += Math.abs(Number((data[metric.label][index + 1] - curr).toFixed(2))));
      return prev;
    }, 0);
    return sortedData[0] + (avgSeriesDiff ? avgSeriesDiff : 100);
  };

  const generateLineTraces = () => {
    return metrics.map((metric: ConfigListEntry, metricIndex: number) => {
      autoChartLayout = {
        ...autoChartLayout,
        annotations: autoChartLayout.annotations.concat(
          orientation === DefaultOrientation || metricsLength === 1
            ? createAnnotationVerticalOrientation({
                label: metric.label,
                value:
                  typeof data[metric.label][0] === 'number'
                    ? getRoundOf(data[metric.label][0], precisionValue)
                    : 0,
                index: metricIndex,
                valueColor: '',
              })
            : createAnnotationsHorizontalOrientation({
                label: metric.label,
                value:
                  typeof data[metric.label][0] === 'number'
                    ? getRoundOf(data[metric.label][0], precisionValue)
                    : 0,
                index: metricIndex,
                valueColor: '',
              })
        ),
        [`xaxis${metricIndex > 0 ? metricIndex + 1 : ''}`]: {
          visible: false,
          showgrid: false,
          anchor: `y${metricIndex > 0 ? metricIndex + 1 : ''}`,
        },
        [`yaxis${metricIndex > 0 ? metricIndex + 1 : ''}`]: {
          visible: false,
          showgrid: false,
          anchor: `x${metricIndex > 0 ? metricIndex + 1 : ''}`,
          range: [0, extendYaxisRange(metric)],
        },
      };

      return {
        x: selectedDimensionsData,
        y: data[metric.label],
        metricValue:
          typeof data[metric.label][0] === 'number'
            ? getRoundOf(data[metric.label][0], precisionValue)
            : 0,
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
      const thresholdRanges: Array<Array<number>> = [];
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
    thresholds,
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
              ygap: STATS_GRID_SPACE_BETWEEN_Y_AXIS,
            }
          : {
              rows: metricsLength,
              columns: 1,
              ygap: STATS_GRID_SPACE_BETWEEN_Y_AXIS,
            }),
        pattern: 'independent',
        roworder: 'bottom to top',
      },
      title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
    };
  }, [
    data,
    layout,
    layoutConfig.layout,
    dataConfig?.panelOptions?.title,
    orientation,
    metricsLength,
    statsLayout,
    thresholds,
  ]);

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={statsData} layout={mergedLayout} config={mergedConfigs} />;
};

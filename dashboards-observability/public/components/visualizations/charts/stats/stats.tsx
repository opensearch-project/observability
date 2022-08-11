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
import { hexToRgb } from '../../../../components/event_analytics/utils/utils';
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
import { STATS_TEXT_BLACK, STATS_TEXT_WHITE } from '../../../../../common/constants/colors';
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
  const dataConfigTab = visualizations.data.rawVizData?.Stats?.dataConfig;
  const dimensions = dataConfigTab?.dimensions
    ? dataConfigTab.dimensions.filter((i: ConfigListEntry) => i.label)
    : [];
  const metrics = dataConfigTab?.metrics
    ? dataConfigTab.metrics.filter((i: ConfigListEntry) => i.label)
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
    dataConfig?.chartStyles?.metricUnits.substring(0, STATS_METRIC_UNIT_SUBSTRING_LENGTH) || '';
  const metricUnitsSize = valueSize - valueSize * STATS_REDUCE_METRIC_UNIT_SIZE_PERCENTAGE;
  const isDarkMode = uiSettingsService.get('theme:darkMode');

  const getRoundOf = (value: number, places: number) => {
    return (Math.round(value * 10 ** precisionValue) / 10 ** precisionValue).toFixed(places);
  };

  const ZERO_ERROR_ANNOTATION = 0.01;
  let autoChartLayout: any = {
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

  const selectedDimensionsData = dimensions
    .map((dimension: any) => data[dimension.name])
    .reduce((prev, cur) =>
      prev.map((item: string | number, index: number) => `${item},<br>${cur[index]}`)
    );

  const createValueText = (value: string | number) =>
    `<b>${value}${
      metricUnits ? `<span style="font-size: ${metricUnitsSize}px"}> ${metricUnits}</span>` : ''
    }</b>`;

  const createAnnotationsAutoChartHorizontal = ({
    label,
    value,
    index,
    valueColor,
  }: createAnnotationType) => {
    return textMode === 'values+names' || textMode === DefaultTextMode
      ? [
          {
            ...STATS_ANNOTATION,
            x: 0 + ZERO_ERROR_ANNOTATION,
            y:
              index > 0
                ? (index + 1) / metricsLength - ZERO_ERROR_ANNOTATION
                : 1 / metricsLength - ZERO_ERROR_ANNOTATION,
            xanchor: 'left',
            yanchor: 'bottom',
            text: label,
            font: {
              size: titleSize,
              color: isDarkMode ? STATS_TEXT_WHITE : STATS_TEXT_BLACK,
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
                ? (index + 1) / metricsLength - ZERO_ERROR_ANNOTATION
                : 1 / metricsLength - ZERO_ERROR_ANNOTATION,
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
              color:
                textMode === 'names'
                  ? isDarkMode
                    ? STATS_TEXT_WHITE
                    : STATS_TEXT_BLACK
                  : valueColor,
              family: 'Roboto',
            },
            type: textMode === 'names' ? 'name' : 'value',
            metricValue: value,
          },
        ];
  };

  const createAnnotation = ({ label, value, index, valueColor }: createAnnotationType) => {
    return textMode === 'values+names' || textMode === DefaultTextMode
      ? [
          {
            ...STATS_ANNOTATION,
            xanchor: 'left',
            yanchor: 'bottom',
            text: label,
            font: {
              size: titleSize,
              color: isDarkMode ? STATS_TEXT_WHITE : STATS_TEXT_BLACK,
              family: 'Roboto',
            },
            x: index / metricsLength + ZERO_ERROR_ANNOTATION,
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
            x: index / metricsLength + ZERO_ERROR_ANNOTATION,
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
            y: 1 - 0.05,
            yanchor: 'bottom',
            text: textMode === 'values' ? createValueText(value) : label,
            font: {
              size: textMode === 'values' ? valueSize : titleSize,
              color:
                textMode === 'names'
                  ? isDarkMode
                    ? STATS_TEXT_WHITE
                    : STATS_TEXT_BLACK
                  : valueColor,
              family: 'Roboto',
            },
            type: textMode === 'names' ? 'name' : 'value',
            metricValue: value,
          },
        ];
  };

  const extendYaxisRange = (metric: ConfigListEntry) => {
    const sortedData = data[metric.label].slice().sort((a, b) => b - a);
    const avgSeriesDiff = sortedData
      .slice(0, 5)
      .reduce(function (r, e, i) {
        if (data[metric.label][i + 1]) r.push(Number((data[metric.label][i + 1] - e).toFixed(2)));
        return r;
      }, [])
      .reduce((a, b) => Math.abs(a) + Math.abs(b), 0);
    return sortedData[0] + avgSeriesDiff;
  };

  const generateLineTraces = () =>
    metrics.map((metric: ConfigListEntry, metricIndex: number) => {
      const selectedColor = PLOTLY_COLOR[metricIndex % PLOTLY_COLOR.length];
      const fillColor = hexToRgb(
        selectedColor,
        DefaultChartStyles.FillOpacity / FILLOPACITY_DIV_FACTOR
      );

      autoChartLayout = {
        ...autoChartLayout,
        annotations: autoChartLayout.annotations.concat(
          orientation === DefaultOrientation || metricsLength === 1
            ? createAnnotation({
                label: metric.label,
                value: getRoundOf(data[metric.label][0], precisionValue),
                index: metricIndex,
                valueColor: selectedColor,
              })
            : createAnnotationsAutoChartHorizontal({
                label: metric.label,
                value: getRoundOf(data[metric.label][0], precisionValue),
                index: metricIndex,
                valueColor: selectedColor,
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
        metricValue: getRoundOf(data[metric.label][0], precisionValue),
        fill: 'tozeroy',
        mode: 'lines',
        type: 'scatter',
        fillcolor: fillColor,
        line: {
          color: selectedColor,
        },
        name: metric.label,
        ...(metricIndex > 0 && {
          xaxis: `x${metricIndex + 1}`,
          yaxis: `y${metricIndex + 1}`,
        }),
      };
    });

  const [statsData, statsLayout]: Plotly.Data[] = useMemo(() => {
    let calculatedStatsData: Plotly.Data[] = [];
    calculatedStatsData = generateLineTraces();

    if (sortedThresholds.length) {
      const sortedStatsData = calculatedStatsData
        .map((i, j) => ({ ...i, oldIndex: j }))
        .sort((a, b) => a.metricValue - b.metricValue);
      const thresholdRanges: any = [];
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

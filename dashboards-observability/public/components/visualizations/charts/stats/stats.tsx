/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { find, isEmpty, uniqBy } from 'lodash';
import Plotly from 'plotly.js-dist';
import React, { useMemo } from 'react';
import { COLOR_BLACK, COLOR_WHITE } from '../../../../../common/constants/colors';
import {
  AGGREGATIONS,
  DEFAULT_STATS_CHART_PARAMETERS,
  GROUPBY,
  STATS_ANNOTATION,
  STATS_AXIS_MARGIN,
  STATS_GRID_SPACE_BETWEEN_X_AXIS,
  STATS_GRID_SPACE_BETWEEN_Y_AXIS,
  STATS_REDUCE_SERIES_UNIT_SIZE_PERCENTAGE,
  STATS_REDUCE_TITLE_SIZE_PERCENTAGE,
  STATS_REDUCE_VALUE_SIZE_PERCENTAGE,
  STATS_SERIES_UNIT_SUBSTRING_LENGTH,
} from '../../../../../common/constants/explorer';
import {
  DEFAULT_CHART_STYLES,
  FILLOPACITY_DIV_FACTOR,
} from '../../../../../common/constants/shared';
import {
  ConfigListEntry,
  IVisualizationContainerProps,
} from '../../../../../common/types/explorer';
import { uiSettingsService } from '../../../../../common/utils';
import { ThresholdUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import {
  getPropName,
  getRoundOf,
  getTooltipHoverInfo,
  hexToRgb,
} from '../../../event_analytics/utils/utils';
import { Plt } from '../../plotly/plot';

const {
  DefaultOrientation,
  DefaultTextMode,
  DefaultChartType,
  BaseThreshold,
  DefaultTextColor,
} = DEFAULT_STATS_CHART_PARAMETERS;

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

    vis: { charttype, titlesize, valuesize, textmode, orientation, precisionvalue },
  }: IVisualizationContainerProps = visualizations;

  // data config parametrs
  const {
    dataConfig: {
      span = {},
      [GROUPBY]: xaxis = [],
      [AGGREGATIONS]: series = [],
      chartStyles = {},
      panelOptions = {},
      tooltipOptions = {},
      thresholds = [],
    },
    layoutConfig = {},
  } = userConfigs;
  const timestampField = find(fields, (field) => field.type === 'timestamp');

  /**
   * determine x axis
   */
  let xaxes: ConfigListEntry[];
  if (span && span.time_field && timestampField) {
    xaxes = [timestampField, ...xaxis];
  } else {
    xaxes = xaxis;
  }

  const seriesLength = series.length;
  const chartType = chartStyles.chartType || charttype;

  if (
    isEmpty(queriedVizData) ||
    (chartType === DefaultChartType && xaxes.length === 0) ||
    seriesLength === 0
  )
    return <EmptyPlaceholder icon={visualizations?.vis?.icontype} />;

  // thresholds
  const appliedThresholds = thresholds.length ? thresholds : [BaseThreshold];
  const sortedThresholds = uniqBy(
    [...appliedThresholds].sort((a: ThresholdUnitType, b: ThresholdUnitType) => a.value - b.value),
    'value'
  );

  // style panel parameters
  let titleSize =
    chartStyles.titleSize ||
    titlesize - titlesize * seriesLength * STATS_REDUCE_TITLE_SIZE_PERCENTAGE;
  const valueSize =
    chartStyles.valueSize ||
    valuesize - valuesize * seriesLength * STATS_REDUCE_VALUE_SIZE_PERCENTAGE;
  const selectedOrientation = chartStyles.orientation || orientation;
  const chartOrientation =
    selectedOrientation === DefaultOrientation || selectedOrientation === 'v'
      ? DefaultOrientation
      : 'h';
  const selectedTextMode = chartStyles.textMode || textmode;
  let textMode =
    selectedTextMode === DefaultTextMode || selectedTextMode === 'values+names'
      ? DefaultTextMode
      : selectedTextMode;
  const precisionValue = chartStyles.precisionValue || precisionvalue;
  const seriesUnits =
    chartStyles.seriesUnits?.substring(0, STATS_SERIES_UNIT_SUBSTRING_LENGTH) || '';
  const seriesUnitsSize = valueSize - valueSize * STATS_REDUCE_SERIES_UNIT_SIZE_PERCENTAGE;
  const isDarkMode = uiSettingsService.get('theme:darkMode');
  const textColor = chartStyles.textColor?.childColor || DefaultTextColor;

  if (chartType === 'text' && chartStyles.textMode === undefined) {
    textMode = 'names';
    titleSize = titlesize;
  }

  // margin from left of grid cell for label/value
  const ANNOTATION_MARGIN_LEFT = seriesLength > 1 ? 0.01 : 0;
  let autoChartLayout: object = {
    annotations: [],
  };

  const xaxesData = xaxes.reduce((prev, cur) => {
    if (queriedVizData[cur.name]) {
      if (prev.length === 0) return queriedVizData[cur.name].flat();
      return prev.map(
        (item: string | number, index: number) => `${item},<br>${queriedVizData[cur.name][index]}`
      );
    }
  }, []);

  const createValueText = (value: string | number) =>
    `<b>${value}${
      seriesUnits ? `<span style="font-size: ${seriesUnitsSize}px"}> ${seriesUnits}</span>` : ''
    }</b>`;

  const calculateTextCooridinate = (seriesCount: number, index: number) => {
    // calculating center of each subplot based on orienation vertical(single column) or horizontal(single row)
    // splitting whole plot area with series length and find center of each individual subplot w.r.t index of series
    if (seriesCount === 1) {
      return 0.5;
    } else if (index === 0) {
      return 1 / seriesCount / 2;
    }
    return (index + 1) / seriesCount - 1 / seriesCount / 2;
  };

  const createAnnotationsAutoModeHorizontal = ({
    label,
    value,
    index,
    valueColor,
  }: CreateAnnotationType) => {
    const yCordinate = index > 0 ? (index + 1) / seriesLength : 1 / seriesLength;
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
            seriesValue: value,
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
            seriesValue: value,
          },
        ]
      : [
          {
            ...STATS_ANNOTATION,
            x: 0.5,
            y: calculateTextCooridinate(seriesLength, index),
            xanchor: 'center',
            yanchor: 'bottom',
            text: textMode === 'values' ? createValueText(value) : label,
            font: {
              size: textMode === 'values' ? valueSize : titleSize,
              color: textMode === 'names' ? (isDarkMode ? COLOR_WHITE : COLOR_BLACK) : valueColor,
              family: 'Roboto',
            },
            type: textMode === 'names' ? 'name' : 'value',
            seriesValue: value,
          },
        ];
  };

  const createAnnotationAutoModeVertical = ({
    label,
    value,
    index,
    valueColor,
  }: CreateAnnotationType) => {
    const xCoordinate = index / seriesLength + ANNOTATION_MARGIN_LEFT;
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
            seriesValue: value,
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
            seriesValue: value,
          },
        ]
      : [
          {
            ...STATS_ANNOTATION,
            x: calculateTextCooridinate(seriesLength, index),
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
            seriesValue: value,
          },
        ];
  };

  // extend y axis range to increase height of subplot w.r.t series data
  const extendYaxisRange = (seriesLabel: string) => {
    const sortedData = queriedVizData[seriesLabel]
      .slice()
      .sort((curr: number, next: number) => next - curr);
    return isNaN(sortedData[0]) ? 100 : sortedData[0] + sortedData[0] / 2;
  };

  const getSeriesValue = (label: string) =>
    typeof queriedVizData[label][queriedVizData[label].length - 1] === 'number'
      ? getRoundOf(
          queriedVizData[label][queriedVizData[label].length - 1],
          Math.abs(precisionValue)
        )
      : 0;

  const generateLineTraces = () => {
    return series.map((seriesItem: ConfigListEntry, seriesIndex: number) => {
      const seriesLabel = getPropName(seriesItem);
      const isLabelExisted = queriedVizData[seriesLabel] ? true : false;
      const annotationOption = {
        label: seriesLabel,
        value: isLabelExisted ? getSeriesValue(seriesLabel) : 0,
        index: seriesIndex,
        valueColor: '',
      };
      const layoutAxisIndex = seriesIndex > 0 ? seriesIndex + 1 : '';
      autoChartLayout = {
        ...autoChartLayout,
        annotations: autoChartLayout.annotations.concat(
          chartOrientation === DefaultOrientation || seriesLength === 1
            ? createAnnotationAutoModeVertical(annotationOption)
            : createAnnotationsAutoModeHorizontal(annotationOption)
        ),
        [`xaxis${layoutAxisIndex}`]: {
          visible: false,
          showgrid: false,
          anchor: `y${layoutAxisIndex}`,
          layoutFor: seriesLabel,
        },
        [`yaxis${layoutAxisIndex}`]: {
          visible: false,
          showgrid: false,
          anchor: `x${layoutAxisIndex}`,
          range: isLabelExisted ? [0, extendYaxisRange(seriesLabel)] : [0, 100],
          layoutFor: seriesLabel,
        },
      };

      return {
        x: xaxesData,
        y: queriedVizData[seriesLabel],
        seriesValue: isLabelExisted ? getSeriesValue(seriesLabel) : 0,
        fill: 'tozeroy',
        mode: 'lines',
        type: 'scatter',
        fillcolor: '',
        line: {
          color: '',
        },
        name: seriesLabel,
        ...(seriesIndex > 0 && {
          xaxis: `x${seriesIndex + 1}`,
          yaxis: `y${seriesIndex + 1}`,
        }),
        hoverinfo: getTooltipHoverInfo({
          tooltipMode: tooltipOptions.tooltipMode,
          tooltipText: tooltipOptions.tooltipText,
        }),
      };
    });
  };

  const createAnnotationTextModeVertical = ({
    label,
    value,
    index,
    valueColor,
  }: CreateAnnotationType) => {
    return textMode === DefaultTextMode
      ? [
          {
            ...STATS_ANNOTATION,
            xanchor: 'left',
            yanchor: seriesLength === 1 ? 'center' : 'bottom',
            text: label,
            font: {
              size: titleSize,
              color: textColor,
              family: 'Roboto',
            },
            x:
              seriesLength === 1
                ? 0 + ANNOTATION_MARGIN_LEFT
                : index / seriesLength + ANNOTATION_MARGIN_LEFT,
            y: 0.5,
            seriesValue: value,
            type: 'name',
          },
          {
            ...STATS_ANNOTATION,
            xanchor: seriesLength === 1 ? 'right' : 'left',
            yanchor: seriesLength === 1 ? 'center' : 'top',
            text: createValueText(value),
            font: {
              size: valueSize,
              color: textColor,
              family: 'Roboto',
            },
            x:
              seriesLength === 1
                ? 1 - ANNOTATION_MARGIN_LEFT
                : index / seriesLength + ANNOTATION_MARGIN_LEFT,
            y: 0.5,
            type: 'value',
            seriesValue: value,
          },
        ]
      : [
          {
            ...STATS_ANNOTATION,
            x: calculateTextCooridinate(seriesLength, index),
            xanchor: 'center',
            y: 0.5,
            yanchor: 'center',
            text: textMode === 'values' ? createValueText(value) : label,
            font: {
              size: textMode === 'values' ? valueSize : titleSize,
              color: textColor,
              family: 'Roboto',
            },
            type: textMode === 'names' ? 'name' : 'value',
            seriesValue: value,
          },
        ];
  };

  const createAnnotationTextModeHorizontal = ({
    label,
    value,
    index,
    valueColor,
  }: CreateAnnotationType) => {
    return textMode === DefaultTextMode
      ? [
          {
            ...STATS_ANNOTATION,
            xanchor: 'left',
            yanchor: 'center',
            text: label,
            font: {
              size: titleSize,
              color: COLOR_WHITE,
              family: 'Roboto',
            },
            x: 0 + ANNOTATION_MARGIN_LEFT,
            y: calculateTextCooridinate(seriesLength, index),
            seriesValue: value,
            type: 'name',
          },
          {
            ...STATS_ANNOTATION,
            xanchor: 'right',
            yanchor: 'center',
            text: createValueText(value),
            font: {
              size: valueSize,
              color: COLOR_WHITE,
              family: 'Roboto',
            },
            x: 1 - ANNOTATION_MARGIN_LEFT,
            y: calculateTextCooridinate(seriesLength, index),
            type: 'value',
            seriesValue: value,
          },
        ]
      : [
          {
            ...STATS_ANNOTATION,
            xanchor: 'center',
            yanchor: 'center',
            x: 0.5,
            y: calculateTextCooridinate(seriesLength, index),
            text: textMode === 'values' ? createValueText(value) : label,
            font: {
              size: textMode === 'values' ? valueSize : titleSize,
              color: COLOR_WHITE,
              family: 'Roboto',
            },
            type: textMode === 'names' ? 'name' : 'value',
            seriesValue: value,
          },
        ];
  };

  const generateRectShapes = () => {
    const shape = {
      type: 'rect',
      xsizemode: 'scaled',
      layer: 'below',
      yref: 'paper',
      xref: 'paper',
      line: {
        color: '',
        width: 3,
      },
      fillcolor: '',
    };
    const shapes: any = [];
    series.forEach((seriesItem: ConfigListEntry, seriesIndex: number) => {
      const seriesLabel = getPropName(seriesItem);
      const isLabelExisted = queriedVizData[seriesLabel] ? true : false;
      const seriesValue = isLabelExisted ? getSeriesValue(seriesLabel) : 0;
      const axisIndex = seriesIndex > 0 ? seriesIndex + 1 : '';
      const annotation = {
        label: seriesLabel,
        value: seriesValue,
        index: seriesIndex,
        valueColor: '',
      };
      autoChartLayout = {
        ...autoChartLayout,
        annotations: autoChartLayout.annotations.concat(
          orientation === DefaultOrientation || seriesLength === 1
            ? createAnnotationTextModeVertical({
                ...annotation,
              })
            : createAnnotationTextModeHorizontal({
                ...annotation,
              })
        ),
        [`yaxis${axisIndex}`]: {
          visible: false,
          showgrid: false,
          anchor: `x${axisIndex}`,
        },
        [`xaxis${axisIndex}`]: {
          visible: false,
          showgrid: false,
          anchor: `y${axisIndex}`,
        },
      };

      const nonSimilarAxis = orientation === DefaultOrientation ? 'x' : 'y';
      const similarAxis = orientation === DefaultOrientation ? 'y' : 'x';
      // for first metric
      if (seriesIndex === 0) {
        shapes.push({
          ...shape,
          [`${nonSimilarAxis}0`]: 0,
          [`${nonSimilarAxis}1`]: 1 / seriesLength,
          [`${similarAxis}0`]: 0,
          [`${similarAxis}1`]: 1,
          seriesValue,
        });
      } else {
        shapes.push({
          ...shape,
          [`${nonSimilarAxis}0`]:
            shapes[shapes.length - 1][`${nonSimilarAxis}1`] + STATS_GRID_SPACE_BETWEEN_X_AXIS,
          [`${nonSimilarAxis}1`]:
            shapes[shapes.length - 1][`${nonSimilarAxis}1`] + 1 / seriesLength,
          [`${similarAxis}0`]: 0,
          [`${similarAxis}1`]: 1,
          seriesValue,
        });
      }
    });
    return shapes;
  };

  const [statsData, statsLayout]: Plotly.Data[] = useMemo(() => {
    let calculatedStatsData: Plotly.Data[] = [];
    let sortedStatsData: Plotly.Data[] = [];
    let sortedShapesData = [];
    if (chartType === DefaultChartType) {
      calculatedStatsData = generateLineTraces();
      sortedStatsData = calculatedStatsData
        .map((stat, statIndex) => ({ ...stat, oldIndex: statIndex }))
        .sort((statCurrent, statNext) => statCurrent.seriesValue - statNext.seriesValue);
    } else {
      const shapes = generateRectShapes();
      autoChartLayout = {
        ...autoChartLayout,
        shapes,
      };
      sortedShapesData = shapes
        .map((shape: object, shapeIndex: number) => ({ ...shape, oldIndex: shapeIndex }))
        .sort((current: object, next: object) => current.seriesValue - next.seriesValue);
    }

    if (sortedThresholds.length) {
      // threshold ranges with min, max values
      let thresholdRanges: number[][] = [];
      const maxValue =
        chartType === DefaultChartType
          ? sortedStatsData[sortedStatsData.length - 1].seriesValue
          : sortedShapesData[sortedShapesData.length - 1].seriesValue;
      thresholdRanges = sortedThresholds.map((thresh, index) => [
        thresh.value,
        index === sortedThresholds.length - 1 ? maxValue : sortedThresholds[index + 1].value,
      ]);

      if (chartType === DefaultChartType) {
        if (thresholdRanges.length) {
          // change color for line traces
          for (let statIndex = 0; statIndex < sortedStatsData.length; statIndex++) {
            for (let threshIndex = 0; threshIndex < thresholdRanges.length; threshIndex++) {
              if (
                Number(sortedStatsData[statIndex].seriesValue) >=
                  Number(thresholdRanges[threshIndex][0]) &&
                Number(sortedStatsData[statIndex].seriesValue) <=
                  Number(thresholdRanges[threshIndex][1])
              ) {
                calculatedStatsData[sortedStatsData[statIndex].oldIndex].fillcolor = hexToRgb(
                  sortedThresholds[threshIndex].color,
                  DEFAULT_CHART_STYLES.FillOpacity / FILLOPACITY_DIV_FACTOR
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
            const isSeriesValueText = autoChartLayout.annotations[annotationIndex].type === 'value';
            const seriesValue = Number(autoChartLayout.annotations[annotationIndex].seriesValue);
            for (let threshIndex = 0; threshIndex < thresholdRanges.length; threshIndex++) {
              if (
                isSeriesValueText &&
                seriesValue >= Number(thresholdRanges[threshIndex][0]) &&
                seriesValue <= Number(thresholdRanges[threshIndex][1])
              ) {
                autoChartLayout.annotations[annotationIndex].font.color =
                  sortedThresholds[threshIndex].color;
              }
            }
          }
        }
      } else {
        // change color of shapes
        for (let shapeIndex = 0; shapeIndex < sortedShapesData.length; shapeIndex++) {
          for (let threshIndex = 0; threshIndex < thresholdRanges.length; threshIndex++) {
            if (
              Number(sortedShapesData[shapeIndex].seriesValue) >=
                Number(thresholdRanges[threshIndex][0]) &&
              Number(sortedShapesData[shapeIndex].seriesValue) <=
                Number(thresholdRanges[threshIndex][1])
            ) {
              autoChartLayout.shapes[sortedShapesData[shapeIndex].oldIndex].fillcolor =
                sortedThresholds[threshIndex].color;
              autoChartLayout.shapes[sortedShapesData[shapeIndex].oldIndex].line.color =
                sortedThresholds[threshIndex].color;
            }
          }
        }
      }
    }
    return [chartType === DefaultChartType ? calculatedStatsData : [], autoChartLayout];
  }, [
    xaxes,
    series,
    fields,
    appliedThresholds,
    chartOrientation,
    titleSize,
    valueSize,
    textMode,
    seriesUnits,
    queriedVizData,
    precisionValue,
  ]);

  const mergedLayout = useMemo(() => {
    return {
      ...layout,
      ...(layoutConfig.layout && layoutConfig.layout),
      showlegend: false,
      margin:
        chartType === DefaultChartType
          ? STATS_AXIS_MARGIN
          : panelOptions.title || layoutConfig.layout?.title
          ? STATS_AXIS_MARGIN
          : { ...STATS_AXIS_MARGIN, t: 0 },
      ...statsLayout,
      grid: {
        ...(chartOrientation === DefaultOrientation
          ? {
              rows: 1,
              columns: seriesLength,
              xgap: STATS_GRID_SPACE_BETWEEN_X_AXIS,
            }
          : {
              rows: seriesLength,
              columns: 1,
              ygap: STATS_GRID_SPACE_BETWEEN_Y_AXIS,
            }),
        pattern: 'independent',
        roworder: 'bottom to top',
      },
      title: panelOptions?.title || layoutConfig.layout?.title || '',
    };
  }, [
    layout,
    layoutConfig.layout,
    panelOptions?.title,
    chartOrientation,
    seriesLength,
    statsLayout,
  ]);

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={statsData} layout={mergedLayout} config={mergedConfigs} />;
};

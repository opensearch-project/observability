/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import Plotly from 'plotly.js-dist';
import { Plt } from '../../plotly/plot';
import { ThresholdUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { last, sortedIndex, uniqBy } from 'lodash';
import { AvailabilityUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { ConfigListEntry } from '../../../../../common/types/explorer';
import { hexToRgb } from '../../../../components/event_analytics/utils/utils';
import { uiSettingsService } from '../../../../../common/utils';
import {
  STATS_MAX_GRID_LENGTH,
  STATS_GAP_BETWEEN_AXIS,
  DefaultStatsParameters,
  STATS_AXIS_MARGIN,
} from '../../../../../common/constants/explorer';
import {
  DefaultChartStyles,
  PLOTLY_COLOR,
  FILLOPACITY_DIV_FACTOR,
} from '../../../../../common/constants/shared';
import { STATS_TEXT_BLACK, STATS_TEXT_WHITE } from '../../../../../common/constants/colors';
const { DefaultOrientation, DefaultTextMode, DefaultChartType } = DefaultStatsParameters;

interface createAnnotationType {
  type: string;
  index: number;
  label?: string;
  value?: number;
  valueColor?: string;
}

const annotaion = {
  xref: 'paper',
  yref: 'paper',
  showarrow: false,
};
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
  const chartType = dataConfig?.chartStyles?.chartType || vis.chartType;

  if ((chartType === DefaultChartType && dimensions.length === 0) || metricsLength === 0)
    return <EmptyPlaceholder icon={visualizations?.vis?.iconType} />;

  console.log('data===', data);
  console.log('dataConfig?.thresholds===', dataConfig?.thresholds);

  // style panel parameters
  const thresholds = dataConfig?.thresholds || [];
  const sortedThresholds = uniqBy(
    thresholds.slice().sort((a, b) => a.value - b.value),
    'value'
  );
  console.log('sortedThresholds===', sortedThresholds);
  const titleSize =
    dataConfig?.chartStyles?.titleSize || vis.titleSize - vis.titleSize * metricsLength * 0.05;
  const valueSize =
    dataConfig?.chartStyles?.valueSize || vis.valueSize - vis.valueSize * metricsLength * 0.08;
  console.log('titleSize===', titleSize, 'valueSize', valueSize);
  const selectedOrientation = dataConfig?.chartStyles?.orientation || vis.orientation;
  const orientation =
    selectedOrientation === DefaultOrientation || selectedOrientation === 'v'
      ? DefaultOrientation
      : 'h';
  const selectedTextMode = dataConfig?.chartStyles?.textMode || vis.textMode;
  const textMode =
    selectedTextMode === DefaultTextMode || selectedTextMode === 'values+names'
      ? DefaultTextMode
      : selectedTextMode;
  const precisionValue = dataConfig?.chartStyles?.precisionValue || vis.precisionValue;
  const metricUnits = dataConfig?.chartStyles?.metricUnits || '';
  const isDarkMode = uiSettingsService.get('theme:darkMode');
  console.log('thresholds===', thresholds);
  console.log('metricUnits====', metricUnits);
  console.log('precisionValue===', precisionValue);
  const getRoundOf = (number: number, places: number) => {
    return (Math.round(number * 10 ** precisionValue) / 10 ** precisionValue).toFixed(places);
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

  // const createAnnotation = ({ type, label, value, index, valueColor }: createAnnotationType) => {
  //   console.log('createAnnotation===', { type, label, value, index });
  //   const commonAxis = orientation === DefaultOrientation ? 'y' : 'x';
  //   const calculatedAxis = orientation === DefaultOrientation ? 'x' : 'y';
  //   return textMode === 'values+names' || textMode === 'auto'
  //     ? [
  //         {
  //           xref: 'paper',
  //           yref: 'paper',
  //           [calculatedAxis]: index / metricsLength + ZERO_ERROR_ANNOTATION,
  //           [commonAxis]: 1,
  //           xanchor: 'left',
  //           yanchor: 'bottom',
  //           text: label,
  //           showarrow: false,
  //           font: {
  //             size: titleSize,
  //             color: isDarkMode ? STATS_TEXT_WHITE : STATS_TEXT_BLACK,
  //             family: 'Roboto',
  //           },
  //         },
  //         {
  //           xref: 'paper',
  //           yref: 'paper',
  //           [calculatedAxis]:
  //             index > 0
  //               ? (index + 1) / metricsLength - ZERO_ERROR_ANNOTATION
  //               : 1 / metricsLength - ZERO_ERROR_ANNOTATION,
  //           [commonAxis]: 1,
  //           xanchor: 'right',
  //           yanchor: 'bottom',
  //           text: `<b>${value}</b>`,
  //           showarrow: false,
  //           font: {
  //             size: valueSize,
  //             color: valueColor,
  //             family: 'Roboto',
  //           },
  //         },
  //       ]
  //     : [
  //         {
  //           xref: 'paper',
  //           yref: 'paper',
  //           [calculatedAxis]:
  //             metricsLength === 1
  //               ? 0.5
  //               : index === 0
  //               ? ((1 / metricsLength) * 1) / 2
  //               : (index + 1) / metricsLength - ((1 / metricsLength) * 1) / 2,
  //           xanchor: 'center',
  //           [commonAxis]: 1,
  //           yanchor: 'bottom',
  //           text: textMode === 'values' ? `<b>${value}</b>` : label,
  //           showarrow: false,
  //           font: {
  //             size: textMode === 'values' ? valueSize : titleSize,
  //             color:
  //               textMode === 'names'
  //                 ? isDarkMode
  //                   ? STATS_TEXT_WHITE
  //                   : STATS_TEXT_BLACK
  //                 : valueColor,
  //             family: 'Roboto',
  //           },
  //         },
  //       ];
  // };

  const createAnnotation = ({ type, label, value, index, valueColor }: createAnnotationType) => {
    console.log('createAnnotation===', { type, label, value, index });
    const commonAxis = orientation === DefaultOrientation ? 'y' : 'x';
    const calculatedAxis = orientation === DefaultOrientation ? 'x' : 'y';
    return textMode === 'values+names' || textMode === 'auto'
      ? [
          {
            ...annotaion,
            xanchor: 'left',
            yanchor: 'bottom',
            text: label,
            font: {
              size: titleSize,
              color: isDarkMode ? STATS_TEXT_WHITE : STATS_TEXT_BLACK,
              family: 'Roboto',
            },
            [calculatedAxis]: index / metricsLength + ZERO_ERROR_ANNOTATION,
            [commonAxis]: 1,
            metricIndex: index,
          },
          {
            ...annotaion,
            xanchor: 'left',
            yanchor: 'top',
            text: `<b>${value}${
              metricUnits
                ? `<span style="font-size: ${valueSize - 20}px"}> ${metricUnits}</span>`
                : ``
            }</b>`,
            font: {
              size: valueSize,
              color: valueColor,
              family: 'Roboto',
            },
            [calculatedAxis]: index / metricsLength + ZERO_ERROR_ANNOTATION,
            [commonAxis]: 1,
            metricIndex: index,
          },
        ]
      : [
          {
            ...annotaion,
            [calculatedAxis]:
              metricsLength === 1
                ? 0.5
                : index === 0
                ? ((1 / metricsLength) * 1) / 2
                : (index + 1) / metricsLength - ((1 / metricsLength) * 1) / 2,
            xanchor: 'center',
            [commonAxis]: 1,
            yanchor: 'bottom',
            text: textMode === 'values' ? `<b>${value}</b>` : label,
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
            metricIndex: index,
          },
        ];
  };

  const generateLineTraces = () =>
    metrics.map((metric: ConfigListEntry, metricIndex: number) => {
      const selectedColor = PLOTLY_COLOR[metricIndex % PLOTLY_COLOR.length];
      const fillColor = hexToRgb(
        selectedColor,
        DefaultChartStyles.FillOpacity / FILLOPACITY_DIV_FACTOR
      );
      const sortedData = data[metric.label].slice().sort((a, b) => b - a);
      var result = sortedData
        .slice(0, 5)
        .reduce(function (r, e, i) {
          if (data[metric.label][i + 1]) r.push(Number((data[metric.label][i + 1] - e).toFixed(2)));
          return r;
        }, [])
        .reduce((a, b) => Math.abs(a) + Math.abs(b), 0);

      autoChartLayout = {
        ...autoChartLayout,
        annotations: autoChartLayout.annotations.concat(
          createAnnotation({
            type: textMode,
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
          range: [0, sortedData[0] + result],
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
    const sortedStatsData = calculatedStatsData
      .map((i, j) => ({ ...i, oldIndex: j }))
      .sort((a, b) => a.metricValue - b.metricValue);
    console.log('sortedStatsData===', sortedStatsData);

    if (sortedThresholds.length) {
      //threshold array --- 0, 30, 50
      // data array = 10, 50, 70, 150
      // const thresholdRanges: any = [[0,30],[30, 50], [50, 150]];
      // for (let i = 0; i < sortedStatsData.length; i++) {
      //   console.log('stat====== statIndex i', i, 'statsData ==', sortedStatsData[i]);
      //   for (let j = 0; j < thresholdRanges.length; i++) {
      //     console.log('ramgeINdex == j', j, 'ramgeData', thresholdRanges[j]);
      //     if (
      //       sortedStatsData[i].metricValue >= thresholdRanges[j][0] &&
      //       sortedStatsData[i].metricValue < thresholdRanges[j][1]
      //     ) {
      //       calculatedStatsData[sortedStatsData[i].oldIndex].fillColor = 'red'
      //     }
      //   }
      // }

      // const thresholdRanges : any = []
      // sortedThresholds.forEach((thresh, index) => {
      //   if(sortedThresholds.length === 1){
      //     thresholdRanges.push([0, ])
      //   }
      // })

      // for (let i = 0; i < sortedThresholds.length; i++) {
      //   if(i === 0 || i + 1 === sortedThresholds.length){
      //     thresholdRanges.push([0, sortedThresholds[0].value ? sortedThresholds[0].value - 1 : 'n' ])
      //   } else {
      //     // thresholdRanges.push([sortedThresholds[i].value - 1,  ])

      //   }
      // }

      // sortedThresholds.forEach((thresh, threshIndex) => {
      //   console.log('threshIndex===', threshIndex, 'thresh ==', thresh.value);
      //   sortedStatsData.forEach((stat, statIndex) => {
      //     console.log('stat.metricValue', stat.metricValue, 'statIndex==', statIndex);
      //     if (stat.metricValue > thresh.value) {
      //       console.log('CHANGE COLOR ======');
      //       calculatedStatsData[stat.oldIndex].fillcolor = hexToRgb(
      //         thresh.color,
      //         DefaultChartStyles.FillOpacity / FILLOPACITY_DIV_FACTOR
      //       );
      //       calculatedStatsData[stat.oldIndex].line.color = thresh.color;
      //       calculatedStatsData["thresholdIndex"] = threshIndex
      //     }
      //   });
      // });
    }

    return [calculatedStatsData, autoChartLayout];
  }, [dimensions, metrics, data, fields, thresholds, orientation, titleSize, valueSize, textMode]);

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
              xgap: STATS_GAP_BETWEEN_AXIS,
              ygap: 100,
            }
          : {
              rows: metricsLength,
              columns: 1,
              ygap: 100,
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
  console.log('statsData===', statsData);
  console.log('mergedLayout==', mergedLayout);
  return <Plt data={statsData} layout={mergedLayout} config={mergedConfigs} />;
};

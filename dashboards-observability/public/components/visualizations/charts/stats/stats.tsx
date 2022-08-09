/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import Plotly from 'plotly.js-dist';
import { Plt } from '../../plotly/plot';
import { ThresholdUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { last } from 'lodash';
import { AvailabilityUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { ConfigListEntry } from '../../../../../common/types/explorer';
import {
  STATS_MAX_GRID_LENGTH,
  STATS_GAP_BETWEEN_AXIS,
  DefaultStatsParameters,
  STATS_AXIS_MARGIN,
} from '../../../../../common/constants/explorer';
const {
  DefaultOrientation,
  StatsDefaultTextMode,
  TextSize,
  TextColor,
  TextAlignment,
  ChartType,
  DefaultPrecision,
  DefaultValueSize,
} = DefaultStatsParameters;

interface annotationType {
  type: string;
  index: number;
  label?: string;
  value?: number;
}

export const Stats = ({ visualizations, layout, config }: any) => {
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
  const chartType = dataConfig?.chartStyles?.chartType || ChartType;

  if ((chartType === ChartType && dimensions.length === 0) || metricsLength.length === 0)
    return <EmptyPlaceholder icon={visualizations?.vis?.iconType} />;

  console.log('data===', data);

  // style panel parameters
  const thresholds = dataConfig?.thresholds || [];
  const textSize = dataConfig?.chartStyles?.textSize || TextSize;
  const selectedOrientation = dataConfig?.chartStyles?.orientation || DefaultOrientation;
  const orientation = selectedOrientation === 'auto' || selectedOrientation === 'v' ? 'auto' : 'h';
  const selectedTextMode = dataConfig?.chartStyles?.textMode || StatsDefaultTextMode;
  const textMode =
    selectedTextMode === StatsDefaultTextMode || selectedTextMode === 'values+names'
      ? 'auto'
      : selectedTextMode;
  const textColor = dataConfig?.chartStyles?.textColor?.childColor || TextColor;
  const precisionValue = dataConfig?.chartStyles?.precisionValue || DefaultPrecision;
  const valueSize = dataConfig?.chartStyles?.valueSize || DefaultValueSize;
  const metricUnits = dataConfig?.chartStyles?.metricUnits || '';
  console.log("metricUnits====", metricUnits)
  console.log("precisionValue===", precisionValue)
  const getRoundOf = (number: number, places: number) =>{
    return Math.round(number * (places)) / (places);}

  const ZERO_ERROR_ANNOTATION = 0.01;
  let autoChartLayout: any = {
    xaxis: {
      visible: false,
      showgrid: false,
      anchor: 'y1',
      margin: STATS_AXIS_MARGIN,
      // domain: [0, 1]
    },
    yaxis: {
      visible: false,
      showgrid: false,
      anchor: 'x1',
      margin: STATS_AXIS_MARGIN,
      // domain: [0, ]
    },
    annotations: [],
  };

  const selectedDimensionsData = dimensions
    .map((dimension: any) => data[dimension.name])
    .reduce((prev, cur) =>
      prev.map((item: string | number, index: number) => `${item},<br>${cur[index]}`)
    );

  const createAnnotation = ({ type, label, value, index }: annotationType) => {
    console.log('createAnnotation===', { type, label, value, index });
    const commonAxis = orientation === 'auto' ? 'y' : 'x';
    const calculatedAxis = orientation === 'auto' ? 'x' : 'y';
    return textMode === 'values+names' || textMode === 'auto'
      ? [
          {
            xref: 'paper',
            yref: 'paper',
            [calculatedAxis]: index / metricsLength + ZERO_ERROR_ANNOTATION,
            [commonAxis]: 1,
            xanchor: 'left',
            yanchor: 'bottom',
            text: label,
            showarrow: false,
            font: {
              size: textSize,
              color: 'black',
              family: 'Roboto',
            },
          },
          {
            xref: 'paper',
            yref: 'paper',
            [calculatedAxis]:
              index > 0
                ? (index + 1) / metricsLength - ZERO_ERROR_ANNOTATION
                : 1 / metricsLength - ZERO_ERROR_ANNOTATION,
            [commonAxis]: 1,
            xanchor: 'right',
            yanchor: 'bottom',
            text: `<b>${value}</b>`,
            showarrow: false,
            font: {
              size: valueSize,
              color: 'black',
              family: 'Roboto',
            },
          },
        ]
      : [
          {
            xref: 'paper',
            yref: 'paper',
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
            showarrow: false,
            font: {
              size: valueSize,
              color: 'black',
              family: 'Roboto',
            },
          },
        ];
  };

  const generateLineTraces = () =>
    metrics.map((metric: ConfigListEntry, metricIndex: number) => {
      autoChartLayout = {
        ...autoChartLayout,
        annotations: autoChartLayout.annotations.concat(
          createAnnotation({
            type: textMode,
            label: metric.label,
            value: getRoundOf(data[metric.label][0], 10 ** precisionValue),
            index: metricIndex,
          })
        ),
        [`yaxis${metricIndex > 0 ? metricIndex + 1 : ''}`]: {
          visible: false,
          showgrid: false,
          anchor: `x${metricIndex > 0 ? metricIndex + 1 : ''}`,
          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
          },
        },
        [`xaxis${metricIndex > 0 ? metricIndex + 1 : ''}`]: {
          visible: false,
          showgrid: false,
          anchor: `y${metricIndex > 0 ? metricIndex + 1 : ''}`,
          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
          },
        },
      };

      return {
        x: selectedDimensionsData,
        y: data[metric.label],
        fill: 'tozeroy',
        mode: 'line',
        type: 'scatter',
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
    if (thresholds.length) {
      const mapToLine = (list: ThresholdUnitType[] | AvailabilityUnitType[]) =>
        list.map((thr: ThresholdUnitType) => {
          return calculatedStatsData
            .filter((i) => i.mode === 'line')
            .map((stat: any, index: number) => {
              const thresholdTraces = {
                x: [],
                y: [],
                mode: 'text',
                text: [],
                xaxis: '',
                yaxis: '',
              };
              thresholdTraces.x.push(selectedDimensionsData[1]);
              thresholdTraces.y.push(thr.value * (1 + 0.06));
              thresholdTraces.text.push(thr.name);
              thresholdTraces.xaxis = stat.xaxis ? stat.xaxis : 'x';
              thresholdTraces.yaxis = stat.yaxis ? stat.yaxis : 'y';
              calculatedStatsData = [...calculatedStatsData, thresholdTraces];
              return {
                type: 'line',
                x0: data[dimensions[0].label][0],
                y0: thr.value,
                x1: last(data[dimensions[0].label]),
                y1: thr.value,
                xref: `x${index + 1}`,
                yref: `y${index + 1}`,
                name: thr.name || '',
                opacity: 0.7,
                line: {
                  color: thr.color,
                  width: 3,
                  dash: 'dashdot',
                },
              };
            });
        });

      calculatedStatsData = [...calculatedStatsData];
      autoChartLayout = {
        ...autoChartLayout,
        shapes: mapToLine(thresholds).flat(2),
      };
    }
    return [calculatedStatsData, autoChartLayout];
  }, [dimensions, metrics, data, fields, thresholds, orientation, textSize, textMode]);

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
              ygap: STATS_GAP_BETWEEN_AXIS + 100,
            }),
        pattern: 'independent',
        roworder: 'bottom to top',
      },
      ...(dataConfig?.panelOptions?.title || layoutConfig.layout?.title
        ? {
            title: {
              text: dataConfig?.panelOptions?.title,
              xref: 'paper',
              yref: 'paper',
              y: 1,
            },
          }
        : {}),
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

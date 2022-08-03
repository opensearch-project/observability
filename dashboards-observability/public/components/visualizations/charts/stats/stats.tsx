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
} = DefaultStatsParameters;

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
  const textAlign = dataConfig?.chartStyles?.textAlign || TextAlignment;

  let autoChartLayout = {
    xaxis: {
      visible: false,
      showgrid: false,
      anchor: 'y1',
      margin: STATS_AXIS_MARGIN,
    },
    yaxis: {
      visible: false,
      showgrid: false,
      anchor: 'x1',
      margin: STATS_AXIS_MARGIN,
    },
  };

  const selectedDimensionsData = dimensions
    .map((dimension: any) => data[dimension.name])
    .reduce((prev, cur) =>
      prev.map((item: string | number, index: number) => `${item},<br>${cur[index]}`)
    );

  const generateLineTraces = () =>
    metrics.map((metric: ConfigListEntry, metricIndex: number) => {
      autoChartLayout = {
        ...autoChartLayout,
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
    // label/text
    let textLabelTrace: any = {
      x: [],
      y: [],
      mode: 'text',
      text: [],
      type: 'scatter',
      xaxis: `x${metricsLength + 1}`,
      yaxis: `y${metricsLength + 1}`,
      textfont: {
        size: textSize,
        color: textColor,
      },
    };
    const repeatedAxis = metricsLength === 1 || orientation === DefaultOrientation ? 'x' : 'y';
    let singleAxis = metricsLength === 1 || orientation === DefaultOrientation ? 'y' : 'x';
    const singleAxisCoords = [
      STATS_MAX_GRID_LENGTH - 1,
      metricsLength === 1 || orientation === DefaultOrientation
        ? STATS_MAX_GRID_LENGTH - 1.4
        : STATS_MAX_GRID_LENGTH - 1,
    ];
    const ZERO_ERROR = metricsLength === 1 || orientation === DefaultOrientation ? 0 : 0.5;
    const isSingleText = textMode === StatsDefaultTextMode ? false : true;
    metrics.forEach((m: ConfigListEntry, index: number) => {
      // for layout of text trace
      if (textMode === StatsDefaultTextMode) {
        textLabelTrace.text.push(`${m.label}`);
        textLabelTrace.text.push(`${data[m.label][data[m.label].length - 1]}`);
      } else if (textMode === 'names') {
        textLabelTrace.text.push(`${m.label}`);
      } else {
        textLabelTrace.text.push(`${data[m.label][data[m.label].length - 1]}`);
      }
      if (index === metricsLength - 1) {
        const textCoords = isSingleText
          ? [STATS_MAX_GRID_LENGTH - 1]
          : [STATS_MAX_GRID_LENGTH - 1, STATS_MAX_GRID_LENGTH - 1 + ZERO_ERROR];
        textLabelTrace[repeatedAxis].push(...textCoords);
      } else {
        if (textLabelTrace[repeatedAxis].length) {
          // covering all cases in between
          const textCoords = isSingleText
            ? [
                textLabelTrace[repeatedAxis][textLabelTrace[repeatedAxis].length - 1] +
                  STATS_MAX_GRID_LENGTH / metricsLength,
              ]
            : [
                textLabelTrace[repeatedAxis][textLabelTrace[repeatedAxis].length - 1] +
                  STATS_MAX_GRID_LENGTH / metricsLength,
                textLabelTrace[repeatedAxis][textLabelTrace[repeatedAxis].length - 1] +
                  STATS_MAX_GRID_LENGTH / metricsLength +
                  ZERO_ERROR,
              ];
          textLabelTrace[repeatedAxis].push(...textCoords);
        } else {
          // for very first metric
          const textCoords = isSingleText
            ? [STATS_MAX_GRID_LENGTH / metricsLength - 1]
            : [
                STATS_MAX_GRID_LENGTH / metricsLength - 1,
                STATS_MAX_GRID_LENGTH / metricsLength - 1 + ZERO_ERROR,
              ];
          textLabelTrace[repeatedAxis].push(...textCoords);
        }
      }

      if (isSingleText) {
        textLabelTrace[singleAxis].push(singleAxisCoords[0]);
      } else {
        textLabelTrace[singleAxis].push(...singleAxisCoords);
      }
    });
    calculatedStatsData = [...calculatedStatsData, textLabelTrace];
    // add layout for text traces
    autoChartLayout = {
      ...autoChartLayout,
      [`xaxis${metricsLength + 1}`]: {
        range: [0, STATS_MAX_GRID_LENGTH],
        showline: false,
        zeroline: false,
        showgrid: false,
      },
      [`yaxis${metricsLength + 1}`]: {
        range: [0, STATS_MAX_GRID_LENGTH],
        showline: false,
        zeroline: false,
        showgrid: false,
      },
    };
    if (thresholds.length) {
      const mapToLine = (list: ThresholdUnitType[] | AvailabilityUnitType[]) =>
        list.map((thr: ThresholdUnitType) =>
          calculatedStatsData
            .filter((i) => i.mode === 'line')
            .map((stat: any, index: number) => ({
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
            }))
        );

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
            }
          : {
              rows: metricsLength,
              columns: 1,
              ygap: STATS_GAP_BETWEEN_AXIS,
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

  return <Plt data={statsData} layout={mergedLayout} config={mergedConfigs} />;
};

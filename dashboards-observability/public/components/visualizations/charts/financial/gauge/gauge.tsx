/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { find, isEmpty } from 'lodash';
import Plotly from 'plotly.js-dist';
import React, { useMemo } from 'react';
import {
  AGGREGATIONS,
  GROUPBY,
  PLOTLY_GAUGE_COLUMN_NUMBER,
  DEFAULT_GAUGE_CHART_PARAMETERS,
} from '../../../../../../common/constants/explorer';
import { IVisualizationContainerProps } from '../../../../../../common/types/explorer';
import { PLOT_MARGIN } from '../../../../../../common/constants/shared';
import { ThresholdUnitType } from '../../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import { EmptyPlaceholder } from '../../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { getPropName } from '../../../../event_analytics/utils/utils';
import { Plt } from '../../../plotly/plot';

const {
  GaugeTitleSize,
  DisplayDefaultGauges,
  OrientationDefault,
  TickLength,
  LegendPlacement,
} = DEFAULT_GAUGE_CHART_PARAMETERS;

export const Gauge = ({ visualizations, layout, config }: any) => {
  const {
    data: {
      rawVizData: {
        data: queriedVizData,
        metadata: { fields },
      },
      userConfigs: {
        dataConfig: {
          span = {},
          chartStyles = {},
          panelOptions = {},
          thresholds = [],
          [GROUPBY]: dimensions = [],
          [AGGREGATIONS]: series = [],
        },
        layoutConfig = {},
      },
    },
    vis: { icontype },
  }: IVisualizationContainerProps = visualizations;

  const seriesLength = series.length;
  const numberOfGauges = panelOptions.numberOfGauges || DisplayDefaultGauges;

  // style parameters
  const titleSize = chartStyles.titleSize || GaugeTitleSize;
  const valueSize = chartStyles.valueSize;
  const showThresholdMarkers = chartStyles.showThresholdMarkers || false;
  const showThresholdLabels = chartStyles.showThresholdLabels || false;
  const orientation = chartStyles.orientation || OrientationDefault;
  const legendPlacement = chartStyles.legendPlacement || LegendPlacement;

  let xaxes = dimensions;
  const isEmptyPlot = !seriesLength || isEmpty(queriedVizData);
  const timestampField = find(fields, (field) => field.type === 'timestamp');
  if (span && span.time_field && timestampField) {
    xaxes = [timestampField, ...xaxes];
  }

  if (isEmptyPlot) return <EmptyPlaceholder icon={icontype} />;

  const gaugeData: Plotly.Data[] = useMemo(() => {
    let calculatedGaugeData: Plotly.Data[] = [];
    // case 1,2: no dimension, single/multiple metrics
    if (!xaxes.length && seriesLength >= 1) {
      calculatedGaugeData = series.map((seriesItem: any) => {
        return {
          field_name: getPropName(seriesItem),
          value: queriedVizData[getPropName(seriesItem)][0],
        };
      });
    }

    // case 3: multiple dimensions and multiple metrics
    if (xaxes.length && seriesLength) {
      const selectedDimensionsData = xaxes
        .map((dimension: any) => {
          return queriedVizData[dimension.name]
            ? queriedVizData[dimension.name].slice(0, numberOfGauges)
            : [];
        })
        .reduce((prev, cur) => {
          return prev.map((i, j) => `${i}, ${cur[j]}`);
        });
      const selectedSeriesData = series.map((seriesItem: any) => {
        const propValue = getPropName(seriesItem);
        return queriedVizData[`${propValue}`]
          ? queriedVizData[`${propValue}`].slice(0, numberOfGauges)
          : [];
      });

      selectedSeriesData.map((seriesSlice: any, seriesSliceIndex: number) => {
        calculatedGaugeData = [
          ...calculatedGaugeData,
          ...seriesSlice.map((seriesSliceData: any, seriesSliceDataIndex: number) => {
            return {
              field_name: `${selectedDimensionsData[seriesSliceDataIndex]}, ${getPropName(
                series[seriesSliceIndex]
              )}`,
              value: seriesSliceData,
            };
          }),
        ];
      });
    }

    return calculatedGaugeData.map((gauge, index) => {
      return {
        type: 'indicator',
        mode: 'gauge+number+delta',
        value: gauge.value || 0,
        title: {
          text: gauge.field_name,
          font: { size: titleSize },
          align: legendPlacement,
        },
        ...(valueSize && {
          number: {
            font: {
              size: valueSize,
            },
          },
        }),
        domain: {
          ...(orientation === 'auto' || orientation === 'h'
            ? {
                row: Math.floor(index / PLOTLY_GAUGE_COLUMN_NUMBER),
                column: index % PLOTLY_GAUGE_COLUMN_NUMBER,
              }
            : {
                column: Math.floor(index / PLOTLY_GAUGE_COLUMN_NUMBER),
                row: index % PLOTLY_GAUGE_COLUMN_NUMBER,
              }),
        },
        gauge: {
          ...(showThresholdMarkers &&
            thresholds &&
            thresholds.length && {
              threshold: {
                line: { color: thresholds[0]?.color || 'red', width: 4 },
                thickness: 0.75,
                value: thresholds[0]?.value || 0,
              },
            }),
          // threshold labels
          ...(showThresholdLabels && thresholds && thresholds.length
            ? {
                axis: {
                  ticktext: [gauge.value, ...thresholds.map((t: ThresholdUnitType) => t.name)],
                  tickvals: [gauge.value, ...thresholds.map((t: ThresholdUnitType) => t.value)],
                  ticklen: TickLength,
                },
              }
            : {}),
        },
      };
    });
  }, [
    xaxes,
    series,
    queriedVizData,
    fields,
    thresholds,
    showThresholdMarkers,
    orientation,
    showThresholdLabels,
    titleSize,
    valueSize,
  ]);

  const mergedLayout = useMemo(() => {
    const isAtleastOneFullRow = Math.floor(gaugeData.length / PLOTLY_GAUGE_COLUMN_NUMBER) > 0;
    return {
      grid: {
        ...(orientation === 'auto' || orientation === 'h'
          ? {
              rows: Math.floor(gaugeData.length / PLOTLY_GAUGE_COLUMN_NUMBER) + 1,
              columns: isAtleastOneFullRow ? PLOTLY_GAUGE_COLUMN_NUMBER : gaugeData.length,
            }
          : {
              columns: Math.floor(gaugeData.length / PLOTLY_GAUGE_COLUMN_NUMBER) + 1,
              rows: isAtleastOneFullRow ? PLOTLY_GAUGE_COLUMN_NUMBER : gaugeData.length,
            }),
        pattern: 'independent',
      },
      ...layout,
      ...(layoutConfig.layout && layoutConfig.layout),
      title: panelOptions.title || layoutConfig.layout?.title || '',
      margin: {
        ...PLOT_MARGIN,
        t: 100,
      },
    };
  }, [layout, gaugeData.length, layoutConfig.layout, panelOptions.title, orientation]);

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };
  return <Plt data={gaugeData} layout={mergedLayout} config={mergedConfigs} />;
};

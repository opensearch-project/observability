/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import Plotly from 'plotly.js-dist';
import { Plt } from '../../../plotly/plot';
import { PLOTLY_GAUGE_COLUMN_NUMBER } from '../../../../../../common/constants/explorer';
import { DefaultGaugeChartParameters } from '../../../../../../common/constants/explorer';
import { ThresholdUnitType } from '../../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import { EmptyPlaceholder } from '../../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { find, isEmpty } from 'lodash';

const {
  GaugeTitleSize,
  DisplayDefaultGauges,
  OrientationDefault,
  TickLength,
  LegendPlacement,
} = DefaultGaugeChartParameters;

export const Gauge = ({ visualizations, layout, config }: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;

  // data config parametrs
  const { dataConfig = {}, layoutConfig = {} } = visualizations.data.userConfigs;
   
  const metrics = dataConfig?.metrics ? dataConfig.metrics.filter((item) => item.name !== '') : [];
  
  const metricsLength = metrics.length;
  const numberOfGauges = dataConfig?.panelOptions?.numberOfGauges || DisplayDefaultGauges;

  // style parameters
  const thresholds = dataConfig?.thresholds || [];
  const titleSize = dataConfig?.chartStyles?.titleSize || GaugeTitleSize;
  const valueSize = dataConfig?.chartStyles?.valueSize;
  const showThresholdMarkers = dataConfig?.chartStyles?.showThresholdMarkers || false;
  const showThresholdLabels = dataConfig?.chartStyles?.showThresholdLabels || false;
  const orientation = dataConfig?.chartStyles?.orientation || OrientationDefault;
  const legendPlacement = dataConfig?.chartStyles?.legendPlacement || LegendPlacement;

  const isEmptyPlot = !metricsLength || isEmpty(data);

  const getAggValue = (metric:any) => { 
    return metric.alias ? metric.alias : metric.aggregation + '' + '(' +metric.name+ ')'
  };

  if (isEmptyPlot) return <EmptyPlaceholder icon={visualizations?.vis?.icontype} />;
  
  const dimensions = useMemo(() => {  
      // span selection
      const timestampField = find(fields, (field) => field.type === 'timestamp');

      const dataCon = dataConfig?.dimensions
      ? dataConfig.dimensions.filter((item) => item.name !== '')
      : [];

      if (dataConfig.span && dataConfig.span.time_field && timestampField && dataCon.length === 0 ) {
        return [timestampField, ...dataConfig.dimensions];
      }
  
      return [...dataConfig.dimensions];
    }, [dataConfig.dimensions]);
  
  const dimensionsLength = dimensions.length;

  const gaugeData: Plotly.Data[] = useMemo(() => {
    let calculatedGaugeData: Plotly.Data[] = [];
    if (dimensionsLength || metricsLength) {
      // case 1 and 2 is removed because dimension is not blank in any case.
      // case 3: multiple dimensions and multiple metrics

      if (dimensionsLength && metricsLength) {
        const selectedDimensionsData = dimensions
          .map((dimension: any) => { 
              return data[dimension.name] ? data[dimension.name].slice(0, numberOfGauges): [];
          })
          .reduce((prev, cur) => {
            return prev.map((i, j) => `${i}, ${cur[j]}`);
          });
        const selectedMetricsData = metrics.map((metric: any) => {
          const val  =  getAggValue(metric);
          return data[`${val}`] ? data[`${val}`].slice(0, numberOfGauges) : [];
        });

        selectedMetricsData.map((metricSlice: any, metricSliceIndex: number) => {
          calculatedGaugeData = [
            ...calculatedGaugeData,
            ...metricSlice.map((metricSliceData: any, metricSliceDataIndex: number) => {
              return {
                field_name: `${selectedDimensionsData[metricSliceDataIndex]}, ${getAggValue(metrics[metricSliceIndex])}`,
                value: metricSliceData,
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
            //threshold labels
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
    }
    return calculatedGaugeData;
  }, [
    dimensions,
    metrics,
    data,
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
      title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
    };
  }, [
    data,
    layout,
    gaugeData.length,
    layoutConfig.layout,
    dataConfig?.panelOptions?.title,
    orientation,
  ]);

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };
  return <Plt data={gaugeData} layout={mergedLayout} config={mergedConfigs} />;
};

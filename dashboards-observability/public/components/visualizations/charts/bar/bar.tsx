/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { forEach, isEmpty, last, some, find } from 'lodash';
import { Plt } from '../../plotly/plot';
import {
  LONG_CHART_COLOR,
  PLOTLY_COLOR,
  FILLOPACITY_DIV_FACTOR,
} from '../../../../../common/constants/shared';
import { AvailabilityUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { ThresholdUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import { getPropName, hexToRgb } from '../../../event_analytics/utils/utils';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { AGGREGATIONS, BREAKDOWNS, GROUPBY } from '../../../../../common/constants/explorer';
import { IVisualizationContainerProps } from '../../../../../common/types/explorer';

export const Bar = ({ visualizations, layout, config }: any) => {
  const DEFAULT_LABEL_SIZE = 10;
  const {
    data: {
      defaultAxes,
      indexFields,
      query,
      rawVizData: {
        data: queriedVizData,
        metadata: { fields },
      },
      userConfigs,
    },
    vis: visMetaData,
  }: IVisualizationContainerProps = visualizations;
  const lastIndex = fields.length - 1;
  const { dataConfig = {}, layoutConfig = {}, availabilityConfig = {} } = userConfigs;

  /**
   * determine stylings
   */
  const barOrientation = dataConfig.chartStyles?.orientation || visMetaData.orientation;
  const isVertical = barOrientation === visMetaData.orientation;

  const tickAngle = dataConfig?.chartStyles?.rotateBarLabels || visMetaData.labelangle;
  const lineWidth = dataConfig?.chartStyles?.lineWidth || visMetaData.linewidth;
  const fillOpacity =
    dataConfig?.chartStyles?.fillOpacity !== undefined
      ? dataConfig?.chartStyles?.fillOpacity / FILLOPACITY_DIV_FACTOR
      : visMetaData.fillOpacity / FILLOPACITY_DIV_FACTOR;
  const barWidth = 1 - (dataConfig?.chartStyles?.barWidth || visMetaData.barwidth);
  const groupWidth = 1 - (dataConfig?.chartStyles?.groupWidth || visMetaData.groupwidth);
  const showLegend = !(
    dataConfig?.legend?.showLegend && dataConfig.legend.showLegend !== visMetaData.showlegend
  );
  const legendPosition = dataConfig?.legend?.position || visMetaData.legendposition;
  const labelSize = dataConfig?.chartStyles?.labelSize || DEFAULT_LABEL_SIZE;

  const getSelectedColorTheme = (field: any, index: number) =>
    (dataConfig?.colorTheme?.length > 0 &&
      dataConfig.colorTheme.find((colorSelected) => colorSelected.name.name === field.label)
        ?.color) ||
    PLOTLY_COLOR[index % PLOTLY_COLOR.length];

  let bars;
  let valueSeries;
  let valueForXSeries;

  /**
   * determine x axis
   */
  const xaxes = useMemo(() => {
    // breakdown selections
    if (dataConfig[BREAKDOWNS]) {
      return [
        ...dataConfig[GROUPBY].filter(
          (dimension) =>
            !some(dataConfig[BREAKDOWNS], (breakdown) => breakdown.label === dimension.label)
        ),
      ];
    }

    // span selection
    const timestampField = find(fields, (field) => field.type === 'timestamp');
    if (dataConfig.span && dataConfig.span.time_field && timestampField) {
      return [timestampField, ...dataConfig[GROUPBY]];
    }

    return dataConfig[GROUPBY];
  }, [dataConfig[GROUPBY], dataConfig[BREAKDOWNS]]);

  /**
   * determine y axis
   */
  const yaxes = useMemo(() => {
    return Array.isArray(dataConfig[AGGREGATIONS]) ? [...dataConfig[AGGREGATIONS]] : [];
  }, [dataConfig[AGGREGATIONS]]);

  /**
   * prepare data for visualization, map x-xais to y-xais
   */
  const chartAxis = useMemo(() => {
    return yaxes.length > 0 && Array.isArray(queriedVizData[getPropName(yaxes[0])])
      ? queriedVizData[getPropName(yaxes[0])].map((_, idx) => {
          // let combineXaxis = '';
          const xaxisName = xaxes.map((xaxis) => {
            return queriedVizData[xaxis.name] && queriedVizData[xaxis.name][idx]
              ? queriedVizData[xaxis.name][idx]
              : '';
          });
          return xaxisName.join(', ');
        })
      : [];
  }, [queriedVizData, xaxes, yaxes]);

  bars = yaxes?.map((yMetric, idx) => {
    return {
      y: isVertical ? queriedVizData[getPropName(yMetric)] : chartAxis,
      x: isVertical ? chartAxis : queriedVizData[getPropName(yMetric)],
      type: visMetaData.type,
      marker: {
        color: getSelectedColorTheme(yMetric, idx),
        line: {
          color: getSelectedColorTheme(yMetric, idx),
          width: lineWidth,
        },
      },
      name: getPropName(yMetric),
      orientation: barOrientation,
    };
  });

  if (
    isEmpty(queriedVizData) ||
    !Array.isArray(dataConfig[GROUPBY]) ||
    !Array.isArray(dataConfig[AGGREGATIONS]) ||
    (dataConfig[BREAKDOWNS] && !Array.isArray(dataConfig[BREAKDOWNS])) ||
    yaxes.length === 0
  )
    return <EmptyPlaceholder icon={visMetaData?.icontype} />;

  // If chart has length of result buckets < 16
  // then use the LONG_CHART_COLOR for all the bars in the chart
  const plotlyColorway =
    queriedVizData[fields[lastIndex].name].length < 16 ? PLOTLY_COLOR : [LONG_CHART_COLOR];

  const mergedLayout = {
    colorway: plotlyColorway,
    ...layout,
    ...(layoutConfig.layout && layoutConfig.layout),
    title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
    barmode: dataConfig?.chartStyles?.mode || visualizations.vis.mode,
    font: {
      size: labelSize,
    },
    xaxis: {
      tickangle: tickAngle,
      automargin: true,
    },
    bargap: groupWidth,
    bargroupgap: barWidth,
    legend: {
      ...layout.legend,
      orientation: legendPosition,
    },
    showlegend: showLegend,
  };
  if (dataConfig.thresholds || availabilityConfig.level) {
    const thresholdTraces = {
      x: [],
      y: [],
      mode: 'text',
      text: [],
    };
    const thresholds = dataConfig.thresholds ? dataConfig.thresholds : [];
    const levels = availabilityConfig.level ? availabilityConfig.level : [];

    const mapToLine = (list: ThresholdUnitType[] | AvailabilityUnitType[], lineStyle: any) => {
      return list.map((thr: ThresholdUnitType) => {
        thresholdTraces.x.push(
          queriedVizData[
            !isEmpty(xaxis) ? xaxis[xaxis.length - 1]?.label : fields[lastIndex].name
          ][0]
        );
        thresholdTraces.y.push(thr.value * (1 + 0.06));
        thresholdTraces.text.push(thr.name);
        return {
          type: 'line',
          x0: queriedVizData[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name][0],
          y0: thr.value,
          x1: last(queriedVizData[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name]),
          y1: thr.value,
          name: thr.name || '',
          opacity: 0.7,
          line: {
            color: thr.color,
            width: 3,
            ...lineStyle,
          },
        };
      });
    };

    mergedLayout.shapes = [...mapToLine(thresholds, { dash: 'dashdot' }), ...mapToLine(levels, {})];
    bars = [...bars, thresholdTraces];
  }

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={bars} layout={mergedLayout} config={mergedConfigs} />;
};

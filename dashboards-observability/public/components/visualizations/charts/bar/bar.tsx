/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { isEmpty, last } from 'lodash';
import { Plt } from '../../plotly/plot';
import {
  LONG_CHART_COLOR,
  PLOTLY_COLOR,
  FILLOPACITY_DIV_FACTOR,
} from '../../../../../common/constants/shared';
import { AvailabilityUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { ThresholdUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import { hexToRgb, filterDataConfigParameter } from '../../../event_analytics/utils/utils';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { ConfigListEntry } from '../../../../../common/types/explorer';

export const Bar = ({ visualizations, layout, config }: any) => {
  const DEFAULT_LABEL_SIZE = 10;
  const { vis } = visualizations;
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const lastIndex = fields.length - 1;
  const {
    dataConfig = {},
    layoutConfig = {},
    availabilityConfig = {},
  } = visualizations?.data?.userConfigs;
  const xaxis = dataConfig?.valueOptions?.dimensions
    ? filterDataConfigParameter(dataConfig.valueOptions.dimensions)
    : [];
  const yaxis = dataConfig?.valueOptions?.metrics
    ? filterDataConfigParameter(dataConfig.valueOptions.metrics)
    : [];
  const isVertical = vis.orientation === 'v';
  let bars;
  let valueSeries;
  let valueForXSeries;

  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    valueSeries = [...yaxis];
    valueForXSeries = [...xaxis];
  } else {
    return <EmptyPlaceholder icon={visualizations?.vis?.icontype} />;
  }
  const tickAngle = dataConfig?.chartStyles?.rotateBarLabels || vis.labelangle;
  const lineWidth = dataConfig?.chartStyles?.lineWidth || vis.linewidth;
  const fillOpacity =
    dataConfig?.chartStyles?.fillOpacity !== undefined
      ? dataConfig?.chartStyles?.fillOpacity / FILLOPACITY_DIV_FACTOR
      : vis.fillopacity / FILLOPACITY_DIV_FACTOR;
  const barWidth = 1 - (dataConfig?.chartStyles?.barWidth || vis.barwidth);
  const groupWidth = 1 - (dataConfig?.chartStyles?.groupWidth || vis.groupwidth);
  const showLegend = !(
    dataConfig?.legend?.showLegend && dataConfig.legend.showLegend !== vis.showlegend
  );
  const legendPosition = dataConfig?.legend?.position || vis.legendposition;
  const labelSize = dataConfig?.chartStyles?.labelSize || DEFAULT_LABEL_SIZE;

  const getSelectedColorTheme = (field: any, index: number) =>
    (dataConfig?.colorTheme?.length > 0 &&
      dataConfig.colorTheme.find((colorSelected) => colorSelected.name.name === field.label)
        ?.color) ||
    PLOTLY_COLOR[index % PLOTLY_COLOR.length];

  const prepareData = (valueForXSeries) => {
    return valueForXSeries
      .map((dimension: any) => data[dimension.label])
      ?.reduce((prev, cur) => {
        return prev.map((i, j) => `${i}, ${cur[j]}`);
      });
  };

  const createNameData = (nameData: Array<string | number>, metricName: string) =>
    nameData?.map((el) => el + ',' + metricName);

  // for multiple dimention and metrics with timestamp
  if (valueForXSeries.some((e) => e.type === 'timestamp')) {
    const nameData =
      valueForXSeries.length > 1
        ? valueForXSeries
            .filter((item) => item.type !== 'timestamp')
            .map((dimension) => data[dimension.label])
            .reduce((prev, cur) => {
              return prev.map((i, j) => `${i}, ${cur[j]}`);
            })
        : [];
    const dimensionsData = valueForXSeries
      .filter((item) => item.type === 'timestamp')
      .map((dimension) => data[dimension.label])
      .flat();

    bars = valueSeries
      .map((field: ConfigListEntry, index: number) => {
        const selectedColor = getSelectedColorTheme(field, index);
        return dimensionsData.map((dimension: number | string, j: number) => {
          return {
            x: isVertical
              ? !isEmpty(xaxis)
                ? dimension
                : data[fields[lastIndex].name]
              : data[field.label][j],
            y: isVertical ? data[field.label][j] : dimension,
            type: vis.type,
            marker: {
              color: hexToRgb(selectedColor, fillOpacity),
              line: {
                color: selectedColor,
                width: lineWidth,
              },
            },
            name: nameData.length > 0 ? createNameData(nameData, field.label)[j] : field.label, // dimensionsData[index]+ ',' + field.label,
            orientation: vis.orientation,
          };
        });
      })
      .flat();

    // merging x, y for same names
    bars = Object.values(
      bars?.reduce((acc, { x, y, name, type, marker, orientation, hoverinfo }) => {
        acc[name] = acc[name] || { x: [], y: [], name, type, marker, orientation, hoverinfo };
        acc[name].x.push(x);
        acc[name].y.push(y);
        return acc;
      }, {})
    );
  } else {
    // for multiple dimention and metrics without timestamp
    const dimensionsData = prepareData(valueForXSeries);
    bars = valueSeries.map((field: ConfigListEntry, index: number) => {
      const selectedColor = getSelectedColorTheme(field, index);
      return {
        x: isVertical
          ? !isEmpty(xaxis)
            ? dimensionsData
            : data[fields[lastIndex].name]
          : data[field.name],
        y: isVertical ? data[field.name] : dimensionsData,
        type: vis.type,
        marker: {
          color: hexToRgb(selectedColor, fillOpacity),
          line: {
            color: selectedColor,
            width: lineWidth,
          },
        },
        name: field.name,
        orientation: vis.orientation,
      };
    });
  }

  // If chart has length of result buckets < 16
  // then use the LONG_CHART_COLOR for all the bars in the chart
  const plotlyColorway =
    data[fields[lastIndex].name].length < 16 ? PLOTLY_COLOR : [LONG_CHART_COLOR];
  const mergedLayout = {
    colorway: plotlyColorway,
    ...layout,
    ...(layoutConfig.layout && layoutConfig.layout),
    title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
    barmode: dataConfig?.chartStyles?.mode || visualizations.vis.mode,
    font: {
      size: labelSize,
    },
    ...(isVertical
      ? {
          xaxis: {
            tickangle: tickAngle,
            automargin: true,
          },
        }
      : {
          yaxis: {
            tickangle: tickAngle,
            automargin: true,
          },
        }),
    bargap: groupWidth,
    bargroupgap: barWidth,
    legend: {
      ...layout.legend,
      orientation: legendPosition,
    },
    showlegend: showLegend,
  };
  if (availabilityConfig.level) {
    const thresholdTraces = {
      x: [],
      y: [],
      mode: 'text',
      text: [],
    };

    const levels = availabilityConfig.level ? availabilityConfig.level : [];

    const mapToLine = (list: ThresholdUnitType[] | AvailabilityUnitType[], lineStyle: any) => {
      return list.map((thr: ThresholdUnitType) => {
        thresholdTraces.x.push(
          data[!isEmpty(xaxis) ? xaxis[xaxis.length - 1]?.label : fields[lastIndex].name][0]
        );
        thresholdTraces.y.push(thr.value * (1 + 0.06));
        thresholdTraces.text.push(thr.name);
        return {
          type: 'line',
          x0: data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name][0],
          y0: thr.value,
          x1: last(data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name]),
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

    mergedLayout.shapes = mapToLine(levels, {});
    bars = [...bars, thresholdTraces];
  }
  const mergedConfigs = useMemo(
    () => ({
      ...config,
      ...(layoutConfig.config && layoutConfig.config),
    }),
    [config, layoutConfig.config]
  );

  return <Plt data={bars} layout={mergedLayout} config={mergedConfigs} />;
};

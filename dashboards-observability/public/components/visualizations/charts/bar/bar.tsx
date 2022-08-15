/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { isEmpty, last, some } from 'lodash';
import { Plt } from '../../plotly/plot';
import { LONG_CHART_COLOR, PLOTLY_COLOR } from '../../../../../common/constants/shared';
import { AvailabilityUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_availability';
import { ThresholdUnitType } from '../../../event_analytics/explorer/visualizations/config_panel/config_panes/config_controls/config_thresholds';
import { hexToRgb } from '../../../event_analytics/utils/utils';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { FILLOPACITY_DIV_FACTOR } from '../../../../../common/constants/shared';
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
  // const {
  //   data,
  //   metadata: { fields },
  // } = visualizations.data.rawVizData;
  const lastIndex = fields.length - 1;
  const { dataConfig = {}, layoutConfig = {}, availabilityConfig = {} } = userConfigs;

  // const dataConfigTab =
  //   visualizations.data?.rawVizData?.bar?.dataConfig &&
  //   visualizations.data.rawVizData.bar.dataConfig;

  //   const xaxis = dataConfigTab?.dimensions
  //   ? dataConfigTab.dimensions.filter((item) => item.label)
  //   : [];
  // const yaxis = dataConfigTab?.metrics ? dataConfigTab.metrics.filter((item) => item.label) : [];
  // const barOrientation = dataConfig?.chartStyles?.orientation || vis.orientation;
  // const isVertical = barOrientation === vis.orientation;

  // const xaxis = dataConfigTab?.dimensions
  // ? dataConfigTab.dimensions.filter((item) => item.label)
  // : [];
  // const yaxis = dataConfigTab?.metrics ? dataConfigTab.metrics.filter((item) => item.label) : [];

  // stylings
  const barOrientation = dataConfig.chartStyles?.orientation || visMetaData.orientation;
  const isVertical = barOrientation === visMetaData.orientation;
  const tickAngle = dataConfig.chartStyles?.rotateBarLabels || visMetaData.labelAngle;
  const lineWidth = dataConfig.chartStyles?.lineWidth || visMetaData.lineWidth;
  const fillOpacity =
    dataConfig.chartStyles?.fillOpacity !== undefined
      ? dataConfig.chartStyles?.fillOpacity / FILLOPACITY_DIV_FACTOR
      : visMetaData.fillOpacity / FILLOPACITY_DIV_FACTOR;
  const barWidth = 1 - (dataConfig.chartStyles?.barWidth || visMetaData.barWidth);
  const groupWidth = 1 - (dataConfig.chartStyles?.groupWidth || visMetaData.groupWidth);
  const showLegend = !(
    dataConfig.legend?.showLegend && dataConfig.legend.showLegend !== visMetaData.showLegend
  );
  const legendPosition = dataConfig.legend?.position || visMetaData.legendPosition;
  const labelSize = dataConfig.chartStyles?.labelSize || DEFAULT_LABEL_SIZE;

  let bars, valueSeries, valueForXSeries;

  if (
    isEmpty(queriedVizData) ||
    !Array.isArray(dataConfig.dimensions) ||
    !Array.isArray(dataConfig.metrics) ||
    (dataConfig.breakdowns && !Array.isArray(dataConfig.breakdowns))
  )
    return <EmptyPlaceholder icon={visMetaData?.iconType} />;

  /**
   * Determines x/y axes
   */
  const xaxes = useMemo(() => {
    if (dataConfig.breakdowns) {
      return [
        ...dataConfig.dimensions.filter(
          (dimension) =>
            !some(dataConfig.breakdowns, (breakdown) => breakdown.label === dimension.label)
        ),
      ];
    }
    return [...dataConfig.dimensions];
  }, [dataConfig.dimensions, dataConfig.breakdowns]);

  const yaxes = useMemo(() => {
    return Array.isArray(dataConfig.metrics) ? [...dataConfig.metrics] : [];
  }, [dataConfig.metrics]);

  const getSelectedColorTheme = (field: any, index: number) =>
    (dataConfig.colorTheme?.length > 0 &&
      dataConfig.colorTheme.find((colorSelected) => colorSelected.name.name === field.label)
        ?.color) ||
    PLOTLY_COLOR[index % PLOTLY_COLOR.length];

  // const currentAxis = useMemo(() => {
  //   return queriedVizData[`${yaxis[0].aggregation}(${yaxis[0].name})`].map((_, idx) => {
  //     return xaxis.reduce((accu, xval) => {
  //       console.log('queriedVizData[xval.name]: ', queriedVizData[xval.name], 'idx: ', idx);
  //       return accu + ', ' + queriedVizData[xval.name][idx].name});
  //   });
  // }, [xaxis, yaxis]);

  /**
   * data transformation
   */
  const currentxAxis = useMemo(() => {
    return Array.isArray(queriedVizData[`${yaxes[0].aggregation}(${yaxes[0].name})`])
      ? queriedVizData[`${yaxes[0].aggregation}(${yaxes[0].name})`].map((_, idx) => {
          // let combineXaxis = '';
          const xaxisName = xaxes.map((xaxis) => {
            return queriedVizData[xaxis.name] && queriedVizData[xaxis.name][idx]
              ? queriedVizData[xaxis.name][idx]
              : '';
          });
          // return xaxis.reduce((prev, cur) => {
          //   console.log(prev, cur);
          //   // console.log('queriedVizData[prev.name]: ', queriedVizData[prev.name], 'idx: ', idx, ', ', queriedVizData[cur.name]);
          //   return queriedVizData[prev.name][idx].name + ', ' + queriedVizData[cur.name][idx].name;
          // }, '');
          // return {
          //   name: xaxisName.join(', '),
          //   label: xaxisName.join(', '),
          // };
          return xaxisName.join(', ');
        })
      : [];
  }, [queriedVizData, xaxes, yaxes]);

  if (dataConfig.breakdowns) {
    dataConfig.breakdowns.map(() => {});
  } else {
    
  }

  bars = yaxes?.map((yMetric, idx) => {
    return {
      y: isVertical ? queriedVizData[`${yMetric.aggregation}(${yMetric.name})`] : currentxAxis,
      x: isVertical ? currentxAxis : queriedVizData[`${yMetric.aggregation}(${yMetric.name})`],
      type: visMetaData.type,
      marker: {
        color: getSelectedColorTheme(yMetric, idx),
        line: {
          color: getSelectedColorTheme(yMetric, idx),
          width: lineWidth,
        },
      },
      name: yMetric.name,
      orientation: barOrientation,
    };
  });

  // const tickAngle = dataConfig?.chartStyles?.rotateBarLabels || vis.labelAngle;
  // const lineWidth = dataConfig?.chartStyles?.lineWidth || vis.lineWidth;
  // const fillOpacity =
  //   dataConfig?.chartStyles?.fillOpacity !== undefined
  //     ? dataConfig?.chartStyles?.fillOpacity / FILLOPACITY_DIV_FACTOR
  //     : vis.fillOpacity / FILLOPACITY_DIV_FACTOR;
  // const barWidth = 1 - (dataConfig?.chartStyles?.barWidth || vis.barWidth);
  // const groupWidth = 1 - (dataConfig?.chartStyles?.groupWidth || vis.groupWidth);
  // const showLegend = !(
  //   dataConfig?.legend?.showLegend && dataConfig.legend.showLegend !== vis.showLegend
  // );
  // const legendPosition = dataConfig?.legend?.position || vis.legendPosition;
  // visualizations.data?.rawVizData?.dataConfig?.metrics
  //   ? visualizations.data?.rawVizData?.dataConfig?.metrics
  //   : [];
  // const labelSize = dataConfig?.chartStyles?.labelSize || DEFAULT_LABEL_SIZE;

  // const getSelectedColorTheme = (field: any, index: number) =>
  //   (dataConfig?.colorTheme?.length > 0 &&
  //     dataConfig.colorTheme.find((colorSelected) => colorSelected.name.name === field.label)
  //       ?.color) ||
  //   PLOTLY_COLOR[index % PLOTLY_COLOR.length];

  // const prepareData = (valueForXSeries) => {
  //   return (valueForXSeries.map((dimension: any) => data[dimension.label]))?.reduce(
  //     (prev, cur) => {
  //       console.log('prev: ', prev, ' , cur', cur);
  //       return prev.map((i, j) => `${i}, ${cur[j]}`);
  //     }
  //   );
  // };

  // const createNameData = (nameData, metricName: string) =>
  //   nameData?.map((el) => el + ',' + metricName);

  // for multiple dimention and metrics with timestamp
  // if (valueForXSeries.some((e) => e.type === 'timestamp')) {
  //   const nameData =
  //     valueForXSeries.length > 1
  //       ? (valueForXSeries
  //             .filter((item) => item.type !== 'timestamp')
  //             .map((dimension) => data[dimension.label])
  //         ).reduce((prev, cur) => {
  //           return prev.map((i, j) => `${i}, ${cur[j]}`);
  //         })
  //       : [];

  //   let dimensionsData =
  //     valueForXSeries
  //       .filter((item) => item.type === 'timestamp')
  //       .map((dimension) => data[dimension.label]).flat();

  //   bars = (valueSeries.map((field: any, index: number) => {
  //     const selectedColor = getSelectedColorTheme(field, index);
  //     return dimensionsData.map((dimension: any, j: number) => {
  //       return {
  //         x: isVertical
  //           ? !isEmpty(xaxis)
  //             ? dimension
  //             : data[fields[lastIndex].name]
  //           : data[field.label],
  //         y: isVertical ? data[field.label][j] : dimensionsData, // TODO: orinetation
  //         type: vis.type,
  //         marker: {
  //           color: hexToRgb(selectedColor, fillOpacity),
  //           line: {
  //             color: selectedColor,
  //             width: lineWidth,
  //           },
  //         },
  //         name: nameData.length > 0 ? createNameData(nameData, field.label)[j] : field.label, // dimensionsData[index]+ ',' + field.label,
  //         orientation: barOrientation,
  //       };
  //     });
  //   })).flat();

  //   // merging x, y for same names
  //   bars = Object.values(
  //     bars?.reduce((acc, { x, y, name, type, marker, orientation }) => {
  //       acc[name] = acc[name] || { x: [], y: [], name, type, marker, orientation };
  //       acc[name].x.push(x);
  //       acc[name].y.push(y);

  //       return acc;
  //     }, {})
  //   );
  // } else {
  //   // for multiple dimention and metrics without timestamp
  //   const dimensionsData = prepareData(valueForXSeries);
  //   const metricsData = prepareData(valueSeries);
  //   // const dimensionsData = [];
  //   // const metricsData =[];
  //   bars = valueSeries.map((field: any, index: number) => {
  //     const selectedColor = getSelectedColorTheme(field, index);
  //     return {
  //       x: isVertical
  //         ? !isEmpty(xaxis)
  //           ? dimensionsData
  //           : data[fields[lastIndex].name]
  //         : data[field.name],
  //       y: isVertical ? data[field.name] : metricsData, // TODO: add if isempty true
  //       type: vis.type,
  //       marker: {
  //         color: hexToRgb(selectedColor, fillOpacity),
  //         line: {
  //           color: selectedColor,
  //           width: lineWidth,
  //         },
  //       },
  //       name: field.name,
  //       orientation: barOrientation,
  //     };
  //   });
  //   console.log('bars: ', bars);
  // }

  // If chart has length of result buckets < 16
  // then use the LONG_CHART_COLOR for all the bars in the chart

  const plotlyColorway =
    queriedVizData[fields[lastIndex].name].length < 16 ? PLOTLY_COLOR : [LONG_CHART_COLOR];
  const mergedLayout = {
    colorway: plotlyColorway,
    ...layout,
    ...(layoutConfig.layout && layoutConfig.layout),
    title: dataConfig.panelOptions?.title || layoutConfig.layout?.title || '',
    barmode: dataConfig.chartStyles?.mode || visualizations.vis.mode,
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

  // const plotlyColorway =
  //   data[fields[lastIndex].name].length < 16 ? PLOTLY_COLOR : [LONG_CHART_COLOR];
  // const mergedLayout = {
  //   colorway: plotlyColorway,
  //   ...layout,
  //   ...(layoutConfig.layout && layoutConfig.layout),
  //   title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
  //   barmode: dataConfig?.chartStyles?.mode || visualizations.vis.mode,
  //   font: {
  //     size: labelSize,
  //   },
  //   xaxis: {
  //     tickangle: tickAngle,
  //     automargin: true,
  //   },
  //   bargap: groupWidth,
  //   bargroupgap: barWidth,
  //   legend: {
  //     ...layout.legend,
  //     orientation: legendPosition,
  //   },
  //   showlegend: showLegend,
  // };

  // if (dataConfig.thresholds || availabilityConfig.level) {
  //   const thresholdTraces = {
  //     x: [],
  //     y: [],
  //     mode: 'text',
  //     text: [],
  //   };
  //   const thresholds = dataConfig.thresholds ? dataConfig.thresholds : [];
  //   const levels = availabilityConfig.level ? availabilityConfig.level : [];

  //   const mapToLine = (list: ThresholdUnitType[] | AvailabilityUnitType[], lineStyle: any) => {
  //     return list.map((thr: ThresholdUnitType) => {
  //       thresholdTraces.x.push(
  //         data[!isEmpty(xaxis) ? xaxis[xaxis.length - 1]?.label : fields[lastIndex].name][0]
  //       );
  //       thresholdTraces.y.push(thr.value * (1 + 0.06));
  //       thresholdTraces.text.push(thr.name);
  //       return {
  //         type: 'line',
  //         x0: data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name][0],
  //         y0: thr.value,
  //         x1: last(data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name]),
  //         y1: thr.value,
  //         name: thr.name || '',
  //         opacity: 0.7,
  //         line: {
  //           color: thr.color,
  //           width: 3,
  //           ...lineStyle,
  //         },
  //       };
  //     });
  //   };

  //   mergedLayout.shapes = [...mapToLine(thresholds, { dash: 'dashdot' }), ...mapToLine(levels, {})];
  //   bars = [...bars, thresholdTraces];
  // }

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  return <Plt data={bars} layout={mergedLayout} config={mergedConfigs} />;
};

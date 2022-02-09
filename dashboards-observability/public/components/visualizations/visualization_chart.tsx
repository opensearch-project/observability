/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { take, merge, isEmpty } from 'lodash';

interface IVisualizationChart {}

export const VisualizationChart = ({ visualizations }: IVisualizationChart) => {
  const { data, vis } = visualizations;
  const { defaultAxes } = data;
  const {
    metadata: { fields },
  } = visualizations?.data?.rawVizData;
  // const lastIndex = fields.length - 1;
  const { layout = {}, config = {} } = visualizations?.data?.customVizConfigs;
  const Visualization = visualizations?.vis?.component;

  const finalFigureConfig = useMemo(() => {
    return {
      ...vis.visConfig?.config,
      ...config,
    };
  }, [config, vis]);

  const finalFigureLayout = useMemo(() => {
    return {
      ...vis.visConfig?.layout,
      ...layout,
    };
  }, [layout, vis]);

  // const valueAxes = useMemo(() => {
  //   const valueSeries =
  //     defaultAxes[vis.valueSeries] && defaultAxes[[vis.valueSeries]]?.length > 0
  //       ? defaultAxes[[vis.valueSeries]]
  //       : take(fields, lastIndex > 0 ? lastIndex : 1);
  //   // if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
  //   //   valueSeries =
  //   // }
  //   return valueSeries;
  // }, [visualizations]);

  // let valueAxes =
  //   defaultAxes[vis.valueSeries] && defaultAxes[[vis.valueSeries]]?.length > 0
  //     ? defaultAxes[[vis.valueSeries]]
  //     : take(fields, lastIndex > 0 ? lastIndex : 1);

  // if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
  //   valueAxes = fields.filter((field) => {
  //     if (vis?.orientation !== 'h') {
  //       return (
  //         field.name !== xaxis[0].label &&
  //         !isEmpty(yaxis.filter((item) => item.label === field.name))
  //       );
  //     } else {
  //       return (
  //         field.name !== yaxis[0].label &&
  //         !isEmpty(xaxis.filter((item) => item.label === field.name))
  //       );
  //     }
  //   });
  // }

  // let valueSeries;
  // if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
  //   valueSeries = [
  //     ...visualizations?.data?.customVizConfigs[vis.seriesAxis].map((item) => ({
  //       ...item,
  //       name: item.label,
  //     })),
  //   ];
  // } else {
  //   valueSeries = defaultAxes.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1);
  // }

  return (
    <Visualization
      visualizations={visualizations}
      layout={finalFigureLayout}
      config={finalFigureConfig}
    />
  );
};

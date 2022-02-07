/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';

interface IVisualizationChart {}

export const VisualizationChart = ({ visualizations }: IVisualizationChart) => {
  // const { data, vis } = visualizations;
  // const { defaultAxes } = data;
  // const {
  //   metadata: { fields },
  // } = visualizations?.data?.rawResponse;
  // const lastIndex = fields.length - 1;
  // const { xaxis, yaxis } = visualizations?.data?.customVizConfigs;
  const Visualization = visualizations?.vis?.component;

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
  return <Visualization visualizations={visualizations} />;
};

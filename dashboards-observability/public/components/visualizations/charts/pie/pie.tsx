/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { take, merge, isEmpty } from 'lodash';
import { Plt } from '../../plotly/plot';
import { PLOTLY_COLOR } from '../../../../../common/constants/shared';

export const Pie = ({ visualizations, dispatch }: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawResponse;
  const { defaultAxes } = visualizations.data.defaultAxes;
  const {
    xaxis = null,
    yaxis = null,
    layout = {},
    config = {},
  } = visualizations.data.customVizConfigs;
  const pieLength = fields.length - 1;
  let filteredFields =
    defaultAxes?.yaxis && defaultAxes?.yaxis?.length > 0
      ? defaultAxes.yaxis
      : take(fields, pieLength > 0 ? pieLength : 1);

  // if (isEmpty(yaxis)) {

  // }
  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    filteredFields = fields.filter((field) => {
      // if (isVertical) {
      return (
        field.name !== xaxis[0].label && !isEmpty(yaxis.filter((item) => item.label === field.name))
      );
      // } else {
      // return (
      //   field.name !== yaxis[0].label && !isEmpty(xaxis.filter((item) => item.label === field.name))
      // );
      // }
    });
  }

  // let pies = [];

  // if (isEmpty(yaxis)) {
  //   const pieLabels = xaxis.map((labelField) => labelField.label);
  //   pies = pieLabels.map((labelField) => {
  //     return {
  //       labels:
  //     };
  //   });
  // }

  const pies = take(filteredFields, pieLength).map((field: any) => {
    return {
      // values: data[field.name],
      // labels: data[fields[pieLength].name],
      labels: data[xaxis ? xaxis[0]?.label : fields[pieLength].name],
      values: data[field.name],
      type: 'pie',
      name: field.name,
    };
  });

  return (
    <Plt
      data={pies}
      layout={{
        colorway: PLOTLY_COLOR,
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        xaxis: {
          fixedrange: true,
          showgrid: false,
          visible: true,
        },
        yaxis: {
          fixedrange: true,
          showgrid: false,
          visible: true,
        },
        ...layout,
      }}
      config={{
        barmode: 'pie',
        xaxis: {
          automargin: true,
        },
        yaxis: {
          automargin: true,
        },
        ...config,
      }}
      dispatch={dispatch}
    />
  );
};

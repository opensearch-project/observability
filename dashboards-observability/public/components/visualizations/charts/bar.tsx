/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import React from 'react';

import { take, merge } from 'lodash';
import { Plt } from '../plotly/plot';
import { PlotlyColorWay } from '../../../../common/constants/shared';

export const Bar = ({ visualizations, barConfig = {}, layoutConfig = {} }: any) => {
  const {
    data,
    metadata: { fields },
  } = visualizations;
  const stackLength = fields.length - 1;
  let marker = {};
  if (stackLength == 1) {
    marker = {
      color: data[fields[stackLength].name].map((_: string, index: number) => {
        return PlotlyColorWay[index % PlotlyColorWay.length];
      }),
    };
  }
  const barValues = take(fields, stackLength > 0 ? stackLength : 1).map((field: any) => {
    return {
      x: barConfig.orientation !== 'h' ? data[fields[stackLength].name] : data[field.name],
      y: barConfig.orientation !== 'h' ? data[field.name] : data[fields[stackLength].name],
      type: 'bar',
      marker: marker,
      name: field.name,
      ...barConfig,
    };
  });

  const barLayoutConfig = merge(
    {
      xaxis: {
        automargin: true,
      },
      yaxis: {
        automargin: true,
      },
    },
    layoutConfig
  );

  return (
    <Plt
      data={barValues}
      layout={{
        colorway: PlotlyColorWay,
        xaxis: {
          showgrid: false,
          visible: true,
        },
        yaxis: {
          showgrid: false,
          visible: true,
        },
        ...barLayoutConfig,
      }}
      config={barConfig}
    />
  );
};

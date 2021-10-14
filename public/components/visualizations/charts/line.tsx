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
import {
  take,
  merge
} from 'lodash';
import { Plt } from '../plotly/plot';

export const Line = ({
  visualizations,
  lineConfig = {},
  layoutConfig = {},
}: any) => {

  const { data, metadata: { fields, } } = visualizations;
  const lineLength = fields.length - 1;
  const lineValues = take(fields, lineLength).map((field: any) => {
    return {
      x: data[fields[lineLength].name],
      y: data[field.name],
      type: 'line',
      name: field.name
    };
  });

  const config = {
    barmode: 'line',
    xaxis: {
      automargin: true
    }
  };
  const lineLayoutConfig = merge(config, layoutConfig);
  
  return (
    <Plt 
      data={ lineValues }
      layout={{
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
        ...lineLayoutConfig
      }}
      config={ lineConfig }
    />  
  );
};

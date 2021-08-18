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
import { Plt } from '../plotly/plot';

export const Line = ({
  xvalues,
  yvalues,
  name,
  layoutConfig,
}: any) => {
  
  return (
    <Plt 
      data={[
        {
          x: xvalues,
          y: yvalues,
          type: 'lines',
          name,
        }
      ]}
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
          visible: true
        },
        ...layoutConfig
      }}
    />  
  );
};
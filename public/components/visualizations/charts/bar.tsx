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

export const Bar = ({
  xvalues,
  yvalues,
  xaxisConf,
  yaxisConf,
  name,
  layoutConfig,
  ...rest
}: any) => {
  return (
    <Plt 
      data={[
        {
          marker: {
            color: '#006BB4'
          },
          x: xvalues,
          y: yvalues,
          type: 'bar',
          name,
        }
      ]}
      layout={{ 
        xaxis: {
          showgrid: false,
          visible: true,
          ...xaxisConf
        },
        yaxis: {
          showgrid: false,
          visible: true,
          ...yaxisConf,
        },
        ...layoutConfig
      }}
      { ...rest }
    />  
  );
};
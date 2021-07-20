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
import { Plt } from '../plotly/plot_template';

export const Bar = (props: any) => {
  return (
    <Plt 
      data={[
        {
          marker: {
            color: '#006BB4'
          },
          x: ['13:00:00', '13:00:30', '13:01:00', '13:01:30', '13:02:00', '13:02:30','13:03:00', '13:03:30', '13:04:00', '13:04:30', '13:05:00', '13:05:30', '13:06:00', '13:06:30', '13:07:00'],
          y: [12, 2, 7, 6, 0, 0, 8, 28, 47, 33, 13, 10, 11, 27, 32],
          type: 'bar',
          name: 'Count Distribution'
        }
      ]}
      layout={{ 
        width: '100%', 
        height: '100%',
        xaxis: {
          fixedrange: true,
          showgrid: false,
          visible: true
        },
        yaxis: {
          fixedrange: true,
          showgrid: false,
          visible: true
        },
      }}
    />  
  );
};
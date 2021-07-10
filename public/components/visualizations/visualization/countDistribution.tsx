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

export const CountDistribution = (props: any) => {
  return (
    <Plt 
      data={[
        {
          marker: {
            color: '#006BB4'
          },
          x: [1, 2, 3, 6, 0, 4, 7],
          y: [2, 5, 3, 6, 0, 4, 7],
          type: 'bar'
        }
      ]}
      layout={{ width: '100%', height: 200 }}
    />  
  );
};
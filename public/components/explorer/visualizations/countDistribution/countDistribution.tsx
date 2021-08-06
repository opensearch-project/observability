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
import { Bar } from '../../../visualizations/charts/bar';

export const CountDistribution = (props: any) => {

  // hardcode for now
  const xvalues = ['13:00:00', '13:00:30', '13:01:00', '13:01:30', '13:02:00', '13:02:30','13:03:00', '13:03:30', '13:04:00', '13:04:30', '13:05:00', '13:05:30', '13:06:00', '13:06:30', '13:07:00'];
  const yvalues = [12, 2, 7, 6, 0, 0, 8, 28, 47, 33, 13, 10, 11, 27, 32];
  const layout = {
    showlegend: true,
    margin: {
      l: 60,
      r: 10,
      b: 15,
      t: 30,
      pad: 0,
    },
    height: 220
  };

  return (
    <Bar 
      xvalues={ xvalues }
      yvalues={ yvalues }
      name="Event counts"
      layoutConfig={ layout }
    />
  );
};
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

export const CountDistribution = ({
  countDistribution
}: any) => {

  if (!countDistribution) return null;

  const data = countDistribution.data;
  const meta = countDistribution.metadata;

  console.log('countDistribution inside: ', countDistribution);
  // console.log('meta: ', meta);
  const xkey = meta?.xfield?.name;
  const ykey = meta?.yfield?.name;
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

  if (!xkey || !ykey) {
    return null;
  }

  return (
    <Bar 
      xvalues={ data[xkey] || [] }
      yvalues={ data[ykey] || [] }
      name="Event counts"
      layoutConfig={ layout }
    />
  );
};
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

import { Plt } from '../../plotly/plot';

export const TreeMap = ({ visualizations, layout, config }) => {
  const labels = ['Eve', 'Cain', 'Seth', 'Enos', 'Noam', 'Abel', 'Awan', 'Enoch', 'Azura'];
  const parents = ['', 'Eve', 'Eve', 'Seth', 'Seth', 'Eve', 'Eve', 'Awan', 'Eve'];
  const treemapData = [
    {
      type: 'treemap',
      labels,
      parents,
      values: [10, 14, 12, 10, 2, 6, 6, 1, 4],
      textinfo: 'label+value+percent parent+percent entry',
      domain: { x: [0, 0.48] },
      outsidetextfont: { size: 20, color: '#377eb8' },
      marker: { line: { width: 2 } },
      pathbar: { visible: false },
    },
    {
      type: 'treemap',
      branchvalues: 'total',
      labels,
      parents,
      domain: { x: [0.52, 1] },
      values: [65, 14, 12, 10, 2, 6, 6, 1, 4],
      textinfo: 'label+value+percent parent+percent entry',
      outsidetextfont: { size: 20, color: '#377eb8' },
      marker: { line: { width: 2 } },
      pathbar: { visible: false },
    },
  ];
  const finalLayout = {
    annotations: [
      {
        showarrow: false,
        text: 'branchvalues: <b>remainder</b>',
        x: 0.25,
        xanchor: 'center',
        y: 1.1,
        yanchor: 'bottom',
      },
      {
        showarrow: false,
        text: 'branchvalues: <b>total</b>',
        x: 0.75,
        xanchor: 'center',
        y: 1.1,
        yanchor: 'bottom',
      },
    ],
  };
  return <Plt data={treemapData} layout={finalLayout} config={config} />;
};

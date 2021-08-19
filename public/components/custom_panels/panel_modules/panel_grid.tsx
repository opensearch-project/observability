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

import React, { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { VisualizationPanel } from './visualization_panel';

// HOC container to provide dynamic width for Grid layout
const ResponsiveGridLayout = WidthProvider(Responsive);

type VisualizationType = {
  id: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  fromTime?: string;
  toTime?: string;
};

type Props = {
  panelVisualizations: VisualizationType[];
  editMode: boolean;
  visualizationsData: [];
};

export const PanelGrid = ({ panelVisualizations, editMode, visualizationsData }: Props) => {
  const [layout, setLayout] = useState([]);
  // const [data, setData] = useState([]);

  useEffect(() => {
    let newLayout = [];
    panelVisualizations.map((panelVisualization) => {
      newLayout.push({
        i: panelVisualization.id,
        x: panelVisualization.x,
        y: panelVisualization.y,
        w: panelVisualization.w,
        h: panelVisualization.h,
        static: !editMode,
      });
    });
    setLayout(newLayout);
  }, [panelVisualizations, editMode]);

  const layoutChanged = () => {
    window.dispatchEvent(new Event('resize'));
  };

  return (
    <ResponsiveGridLayout
      layouts={{ lg: layout, md: layout, sm: layout }}
      style={{ minWidth: '100%', maxWidth: '100%' }}
      className="layout"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 12, sm: 12, xs: 1, xxs: 1 }}
      onLayoutChange={layoutChanged}
    >
      {panelVisualizations.map((panelVisualization: VisualizationType, index: number) => (
        <div key={panelVisualization.id}>
          <VisualizationPanel
            editMode={editMode}
            visualizationId={panelVisualization.id}
            visualizationTitle={panelVisualization.title}
            data={[visualizationsData[index]]}
          />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

//   data-grid={{
//     i: panelVisualization.id,
//     x: panelVisualization.x,
//     y: panelVisualization.y,
//     w: panelVisualization.w,
//     h: panelVisualization.h,
//     static: !editMode,
//   }}
// const layout = [
//   { i: '1', x: 0, y: 0, w: 4, h: 2, static: !editMode },
//   { i: '2', x: 4, y: 0, w: 4, h: 2, static: !editMode },
//   { i: '3', x: 8, y: 0, w: 4, h: 2, static: !editMode },
//   { i: '4', x: 0, y: 2, w: 6, h: 2, static: !editMode },
//   { i: '5', x: 7, y: 2, w: 6, h: 2, static: !editMode },
// ];

// const data = [
//   {
//     x: [1, 2, 3],
//     y: [2, 6, 3],
//     type: 'scatter',
//     mode: 'lines+markers',
//     marker: { color: 'red' },
//   },
//   {
//     values: [19, 26, 55],
//     labels: ['Residential', 'Non-Residential', 'Utility'],
//     type: 'pie',
//   },
//   {
//     x: [1, 2, 3, 4],
//     y: [12, 9, 15, 12],
//     mode: 'lines+markers',
//     marker: {
//       color: 'rgb(128, 0, 128)',
//       size: 8,
//     },
//     line: {
//       color: 'rgb(128, 0, 128)',
//       width: 1,
//     },
//   },
//   { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
//   {
//     x: [1, 2, 3, 4],
//     y: [10, 11, 12, 13],
//     text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
//     mode: 'markers',
//     marker: {
//       color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
//       size: [40, 60, 80, 100],
//     },
//   },
// ];

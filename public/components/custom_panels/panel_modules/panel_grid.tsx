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

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import useObservable from 'react-use/lib/useObservable';
import { CoreStart } from '../../../../../../src/core/public';
import { VisualizationPanel } from './visualization_container';

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
  chrome: CoreStart['chrome'];
  panelVisualizations: VisualizationType[];
  editMode: boolean;
  visualizationsData: [];
};

export const PanelGrid = ({ chrome, panelVisualizations, editMode, visualizationsData }: Props) => {
  const [layout, setLayout] = useState([]);
  const isLocked = useObservable(chrome.getIsNavDrawerLocked$());

 // Reset Size of Visualizations when layout is changed
  const layoutChanged = () => {
    window.dispatchEvent(new Event('resize'));
  };

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

  // Reset Size of Panel Grid when Nav Dock is Locked
  useEffect(() => {
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }, [isLocked]);

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

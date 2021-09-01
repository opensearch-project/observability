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

import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import useObservable from 'react-use/lib/useObservable';
import { CoreStart } from '../../../../../../src/core/public';
import PPLService from '../../../services/requests/ppl';
import { VisualizationContainer } from './visualization_container';
import { VisualizationType } from '../../../../common/constants/custom_panels';

// HOC container to provide dynamic width for Grid layout
const ResponsiveGridLayout = WidthProvider(Responsive);

/*
* PanelGrid - This module is places all visualizations in react-grid-layout
* chrome: CoreStart['chrome'];
* panelVisualizations: VisualizationType[];
* editMode: boolean;
* pplService: PPLService;
* startTime: string;
* endTime: string;
* onRefresh: boolean;
*/

type Props = {
  chrome: CoreStart['chrome'];
  panelVisualizations: VisualizationType[];
  editMode: boolean;
  pplService: PPLService;
  startTime: string;
  endTime: string;
  onRefresh: boolean;
  cloneVisualization: (newVisualizationTitle: string, pplQuery: string, newVisualizationType: string) => void;
  deleteVisualization: (visualizationId: string, visualizationName: string)=> void;
};

export const PanelGrid = ({
  chrome,
  panelVisualizations,
  editMode,
  pplService,
  startTime,
  endTime,
  onRefresh,
  cloneVisualization,
  deleteVisualization,
}: Props) => {
  const [layout, setLayout] = useState([]);
  const [editedLayout, setEditedLayout] = useState([]);
  const isLocked = useObservable(chrome.getIsNavDrawerLocked$());

  // Reset Size of Visualizations when layout is changed
  const layoutChanged = (currentLayout: Layout[], allLayouts: Layouts) => {
    window.dispatchEvent(new Event('resize'));
    setEditedLayout(currentLayout);
  };

  // Reload the Layout
  const reloadLayout = () => {
    const tempLayout = panelVisualizations.map((panelVisualization) => {
      return {
        i: panelVisualization.id,
        x: panelVisualization.x,
        y: panelVisualization.y,
        w: panelVisualization.w,
        h: panelVisualization.h,
        static: !editMode,
      };
    });
    setLayout(tempLayout);
  };

  // Update layout whenever user edit gets completed
  useEffect(() => {
    if (editMode) {
      reloadLayout();
    } else {
      const newLayout = editedLayout.map((element) => {
        return { ...element, static: true };
      });
      setLayout(newLayout);
      // NOTE: need to add backend call to change visualization sizes
    }
  }, [editMode]);

  // Update layout whenever visualizations are updated
  useEffect(() => {
    reloadLayout();
  }, [panelVisualizations]);

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
          <VisualizationContainer
            editMode={editMode}
            visualizationId={panelVisualization.id}
            visualizationTitle={panelVisualization.title}
            query={panelVisualization.query}
            type={panelVisualization.type}
            pplService={pplService}
            fromTime={startTime}
            toTime={endTime}
            onRefresh={onRefresh}
            cloneVisualization={cloneVisualization}
            deleteVisualization={deleteVisualization}
          />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

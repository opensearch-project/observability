/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import PPLService from 'public/services/requests/ppl';
import React, { useEffect, useState } from 'react';
import { CoreStart } from '../../../../../../src/core/public';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import { useObservable } from 'react-use';
import { VisualizationContainer } from '../../custom_panels/panel_modules/visualization_container';
import { MetricType } from '../../../../common/types/metrics';
import _ from 'lodash';
import { mergeLayoutAndVisualizations } from '../../custom_panels/helpers/utils';
import { getVizContainerProps } from '../../visualizations/charts/helpers';

import './metrics_grid.scss';

// HOC container to provide dynamic width for Grid layout
const ResponsiveGridLayout = WidthProvider(Responsive);

interface MetricsGridProps {
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  panelVisualizations: MetricType[];
  setPanelVisualizations: React.Dispatch<React.SetStateAction<MetricType[]>>;
  editMode: boolean;
  pplService: PPLService;
  startTime: string;
  endTime: string;
  setStartTime: any;
  setEndTime: any;
  moveToEvents: (savedVisualizationId: string) => any;
  onRefresh: boolean;
  editActionType: string;
  spanParam: string;
}

export const MetricsGrid = ({
  http,
  chrome,
  panelVisualizations,
  setPanelVisualizations,
  editMode,
  pplService,
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  moveToEvents,
  onRefresh,
  editActionType,
  spanParam,
}: MetricsGridProps) => {
  const [currentLayout, setCurrentLayout] = useState<Layout[]>([]);
  const [postEditLayout, setPostEditLayout] = useState<Layout[]>([]);
  const [gridData, setGridData] = useState(panelVisualizations.map(() => <></>));
  const isLocked = useObservable(chrome.getIsNavDrawerLocked$());

  // Reset Size of Visualizations when layout is changed
  const layoutChanged = (currLayouts: Layout[], allLayouts: Layouts) => {
    window.dispatchEvent(new Event('resize'));
    setPostEditLayout(currLayouts);
  };

  const loadVizComponents = () => {
    const gridDataComps = panelVisualizations.map((panelVisualization: MetricType, index) =>
      panelVisualization.metricType === 'savedCustomMetric' ? (
        <VisualizationContainer
          key={panelVisualization.id}
          http={http}
          editMode={editMode}
          visualizationId={panelVisualization.id}
          savedVisualizationId={panelVisualization.savedVisualizationId}
          pplService={pplService}
          fromTime={startTime}
          toTime={endTime}
          onRefresh={onRefresh}
          onEditClick={moveToEvents}
          usedInNotebooks={true}
          pplFilterValue=""
          removeVisualization={removeVisualization}
          spanParam={spanParam}
        />
      ) : (
        <>
          <VisualizationContainer
            key={panelVisualization.id}
            http={http}
            editMode={editMode}
            visualizationId={panelVisualization.id}
            savedVisualizationId={panelVisualization.savedVisualizationId}
            pplService={pplService}
            fromTime={startTime}
            toTime={endTime}
            onRefresh={onRefresh}
            onEditClick={moveToEvents}
            usedInNotebooks={true}
            pplFilterValue=""
            removeVisualization={removeVisualization}
            catalogVisualization={true}
            spanParam={spanParam}
          />
        </>
      )
    );
    setGridData(gridDataComps);
  };

  // Reload the Layout
  const reloadLayout = () => {
    const tempLayout: Layout[] = panelVisualizations.map((panelVisualization) => {
      return {
        i: panelVisualization.id,
        x: panelVisualization.x,
        y: panelVisualization.y,
        w: panelVisualization.w,
        h: panelVisualization.h,
        static: !editMode,
      } as Layout;
    });
    setCurrentLayout(tempLayout);
  };

  // remove visualization from panel in edit mode
  const removeVisualization = (visualizationId: string) => {
    const newVisualizationList = _.reject(panelVisualizations, {
      id: visualizationId,
    });
    mergeLayoutAndVisualizations(postEditLayout, newVisualizationList, setPanelVisualizations);
  };

  // Save Visualization Layouts when not in edit mode anymore (after users saves the panel)
  const saveVisualizationLayouts = async (panelID: string, visualizationParams: any) => {};

  // Update layout whenever user edit gets completed
  useEffect(() => {
    if (editMode) {
      reloadLayout();
      loadVizComponents();
    }
  }, [editMode]);

  useEffect(() => {
    if (editActionType === 'save') {
      // const visualizationParams = postEditLayout.map((layout) =>
      //   _.omit(layout, ['static', 'moved', 'isDraggable','isResizable', 'minW','minH','maxW','maxH'])
      // );
      // saveVisualizationLayouts(panelId, visualizationParams);
      console.log('click saved', postEditLayout);
      mergeLayoutAndVisualizations(postEditLayout, panelVisualizations, setPanelVisualizations);
      // setPanelVisualizations(visualizationParams);
      // if (updateAvailabilityVizId) {
      //   updateAvailabilityVizId(panelVisualizations);
      // }
    }
  }, [editActionType]);

  // Update layout whenever visualizations are updated
  useEffect(() => {
    reloadLayout();
    loadVizComponents();
  }, [panelVisualizations]);

  // Reset Size of Panel Grid when Nav Dock is Locked
  useEffect(() => {
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }, [isLocked]);

  useEffect(() => {
    loadVizComponents();
  }, [onRefresh]);

  useEffect(() => {
    loadVizComponents();
  }, []);

  return (
    <ResponsiveGridLayout
      layouts={{ lg: currentLayout, md: currentLayout, sm: currentLayout }}
      className="layout full-width"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 12, sm: 12, xs: 1, xxs: 1 }}
      onLayoutChange={layoutChanged}
    >
      {panelVisualizations.map((panelVisualization: MetricType, index) => (
        <div key={panelVisualization.id}>{gridData[index]}</div>
      ))}
    </ResponsiveGridLayout>
  );
};

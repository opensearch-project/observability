/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */

import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import useObservable from 'react-use/lib/useObservable';
import { CoreStart } from '../../../../../../../src/core/public';
import PPLService from '../../../../services/requests/ppl';
import { VisualizationContainer } from '../visualization_container';
import { VisualizationType } from '../../../../../common/types/custom_panels';
import { CUSTOM_PANELS_API_PREFIX } from '../../../../../common/constants/custom_panels';
import './panel_grid.scss';
import { mergeLayoutAndVisualizations } from '../../helpers/utils';

// HOC container to provide dynamic width for Grid layout
const ResponsiveGridLayout = WidthProvider(Responsive);

/*
 * PanelGrid - This module is places all visualizations in react-grid-layout
 *
 * Props taken in as params are:
 * http: http core service;
 * chrome: chrome core service;
 * panelId: OpenPanel Id
 * panelVisualizations: list of panel visualizations
 * setPanelVisualizations: function to set panel visualizations
 * editMode: boolean to check if the panel is in edit mode
 * pplService: ppl requestor service
 * startTime: start time in date filter
 * endTime: end time in date filter
 * onRefresh: boolean value to trigger refresh of visualizations
 * cloneVisualization: function to clone a visualization in panel
 * pplFilterValue: string with panel PPL filter value
 * showFlyout: function to show the flyout
 * editActionType: Type of action done while clicking the edit button
 */

interface PanelGridProps {
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  panelId: string;
  panelVisualizations: VisualizationType[];
  setPanelVisualizations: React.Dispatch<React.SetStateAction<VisualizationType[]>>;
  editMode: boolean;
  pplService: PPLService;
  startTime: string;
  endTime: string;
  onEditClick: (savedVisualizationId: string) => any;
  onRefresh: boolean;
  cloneVisualization: (visualzationTitle: string, savedVisualizationId: string) => void;
  pplFilterValue: string;
  showFlyout: (isReplacement?: boolean | undefined, replaceVizId?: string | undefined) => void;
  editActionType: string;
  setEditVizId?: any;
}

export const PanelGrid = (props: PanelGridProps) => {
  const {
    http,
    chrome,
    panelId,
    panelVisualizations,
    setPanelVisualizations,
    editMode,
    pplService,
    startTime,
    endTime,
    onEditClick,
    onRefresh,
    cloneVisualization,
    pplFilterValue,
    showFlyout,
    editActionType,
  } = props;
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
    const gridDataComps = panelVisualizations.map(
      (panelVisualization: VisualizationType, index) => (
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
          onEditClick={onEditClick}
          cloneVisualization={cloneVisualization}
          pplFilterValue={pplFilterValue}
          showFlyout={showFlyout}
          removeVisualization={removeVisualization}
        />
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
  const saveVisualizationLayouts = async (panelID: string, visualizationParams: any) => {
    return http
      .put(`${CUSTOM_PANELS_API_PREFIX}/visualizations/edit`, {
        body: JSON.stringify({
          panelId: panelID,
          visualizationParams,
        }),
      })
      .then(async (res) => {
        setPanelVisualizations(res.visualizations);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Update layout whenever user edit gets completed
  useEffect(() => {
    if (editMode) {
      reloadLayout();
      loadVizComponents();
    }
  }, [editMode]);

  useEffect(() => {
    if (editActionType === 'save') {
      const visualizationParams = postEditLayout.map((layout) =>
        _.omit(layout, ['static', 'moved'])
      );
      saveVisualizationLayouts(panelId, visualizationParams);
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
      {panelVisualizations.map((panelVisualization: VisualizationType, index) => (
        <div key={panelVisualization.id}>{gridData[index]}</div>
      ))}
    </ResponsiveGridLayout>
  );
};

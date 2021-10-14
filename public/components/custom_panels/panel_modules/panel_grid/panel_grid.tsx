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
import { CoreStart } from '../../../../../../../src/core/public';
import PPLService from '../../../../services/requests/ppl';
import { VisualizationContainer } from '../visualiation_container';
import { VisualizationType } from '../../../../../common/types/custom_panels';
import { CUSTOM_PANELS_API_PREFIX } from '../../../../../common/constants/custom_panels';
import './panel_grid.scss';

// HOC container to provide dynamic width for Grid layout
const ResponsiveGridLayout = WidthProvider(Responsive);

/*
 * PanelGrid - This module is places all visualizations in react-grid-layout
 *
 * Props taken in as params are:
 * http: http core service;
 * chrome: chrome core service;
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
 * removeVisualization: function to remove all the visualizations
 */

type Props = {
  http: CoreStart['http'];
  chrome: CoreStart['chrome'];
  panelId: string;
  panelVisualizations: VisualizationType[];
  setPanelVisualizations: React.Dispatch<React.SetStateAction<VisualizationType[]>>;
  editMode: boolean;
  pplService: PPLService;
  startTime: string;
  endTime: string;
  onRefresh: boolean;
  cloneVisualization: (
    newVisualizationTitle: string,
    pplQuery: string,
    newVisualizationType: string,
    newVisualizationTimeField: string
  ) => void;
  pplFilterValue: string;
  showFlyout: (isReplacement?: boolean | undefined, replaceVizId?: string | undefined) => void;
  removeVisualization: (visualizationId: string) => void;
};

export const PanelGrid = ({
  http,
  chrome,
  panelId,
  panelVisualizations,
  setPanelVisualizations,
  editMode,
  pplService,
  startTime,
  endTime,
  onRefresh,
  cloneVisualization,
  pplFilterValue,
  showFlyout,
  removeVisualization,
}: Props) => {
  const [layout, setLayout] = useState<Layout[]>([]);
  const [editedLayout, setEditedLayout] = useState<Layout[]>([]);
  const isLocked = useObservable(chrome.getIsNavDrawerLocked$());

  // Reset Size of Visualizations when layout is changed
  const layoutChanged = (currentLayout: Layout[], allLayouts: Layouts) => {
    window.dispatchEvent(new Event('resize'));
    setEditedLayout(currentLayout);
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
    setLayout(tempLayout);
  };

  const saveVisualizationLayouts = async (panelId: string, visualizationParams: any) => {
    return http
      .put(`${CUSTOM_PANELS_API_PREFIX}/visualizations/edit`, {
        body: JSON.stringify({
          panelId: panelId,
          visualizationParams: visualizationParams,
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
    } else {
      const newLayout = editedLayout.map((element) => {
        return { ...element, static: true };
      });
      const visualizationParams = newLayout.map((layout) => _.omit(layout, ['static', 'moved']));
      setLayout(newLayout);
      if (visualizationParams.length !== 0) saveVisualizationLayouts(panelId, visualizationParams);
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
      className="layout full-width"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 12, sm: 12, xs: 1, xxs: 1 }}
      onLayoutChange={layoutChanged}
    >
      {panelVisualizations.map((panelVisualization: VisualizationType) => (
        <div key={panelVisualization.id}>
          <VisualizationContainer
            editMode={editMode}
            visualizationId={panelVisualization.id}
            visualizationTitle={panelVisualization.title}
            query={panelVisualization.query}
            type={panelVisualization.type}
            timeField={panelVisualization.timeField}
            pplService={pplService}
            fromTime={startTime}
            toTime={endTime}
            onRefresh={onRefresh}
            cloneVisualization={cloneVisualization}
            pplFilterValue={pplFilterValue}
            showFlyout={showFlyout}
            removeVisualization={removeVisualization}
          />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

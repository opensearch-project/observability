/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { uniqueId, find } from 'lodash';
import { DragDrop } from '../drag_drop';
import { WorkspacePanelWrapper } from './workspace_panel_wrapper';
import { Bar } from '../../../visualizations/charts/bar';
import { Line } from '../../../visualizations/charts/line';
import { HorizontalBar } from '../../../visualizations/charts/horizontal_bar';
import { LensIconChartBar } from '../assets/chart_bar';
import { LensIconChartLine } from '../assets/chart_line';
import { LensIconChartBarHorizontal } from '../assets/chart_bar_horizontal';
import { EmptyPlaceholder } from '../shared_components/empty_placeholder';
import SavedObjects from '../../../../services/saved_objects/event_analytics/saved_objects';

const plotlySharedlayout = {
  showlegend: true,
  margin: {
    l: 50,
    r: 10,
    b: 30,
    t: 30,
    pad: 0,
  },
  height: 500,
  legend: {
    orientation: 'v',
    traceorder: 'normal',
  }
};

const plotlySharedConfig = {
  displaylogo: false,
  responsive: true
};

interface IWorkSpacePanel {
  curVisId: string;
  setCurVisId: any;
  visualizations: any;
}

export function WorkspacePanel({
  curVisId,
  setCurVisId,
  visualizations
}: IWorkSpacePanel) {

  const memorizedVisualizationTypes = useMemo(() => {
    return ([
      {
        id: 'bar',
        label: 'Bar',
        fullLabel: 'Bar',
        icon: LensIconChartBar,
        visualizationId: uniqueId('vis-bar-'),
        selection: {
          dataLoss: 'nothing'
        },
        chart: (!visualizations || !visualizations.data) ? 
        <EmptyPlaceholder
          icon={ LensIconChartBar }
        /> : <Bar 
          visualizations={ visualizations }
          barConfig={ plotlySharedConfig }
          layoutConfig={ plotlySharedlayout }
        />
      },
      {
        id: 'horizontal_bar',
        label: 'H. Bar',
        fullLabel: 'H. Bar',
        icon: LensIconChartBarHorizontal,
        visualizationId: uniqueId('vis-horizontal-bar-'),
        selection: {
          dataLoss: 'nothing'
        },
        chart: (!visualizations || !visualizations.data) ? 
        <EmptyPlaceholder
          icon={ LensIconChartBarHorizontal }
        /> : <HorizontalBar
          visualizations={ visualizations }
          layoutConfig={ plotlySharedlayout }
          horizontalConfig={ plotlySharedConfig }
        />
      },
      {
        id: 'line',
        label: 'Line',
        fullLabel: 'Line',
        icon: LensIconChartLine,
        visualizationId: uniqueId('vis-line-'),
        selection: {
          dataLoss: 'nothing'
        },
        chart: (!visualizations || !visualizations.data) ? 
        <EmptyPlaceholder
          icon={ LensIconChartLine }
        /> : <Line
          visualizations={ visualizations }
          layoutConfig={ plotlySharedlayout }
          lineConfig={ plotlySharedConfig }
        />
      }
    ]);
  }, [
    curVisId,
    visualizations
  ]);

  const [savePanelName, setSavePanelName] = useState<string>('');

  function onDrop() {}
  
  const getCurChart = () => {
    return find(memorizedVisualizationTypes, (v) => {
      return v.id === curVisId;
    });
  }
  
  function renderVisualization() {
    return getCurChart()?.chart;
  }

  return (
    <WorkspacePanelWrapper
      title={''}
      emptyExpression={true}
      setVis={ setCurVisId }
      vis={ getCurChart() }
      visualizationTypes={ memorizedVisualizationTypes }
      handleSavePanelNameChange={ (name: string) => {
        setSavePanelName(name) 
      } }
      savePanelName={ savePanelName }
    >
      <DragDrop
        className="lnsWorkspacePanel__dragDrop"
        data-test-subj="lnsWorkspace"
        draggable={false}
        droppable={false}
        onDrop={onDrop}
      >
        <div>
          { renderVisualization() }
        </div>
      </DragDrop>
    </WorkspacePanelWrapper>
  );
}
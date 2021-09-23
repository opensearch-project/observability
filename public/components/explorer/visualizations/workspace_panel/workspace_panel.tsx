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
  displayModeBar: true,
  displaylogo: false,
  responsive: true,
  editable: true
};

export function WorkspacePanel({
  visualizations
}: any) {

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
  }, [visualizations]);

  const [curVisId, setCurVisId] = useState(memorizedVisualizationTypes[0]['id']);

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
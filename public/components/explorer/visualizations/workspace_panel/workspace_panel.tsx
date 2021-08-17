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
import { LensIconChartBar } from '../assets/chart_bar';
import { LensIconChartLine } from '../assets/chart_line';

const layout = {
  showlegend: true,
  margin: {
    l: 60,
    r: 10,
    b: 15,
    t: 30,
    pad: 0,
  },
  height: 300
};

export function WorkspacePanel({
  visualizations
}: any) {

  if (!visualizations || !visualizations.data) return null;

  const data = visualizations.data;
  const meta = visualizations.metadata;
  const xkey = meta?.xfield?.name;
  const ykey = meta?.yfield?.name;

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
        chart: <Bar 
          xvalues={ data[xkey] || [] }
          yvalues={ data[ykey] || [] }
          name={ ykey }
          layoutConfig={ layout }
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
        chart: <Line 
          xvalues={ data[xkey] || [] }
          yvalues={ data[ykey] || [] }
          name={ ykey }
          layoutConfig={ layout }
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
        droppable={true}
        onDrop={onDrop}
      >
        <div>
          { renderVisualization() }
        </div>
      </DragDrop>
    </WorkspacePanelWrapper>
  );
}
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

import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import { DragDrop } from '../drag_drop';
import { WorkspacePanelWrapper } from './workspace_panel_wrapper';
import { Bar } from '../../../visualizations/charts/bar';
import { Line } from '../../../visualizations/charts/line';
import { LensIconChartBar } from '../assets/chart_bar';
import { LensIconChartLine } from '../assets/chart_line';

const visualizationTypes = [
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
      xvalues={ [] }
      yvalues={ [] }
      name="Event counts"
      layoutConfig={ {} }
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
    chart: Line
  }
];

// Exported for testing purposes only.
export function WorkspacePanel({ title }: any) {

  const [vis, setVis] = useState(visualizationTypes[0]);

  function onDrop() {}

  function renderVisualization() {
    return vis.chart;
  }

  return (
    <WorkspacePanelWrapper
      title={title}
      emptyExpression={true}
      setVis={ setVis }
      vis={ vis }
      visualizationTypes={ visualizationTypes }
    >
      <DragDrop
        className="lnsWorkspacePanel__dragDrop"
        data-test-subj="lnsWorkspace"
        draggable={false}
        droppable={true}
        onDrop={onDrop}
      >
        <div>
          {renderVisualization()}
        </div>
      </DragDrop>
    </WorkspacePanelWrapper>
  );
}
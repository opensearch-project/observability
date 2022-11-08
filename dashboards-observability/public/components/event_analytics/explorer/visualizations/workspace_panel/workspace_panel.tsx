/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './workspace_panel.scss';

import React, { useState, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { EuiPanel, EuiSwitch } from '@elastic/eui';
import { Visualization } from '../../../../visualizations/visualization';
import { DataTable } from '../../../../visualizations/charts/data_table/data_table';
import { uiSettingsService } from '../../../../../../common/utils';

interface IWorkSpacePanel {
  curVisId: string;
  setCurVisId: any;
  visualizations: any;
}

export function WorkspacePanel({ visualizations }: IWorkSpacePanel) {
  const [isTableViewOn, setIsTableViewOn] = useState(false);
  const VisualizationPanel = useMemo(() => {
    return (
      <Visualization visualizations={visualizations} data-test-subj="workspace__visualizations" />
    );
  }, [visualizations]);

  return (
    <div className="explorerViz__commonPanel ws__visCanvas">
      <EuiPanel className="ws__visCanvasControl" paddingSize="s" color="plain" hasBorder={false}>
        <EuiSwitch
          className="ws__visCanvasControl--switch"
          label="Table view"
          type="button"
          disabled={isEmpty(visualizations?.data?.rawVizData)}
          checked={isTableViewOn}
          onChange={() => {
            setIsTableViewOn((staleState) => !staleState);
          }}
          aria-describedby="table view switcher"
          data-test-subj="workspace__dataTableViewSwitch"
          compressed
        />
      </EuiPanel>
      <EuiPanel
        paddingSize="s"
        className={`ws__visCanvas--space ${
          uiSettingsService.get('theme:darkMode') ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'
        }`}
      >
        {isTableViewOn ? <DataTable visualizations={visualizations} /> : VisualizationPanel}
      </EuiPanel>
    </div>
  );
}

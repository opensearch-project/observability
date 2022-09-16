/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './workspace_panel.scss';

import React, { useState, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { EuiPanel, EuiFlexGroup, EuiFlexItem, EuiSwitch, EuiSpacer } from '@elastic/eui';
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
    <div className="ws__visCanvas">
      <EuiPanel 
        className="ws__visCanvasControl"
        paddingSize="s"
        color="plain"
        hasBorder={false}
      >
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
    // <EuiFlexGroup
    //   className="ws__visCanvas"
    //   direction="column"
    //   // justifyContent="spaceBetween"
    //   gutterSize="none"
    //   responsive={false}
    // >
    //   <EuiFlexItem
    //     className={`ws__visCanvasControl ${uiSettingsService.get('theme:darkMode') ? 'ws__header-dark' : 'ws__header-light'}`}
    //   >
    //     <EuiPanel paddingSize="s">
    //       <EuiSwitch
    //         className="ws__visCanvasControl--switch"
    //         label="Table view"
    //         type="button"
    //         disabled={isEmpty(visualizations?.data?.rawVizData)}
    //         checked={isTableViewOn}
    //         onChange={() => {
    //           setIsTableViewOn((staleState) => !staleState);
    //         }}
    //         aria-describedby="table view switcher"
    //         data-test-subj="workspace__dataTableViewSwitch"
    //         compressed
    //       />
    //     </EuiPanel>
    //   </EuiFlexItem>
    //   <EuiSpacer size="s" />
    //   <EuiFlexItem className="configPane__visCanvasFlexitem" grow={false}>
    //     <EuiPanel
    //       paddingSize="s"
    //       className={
    //         uiSettingsService.get('theme:darkMode') ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'
    //       }
    //     >
    //       {isTableViewOn ? <DataTable visualizations={visualizations} /> : VisualizationPanel}
    //     </EuiPanel>
    //   </EuiFlexItem>
    // </EuiFlexGroup>
  );
}

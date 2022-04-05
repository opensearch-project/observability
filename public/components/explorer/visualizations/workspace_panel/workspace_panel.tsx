/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './workspace_panel.scss';

import React, { useState, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { EuiPanel, EuiFlexGroup, EuiFlexItem, EuiSwitch, EuiSpacer } from '@elastic/eui';
import { Visualization } from '../../../visualizations/visualization';
import { DataTable } from '../../../visualizations/charts/data_table/data_table';
import { uiSettingsService } from '../../../../../common/utils';

interface IWorkSpacePanel {
  curVisId: string;
  setCurVisId: any;
  visualizations: any;
}

export function WorkspacePanel({ visualizations }: IWorkSpacePanel) {
  const [isTableViewOn, setIsTableViewOn] = useState(false);
  const VisualizationPanel = useMemo(() => {
    return <Visualization visualizations={visualizations} data-test-subj="workspace__visualizations"  />;
  }, [visualizations]);

  return (
    <>
      <EuiFlexGroup
        className="visEditorSidebar"
        direction="column"
        justifyContent="spaceBetween"
        gutterSize="none"
        responsive={false}
      >
        <EuiFlexItem
          className={
            uiSettingsService.get('theme:darkMode') ? 'ws__header-dark' : 'ws__header-light'
          }
        >
          <EuiSpacer size="s" />
          <EuiFlexGroup
            className="visEditorSidebar"
            direction="rowReverse"
            gutterSize="none"
            responsive={false}
          >
            <EuiFlexItem grow={false}>
              <EuiPanel paddingSize="s">
                <EuiSwitch
                  label="Table view"
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
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size="s" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="s">
            {isTableViewOn ? 
            <DataTable 
              visualizations={visualizations}
            /> : VisualizationPanel}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
}

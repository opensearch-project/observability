/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useContext, useCallback, useEffect } from 'react';
import { find, isEmpty } from 'lodash';
import { EuiPanel, EuiFlexGroup, EuiFlexItem, EuiSwitch, EuiSpacer } from '@elastic/eui';
import { WorkspacePanelWrapper } from './workspace_panel_wrapper';
import { TabContext } from '../../hooks';
import { change as changeVisualizationConfig } from '../../slices/viualization_config_slice';
import { getVisType } from '../../../visualizations/charts/vis_types';
import { Visualization } from '../../../visualizations/visualization';
import { DataTable } from '../../../visualizations/charts/data_table/data_table';

interface IWorkSpacePanel {
  curVisId: string;
  setCurVisId: any;
  visualizations: any;
}

export function WorkspacePanel({ visualizations }: IWorkSpacePanel) {
  const [isTableViewOn, setIsTableViewOn] = useState(false);
  const VisualizationPanel = useMemo(() => {
    return <Visualization visualizations={visualizations} />;
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
        <EuiFlexItem>
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
                  aria-describedby={'table view switcher'}
                  compressed
                />
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size="s" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="s">
            {isTableViewOn ? <DataTable visualizations={visualizations} /> : VisualizationPanel}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
}

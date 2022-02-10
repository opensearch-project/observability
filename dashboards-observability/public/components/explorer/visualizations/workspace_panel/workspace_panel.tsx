/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useContext, useCallback } from 'react';
import { find } from 'lodash';
import { EuiPanel, EuiFlexGroup, EuiFlexItem, EuiSwitch, EuiSpacer } from '@elastic/eui';
import { WorkspacePanelWrapper } from './workspace_panel_wrapper';
import { TabContext } from '../../hooks';
import { change as changeVisualizationConfig } from '../../slices/viualization_config_slice';
import { getVisType } from '../../../visualizations/charts/vis_types';
import { Visualization } from '../../../visualizations/visualization';

interface IWorkSpacePanel {
  curVisId: string;
  setCurVisId: any;
  visualizations: any;
}

const ENABLED_VIS_TYPES = [
  'bar',
  'horizontal_bar',
  'line',
  'pie',
  'histogram',
  'data_table',
  'guage',
  'heatmap',
  // 'timeseries',
  // 'logs',
  // 'stat',
  // 'state_timeline',
  // 'status_history',
  // 'graph',
  // 'text',
  // 'alert_list',
  // 'dashboard_list',
  // 'news',
  // 'flowcharting',
  // 'annotation_list',
  // 'candle_stick',
  // 'geomap',
  // 'clock',
  // 'treemap',
  // 'discreet',
  // 'node_graph',
  // 'plugin_list',
  // 'world_map_panel',
  // 'poly_stat',
];

export function WorkspacePanel({ curVisId, setCurVisId, visualizations }: IWorkSpacePanel) {
  const { tabId, dispatch } = useContext(TabContext);
  const [savePanelName, setSavePanelName] = useState<string>('');

  const handleDispatch = useCallback(
    (evtData) => {
      dispatch(
        changeVisualizationConfig({
          tabId,
          data: {
            ...evtData,
          },
        })
      );
    },
    [dispatch, tabId]
  );

  const memorizedVisualizationTypes = useMemo(() => {
    return ENABLED_VIS_TYPES.map((vs: any) => {
      const visDefinition = getVisType(vs);
      return {
        ...visDefinition,
      };
    });
  }, []);

  const getVisDefById = useCallback(
    (visId) => {
      return find(memorizedVisualizationTypes, (v) => {
        return v.id === visId;
      });
    },
    [memorizedVisualizationTypes]
  );

  const VisualizationPanel = useMemo(() => {
    return <Visualization visualizations={visualizations} />;
  }, [curVisId, visualizations, handleDispatch, getVisDefById]);

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
                  label={'Table view'}
                  checked={false}
                  onChange={() => {}}
                  aria-describedby={'table view switcher'}
                  compressed
                />
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size="s" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="s">{VisualizationPanel}</EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
}

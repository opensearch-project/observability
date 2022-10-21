/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './app.scss';

import { isEmpty } from 'lodash';

import React from 'react';
import { EuiResizableContainer } from '@elastic/eui';
import { QueryManager } from 'common/query_manager';
import { RAW_QUERY, SELECTED_TIMESTAMP } from '../../../../../common/constants/explorer';
import {
  IField,
  IQuery,
  IVisualizationContainerProps,
  ExplorerFields,
} from '../../../../../common/types/explorer';
import { WorkspacePanel } from './workspace_panel';
import { ConfigPanel } from './config_panel';
import { Sidebar } from '../sidebar';
import { DataConfigPanelItem } from './config_panel/config_panes/config_controls/data_configurations_panel';
import { PPL_STATS_REGEX, VIS_CHART_TYPES } from '../../../../../common/constants/shared';
import { TreemapConfigPanelItem } from './config_panel/config_panes/config_controls/treemap_config_panel_item';
import { LogsViewConfigPanelItem } from './config_panel/config_panes/config_controls/logs_view_config_panel_item';

interface IExplorerVisualizationsProps {
  query: IQuery;
  curVisId: string;
  setCurVisId: (visId: string) => void;
  explorerVis: any;
  explorerFields: ExplorerFields;
  explorerData: any;
  handleAddField: (field: IField) => void;
  handleRemoveField: (field: IField) => void;
  visualizations: IVisualizationContainerProps;
  handleOverrideTimestamp: (field: IField) => void;
  callback?: any;
  queryManager: QueryManager;
}

export const ExplorerVisualizations = ({
  query,
  curVisId,
  setCurVisId,
  explorerVis,
  explorerFields,
  explorerData,
  handleAddField,
  handleRemoveField,
  visualizations,
  handleOverrideTimestamp,
  callback,
  queryManager,
}: IExplorerVisualizationsProps) => {
  const { vis } = visualizations;
  const fieldOptionList = explorerFields.availableFields.map((field) => ({
    ...field,
    label: field.name,
  }));

  const renderDataConfigContainer = () => {
    switch (curVisId) {
      case VIS_CHART_TYPES.TreeMap:
        return (
          <TreemapConfigPanelItem
            fieldOptionList={fieldOptionList}
            visualizations={visualizations}
          />
        );
      case VIS_CHART_TYPES.LogsView:
        return (
          <LogsViewConfigPanelItem
            fieldOptionList={fieldOptionList}
            visualizations={visualizations}
          />
        );
      default:
        return (
          <DataConfigPanelItem
            fieldOptionList={fieldOptionList}
            visualizations={visualizations}
            queryManager={queryManager}
          />
        );
    }
  };

  const syntheticResize = () => {
    const event = window.document.createEvent('UIEvents');
    event.initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(event);
  };

  return (
    <div id="vis__mainContent">
      <EuiResizableContainer onPanelWidthChange={syntheticResize}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel
              initialSize={20}
              minSize="17%"
              mode={['collapsible', { position: 'top' }]}
              paddingSize="none"
              className="vis__leftPanel"
            >
              <div className="explorer__insights">
                <div className="explorerFieldSelector">
                  <Sidebar
                    query={query}
                    explorerFields={explorerFields}
                    explorerData={explorerData}
                    selectedTimestamp={visualizations?.data?.query[SELECTED_TIMESTAMP] || ''}
                    handleOverrideTimestamp={handleOverrideTimestamp}
                    handleAddField={(field: IField) => handleAddField(field)}
                    handleRemoveField={(field: IField) => handleRemoveField(field)}
                    isFieldToggleButtonDisabled={
                      vis.name === VIS_CHART_TYPES.LogsView
                        ? isEmpty(explorerData.jsonData) ||
                          !isEmpty(query[RAW_QUERY].match(PPL_STATS_REGEX))
                        : true
                    }
                  />
                </div>
                <div className="explorer__vizDataConfig">{renderDataConfigContainer()}</div>
              </div>
            </EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel
              className="ws__central--canvas"
              initialSize={60}
              minSize="55%"
              mode="main"
              paddingSize="none"
            >
              <WorkspacePanel
                curVisId={curVisId}
                setCurVisId={setCurVisId}
                visualizations={visualizations}
              />
            </EuiResizablePanel>
            <EuiResizableButton />
            <EuiResizablePanel
              className="ws__configPanel--right"
              initialSize={20}
              minSize="15%"
              mode={['collapsible', { position: 'top' }]}
              paddingSize="none"
            >
              <ConfigPanel
                vizVectors={explorerVis}
                visualizations={visualizations}
                curVisId={curVisId}
                setCurVisId={setCurVisId}
                callback={callback}
              />
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    </div>
  );
};

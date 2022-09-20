/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './app.scss';

import { isEmpty } from 'lodash';

import React, { useContext } from 'react';
import { EuiPanel, EuiResizableContainer, EuiSpacer } from '@elastic/eui';
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
import { DataConfigPanelItem } from './config_panel/config_panes/config_controls/data_config_panel_item';
import { TabContext } from '../../hooks';
import { PPL_STATS_REGEX, visChartTypes } from '../../../../../common/constants/shared';
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
  changeIsValidConfigOptionState: (isValidConfigOptionSelected: boolean) => void;
  qm: QueryManager;
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
  changeIsValidConfigOptionState,
  qm,
}: IExplorerVisualizationsProps) => {
  const { tabId } = useContext<any>(TabContext);
  const { data, vis } = visualizations;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;
  const fieldOptionList = explorerFields.availableFields.map((field) => ({
    ...field,
    label: field.name,
  }));

  const renderDataConfigContainer = () => {
    switch (curVisId) {
      case visChartTypes.TreeMap:
        return (
          <TreemapConfigPanelItem
            fieldOptionList={fieldOptionList}
            visualizations={visualizations}
            qm={qm}
          />
        );
      case visChartTypes.LogsView:
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
            qm={qm}
          />
        );
    }
  };

  return (
    <EuiResizableContainer>
      {(EuiResizablePanel, EuiResizableButton) => (
        <>
          <EuiResizablePanel
            initialSize={17}
            minSize="300"
            mode={['collapsible', { position: 'top' }]}
          >
            <div className="dscFieldChooser">
              <Sidebar
                query={query}
                explorerFields={explorerFields}
                explorerData={explorerData}
                selectedTimestamp={visualizations?.data?.query[SELECTED_TIMESTAMP] || ''}
                handleOverrideTimestamp={handleOverrideTimestamp}
                handleAddField={(field: IField) => handleAddField(field)}
                handleRemoveField={(field: IField) => handleRemoveField(field)}
                isFieldToggleButtonDisabled={
                  vis.name === visChartTypes.LogsView
                    ? isEmpty(explorerData.jsonData) ||
                      !isEmpty(query[RAW_QUERY].match(PPL_STATS_REGEX))
                    : true
                }
              />
            </div>
          </EuiResizablePanel>
          <EuiResizableButton />
          <EuiResizablePanel
            mode={[
              'collapsible',
              {
                'data-test-subj': 'panel-1-toggle',
                className: 'panel-toggle',
                position: 'top',
              },
            ]}
            className="containerPanel"
            initialSize={14}
            minSize="300"
          >
            <EuiSpacer size="s" />
            <EuiPanel paddingSize="s" className="dataConfigContainer">
              {renderDataConfigContainer()}
            </EuiPanel>
          </EuiResizablePanel>

          <EuiResizableButton />
          <EuiResizablePanel className="containerPanel" initialSize={65} minSize="30%" mode="main">
            <WorkspacePanel
              curVisId={curVisId}
              setCurVisId={setCurVisId}
              visualizations={visualizations}
            />
          </EuiResizablePanel>
          <EuiResizableButton />
          <EuiResizablePanel
            className="containerPanel"
            initialSize={20}
            minSize="200px"
            mode={['collapsible', { position: 'top' }]}
          >
            <ConfigPanel
              vizVectors={explorerVis}
              visualizations={visualizations}
              curVisId={curVisId}
              setCurVisId={setCurVisId}
              callback={callback}
              changeIsValidConfigOptionState={changeIsValidConfigOptionState}
            />
          </EuiResizablePanel>
        </>
      )}
    </EuiResizableContainer>
  );
};

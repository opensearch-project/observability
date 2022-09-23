/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './app.scss';

import { isEmpty } from 'lodash';

import React, { useContext } from 'react';
import { EuiPanel, EuiResizableContainer, EuiSpacer } from '@elastic/eui';
import { RAW_QUERY, SELECTED_TIMESTAMP } from '../../../../../common/constants/explorer';
import { IField, IQuery, IVisualizationContainerProps } from '../../../../../common/types/explorer';
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
  explorerFields: IField[];
  explorerData: any;
  handleAddField: (field: IField) => void;
  handleRemoveField: (field: IField) => void;
  visualizations: IVisualizationContainerProps;
  handleOverrideTimestamp: (field: IField) => void;
  callback?: any;
  changeIsValidConfigOptionState: (isValidConfigOptionSelected: Boolean) => void;
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
}: IExplorerVisualizationsProps) => {
  const { tabId } = useContext<any>(TabContext);
  const { data, vis } = visualizations;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;

  const fieldOptionList = explorerFields.availableFields.map((field) => {
  // const fieldOptionList = fields.map((field) => {
    return { ...field, label: field.name };
  });

  const renderDataConfigContainer = () => {
    switch (curVisId) {
      case visChartTypes.TreeMap:
        return (
          <TreemapConfigPanelItem
            fieldOptionList={fieldOptionList}
            visualizations={visualizations}
            tabID={tabId}
          />
        );
      case visChartTypes.LogsView:
        return (
          <LogsViewConfigPanelItem
            fieldOptionList={fieldOptionList}
            visualizations={visualizations}
            tabID={tabId}
          />
        );
      default:
        return (
          <DataConfigPanelItem
            fieldOptionList={fieldOptionList}
            visualizations={visualizations}
            tabID={tabId}
          />
        );
    }
  };

  return (
    <div id="vis__mainContent">
      <EuiResizableContainer>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel
              initialSize={20}
              minSize="17%"
              mode={['collapsible', { position: 'top' }]}
              paddingSize="none"
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
                      vis.name === visChartTypes.LogsView
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
              {/* <EuiPanel> */}
                <ConfigPanel
                  vizVectors={explorerVis}
                  visualizations={visualizations}
                  curVisId={curVisId}
                  setCurVisId={setCurVisId}
                  callback={callback}
                  changeIsValidConfigOptionState={changeIsValidConfigOptionState}
                />
              {/* </EuiPanel> */}
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    </div>
  );
};

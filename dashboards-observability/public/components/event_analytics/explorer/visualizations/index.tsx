/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './app.scss';

import _ from 'lodash';

import React, { useContext } from 'react';
import { EuiResizableContainer } from '@elastic/eui';
import { SELECTED_TIMESTAMP } from '../../../../../common/constants/explorer';
import { IField, IQuery, IVisualizationContainerProps } from '../../../../../common/types/explorer';
import { WorkspacePanel } from './workspace_panel';
import { ConfigPanel } from './config_panel';
import { Sidebar } from '../sidebar';
import { DataConfigPanelItem } from './config_panel/config_panes/config_controls/data_config_panel_item';
import { TabContext } from '../../hooks';
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
  const { data } = visualizations;
  const { data: vizData = {}, metadata: { fields = [] } = {} } = data?.rawVizData;

  const fieldOptionList = fields.map((name) => {
    return { label: name.name };
  })

  return (
    <EuiResizableContainer>
      {(EuiResizablePanel, EuiResizableButton) => (
        <>
          <EuiResizablePanel initialSize={15} minSize="240px" mode="collapsible">
            <div className="dscFieldChooser">
              <Sidebar
                query={query}
                explorerFields={explorerFields}
                explorerData={explorerData}
                selectedTimestamp={visualizations?.data?.query[SELECTED_TIMESTAMP] || ''}
                handleOverrideTimestamp={handleOverrideTimestamp}
                handleAddField={(field: IField) => handleAddField(field)}
                handleRemoveField={(field: IField) => handleRemoveField(field)}
                isFieldToggleButtonDisabled={true}
              />
            </div>
          </EuiResizablePanel>
          <EuiResizableButton />
          <EuiResizablePanel
            mode="collapsible"
            initialSize={15}
            minSize="240px"
            style={{ border: '1px solid #D3DAE6', padding: '0px' }}
          >
            <div className="">
              <DataConfigPanelItem
                fieldOptionList={fieldOptionList}
                visualizations={visualizations}
                tabID={tabId}
              />
            </div>
          </EuiResizablePanel>

          <EuiResizableButton />
          <EuiResizablePanel initialSize={65} minSize="30%" mode="main">
            <WorkspacePanel
              curVisId={curVisId}
              setCurVisId={setCurVisId}
              visualizations={visualizations}
            />
          </EuiResizablePanel>
          <EuiResizableButton />
          <EuiResizablePanel initialSize={20} minSize="200px">
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

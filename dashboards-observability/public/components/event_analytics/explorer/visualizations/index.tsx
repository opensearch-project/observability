/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './app.scss';

import _ from 'lodash';

import React from 'react';
import { EuiResizableContainer } from '@elastic/eui';
import { SELECTED_TIMESTAMP } from '../../../../../common/constants/explorer';
import { IField, IQuery, IVisualizationContainerProps } from '../../../../../common/types/explorer';
import { WorkspacePanel } from './workspace_panel';
import { ConfigPanel } from './config_panel';
import { Sidebar } from '../sidebar';

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
}: IExplorerVisualizationsProps) => {
  return (
    <EuiResizableContainer>
      {(EuiResizablePanel, EuiResizableButton) => (
        <>
          <EuiResizablePanel initialSize={15} minSize="100px">
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
          <EuiResizablePanel initialSize={65} minSize="30%">
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
            />
          </EuiResizablePanel>
        </>
      )}
    </EuiResizableContainer>
  );
};

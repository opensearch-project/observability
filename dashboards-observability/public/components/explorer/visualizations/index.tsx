/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './app.scss';

import _ from 'lodash';

import React from 'react';
import { EuiText, EuiResizableContainer } from '@elastic/eui';
import { isEmpty } from 'lodash';
import { RAW_QUERY, SELECTED_TIMESTAMP, IField } from '../../../../common/constants/explorer';
import { PPL_STATS_REGEX } from '../../../../common/constants/shared';
import { WorkspacePanel } from './workspace_panel';
import { ConfigPanel } from './config_panel';
import { Sidebar } from '../sidebar';

export const ExplorerVisualizations = ({
  curVisId,
  setCurVisId,
  explorerVis,
  explorerFields,
  explorerData,
  handleAddField,
  handleRemoveField,
  visualizations,
  handleOverrideTimestamp,
}: any) => {
  return (
    <EuiResizableContainer>
      {(EuiResizablePanel, EuiResizableButton) => (
        <>
          <EuiResizablePanel initialSize={20} minSize="100px">
            <Sidebar
              explorerFields={explorerFields}
              explorerData={explorerData}
              selectedTimestamp={visualizations.data.query[SELECTED_TIMESTAMP]}
              handleOverrideTimestamp={handleOverrideTimestamp}
              handleAddField={(field: IField) => handleAddField(field)}
              handleRemoveField={(field: IField) => handleRemoveField(field)}
              isFieldToggleButtonDisabled={
                isEmpty(explorerData.jsonData) ||
                !isEmpty(visualizations.data.query[RAW_QUERY].match(PPL_STATS_REGEX))
              }
            />
          </EuiResizablePanel>
          <EuiResizableButton />
          <EuiResizablePanel initialSize={50} minSize="30%">
            <WorkspacePanel
              curVisId={curVisId}
              setCurVisId={setCurVisId}
              visualizations={visualizations}
            />
          </EuiResizablePanel>
          <EuiResizableButton />
          <EuiResizablePanel initialSize={30} minSize="200px">
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

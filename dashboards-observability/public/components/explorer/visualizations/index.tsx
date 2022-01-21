/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './app.scss';

import _ from 'lodash';

import React from 'react';
import { FrameLayout } from './frame_layout';
import { Sidebar } from '../sidebar/sidebar';
import { WorkspacePanel } from './workspace_panel';
import { ConfigPanel } from './config_panel';

export const ExplorerVisualizations = ({
  curVisId,
  setCurVisId,
  explorerVis,
  explorerFields,
  explorerData,
  handleAddField,
  handleRemoveField,
}: any) => {
  return (
    <FrameLayout
      dataPanel={
        <Sidebar
          explorerFields={explorerFields}
          explorerData={explorerData}
          handleAddField={handleAddField}
          handleRemoveField={handleRemoveField}
        />
      }
      workspacePanel={
        <WorkspacePanel
          curVisId={curVisId}
          setCurVisId={setCurVisId}
          visualizations={explorerVis}
        />
      }
      configPanel={<ConfigPanel vizVectors={explorerVis} />}
    />
  );
};

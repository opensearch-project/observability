/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import './app.scss';

import _ from 'lodash';

import React from 'react';
import { FrameLayout } from './frameLayout';
import { DataPanel } from './datapanel';
import { WorkspacePanel } from './workspace_panel';
import { ConfigPanelWrapper } from './config_panel';

export const ExplorerVisualizations = ({
  explorerVis,
  queryResults
}: any) => {

  return (
    <FrameLayout 
      dataPanel={
        <DataPanel 
          queryResults={ queryResults }
        />
      }
      workspacePanel={
        <WorkspacePanel
          visualizations={ explorerVis }
        />
      }
      configPanel={
        <ConfigPanelWrapper
          queryResults={ queryResults }
        />
      }
    />
  );
};
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
import { FrameLayout } from './frame_layout';
import { DataPanel } from './datapanel';
import { Sidebar } from '../sidebar/sidebar';
import { WorkspacePanel } from './workspace_panel';
import { ConfigPanelWrapper } from './config_panel';

export const ExplorerVisualizations = ({
  curVisId,
  setCurVisId,
  explorerVis,
  explorerFields,
  explorerData,
  handleAddField,
  handleRemoveField,
  savedObjects,
  onSaveVisualization,
  getSavedVisualization
}: any) => {

  return (
    <FrameLayout 
      dataPanel={ 
        <Sidebar 
          explorerFields={ explorerFields }
          explorerData={ explorerData }
          handleAddField={ handleAddField }
          handleRemoveField={ handleRemoveField }
        />
      }
      workspacePanel={
        <WorkspacePanel
          curVisId={ curVisId }
          setCurVisId={ setCurVisId }
          visualizations={ explorerVis }
          savedObjects={ savedObjects }
          onSaveVisualization={ onSaveVisualization }
          getSavedObjects={ getSavedVisualization }
        />
      }
      configPanel={
        <ConfigPanelWrapper
          explorerFields={ explorerFields }
        />
      }
    />
  );
};
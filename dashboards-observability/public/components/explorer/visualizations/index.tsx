/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './app.scss';

import _ from 'lodash';

import React from 'react';
import { EuiText, EuiResizableContainer } from '@elastic/eui';
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
    <EuiResizableContainer>
      {(EuiResizablePanel, EuiResizableButton) => (
        <>
          <EuiResizablePanel initialSize={70} minSize="30%">
            <WorkspacePanel
              curVisId={curVisId}
              setCurVisId={setCurVisId}
              visualizations={explorerVis}
            />
          </EuiResizablePanel>

          <EuiResizableButton />

          <EuiResizablePanel initialSize={30} minSize="200px">
            <ConfigPanel vizVectors={explorerVis} />
          </EuiResizablePanel>
        </>
      )}
    </EuiResizableContainer>
    //   <FrameLayout
    //     dataPanel={
    //       <Sidebar
    //         explorerFields={explorerFields}
    //         explorerData={explorerData}
    //         handleAddField={handleAddField}
    //         handleRemoveField={handleRemoveField}
    //       />
    //     }
    //     workspacePanel={
    //       <WorkspacePanel
    //         curVisId={curVisId}
    //         setCurVisId={setCurVisId}
    //         visualizations={explorerVis}
    //       />
    //     }
    //     configPanel={<ConfigPanel vizVectors={explorerVis} />}
    //   />
  );
};

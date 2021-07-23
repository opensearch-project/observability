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
// import {} 

// const VIS_MAPS = {
//   'lnsXY': {
//     visualizationTypes: [
//       {
//         id: 'bar',
//         label: 'Bar'
//       },
//       {
//         id: 'line',
//         label: 'Line'
//       }
//     ]
//   }
// };

export const ExplorerVisualizations = (props: any) => {

  return (
    <FrameLayout 
      dataPanel={<DataPanel 
        queryResults={ props.queryResults }
      />}
      workspacePanel={
        <WorkspacePanel 
          dispatch={ () => {} }
          query={ props.query }
          // visualizationMap={ VIS_MAPS }
        />
      }
      configPanel={
        <ConfigPanelWrapper
          queryResults={ props.queryResults }
        />
      }
    />
  );
};
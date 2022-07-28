/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import './frame_layout.scss';

import React from 'react';
import { EuiPage, EuiPageSideBar, EuiPageBody } from '@elastic/eui';

export interface FrameLayoutProps {
  dataPanel: React.ReactNode;
  configPanel?: React.ReactNode;
  suggestionsPanel?: React.ReactNode;
  workspacePanel?: React.ReactNode;
}

export function FrameLayout(props: FrameLayoutProps) {
  return (
    <EuiPage className="lnsFrameLayout">
      <div className="lnsFrameLayout__pageContent">
        <EuiPageBody className="lnsFrameLayout__pageBody" restrictWidth={false}>
          {props.workspacePanel}
        </EuiPageBody>
        <EuiPageBody className="lnsFrameLayout__pageBody" restrictWidth={false}>
          {props.configPanel}
        </EuiPageBody>
      </div>
    </EuiPage>
  );
}

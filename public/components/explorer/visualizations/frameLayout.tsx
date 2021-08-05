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

import './frameLayout.scss';

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
        <EuiPageSideBar className="lnsFrameLayout__sidebar">
          {props.dataPanel}
        </EuiPageSideBar>
        <EuiPageBody className="lnsFrameLayout__pageBody" restrictWidth={false}>
          {props.workspacePanel}
        </EuiPageBody>
        <EuiPageSideBar className="lnsFrameLayout__sidebar lnsFrameLayout__sidebar--right">
          {props.configPanel}          
        </EuiPageSideBar>
      </div>
    </EuiPage>
  );
}
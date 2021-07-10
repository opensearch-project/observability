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

import React from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiResizableContainer,
  EuiListGroup,
  EuiPage,
  EuiPanel,
  EuiTitle,
  EuiText,
  EuiSpacer
} from '@elastic/eui';

export const ExplorerVisualizations = (props: any) => {
  return (
    <EuiPage paddingSize="none">
      <EuiResizableContainer style={{ height: '320px' }}>
        {(EuiResizablePanel, EuiResizableButton) => (
          <>
            <EuiResizablePanel
              mode={[
                'collapsible',
                {
                  className: 'panel-toggle',
                  'data-test-subj': 'panel-3-toggle',
                  position: 'bottom',
                },
              ]}
              initialSize={20}
              minSize="10%">
              <EuiListGroup flush>test</EuiListGroup>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel mode="main" initialSize={60} minSize="200px">
              <EuiPanel paddingSize="l" style={{ minHeight: '100%' }}>
                <EuiTitle>
                  <p>test label</p>
                </EuiTitle>
                <EuiSpacer />
                <EuiText>test text</EuiText>
              </EuiPanel>
            </EuiResizablePanel>

            <EuiResizableButton />

            <EuiResizablePanel
              mode={[
                'collapsible',
                {
                  className: 'panel-toggle',
                  'data-test-subj': 'panel-3-toggle',
                  position: 'bottom',
                },
              ]}
              initialSize={20}
              minSize="10%">
              <EuiListGroup flush>test elements</EuiListGroup>
            </EuiResizablePanel>
          </>
        )}
      </EuiResizableContainer>
    </EuiPage>
    // <EuiFlexGroup>
    //   <EuiFlexItem grow={1}>
    //     <EuiPanel>
    //       fields sidebar
    //     </EuiPanel>
    //   </EuiFlexItem>
    //   <EuiFlexItem grow={2}>
    //     <EuiPanel>
    //       visualization content
    //     </EuiPanel>
    //   </EuiFlexItem>
    //   <EuiFlexItem grow={1}>
    //     <EuiPanel>
    //       edit panel
    //     </EuiPanel>
    //   </EuiFlexItem>
    // </EuiFlexGroup>
  );
};
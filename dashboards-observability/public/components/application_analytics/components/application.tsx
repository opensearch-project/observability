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

/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import {
    EuiButton,
    EuiButtonGroup,
    EuiButtonGroupOption,
    EuiCard,
    EuiContextMenu,
    EuiContextMenuPanelDescriptor,
    EuiFlexGroup,
    EuiFlexItem,
    EuiIcon,
    EuiOverlayMask,
    EuiPage,
    EuiPageBody,
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiPanel,
    EuiPopover,
    EuiSpacer,
    EuiTab,
    EuiTabs,
    EuiText,
    EuiTitle,
  } from '@elastic/eui';
import CSS from 'csstype';
import React, { useState } from 'react';
import { AppOverview } from './overview';


const pageStyles: CSS.Properties = {
  float: 'left',
  width: '100%',
  maxWidth: '1500px',
};

export interface DetailTab {
  id: string;
  label: string;
  description: string;
  onClick: () => void;
  testId: string;
}

interface AppDetailProps {
  disabled?: boolean;
}

export function Application(props: AppDetailProps) {
  const { disabled } = props;
  const [selectedTab, setSelectedTab] = useState('overview');

  const detailTabs = [
    {
      id: 'overview',
      label: 'Overview',
      description: 'Displays overview of app health',
      onClick: () => {setSelectedTab('overview')},
      testId: 'overview'
    },
    {
        id: 'services',
        label: 'Services',
        description: 'Displays services',
        onClick: () => {setSelectedTab('services')},
        testId: 'service'
    },
    {
        id: 'traceSpans',
        label: 'Traces & Spans',
        description: 'Displays traces & spans',
        onClick: () => {setSelectedTab('traceSpans')},
        testId: 'tracesSpans'
    },
    {
        id: 'logEvents',
        label: 'Log Events',
        description: 'Displays log events',
        onClick: () => {setSelectedTab('logEvents')},
        testId: 'logEvents'
    },
    {
        id: 'config',
        label: 'Configuration',
        description: 'Displays configuration',
        onClick: () => {setSelectedTab('config')},
        testId: 'config'
    },
]

  return (
    <div style={pageStyles}>
    <EuiPage>
      <EuiPageBody component="div">
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>my-app1</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiTabs size="m">
        {detailTabs.map((item) => {
          return (
            <EuiTab
              key={item.id}
              disabled={disabled}
              onClick={item.onClick}
              title={item.label}
              data-test-subj={item.testId}
            >
              {item.label}
            </EuiTab>
          );
        })}
        </EuiTabs>
        {selectedTab === 'overview' && 
          <h1>Overview</h1>
        }
        {selectedTab === 'services' && 
          <h1>Services</h1>
        }
        {selectedTab === 'traceSpans' && 
          <h1>Traces & Spans</h1>
        }
        {selectedTab === 'logEvents' && 
          <h1>Log Events</h1>
        }
        {selectedTab === 'config' && 
          <h1>Configuration</h1>
        }
      </EuiPageBody>
    </EuiPage>
    </div>
  );
}
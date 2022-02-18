/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiTabbedContent,
  EuiTabbedContentTab,
} from '@elastic/eui';
import { DocViewTable } from './detailTable/docDetailTable';
import { JsonCodeBlock } from './json_code_block/json_code_block';
import { IDocType } from './docViewRow';
import { HttpSetup } from '../../../../../../src/core/public';
import { TraceBlock } from './trace_block/trace_block';

interface IDocViewerProps {
  http: HttpSetup;
  hit: IDocType;
}

export function DocViewer(props: IDocViewerProps) {
  const [curSelectedTab, setCurSelectedTab] = useState<EuiTabbedContentTab | null>(null);

  // can be passed in later
  const getTabList = () => {
    return [
      {
        id: _.uniqueId('doc_viewer_tab_'),
        name: 'Table',
        component: (tabProps: any) => (
          <DocViewTable
            filter={() => {}}
            onAddColumn={() => {}}
            onRemoveColumn={() => {}}
            {...tabProps}
          />
        ),
        otherProps: {},
      },
      {
        id: _.uniqueId('doc_viewer_tab_'),
        name: 'JSON',
        component: (tabProps: any) => <JsonCodeBlock {...tabProps} />,
        otherProps: {},
      },
      {
        id: _.uniqueId('doc_viewer_tab_'),
        name: 'Traces',
        component: (tabProps: any) => <TraceBlock http={props.http} {...tabProps} />,
        otherProps: {},
      },
      {
        id: _.uniqueId('doc_viewer_tab_'),
        name: 'Metrics',
        component: (tabProps: any) => <></>,
        otherProps: {},
      },
    ];
  };

  const tabs = useMemo(() => {
    return getTabList().map((tab) => {
      const Component = tab.component;
      return {
        id: tab.id,
        name: tab.name,
        content: (
          <EuiPanel paddingSize="s">
            <EuiFlexGroup>
              <EuiFlexItem>
                <Component hit={props.hit} {...tab.otherProps} />{' '}
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        ),
      };
    });
  }, [props.hit]);

  if (!tabs.length) {
    // There there's a minimum of 2 tabs active in Discover.
    // This condition takes care of unit tests with 0 tabs.
    return null;
  }

  return (
    <div className="osdDocViewer">
      <EuiTabbedContent
        tabs={tabs}
        selectedTab={curSelectedTab || tabs[0]}
        onTabClick={(selectedTab: EuiTabbedContentTab) => setCurSelectedTab(selectedTab)}
      />
    </div>
  );
}

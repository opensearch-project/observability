/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiPanel,
  EuiTabbedContent,
  EuiTabbedContentTab,
} from '@elastic/eui';
import { DocViewTable } from './detailTable/docDetailTable';
import { JsonCodeBlock } from './json_code_block/json_code_block';
import { IDocType } from './docViewRow';
import { HttpSetup } from '../../../../../../src/core/public';
import { TraceBlock } from './trace_block/trace_block';
import { OTEL_TRACE_ID } from '../../../../common/constants/explorer';
import { isValidTraceId } from '../utils';
import { log } from 'util';

interface IDocViewerProps {
  http: HttpSetup;
  hit: IDocType;
  openTraces: boolean;
}

export function DocViewer(props: IDocViewerProps) {
  const [curSelectedTab, setCurSelectedTab] = useState<EuiTabbedContentTab | null>(null);
  const [logTraceId, setLogTraceId] = useState('');
  const [tracesLink, setTracesLink] = useState(<></>);

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
        name: (
          <>
            <span>Traces</span>
            {tracesLink}
          </>
        ),

        component: (tabProps: any) => <TraceBlock http={props.http} {...tabProps} />,
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
                <Component hit={props.hit} logTraceId={logTraceId} {...tab.otherProps} />{' '}
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        ),
      };
    });
  }, [props.hit, logTraceId, tracesLink]);

  if (!tabs.length) {
    // There there's a minimum of 2 tabs active in Discover.
    // This condition takes care of unit tests with 0 tabs.
    return null;
  }

  useEffect(() => {
    const traceId = props.hit.hasOwnProperty(OTEL_TRACE_ID) ? props.hit[OTEL_TRACE_ID] : '';
    setLogTraceId(traceId);
    if (traceId !== '' && isValidTraceId(traceId))
      setTracesLink(
        <EuiLink
          className="trace-link"
          href={`#/trace_analytics/traces/${traceId}`}
          target="_blank"
          external
        />
      );
  }, []);

  return (
    <div className="osdDocViewer">
      <EuiTabbedContent
        tabs={tabs}
        selectedTab={curSelectedTab || (props.openTraces ? tabs[2] : tabs[0])}
        onTabClick={(selectedTab: EuiTabbedContentTab) => setCurSelectedTab(selectedTab)}
      />
    </div>
  );
}

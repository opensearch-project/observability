/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem, EuiPopover, EuiText } from '@elastic/eui';
import _ from 'lodash';
import React, { useState } from 'react';
import { LatencyPlt, LinePlt } from '../common/plots/latency_trend_plt';

export function LatencyTrendCell({
  item,
  traceGroupName,
}: {
  item: {
    popoverData: Plotly.Data[];
    trendData: Plotly.Data[];
  };
  traceGroupName: string;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <EuiFlexGroup gutterSize="s">
      <EuiFlexItem />
      <EuiFlexItem grow={false}>
        <LinePlt data={item.trendData} />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiPopover
          ownFocus
          anchorPosition="downCenter"
          button={
            <EuiButtonIcon
              aria-label="Open popover"
              onClick={() => setIsPopoverOpen(true)}
              iconType="magnifyWithPlus"
              size="s"
            />
          }
          isOpen={isPopoverOpen}
          closePopover={() => setIsPopoverOpen(false)}
        >
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiText size="s">24-hour latency trend</EuiText>
              <EuiText size="s">{traceGroupName}</EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonIcon
                aria-label="Close popover"
                iconType="cross"
                color="text"
                onClick={() => setIsPopoverOpen(false)}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <LatencyPlt data={item.popoverData} />
        </EuiPopover>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

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
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
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

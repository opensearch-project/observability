/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiSpacer, EuiText, EuiIcon, EuiFlexGroup, EuiFlexItem, EuiPanel } from '@elastic/eui';
import React, { useState } from 'react';
import './empty_view.scss';

export const EmptyMetricsView = () => {
  return (
    <div>
      <EuiPanel className="empty-view-metrics">
        <div className="align-center-view">
          <EuiText>
            <EuiIcon type="minusInCircle" size="xxl" />
            <EuiSpacer size="s" />
            <h2>No Metrics Selected</h2>
            <EuiSpacer size="m" />
            <EuiText color="subdued" size="m">
              Select a metric from the left sidepanel to view results.
            </EuiText>
          </EuiText>
        </div>
      </EuiPanel>
    </div>
  );
};

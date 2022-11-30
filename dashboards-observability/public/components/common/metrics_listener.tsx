/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HttpStart } from '../../../../../src/core/public';
import { OBSERVABILITY_BASE } from '../../../common/constants/shared';

interface MetricsListenerProps {
  http: HttpStart;
}

export const MetricsListener: React.FC<MetricsListenerProps> = (props) => {
  const incrementCountMetric = (element?: string | null) => {
    if (!element) return;
    props.http.post(`${OBSERVABILITY_BASE}/stats`, {
      body: JSON.stringify({ element }),
    });
  };

  const onClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    incrementCountMetric(
      (e.target as HTMLElement | null)
        ?.closest('[data-click-metric-element]')
        ?.getAttribute('data-click-metric-element')
    );
  };

  return <div onClick={onClick}>{props.children}</div>;
};

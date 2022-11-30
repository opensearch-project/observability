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
  const incrementCountMetric = (element: string) => {
    props.http.post(`${OBSERVABILITY_BASE}/stats`, {
      body: JSON.stringify({ element }),
    });
  };

  const onClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    let current = e.target as HTMLElement | null;
    while (current) {
      const element = current?.getAttribute('click-metric-element');
      if (element) {
        incrementCountMetric(element);
        break;
      }
      current = current?.parentElement;
    }
  };

  return <div onClick={onClick}>{props.children}</div>;
};

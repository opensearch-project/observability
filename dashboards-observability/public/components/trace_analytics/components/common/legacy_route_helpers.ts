/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { observabilityID } from "../../../../../common/constants/shared";

export const convertLegacyTraceAnalyticsUrl = (location: Location)=> {
  const pathname = location.pathname.replace('trace-analytics-dashboards', observabilityID);
  const hash = `#/trace_analytics${location.hash.replace(/^#/, '/home')}${
    location.hash.includes('?') ? location.search.replace(/^\?/, '&') : location.search
  }`;
  return pathname + hash;
};

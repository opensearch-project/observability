/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const convertLegacyNotebooksUrl = (location: Location)=> {
  const pathname = location.pathname.replace('notebooks-dashboards', 'observability');
  const hash = `#/notebooks${location.hash.replace(/^#/, '')}${
    location.hash.includes('?') ? location.search.replace(/^\?/, '&') : location.search
  }`;
  return pathname + hash;
};

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

export const convertLegacyNotebooksUrl = (location: Location)=> {
  const pathname = location.pathname.replace('notebooks-dashboards', 'observability');
  const hash = `#/notebooks${location.hash.replace(/^#/, '')}${
    location.hash.includes('?') ? location.search.replace(/^\?/, '&') : location.search
  }`;
  return pathname + hash;
};

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

export const getIndexPatternFromRawQuery = (query: string) : string => {
  const matches = query.match(/(source|index)\s*=\s*([^|\s]+)/i);
  if (matches) {
    return matches[2];
  }
  return '';
};
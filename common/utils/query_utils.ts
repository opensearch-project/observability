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
  const indexMatches = query.match('\=(.*)');
  if (indexMatches) {
    return indexMatches[0]?.slice(1)?.split('|')[0]?.trim();
  }
  return '';
};
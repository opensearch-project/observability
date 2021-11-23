/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const joinRequestParams = (
    queryParams: string | string[] | undefined
  ) => {
    if (Array.isArray(queryParams)) return queryParams.join(',');
    if (typeof queryParams === 'string') return queryParams;
    return '';
  };

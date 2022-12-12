/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { CoreStart } from '../../../../../src/core/public';
import { PPL_BASE, PPL_SEARCH } from '../../../common/constants/shared';

export default class PPLService {
  private http;
  constructor(http: CoreStart['http']) {
    this.http = http;
  }

  fetch = async (
    params: {
      query: string;
      format: string;
    },
    errorHandler?: (error: any) => void
  ) => {
    return this.http
      .post(`${PPL_BASE}${PPL_SEARCH}`, {
        body: JSON.stringify(params),
      })
      .catch((error) => {
        console.error('fetch error: ', error.body);
        if (errorHandler) errorHandler(error);
        throw error;
      });
  };
}

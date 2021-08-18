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

import { CoreStart } from '../../../../../src/core/public';
import {
  PPL_BASE,
  PPL_SEARCH
} from '../../../common/index';

export default class PPLService {
  private http;
  constructor(http: CoreStart['http']) {
    this.http = http;
  }
  
  fetch = async (
    params: { 
      query: string,
      format: 'default'
    }
  ) => {
    return this.http
            .post(
              `${PPL_BASE}${PPL_SEARCH}`,
              {
                body: JSON.stringify(params),
              }
            )
            .catch(error => console.log(error));
  }
}
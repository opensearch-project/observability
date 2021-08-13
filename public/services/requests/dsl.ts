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
// import {
//   DSL_BASE,
//   DSL_SEARCH
// } from '../../../common/index';

export default class DSLService {
  private http;
  constructor(http: CoreStart['http']) {
    this.http = http;
  }
  fetch = async (
    params: {
      query: string
      format: ''
    }
  ) => {
    return this.http
            .get(
              'opensearch_dashboards_sample_data_flights/_cat/indices'
            )
            .catch(error => console.log(error));
  }
}
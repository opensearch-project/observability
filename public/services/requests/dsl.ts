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
  DSL_BASE,
  DSL_SEARCH,
  DSL_CAT,
  DSL_MAPPING
} from '../../../common/constants/shared';

export default class DSLService {
  private http;
  constructor(http: CoreStart['http']) {
    this.http = http;
  }
  fetch = async (
    request: any
  ) => {
    return this.http
            .post(
              `${DSL_BASE}${DSL_SEARCH}`,
              {
                body: JSON.stringify(request)
              }
            )
            .catch(error => console.log(error));
  }

  fetchIndices = async () => {
    return this.http
            .get(
              `${DSL_BASE}${DSL_CAT}`,
              {
                query: {
                  format: 'json',
                }
              }
            )
  }

  fetchFields = async(
    index: string
  ) => {
    return this.http
            .get(
              `${DSL_BASE}${DSL_MAPPING}`,
              {
                query: {
                  index: index
                }
              }
            )
  }
}
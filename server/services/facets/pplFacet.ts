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

import _ from 'lodash';
import { PPLDataSource } from '../../adaptors/pplDatasource';

export default class PPLFacet {

  constructor(private client: any) {
    this.client = client;
  }
  
  private fetch = async (
    request: any,
    format: string,
    responseFormat: string
  ) => {
    const res = {
      success: false,
      data: {}
    };
    try {
      const params = {
        body: {
          query: request.body.query
        }
      };
      if (request.body.format !== 'jdbc') {
        params['format'] = request.body.format;
      }
      const queryRes = await this.client.asScoped(request).callAsCurrentUser(format, params);
      const pplDataSource = new PPLDataSource(queryRes, request.body.format);
      res['success'] = true;
      res['data'] = pplDataSource.getDataSource();
    } catch (err: any) {
      console.log('pplfacet err: ', err);
      res['data'] = err.body;
    }
    return res
  };

  describeQuery = async (request: any) => {
    return this.fetch(request, 'ppl.pplQuery', 'json');
  }
}
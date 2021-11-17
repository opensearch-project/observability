/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import _ from 'lodash';

export default class DSLFacet {
  constructor(private client: any) {
    this.client = client;
  }

  private fetch = async( 
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
        query: JSON.stringify(request.body)
      };
      const queryRes = await this.client.asScoped(request).callAsCurrentUser(format, params);
      const dslDataSource = queryRes;
      res['success'] = true;
      res['data'] = dslDataSource;
    }
    catch (err: any) {
      console.log(err);
      res['data'] = err.body;
    }
    return res;
  };

  describeQuery = async (request: any) => {
    return this.fetch(request, 'dsl.dslQuery', 'json')
  }
} 
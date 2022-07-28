/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import _ from 'lodash';

export default class QueryService {
  private client: any;
  constructor(client: any) {
    this.client = client;
  }    

  describeQueryInternal = async (request: any, format: string, responseFormat: string) => {
    try {
      const queryRequest = {
        query: request.body
      };
      const params = {
        body: JSON.stringify(queryRequest),
      };
      const queryResponse = await this.client.asScoped(request).callAsCurrentUser(format, params);
      return {
        data: {
          ok: true,
          resp: _.isEqual(responseFormat, 'json') ? JSON.stringify(queryResponse) : queryResponse,
        },
      };
    } catch (err) {
      console.error(err);
      return {
        data: {
          ok: false,
          resp: err.response,
          body: err.body
        },
      };
    }
  };

  describeSQLQuery = async (request: any) => {
    return this.describeQueryInternal(request, 'ppl.sqlQuery', 'json');
  }

  describePPLQuery = async (request: any) => {
    return this.describeQueryInternal(request, 'ppl.pplQuery', 'json');
  }
}

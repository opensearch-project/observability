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

/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
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
      console.log(err);
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

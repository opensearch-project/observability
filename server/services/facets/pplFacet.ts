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
        body: request.body
      };
      const queryRes = await this.client.asScoped(request).callAsCurrentUser(format, params);
      const pplDataSource = new PPLDataSource(queryRes);
      res['success'] = true;
      res['data'] = pplDataSource.getDataSource();
    } catch (err: any) {
      console.log(err);
      res['data'] = err.body;
    }
    return res
  };

  describeQuery = async (request: any) => {
    return this.fetch(request, 'ppl.pplQuery', 'json');
  }
}
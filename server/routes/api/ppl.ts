/*
 * Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import { IRouter } from '../../../../../src/core/server';
import { Client } from '@elastic/elasticsearch';
import { schema } from '@kbn/config-schema';
import { PPLDataSource } from '../../datasources/index';

export function registerPplRoute({
  router,
  client,
}: {
  router: IRouter
  client: Client
}) {
  router.post({
    path: '/api/ppl/search',
    validate: { 
      body: schema.object({
        query: schema.string()
    })}
  }, 
  async (context, req, res) => {
    const reqBody = req.body;
    try {
      const { body, statusCode, headers, warnings } = await client.pplSearch({
        body: reqBody,
        index: '_opendistro',
        plugin: '_ppl'
      }, {});

      if (statusCode === 200) {
        const pplresult = new PPLDataSource(body);
        pplresult.getJSON();
        return res.ok({
          body: pplresult.getJSON(),
        });
      }

      return res.custom({
        statusCode: statusCode,
        body: body,
        headers
      });
      
    } catch (error) {
      return res.custom({
        statusCode: error.statusCode || 500,
        body: error.message,
      });
    }
  });
}

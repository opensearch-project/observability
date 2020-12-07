/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
import { CoreStart } from '../../../../src/core/public';
import { DSL_ROUTE, INDICES_ROUTE, SQL_ROUTE } from '../../server/utils/constants';

export function handleDslRequest(http: CoreStart['http'], DSL, query) {
  if (DSL?.query) {
    query.query.bool.must.push(...DSL.query.bool.must);
    query.query.bool.filter.push(...DSL.query.bool.filter);
    query.query.bool.should.push(...DSL.query.bool.should);
    query.query.bool.must_not.push(...DSL.query.bool.must_not);
    if (DSL.query.bool.minimum_should_match)
      query.query.bool.minimum_should_match = DSL.query.bool.minimum_should_match;
  }
  return http
    .post(DSL_ROUTE, {
      body: JSON.stringify(query),
    })
    .catch((error) => console.error(error));
}

export async function handleIndicesExistRequest(http: CoreStart['http'], setIndicesExist) {
  http
    .post(INDICES_ROUTE)
    .then((exists) => setIndicesExist(exists))
    .catch(() => setIndicesExist(false));
}

// export function handleSqlRequest(http: CoreStart['http'], query: string) {
//   console.log('SQL:', query);
//   return http
//     .post(SQL_ROUTE, {
//       body: `{ "query": "${query}" }`,
//     })
//     .catch((error) => console.error(error));
// }

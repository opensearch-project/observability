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
import { CoreStart } from '../../../../../../src/core/public';

//const INDICES_ROUTE = '/api/trace_analytics/indices';
const DSL_ROUTE = '/api/dsl/search';
//const SQL_ROUTE = '/api/trace_analytics/sqlquery';
//const SQL_OPENSEARCH_ENDPOINT = '/_plugins/_sql?format=json';

export function handleDslRequest(http: CoreStart['http'], query) {
  // if (DSL?.query) {
  //   query.query.bool.must.push(...DSL.query.bool.must);
  //   //query.query.bool.filter.push(...DSL.query.bool.filter);
  //   query.query.bool.should.push(...DSL.query.bool.should);
  //   query.query.bool.must_not.push(...DSL.query.bool.must_not);
  //   if (DSL.query.bool.minimum_should_match) {
  //     query.query.bool.minimum_should_match = DSL.query.bool.minimum_should_match;
  //   }
  // }
  console.log(JSON.stringify(query));
  return http
    .get(DSL_ROUTE, {
      query: JSON.stringify(query),
    })
    .catch((error) => console.error(error));
}

// export async function handleIndicesExistRequqest(http: CoreStart['http'], setIndicesExist) {
//   http
//     .post(INDICES_ROUTE)
//     .then((exists) => setIndicesExist(exists))
//     .catch(() => setIndicesExist(false));
// }

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { CoreStart } from '../../../../../../src/core/public';
import {
  TRACE_ANALYTICS_DSL_ROUTE,
  TRACE_ANALYTICS_INDICES_ROUTE,
} from '../../../../common/constants/trace_analytics';

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
    .post(TRACE_ANALYTICS_DSL_ROUTE, {
      body: JSON.stringify(query),
    })
    .catch((error) => console.error(error));
}

export async function handleIndicesExistRequest(http: CoreStart['http'], setIndicesExist) {
  http
    .post(TRACE_ANALYTICS_INDICES_ROUTE)
    .then((exists) => setIndicesExist(exists))
    .catch(() => setIndicesExist(false));
}

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
/* eslint-disable no-console */

import { CoreStart } from '../../../../../../src/core/public';
import {
  TRACE_ANALYTICS_DSL_ROUTE,
  TRACE_ANALYTICS_DATA_PREPPER_INDICES_ROUTE,
  TRACE_ANALYTICS_JAEGER_INDICES_ROUTE,
  JAEGER_INDEX_NAME,
  DATA_PREPPER_INDEX_NAME
} from '../../../../common/constants/trace_analytics';
import { TraceAnalyticsMode, TraceAnalyticsModeType } from '../home';

export function handleDslRequest(http: CoreStart['http'], DSL: any, bodyQuery: any, mode: TraceAnalyticsModeType) {
  if (DSL?.query) {
    bodyQuery.query.bool.must.push(...DSL.query.bool.must);
    bodyQuery.query.bool.filter.push(...DSL.query.bool.filter);
    bodyQuery.query.bool.should.push(...DSL.query.bool.should);
    bodyQuery.query.bool.must_not.push(...DSL.query.bool.must_not);
    if (DSL.query.bool.minimum_should_match)
      bodyQuery.query.bool.minimum_should_match = DSL.query.bool.minimum_should_match;
  }
  let body = bodyQuery;
  if (!bodyQuery.index) {
    body = {...bodyQuery, index: ((mode === TraceAnalyticsMode.Jaeger ? JAEGER_INDEX_NAME : DATA_PREPPER_INDEX_NAME)) }
  }
  return http
    .post(TRACE_ANALYTICS_DSL_ROUTE, {
      body: JSON.stringify(body),
    })
    .catch((error) => console.error(error));
}

export async function handleJaegerIndicesExistRequest(http: CoreStart['http'], setJaegerIndicesExist) {
  http
    .post(TRACE_ANALYTICS_JAEGER_INDICES_ROUTE)
    .then((exists) => setJaegerIndicesExist(exists))
    .catch(() => setJaegerIndicesExist(false));
}

export async function handleDataPrepperIndicesExistRequest(http: CoreStart['http'], setDataPrepperIndicesExist) {
  http
    .post(TRACE_ANALYTICS_DATA_PREPPER_INDICES_ROUTE)
    .then((exists) => setDataPrepperIndicesExist(exists))
    .catch(() => setDataPrepperIndicesExist(false));
}

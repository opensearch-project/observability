/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { schema } from '@osd/config-schema';
import {
  IOpenSearchDashboardsResponse,
  IRouter,
  ResponseError,
} from '../../../../../src/core/server';
import { addRequestToMetric } from '../../common/metrics/metrics_helper';
import QueryService from '../../services/queryService';

export function registerSqlRoute(server: IRouter, service: QueryService) {
  server.post(
    {
      path: '/api/sql/sqlquery',
      validate: {
        body: schema.any(),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      addRequestToMetric('notebooks', 'run_sql_query', 'count');
      const retVal = await service.describeSQLQuery(request);
      return response.ok({
        body: retVal,
      });
    }
  );

  server.post(
    {
      path: '/api/sql/pplquery',
      validate: {
        body: schema.any(),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      addRequestToMetric('notebooks', 'run_ppl_query', 'count');
      const retVal = await service.describePPLQuery(request);
      return response.ok({
        body: retVal,
      });
    }
  );
}

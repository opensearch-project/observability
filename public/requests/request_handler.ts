import { buildEsQuery, TimeRange, Filter, Query } from '../../../../src/plugins/data/common';
import { getTimezone } from '../../../../src/plugins/vis_type_timeseries/public/application/lib/get_timezone';
import { calculateBounds } from '../../../../src/plugins/data/public/query/timefilter/get_time';

export function handleRequest(http, query) {
  return http.post('../api/trace_analytics/query', {
    body: JSON.stringify(query),
  });
}

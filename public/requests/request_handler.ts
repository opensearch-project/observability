import { buildEsQuery, TimeRange, Filter, Query } from '../../../../src/plugins/data/common';
import { getTimezone } from '../../../../src/plugins/vis_type_timeseries/public/application/lib/get_timezone';
import { calculateBounds } from '../../../../src/plugins/data/public/query/timefilter/get_time';

export async function handleRequest(http, DSL) {
  const request = DSL;
  console.log(request)
  const response = await http.post('../api/trace_analytics/query', {
    body: JSON.stringify(request),
  }).then(resp => console.log(resp))
    .catch(error => console.log(error));
  // console.log(response)
}

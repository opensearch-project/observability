import { CoreStart } from '../../../../src/core/public';

export function handleRequest(http: CoreStart['http'], query) {
  console.log(query)
  return http
    .post('../api/trace_analytics/query', {
      body: JSON.stringify(query),
    })
    .catch((error) => console.error(error));
}

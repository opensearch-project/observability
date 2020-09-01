export function handleRequest(http, query) {
  return http.post('../api/trace_analytics/query', {
    body: JSON.stringify(query),
  }).catch(e => console.error(e));
}

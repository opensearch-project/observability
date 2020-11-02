import { getServiceNodesQuery, getServiceSourceQuery, getServicesQuery } from './queries/services_queries';
import { handleDslRequest } from './request_handler';

export const handleServicesRequest = (http, DSL, items, setItems) => {
  handleDslRequest(http, DSL, getServicesQuery())
    .then((response) =>
      Promise.all(
        response.aggregations.trace_group.buckets.map((bucket) => ({
          name: bucket.key,
          average_latency: bucket.average_latency.value,
          error_rate: bucket.error_rate.value,
          throughput: bucket.doc_count,
          traces: bucket.traces.doc_count,
        }))
      )
    )
    .then((newItems) => {
      setItems(newItems);
    })
    .catch((error) => console.error(error));
};

export const handleServiceMapRequest = async (http, DSL, items, setItems) => {
  const nodes = await handleDslRequest(http, null, getServiceNodesQuery()).then((response) =>
    Promise.all(response.aggregations.service_name.buckets.map((bucket) => bucket.key))
  );
  console.log(nodes);
  const edges = await Promise.all(nodes.map(async (service: string) => {
    const hits = await handleDslRequest(http, null, getServiceSourceQuery(service))
    console.log(service, hits)
  }))
};

export const handleServiceViewRequest = (serviceName, http, DSL, fields, setFields) => {
  handleDslRequest(http, DSL, getServicesQuery(serviceName))
    .then((response) => {
      const bucket = response.aggregations.trace_group.buckets[0];
      return {
        name: bucket.key,
        number_of_connected_services: 'N/A',
        connected_services: 'N/A',
        average_latency: bucket.average_latency.value,
        error_rate: bucket.error_rate.value,
        throughput: bucket.doc_count,
        traces: bucket.traces.doc_count,
      };
    })
    .then((newFields) => {
      setFields(newFields);
    })
    .catch((error) => console.error(error));
};

// 'number_of_connected_services': Math.floor(Math.random() * 5 + 2),
// 'connected_services': Array.from({ length: 3 }, () => Math.random().toString(36).substring(2)).join(', '),

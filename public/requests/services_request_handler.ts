import { getServicesQuery } from './queries/services_queries';
import { handleRequest } from './request_handler';

export const handleServicesRequest = (http, items, setItems) => {
  handleRequest(http, getServicesQuery())
    .then((response) =>
      Promise.all(
        response.aggregations.trace_group.buckets.map((bucket) => {
          return {
            name: bucket.key,
            average_latency: bucket.average_latency.value,
            error_rate: bucket.error_rate.value,
            throughput: bucket.doc_count,
            traces: bucket.doc_count,
          };
        })
      )
    )
    .then((newItems) => {
      setItems(newItems);
      // loadRemainingItems(http, newItems, setItems)
    })
    .catch((error) => console.error(error));
};

export const handleServiceViewRequest = (serviceName, http, fields, setFields) => {
  handleRequest(http, getServicesQuery(serviceName))
    .then((response) => {
      const bucket = response.aggregations.trace_group.buckets[0];
      return {
        name: bucket.key,
        number_of_connected_services: 'N/A',
        connected_services: 'N/A',
        average_latency: bucket.average_latency.value,
        error_rate: bucket.error_rate.value,
        throughput: bucket.doc_count,
        traces: bucket.doc_count,
      };
    })
    .then((newFields) => {
      setFields(newFields);
    })
    .catch((error) => console.error(error));
};

// 'number_of_connected_services': Math.floor(Math.random() * 5 + 2),
// 'connected_services': Array.from({ length: 3 }, () => Math.random().toString(36).substring(2)).join(', '),

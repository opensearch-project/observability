import {
  getServiceEdgesQuery,
  getServiceNodesQuery,
  getServiceSourcesQuery,
  getServicesQuery,
} from './queries/services_queries';
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
  const buckets = await handleDslRequest(http, null, getServiceSourcesQuery()).then(
    (response) => response.aggregations.service_name.buckets
  );
  const outgoingServices = [];
  await Promise.all(
    buckets.map((bucket) => {
      bucket.resource.buckets.map((resource) => {
        resource.domain.buckets.map((domain) => {
          outgoingServices.push({
            serviceName: bucket.key,
            destination: { resource: resource.key, domain: domain.key },
          });
        });
      });
    })
  );

  const nodesMap = {};
  const nodes = [];
  let id = 1;
  const getId = (service: string) => {
    if (nodesMap[service]) return nodesMap[service];
    nodes.push({
      id: id,
      label: service,
    });
    nodesMap[service] = id++;
    return id - 1;
  };

  const edges = await Promise.all(
    outgoingServices.map(async (service) => {
      const response = await handleDslRequest(
        http,
        null,
        getServiceEdgesQuery(service.destination)
      );
      if (!response.aggregations.service_name.buckets) return;
      return {
        from: getId(service.serviceName),
        to: getId(response.aggregations.service_name.buckets[0].key),
      };
    })
  );
  setItems({ graph: { nodes, edges } });
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

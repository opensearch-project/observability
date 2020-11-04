import {
  getServiceEdgesQuery,
  getServiceNodesQuery,
  getServiceSourcesQuery,
  getServicesQuery,
} from './queries/services_queries';
import { handleDslRequest } from './request_handler';

const getConnectedServices = (serviceName, graph: { nodes: any[]; edges: any[] }) => {
  const id = graph.nodes?.find((node) => node.label === serviceName)?.id;
  if (id === undefined) return [];
  const connectedServices = graph.edges
    .filter((edge) => edge.from === id)
    .map((edge) => graph.nodes?.find((node) => node.id === edge.to)?.label)
    .filter((service) => service);
  return connectedServices;
};

export const handleServicesRequest = (http, DSL, items, setItems) => {
  handleDslRequest(http, DSL, getServicesQuery())
    .then(async (response) => {
      const serviceMap = await handleServiceMapRequest(http, {});
      return Promise.all(
        response.aggregations.trace_group.buckets.map((bucket) => {
          const connectedServices = getConnectedServices(bucket.key, serviceMap.graph);
          return {
            name: bucket.key,
            average_latency: bucket.average_latency.value,
            error_rate: bucket.error_rate.value,
            throughput: bucket.doc_count,
            traces: bucket.traces.doc_count,
            connected_services: connectedServices.join(', '),
            number_of_connected_services: connectedServices.length,
          };
        })
      );
    })
    .then((newItems) => {
      setItems(newItems);
    })
    .catch((error) => console.error(error));
};

export const handleServiceMapRequest = async (http, DSL, items?, setItems?, selectedService?) => {
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
      size: service === selectedService ? 25 : 15,
      title: `<p>${service}</p><p>Average latency:</p>`,
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
  const result = { graph: { nodes, edges } };
  if (setItems) setItems(result);
  return result;
};

export const handleServiceViewRequest = (serviceName, http, DSL, fields, setFields) => {
  handleDslRequest(http, DSL, getServicesQuery(serviceName))
    .then(async (response) => {
      const bucket = response.aggregations.trace_group.buckets[0];
      if (!bucket) return {};
      const serviceMap = await handleServiceMapRequest(http, {});
      const connectedServices = getConnectedServices(bucket.key, serviceMap.graph);
      return {
        name: bucket.key,
        connected_services: connectedServices.join(', '),
        number_of_connected_services: connectedServices.length,
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

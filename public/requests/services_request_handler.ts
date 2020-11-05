import { getServiceMapGraph } from '../components/common';
import { ServiceObject } from '../components/common/plots/service_map';
import {
  getServiceEdgesQuery,
  getServiceNodesQuery,
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
      const serviceMap = getServiceMapGraph(await handleServiceMapRequest(http, {}));
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

export const handleServiceMapRequest = async (http, DSL, items?, setItems?) => {
  const map: ServiceObject = {};
  let id = 1;
  await handleDslRequest(http, null, getServiceNodesQuery()).then((response) =>
    response.aggregations.service_name.buckets.map(
      (bucket) =>
        (map[bucket.key] = {
          serviceName: bucket.key,
          id: id++,
          traceGroups: bucket.trace_group.buckets.map((traceGroup) => ({
            traceGroup: traceGroup.key,
            targetResource: traceGroup.target_resource.buckets.map((res) => res.key),
          })),
          targetServices: [],
        })
    )
  );

  const targets = {};
  await handleDslRequest(http, null, getServiceEdgesQuery('target')).then((response) =>
    response.aggregations.service_name.buckets.map((bucket) => {
      bucket.resource.buckets.map((resource) => {
        resource.domain.buckets.map((domain) => {
          targets[resource.key + ':' + domain.key] = bucket.key;
        });
      });
    })
  );
  await handleDslRequest(http, null, getServiceEdgesQuery('destination')).then((response) =>
    Promise.all(
      response.aggregations.service_name.buckets.map((bucket) => {
        bucket.resource.buckets.map((resource) => {
          resource.domain.buckets.map((domain) => {
            const targetService = targets[resource.key + ':' + domain.key];
            map[bucket.key].targetServices.push(targetService);
          });
        });
      })
    )
  );
  if (setItems) setItems(map);
  return map;
};

export const handleServiceViewRequest = (serviceName, http, DSL, fields, setFields) => {
  handleDslRequest(http, DSL, getServicesQuery(serviceName))
    .then(async (response) => {
      const bucket = response.aggregations.trace_group.buckets[0];
      if (!bucket) return {};
      const serviceMap = getServiceMapGraph(await handleServiceMapRequest(http, {}));
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

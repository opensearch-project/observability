/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import _ from 'lodash';
import { ServiceObject } from '../components/common/plots/service_map';
import {
  getRelatedServicesQuery,
  getServiceEdgesQuery,
  getServiceMetricsQuery,
  getServiceNodesQuery,
  getServicesQuery,
} from './queries/services_queries';
import { handleDslRequest } from './request_handler';
import dateMath from '@elastic/datemath';
import moment from 'moment';

export const handleServicesRequest = async (
  http,
  DSL,
  items,
  setItems,
  setServiceMap?,
  serviceNameFilter?
) => {
  return handleDslRequest(http, DSL, getServicesQuery(serviceNameFilter, DSL))
    .then(async (response) => {
      const serviceObject: ServiceObject = await handleServiceMapRequest(http, DSL);
      if (setServiceMap) setServiceMap(serviceObject);
      return Promise.all(
        response.aggregations.service.buckets
          .filter((bucket) => serviceObject[bucket.key])
          .map((bucket) => {
            const connectedServices = [
              ...serviceObject[bucket.key].targetServices,
              ...serviceObject[bucket.key].destServices,
            ];
            return {
              name: bucket.key,
              average_latency: serviceObject[bucket.key].latency,
              error_rate: serviceObject[bucket.key].error_rate,
              throughput: serviceObject[bucket.key].throughput,
              traces: bucket.trace_count.value,
              connected_services: connectedServices.sort(),
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

export const handleServiceMapRequest = async (http, DSL, items?, setItems?, currService?) => {
  let minutesInDateRange: number;
  const startTime = DSL?.custom?.timeFilter?.[0]?.range?.startTime;
  if (startTime) {
    const gte = dateMath.parse(startTime.gte)!;
    const lte = dateMath.parse(startTime.lte)!;
    minutesInDateRange = lte.diff(gte, 'minutes', true);
  }

  const map: ServiceObject = {};
  let id = 1;
  await handleDslRequest(http, null, getServiceNodesQuery())
    .then((response) =>
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
            destServices: [],
          })
      )
    )
    .catch((error) => console.error(error));

  const targets = {};
  await handleDslRequest(http, null, getServiceEdgesQuery('target'))
    .then((response) =>
      response.aggregations.service_name.buckets.map((bucket) => {
        bucket.resource.buckets.map((resource) => {
          resource.domain.buckets.map((domain) => {
            targets[resource.key + ':' + domain.key] = bucket.key;
          });
        });
      })
    )
    .catch((error) => console.error(error));
  await handleDslRequest(http, null, getServiceEdgesQuery('destination'))
    .then((response) =>
      Promise.all(
        response.aggregations.service_name.buckets.map((bucket) => {
          bucket.resource.buckets.map((resource) => {
            resource.domain.buckets.map((domain) => {
              const targetService = targets[resource.key + ':' + domain.key];
              if (targetService) {
                if (map[bucket.key].targetServices.indexOf(targetService) === -1)
                  map[bucket.key].targetServices.push(targetService);
                if (map[targetService].destServices.indexOf(bucket.key) === -1)
                  map[targetService].destServices.push(bucket.key);
              }
            });
          });
        })
      )
    )
    .catch((error) => console.error(error));

  // service map handles DSL differently
  const latencies = await handleDslRequest(
    http,
    DSL,
    getServiceMetricsQuery(DSL, Object.keys(map), map)
  );
  latencies.aggregations.service_name.buckets.map((bucket) => {
    map[bucket.key].latency = bucket.average_latency.value;
    map[bucket.key].error_rate = _.round(bucket.error_rate.value, 2) || 0;
    map[bucket.key].throughput = bucket.doc_count;
    if (minutesInDateRange != null)
      map[bucket.key].throughputPerMinute = _.round(bucket.doc_count / minutesInDateRange, 2);
  });

  if (currService) {
    await handleDslRequest(http, DSL, getRelatedServicesQuery(currService))
      .then((response) =>
        response.aggregations.traces.buckets.filter((bucket) => bucket.service.doc_count > 0)
      )
      .then((traces) => {
        const maxNumServices = Object.keys(map).length;
        const relatedServices = new Set<string>();
        for (let i = 0; i < traces.length; i++) {
          traces[i].all_services.buckets.map((bucket) => relatedServices.add(bucket.key));
          if (relatedServices.size === maxNumServices) break;
        }
        map[currService].relatedServices = [...relatedServices];
      })
      .catch((error) => console.error(error));
  }

  if (setItems) setItems(map);
  return map;
};

export const handleServiceViewRequest = (serviceName, http, DSL, fields, setFields) => {
  handleDslRequest(http, DSL, getServicesQuery(serviceName))
    .then(async (response) => {
      const bucket = response.aggregations.service.buckets[0];
      if (!bucket) return {};
      const serviceObject: ServiceObject = await handleServiceMapRequest(http, DSL);
      const connectedServices = [
        ...serviceObject[bucket.key].targetServices,
        ...serviceObject[bucket.key].destServices,
      ];
      return {
        name: bucket.key,
        connected_services: connectedServices.sort(),
        number_of_connected_services: connectedServices.length,
        average_latency: serviceObject[bucket.key].latency,
        error_rate: serviceObject[bucket.key].error_rate,
        throughput: serviceObject[bucket.key].throughput,
        traces: bucket.trace_count.value,
      };
    })
    .then((newFields) => {
      setFields(newFields);
    })
    .catch((error) => console.error(error));
};

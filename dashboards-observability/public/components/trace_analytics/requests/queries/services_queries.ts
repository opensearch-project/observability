/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DATA_PREPPER_SERVICE_INDEX_NAME,
  SERVICE_MAP_MAX_EDGES,
  SERVICE_MAP_MAX_NODES,
} from '../../../../../common/constants/trace_analytics';
import { getServiceMapTargetResources } from '../../components/common/helper_functions';
import { ServiceObject } from '../../components/common/plots/service_map';

export const getServicesQuery = (serviceName = null, DSL?) => {
  const query = {
    size: 0,
    query: {
      bool: {
        must: [],
        filter: [],
        should: [],
        must_not: [],
      },
    },
    aggs: {
      service: {
        terms: {
          field: 'serviceName',
          size: 10000,
        },
        aggs: {
          trace_count: {
            cardinality: {
              field: 'traceId',
            },
          },
        },
      },
    },
  };
  if (serviceName) {
    query.query.bool.must.push({
      term: {
        serviceName: serviceName,
      },
    });
  }
  DSL?.custom?.serviceNames?.map((service) => {
    query.query.bool.must.push({
      term: {
        serviceName: service,
      },
    });
  });
  DSL?.custom?.serviceNamesExclude?.map((service) => {
    query.query.bool.must_not.push({
      term: {
        serviceName: service,
      },
    });
  });
  return query;
};

export const getRelatedServicesQuery = (serviceName) => {
  const query = {
    size: 0,
    query: {
      bool: {
        must: [],
        filter: [],
        should: [],
        must_not: [],
      },
    },
    aggs: {
      traces: {
        terms: {
          field: 'traceId',
          size: 10000,
        },
        aggs: {
          all_services: {
            terms: {
              field: 'serviceName',
              size: 10000,
            },
          },
          service: {
            filter: {
              bool: {
                must: [
                  {
                    term: {
                      serviceName: serviceName,
                    },
                  },
                ],
                must_not: [],
              },
            },
          },
        },
      },
    },
  };
  return query;
};

export const getServiceNodesQuery = () => {
  return {
    index: DATA_PREPPER_SERVICE_INDEX_NAME,
    size: 0,
    query: {
      bool: {
        must: [],
        filter: [],
        should: [],
        must_not: [],
      },
    },
    aggs: {
      service_name: {
        terms: {
          field: 'serviceName',
          size: SERVICE_MAP_MAX_NODES,
        },
        aggs: {
          trace_group: {
            terms: {
              field: 'traceGroupName',
              size: SERVICE_MAP_MAX_EDGES,
            },
            aggs: {
              target_resource: {
                terms: {
                  field: 'target.resource',
                  size: SERVICE_MAP_MAX_EDGES,
                },
              },
            },
          },
        },
      },
    },
  };
};

export const getServiceEdgesQuery = (source: 'destination' | 'target') => {
  return {
    index: DATA_PREPPER_SERVICE_INDEX_NAME,
    size: 0,
    query: {
      bool: {
        must: [],
        filter: [],
        should: [],
        must_not: [],
      },
    },
    aggs: {
      service_name: {
        terms: {
          field: 'serviceName',
          size: SERVICE_MAP_MAX_EDGES,
        },
        aggs: {
          resource: {
            terms: {
              field: `${source}.resource`,
              size: SERVICE_MAP_MAX_EDGES,
            },
            aggs: {
              domain: {
                terms: {
                  field: `${source}.domain`,
                  size: SERVICE_MAP_MAX_EDGES,
                },
              },
            },
          },
        },
      },
    },
  };
};

export const getServiceMetricsQuery = (DSL, serviceNames: string[], map: ServiceObject) => {
  const traceGroupFilter = new Set(
    DSL?.query?.bool.must
      .filter((must) => must.term?.['traceGroup'])
      .map((must) => must.term['traceGroup']) || []
  );

  const targetResource =
    traceGroupFilter.size > 0
      ? [].concat(
          ...[].concat(
            ...serviceNames.map((service) =>
              map[service].traceGroups
                .filter((traceGroup) => traceGroupFilter.has(traceGroup.traceGroup))
                .map((traceGroup) => traceGroup.targetResource)
            )
          )
        )
      : [].concat(...Object.keys(map).map((service) => getServiceMapTargetResources(map, service)));
  const query: any = {
    size: 0,
    query: {
      bool: {
        must: [],
        should: [],
        must_not: [],
        filter: [
          {
            terms: {
              serviceName: serviceNames,
            },
          },
          {
            bool: {
              should: [
                {
                  bool: {
                    filter: [
                      {
                        bool: {
                          must_not: {
                            term: {
                              parentSpanId: {
                                value: '',
                              },
                            },
                          },
                        },
                      },
                      {
                        terms: {
                          name: targetResource,
                        },
                      },
                    ],
                  },
                },
                {
                  bool: {
                    must: {
                      term: {
                        parentSpanId: {
                          value: '',
                        },
                      },
                    },
                  },
                },
              ],
              adjust_pure_negative: true,
              boost: 1,
            },
          },
        ],
      },
    },
    aggregations: {
      service_name: {
        terms: {
          field: 'serviceName',
          size: SERVICE_MAP_MAX_NODES,
          min_doc_count: 1,
          shard_min_doc_count: 0,
          show_term_doc_count_error: false,
          order: [
            {
              _count: 'desc',
            },
            {
              _key: 'asc',
            },
          ],
        },
        aggregations: {
          average_latency_nanos: {
            avg: {
              field: 'durationInNanos',
            },
          },
          average_latency: {
            bucket_script: {
              buckets_path: {
                count: '_count',
                latency: 'average_latency_nanos.value',
              },
              script: 'Math.round(params.latency / 10000) / 100.0',
            },
          },
          error_count: {
            filter: {
              term: {
                'status.code': '2',
              },
            },
          },
          error_rate: {
            bucket_script: {
              buckets_path: {
                total: '_count',
                errors: 'error_count._count',
              },
              script: 'params.errors / params.total * 100',
            },
          },
        },
      },
    },
  };
  if (DSL.custom?.timeFilter.length > 0) query.query.bool.must.push(...DSL.custom.timeFilter);
  return query;
};

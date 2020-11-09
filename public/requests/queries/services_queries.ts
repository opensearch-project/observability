import {
  SERVICE_MAP_INDEX_NAME,
  SERVICE_MAP_MAX_EDGES,
  SERVICE_MAP_MAX_NODES,
} from '../../../common';
import { getServiceMapTargetResources } from '../../components/common';
import { ServiceObject } from '../../components/common/plots/service_map';

export const getServicesQuery = (serviceName = null, validTraceIds?) => {
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
  if (validTraceIds) {
    query.query.bool.must.push({
      terms: {
        traceId: validTraceIds,
      },
    });
  }
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
    index: SERVICE_MAP_INDEX_NAME,
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
    index: SERVICE_MAP_INDEX_NAME,
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

export const getServiceMetricsQuery = (
  DSL,
  serviceNames: string[],
  map: ServiceObject,
  validTraceIds: string[]
) => {
  const traceGroupFilter = new Set(DSL.custom?.traceGroup);
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
        must: [
          {
            terms: {
              traceId: validTraceIds,
            },
          },
        ],
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
                            exists: {
                              field: 'traceGroup',
                              boost: 1,
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
                      exists: {
                        field: 'traceGroup',
                        boost: 1,
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
              range: {
                'status.code': {
                  gt: '0',
                },
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

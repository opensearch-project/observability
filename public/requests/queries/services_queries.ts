import { SERVICE_MAP_INDEX_NAME, SERVICE_MAP_MAX_NODES } from '../../../common';

export const getServicesQuery = (serviceName = null) => {
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
      trace_group: {
        terms: {
          field: 'resource.attributes.service.name',
        },
        aggs: {
          traces: {
            filter: {
              bool: {
                must_not: {
                  exists: {
                    field: 'parentSpanId',
                  },
                },
              },
            },
          },
          error_count: {
            filter: {
              exists: {
                field: 'status.code',
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
        },
      },
    },
  };
  if (serviceName) {
    query.query.bool.must.push({
      term: {
        'resource.attributes.service.name': serviceName,
      },
    });
  }
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
      },
    },
  };
};

export const getServiceSourceQuery = (serviceName: string) => {
  return {
    index: SERVICE_MAP_INDEX_NAME,
    size: 1000,
    query: {
      bool: {
        must: [
          {
            term: {
              serviceName: {
                value: serviceName,
              },
            },
          },
          {
            exists: {
              field: 'destination',
            },
          },
        ],
        filter: [],
        should: [],
        must_not: [],
      },
    },
  };
};

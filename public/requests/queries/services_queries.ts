import {
  SERVICE_MAP_INDEX_NAME,
  SERVICE_MAP_MAX_EDGES,
  SERVICE_MAP_MAX_NODES,
} from '../../../common';

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
          field: 'serviceName',
        },
        aggs: {
          traces: {
            filter: {
              bool: {
                should: [
                  {
                    bool: {
                      must_not: [
                        {
                          exists: {
                            field: 'parentSpanId',
                          },
                        },
                      ],
                    },
                  },
                  {
                    term: {
                      parentSpanId: {
                        value: '',
                      },
                    },
                  },
                ],
              },
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
        serviceName: serviceName,
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

export const getServiceSourcesQuery = () => {
  return {
    index: SERVICE_MAP_INDEX_NAME,
    size: 0,
    query: {
      bool: {
        must: [
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
    aggs: {
      service_name: {
        terms: {
          field: 'serviceName',
          size: SERVICE_MAP_MAX_EDGES,
        },
        aggs: {
          resource: {
            terms: {
              field: 'destination.resource',
              size: SERVICE_MAP_MAX_EDGES,
            },
            aggs: {
              domain: {
                terms: {
                  field: 'destination.domain',
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

export const getServiceEdgesQuery = (destination: { resource: string; domain: string }) => {
  return {
    index: SERVICE_MAP_INDEX_NAME,
    size: 0,
    query: {
      bool: {
        must: [
          {
            term: {
              'target.resource': {
                value: destination.resource,
              },
            },
          },
          {
            term: {
              'target.domain': {
                value: destination.domain,
              },
            },
          },
        ],
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

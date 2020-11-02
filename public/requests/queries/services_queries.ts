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

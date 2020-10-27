export const getTracesQuery = (traceId = null) => {
  const query = {
    size: 1000,
    query: {
      bool: {
        must: [],
        must_not: [
          {
            exists: {
              field: 'parentSpanId',
            },
          },
        ],
      },
    },
    _source: {
      includes: ['traceId', 'name'],
    },
    script_fields: {
      latency: {
        script:
          "doc['endTime'].value.toInstant().toEpochMilli() - doc['startTime'].value.toInstant().toEpochMilli()",
      },
    },
  };
  if (traceId) {
    query.query.bool.must.push({
      term: {
        traceId,
      },
    });
  }
  return query;
};

export const getTracesLastUpdatedQuery = (traceId: string) => {
  return {
    size: 0,
    query: {
      bool: {
        must: [
          {
            term: {
              traceId,
            },
          },
        ],
      },
    },
    aggs: {
      last_updated: {
        max: {
          field: 'endTime',
        },
      },
    },
  };
};

export const getTracesErrorCountQuery = (traceId: string) => {
  return {
    size: 0,
    query: {
      bool: {
        must: [
          {
            term: {
              traceId,
            },
          },
          {
            exists: {
              field: 'status.code',
            },
          },
        ],
      },
    },
    aggs: {
      error_count: {
        value_count: {
          field: 'status.code',
        },
      },
    },
  };
};

export const getServiceBreakdownQuery = (traceId: string) => {
  const query = {
    size: 0,
    query: {
      bool: {
        must: [
          {
            term: {
              traceId,
            },
          },
        ],
      },
    },
    aggs: {
      service_type: {
        terms: {
          field: 'resource.attributes.service.name',
        },
        aggs: {
          total_latency: {
            scripted_metric: {
              init_script: `
                state.latencies = [];
              `,
              map_script: `
                state.latencies.add(doc['endTime'].value.toInstant().toEpochMilli() - doc['startTime'].value.toInstant().toEpochMilli());
              `,
              combine_script: `
                double sumLatency = 0;
                for (t in state.latencies) { 
                  sumLatency += t;
                }
                return sumLatency;
              `,
              reduce_script: `
                double sumLatency = 0;
                for (a in states) {
                  if (a != null) {
                    sumLatency += a;
                  }
                }
                return sumLatency;
              `,
            },
          },
        },
      },
    },
  };
  return query;
};

export const getSpanDetailQuery = (traceId: string, size = 200) => {
  const query = {
    from: 0,
    size,
    query: {
      bool: {
        must: [
          {
            term: {
              traceId,
            },
          },
          {
            exists: {
              field: 'resource.attributes.service.name',
            },
          },
        ],
      },
    },
    sort: [
      {
        startTime: {
          order: 'desc',
        },
      },
    ],
    _source: {
      includes: [
        'resource.attributes.service.name',
        'name',
        'startTime',
        'endTime',
        'spanId',
        'status.code',
      ],
    },
    script_fields: {
      latency: {
        script:
          "doc['endTime'].value.toInstant().toEpochMilli() - doc['startTime'].value.toInstant().toEpochMilli()",
      },
    },
  };
  return query;
};

export const getPayloadQuery = (traceId: string, size = 200) => {
  return {
    size,
    query: {
      bool: {
        must: [
          {
            term: {
              traceId,
            },
          },
        ],
      },
    },
  };
};

export const getTracesQuery = (traceId = null) => {
  const query = {
    size: 0,
    query: {
      bool: {
        must: [],
        filter: [],
        should: [],
        must_not: [
          {
            exists: {
              field: 'parentSpanId',
            },
          },
        ],
      },
    },
    aggs: {
      traces: {
        terms: {
          field: 'traceId',
          size: 10000,
        },
        aggs: {
          latency: {
            max: {
              script: {
                source: "Math.round(doc['durationInNanos'].value / 10000) / 100.0",
                lang: 'painless',
              },
            },
          },
          trace_group_name: {
            terms: {
              field: 'name',
              size: 1,
            },
          },
          last_updated: {
            max: {
              field: 'endTime',
            },
          },
          error_count: {
            filter: {
              range: {
                'status.code': {
                  gte: '0',
                },
              },
            },
          },
        },
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
        filter: [],
        should: [],
        must_not: [],
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
        filter: [],
        should: [],
        must_not: [],
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
        filter: [],
        should: [],
        must_not: [],
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
        filter: [],
        should: [],
        must_not: [],
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
        'durationInNanos',
      ],
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
        filter: [],
        should: [],
        must_not: [],
      },
    },
  };
};

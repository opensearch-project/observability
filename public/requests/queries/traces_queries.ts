export const getTraceGroupPercentilesQuery = () => {
  const query: any = {
    size: 0,
    query: {
      bool: {
        must: [
          {
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
        ],
        filter: [],
        should: [],
        must_not: [],
      },
    },
    aggs: {
      trace_group_name: {
        terms: {
          field: 'name',
          size: 10000,
        },
        aggs: {
          percentiles: {
            percentiles: {
              field: 'durationInNanos',
              percents: Array.from({ length: 101 }, (v, i) => i),
            },
          },
        },
      },
    },
  };
  return query;
};

export const getTracesQuery = (traceId = null) => {
  const query: any = {
    size: 0,
    query: {
      bool: {
        must: [
          {
            exists: {
              field: 'traceGroup',
            },
          },
        ],
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
          error_count: {
            filter: {
              range: {
                'status.code': {
                  gt: '0',
                },
              },
            },
          },
          last_updated: {
            max: {
              field: 'endTime',
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
          field: 'serviceName',
        },
        aggs: {
          total_latency_nanos: {
            sum: {
              field: 'durationInNanos',
            },
          },
          total_latency: {
            bucket_script: {
              buckets_path: {
                count: '_count',
                latency: 'total_latency_nanos.value',
              },
              script: 'Math.round(params.latency / 10000) / 100.0',
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
              field: 'serviceName',
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
        'serviceName',
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

export const getValidTraceIdsQuery = (DSL) => {
  const query: any = {
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
      },
    },
  };
  if (DSL.custom?.timeFilter.length > 0) query.query.bool.must.push(...DSL.custom.timeFilter);
  if (DSL.custom?.traceGroup.length > 0) {
    query.query.bool.filter.push({
      terms: {
        traceGroup: DSL.custom.traceGroup,
      },
    });
  }
  if (DSL.custom?.percentiles?.query.bool.should.length > 0) {
    query.query.bool.should.push(...DSL.custom.percentiles.query.bool.should);
    query.query.bool.minimum_should_match = DSL.custom.percentiles.query.bool.minimum_should_match;
  }
  if (DSL.custom?.serviceNames.length > 0) {
    query.query.bool.filter.push({
      terms: {
        serviceName: DSL.custom.serviceNames,
      },
    });
  }
  return query;
};

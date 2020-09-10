export const getDashboardQuery = () => {
  return {
    size: 0,
    query: {
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
    aggs: {
      trace_group: {
        terms: {
          field: 'name',
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
          average_latency: {
            bucket_script: {
              buckets_path: {
                count: '_count',
                latency: 'total_latency.value',
              },
              script: 'params.latency / params.count',
            },
          },
        },
      },
    },
  };
};

export const getDashboardErrorRateQuery = (traceGroupName: string) => {
  return {
    size: 0,
    query: {
      bool: {
        must: [
          {
            term: {
              name: traceGroupName,
            },
          },
        ],
      },
    },
    aggs: {
      trace_group: {
        terms: {
          field: 'name',
        },
        aggs: {
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
};

export const getDashboardLatencyTrendQuery = (traceGroupName: string) => {
  return {
    size: 0,
    query: {
      bool: {
        must: [
          {
            term: {
              name: traceGroupName,
            },
          },
        ],
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
      trace_group: {
        terms: {
          field: 'name',
        },
        aggs: {
          group_by_hour: {
            date_histogram: {
              field: 'endTime',
              calendar_interval: 'hour',
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
              average_latency: {
                bucket_script: {
                  buckets_path: {
                    count: '_count',
                    latency: 'total_latency.value',
                  },
                  script: 'params.latency / params.count',
                },
              },
            },
          },
        },
      },
    },
  };
};

export const getDashboardThroughputPltQuery = () => {
  return {
    size: 0,
    query: {
      bool: {
        must: [
          {
            range: {
              endTime: {
                gte: '2020-08-27T20:21:00.000Z',
                lte: '2020-08-27T20:26:00.000Z',
              },
            },
          },
        ],
      },
    },
    aggs: {
      throughput: {
        date_histogram: {
          field: 'endTime',
          calendar_interval: 'minute',
        },
      },
    },
  };
};

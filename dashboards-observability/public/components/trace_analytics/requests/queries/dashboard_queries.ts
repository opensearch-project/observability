/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const getDashboardQuery = () => {
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
      trace_group_name: {
        terms: {
          field: 'traceGroup',
          size: 10000,
        },
        aggs: {
          average_latency: {
            scripted_metric: {
              init_script: 'state.traceIdToLatencyMap = [:];',
              map_script: `
                if (doc.containsKey('traceGroupFields.durationInNanos') && !doc['traceGroupFields.durationInNanos'].empty) {
                  def traceId = doc['traceId'].value;
                  if (!state.traceIdToLatencyMap.containsKey(traceId)) {
                    state.traceIdToLatencyMap[traceId] = doc['traceGroupFields.durationInNanos'].value;
                  }
                }
              `,
              combine_script: 'return state.traceIdToLatencyMap',
              reduce_script: `
                def seenTraceIdsMap = [:];
                def totalLatency = 0.0;
                def traceCount = 0.0;

                for (s in states) {
                  if (s == null) {
                    continue;
                  }

                  for (entry in s.entrySet()) {
                    def traceId = entry.getKey();
                    def traceLatency = entry.getValue();
                    if (!seenTraceIdsMap.containsKey(traceId)) {
                      seenTraceIdsMap[traceId] = true;
                      totalLatency += traceLatency;
                      traceCount++;
                    }
                  }
                }

                def average_latency_nanos = totalLatency / traceCount;
                return Math.round(average_latency_nanos / 10000) / 100.0;
              `,
            },
          },
          trace_count: {
            cardinality: {
              field: 'traceId',
            },
          },
          error_count: {
            filter: {
              term: {
                'traceGroupFields.statusCode': '2',
              },
            },
            aggs: {
              trace_count: {
                cardinality: {
                  field: 'traceId',
                },
              },
            },
          },
          error_rate: {
            bucket_script: {
              buckets_path: {
                total: 'trace_count.value',
                errors: 'error_count>trace_count.value',
              },
              script: 'params.errors / params.total * 100',
            },
          },
        },
      },
    },
  };
  return query;
};

export const getLatencyTrendQuery = () => {
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
      trace_group_name: {
        terms: {
          field: 'traceGroup',
          size: 10000,
        },
        aggs: {
          group_by_hour: {
            date_histogram: {
              field: 'endTime',
              calendar_interval: 'hour',
            },
            aggs: {
              average_latency: {
                scripted_metric: {
                  init_script: 'state.traceIdToLatencyMap = [:];',
                  map_script: `
                    if (doc.containsKey('traceGroupFields.durationInNanos') && !doc['traceGroupFields.durationInNanos'].empty) {
                      def traceId = doc['traceId'].value;
                      if (!state.traceIdToLatencyMap.containsKey(traceId)) {
                        state.traceIdToLatencyMap[traceId] = doc['traceGroupFields.durationInNanos'].value;
                      }
                    }
                  `,
                  combine_script: 'return state.traceIdToLatencyMap',
                  reduce_script: `
                    def seenTraceIdsMap = [:];
                    def totalLatency = 0.0;
                    def traceCount = 0.0;

                    for (s in states) {
                      if (s == null) {
                        continue;
                      }

                      for (entry in s.entrySet()) {
                        def traceId = entry.getKey();
                        def traceLatency = entry.getValue();
                        if (!seenTraceIdsMap.containsKey(traceId)) {
                          seenTraceIdsMap[traceId] = true;
                          totalLatency += traceLatency;
                          traceCount++;
                        }
                      }
                    }

                    def average_latency_nanos = totalLatency / traceCount;
                    return Math.round(average_latency_nanos / 10000) / 100.0;
                  `,
                },
              },
            },
          },
        },
      },
    },
  };
  return query;
};

export const getDashboardTraceGroupPercentiles = () => {
  return {
    size: 0,
    query: {
      bool: {
        must: [
          {
            term: {
              parentSpanId: {
                value: '',
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
      trace_group: {
        terms: {
          field: 'traceGroup',
        },
        aggs: {
          latency_variance_nanos: {
            percentiles: {
              field: 'traceGroupFields.durationInNanos',
              percents: [0, 95, 100],
            },
          },
        },
      },
    },
  };
};

export const getErrorRatePltQuery = (fixedInterval) => {
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
      error_rate: {
        date_histogram: {
          field: 'startTime',
          fixed_interval: fixedInterval,
        },
        aggs: {
          error_count: {
            filter: {
              term: {
                'traceGroupFields.statusCode': '2',
              },
            },
            aggs: {
              trace_count: {
                cardinality: {
                  field: 'traceId',
                },
              },
            },
          },
          trace_count: {
            cardinality: {
              field: 'traceId',
            },
          },
          error_rate: {
            bucket_script: {
              buckets_path: {
                total: 'trace_count.value',
                errors: 'error_count>trace_count.value',
              },
              script: 'params.errors / params.total * 100',
            },
          },
        },
      },
    },
  };
  return query;
};

export const getDashboardThroughputPltQuery = (fixedInterval) => {
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
      throughput: {
        date_histogram: {
          field: 'startTime',
          fixed_interval: fixedInterval,
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
  return query;
};

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { TraceAnalyticsMode } from "../../home";

export const getDashboardQuery = () => {
  return {
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
};

export const getJaegerDashboardQuery = () => {
  return {
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
        multi_terms: {
          terms: [
            {
              field: "process.serviceName"
            },
            {
              field: "operationName"
            },
          ],
        },
        aggs: {
          average_latency: {
          scripted_metric: {
            init_script: 'state.traceIDToLatencyMap = [:];',
            map_script: `
              if (doc.containsKey('duration') && !doc['duration'].empty) {
                def traceID = doc['traceID'].value;
                if (!state.traceIDToLatencyMap.containsKey(traceID)) {
                  state.traceIDToLatencyMap[traceID] = doc['duration'].value;
                }
              }
            `,
            combine_script: 'return state.traceIDToLatencyMap',
            reduce_script: `
              def seenTraceIdsMap = [:];
              def totalLatency = 0.0;
              def traceCount = 0.0;

              for (s in states) {
                if (s == null) {
                  continue;
                }

                for (entry in s.entrySet()) {
                  def traceID = entry.getKey();
                  def traceLatency = entry.getValue();
                  if (!seenTraceIdsMap.containsKey(traceID)) {
                    seenTraceIdsMap[traceID] = true;
                    totalLatency += traceLatency;
                    traceCount++;
                  }
                }
              }

              def average_latency_nanos = totalLatency / traceCount;
              return Math.round(average_latency_nanos / 10) / 100.0;
            `,
          },
          },
      
          trace_count: {
            cardinality: {
              field: 'traceID',
            },
          },
          error_count: {
            filter: {
              term: {
                'tag.error': true,
              },
            },
            aggs: {
              trace_count: {
                cardinality: {
                  field: 'traceID',
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
          sort_by_latency: {
            bucket_sort: {
              sort: [
                {
                  "average_latency.value": {
                    "order": "desc"
                  }
                }
              ],
              size: 5
            }
          },
        },
      },
  },
}
};

export const getJaegerErrorDashboardQuery = () => {
  return {
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
        multi_terms: {
          terms: [
            {
              field: "process.serviceName"
            },
            {
              field: "operationName"
            },
          ],
        },
        aggs: {
          average_latency: {
          scripted_metric: {
            init_script: 'state.traceIDToLatencyMap = [:];',
            map_script: `
              if (doc.containsKey('duration') && !doc['duration'].empty) {
                def traceID = doc['traceID'].value;
                if (!state.traceIDToLatencyMap.containsKey(traceID)) {
                  state.traceIDToLatencyMap[traceID] = doc['duration'].value;
                }
              }
            `,
            combine_script: 'return state.traceIDToLatencyMap',
            reduce_script: `
              def seenTraceIdsMap = [:];
              def totalLatency = 0.0;
              def traceCount = 0.0;

              for (s in states) {
                if (s == null) {
                  continue;
                }

                for (entry in s.entrySet()) {
                  def traceID = entry.getKey();
                  def traceLatency = entry.getValue();
                  if (!seenTraceIdsMap.containsKey(traceID)) {
                    seenTraceIdsMap[traceID] = true;
                    totalLatency += traceLatency;
                    traceCount++;
                  }
                }
              }

              def average_latency_nanos = totalLatency / traceCount;
              return Math.round(average_latency_nanos / 10) / 100.0;
            `,
          },
          },
      
          trace_count: {
            cardinality: {
              field: 'traceID',
            },
          },
          error_count: {
            filter: {
              term: {
                'tag.error': true,
              },
            },
            aggs: {
              trace_count: {
                cardinality: {
                  field: 'traceID',
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
          sort_by_latency: {
            bucket_sort: {
              sort: [
                {
                  "error_rate.value": {
                    "order": "desc"
                  }
                }
              ],
              size: 5
            }
          },
        },
      },
  },
}
};

export const getLatencyTrendQuery = () => {
  return {
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
};

export const getJaegerLatencyTrendQuery = () => {
  return {
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
        multi_terms: {
          terms: [
            {
              field: "process.serviceName"
            },
            {
              field: "operationName"
            },
          ],
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
};

export const getJaegerErrorTrendQuery = () => {
  return {
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
        multi_terms: {
          terms: [
            {
              field: "process.serviceName"
            },
            {
              field: "operationName"
            },
          ],
        },
        aggs: {
          group_by_hour: {
            date_histogram: {
              field: 'endTime',
              calendar_interval: 'hour',
            },
            aggs: {
              error_count: {
                filter: {
                  term: {
                    'tag.error': true,
                  },
                },
                aggs: {
                  trace_count: {
                    cardinality: {
                      field: 'traceID',
                    },
                  },
                },
              },
              trace_count: {
                cardinality: {
                  field: 'traceID',
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
      },
    },
  };
};


export const getDashboardTraceGroupPercentiles = (mode: TraceAnalyticsMode) => {
  if (mode === 'data_prepper') { 
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
  } else if (mode === 'jaeger') { 
    return {
      size: 0,
      query: {
        bool: {
          must: [],
          filter: [{
            bool: {
              must_not: {
                exists: {
                  field: "references"
                }
              },
            },
          }],
          should: [],
          must_not: [],
        },
      },
      aggs: {
        trace_group: {
        multi_terms: {
          terms: [
            {
              field: "process.serviceName"
            },
            {
              field: "operationName"
            },
          ],
        },
        aggs: {
          latency_variance_micros: {
            percentiles: {
              field: 'duration',
              percents: [0, 95, 100],
            },
        },
      },
      }
  },
  }
};
};

export const getErrorRatePltQuery = (mode: TraceAnalyticsMode, fixedInterval) => {
  if (mode === 'data_prepper') {
    return {
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
  } else if (mode === 'jaeger') {
    return {
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
            field: 'startTimeMillis',
            fixed_interval: fixedInterval,
          },
          aggs: {
            error_count: {
              filter: {
                term: {
                  'tag.error': true,
                },
              },
              aggs: {
                trace_count: {
                  cardinality: {
                    field: 'traceID',
                  },
                },
              },
            },
            trace_count: {
              cardinality: {
                field: 'traceID',
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
  }
};

export const getTopErrorRatePltQuery = (fixedInterval) => {
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
          field: 'startTimeMillis',
          fixed_interval: fixedInterval,
        },
        aggs: {
          error_count: {
            filter: {
              term: {
                'tag.error': true,
              },
            },
            aggs: {
              trace_count: {
                cardinality: {
                  field: 'traceID',
                },
              },
            },
          },
          trace_count: {
            cardinality: {
              field: 'traceID',
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

export const getDashboardThroughputPltQuery = (mode: TraceAnalyticsMode, fixedInterval) => {
  return {
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
          field: mode === 'jaeger' ? 'startTimeMillis' : 'startTime',
          fixed_interval: fixedInterval,
        },
        aggs: {
          trace_count: {
            cardinality: {
              field: mode === 'jaeger' ? 'traceID': 'traceId',
            },
          },
        },
      },
    },
  };
};

export const getDashboardErrorTopGroupsQuery = (mode: TraceAnalyticsMode) => {
  return {
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
        multi_terms: {
          terms: [
            {
              "field": "process.serviceName"
            },
            {
              "field": "operationName"
            }
          ],
        },
        aggs: {
          error_count: {
            filter: {
              term: {
                'tag.error': true,
              },
            },
            aggs: {
              trace_count: {
                cardinality: {
                  field: 'traceID',
                },
              },
            },
          },
          trace_count: {
            cardinality: {
              field: 'traceID',
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
          sort_by_errors: {
            bucket_sort: {
              sort: [
                {
                  "error_rate.value": {
                    "order": "desc"
                  }
                }
              ],
              size: 5
            }
          },
        },
      },
    },
  };
};

export const getDashboardThroughputTopGroupsQuery = (mode: TraceAnalyticsMode) => {
  return {
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
        multi_terms: {
          terms: [
            {
              "field": "process.serviceName"
            },
            {
              "field": "operationName"
            }
          ],
        },
        aggs: {
          trace_count: {
            cardinality: {
              field: mode === 'jaeger' ? 'traceID': 'traceId',
            },
          },
          average_latency: {
            scripted_metric: {
              init_script: 'state.traceIDToLatencyMap = [:];',
              map_script: `
                if (doc.containsKey('duration') && !doc['duration'].empty) {
                  def traceID = doc['traceID'].value;
                  if (!state.traceIDToLatencyMap.containsKey(traceID)) {
                    state.traceIDToLatencyMap[traceID] = doc['duration'].value;
                  }
                }
              `,
              combine_script: 'return state.traceIDToLatencyMap',
              reduce_script: `
                def seenTraceIdsMap = [:];
                def totalLatency = 0.0;
                def traceCount = 0.0;

                for (s in states) {
                  if (s == null) {
                    continue;
                  }

                  for (entry in s.entrySet()) {
                    def traceID = entry.getKey();
                    def traceLatency = entry.getValue();
                    if (!seenTraceIdsMap.containsKey(traceID)) {
                      seenTraceIdsMap[traceID] = true;
                      totalLatency += traceLatency;
                      traceCount++;
                    }
                  }
                }

                def average_latency_nanos = totalLatency / traceCount;
                return Math.round(average_latency_nanos / 10) / 100.0;
              `,
            },
          },
          sort_by_latency: {
            bucket_sort: {
              sort: [
                {
                  "average_latency.value": {
                    "order": "desc"
                  }
                }
              ],
              size: 5
            }
          },
        },
      },
    },
  };
};

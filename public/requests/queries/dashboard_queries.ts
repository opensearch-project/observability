export const getDashboardQuery = () => {
  return {
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
      trace_group: {
        terms: {
          field: 'name',
        },
        aggs: {
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
};

export const getDashboardTraceGroupPercentiles = () => {
  return {
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
      trace_group: {
        terms: {
          field: 'name',
        },
        aggs: {
          latency_variance_nanos: {
            percentiles: {
              field: 'durationInNanos',
              percents: [0, 95, 100],
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
      },
    },
  };
};

export const getErrorRatePltQuery = (fixedInterval) => {
  return {
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
      error_rate: {
        date_histogram: {
          field: 'startTime',
          fixed_interval: fixedInterval,
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

export const getDashboardThroughputPltQuery = (fixedInterval) => {
  return {
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
      throughput: {
        date_histogram: {
          field: 'startTime',
          fixed_interval: fixedInterval,
        },
      },
    },
  };
};

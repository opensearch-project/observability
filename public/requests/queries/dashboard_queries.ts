/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
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
          field: 'name',
          size: 10000,
        },
        aggs: {
          parent_span: {
            filter: {
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
              },
            },
            aggs: {
              trace_group_name: {
                terms: {
                  field: 'name',
                  size: 1,
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
  return query;
};

export const getDashboardThroughputPltQuery = (fixedInterval) => {
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
      throughput: {
        date_histogram: {
          field: 'startTime',
          fixed_interval: fixedInterval,
        },
      },
    },
  };
  return query;
};

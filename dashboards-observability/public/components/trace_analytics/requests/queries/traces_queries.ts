/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { PropertySort } from '@elastic/eui';
import { TRACES_MAX_NUM } from '../../../../../common/constants/trace_analytics';
import { SpanSearchParams } from '../../components/traces/span_detail_table';
import { TraceAnalyticsMode } from '../../home';

export const getTraceGroupPercentilesQuery = () => {
  const query: any = {
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

export const getTracesQuery = (mode: TraceAnalyticsMode, traceId: string = '', sort?: PropertySort) => {
  const field = sort?.field || '_key';
  const direction = sort?.direction || 'asc';
  const jaegerQuery: any = {
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
          field: 'traceID',
          size: TRACES_MAX_NUM,
          order: {
            [field]: direction,
          },
        },
        aggs: {
          latency: {
            max: {
              script: {
                source: `
                if (doc.containsKey('duration') && !doc['duration'].empty) {
                  return Math.round(doc['duration'].value) / 1000.0
                }

                return 0
                `,
                lang: 'painless',
              },
            },
          },
          trace_group: {
            terms: {
              field: 'traceGroup',
              size: 1,
            },
          },
          error_count: {
            filter: {
              term: {
                'tag.error': true,
              },
            },
          },
          last_updated: {
            max: {
              script: {
                source: `
                if (doc.containsKey('startTime') && !doc['startTime'].empty && doc.containsKey('duration') && !doc['duration'].empty) {
                  return (Math.round(doc['duration'].value) + Math.round(doc['startTime'].value)) / 1000.0
                }

                return 0
                `,
                lang: 'painless',
              },
            },
          },
        },
      },
    },
  };
  const dataPrepperQuery: any = {
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
          size: TRACES_MAX_NUM,
          order: {
            [field]: direction,
          },
        },
        aggs: {
          latency: {
            max: {
              script: {
                source: `
                if (doc.containsKey('traceGroupFields.durationInNanos') && !doc['traceGroupFields.durationInNanos'].empty) {
                  return Math.round(doc['traceGroupFields.durationInNanos'].value / 10000) / 100.0
                }
                return 0
                `,
                lang: 'painless',
              },
            },
          },
          trace_group: {
            terms: {
              field: 'traceGroup',
              size: 1,
            },
          },
          error_count: {
            filter: {
              term: {
                'traceGroupFields.statusCode': '2',
              },
            },
          },
          last_updated: {
            max: {
              field: 'traceGroupFields.endTime',
            },
          },
        },
      },
    },
  };
  if (traceId) {
    jaegerQuery.query.bool.must.push({
      term: {
        "traceID": traceId,
      },
    });
    dataPrepperQuery.query.bool.must.push({
      term: {
        traceId,
      },
    });
  }
  return mode === 'jaeger' ? jaegerQuery : dataPrepperQuery;
};

export const getServiceBreakdownQuery = (traceId: string, mode: TraceAnalyticsMode) => {
  const jaegerQuery = {
    size: 0,
    query: {
      bool: {
        must: [
          {
            term: {
              "traceID": traceId,
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
          field: 'process.serviceName',
          order: [
            {
              total_latency_nanos: 'desc',
            },
          ],
        },
        aggs: {
          total_latency_nanos: {
            sum: {
              field: 'duration',
            },
          },
          total_latency: {
            bucket_script: {
              buckets_path: {
                count: '_count',
                latency: 'total_latency_nanos.value',
              },
              script: 'Math.round(params.latency / 10) / 100.0',
            },
          },
        },
      },
    },
  };
  const dataPrepperQuery = {
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
          order: [
            {
              total_latency_nanos: 'desc',
            },
          ],
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
  return mode === 'jaeger'? jaegerQuery : dataPrepperQuery;
};

export const getSpanDetailQuery = (mode: TraceAnalyticsMode, traceId: string, size = 3000) => {
  if (mode === 'jaeger') {
    return {
      size,
      query: {
        bool: {
          must: [
            {
              term: {
                "traceID": traceId,
              },
            },
            {
              exists: {
                field: 'process.serviceName',
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
          'process.serviceName',
          'operationName',
          'startTime',
          'endTime',
          'spanID',
          'tag',
          'duration',
          'references'
        ]
      },
    };
  } 
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
};

export const getPayloadQuery = (mode: TraceAnalyticsMode, traceId: string, size = 1000) => {
  if (mode === 'jaeger') {
    return {
      size,
      query: {
        bool: {
          must: [
            {
              term: {
                "traceID": traceId,
              },
            },
          ],
          filter: [],
          should: [],
          must_not: [],
        },
      },
    };
  }
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

export const getSpanFlyoutQuery = (mode: TraceAnalyticsMode, spanId?: string, size = 1000) => {
  if (mode === 'jaeger') {
    return {
      size,
      query: {
        bool: {
          must: [
            {
              term: {
                "spanID": spanId,
              },
            },
          ],
          filter: [],
          should: [],
          must_not: [],
        },
      },
    };
  }
  return {
    size,
    query: {
      bool: {
        must: [
          {
            term: {
              spanId,
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

export const getSpansQuery = (spanSearchParams: SpanSearchParams) => {
  const query: any = {
    size: spanSearchParams.size,
    from: spanSearchParams.from,
    query: {
      bool: {
        must: [],
        filter: [],
        should: [],
        must_not: [],
      },
    },
    sort: spanSearchParams.sortingColumns,
  };
  return query;
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
          field: 'traceID',
          size: 10000,
        },
      },
    },
  };
  if (DSL.custom?.timeFilter.length > 0) query.query.bool.must.push(...DSL.custom.timeFilter);
  if (DSL.custom?.traceGroupFields.length > 0) {
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
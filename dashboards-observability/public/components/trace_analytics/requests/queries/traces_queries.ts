/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

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

import { PropertySort } from '@elastic/eui';
import { TRACES_MAX_NUM } from '../../../../../common/constants/trace_analytics';
import { SpanSearchParams } from '../../components/traces/span_detail_table';

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

export const getTracesQuery = (traceId = null, sort?: PropertySort) => {
  const field = sort?.field || '_key';
  const direction = sort?.direction || 'asc';
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
  return query;
};

export const getSpanDetailQuery = (traceId: string, size = 200) => {
  const query = {
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

export const getPayloadQuery = (traceId: string, size = 1000) => {
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

export const getSpanFlyoutQuery = (spanId?: string, size = 1000) => {
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
          field: 'traceId',
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

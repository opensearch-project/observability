/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { composeAggregations } from '../utils';

describe('test query manager utilities', () => {
  it('should compose a recipe object with fields for building stats substree', () => {
    const statsRecipe = composeAggregations(
      // UI configurable
      {
        metrics: [],
        dimensions: [],
      },
      // come directly from query parsing and are not support in UI configurations
      {
        partitions: {
          keyword: 'partitions',
          sign: '',
          value: '+3',
        },
        allnum: {
          keyword: 'allnum',
          sign: '=',
          value: 'true',
        },
        delim: {
          keyword: 'delim',
          sign: '=',
          value: '"test"',
        },
        dedup_split_value: {
          keyword: 'dedup_splitvalues',
          sign: '=',
          value: 'false',
        },
        aggregations: [
          {
            alias: 'total_sum',
            function: {
              name: 'count',
              percentile_agg_function: '',
              value_expression: '',
            },
          },
          {
            alias: 'avg_bytes',
            function: {
              name: 'avg',
              percentile_agg_function: '',
              value_expression: 'bytes',
            },
          },
        ],
        groupby: {
          group_fields: [
            {
              name: 'host',
            },
          ],
          span: {
            alias: 'time_interval',
            span_expression: {
              field: 'timestamp',
              literal_value: '2',
              time_unit: 'm',
            },
          },
        },
      }
    );
  });
});

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

import _ from 'lodash';
import moment from 'moment';
import { TRACE_ANALYTICS_PLOTS_DATE_FORMAT } from '../../../../common/constants/trace_analytics';
import { fixedIntervalToMilli, nanoToMilliSec } from '../components/common/helper_functions';
import {
  getDashboardQuery,
  getDashboardThroughputPltQuery,
  getDashboardTraceGroupPercentiles,
  getErrorRatePltQuery,
  getLatencyTrendQuery,
} from './queries/dashboard_queries';
import { handleDslRequest } from './request_handler';

export const handleDashboardRequest = async (
  http,
  DSL,
  timeFilterDSL,
  latencyTrendDSL,
  items,
  setItems,
  setPercentileMap?
) => {
  // latency_variance should only be affected by timefilter
  const latencyVariances = await handleDslRequest(
    http,
    timeFilterDSL,
    getDashboardTraceGroupPercentiles()
  )
    .then((response) => {
      const map: any = {};
      response.aggregations.trace_group.buckets.forEach((traceGroup) => {
        map[traceGroup.key] = Object.values(
          traceGroup.latency_variance_nanos.values
        ).map((nano: number) => _.round(nanoToMilliSec(Math.max(0, nano)), 2));
      });
      return map;
    })
    .catch((error) => console.error(error));
  if (setPercentileMap) setPercentileMap(latencyVariances);

  const latencyTrends = await handleDslRequest(http, latencyTrendDSL, getLatencyTrendQuery())
    .then((response) => {
      const map: any = {};
      response.aggregations.trace_group_name.buckets.map((bucket) => {
        const latencyTrend = bucket.group_by_hour.buckets
          .slice(-24)
          .filter((bucket) => bucket.average_latency?.value || bucket.average_latency?.value === 0);
        const values = {
          x: latencyTrend.map((bucket) => bucket.key),
          y: latencyTrend.map((bucket) => bucket.average_latency?.value || 0),
        };
        const latencyTrendData =
          values.x?.length > 0
            ? {
                '24_hour_latency_trend': {
                  trendData: [
                    {
                      ...values,
                      type: 'scatter',
                      mode: 'lines',
                      hoverinfo: 'none',
                      line: {
                        color: '#000000',
                        width: 1,
                      },
                    },
                  ],
                  popoverData: [
                    {
                      ...values,
                      type: 'scatter',
                      mode: 'lines+markers',
                      hovertemplate: '%{x}<br>Average latency: %{y}<extra></extra>',
                      hoverlabel: {
                        bgcolor: '#d7c2ff',
                      },
                      marker: {
                        color: '#987dcb',
                        size: 8,
                      },
                      line: {
                        color: '#987dcb',
                        size: 2,
                      },
                    },
                  ],
                },
              }
            : {};
        map[bucket.key] = latencyTrendData;
      });
      return map;
    })
    .catch((error) => console.error(error));

  await handleDslRequest(http, DSL, getDashboardQuery())
    .then((response) => {
      return Promise.all(
        response.aggregations.trace_group_name.buckets.map((bucket) => {
          const latencyTrend = latencyTrends?.[bucket.key] || {};
          return {
            dashboard_trace_group_name: bucket.key,
            dashboard_average_latency: bucket.average_latency?.value,
            dashboard_traces: bucket.trace_count.value,
            dashboard_latency_variance: latencyVariances[bucket.key],
            dashboard_error_rate: bucket.error_rate.value,
            ...latencyTrend,
          };
        })
      );
    })
    .then((newItems) => {
      setItems(newItems);
    })
    .catch((error) => console.error(error));
};

export const handleDashboardThroughputPltRequest = (http, DSL, fixedInterval, items, setItems) => {
  return handleDslRequest(http, DSL, getDashboardThroughputPltQuery(fixedInterval))
    .then((response) => {
      const buckets = response.aggregations.throughput.buckets;
      const texts = buckets.map(
        (bucket) =>
          `${moment(bucket.key).format(TRACE_ANALYTICS_PLOTS_DATE_FORMAT)} - ${moment(
            bucket.key + fixedIntervalToMilli(fixedInterval)
          ).format(TRACE_ANALYTICS_PLOTS_DATE_FORMAT)}`
      );
      const newItems =
        buckets.length > 0
          ? [
              {
                x: buckets.map((bucket) => bucket.key),
                y: buckets.map((bucket) => bucket.trace_count.value),
                marker: {
                  color: 'rgb(171, 211, 240)',
                },
                type: 'bar',
                customdata: texts,
                hoverlabel: {
                  align: 'left',
                },
                hovertemplate: '%{customdata}<br>Throughput: %{y:,}<extra></extra>',
              },
            ]
          : [];
      setItems({ items: newItems, fixedInterval: fixedInterval });
    })
    .catch((error) => console.error(error));
};

export const handleDashboardErrorRatePltRequest = (http, DSL, fixedInterval, items, setItems) => {
  return handleDslRequest(http, DSL, getErrorRatePltQuery(fixedInterval))
    .then((response) => {
      const buckets = response.aggregations.error_rate.buckets;
      const texts = buckets.map(
        (bucket) =>
          `${moment(bucket.key).format(TRACE_ANALYTICS_PLOTS_DATE_FORMAT)} - ${moment(
            bucket.key + fixedIntervalToMilli(fixedInterval)
          ).format(TRACE_ANALYTICS_PLOTS_DATE_FORMAT)}`
      );
      const newItems =
        buckets.length > 0
          ? [
              {
                x: buckets.map((bucket) => bucket.key),
                y: buckets.map((bucket) => _.round(bucket.error_rate?.value || 0, 2)),
                marker: {
                  color: '#fad963',
                },
                type: 'bar',
                customdata: texts,
                hoverlabel: {
                  align: 'left',
                },
                hovertemplate: '%{customdata}<br>Error rate: %{y}<extra></extra>',
              },
            ]
          : [];
      setItems({ items: newItems, fixedInterval: fixedInterval });
    })
    .catch((error) => console.error(error));
};

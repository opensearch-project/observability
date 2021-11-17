/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import _ from 'lodash';
import moment from 'moment';
import { v1 as uuid } from 'uuid';
import { TRACE_ANALYTICS_DATE_FORMAT } from '../../../../common/constants/trace_analytics';
import { nanoToMilliSec } from '../components/common/helper_functions';
import { SpanSearchParams } from '../components/traces/span_detail_table';
import {
  getPayloadQuery,
  getServiceBreakdownQuery,
  getSpanDetailQuery,
  getSpanFlyoutQuery,
  getSpansQuery,
  getTraceGroupPercentilesQuery,
  getTracesQuery,
  getValidTraceIdsQuery
} from './queries/traces_queries';
import { handleDslRequest } from './request_handler';

export const handleValidTraceIds = (http, DSL) => {
  return handleDslRequest(http, {}, getValidTraceIdsQuery(DSL))
    .then((response) => response.aggregations.traces.buckets.map((bucket) => bucket.key))
    .catch((error) => console.error(error));
};

export const handleTracesRequest = async (http, DSL, timeFilterDSL, items, setItems, sort?) => {
  const binarySearch = (arr: number[], target: number) => {
    if (!arr) return Number.NaN;
    let low = 0;
    let high = arr.length;
    let mid;
    while (low < high) {
      mid = Math.floor((low + high) / 2);
      if (arr[mid] < target) low = mid + 1;
      else high = mid;
    }
    return Math.max(0, Math.min(100, low));
  };

  // percentile should only be affected by timefilter
  const percentileRanges = await handleDslRequest(
    http,
    timeFilterDSL,
    getTraceGroupPercentilesQuery()
  ).then((response) => {
    const map: any = {};
    response.aggregations.trace_group_name.buckets.forEach((traceGroup) => {
      map[traceGroup.key] = Object.values(traceGroup.percentiles.values).map((value: number) =>
        nanoToMilliSec(value)
      );
    });
    return map;
  });

  return handleDslRequest(http, DSL, getTracesQuery(undefined, sort))
    .then((response) => {
      return Promise.all(
        response.aggregations.traces.buckets.map((bucket) => {
          return {
            trace_id: bucket.key,
            trace_group: bucket.trace_group.buckets[0]?.key,
            latency: bucket.latency.value,
            last_updated: moment(bucket.last_updated.value).format(TRACE_ANALYTICS_DATE_FORMAT),
            error_count: bucket.error_count.doc_count,
            percentile_in_trace_group: binarySearch(
              percentileRanges[bucket.trace_group.buckets[0]?.key],
              bucket.latency.value
            ),
            actions: '#',
          };
        })
      );
    })
    .then((newItems) => {
      setItems(newItems);
    })
    .catch((error) => console.error(error));
};

export const handleTraceViewRequest = (traceId, http, fields, setFields) => {
  handleDslRequest(http, null, getTracesQuery(traceId))
    .then(async (response) => {
      const bucket = response.aggregations.traces.buckets[0];
      return {
        trace_id: bucket.key,
        trace_group: bucket.trace_group.buckets[0]?.key,
        last_updated: moment(bucket.last_updated.value).format(TRACE_ANALYTICS_DATE_FORMAT),
        user_id: 'N/A',
        latency: bucket.latency.value,
        latency_vs_benchmark: 'N/A',
        percentile_in_trace_group: 'N/A',
        error_count: bucket.error_count.doc_count,
        errors_vs_benchmark: 'N/A',
      };
    })
    .then((newFields) => {
      setFields(newFields);
    })
    .catch((error) => console.error(error));
};

// setColorMap sets serviceName to color mappings
export const handleServicesPieChartRequest = async (
  traceId,
  http,
  setServiceBreakdownData,
  setColorMap
) => {
  const colors = [
    '#7492e7',
    '#c33d69',
    '#2ea597',
    '#8456ce',
    '#e07941',
    '#3759ce',
    '#ce567c',
    '#9469d6',
    '#4066df',
    '#da7596',
    '#a783e1',
    '#5978e3',
  ];
  const colorMap = {};
  let index = 0;
  await handleDslRequest(http, null, getServiceBreakdownQuery(traceId))
    .then((response) =>
      Promise.all(
        response.aggregations.service_type.buckets.map((bucket) => {
          colorMap[bucket.key] = colors[index++ % colors.length];
          return {
            name: bucket.key,
            color: colorMap[bucket.key],
            value: bucket.total_latency.value,
            benchmark: 0,
          };
        })
      )
    )
    .then((newItems) => {
      const latencySum = newItems.map((item) => item.value).reduce((a, b) => a + b, 0);
      return [
        {
          values: newItems.map((item) =>
            latencySum === 0 ? 100 : (item.value / latencySum) * 100
          ),
          labels: newItems.map((item) => item.name),
          benchmarks: newItems.map((item) => item.benchmark),
          marker: {
            colors: newItems.map((item) => item.color),
          },
          type: 'pie',
          textinfo: 'none',
          hovertemplate: '%{label}<br>%{value:.2f}%<extra></extra>',
        },
      ];
    })
    .then((newItems) => {
      setServiceBreakdownData(newItems);
      setColorMap(colorMap);
    })
    .catch((error) => console.error(error));
};

export const handleSpansGanttRequest = (
  traceId,
  http,
  setSpanDetailData,
  colorMap,
  spanFiltersDSL
) => {
  handleDslRequest(http, spanFiltersDSL, getSpanDetailQuery(traceId))
    .then((response) => hitsToSpanDetailData(response.hits.hits, colorMap))
    .then((newItems) => setSpanDetailData(newItems))
    .catch((error) => console.error(error));
};

export const handleSpansFlyoutRequest = (http, spanId, setItems) => {
  handleDslRequest(http, null, getSpanFlyoutQuery(spanId))
    .then((response) => {
      setItems(response?.hits.hits?.[0]?._source);
    })
    .catch((error) => console.error(error));
};

const hitsToSpanDetailData = async (hits, colorMap) => {
  const data = { gantt: [], table: [], ganttMaxX: 0 };
  if (hits.length === 0) return data;

  const minStartTime = nanoToMilliSec(hits[hits.length - 1].sort[0]);
  let maxEndTime = 0;

  hits.forEach((hit) => {
    const startTime = nanoToMilliSec(hit.sort[0]) - minStartTime;
    const duration = _.round(nanoToMilliSec(hit._source.durationInNanos), 2);
    const serviceName = _.get(hit, ['_source', 'serviceName']);
    const name = _.get(hit, '_source.name');
    const error = hit._source['status.code'] === 2 ? ' \u26a0 Error' : '';
    const uniqueLabel = `${serviceName} <br>${name} ` + uuid();
    maxEndTime = Math.max(maxEndTime, startTime + duration);

    data.table.push({
      service_name: serviceName,
      span_id: hit._source.spanId,
      latency: duration,
      vs_benchmark: 0,
      error,
      start_time: hit._source.startTime,
      end_time: hit._source.endTime,
    });
    data.gantt.push(
      {
        x: [startTime],
        y: [uniqueLabel],
        marker: {
          color: 'rgba(0, 0, 0, 0)',
        },
        width: 0.4,
        type: 'bar',
        orientation: 'h',
        hoverinfo: 'none',
        showlegend: false,
        spanId: hit._source.spanId,
      },
      {
        x: [duration],
        y: [uniqueLabel],
        text: [error],
        textfont: { color: ['#c14125'] },
        textposition: 'outside',
        marker: {
          color: colorMap[serviceName],
        },
        width: 0.4,
        type: 'bar',
        orientation: 'h',
        hovertemplate: '%{x}<extra></extra>',
        spanId: hit._source.spanId,
      }
    );
  });

  data.ganttMaxX = maxEndTime;
  return data;
};

export const handlePayloadRequest = (traceId, http, payloadData, setPayloadData) => {
  handleDslRequest(http, null, getPayloadQuery(traceId))
    .then((response) => setPayloadData(JSON.stringify(response.hits.hits, null, 2)))
    .catch((error) => console.error(error));
};

export const handleSpansRequest = (
  http,
  setItems,
  setTotal,
  spanSearchParams: SpanSearchParams,
  DSL,
) => {
  handleDslRequest(http, DSL, getSpansQuery(spanSearchParams))
    .then((response) => {
      setItems(response.hits.hits.map((hit) => hit._source));
      setTotal(response.hits.total?.value || 0);
    })
    .catch((error) => console.error(error));
};

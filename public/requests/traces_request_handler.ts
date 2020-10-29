import _ from 'lodash';
import moment from 'moment';
import { v1 as uuid } from 'uuid';
import { DATE_FORMAT } from '../../common';
import { nanoToMilliSec } from '../components/common';
import {
  getPayloadQuery,
  getServiceBreakdownQuery,
  getSpanDetailQuery,
  getTracesErrorCountQuery,
  getTracesLastUpdatedQuery,
  getTracesQuery,
} from './queries/traces_queries';
import { handleDslRequest } from './request_handler';

export const handleTracesRequest = (http, DSL, items, setItems) => {
  handleDslRequest(http, DSL, getTracesQuery())
    .then((response) =>
      Promise.all(
        response.hits.hits.map((hit) => {
          return {
            trace_id: hit._source.traceId,
            trace_group: hit._source.name,
            latency: _.round(nanoToMilliSec(hit._source.durationInNanos), 2),
            actions: '#',
          };
        })
      )
    )
    .then((newItems) => {
      setItems(newItems);
      loadRemainingItems(http, DSL, newItems, setItems);
    })
    .catch((error) => console.error(error));
};

const loadRemainingItems = (http, DSL, items, setItems) => {
  Promise.all(
    items.map(async (item) => {
      const lastUpdated = await handleDslRequest(http, DSL, getTracesLastUpdatedQuery(item.trace_id));
      const errorCount = await handleDslRequest(http, DSL, getTracesErrorCountQuery(item.trace_id));
      return {
        ...item,
        last_updated: moment(lastUpdated.aggregations.last_updated.value).format(DATE_FORMAT),
        error_count: errorCount.aggregations.error_count.value,
      };
    })
  )
    .then((newItems) => {
      setItems(newItems);
    })
    .catch((error) => console.error(error));
};
// 'percentile_in_trace_group': `${Math.floor(Math.random() * (10) + 90)}th`,
// 'latency_vs_benchmark': Math.floor(Math.random() * (41) - 20) * 5,

export const handleTraceViewRequest = (traceId, http, fields, setFields) => {
  handleDslRequest(http, null, getTracesQuery(traceId))
    .then(async (response) => {
      const hit = response.hits.hits[0];
      const lastUpdated = await handleDslRequest(http, null, getTracesLastUpdatedQuery(traceId));
      const errorCount = await handleDslRequest(http, null, getTracesErrorCountQuery(traceId));
      return {
        trace_id: hit._source.traceId,
        trace_group: hit._source.name,
        last_updated: moment(lastUpdated.aggregations.last_updated.value).format(DATE_FORMAT),
        user_id: 'N/A',
        latency: _.round(nanoToMilliSec(hit._source.durationInNanos), 2),
        latency_vs_benchmark: 'N/A',
        percentile_in_trace_group: 'N/A',
        error_count: errorCount.aggregations.error_count.value,
        errors_vs_benchmark: 'N/A',
      };
    })
    .then((newFields) => {
      setFields(newFields);
    })
    .catch((error) => console.error(error));
};

const getColor = (label) => {
  // const colors = ['#6db19a', '#6a92bc', '#c56886', '#8c73b3', '#c191ad', '#d2bf67', '#b6a98c', '#d08e52', '#a0685a', '#d86e54'];
  const colors = [
    '#6DCCB1',
    '#79AAD9',
    '#A987D1',
    '#E4A6C7',
    '#F1D86F',
    '#D2C0A0',
    '#F5A35C',
    '#C47C6C',
    '#FF7E62',
    '#d577bc',
    '#81ceea',
    '#987dcb',
  ];
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    const character = label.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash = hash & hash;
  }
  return colors[Math.abs(hash) % colors.length];
};

export const handleServiceBreakdownRequest = (
  traceId,
  http,
  serviceBreakdownData,
  setServiceBreakdownData
) => {
  handleDslRequest(http, null, getServiceBreakdownQuery(traceId))
    .then((response) =>
      Promise.all(
        response.aggregations.service_type.buckets.map((bucket, i) => {
          return {
            name: bucket.key,
            color: getColor(bucket.key),
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
    })
    .catch((error) => console.error(error));
};

const hitsToSpanDetailData = async (hits) => {
  const data = { gantt: [], table: [], ganttMaxX: 0 };
  if (hits.length === 0) return data;

  const minStartTime = nanoToMilliSec(hits[hits.length - 1].sort[0]);
  let maxEndTime = 0;

  hits.forEach((hit) => {
    const startTime = nanoToMilliSec(hit.sort[0]) - minStartTime;
    const duration = _.round(nanoToMilliSec(hit._source.durationInNanos), 2);
    const serviceName = _.get(hit, ['_source', 'resource.attributes.service.name']);
    const name = _.get(hit, '_source.name');
    const error = hit._source.status?.code || '';
    const uniqueLabel = `${serviceName}<br>${name}` + uuid();
    // const uniqueLabel = `${serviceName}:${name}` + uuid();
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
      },
      {
        x: [duration],
        y: [uniqueLabel],
        text: [error],
        textfont: { color: ['#c14125'] },
        textposition: 'outside',
        marker: {
          color: getColor(serviceName),
        },
        width: 0.4,
        type: 'bar',
        orientation: 'h',
        hovertemplate: '%{x}<extra></extra>',
      }
    );
  });

  data.ganttMaxX = maxEndTime;
  return data;
};

export const handleSpanDetailRequest = (traceId, http, spanDetailData, setSpanDetailData) => {
  handleDslRequest(http, null, getSpanDetailQuery(traceId))
    .then((response) => hitsToSpanDetailData(response.hits.hits))
    .then((newItems) => {
      setSpanDetailData(newItems);
    })
    .catch((error) => console.error(error));
};

export const handlePayloadRequest = (traceId, http, payloadData, setPayloadData) => {
  handleDslRequest(http, null, getPayloadQuery(traceId))
    .then((response) => setPayloadData(JSON.stringify(response.hits.hits, null, 2)))
    .catch((error) => console.error(error));
};

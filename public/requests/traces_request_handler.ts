import { handleRequest } from "./request_handler";
import { getTracesQuery, getTracesLastUpdatedQuery, getTracesErrorCountQuery, getServiceBreakdownQuery, getSpanDetailQuery, getPayloadQuery } from "./queries/traces_queries";
import moment from 'moment';
import { v1 as uuid } from 'uuid';

export const handleTracesRequest = (http, items, setItems) => {
  handleRequest(http, getTracesQuery())
    .then((response) => Promise.all(response.hits.hits.map(hit => {
      return {
        'trace_id': hit._source.traceId,
        'trace_group': hit._source.name.value,
        'latency': hit.fields.latency[0],
        'actions': '#',
      }
    })))
    .then(newItems => {
      setItems(newItems);
      loadRemainingItems(http, newItems, setItems);
    })
}

const loadRemainingItems = (http, items, setItems) => {
  Promise.all(items.map(async (item) => {
    const lastUpdated = await handleRequest(http, getTracesLastUpdatedQuery(item.trace_id))
    const errorCount = await handleRequest(http, getTracesErrorCountQuery(item.trace_id))
    return {
      ...item,
      'last_updated': moment(lastUpdated.aggregations.last_updated.value).format('MM/DD/YYYY HH:mm'),
      'error_count': errorCount.aggregations.error_count.value,
    }
  }))
    .then(newItems => {
      setItems(newItems);
    })
}
// 'percentile_in_trace_group': `${Math.floor(Math.random() * (10) + 90)}th`,
// 'latency_vs_benchmark': Math.floor(Math.random() * (41) - 20) * 5,

export const handleTraceViewRequest = (traceId, http, fields, setFields) => {
  handleRequest(http, getTracesQuery(traceId))
    .then(async (response) => {
      const hit = response.hits.hits[0];
      const lastUpdated = await handleRequest(http, getTracesLastUpdatedQuery(traceId))
      const errorCount = await handleRequest(http, getTracesErrorCountQuery(traceId))
      return {
        'trace_id': hit._source.traceId,
        'trace_group': hit._source.name.value,
        'last_updated': moment(lastUpdated.aggregations.last_updated.value).format('MM/DD/YYYY HH:mm'),
        'user_id': 'N/A',
        'latency': hit.fields.latency[0],
        'latency_vs_benchmark': 'N/A',
        'percentile_in_trace_group': 'N/A',
        'error_count': errorCount.aggregations.error_count.value,
        'errors_vs_benchmark': 'N/A',
      }
    })
    .then(newFields => {
      setFields(newFields)
    })
}

const getColor = (label) => {
  // const colors = ['#6db19a', '#6a92bc', '#c56886', '#8c73b3', '#c191ad', '#d2bf67', '#b6a98c', '#d08e52', '#a0685a', '#d86e54'];
  const colors = ['#6DCCB1', '#79AAD9', '#EE789D', '#A987D1', '#E4A6C7', '#F1D86F', '#D2C0A0', '#F5A35C', '#C47C6C', '#FF7E62'];
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    const character = label.charCodeAt(i);
    hash = ((hash << 5) - hash) + character;
    hash = hash & hash;
  }
  return colors[Math.abs(hash) % colors.length];
}

export const handleServiceBreakdownRequest = (traceId, http, serviceBreakdownData, setServiceBreakdownData) => {
  handleRequest(http, getServiceBreakdownQuery(traceId))
    .then((response) => Promise.all(response.aggregations.service_type.buckets.map((bucket, i) => {
      return {
        'name': bucket.key,
        'color': getColor(bucket.key),
        'value': bucket.total_latency.value,
        'benchmark': 0,
      }
    })))
    .then(newItems => {
      const latency_sum = newItems.map(item => item.value).reduce((a, b) => a + b, 0);
      return [{
        values: newItems.map((e, i) => latency_sum === 0 ? 100 : e.value / latency_sum * 100),
        labels: newItems.map((e, i) => e.name),
        benchmarks: newItems.map((e, i) => e.benchmark),
        marker: {
          colors: newItems.map((e, i) => e.color),
        },
        type: 'pie',
        textinfo: 'none',
        hovertemplate: '%{label}<br>%{value:.2f}%<extra></extra>'
      }]
    })
    .then(newItems => {
      setServiceBreakdownData(newItems);
    })
}

const hitsToGanttData = async (hits) => {
  const data = [];
  if (hits.length === 0)
    return data;

  const minStartTime = hits[hits.length - 1].sort[0];
  hits.forEach(hit => {
    const startTime = hit.sort[0] - minStartTime;
    const duration = hit.fields.latency[0];
    const label = hit._source.serviceInfo?.name || 'unknown';
    const uniqueLabel = label + uuid();
    data.push(
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
        marker: {
          color: getColor(label),
        },
        width: 0.4,
        type: 'bar',
        orientation: 'h',
        hovertemplate: '%{x}<extra></extra>',
      }
    )
  });
  return data;
}

export const handleSpanDetailRequest = (traceId, http, spanDetailData, setSpanDetailData) => {
  handleRequest(http, getSpanDetailQuery(traceId))
    .then((response) => hitsToGanttData(response.hits.hits))
    .then(newItems => {
      setSpanDetailData(newItems);
    })
}

export const handlePayloadRequest = (traceId, http, payloadData, setPayloadData) => {
  handleRequest(http, getPayloadQuery(traceId))
    .then((response) => setPayloadData(JSON.stringify(response.hits.hits, null, 2)))
}
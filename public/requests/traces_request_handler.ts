import { handleRequest } from "./request_handler";
import { getTracesQuery, getTracesLastUpdatedQuery, getTracesErrorCountQuery, getServiceBreakdownQuery } from "./traces_queries";
import moment from 'moment';
import { serviceBreakdownData2 } from "../data/trace_view_data";

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
// 'last_updated': '03/20/2020 08:03',

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

export const handleServiceBreakdownRequest = (traceId, http, serviceBreakdownData, setServiceBreakdownData) => {
  handleRequest(http, getServiceBreakdownQuery(traceId))
    .then((response) => Promise.all(response.aggregations.service_type.buckets.map(bucket => {
      return {
        'name': bucket.key,
        'color': 'rgb(58, 75, 151)',
        'value': bucket.total_latency.value,
        'benchmark': 0,
      }
    })))
    .then(newItems => {
      const latency_sum = newItems.reduce((a, b) => a.value + b.value);
      return [{
        values: newItems.map((e, i) => e.value / latency_sum * 100),
        labels: newItems.map((e, i) => e.name),
        marker: {
          // colors: newItems.map((e, i) => e.color),
        },
        type: 'pie',
        textinfo: 'none',
        hovertemplate: '%{label}<br>%{value:.2f}%<extra></extra>'
      }]
    })
    .then(newItems => {
      console.log(newItems);
      
      setServiceBreakdownData(newItems);
    })
}
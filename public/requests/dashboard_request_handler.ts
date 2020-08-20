import { handleRequest } from "./request_handler";
import { getDashboardErrorRateQuery, getDashboardQuery, getDashboardLatencyTrendQuery } from "./queries";

export const handleDashboardRequest = (http, items, setItems) => {
  handleRequest(http, getDashboardQuery())
    .then((response) => Promise.all(response.aggregations.trace_group.buckets.map((bucket) => {
      return {
        'trace_group_name': bucket.key,
        'average_latency': bucket.average_latency.value,
        'traces': bucket.doc_count,
      };
    })))
    .then(newItems => {
      setItems(newItems)
      loadDashboardRemainingItems(http, newItems, setItems)
    })
};

const loadDashboardRemainingItems = (http, items, setItems) => {
  Promise.all(items.map(async (item) => {
    const errorRate = await handleRequest(http, getDashboardErrorRateQuery(item.trace_group_name))
    const latencyTrend = await handleRequest(http, getDashboardLatencyTrendQuery(item.trace_group_name))
    const values = {
      x: latencyTrend.aggregations.trace_group.buckets[0].group_by_hour.buckets.map((bucket) => bucket.key_as_string),
      y: latencyTrend.aggregations.trace_group.buckets[0].group_by_hour.buckets.map((bucket) => bucket.average_latency.value),
    }
    return {
      'error_rate': errorRate.aggregations.trace_group.buckets[0].error_rate.value,
      '24_hour_latency_trend': {
        trendData: [{
          ...values,
          type: 'scatter',
          mode: 'lines',
          hoverinfo: 'none',
          line: {
            color: '#000000',
            width: 1,
          },
        }],
        popoverData: [{
          ...values,
          type: 'scatter',
          mode: 'lines+markers',
          marker: {
            color: '#987dcb',
            size: 8,
          },
          line: {
            color: '#987dcb',
            size: 2,
          },
        }],
      },
      ...item,
    }
  })).then(newItems => {
    setItems(newItems);
  })
}
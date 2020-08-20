import { handleRequest } from "./request_handler";
import { getDashboardErrorRateQuery, getDashboardQuery } from "./queries";

export const handleDashboardRequest = (http, items, setItems) => {
  loadDashboardItems(http, setItems);
}

const loadDashboardItems = (http, setItems) => {
  handleRequest(http, getDashboardQuery())
    .then((response) => {
      return Promise.all(response.aggregations.trace_group.buckets.map((bucket) => {
        return {
          'trace_group_name': bucket.key,
          // 'latency_variance': [1, 2, 3],
          'average_latency': bucket.average_latency.value,
          'average_latency_vs_benchmark': 0,
          '24_hour_latency_trend': {
            trendData: [{
              x: Array.from({ length: 6 }, (v, i) => i),
              y: Array.from({ length: 6 }, () => 1),
              type: 'scatter',
              mode: 'lines',
              hoverinfo: 'none',
              line: {
                color: '#000000',
                width: 1,
              },
            }],
            popoverData: [{
              x: Array.from({ length: 23 }, (v, i) => i + 1),
              y: Array.from({ length: 23 }, () => 1),
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
          'error_rate': 0,
          'traces': bucket.doc_count,
        };
      }))
    })
  .then(newItems => setItems(newItems))
};

// const errorRate = await handleRequest(http, getDashboardErrorRateQuery(bucket.key));
// errorRate.aggregations.trace_group.buckets[0].error_rate.value,
import _ from 'lodash';
import moment from 'moment';
import {
  getDashboardErrorRateQuery,
  getDashboardLatencyTrendQuery,
  getDashboardQuery,
  getDashboardThroughputPltQuery,
  getErrorRatePltQuery,
} from './queries/dashboard_queries';
import { handleDslRequest } from './request_handler';

export const handleDashboardRequest = (http, DSL, items, setItems) => {
  handleDslRequest(http, DSL, getDashboardQuery())
    .then((response) =>
      Promise.all(
        response.aggregations.trace_group.buckets.map((bucket) => {
          return {
            trace_group_name: bucket.key,
            average_latency: bucket.average_latency.value,
            traces: bucket.doc_count,
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
      const errorRate = await handleDslRequest(
        http,
        DSL,
        getDashboardErrorRateQuery(item.trace_group_name)
      );
      const latencyTrend = await handleDslRequest(
        http,
        DSL,
        getDashboardLatencyTrendQuery(item.trace_group_name)
      );
      const values = {
        x: latencyTrend.aggregations.trace_group.buckets[0].group_by_hour.buckets.map(
          (bucket) => bucket.key_as_string
        ),
        y: latencyTrend.aggregations.trace_group.buckets[0].group_by_hour.buckets.map(
          (bucket) => bucket.average_latency?.value || 0
        ),
      };
      return {
        ...item,
        error_rate: errorRate.aggregations.trace_group.buckets[0].error_rate.value,
        latency_variance: Array.from({ length: 3 }, () => Math.floor(Math.random() * 20)).sort(
          (a, b) => a - b
        ),
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
      };
    })
  )
    .then((newItems) => {
      setItems(newItems);
    })
    .catch((error) => console.error(error));
};

// 'latency_variance': Array.from({ length: 3 }, () => Math.floor(Math.random() * 70 + 10)).sort(),
// 'average_latency_vs_benchmark': Math.floor(Math.random() * (41) - 20) * 5,

export const handleDashboardThroughputPltRequest = (http, DSL, items, setItems) => {
  handleDslRequest(http, DSL, getDashboardThroughputPltQuery())
    .then((response) => {
      const buckets = response.aggregations.throughput.buckets;
      const newItems =
        buckets.length > 0
          ? [
              {
                x: buckets.map((bucket) => moment(bucket.key).format('HH:mm')),
                y: buckets.map((bucket) => bucket.doc_count),
                marker: {
                  color: 'rgb(171, 211, 240)',
                },
                width: 0.3,
                type: 'bar',
                hovertemplate: '%{y}<extra></extra>',
              },
            ]
          : [];
      setItems(newItems);
    })
    .catch((error) => console.error(error));
};

export const handleDashboardErrorRateRequest = (http, DSL, items, setItems) => {
  handleDslRequest(http, DSL, getErrorRatePltQuery())
    .then((response) => {
      const buckets = response.aggregations.error_rate.buckets;
      const newItems =
        buckets.length > 0
          ? [
              {
                x: buckets.map((bucket) => moment(bucket.key).format('HH:mm')),
                y: buckets.map((bucket) => _.round(bucket.error_rate?.value, 2)),
                marker: {
                  color: '#fad963',
                },
                width: 0.3,
                type: 'bar',
                hovertemplate: '%{y}<extra></extra>',
              },
            ]
          : [];
      setItems(newItems);
    })
    .catch((error) => console.error(error));
};

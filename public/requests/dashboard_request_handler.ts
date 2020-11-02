import _ from 'lodash';
import { nanoToMilliSec } from '../components/common/helper_functions';
import {
  getDashboardLatencyTrendQuery,
  getDashboardQuery,
  getDashboardThroughputPltQuery,
  getDashboardTraceGroupPercentiles,
  getErrorRatePltQuery,
} from './queries/dashboard_queries';
import { handleDslRequest } from './request_handler';

export const handleDashboardRequest = async (http, DSL, timeFilterDSL, items, setItems) => {
  // latency_variance should only be affected by timefilter
  const latency_variances = await handleDslRequest(
    http,
    timeFilterDSL,
    getDashboardTraceGroupPercentiles()
  ).then((response) => {
    const map: any = {};
    response.aggregations.trace_group.buckets.forEach((traceGroup) => {
      map[traceGroup.key] = Object.values(
        traceGroup.latency_variance_nanos.values
      ).map((nano: number) => Math.round(nanoToMilliSec(Math.max(0, nano))));
    });
    return map;
  });

  handleDslRequest(http, DSL, getDashboardQuery())
    .then((response) => {
      return Promise.all(
        response.aggregations.trace_group.buckets.map((bucket) => {
          return {
            trace_group_name: bucket.key,
            average_latency: bucket.average_latency.value,
            traces: bucket.doc_count,
            latency_variance: latency_variances[bucket.key],
            error_rate: bucket.error_rate.value,
          };
        })
      );
    })
    .then((newItems) => {
      setItems(newItems);
      loadRemainingItems(http, DSL, newItems, setItems);
    })
    .catch((error) => console.error(error));
};

const loadRemainingItems = (http, DSL, items, setItems) => {
  Promise.all(
    items.map(async (item) => {
      const latencyTrend = await handleDslRequest(
        http,
        DSL,
        getDashboardLatencyTrendQuery(item.trace_group_name)
      );
      const values = {
        x: latencyTrend.aggregations.trace_group.buckets[0].group_by_hour.buckets.map(
          (bucket) => bucket.key
        ),
        y: latencyTrend.aggregations.trace_group.buckets[0].group_by_hour.buckets.map(
          (bucket) => bucket.average_latency?.value || 0
        ),
      };
      return {
        ...item,
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

export const handleDashboardThroughputPltRequest = (http, DSL, fixedInterval, items, setItems) => {
  handleDslRequest(http, DSL, getDashboardThroughputPltQuery(fixedInterval))
    .then((response) => {
      const buckets = response.aggregations.throughput.buckets;
      const newItems =
        buckets.length > 0
          ? [
              {
                x: buckets.map((bucket) => bucket.key),
                y: buckets.map((bucket) => bucket.doc_count),
                marker: {
                  color: 'rgb(171, 211, 240)',
                },
                type: 'bar',
                hovertemplate: '%{x}<br>Throughput: %{y}<extra></extra>',
              },
            ]
          : [];
      setItems({ items: newItems, fixedInterval: fixedInterval });
    })
    .catch((error) => console.error(error));
};

export const handleDashboardErrorRatePltRequest = (http, DSL, fixedInterval, items, setItems) => {
  handleDslRequest(http, DSL, getErrorRatePltQuery(fixedInterval))
    .then((response) => {
      const buckets = response.aggregations.error_rate.buckets;
      const newItems =
        buckets.length > 0
          ? [
              {
                x: buckets.map((bucket) => bucket.key),
                y: buckets.map((bucket) => _.round(bucket.error_rate?.value, 2)),
                marker: {
                  color: '#fad963',
                },
                type: 'bar',
                hovertemplate: '%{x}<br>Error rate: %{y}<extra></extra>',
              },
            ]
          : [];
      setItems({ items: newItems, fixedInterval: fixedInterval });
    })
    .catch((error) => console.error(error));
};

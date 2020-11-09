import _ from 'lodash';
import moment from 'moment';
import { DATE_FORMAT, DATE_PICKER_FORMAT } from '../../common';
import { fixedIntervalToMilli, nanoToMilliSec } from '../components/common/helper_functions';
import {
  getDashboardLatencyTrendQuery,
  getDashboardQuery,
  getDashboardThroughputPltQuery,
  getDashboardTraceGroupPercentiles,
  getErrorRatePltQuery,
} from './queries/dashboard_queries';
import { handleDslRequest } from './request_handler';

export const handleDashboardRequest = async (
  http,
  DSL,
  timeFilterDSL,
  validTraceIds,
  items,
  setItems,
  setPercentileMap?
) => {
  // latency_variance should only be affected by timefilter
  const latency_variances = await handleDslRequest(
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
  if (setPercentileMap) setPercentileMap(latency_variances);

  handleDslRequest(http, DSL, getDashboardQuery(validTraceIds))
    .then((response) => {
      return Promise.all(
        response.aggregations.trace_group_name.buckets
          .filter((bucket) => bucket.parent_span.doc_count > 0)
          .map((bucket) => {
            return {
              trace_group_name: bucket.key,
              average_latency:
                bucket.parent_span.trace_group_name.buckets[0]?.average_latency.value,
              traces: bucket.doc_count,
              latency_variance: latency_variances[bucket.key],
              error_rate: bucket.parent_span.trace_group_name.buckets[0]?.error_rate.value,
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
      ).catch((error) => console.error(error));
      const buckets = latencyTrend.aggregations.trace_group.buckets[0].group_by_hour.buckets.filter(
        (bucket) => bucket.average_latency?.value || bucket.average_latency?.value === 0
      );
      const values = {
        x: buckets.map((bucket) => bucket.key),
        y: buckets.map((bucket) => bucket.average_latency?.value || 0),
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

export const handleDashboardThroughputPltRequest = (
  http,
  DSL,
  validTraceIds,
  fixedInterval,
  items,
  setItems
) => {
  handleDslRequest(http, DSL, getDashboardThroughputPltQuery(fixedInterval, validTraceIds))
    .then((response) => {
      const buckets = response.aggregations.throughput.buckets;
      const texts = buckets.map(
        (bucket) =>
          `${moment(bucket.key).format(DATE_PICKER_FORMAT)} - ${moment(
            bucket.key + fixedIntervalToMilli(fixedInterval)
          ).format(DATE_PICKER_FORMAT)}`
      );
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
                text: texts,
                hoverlabel: {
                  align: 'left',
                },
                hovertemplate: '%{text}<br>Throughput: %{y}<extra></extra>',
              },
            ]
          : [];
      setItems({ items: newItems, fixedInterval: fixedInterval });
    })
    .catch((error) => console.error(error));
};

export const handleDashboardErrorRatePltRequest = (
  http,
  DSL,
  validTraceIds,
  fixedInterval,
  items,
  setItems
) => {
  handleDslRequest(http, DSL, getErrorRatePltQuery(fixedInterval, validTraceIds))
    .then((response) => {
      const buckets = response.aggregations.error_rate.buckets;
      const texts = buckets.map(
        (bucket) =>
          `${moment(bucket.key).format(DATE_PICKER_FORMAT)} - ${moment(
            bucket.key + fixedIntervalToMilli(fixedInterval)
          ).format(DATE_PICKER_FORMAT)}`
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
                text: texts,
                hoverlabel: {
                  align: 'left',
                },
                hovertemplate: '%{text}<br>Error rate: %{y}<extra></extra>',
              },
            ]
          : [];
      setItems({ items: newItems, fixedInterval: fixedInterval });
    })
    .catch((error) => console.error(error));
};

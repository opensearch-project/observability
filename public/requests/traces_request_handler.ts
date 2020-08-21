import { handleRequest } from "./request_handler";
import { getTracesQuery, getTracesLastUpdatedQuery, getTracesErrorCountQuery } from "./traces_queries";
import moment from 'moment';

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
  })).then(newItems => {
    setItems(newItems);
  })
}

    // 'percentile_in_trace_group': `${Math.floor(Math.random() * (10) + 90)}th`,
    // 'latency_vs_benchmark': Math.floor(Math.random() * (41) - 20) * 5,
    // 'last_updated': '03/20/2020 08:03',
export const dashboardTableData = []

for (let i = 0; i < 100; i++) {
  const trace = {
    'trace_group_name': Array.from({ length: 3 }, () => Math.random().toString(36).substring(2)).join(' '),
    // 'trace_group_name': Array.from({ length: 1 }, () => Math.random().toString(36).substring(2)).join(' '),
    'latency_variance': Array.from({ length: 3 }, () => Math.floor(Math.random() * 70 + 10)).sort(),
    'average_latency_vs_benchmark': Math.floor(Math.random() * (41) -20) * 5,
    '24_hour_latency_trend': [{
      x: Array.from({ length: 6 }, (v, i) => i),
      y: Array.from({ length: 6 }, () => Math.random()),
      type: 'scatter',
      mode: 'lines',
      hoverinfo: 'none',
        line: {
          color: '#000000',
          width: 1,
        },
    }],
    'error_rate': Math.floor(Math.random() * 21),
    'traces': Math.floor(Math.random() * 20 + 1) * 100,
  }
  trace['average_latency'] = trace['latency_variance'][1];
  dashboardTableData.push(trace)
}
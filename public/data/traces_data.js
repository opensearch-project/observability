export const tracesTableData = []

for (let i = 0; i < 100; i++) {
  const trace = {
    'trace_id': Array.from({ length: 3 }, () => Math.random().toString(36).substring(2)).join(' '),
    'trace_group': Array.from({ length: 3 }, () => Math.random().toString(36).substring(2)).join(' '),
    'latency': Math.floor(Math.random() * 70 + 10),
    'percentile_in_trace_group': `${Math.floor(Math.random() * (10) + 90)}th`,
    'latency_vs_benchmark': Math.floor(Math.random() * (41) - 20) * 5,
    'error_count': Math.floor(Math.random() * 5),
    'last_updated': '03/20/2020 08:03',
    'actions': '#',
  }
  tracesTableData.push(trace)
}
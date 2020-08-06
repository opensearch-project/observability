export const serviceTableData = []

for (let i = 0; i < 100; i++) {
  const trace = {
    'name': Array.from({ length: 3 }, () => Math.random().toString(36).substring(2)).join(' '),
    'average_latency': Math.floor(Math.random() * 70 + 10),
    'error_rate': Math.floor(Math.random() * 21),
    'throughput': Math.floor(Math.random() * (41) + 20) * 5,
    'number_of_connected_services': Math.floor(Math.random() * 5 + 2),
    'connected_services': Array.from({ length: 3 }, () => Math.random().toString(36).substring(2)).join(', '),
    'traces': Math.floor(Math.random() * 20 + 1) * 100,
  }
  serviceTableData.push(trace)
}
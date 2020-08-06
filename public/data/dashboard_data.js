export const dashboardTableData = []

for (let i = 0; i < 100; i++) {
  const trace = {
    'trace_group_name': Array.from({ length: 3 }, () => Math.random().toString(36).substring(2)).join(' '),
    'latency_variance': Array.from({ length: 3 }, () => Math.floor(Math.random() * 70 + 10)).sort(),
    'average_latency_vs_benchmark': Math.floor(Math.random() * (41) - 20) * 5,
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

export const dashboardErrorRateData = [
  {
    x: ['03:09', '03:10', '03:11', '03:12', '03:13'],
    y: [0, 0, 2, 2, 0],
    marker: {
      color: '#acb7b8',
    },
    width: 0.3,
    type: 'bar',
    name: 'Unknown',
  },
  {
    x: ['03:09', '03:10', '03:11', '03:12', '03:13'],
    y: [2, 5, 0, 3, 3],
    marker: {
      color: '#fad963',
    },
    width: 0.3,
    type: 'bar',
    name: '2xx',
  },
  {
    x: ['03:09', '03:10', '03:11', '03:12', '03:13'],
    y: [4, 3, 4, 0, 5],
    marker: {
      color: '#c33f25',
    },
    width: 0.3,
    type: 'bar',
    name: '4xx',
  },
  {
    x: ['03:09', '03:10', '03:11', '03:12', '03:13'],
    y: [3, 2, 4, 1, 10],
    marker: {
      color: '#ee7e8f',
    },
    width: 0.3,
    type: 'bar',
    name: '5xx',
  }
]

export const dashboardErrorRateLayout = {
  width: 400,
  height: 230,
  margin: {
    l: 50,
    r: 5,
    b: 30,
    t: 5,  // 10
    pad: 4
  },
  annotations: [
    {
      x: dashboardErrorRateData[0].x[dashboardErrorRateData[0].x.length - 1],
      y: 0,
      showarrow: true,
      arrowhead: 0,
      xref: 'x',
      yref: 'y',
      text: `Now: ${18}%`,
      ax: 0,
      ay: -160,
      borderpad: 10,
      arrowwidth: 0.7,
    }
  ],
  showlegend: true,
  xaxis: {
    showgrid: false,
    visible: true,
    color: '#899195'
  },
  yaxis: {
    title: {
      text: 'Error rate',
      font: {
        size: 12,
      }
    },
    range: [0, 25],
    ticksuffix: "%",
    gridcolor: '#d9d9d9',
    showgrid: true,
    // showline: true,
    // zeroline: true,
    visible: true,
    color: '#899195'
  }
}


export const dashboardThroughputData = [{
  x: ['03:09', '03:10', '03:11', '03:12', '03:13'],
  y: [150, 195, 350, 410, 320],
  marker: {
    color: 'rgb(171, 211, 240)',
  },
  width: 0.3,
  type: 'bar',
}]

export const dashboardThroughputLayout = {
  width: 400,
  height: 200,
  margin: {
    l: 50,
    r: 5,
    b: 30,
    t: 5,  // 10
    pad: 4
  },
  annotations: [
    {
      x: dashboardThroughputData[0].x[dashboardThroughputData[0].x.length - 1],
      y: 0,
      showarrow: true,
      arrowhead: 0,
      xref: 'x',
      yref: 'y',
      text: `Now: ${dashboardThroughputData[0].y[dashboardThroughputData[0].y.length - 1]}`,
      ax: 0,
      ay: -160,
      borderpad: 10,
      arrowwidth: 0.7,
    }
  ],
  xaxis: {
    showgrid: false,
    visible: true,
    color: '#899195'
  },
  yaxis: {
    title: {
      text: 'Throughput',
      font: {
        size: 12,
      }
    },
    gridcolor: '#d9d9d9',
    showgrid: true,
    // showline: true,
    // zeroline: true,
    visible: true,
    color: '#899195'
  }
}
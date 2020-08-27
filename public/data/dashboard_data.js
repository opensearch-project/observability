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
    hovertemplate: '07/23/2020 %{x}<br>' +
      '<b>Unknown: %{y}</b><extra></extra>',
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
    hovertemplate: '07/23/2020 %{x}<br>' +
      '<b>2xx: %{y}</b><extra></extra>',
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
    hovertemplate: '07/23/2020 %{x}<br>' +
      '<b>4xx: %{y}</b><extra></extra>',
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
    hovertemplate: '07/23/2020 %{x}<br>' +
      '<b>5xx: %{y}</b><extra></extra>',
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
      text: `Now: ${dashboardErrorRateData.map(a => a.y[a.y.length - 1]).reduce((a, b) => a + b, 0)}%`,
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
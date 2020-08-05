export const serviceBreakdownMetadata = [
  {
    name: 'Payment',
    color: 'rgb(58, 75, 151)',
    value: 35,
    benchmark: 40,
  },
  {
    name: 'Credentials',
    color: 'rgb(213, 119, 188)',
    value: 20,
    benchmark: -5,
  },
  {
    name: 'Purchase',
    color: 'rgb(129, 206, 234)',
    value: 20,
    benchmark: 0,
  },
  {
    name: 'Product',
    color: 'rgb(155, 129, 205)',
    value: 15,
    benchmark: 0,
  },
  {
    name: 'Users',
    color: 'rgb(236, 100, 146)',
    value: 10,
    benchmark: 0,
  },
]

export const serviceBreakdownData = [
  {
    values: serviceBreakdownMetadata.map((e, i) => e.value),
    labels: serviceBreakdownMetadata.map((e, i) => e.name),
    marker: {
      colors: serviceBreakdownMetadata.map((e, i) => e.color),
    },
    type: 'pie',
    textinfo: 'none',
  }
]


export const serviceBreakdownLayout = {
  height: 200,
  width: 200,
  // showlegend: false,
  legend: {
    orientation: 'h',
    traceorder: 'normal',
    x: 0,
    xanchor: 'left',
    y: 1.5
  },
  margin: {
    l: 5,
    r: 5,
    b: 5,
    t: 5,  // 10
  },
}




export const spanDetailData = [
  {
    // transparent bar
    x: [65, 71, 64, 40, 37, 33, 30, 18, 0, 0],
    y: ['Product/summary3', 'Product/summary2', 'Product/summary', 'Purchase/confirm', 'payment/complete', 'Credentials/', 'useraccount/GET', 'authenticated', 'userCredentials.verify', 'connect.bank'],
    marker: {
      color: 'rgba(0, 0, 0, 0)',
    },
    width: 0.4,
    type: 'bar',
    orientation: 'h',
    hoverinfo: 'none',
    showlegend: false,
  },
  {
    x: [0, 0, 0, 0, 0, 0, 0, 0, 74, 80],
    y: ['Product/summary3', 'Product/summary2', 'Product/summary', 'Purchase/confirm', 'payment/complete', 'Credentials/', 'useraccount/GET', 'authenticated', 'userCredentials.verify', 'connect.bank'],
    marker: {
      color: 'rgb(58, 75, 151)',
    },
    width: 0.4,
    type: 'bar',
    orientation: 'h',
  },
  {
    x: [0, 0, 0, 0, 0, 0, 42, 62, 0, 0],
    y: ['Product/summary3', 'Product/summary2', 'Product/summary', 'Purchase/confirm', 'payment/complete', 'Credentials/', 'useraccount/GET', 'authenticated', 'userCredentials.verify', 'connect.bank'],
    marker: {
      color: 'rgb(213, 119, 188)',
    },
    width: 0.4,
    type: 'bar',
    orientation: 'h',
  },
  {
    x: [10, 0, 0, 0, 21, 39, 0, 0, 0, 0],
    y: ['Product/summary3', 'Product/summary2', 'Product/summary', 'Purchase/confirm', 'payment/complete', 'Credentials/', 'useraccount/GET', 'authenticated', 'userCredentials.verify', 'connect.bank'],
    marker: {
      color: 'rgb(129, 206, 234)',
    },
    width: 0.4,
    type: 'bar',
    orientation: 'h',
  },
  {
    x: [0, 0, 14, 40, 0, 0, 0, 0, 0, 0],
    y: ['Product/summary3', 'Product/summary2', 'Product/summary', 'Purchase/confirm', 'payment/complete', 'Credentials/', 'useraccount/GET', 'authenticated', 'userCredentials.verify', 'connect.bank'],
    marker: {
      color: 'rgb(152, 125, 203)',
    },
    width: 0.4,
    type: 'bar',
    orientation: 'h',
  },
  {
    x: [0, 9, 0, 0, 0, 0, 0, 0, 0, 0],
    y: ['Product/summary3', 'Product/summary2', 'Product/summary', 'Purchase/confirm', 'payment/complete', 'Credentials/', 'useraccount/GET', 'authenticated', 'userCredentials.verify', 'connect.bank'],
    marker: {
      color: 'rgb(236, 100, 146)',
    },
    width: 0.4,
    type: 'bar',
    orientation: 'h',
  },
]

export const spanDetailLayout = {
  height: 500,
  width: 800,
  legend: {
    orientation: 'h',
    traceorder: 'normal',
    x: 0,
    xanchor: 'left',
    y: 1.1
  },
  margin: {
    l: 200,
    r: 5,
    b: 30,
    t: 30,  // 10
  },
  xaxis: {
    autorange: true,
    ticksuffix: " ms",
    side: 'top',
  },
}

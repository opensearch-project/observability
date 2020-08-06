export const serviceMapData = {
  graph: {
    nodes: [
      { id: 1, label: "Verification", color: 'rgb(162, 188, 218)' },
      { id: 2, label: "Payment", color: 'rgb(96, 144, 192)' },
      { id: 3, label: "Address", color: 'rgb(209, 221, 235)' },
      { id: 4, label: "Order", color: 'rgb(209, 221, 235)' },
      { id: 5, label: "Purchase", color: 'rgb(0, 115, 186)' },
      { id: 6, label: "Guest", color: 'rgb(240, 244, 250)' },
      { id: 7, label: "Users", color: 'rgb(209, 221, 235)' },
      { id: 8, label: "Product", color: 'rgb(162, 188, 218)' },
      { id: 9, label: "Business", color: 'rgb(240, 244, 250)' },
      { id: 10, label: "ComparisonAlgo", color: 'rgb(96, 144, 192)' },
      { id: 11, label: "Credentials", color: 'rgb(162, 188, 218)' },
      { id: 12, label: "Preferences", color: 'rgb(162, 188, 218)' },
      { id: 13, label: "ML learning", color: 'rgb(96, 144, 192)' },
      { id: 14, label: "History", color: 'rgb(162, 188, 218)' },
      { id: 15, label: "Sales", color: 'rgb(209, 221, 235)' },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 2, to: 5 },
      { from: 4, to: 5 },
      { from: 3, to: 5 },
      { from: 6, to: 5 },
      { from: 8, to: 5 },
      { from: 9, to: 8 },
      { from: 10, to: 8 },
      { from: 7, to: 5 },
      { from: 11, to: 7 },
      { from: 12, to: 7 },
      { from: 12, to: 13 },
      { from: 14, to: 13 },
      { from: 15, to: 13 },
    ]
  },
  options: {
    layout: {
      hierarchical: false
    },
    edges: {
      arrows: {
        to: {
          enabled: false,
        },
      },
    },
    nodes: {
      shape: 'dot',
      size: 20,
      font: {
        size: 22,
      },
    },
    height: "434px",
    width: "620px",
  },
  events: {
    select: function (event) {
      var { nodes, edges } = event;
    }
  },
}
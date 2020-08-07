export const getServiceMapData = (colorMap) => {
  return {
    graph: {
      nodes: [
        { id: 1, label: "Verification", color: colorMap[Math.floor(Math.random() * 5)] },
        { id: 2, label: "Payment", color: colorMap[Math.floor(Math.random() * 5)] },
        { id: 3, label: "Address", color: colorMap[Math.floor(Math.random() * 5)] },
        { id: 4, label: "Order", color: colorMap[Math.floor(Math.random() * 5)] },
        { id: 5, label: "Purchase", color: colorMap[Math.floor(Math.random() * 5)] },
        { id: 6, label: "Guest", color: colorMap[Math.floor(Math.random() * 5)] },
        { id: 7, label: "Users", color: colorMap[Math.floor(Math.random() * 5)] },
        { id: 8, label: "Product", color: colorMap[Math.floor(Math.random() * 5)] },
        { id: 9, label: "Business", color: colorMap[Math.floor(Math.random() * 5)] },
        { id: 10, label: "ComparisonAlgo", color: colorMap[Math.floor(Math.random() * 5)] },
        { id: 11, label: "Credentials", color: colorMap[Math.floor(Math.random() * 5)] },
        { id: 12, label: "Preferences", color: colorMap[Math.floor(Math.random() * 5)] },
        { id: 13, label: "ML learning", color: colorMap[Math.floor(Math.random() * 5)] },
        { id: 14, label: "History", color: colorMap[Math.floor(Math.random() * 5)] },
        { id: 15, label: "Sales", color: colorMap[Math.floor(Math.random() * 5)] },
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
      height: '434px',
      width: '620px',
    },
    events: {
      select: function (event) {
        var { nodes, edges } = event;
      }
    },
  }
}
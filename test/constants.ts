export const TEST_SERVICE_MAP_GRAPH = {
  graph: {
    nodes: [
      {
        id: 1,
        label: 'order',
        size: 15,
        title: '<p>order</p><p>Average latency: 90.1ms</p>',
        color: 'rgba(158, 134, 192, 1)',
      },
      {
        id: 2,
        label: 'analytics-service',
        size: 15,
        title: '<p>analytics-service</p><p>Average latency: 12.99ms</p>',
        color: 'rgba(210, 202, 224, 1)',
      },
      {
        id: 3,
        label: 'database',
        size: 15,
        title: '<p>database</p><p>Average latency: 49.54ms</p>',
        color: 'rgba(187, 171, 212, 1)',
      },
      {
        id: 4,
        label: 'frontend-client',
        size: 15,
        title: '<p>frontend-client</p><p>Average latency: 207.71ms</p>',
        color: 'rgba(78, 42, 122, 1)',
      },
      {
        id: 5,
        label: 'inventory',
        size: 15,
        title: '<p>inventory</p><p>Average latency: 183.52ms</p>',
        color: 'rgba(95, 61, 138, 1)',
      },
      {
        id: 6,
        label: 'authentication',
        size: 15,
        title: '<p>authentication</p><p>Average latency: 139.09ms</p>',
        color: 'rgba(125, 95, 166, 1)',
      },
      {
        id: 7,
        label: 'payment',
        size: 15,
        title: '<p>payment</p><p>Average latency: 134.36ms</p>',
        color: 'rgba(129, 99, 169, 1)',
      },
      {
        id: 8,
        label: 'recommendation',
        size: 15,
        title: '<p>recommendation</p><p>Average latency: 176.97ms</p>',
        color: 'rgba(100, 66, 143, 1)',
      },
    ],
    edges: [
      {
        from: 1,
        to: 2,
        color: 'rgba(0, 0, 0, 1)',
      },
      {
        from: 1,
        to: 3,
        color: 'rgba(0, 0, 0, 1)',
      },
      {
        from: 4,
        to: 1,
        color: 'rgba(0, 0, 0, 1)',
      },
      {
        from: 4,
        to: 7,
        color: 'rgba(0, 0, 0, 1)',
      },
      {
        from: 4,
        to: 6,
        color: 'rgba(0, 0, 0, 1)',
      },
      {
        from: 5,
        to: 2,
        color: 'rgba(0, 0, 0, 1)',
      },
      {
        from: 5,
        to: 3,
        color: 'rgba(0, 0, 0, 1)',
      },
      {
        from: 6,
        to: 2,
        color: 'rgba(0, 0, 0, 1)',
      },
      {
        from: 6,
        to: 8,
        color: 'rgba(0, 0, 0, 1)',
      },
      {
        from: 7,
        to: 2,
        color: 'rgba(0, 0, 0, 1)',
      },
      {
        from: 7,
        to: 5,
        color: 'rgba(0, 0, 0, 1)',
      },
      {
        from: 8,
        to: 2,
        color: 'rgba(0, 0, 0, 1)',
      },
      {
        from: 8,
        to: 5,
        color: 'rgba(0, 0, 0, 1)',
      },
    ],
  },
};
export const TEST_SERVICE_MAP = {
  order: {
    serviceName: 'order',
    id: 1,
    traceGroups: [
      {
        traceGroup: 'client_cancel_order',
        targetResource: ['clear_order'],
      },
      {
        traceGroup: 'client_create_order',
        targetResource: ['update_order'],
      },
      {
        traceGroup: 'client_delivery_status',
        targetResource: ['get_order'],
      },
      {
        traceGroup: 'client_pay_order',
        targetResource: ['pay_order'],
      },
    ],
    targetServices: ['analytics-service', 'database'],
    destServices: ['frontend-client'],
    latency: 90.1,
    error_rate: 4.17,
    throughput: 48,
  },
  'analytics-service': {
    serviceName: 'analytics-service',
    id: 2,
    traceGroups: [
      {
        traceGroup: 'client_cancel_order',
        targetResource: ['/logs'],
      },
      {
        traceGroup: 'client_checkout',
        targetResource: ['/logs'],
      },
      {
        traceGroup: 'client_create_order',
        targetResource: ['/logs'],
      },
      {
        traceGroup: 'client_delivery_status',
        targetResource: ['/logs'],
      },
      {
        traceGroup: 'client_pay_order',
        targetResource: ['/logs'],
      },
      {
        traceGroup: 'load_main_screen',
        targetResource: ['/logs'],
      },
    ],
    targetServices: [],
    destServices: ['order', 'inventory', 'authentication', 'payment', 'recommendation'],
    latency: 12.99,
    error_rate: 0,
    throughput: 37,
  },
  database: {
    serviceName: 'database',
    id: 3,
    traceGroups: [
      {
        traceGroup: 'client_cancel_order',
        targetResource: ['cartEmpty'],
      },
      {
        traceGroup: 'client_checkout',
        targetResource: ['updateItem'],
      },
      {
        traceGroup: 'client_create_order',
        targetResource: ['addItemToCart'],
      },
      {
        traceGroup: 'client_delivery_status',
        targetResource: ['getCart'],
      },
      {
        traceGroup: 'client_pay_order',
        targetResource: ['cartSold'],
      },
      {
        traceGroup: 'load_main_screen',
        targetResource: ['getIntentory'],
      },
    ],
    targetServices: [],
    destServices: ['order', 'inventory'],
    latency: 49.54,
    error_rate: 3.77,
    throughput: 53,
  },
  'frontend-client': {
    serviceName: 'frontend-client',
    id: 4,
    traceGroups: [
      {
        traceGroup: 'client_cancel_order',
        targetResource: [],
      },
      {
        traceGroup: 'client_checkout',
        targetResource: [],
      },
      {
        traceGroup: 'client_create_order',
        targetResource: [],
      },
      {
        traceGroup: 'client_delivery_status',
        targetResource: [],
      },
      {
        traceGroup: 'client_pay_order',
        targetResource: [],
      },
      {
        traceGroup: 'load_main_screen',
        targetResource: [],
      },
    ],
    targetServices: ['order', 'payment', 'authentication'],
    destServices: [],
    latency: 207.71,
    error_rate: 7.41,
    throughput: 27,
  },
  inventory: {
    serviceName: 'inventory',
    id: 5,
    traceGroups: [
      {
        traceGroup: 'client_checkout',
        targetResource: ['update_inventory'],
      },
      {
        traceGroup: 'load_main_screen',
        targetResource: ['read_inventory'],
      },
    ],
    targetServices: ['analytics-service', 'database'],
    destServices: ['payment', 'recommendation'],
    latency: 183.52,
    error_rate: 3.23,
    throughput: 31,
  },
  authentication: {
    serviceName: 'authentication',
    id: 6,
    traceGroups: [
      {
        traceGroup: 'load_main_screen',
        targetResource: ['server_request_login'],
      },
    ],
    targetServices: ['analytics-service', 'recommendation'],
    destServices: ['frontend-client'],
    latency: 139.09,
    error_rate: 8.33,
    throughput: 12,
  },
  payment: {
    serviceName: 'payment',
    id: 7,
    traceGroups: [
      {
        traceGroup: 'client_checkout',
        targetResource: ['payment'],
      },
    ],
    targetServices: ['analytics-service', 'inventory'],
    destServices: ['frontend-client'],
    latency: 134.36,
    error_rate: 9.09,
    throughput: 11,
  },
  recommendation: {
    serviceName: 'recommendation',
    id: 8,
    traceGroups: [
      {
        traceGroup: 'load_main_screen',
        targetResource: ['recommend'],
      },
    ],
    targetServices: ['analytics-service', 'inventory'],
    destServices: ['authentication'],
    latency: 176.97,
    error_rate: 6.25,
    throughput: 16,
  },
};

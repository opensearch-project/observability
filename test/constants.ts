/*
 *   Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

export const TEST_SPAN_RESPONSE = {
  took: 1,
  timed_out: false,
  _shards: {
    total: 1,
    successful: 1,
    skipped: 0,
    failed: 0,
  },
  hits: {
    total: {
      value: 3,
      relation: 'eq',
    },
    max_score: 4.4400907,
    hits: [
      {
        _index: 'otel-v1-apm-span-000001',
        _type: '_doc',
        _id: '67c279e1100d75c3',
        _score: 4.4400907,
        _source: {
          traceId: '03f9c770db5ee2f1caac0afc36db49ba',
          spanId: '67c279e1100d75c3',
          traceState: '',
          parentSpanId: '',
          name: 'client_pay_order',
          kind: 'SPAN_KIND_INTERNAL',
          startTime: '2021-03-25T17:23:45.724285696Z',
          endTime: '2021-03-25T17:23:45.949285120Z',
          durationInNanos: 224999424,
          serviceName: 'frontend-client',
          events: [],
          links: [],
          droppedAttributesCount: 0,
          droppedEventsCount: 0,
          droppedLinksCount: 0,
          traceGroup: 'client_pay_order',
          'traceGroupFields.endTime': '2021-03-25T17:23:45.949285120Z',
          'traceGroupFields.statusCode': 0,
          'traceGroupFields.durationInNanos': 224999424,
          'resource.attributes.telemetry@sdk@name': 'opentelemetry',
          'resource.attributes.telemetry@sdk@language': 'python',
          'resource.attributes.telemetry@sdk@version': '0.14b0',
          'resource.attributes.service@name': 'frontend-client',
          'resource.attributes.host@hostname': 'ip-172-31-10-8.us-west-2.compute.internal',
          'status.code': 0,
          'instrumentationLibrary.name': '__main__',
        },
      },
      {
        _index: 'otel-v1-apm-span-000001',
        _type: '_doc',
        _id: '11c4d645b0b6544a',
        _score: 4.4400907,
        _source: {
          traceId: '03f9c770db5ee2f1caac0afc36db49ba',
          spanId: '11c4d645b0b6544a',
          traceState: '',
          parentSpanId: 'e8e61cf518ff0d47',
          name: 'pay_order',
          kind: 'SPAN_KIND_SERVER',
          startTime: '2021-03-25T17:23:45.728619520Z',
          endTime: '2021-03-25T17:23:45.909096192Z',
          durationInNanos: 180476672,
          serviceName: 'order',
          events: [],
          links: [],
          droppedAttributesCount: 0,
          droppedEventsCount: 0,
          droppedLinksCount: 0,
          traceGroup: 'client_pay_order',
          'traceGroupFields.endTime': '2021-03-25T17:23:45.949285120Z',
          'traceGroupFields.statusCode': 0,
          'traceGroupFields.durationInNanos': 224999424,
          'span.attributes.net@peer@ip': '127.0.0.1',
          'instrumentationLibrary.version': '0.14b0',
          'resource.attributes.telemetry@sdk@language': 'python',
          'span.attributes.host@port': 8088,
          'span.attributes.http@status_text': 'OK',
          'resource.attributes.telemetry@sdk@version': '0.14b0',
          'resource.attributes.service@instance@id': '139858677314952',
          'resource.attributes.service@name': 'order',
          'span.attributes.component': 'http',
          'status.code': 0,
          'instrumentationLibrary.name': 'opentelemetry.instrumentation.flask',
          'span.attributes.http@method': 'POST',
          'span.attributes.http@user_agent': 'python-requests/2.25.1',
          'span.attributes.net@peer@port': 56894,
          'resource.attributes.telemetry@sdk@name': 'opentelemetry',
          'span.attributes.http@server_name': '0.0.0.0',
          'span.attributes.http@route': '/pay_order',
          'span.attributes.http@host': 'localhost:8088',
          'span.attributes.http@target': '/pay_order',
          'span.attributes.http@scheme': 'http',
          'resource.attributes.host@hostname': 'ip-172-31-10-8.us-west-2.compute.internal',
          'span.attributes.http@flavor': '1.1',
          'span.attributes.http@status_code': 200,
        },
      },
      {
        _index: 'otel-v1-apm-span-000001',
        _type: '_doc',
        _id: '421660af43ed2f96',
        _score: 4.4400907,
        _source: {
          traceId: '03f9c770db5ee2f1caac0afc36db49ba',
          spanId: '421660af43ed2f96',
          traceState: '',
          parentSpanId: 'a4869b984bdcdb69',
          name: 'cart_sold',
          kind: 'SPAN_KIND_INTERNAL',
          startTime: '2021-03-25T17:23:45.745376768Z',
          endTime: '2021-03-25T17:23:45.819226880Z',
          durationInNanos: 73850112,
          serviceName: 'database',
          events: [],
          links: [],
          droppedAttributesCount: 0,
          droppedEventsCount: 0,
          droppedLinksCount: 0,
          traceGroup: 'client_pay_order',
          'traceGroupFields.endTime': '2021-03-25T17:23:45.949285120Z',
          'traceGroupFields.statusCode': 0,
          'traceGroupFields.durationInNanos': 224999424,
          'resource.attributes.telemetry@sdk@name': 'opentelemetry',
          'resource.attributes.telemetry@sdk@language': 'python',
          'resource.attributes.telemetry@sdk@version': '0.14b0',
          'resource.attributes.service@instance@id': '140307275923408',
          'resource.attributes.service@name': 'database',
          'resource.attributes.host@hostname': 'ip-172-31-10-8.us-west-2.compute.internal',
          'status.code': 0,
          'instrumentationLibrary.name': '__main__',
        },
      },
    ],
  },
};
export const TEST_SERVICE_MAP_GRAPH = {
  graph: {
    nodes: [
      {
        id: 1,
        label: 'order',
        size: 15,
        title: '<p>order</p><p>Average latency: 90.1ms</p>',
        borderWidth: 0,
        color: 'rgba(158, 134, 192, 1)',
      },
      {
        id: 2,
        label: 'analytics-service',
        size: 15,
        title: '<p>analytics-service</p><p>Average latency: 12.99ms</p>',
        borderWidth: 0,
        color: 'rgba(210, 202, 224, 1)',
      },
      {
        id: 3,
        label: 'database',
        size: 15,
        title: '<p>database</p><p>Average latency: 49.54ms</p>',
        borderWidth: 0,
        color: 'rgba(187, 171, 212, 1)',
      },
      {
        id: 4,
        label: 'frontend-client',
        size: 15,
        title: '<p>frontend-client</p><p>Average latency: 207.71ms</p>',
        borderWidth: 0,
        color: 'rgba(78, 42, 122, 1)',
      },
      {
        id: 5,
        label: 'inventory',
        size: 15,
        title: '<p>inventory</p><p>Average latency: 183.52ms</p>',
        borderWidth: 0,
        color: 'rgba(95, 61, 138, 1)',
      },
      {
        id: 6,
        label: 'authentication',
        size: 15,
        title: '<p>authentication</p><p>Average latency: 139.09ms</p>',
        borderWidth: 0,
        color: 'rgba(125, 95, 166, 1)',
      },
      {
        id: 7,
        label: 'payment',
        size: 15,
        title: '<p>payment</p><p>Average latency: 134.36ms</p>',
        borderWidth: 0,
        color: 'rgba(129, 99, 169, 1)',
      },
      {
        id: 8,
        label: 'recommendation',
        size: 15,
        title: '<p>recommendation</p><p>Average latency: 176.97ms</p>',
        borderWidth: 0,
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

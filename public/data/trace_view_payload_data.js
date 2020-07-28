export const traceViewPayloadData = `{
  { 
    "_index": "apm-spans-2020.07.14",
    "_type": "_doc",
    "_id": "HGCvSnMBAqvnhSHvvtvF",
    "_version": 1,
    "_score": 0,
    "_source": {
      "name": {
        "value": "read_inventory"
      },
      "endTime": "2020-07-14T00:17:16.037573400Z",
      "attributes": {
        "attributeMap": {
          "http.scheme": {
            "stringValue": {
              "value": "http"
            }
          },
          "http.host": {
            "stringValue": {
              "value": "localhost:8082"
            }
          },
          "http.server_name": {
            "stringValue": {
              "value": "0.0.0.0"
            }
          },
          "http.flavor": {
            "stringValue": {
              "value": "1.1"
            }
          },
          "net.peer.port": {
            "stringValue": {}
          },
          "net.peer.ip": {
            "stringValue": {
              "value": "172.21.0.1"
            }
          },
          "http.method": {
            "stringValue": {
              "value": "GET"
            }
          },
          "http.target": {
            "stringValue": {
              "value": "/read_inventory"
            }
          },
          "host.port": {
            "stringValue": {}
          },
          "component": {
            "stringValue": {
              "value": "http"
            }
          }
        }
      },
      "kind": "SERVER",
      "identifier": {
        "hostName": "1d13d2f63298"
      },
      "libraryInfo": {
        "coreLibraryVersion": "0.10b0"
      },
      "@timestamp": "2020-07-14T00:18:17.685Z",
      "spanId": "8jAuSGH546k=",
      "traceId": "BxPV0JCGyBc/wV78yJjEiQ==",
      "serviceInfo": {
        "name": "inventory"
      },
      "parentSpanId": "SE5T9Burkek=",
      "startTime": "2020-07-14T00:17:15.796912600Z",
      "@version": "1",
      "labels": {
        "service.instance.id": "140513585331728",
        "telemetry.sdk.name": "opentelemetry"
      },
      "status": {}
    },
    "fields": {
      "startTime": [
        "2020-07-14T00:17:15.796Z"
      ],
      "@timestamp": [
        "2020-07-14T00:18:17.685Z"
      ],
      "endTime": [
        "2020-07-14T00:17:16.037Z"
      ]
    },
    "highlight": {
      "traceId": [
        "@kibana-highlighted-field@BxPV0JCGyBc@/kibana-highlighted-field@/@kibana-highlighted-field@wV78yJjEiQ@/kibana-highlighted-field@=="
      ]
    }
  }
}`
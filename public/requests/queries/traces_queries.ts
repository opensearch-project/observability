export const getTracesQuery = (traceId = null) => {
  const query = {
    "size": 10000,
    "query": {
      "bool": {
        "must": [],
        "must_not": [
          {
            "exists": {
              "field": "parentSpanId"
            }
          }
        ]
      }
    },
    "_source": {
      "includes": [
        "traceId",
        "name"
      ]
    },
    "script_fields": {
      "latency": {
        "script": "doc['endTime'].value.toInstant().toEpochMilli() - doc['startTime'].value.toInstant().toEpochMilli()"
      }
    }
  }
  if (traceId) {
    query.query.bool.must.push({
      "term": {
        "traceId": traceId
      }
    });
  }
  return query;
}

export const getTracesLastUpdatedQuery = (traceId) => {
  return {
    "size": 0,
    "query": {
      "bool": {
        "must": [
          {
            "term": {
              "traceId": traceId
            }
          }
        ]
      }
    },
    "aggs": {
      "last_updated": {
        "max": {
          "field": "endTime"
        }
      }
    }
  }
}

export const getTracesErrorCountQuery = (traceId) => {
  return {
    "size": 0,
    "query": {
      "bool": {
        "must": [
          {
            "term": {
              "traceId": traceId
            }
          },
          {
            "exists": {
              "field": "status.code"
            }
          }
        ]
      }
    },
    "aggs": {
      "error_count": {
        "value_count": {
          "field": "status.code"
        }
      }
    }
  }
}

export const getServiceBreakdownQuery = (traceId) => {
  const query = {
    "size": 0,
    "query": {
      "bool": {
        "must": [
          {
            "term": {
              "traceId": traceId
            }
          }
        ]
      }
    },
    "aggs": {
      "service_type": {
        "terms": {
          "field": "resource.attributes.service.name"
        },
        "aggs": {
          "total_latency": {
            "scripted_metric": {
              "init_script": `
                state.latencies = [];
              `,
              "map_script": `
                state.latencies.add(doc['endTime'].value.toInstant().toEpochMilli() - doc['startTime'].value.toInstant().toEpochMilli());
              `,
              "combine_script": `
                double sumLatency = 0;
                for (t in state.latencies) { 
                  sumLatency += t;
                }
                return sumLatency;
              `,
              "reduce_script": `
                double sumLatency = 0;
                for (a in states) {
                  if (a != null) {
                    sumLatency += a;
                  }
                }
                return sumLatency;
              `
            }
          }
        }
      }
    }
  };
  return query;
}

export const getSpanDetailQuery = (traceId, size = 200) => {
  const query = {
    "from": 0,
    "size": size,
    "query": {
      "bool": {
        "must": [
          {
            "term": {
              "traceId": traceId
            }
          },
          {
            "exists": {
              "field": "resource.attributes.service.name"
            }
          }
        ]
      }
    },
    "sort": [
      {
        "startTime": {
          "order": "desc"
        }
      }
    ],
    "_source": {
      "includes": [
        "resource.attributes.service.name",
        "startTime",
        "status.code"
      ]
    },
    "script_fields": {
      "latency": {
        "script": "doc['endTime'].value.toInstant().toEpochMilli() - doc['startTime'].value.toInstant().toEpochMilli()"
      }
    }
  };
  return query;
}

export const getPayloadQuery = (traceId, size=200) => {
  return {
    "size": size,
    "query": {
      "bool": {
        "must": [
          {
            "term": {
              "traceId": traceId
            }
          }
        ]
      }
    }
  }
}
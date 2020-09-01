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
        "name.value"
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
        "traceId.keyword": traceId
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
              "traceId.keyword": traceId
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
              "traceId.keyword": traceId
            }
          },
          {
            "range": {
              "status.code": {
                "gte": 1
              }
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
              "traceId.keyword": traceId
            }
          }
        ]
      }
    },
    "aggs": {
      "service_type": {
        "terms": {
          "field": "serviceInfo.name.keyword"
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
              "traceId.keyword": traceId
            }
          },
          {
            "exists": {
              "field": "serviceInfo.name"
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
        "serviceInfo.name",
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
              "traceId.keyword": traceId
            }
          }
        ]
      }
    }
  }
}
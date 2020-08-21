export const getTracesQuery = () => {
  return {
    "size": 10000,
    "query": {
      "bool": {
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
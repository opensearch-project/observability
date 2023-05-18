# Trace Analytics Service Map - UI

## Node Map Construct

Construct the map from service_map index and get a Map of service and list of target

* service, has one attribute **serviceName**.
* target, has one attribute **resource**

In the following example, we assume user select the following service denoted as **service_list**

* database, **database_resource_list**
* analytics-service, **analytics-service_list**
* inventory, **inventory_list**

The unin of all the resource list **database_resource_list + analytics-service_list + inventory_list** denoated as **resource_list**

## Metric Queries - Enrich

### Reference

* [Service-map Queries](ServiceMapQueries.md)

### Get Latency Metrics (for each service)

The filter condition is:

```
resource.attributes.service.name in service_list 
and (name in resource_list or parentSpanId not exist)
```

Then we can use the single DSL query to get the metrics of each service.

```
GET otel-v1-apm-span-000001/_search
{
  "from": 0,
  "size": 0,
  "query": {
    "bool": {
      "filter": [
        {
          "terms": {
            "resource.attributes.service.name.keyword": [
              "analytics-service",
              "database",
              "inventory"
            ]
          }
        },
        {
          "bool": {
            "should": [
              {
                "bool": {
                  "must_not": {
                    "exists": {
                      "field": "parentSpanId.keyword",
                      "boost": 1
                    }
                  }            
                }
              },
              {
                "terms": {
                  "name.keyword": [
                    "analytics-service",
                    "database",
                    "inventory",
                    "authentication",
                    "recommendation",
                    "payment"
                  ]
                }
              }
            ],
            "adjust_pure_negative": true,
            "boost": 1
          }          
        }
      ]
    }
  },
  "aggregations" : {
    "name.keyword" : {
      "terms" : {
        "field" : "resource.attributes.service.name.keyword",
        "size" : 200,
        "min_doc_count" : 1,
        "shard_min_doc_count" : 0,
        "show_term_doc_count_error" : false,
        "order" : [
          {
            "_count" : "desc"
          },
          {
            "_key" : "asc"
          }
        ]
      },
      "aggregations" : {
        "AVG_0" : {
          "avg" : {
            "field" : "durationInNanos"
          }
        }
      }
    }
  }  
}

# Result
https://paste.amazon.com/show/penghuo/1604538583
```

### GetThroughput - GetRequestCount

```
GET otel-v1-apm-span-000001/_search
{
  "from": 0,
  "size": 0,
  "query": {
    "bool": {
      "filter": [
        {
          "terms": {
            "resource.attributes.service.name.keyword": [
              "analytics-service",
              "database",
              "inventory"
            ]
          }
        },
        {
          "bool": {
            "should": [
              {
                "bool": {
                  "must_not": {
                    "exists": {
                      "field": "parentSpanId.keyword",
                      "boost": 1
                    }
                  }            
                }
              },
              {
                "terms": {
                  "name.keyword": [
                    "analytics-service",
                    "database",
                    "inventory",
                    "authentication",
                    "recommendation",
                    "payment"
                  ]
                }
              }
            ],
            "adjust_pure_negative": true,
            "boost": 1
          }          
        }
      ]
    }
  },
  "aggregations" : {
    "name.keyword" : {
      "terms" : {
        "field" : "resource.attributes.service.name.keyword",
        "size" : 200,
        "min_doc_count" : 1,
        "shard_min_doc_count" : 0,
        "show_term_doc_count_error" : false,
        "order" : [
          {
            "_count" : "desc"
          },
          {
            "_key" : "asc"
          }
        ]
      },
      "aggregations" : {
        "COUNT_0" : {
          "cardinality" : {
            "field" : "spanId.keyword"
          }
        }
      }
    }
  } 
}

# Result
https://paste.amazon.com/show/penghuo/1604446208
```

### GetErrorRate

* solution I, caculate error rate with two queries. The first query get the total request for each service(denoted as **request**), the second query get the total error count for each service (denoted as **error**). Then the **error_rate = error / request**.

```
GET otel-v1-apm-span-000001/_search
{
  "from": 0,
  "size": 0,
  "query": {
    "bool": {
      "filter": [
        {
          "term": {
            "status.code.keyword": {
              "value": "UnknownError"
            }
          }
        },        
        {
          "terms": {
            "resource.attributes.service.name.keyword": [
              "analytics-service",
              "database",
              "inventory"
            ]
          }
        },
        {
          "bool": {
            "should": [
              {
                "bool": {
                  "must_not": {
                    "exists": {
                      "field": "parentSpanId.keyword",
                      "boost": 1
                    }
                  }
                }
              },
              {
                "terms": {
                  "name.keyword": [
                    "analytics-service",
                    "database",
                    "inventory",
                    "authentication",
                    "recommendation",
                    "payment"
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  },
  "aggregations" : {
    "name.keyword" : {
      "terms" : {
        "field" : "resource.attributes.service.name.keyword",
        "size" : 200,
        "min_doc_count" : 1,
        "shard_min_doc_count" : 0,
        "show_term_doc_count_error" : false,
        "order" : [
          {
            "_count" : "desc"
          },
          {
            "_key" : "asc"
          }
        ]
      },
      "aggregations" : {
        "COUNT_0" : {
          "cardinality" : {
            "field" : "spanId.keyword"
          }
        }     
      }
    }
  }  
}
```

## 

## Average Latency for each Trace group of selected Service

```
SELECT T1.traceGroup, avg(T1.durationInNanos)
FROM otel-v1-apm-span-000001 T1 JOIN otel-v1-apm-span-000001 T2
ON T1.traceId = T2.traceId
WHERE T1.traceGroup IS NOT NULL AND T2.serviceName = 'mysql'
GROUP BY T1.traceGroup
```



```
# 1. GET TraceIds for mysql service
GET /otel-v1-apm-span-000001/_search
{
  "from" : 0,
  "size" : 1000,
  "query" : {
    "bool" : {
      "filter" : [
        {
          "bool" : {
            "must" : [
              {
                "term" : {
                  "serviceName" : {
                    "value" : "mysql",
                    "boost" : 1.0
                  }
                }
              }
            ],
            "adjust_pure_negative" : true,
            "boost" : 1.0
          }
        }
      ],
      "adjust_pure_negative" : true,
      "boost" : 1.0
    }
  },
  "_source" : {
    "includes" : [
      "traceId"
    ],
    "excludes" : [ ]
  }
}

# 2. Calculate the average latency of each Trace Group
GET otel-v1-apm-span-000001/_search
{
  "from": 0,
  "size": 0,
  "query": {
    "bool": {
      "filter": [
        {
          "bool": {
            "must": {
              "exists": {
                "field": "parentSpanId",
                "boost": 1
              }
            }            
          }
        },
        {
          "terms": {
            "traceId": [
              "000000000000000010d182dd2dc19b43",
              "00000000000000003fbaec3b30b81597"
            ]
          }
                    
        }
      ]
    }
  },
  "aggregations" : {
    "name.keyword" : {
      "terms" : {
        "field" : "traceGroup",
        "size" : 200,
        "min_doc_count" : 1,
        "shard_min_doc_count" : 0,
        "show_term_doc_count_error" : false,
        "order" : [
          {
            "_count" : "desc"
          },
          {
            "_key" : "asc"
          }
        ]
      },
      "aggregations" : {
        "AVG_0" : {
          "avg" : {
            "field" : "durationInNanos"
          }
        }
      }
    }
  }  
}
```






# Services based correlations Dashboard Playground

For the purpose of playing and reviewing the services dashboard, this tutorial uses the preloaded traces,service-map,metrics data.

The [sample traces](bulk_traces.json) are added here under the preloaded data folder and are ready to be ingested into open search.
The [sample services](bulk_traces.json) are added here under the preloaded data folder and are ready to be ingested into open search.
The [sample metrics](bulk_metrics.json) are added here under the preloaded data folder and are ready to be ingested into open search.

## Demo Instructions

1. Start docker-compose docker compose up --build.
This will load both opensearch server & dashboards   
   - `$ docker compose up`
   - Ensure vm.max_map_count has been set to 262144 or higher (`sudo sysctl -w vm.max_map_count=262144`).
   
2. Load the Simple Schema traces / services / metrics index templates Loading Traces
    
   - `curl -XPUT localhost:9200/_component_template/tracegroups_template  -H "Content-Type: application/json" --data-binary @traceGroups.mapping`
   
   - `curl -XPUT localhost:9200/_index_template/traces  -H "Content-Type: application/json" --data-binary @traces.mapping`
   
   - `curl -XPUT localhost:9200/_index_template/services  -H "Content-Type: application/json" --data-binary @services.mapping`
   
   - `curl -XPUT localhost:9200/_index_template/metrics  -H "Content-Type: application/json" --data-binary @metrics.mapping`


3. Load the (proprietary) `data-prepper` traces / services  [traces mapping template](../../assets/mapping/data-prepper-traces.mapping) , [Service mapping templates](../../assets/mapping/data-prepper-services.mapping)
   - `curl -XPUT localhost:9200/_index_template/otel-v1-apm-span  -H "Content-Type: application/json" --data-binary @data-prepper-traces.mapping`

   - `curl -XPUT localhost:9200/_template/otel-v1-apm-service  -H "Content-Type: application/json" --data-binary @data-prepper-services.mapping`

   
4. Bulk load the traces into the proprietary traces / services indices 
   
   - `curl -XPOST "localhost:9200/otel-v1-apm-span/_bulk?pretty&refresh" -H "Content-Type: application/json" --data-binary @bulk_traces.json`
   - `curl -XPOST "localhost:9200/otel-v1-apm-service-map/_bulk?pretty&refresh" -H "Content-Type: application/json" --data-binary @bulk_services.json`
   
   - `curl -XPOST "localhost:9200/sso_metrics-histogram-prod/_bulk?pretty&refresh" -H "Content-Type: application/json" --data-binary @bulk_metrics.json`

4.1) Bulk load the traces into the standard sso traces data-stream: 

```
curl -X PUT "http://localhost:9200/sso_traces-default-namespace/_bulk" -H 'Content-Type: application/json' -d '
{ "create":{ } }
{"traceId":"4fa04f117be100f476b175e41096e736","spanId":"e275ac9d21929e9b","traceState":[],"parentSpanId":"","name":"client_checkout","kind":"INTERNAL","@timestamp":"2021-11-13T20:20:39+00:00","startTime":"2021-11-13T20:20:39+00:00","endTime":"2021-11-14T20:10:41+00:00","droppedAttributesCount":0,"droppedEventsCount":0,"droppedLinksCount":0,"resource":{"telemetry@sdk@name":"opentelemetry","telemetry@sdk@language":"python","telemetry@sdk@version":"0.14b0","service@name":"frontend-client","host@hostname":"ip-172-31-10-8.us-west-2.compute.internal"},"status":{"code":0},"attributes": {"serviceName":"frontend"}}
{ "create":{ } }
{"traceId":"15d30e4d211d79e10fcaeab97015c90d","spanId":"5bcca8ba513bb54a","traceState":[],"parentSpanId":"","name":"mysql","kind":"CLIENT","@timestamp":"2021-11-13T20:20:39+00:00","startTime":"2021-11-13T20:20:39+00:00","endTime":"2021-11-14T20:10:41+00:00","events":[{"@timestamp":"2021-03-25T17:21:03.044+00:00","name":"exception","attributes":{"exception@message":"1050 %2842S01%29: Table %27User_Carts%27 already exists","exception@type":"ProgrammingError","exception@stacktrace":"Traceback %28most recent call last :File /usr/lib/python3.6/site-packages/opentelemetry/sdk/trace/__init__.py, line 804, in use_span yield spanFile /usr/lib/python3.6/site-packages/opentelemetry/instrumentation/dbapi/__init__.py, line 354, in traced_executionraise exFile /usr/lib/python3.6/site-packages/opentelemetry/instrumentation/dbapi/__init__.py, line 345, in traced_executionresult = query_method%28%2Aargs, %2A%2Akwargs%29File /usr/lib/python3.6/site-packages/mysql/connector/cursor.py"},"droppedAttributesCount":0}],"links":[],"droppedAttributesCount":0,"droppedEventsCount":0,"droppedLinksCount":0,"status":{"message":"1050 %2842S01%29: Table %27User_Carts%27 already exists","code":2},"attributes":{"serviceName":"database","data_stream":{"type":"span","dataset":"mysql"},"component":"mysql","db@user":"root","net@peer@name":"localhost","db@type":"sql","net@peer@port":3306,"db@instance":"","db@statement":"CREATE TABLE `User_Carts` %28  `ItemId` varchar%2816%29 NOT NULL,  `TotalQty` int%2811%29 NOT NULL,  PRIMARY KEY %28`ItemId`%29%29 ENGINE=InnoDB"},"resource":{"telemetry@sdk@language":"python","service@name":"mysql","telemetry@sdk@version":"0.14b0","service@instance@id":"140307275923408","telemetry@sdk@name":"opentelemetry","host@hostname":"ip-172-31-10-8.us-west-2.compute.internal"}}
{ "create":{ } }
{"traceId":"c1d985bd02e1dbb85b444011f19a1ecc","spanId":"55a698828fe06a42","traceState":[],"parentSpanId":"","name":"mysql","kind":"CLIENT","@timestamp":"2021-11-13T20:20:39+00:00","startTime":"2021-11-13T20:20:39+00:00","endTime":"2021-11-14T20:10:41+00:00","events":[{"@timestamp":"2021-03-25T17:21:03+00:00","name":"exception","attributes":{"exception@message":"1050 %2842S01%29: Table  Inventory_Items  already exists","exception@type":"ProgrammingError","exception@stacktrace":"Traceback most recent call last"},"droppedAttributesCount":0}],"links":[{"traceId":"c1d985bd02e1dbb85b444011f19a1ecc","spanId":"55a698828fe06a42w2","traceState":[],"attributes":{"db@user":"root","net@peer@name":"localhost","component":"mysql","db@type":"sql","net@peer@port":3306,"db@instance":"","db@statement":"CREATE TABLE `Inventory_Items` %28  `ItemId` varchar%2816%29 NOT NULL,  `TotalQty` int%2811%29 NOT NULL,  PRIMARY KEY %28`ItemId`%29%29 ENGINE=InnoDB"},"droppedAttributesCount":0}],"droppedAttributesCount":0,"droppedEventsCount":0,"droppedLinksCount":0,"resource":{"telemetry@sdk@language":"python","telemetry@sdk@version":"0.14b0","service@instance@id":"140307275923408","service@name":"database","telemetry@sdk@name":"opentelemetry","host@hostname":"ip-172-31-10-8.us-west-2.compute.internal"},"status":{"code":2,"message":"1050 %2842S01%29: Table %27Inventory_Items%27 already exists"},"attributes":{"serviceName":"database","data_stream":{"type":"span","namespace":"exceptions","dataset":"mysql"},"db@user":"root","net@peer@name":"localhost","component":"mysql","db@type":"sql","net@peer@port":3306,"db@instance":"","db@statement":"CREATE TABLE `Inventory_Items` %28  `ItemId` varchar%2816%29 NOT NULL,  `TotalQty` int%2811%29 NOT NULL,  PRIMARY KEY %28`ItemId`%29%29 ENGINE=InnoDB"}}
'
```

5. As part of the Integration instance loading, the [`config.json`](../../config.json) has defined fields mapping section for the `traces` collection stream
```json5
    ... 
     "fields-mapping" : [
         {
           "template": "data-prepper-services",
           "fields": [
                     {"alias":"attributes.serviceName","field":"serviceName"} ,
                     {"alias":"events.@timestamp","field":"events.time"}
               ]
        }
     ]
    ...
```

This indicates to the Integration loading API to create field aliases in the following manner:

```
curl -X PUT "http://localhost:9200/otel-v1-apm-span/_mapping" -H 'Content-Type: application/json' -d '
{
  "properties": {
    "attributes.serviceName": {
      "type": "alias",
      "path": "serviceName"
    },
    "events.@timestamp" : {
      "type": "alias",
      "path": "events.time"
    }
  }
}'

```


6. We can now see the services dashboards to display the preloaded data services based correlations  [dashboards](../../assets/display/services-dashboard.ndjson)
   
   - Load the [dashboards](../../assets/display/services-dashboard.ndjson) 
     - `curl -X POST "localhost:5601/api/saved_objects/_import?overwrite=true" -H "osd-xsrf: true" --form file=@services-dashboard.ndjson`

   - For the collaboration between the proprietary `traces` stream from `data-prepper` and the standard `traces` stream from SSO - we will use the pre-canned dashboard's default `index-pattern` (`sso_traces-*-*`) without changes
   - For the dashboard to work with both the proprietary `otel-v1-apm-span` data-stream and the standard `sso_traces-*` stream we will create an index alias for the `otel-v1-apm-span`
```
   curl -X POST "http://localhost:9200/_aliases" -H 'Content-Type: application/json' -d '
   {
      "actions": [
         {
            "add": {
               "index": "otel-v1-apm-span",
               "alias": "sso_traces-dataset-test"
            }
         }
      ]
   }'
```` 
    
  - Since we created the appropriate fields mapping aliases between the proprietary `traces` index to the SSO standard `traces` the pre-canned services dashboard would work out of the box for both traces streams regardless of the index & field names differeces.


7. Open the dashboard and view the preloaded access logs
   - Go to [Dashbords](http://localhost:5601/app/dashboards#/list?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:'2023-02-24T17:10:34.442Z',to:'2023-02-24T17:46:44.056Z'))
   - data-stream names :`sso_services-service-prod`

   ![](img/services-dashboard.png)

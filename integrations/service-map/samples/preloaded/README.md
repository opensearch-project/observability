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
   
2. Load the Simple Schema traces / services / metrics index templates [Loading Traces](../../../../schema/observability/traces/Usage.md)
    
   - `curl -XPUT localhost:9200/_component_template/tracegroups_template  -H "Content-Type: application/json" --data-binary @traceGroups.mapping`
   
   - `curl -XPUT localhost:9200/_index_template/traces  -H "Content-Type: application/json" --data-binary @traces.mapping`
   
   - `curl -XPUT localhost:9200/_index_template/services  -H "Content-Type: application/json" --data-binary @services.mapping`
   
   - `curl -XPUT localhost:9200/_index_template/metrics  -H "Content-Type: application/json" --data-binary @metrics.mapping`


3. Load the (proprietary) `data-prepper` traces / services  [traces mapping template](../../schema/data-prepper-traces.mapping) , [Service mapping templates](../../schema/data-prepper-services.mapping)
   - `curl -XPUT localhost:9200/_index_template/otel-v1-apm-span  -H "Content-Type: application/json" --data-binary @data-prepper-traces.mapping`

   - `curl -XPUT localhost:9200/_template/otel-v1-apm-service  -H "Content-Type: application/json" --data-binary @data-prepper-services.mapping`

   
4. Bulk load the traces into the proprietary traces / services indices 
   
   - `curl -XPOST "localhost:9200/otel-v1-apm-span/_bulk?pretty&refresh" -H "Content-Type: application/json" --data-binary @bulk_traces.json`
   - `curl -XPOST "localhost:9200/otel-v1-apm-service-map/_bulk?pretty&refresh" -H "Content-Type: application/json" --data-binary @bulk_services.json`
   
   - `curl -XPOST "localhost:9200/sso_metrics-histogram-prod/_bulk?pretty&refresh" -H "Content-Type: application/json" --data-binary @bulk_metrics.json`
   


5. As part of the Integration instance loading, the [`config.json`](../../config.json) has defined fields mapping section for the `traces` collection stream
```json5
  "fields-mapping" : [
       {"alias":"attributes.serviceName","field":"serviceName"} ,
       {"alias":"events.@timestamp","field":"events.time"}
     ]
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


6. We can now load the services dashboards to display the preloaded data services based correlations  [dashboards](../../assets/display/services-dashboard.ndjson)
   
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

## Load samples
For loading the given samples run the next request once the Opensearch cluster including Observability plugin has started:


`PUT ss4o_traces-default-namespace/_bulk`
```json
{ "create":{ } }
{"traceId":"4fa04f117be100f476b175e41096e736","spanId":"e275ac9d21929e9b","traceState":[],"parentSpanId":"","name":"client_checkout","kind":"INTERNAL","@timestamp":"2021-11-13T20:20:39+00:00","endTime":"2021-11-14T20:10:41+00:00","droppedAttributesCount":0,"droppedEventsCount":0,"droppedLinksCount":0,"resource":{"telemetry@sdk@name":"opentelemetry","telemetry@sdk@language":"python","telemetry@sdk@version":"0.14b0","service@name":"frontend-client","host@hostname":"ip-172-31-10-8.us-west-2.compute.internal"},"status":{"code":0}}
{ "create":{ } }
{"traceId":"15d30e4d211d79e10fcaeab97015c90d","spanId":"5bcca8ba513bb54a","traceState":[],"parentSpanId":"","name":"mysql","kind":"CLIENT","@timestamp":"2021-11-13T20:20:39+00:00","endTime":"2021-11-14T20:10:41+00:00","events":[{"@timestamp":"2021-03-25T17:21:03.044+00:00","name":"exception","attributes":{"exception@message":"1050 %2842S01%29: Table %27User_Carts%27 already exists","exception@type":"ProgrammingError","exception@stacktrace":"Traceback %28most recent call last :File /usr/lib/python3.6/site-packages/opentelemetry/sdk/trace/__init__.py, line 804, in use_span yield spanFile /usr/lib/python3.6/site-packages/opentelemetry/instrumentation/dbapi/__init__.py, line 354, in traced_executionraise exFile /usr/lib/python3.6/site-packages/opentelemetry/instrumentation/dbapi/__init__.py, line 345, in traced_executionresult = query_method%28%2Aargs, %2A%2Akwargs%29File /usr/lib/python3.6/site-packages/mysql/connector/cursor.py"},"droppedAttributesCount":0}],"links":[],"droppedAttributesCount":0,"droppedEventsCount":0,"droppedLinksCount":0,"status":{"message":"1050 %2842S01%29: Table %27User_Carts%27 already exists","code":2},"attributes":{"data_stream":{"type":"span","dataset":"mysql"},"component":"mysql","db@user":"root","net@peer@name":"localhost","db@type":"sql","net@peer@port":3306,"db@instance":"","db@statement":"CREATE TABLE `User_Carts` %28  `ItemId` varchar%2816%29 NOT NULL,  `TotalQty` int%2811%29 NOT NULL,  PRIMARY KEY %28`ItemId`%29%29 ENGINE=InnoDB"},"resource":{"telemetry@sdk@language":"python","service@name":"database","telemetry@sdk@version":"0.14b0","service@instance@id":"140307275923408","telemetry@sdk@name":"opentelemetry","host@hostname":"ip-172-31-10-8.us-west-2.compute.internal"}}
{ "create":{ } }
{"traceId":"c1d985bd02e1dbb85b444011f19a1ecc","spanId":"55a698828fe06a42","traceState":[],"parentSpanId":"","name":"mysql","kind":"CLIENT","@timestamp":"2021-11-13T20:20:39+00:00","endTime":"2021-11-14T20:10:41+00:00","events":[{"@timestamp":"2021-03-25T17:21:03+00:00","name":"exception","attributes":{"exception@message":"1050 %2842S01%29: Table  Inventory_Items  already exists","exception@type":"ProgrammingError","exception@stacktrace":"Traceback most recent call last"},"droppedAttributesCount":0}],"links":[{"traceId":"c1d985bd02e1dbb85b444011f19a1ecc","spanId":"55a698828fe06a42w2","traceState":[],"attributes":{"db@user":"root","net@peer@name":"localhost","component":"mysql","db@type":"sql","net@peer@port":3306,"db@instance":"","db@statement":"CREATE TABLE `Inventory_Items` %28  `ItemId` varchar%2816%29 NOT NULL,  `TotalQty` int%2811%29 NOT NULL,  PRIMARY KEY %28`ItemId`%29%29 ENGINE=InnoDB"},"droppedAttributesCount":0}],"droppedAttributesCount":0,"droppedEventsCount":0,"droppedLinksCount":0,"resource":{"telemetry@sdk@language":"python","telemetry@sdk@version":"0.14b0","service@instance@id":"140307275923408","service@name":"database","telemetry@sdk@name":"opentelemetry","host@hostname":"ip-172-31-10-8.us-west-2.compute.internal"},"status":{"code":2,"message":"1050 %2842S01%29: Table %27Inventory_Items%27 already exists"},"attributes":{"data_stream":{"type":"span","namespace":"exceptions","dataset":"mysql"},"db@user":"root","net@peer@name":"localhost","component":"mysql","db@type":"sql","net@peer@port":3306,"db@instance":"","db@statement":"CREATE TABLE `Inventory_Items` %28  `ItemId` varchar%2816%29 NOT NULL,  `TotalQty` int%2811%29 NOT NULL,  PRIMARY KEY %28`ItemId`%29%29 ENGINE=InnoDB"}}
```

Run the next query to get the Spans kind CLIENT:

- `GET ss4o_traces-default-namespace/_search`
```json
{
  "query":{
    "term": {
      "kind":{
        "value":"CLIENT"
      }
    }
  }
}
```
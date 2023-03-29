## Load samples
For loading the given samples run the next request once the Opensearch cluster including Observability plugin has started:


`PUT ss4o_metrics-default-namespace/_bulk`
```json
{ "create":{ } }
{"max":652094078,"kind":"HISTOGRAM","buckets":[{"min":3.4028234663852886e+38,"max":0,"count":0},{"min":0,"max":10000000,"count":0},{"min":10000000,"max":50000000,"count":5},{"min":50000000,"max":100000000,"count":1},{"min":100000000,"max":3.4028234663852886e+38,"count":10}],"count":16,"bucketCountsList":[0,0,5,1,10],"description":"Histogram of durationInNanos in the events","sum":3136355061,"unit":"seconds","aggregationTemporality":"AGGREGATION_TEMPORALITY_DELTA","min":44606914,"bucketCounts":5,"name":"histogram","startTime":"2023-01-20T05:16:16.425669Z","explicitBoundsCount":4,"@timestamp":"2023-01-20T05:16:16.425669Z","explicitBoundsList":[0,10000000,50000000,100000000],"attributes":{"aggr_duration":26709005000,"serviceName":"AOCDockerDemoService","histogram_key":"durationInNanos","data_stream":{"dataset":"histogram","namespace":"production","type":"metric"}}}
{ "create":{ } }
{"unit":"ms","exemplars":[],"kind":"GAUGE","name":"lastLatency","flags":0,"description":"The last API latency observed at collection interval","startTime":"2023-01-20T05:16:16.425669Z","@timestamp":"2023-01-20T05:16:16.425669Z","value.double":0,"resource":{"cloud@account@id":"123367104812","process@pid":1,"host@arch":"amd64","host@id":"i-0005de88c8ebe7dbb","host@image@id":"ami-093d4bc1f6d4a890b","telemetry@sdk@version":"1.19.0","service@name":"AOCDockerDemoService","process@runtime@name":"OpenJDK Runtime Environment","os@type":"linux","cloud@availability_zone":"us-west-2b","host@type":"c5.2xlarge","cloud@provider":"aws","telemetry@sdk@language":"java","host@name":"ip-172-16-42-233.amazon.com","process@runtime@description":"Debian OpenJDK 64-Bit Server VM 17.0.4+8-Debian-1deb11u1","service@namespace":"AOCDockerDemo","cloud@region":"us-west-2","process@executable@path":"/usr/lib/jvm/java-17-openjdk-amd64/bin/java","process@command_line":"/usr/lib/jvm/java-17-openjdk-amd64/bin/java -javaagent:/aws-observability/classpath/aws-opentelemetry-agent-1.19.0-SNAPSHOT.jar","process@runtime@version":"17.0.4+8-Debian-1deb11u1","cloud@platform":"aws_ec2","telemetry@sdk@name":"opentelemetry","container@id":"71301ad845e7d082911d846ac9af3cd9ba4f2144d82d7ac0dfd51f335b256a61","telemetry@auto@version":"1.19.0-aws-SNAPSHOT","os@description":"Linux 5.4.225-139.416.amzn2int.x86_64"},"attributes":{"statusCode":"","apiName":"","serviceName":"AOCDockerDemoService"},"instrumentationScope":{"version":"1.0","name":"aws-otel","schemaUrl":"https://opentelemetry.io/schemas/1.13.0","attributes":{"identification":"aws-ec2"}}}
{ "create":{ } }
{"kind":"SUM","flags":0,"description":"Queue Size change","monotonic":false,"unit":"one","aggregationTemporality":"AGGREGATION_TEMPORALITY_CUMULATIVE","exemplars":[],"name":"queueSizeChange","startTime":"2023-01-20T05:16:16.425669Z","@timestamp":"2023-01-20T05:16:16.425669Z","value.double":0,"resource":{"cloud@account@id":"123367104812","process@pid":1,"host@arch":"amd64","host@id":"i-0005de88c8ebe7dbb","host@image@id":"ami-093d4bc1f6d4a890b","telemetry@sdk@version":"1.19.0","service@name":"AOCDockerDemoService","process@runtime@name":"OpenJDK Runtime Environment","os@type":"linux","cloud@availability_zone":"us-west-2b","host@type":"c5.2xlarge","cloud@provider":"aws","telemetry@sdk@language":"java","host@name":"ip-172-16-42-233.amazon.com","process@runtime@description":"Debian OpenJDK 64-Bit Server VM 17.0.4+8-Debian-1deb11u1","service@namespace":"AOCDockerDemo","cloud@region":"us-west-2","process@executable@path":"/usr/lib/jvm/java-17-openjdk-amd64/bin/java","process@command_line":"/usr/lib/jvm/java-17-openjdk-amd64/bin/java -javaagent:/aws-observability/classpath/aws-opentelemetry-agent-1.19.0-SNAPSHOT.jar","process@runtime@version":"17.0.4+8-Debian-1deb11u1","cloud@platform":"aws_ec2","telemetry@sdk@name":"opentelemetry","container@id":"71301ad845e7d082911d846ac9af3cd9ba4f2144d82d7ac0dfd51f335b256a61","telemetry@auto@version":"1.19.0-aws-SNAPSHOT","os@description":"Linux 5.4.225-139.416.amzn2int.x86_64"},"instrumentationScope":{"version":"1.0","name":"aws-otel","schemaUrl":"https://opentelemetry.io/schemas/1.13.0","attributes":{"identification":"aws-ec2"}},"attributes":{"serviceName":"AOCDockerDemoService","statusCode":"","apiName":"","data_stream":{"dataset":"sum","namespace":"production","type":"metric"}}}
```

- Run the next query to get the Histogram type metrics:

- `GET ss4o_metrics-default-namespace/_search`
```json
{
  "query":{
    "term": {
      "kind":{
        "value":"HISTOGRAM"
      }
    }
  }
}

```
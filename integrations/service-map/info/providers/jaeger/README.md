![jaeger](jaeger-logo.png)

# What is Jaeger

[Jaeger](https://github.com/jaegertracing/jaeger) Jaeger, inspired by Dapper and OpenZipkin, is a distributed tracing platform created by Uber Technologies and donated to Cloud Native Computing Foundation. It can be used for monitoring microservices-based distributed systems:

- Distributed context propagation
- Distributed transaction monitoring
- Root cause analysis
- Service dependency analysis
- Performance / latency optimization


# What is Jaeger Integration

Jaeger integration is concerned with the following aspects
 
 - Allow simple and automatic generation of all schematic structured
   - traces ( including specific fields mapping to map to SS4O schema)
   - services ( adding support for specific service mapping category)
   - metrics (using the standard SS4O schema)

 - Add Dashboard Assets for correlation between traces-services-metrics 

 - Add correlation queries to investigate traces based metrics

# Jaeger Trace Fields
Jaeger uses the following [Traces](../schema/jaeger-traces.mapping) mapping file

The next fields are used:
```text

- traceId - A unique identifier for a trace. All spans from the same trace share the same traceId.
- spanId - A unique identifier for a span within a trace, assigned when the span is created.
- traceState - Conveys information about request position in multiple distributed tracing graphs.
- parentSpanId - The spanId of this span's parent span. If this is a root span, then this field must be empty.
- name - A description of the span's operation.
- kind - The type of span. See OpenTelemetry - SpanKind.
- startTime - The start time of the span.
- endTime - The end time of the span.
- durationInNanos - Difference in nanoseconds between startTime and endTime.
- serviceName - Currently derived from the opentelemetry.proto.resource.v1.Resource associated with the span, the resource from the span originates.
- events - A list of events. See OpenTelemetry - Events.
- links - A list of linked spans. See OpenTelemetry - Links.
- droppedAttributesCount - The number of attributes that were discarded.
- droppedEventsCount - The number of events that were discarded.
- droppedLinksCount - The number of links that were dropped.
- span.attributes.* - All span attributes are split into a list of keywords.
- resource.attributes.* - All resource attributes are split into a list of keywords.
- status.code - The status of the span. See OpenTelemetry - Status.

```
These fields have a high overlap with the [`sso_traces`](../../../schema/observability/traces/README.md) fields from the observability catalog  

There are some additional `trace.group` related fields which are not part of the [OTEL spec](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md) for traces
```text
- traceGroup - A derived field, the name of the trace's root span.
- traceGroupFields.endTime - A derived field, the endTime of the trace's root span.
- traceGroupFields.statusCode - A derived field, the status.code of the trace's root span.
- traceGroupFields.durationInNanos - A derived field, the durationInNanos of the trace's root span.

```

# Jaeger Trace Fields Mapping to SSO Trace Schema
To compensate for the minor differences in fields naming between the [Jaeger -Trace mapping](../schema/jaeger-traces.mapping) and [SSO Traces mapping](../../../schema/observability/traces/traces.mapping)
We will define the next mapping alias that will be part of the [config.json](../config.json) for this integration

```json5
    ... 
     "fields-mapping" : [
         {
           "template": "jaeger-services.mapping",
           "fields": [
                     {"alias":"attributes.serviceName","field":"serviceName"} ,
                     {"alias":"events.@timestamp","field":"events.time"}
               ]
        }
     ]
    ...
```



To address this difference, the `trace` signal can be augmented with additional trace-component - in this case it will be the [traceGroup](../../../../../src/main/resources/schema/observability/traces/tracegroups.mapping).

## Service dashboard
Service will have a dashboard comprised of the following visualizations:
 - Latency per service with traces / metrics links
 - Latency per trace-group with traces / metrics links
 - Error rate per service with traces / metrics links
 - Error rate per trace-group with traces / metrics links
 - Throughput rate per service with traces / metrics links
 - Throughput rate per trace-group with traces / metrics links
 
 - Services view including error rate, latency, throughput, connected-services, traces, metrics

```text
+--------------------------------+--------------------------------+
|                                |                                |
|    Latency per service         |   Latency per trace-group      |
|    with traces/metrics links   |   with traces/metrics links    |
|                                |                                |
+--------------------------------+--------------------------------+
|                                |                                |
|    Error rate per service      |   Error rate per trace-group   |
|    with traces/metrics links   |   with traces/metrics links    |
|                                |                                |
+--------------------------------+--------------------------------+
|                                |                                |
|   Throughput rate per service  | Throughput rate per trace-group|
|   with traces/metrics links    | with traces/metrics links      |
|                                |                                |
+--------------------------------+--------------------------------+
|                                                        |
|       Services view with error rate, latency,          |
|       throughput, connected-services, traces,          |
|                        and metrics                     |
|                                                        |
+--------------------------------------------------------+

```
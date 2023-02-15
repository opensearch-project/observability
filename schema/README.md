# Simple Schema for Observability

## Background
Observability is the ability to measure a system’s current state based on the data it generates, such as logs, metrics, and traces. Observability relies on telemetry derived from instrumentation that comes from the endpoints and services.

Observability telemetry signals (logs, metrics, traces, alerts) arriving from the system would contain all the necessary information needed to observe and monitor.

Modern application can have a complicated distributed architecture that combines cloud native and microservices layers. Each layer produces telemetry signals that may have different structure and information.

Using Observability telemetry schema we can organize, correlate and investigate system behavior in a standard and well-defined manner.

Observability telemetry schema defines the following components - logs, traces, metrics and alerts.

Logs provide comprehensive system details, such as a fault and the specific time when the fault occurred. By analyzing the logs, one can troubleshoot code and identify where and why the error occurred.

Traces represent the entire journey of a request or action as it moves through all the layers of a distributed system. Traces allow you to profile and observe systems, especially containerized applications, serverless architectures, or microservices architecture.

Metrics provide a numerical representation of data that can be used to determine a service or component’s overall behaviour over time.

In many occasions, correlate between the logs, traces and metrics is mandatory to be able to monitor and understand how the system is behaving. In addition, the distributed nature of the application produces multiple formats of telemetry signals arriving from different components ( network router, web server, database)

For such correlation to be possible the industry has formulated several protocols ([OTEL](https://github.com/open-telemetry), [ECS](https://github.com/elastic/ecs), [OpenMetrics](https://github.com/OpenObservability/OpenMetrics), [Alerts]()) for communicating these signals - the Observability schemas.

---
## Schema Aware Components

The role of the Observability plugin is intended to allow maximum flexibility and not imposing a strict Index structure of the data source. Nevertheless, the modern nature of distributed application and the vast amount of telemetry producers is changing this perception.

Today most of the Observability solutions (splunk, datadog, dynatrace) recommend using a consolidated schema to represent the entire variance of log/trace/metrics producers.

This allows monitoring, incidents investigation and corrections process to become simpler, maintainable and reproducible.

A Schema-Aware visualization component is a component which assumes the existence of specific index/indices name patterns and expects these indices to have a specific structure - a schema.

As an example we can see that Trace-Analytics is schema-aware since it directly assumes the traces & serviceMap indices exist and expects them to follow a specific schema.

This definition doesn’t change the existing status of visualization components which are not “Schema Aware” but it only regulates which Visual components would benefit using a schema and which will be agnostic of its content.

Operation Panel for example, are not “schema aware” since they don’t assume in advanced the existence of a specific index nor do they expect the index they display to have a specific structure.

Schema aware visualizations such as Applications, Metrics, Alerts and Integrations will not be able to work directly with a non-standard proprietary index unless being explicitly mapped during the query execution (this capability is planned to be supported in the future).

## Data Model

Simple Schema for Observability needs to allow ingestion of both (OTEL/ECS) formats and internally consolidate them to best of its capabilities for presenting a unified Observability platform.

The data model is highly coupled with the visual components, for example - the Application visual component & Trace analytics are directly coupled with all the Observability schemas (Logs, Traces, Spans).

## Observability index naming

The Observability indices would follow the recommended immutable data stream ingestion pattern using the [data_stream concepts](https://opensearch.org/docs/latest/opensearch/data-streams/)

Index pattern will follow the next naming structure `{type}`-`{dataset}`-`{namespace}`

 - **type**	- indicated	the observability high level types "logs", "metrics", "traces", "alerts"
 - **dataset**	- The field can contain anything that classify the source of the data - such as `nginx.access` (If none specified "**default** " will be used).
 - **namespace**	- A user defined namespace. Mainly useful to allow grouping of data such as production grade, geography classification

This strategy allows the two degrees of naming freedom: dataset and namespace. For example a customer may want to route the nginx logs from two geographical areas into two different indices:

 - `logs-nginx-us`
 - `logs-nginx-eu`

This type of distinction also allows for creation of crosscutting queries by setting the next index query pattern `logs-nginx-*` or by using a geographic based crosscutting query `logs-*-eu`.

## Data index routing
The [ingestion component](https://github.com/opensearch-project/data-prepper) which is responsible for ingesting the Observability signals should route the data into the relevant indices. The {type}-{dataset}-{namespace} combination dictates the target index.

For example if within the ingested log contains the following section:
```json
{
  ...
  "attributes": {
    "data_stream": {
      "type": "span",
      "dataset": "mysql",
      "namespace": "prod"
    }
  }
}
```
This indicates that the target index for this observability signal should be `traces`-`mysql`-`prod` index that follows uses the traces schema mapping.

If the `data_stream` information if not present inside the signal, the default index should be used.

## Observability Index templates
With the expectation of multiple Observability data providers and the need to consolidate all to a single common schema - the Observability plugin will take the following responsibilities :

 - Define and create all the signals index templates upon loading
 - Create default data_stream for each signal type upon explicit request 
   - this is not done eagerly since the customer may want to change some template index settings before generating the default indices 
 - Publish a versioned schema file (Json Schema) for each signal type for general validation usage by any 3rd party

### Note
It is important to mention here that thess new capabilities would not change or prevent existing customer usage of the system and continue to allow proprietary usage.

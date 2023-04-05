# Simple Schema Support
In light of increased complexity of modern infrastructure and the need for better monitoring everywhere in the stack, the requirement for collective and a coherent monitoring solution is profound. We have a normalized schema from most popular schema systems which is also accompanied by a SDK and a multi-language codegen tool powered by graphQL

* Understanding a complex systems
* Advanced planning of infrastructure & application capacities.
* Fast problem resolving solutions
* Clear and insightful incident reviews
* Reliability in both uptime and performance

## Key components for such a system

### Transparency

An observability platform requires a comprehensive and high-level view of application performance. it need to be able to drill down into specific minute details with a full context and also providing a consistent and transparent path for moving between high-level and lower-level views.

### Multi disciplinary

Modern software architecture is comprised of dozens of moving parts from browsers and mobile devices going through  cloud components and lambda functions until the database and data lake. All these need to be viewed, understood and analyzed as a complete system.

### Domain Specific

Customers are interested in determining their own specific KPI’s as quickly and accurately as possible.
Customer will focuses on measuring application performance and on surfacing application-performance blockings and escalations.

### Schema To the Rescue

When considering the Sheer amount of log format and types - starting from the linux systemd logs to the cloudwatch, from the application proprietary logging to the RDBMS logs - everything is relevant and everything is important.
Missing something may disrupt the understanding of the system and deny the ability to analyze its weaknesses.

Many log reporters and log formats where created during the many years the infrastructure we are using today exists - their structure is different and their semantic nature is not aligned with the contemporary jargon.

The former statement is true many times even in relatively modern software components; for example event for network logs arriving from a network firewall or a domain controller may have different names and semantics for the same underlying concepts.

### Normalization
In a similar manner of which the relational database is normalizing data structure we also have to normalize the logs data  so that similar semantic concepts will appear the same no matter their origin.

### Mapping & Patterns

Using matching patterns and semantic concepts evolved in the open source community
- open telemetry
- elastic common schema
- cloud events
- open metrics

We will demonstrate the power of the normalization of the logs and events arriving from any source to create a common understanding of the world. We will explore the way we can utilize these schemas to investigate and correlate observations  into knowledge and understanding.

## Schema support for Observability

Simple schema for Observability is defined by the three main structured types OpenTelemetry & ECS define and supports which are **Logs, Traces, Metric**.
OpenSearch's Observability Plugin will support these schema structures out of the box in the form of a default index pattern per type (will be detailed below).

**Supplement schema**
Any additional index that can be added by customer or a 3rd party integration component will be categorized as supplement index. Supplement indices often present enriched Observability information that has a schema.
These supplement indices may be used by “**Schema-Aware**” visualization component or queries.

## Schema Aware Components
The role of the Observability plugin is intended to allow maximum flexibility and not imposing a strict Index structure of the data source. Nevertheless, the modern nature of distributed application and the vast amount of telemetry producers is changing this perception.

Today most of the Observability solutions (splunk, datadog, dynatrace) recommend using a consolidated schema to represent the entire variance of log/trace/metrics producers.

This allows monitoring, incidents investigation and corrections process to become simpler, maintainable and reproducible.


A **Schema-Aware visualization** component is a component which assumes the existence of specific index/indices and expects these indices to have a specific structure - schema.

As an example we can see that Trace-Analytics is schema-aware since it directly assumes the traces & serviceMap indices exist and expects them to follow a specific schema.

This definition doesn’t change the existing status of visualization components which are **not** “Schema Aware” but it only regulates which Visual components would benefit using a schema and which will be agnostic of its content.

**Operation Panel** for example, are not “schema aware” since they don’t assume in advanced the existence of a specific index nor do they expect the index they display to have a specific structure.

**Schema aware visualizations** such as Applications, Metrics, Alerts and Integrations will not be able to work directly with a non-standard proprietary index unless being explicitly mapped during the query execution - this **schema-on-read** feature will be discussed later

## Data Model

Observability data indices themselves have a data model which they support and comply with (Traces, Logs, Metrics & Alerts), this data model is versioned to allow future evolution.

OpenSearch is aware of the existing leading Observability formats (OTEL / ECS) and should help customers use either one of the formats in the Observability Plugin.

Observability needs to allow ingestion of both formats and internally consolidate them to best of its capabilities for presenting a unified Observability platform.

The data model is highly coupled with the visual components, for example - the Application visual component & Trace analytics are directly coupled with all the Observability schemas (Logs, Traces, Spans) and possibly with some Supplement schema (ServiceMap by data-prepper ingestion pipline)

## Ingestion Pipeline

A mandatory part of an Observability solution is its ability to ingest data at scale, currently, OpenSearch Observability support the following out of the box schematized data providers:
- [Data prepper](https://github.com/opensearch-project/data-prepper)
- [Jaeger](https://opensearch.org/docs/latest/observing-your-data/trace/trace-analytics-jaeger)

### **Data Prepper:**

**Indices:**

*- **Traces data**: otel-v1-apm-span-**
**(Data prepper Observability Trace mapping)***

*- **Logs data**:      N/A*

*- **Metrics data**:    N/A*

*- **Alerts**:          N/A*

*- **Supplement**: otel-v1-apm-service-map** ***(Proprietary Index Mapping)***

**Dashboards:**
- *Application* Analytics -
- *Trace analytics*

---

### Jaeger :

**Indices:**

- **Traces data:** jaeger-span*
  ***(jaeger Observability Trace mapping)***
- **  Logs data:** N/A
- **Metrics data:** N/A
  **- Alerts:** N/A
- **Supplement**:     N/A


**Dashboards:**
- *Application* *analytics - **(without services)***
- *Trace analytics -* ***(without services)***
* * *

## Observability Indices

As states above, the Observability Default indices for collecting the main 4 telemetry types are
- logs
- traces
- metrics
- alerts

## Schema driven Dashboards

OpenSearch goal has always been to simplify and allow collaborative capabilities for the Observability plugin.

The new Integration component is responsible for allowing a seamless integration of a new Observability data provider dashboards. This includes the well-structured indices, easy configuration and a common convention for ingesting multiple datasources.

Integration is an encapsulated artifact that contains the following parts (as described above)
- resource metadata
- associated visual components

The next workflow explains how the process of activating a new Integration is happening:

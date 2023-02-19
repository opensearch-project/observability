# Integrations

## Content

_**Highlights**_
- [Introduction](#introduction)
- [Background](#background)
- [Problem definition](#problem-definition)
- [Proposal](#Proposal)
---
**_Design-Details_**

- [Schema support for Observability](#schema-support-for-observability)
- [Schema Aware Components](#schema-aware-components)
- [Data Model](#data-model)
- [Ingestion Pipeline](#ingestion-pipline)
- [Observability Indices](#observability-indices)
- [Observability index naming](#observability-index-naming)
- [Data index routing](#data-index-routing)
- [Schema driven Dashboards](#schema-driven-dashboards)
- [Integrating Component Structure](#integrating-component-structure)
- [Integration usage workflows](#integration-usage-workflows)
- [Integration Development Tes-Harness](#integration-development-test-harness)
- [Appendix: Observability Physical mapping](#observability-physical-mapping)


---
## Introduction
Integration is a new type of logical component that allows high level composition of multiple Dashboards / Applications / Queries and more.
Integrations can be used to bring together all the metrics and logs from the infrastructure and gain insight into the unified system as a whole.

Some products address integrations as consisting of the next parts
- data on-boarding
- data cleaning / parsing / transformation
- dashboard configuration / creation.

This RFC will only address the last part that includes dashboard. Introducing this concept will allow OpenSearch dashboards to be used in a much broader way using pre-canned components (such as display elements and queries).

Dashboard users which are interested on understanding and analyzing their infrastructure components will be able to search for these components in our integration repository and add them to their system.
Such integration can include infrastructure components such as AWS's EKS,ELB, ECS and many more...

Once integrated, bundled dashboards and queries can deliver a higher and dedicated observability and accessibility into the system for better understanding and monitoring.

Integration is **tightly coupled with a schema** that represents the data this Integration is representing, in the Observability use case the schema relates to Traces, Logs, Metrics and Alerts.
Integration for security related dashboards and data would concern with types and relationships that address that domain.

## Background
Observability is the ability to measure a system’s current state based on the data it generates, such as logs, metrics, and traces. Observability relies on telemetry derived from instrumentation that comes from the endpoints and services.

Observability telemetry signals (logs, metrics, traces, alerts) arriving from the system would contain all the necessary information needed to observe and monitor.

Modern application can have a complicated distributed architecture that combines cloud native and microservices layers. Each layer produces telemetry signals that may have different structure and information.

Using Observability telemetry schema we can organize, correlate and investigate system behavior in a standard and well-defined manner.

Observability telemetry schema defines the following components - **logs**, **traces**, **metrics** and **alerts**.

**Logs** provide comprehensive system details, such as a fault and the specific time when the fault occurred. By analyzing the logs, one can troubleshoot code and identify where and why the error occurred.

**Traces** represent the entire journey of a request or action as it moves through all the layers of a distributed system. Traces allow you to profile and observe systems, especially containerized applications, serverless architectures, or microservices architecture.

**Metrics** provide a numerical representation of data that can be used to determine a service or component’s overall behaviour over time.

In many occasions, correlate between the logs, traces and metrics is mandatory to be able to monitor and understand how the system is behaving. In addition, the distributed nature of the application produces multiple formats of telemetry signals arriving from different components ( network router, web server, database)

For such correlation to be possible the industry has formulated several protocols  ([OTEL](https://github.com/open-telemetry), [ECS](https://github.com/elastic/ecs), [OpenMetrics](https://github.com/OpenObservability/OpenMetrics), [Alerts](https://github.com/MicrosoftDocs/azure-docs/blob/main/articles/azure-monitor/alerts/alerts-common-schema.md)) for communicating these signals - the **Observability schemas**.

## Problem definition
Today in OpenSearch, Observability and its dashboards are only partially aware (traces only) of the schematic structure of these signal types. In addition, the actual schema mapping is not present internally in the Observability plugin and has to be imported externally.

Integrating different data producers and correlating different signals is practically unavailable most of the time due to missing schema definition and correlated field names and has to be done manually by every customer in every system.

Integration of a new Observability data source (such as NGINX / Tomcat) includes complicated configuration of both the ingestion process and the actual index store, manually discovery of the specific format of the new datasource and the crafting of the dedicated dashboards for its proprietary fields.

## Proposal
Our goal is creating a consolidated Observability solution. It will allows customers to ingest any type of supported telemetry data from many types of providers and be able to display and analyze the data in a common and unified way.

Customers using Observability are expecting our solution to allow simple and out of the box integration and configuration.

Using a unified schema that models all the Observability components and allowing customers to add integrations would simplify the daily monitoring and incidents investigations process (by using pre-canned dashboards and pre-defined correlation and alerts).

As an example for the importance of a common schema :

In a multi-layered application which produces multiple log and trace signals from different software and Network components - we need to address these signals using a common vocabulary. Such a vocabulary would simplify correlating information using common fields such as “`process.args`”, “`host.domain`”, “`observer.os`”

---

#### Communication channels
Integration installation process has 3 communication channels :
- Configuration channel to the Observability object store / Kibana index
- Data channel to the PPL Plugin and eventually accessing the default Observability indices and Observability supplements indices.
- Repo channel from which the integration is discovered, loaded and updated.

## Schema support for Observability

Simple schema for Observability is defined by the 4 main structured types OpenTelemetry & ECS define and supports which are **Logs, Traces, Metric, alerts**.
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
- Data prepper - https://github.com/opensearch-project/data-prepper
- Jaeger   - https://opensearch.org/docs/latest/observing-your-data/trace/trace-analytics-jaeger/

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

## Observability index naming

Observability will allow ingestion of both leading Observability formats (OTEL, ECS) and internally consolidate to the best of our capabilities for presenting a unified Observability platform.

The Observability indices would follow the recommended immutable data stream ingestion pattern using the *[data_stream](https://opensearch.org/docs/latest/opensearch/data-streams/)* concepts

The Observability index pattern will follow the next naming structure **{type}-{dataset}-{namespace}**

| data_stream.type	   |keyword	| Allowed values include "logs", "metrics", "traces", "alerts"	                                                                               |	|
|--------------------------|---	|---------------------------------------------------------------------------------------------------------------------------------------------|---	|
| data_stream.dataset	  |keyword	| The field can contain anything that signify the source of the data as examples i`nginx.access`.If none specified "default " will be used. 	 |	|
| data_stream.namespace	 |keyword	| A user defined namespace. Mainly useful to allow grouping of data such as production grade, geography classification .	                     |	|

**Logs Schema**

Default Generated index pattern name: **logs-default-namespace**
see - https://github.com/opensearch-project/observability/pull/1403

**Traces Schema**

Default Generated index pattern name:  **traces-default-namespace**
see - https://github.com/opensearch-project/observability/pull/1395

**Metrics Schema**

Default Generated index pattern name:  ***metrics-default-namespace**
see - https://github.com/opensearch-project/observability/pull/1397

**Alerts Schema**

Default Generated index pattern name:  **alerts-default-namespace**

## Data index routing

The ingestion pipline can route ingested Observability data (log/trace/metrics...) into a specific named index that is the source of its supporting dashboards. The  **{type}-{dataset}-{namespace}** combination dictates the target index.

For example if within the ingested log contains the following section:

```
  {
   "attributes": {
      "data_stream": {
        "type": "span",
        "dataset": "mysql"
        "namespace":"prod"
      },
```

This indicates that the target index for this observability signal should be `traces-mysql-prod` index that follows the traces schema.

### Integration index routing

Similar to the concept of index routing by the ingestion pipline, an Integration can also declare its expected ingestion target index - for example
```
...
    "logs": [{
            "info": "access logs",
            "labels" :["nginx","access"],            
            "input_type":"logfile",
            "dataset":"nginx.access",
            "namespace":"user_domain",
            "schema": "./schema/logs/access.json"
        },
...
```

It indicates that the target index for this Integration is **logs-nginx.access-user_domain** - this part is declerative and helps the process of installation to pre-define the needed indices according to the requested patterns.

If the Integration wants this specific log to be routed to the default Observability logs index -  ***logs-default-namespace ** it should remove the “dataset” & "namespace" parts:

```
...
    "logs": [{
            "info": "access logs",
            "labels" :["nginx","access"],
            "input_type":"logfile",
            "schema": "./schema/logs/access.json"
        },
...
```

**Note** - data can always be routed into a specific index depending on the information under the `attributes.data_stream`.

* * *

## Schema driven Dashboards

OpenSearch goal has always been to simplify and allow collaborative capabilities for the Observability plugin.

The new Integration component is responsible for allowing a seamless integration of a new Observability data provider dashboards. This includes the well-structured indices, easy configuration and a common convention for ingesting multiple datasources.

Integration is an encapsulated artifact that contains the following parts (as described above)
- resource metadata
- associated visual components

The next workflow explains how the process of activating a new Integration is happening:

## Integrating Component Structure

The following section details the structure and composition of an integration component and how it may be utilized for the Observability use-cases.

#### Structure
As mentioned above, integration is a collection of elements that formulate how to observe a specific data emitting resource - in our case a telemetry data producer.

A typical Observability Integration consists of the following parts:

***Metadata***

    * Observability data producer resource
    * Supplement Indices (mapping & naming)
    * Collection Agent Version
    * Transformation schema 
    * Optional test harnesses repository
    * Verified version and documentation 
    * Category & classification (logs/traces/alerts/metrics)

***Display components***

    * Dashboards 
    * Maps
    * Applications
    * Notebooks
    * Operations Panels
    * Saved PPL/SQL/DQL Queries
    * Alerts

A major factor in the following RFC is that structured data has an enormous contribution to the understanding of the system behaviour.
Once input content has form and shape - it can and will be used to calculate and correlate different pieces of data.

The next parts of this document will present **Integrations For Observability** which has a key concept of Observability schema.

It will overview the concepts of observability, will describe the current issues customers are facing with observability and continue to elaborate on how to mitigate them using Integrations and structured schemas.

## Integration usage workflows

The following workflows describes the end-to-end flows from the ingestion step to the discovery and analysis phase including the building and preparation of an Integration and publishing it with the community .

1) **Creating An Integration.**
2) **Testing/Validating An Integration.**
3) **Publishing An Integration.**
4) **Loading An Integration Into Observability.**
* * *

### 1) Creating An Integration

Integrations are an encapsulated collection of elements and a such have a specific structure.

#### NginX

Lets examine the next NginX integration component:
```yaml

nginX
    config.json
    display`
        ApplicationA.json
        Maps.json
        DashboardB.json
    queries
      QueryA.json
    schemas
      transformation.json
    samples
      nginx.access logs
      nginx.error logs
      nginx.stats metrics
      expected transformation results
    metadata
      ...
    info  
      documentation
```

**Definitions**

- `config.json`  defines the general configuration for the entire integration component.
- `display`   this is the folder in which the actual visualization components are stored
- `queries`   this is the folder in which the actual PPL queries are stored
- `schemas`     this is the folder in which the schemas are stored - schema for mapping translations or index mapping.
- `samples`     this folder contains sample logs and translated logs are present
- `metadata` this folder contains additional metadata definitions such as security and policies
- `info`           this folder contains documentations, licences and external references


`Config.json` file includes the following Integration configuration

```
{
  "name": "nginx",
  "version": {
        "integ": "0.1.0",
        "schema": "1.0.0",
        "resource": "^1.23.0",
   }
  "description": "Nginx HTTP server collector",
  "identification": "instrumentationScope.attributes.identification",
  "categories": [
    "web",
  ],
  "collection":[
    {
       "logs": [{
                    "info": "access logs",
                    "input_type":"logfile",
                    "dataset":"nginx.access",
                    "labels" :["`nginx"``,``"access"``],`
                    "schema": "./schema/logs/access.json"
                },
                {
                    "info": "error logs",
                    "input_type":"logfile",
                    "labels" :["nginx","error"],
                    "dataset":"nginx.error",
                    "schema": "./schema/logs/error.json"
                }]
    },
    {
        "metrics": [{
                    "info": "`status metrics`",
                    "input_type":"`metrics`",
                    "dataset":"nginx.status",
                    "labels" :["nginx","status"],
                    "schema": "./schema/metrics/status.json"
                }]
    }
  ],
  "repo": {
    "github": ".../"
  }
}
```

**Definitions:**

```
  "version": {
        "integ": "0.1.0",
        "schema": "1.0.0",
        "resource": "^1.23.0",
   }
```


_*`version:`*_
This references the next semantic versioning:
- `integ` version indicates the version for this specific Integration
- `schema` version indicates the Observability schema version
- `resource ` version indicates the actual resource version which is being integrated.

_*`identification:`*_
This references the field this integration is using to explicitly identify the resource the signal is generated from

In this case the field resides in the `instrumentationScope.attributes.identification`  path and should have a value that corresponds to the name of the integration.


```
"identification": "instrumentationScope.attributes.identification",
```


`Categories:`
This section defines the classification categories associated to this Integration according to ECS specification (https://www.elastic.co/guide/en/ecs/current/ecs-allowed-values-event-category.html)

`collection:`
This references the different types of collection this integration if offering.  It can be one of the following
{ *`Traces, Logs, Metrics, Alerts, Supplements`* }.


**Collections**

Let's dive into a specific log collection:

```
       "logs": [{
                    "info": "access logs",
                    "input_type":"logfile",
                    "dataset":"nginx.access",
                    "labels" :["`nginx"``,``"access"``],`
                    "schema": "./schema/logs/access.json"
                },
```

This log collects nginx access logs as described in the `info` section.
The `input_type` is a categorical classification of the log kind which is specified in the ECS specification as well.

- `dataset`  is defined above and indicates the target routing index.
- `lables  `are general purpose labeling tags that allow further correlation and associations.
- `schema`  is the location of the mapping configuration between the original log format to the Observability Log format.
* * *

#### Display:

Visualization contains the relevant visual components associated with this integration.

The visual display component will need to be validated to the schema that it is expected to work on - this may be part of the Integration validation flow...

#### Queries

Queries contains specific PPL queries that precisely demonstrates some common and useful use-case .

*Example:*

*-- The visual display component will need to be validated to the schema that it is expected to work on*

```
source = logs-*-prod | ... where ...
```

***Future Enhancements** *

In the future, an Integration would be able to supplement the Observability main SSO schemas with some proprietary schemas - such as the serviceMap which is currently defined and maintained by data-prepper.

The `schema, index, label `& `input_type` will define the explicit way that the data is ingested, which schema is backing its visualizations and the tagging information its labeled with.

```
       "supplements": [{
                    "info": "service map",
                    "labels" :["services","calculated"],                    
                    "input_type": "services",
                    "schema": "./schema/supplements/servicesMapping.json",
                    "index":  "otel-v1-dp-service-map"   
                }]
                
```

* * *

### 2) Testing / Validating An Integration.

After the Integration was developed, it has to be tested and validated prior of publication to a shared repo.
Validation of an Integration is expected to be a build-time phase. It also expects that it will verify that the following

- **Structure Validation**:

* make sure the `config.json` is complete and contains all the mandatory parts.
* make sure all the versions correctly reflect the schema files

- **Schema Validation**:

* make sure all the input_types defined in the `collections` elements have a compatible transformation schema and this schema complies with the SSO versioned schema.
* make sure all the transformation’s conform to the SSO versioned schema.


- **Display Validation**:  make sure all the display components have a valid json structure and if the explicitly reference fields - these fields must be aligned with the SSO schema type (Trace/Metrics/Logs...)

- **Query** **Validation**:  make sure all the queries have a valid PPL structure and if the explicitly reference fields - these fields must be aligned with the SSO schema type (Trace/Metrics/Logs...)

***_End to End_***
- **Sample Validation:**

* make sure the sample outcome of the transformation is compatible with the SSO schema
* make sure the outcome result shares all the transformable information from the input source sample

All these validations would use a dedicated validation & testing library supplied by SimpleSchema plugin.
* * *

### 3) Publishing An Integration.

Once an integration is created and tested, it should be signed and uploaded into a shared public dedicated repository   [The location / owners of this repository should be discussed ] is should be discussed .
Each published Integration artifact will be mandatory to attache the following (which would be validated during the upload:

**Metadata**
- Owner
- License
- Repository
- Documentation
- Versions
- All relevant versions the testing phase was created with

**Samples**
- Sample relevant signals data for the integration to be used as exemplar
- *OPTIONAL*: docker compose file including
- The agent generating data / mock data generator
- The Integration artifact part for translating the original format
- OpenSearch Observability relevant version to write the data into


#### **Open Search Integration Verification Review Process**

Once an integration is published, it goes into an OpenSearch Integration review process.
Once an integration is reviewed and validated - it will be published in OpenSearch’s recommendation Integrations and will be able to be assembled in the complete Observability Solution.

Verification process includes running the docker sample and verifying all the display components are functioning as expected.

***In the future*** OpenSearch can automate this process by requiring a dedicated API or baseline queries and functionality to work on the Integration thus automating this validation phase completely.

An investigation can also be published to the public repository without the review process. Integrations not passing this process would not be bundled in the Observability release or be lined and recommended by OpenSearch. Nevertheless they can still be manually Installed in an Observability cluster and the Installing party is responsible for making sure they will operate properly .

* * *

### 4) Using Integrations inside Observability.

This phase describes the use case for a customer using Observability, it describes how such customer loads different Integrations so that it may be used to easily visualize and analyze existing data using pre-canned dashboards and visualizations.

In the former part (Publishing An Integration) we defined the **Open Search Integration Verification Review Process.**

The integrations passing this process can be available out of the box once the Observability plugin is loaded. This availability means that these Integrations can be packages together and assembled with the Observability solution.

Once an Observability is distributed, it is pre-bundled with the verified Integrations. These integrations are packaged in a dedicated folder.

**Integration Lifecycle**

```
                <-  Loading ->          
                |                  |
                |           <- Maintenance  
       Ready2Ingest ->
                                      <-  Ready2Read ->
                                      |                 |
                                Ingesting    ->   <-     Stale
      
```

Observability bootstrap initiates the state for all the Integrations bundled with the distribution, the initial state is

***Loading*** - indicating the integration is still loading and has not yet been verified for runtime readiness.

- Loading an integration may also allow the user to configure some parts of the Integration so that he could load multiple instances of the same integration template - for example for a service provider with different customers having a similar resource.
- Configure index pattern / name
- Configure datasource (domain) name (shared by the dashboards, queries, visualizations, alerts)
- Configure security policies

***Maintenance***

indicating some components weren’t loaded / created as required and the appropriate info will be detailed on the missing parts:


*- Index may not exist*
*- Dashboard could failed importing (name collision)*
*- Configuration is broken for some component and needs mending*
Once the issues are corrected it will transform to the ***Ready2Ingest** *stage

→ ***Ready2Ingest*** - indicating the integration was loaded and verified all the needed  indices / dashboards are ready - but no data was found matching the expected classification filters.

→ ***Ready2Read*** - indicating the integration is populating the indices and data can be visualized and queried.

The system would differentiate from the ***Ready2Ingest*** and ***Ready2Read*** phases using specific queries designed to classify the specific resource data existing in the target index.


_**Future Enhancements**_

We will be able to add the next phases to the Integration lifecycle - this sub-state can be configured using expected default behaviour and policies.

-  **Ingesting** - meaning the specific resource is continuing to ingest data
-  **Stale** - meaning the specific resource has stopped ingesting data

* * *

## Integration Development Test-Harness

In order to simplify and automate the process of validating an Integration compliant to OpenSearch Observability - we suggest the next Testing harness. Test harness is essentially an End to End standard that requires the developer to setup and provide the next components:

- Docker compose with the following :

    * Component (Agent / Exporter) responsible of transforming the source format to the Observability SSO format.
    * Pipeline that will be used to push Observability signals into OpenSearch Index
    * OpenSearch with Observability plugin
    * Ready made sample from the original signals that will be used by the transformation component to produce the Observability documents.
    * Assembly of Integration components (Dashboards, queries, Visualizations) that will be loaded into the Observability Plugin.

The test flow will have the following steps:

**Initiating the Integration Pipline**
-  Spin-up the docker compose elements.
-  Init the Observability including creation of the Ingestion index and loading of the Integration components
-  Start the ingestion pipeline which will take the sample original signals, transform them to Observability and submit to OpenSearch Observability Index.

Next step would be to run a series of **baseline queries** that should be part of the verification to prove correctness, the queries must match the existing sample data including time and measurements .

**Result** of these queries (including UX driven queries) are also compared with the expected results and verified for correctness .

This completes the test verification process and verifies the Integration is compliant with the Observability schema and visual components .

* * *

## Appendix:

### Observability Physical mapping

As part of the Observability Integration, Observability will publish a schema that is conformed by & data-prepare & fluent-d plugins / libraries .

Additional information attached:

* **Traces**
    * https://github.com/opensearch-project/data-prepper/tree/main/data-prepper-plugins/otel-trace-source
    * https://github.com/open-telemetry/opentelemetry-proto/blob/v0.9.0/opentelemetry/proto/trace/v1/trace.proto
    * https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/trace/semantic_conventions
    * https://github.com/open-telemetry/opentelemetry-java/tree/0a9794ad415c87c162f518a9112a9b7849564bee/sdk/trace
    * https://github.com/opensearch-project/observability/pull/1395
* **Metrics**
    * https://github.com/opensearch-project/data-prepper/tree/main/data-prepper-plugins/otel-metrics-source
    * https://github.com/open-telemetry/opentelemetry-proto/blob/v0.9.0/opentelemetry/proto/metrics/v1/metrics.proto
    * https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/metrics/semantic_conventions
    * https://github.com/open-telemetry/opentelemetry-java/tree/0a9794ad415c87c162f518a9112a9b7849564bee/sdk/metrics/src/main/java/io/opentelemetry/sdk/metrics
    * https://github.com/opensearch-project/observability/pull/1397
* **Logs**
    * based on OTEL / ECS logs formats  [OTEL](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/logs/data-model.md) /  [ECS](https://github.com/elastic/ecs/blob/main/generated/ecs/ecs_nested.yml)
    * https://github.com/open-telemetry/opentelemetry-proto/blob/v0.9.0/opentelemetry/proto/logs/v1/logs.proto
    * https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/logs/semantic_conventions
    * https://github.com/open-telemetry/opentelemetry-java/tree/0a9794ad415c87c162f518a9112a9b7849564bee/sdk/logs
    * https://github.com/opensearch-project/observability/pull/1403

>Logs Mapping will contain the union of both OTEL & ECS formats where once a log has arrived it can either comply to the OTEL generic log format or the ECS specific format.

> *In the future we will supply a smart inference mechanism to extract specific logs from the generic OTEL format where the actual data resides on the **attributes** key/value field.*


* * *


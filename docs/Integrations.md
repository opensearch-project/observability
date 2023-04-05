# Integrations

## Content

_**Highlights**_
- [Introduction](#introduction)
- [Background](#background)
- [Problem definition](#problem-definition)
- [Proposal](#Proposal)
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

A major factor in this project is that structured data has an enormous contribution to the understanding of the system behaviour.
Once input content has form and shape - it will be used to calculate and correlate different pieces of data.

The next parts of this document will present **Integrations For Observability** which has a key concept of Observability schema.

It will overview the concepts of observability, will describe the current issues customers are facing with observability and continue to elaborate on how to mitigate them using Integrations and structured schemas.

## Integration usage workflows

The following workflows describes the end-to-end flows from the ingestion step to the discovery and analysis phase including the building and preparation of an Integration and publishing it with the community .

1) **Creating An Integration.**
2) **Testing/Validating An Integration.**
3) **Publishing An Integration.**
4) **Loading An Integration Into Observability.**

These flows will be described in the following documentation in this folder.

* * *

## References:

### Observability Physical mapping

As part of the Observability Integration, Observability will publish a schema that is conformed by & data-prepare & fluent-d plugins / libraries .

Additional information attached:

[Nginx module for Fluent-bit ECS](https://gist.github.com/agup006/7848e339f111cdaafdd0f3fdf7ee2d32)

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


* * *


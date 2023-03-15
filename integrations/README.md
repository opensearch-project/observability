# Definitions

## Bundle

An OpenSearch Integration Bundle may contain the following:
 - dashboards
 - visualisations
 - configurations 
These bundle assets are designed to assist monitor of logs and metrics for a particular resource (device, network element, service ) or group of related resources, such as “Nginx”, or “System”.

---

The Bundle consists of:

* Version 
* Metadata configuration file 
* Dashboards and visualisations and Notebooks
* Data stream index templates used for the signal's ingestion
* Documentation & information


## Integration

An integration is a type of _bundle_ defining data-streams for ingetion of a resource observed signals using logs, metrics, and traces.

### Structure
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

Since the structured data has an enormous contribution to the understanding of the system behaviour - each resource will define a well-structured mapping it conforms with.

Once input content has form and shape - it can and will be used to calculate and correlate different pieces of data.

The next parts of this document will present **Integrations For Observability** which has a key concept of Observability schema.

It will overview the concepts of observability, will describe the current issues customers are facing with observability and continue to elaborate on how to mitigate them using Integrations and structured schemas.

---

###  Creating An Integration

```yaml

reousce-name
    config.json
    display`
        Application.json
        Maps.json
        Dashboard.json
    queries
      Query.json
    schemas
      transformation.json
    samples
      resource.access logs
      resource.error logs
      resource.stats metrics
      expected_results
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

---

#### Config

`Config.json` file includes the following Integration configuration see [NginX config](nginx/config.json)
 
 Additional information on the config structure see [Structure](docs/Integration-structure.md)  

#### Display:

Visualization contains the relevant visual components associated with this integration.

The visual display component will need to be validated to the schema that it is expected to work on - this may be part of the Integration validation flow...

#### Queries

Queries contains specific PPL queries that precisely demonstrates some common and useful use-case .

*Example:*

*-- The visual display component will need to be validated to the schema that it is expected to work on*

```
source = ss4o_logs-default-prod | ... where ...
```

---

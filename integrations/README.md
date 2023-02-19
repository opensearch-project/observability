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
    "github": "https://github.com/opensearch-project/observability/tree/main/integrarions/nginx"
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
This section defines the classification categories associated to this Integration according to [ECS specification](https://www.elastic.co/guide/en/ecs/current/ecs-allowed-values-event-category.html)

`collection:`
This references the different types of collection this integration if offering.  It can be one of the following
{ *`Traces, Logs, Metrics`* }.


**Collections**

Let's review a specific log collection:

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
source = sso_logs-default-prod | ... where ...
```

---

# Integration structure

Integrations are an encapsulated collection of assets and a such have a specific structure.
This document presents Integration's structure and convention and shares an example for an NginX resource integration

**_Metadata_**

  * Integration (data producer) resource
  * Indices (mapping & naming)
  * Transformation mapping schema
  * Optional test harnesses repository
  * Verified version and documentation
  * Catalog, Category & classification (e.g Observability, logs/traces/alerts/metrics, http)

**_Display components_**

  * Dashboards
  * Maps
  * Applications
  * Notebooks
  * Operations Panels
  * Saved Queries:  [PPL](https://opensearch.org/docs/2.4/search-plugins/sql/ppl/index/)/[SQL](https://opensearch.org/docs/2.4/search-plugins/sql/sql/index/)/[DQL](https://opensearch.org/docs/2.4/dashboards/discover/dql/) 
  * Alerts
  * Additional Assets
  
**_Additional Assets may include_**
  * [Datasource configuration](https://opensearch.org/docs/2.4/dashboards/discover/multi-data-sources/)
  * Materialized View Table Creation
  * S3 schema/table definitions

The notion that structured data has an enormous contribution to the understanding of the system behaviour is the key role dictating the Integration model.
Once input content has form and shape - it will be used to calculate and correlate different pieces of data.

### Config File
This file contains the Observability resource configuration details such as 
 - Observability Produced signal types
 - Observability Produced signal category (if applicable)
 - Description and resource identification

### Display Folder
A folder in which the actual visualization components are stored, containing all dashboard resources including
 - Application
 - Notebook
 - Dashboard
 - Visualizations
 - Maps

### Queries Folder
A folder containing DKL, SQL, PPL queries on the Observability default or custom indices.

### Schema
A folder containing the specific fields which this resource is directly populating.
This folder may also contain the transformations mapping between the original observed signal format and the Observability schema.

### Samples
This folder contains a list of samples signals in the correct schema structure that is to be ingested into Observability indices
Possible original observed signal format signals before they were transformed into the Observability schema.

## Info
This folder contains all the additional information about the resource producing the Observability signals, additional data about the dashboards and visual components
 - documentation describing the resource 
 - screenshots describing the visual parts
 - integration installation process specific details
 - additional dependencies and licensing
 - repository info this integration is originated from
 - metadata info contains additional security and policies definitions


---

### NginX Integration Sample

Let's examine the next NginX integration component:

```yaml
nginX
    config.json
    assets
        display`
            ApplicationA.json
            Maps.json
            DashboardB.json
            Alerts.json
        queries
          QueryA.json
    schemas
      transformation.json
    samples
      nginx.access logs
      nginx.error logs
      nginx.stats metrics
      transformed
          access-logs.json
          error-logs.json
          stats.logs
    info  
      documentation
      metadata
      
```

**Definitions**

- `config.json` defines the general configuration for the entire integration component.
- `display`     this is the folder in which the actual visualization components are stored
- `queries`     this is the folder in which the actual PPL queries are stored
- `schemas`     this is the folder in which the schemas are stored - schema for mapping translations or index mapping.
- `samples`     this folder contains sample logs and translated logs are present
- `info`        this folder contains documentations, licences and external references


`Config.json` file includes the following Integration configuration

```
{
  "template_name": "nginx",
  "version": {
        "integration": "0.1.0",
        "schema": "1.0.0",
        "resource": "^1.23.0",
   }
  "description": "Nginx HTTP server collector",
  "identification": "instrumentationScope.attributes.identification",
  "catalog": "observability",
  "collection":[
    {
      "category": "logs",
      "components": [
        "communication","http"
      ],
      "feeds": [{
        "info": "access logs",
        "input_type":"logfile",
        "dataset":"nginx.access",
        "labels" :["nginx","access"]
      },
        {
          "info": "error logs",
          "input_type":"logfile",
          "labels" :["nginx","error"],
          "dataset":"nginx.error"
        }]
    },
    {
      "category": "metrics",
      "components": [],
      "feeds": [{
        "info": "status metrics",
        "input_type":"metrics",
        "dataset":"nginx.status",
        "labels" :["nginx","status"]
      }]
    }
  ],
  "repository": {
    "github": "https://github.com/opensearch-project/observability/tree/main/integrations/nginx"
  }
}
```

**Definitions:**

```
  "version": {
        "integration": "0.1.0",
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

`Catalog:`
This defines the catalog source from which the Integration is associated with. This is based on the `catalog` API which is part of the integration support.[Sample Observability catalog](schema/system/samples/catalog.json)

`Components:`
This section defines the classification components associated to this Integration according to [ECS specification](https://www.elastic.co/guide/en/ecs/current/ecs-allowed-values-event-category.html) and expresses in the [Sample Observability catalog](schema/system/samples/catalog.json)

`collection:`
This references the different types of collection this integration if offering.  It can be one of the following Observability catalog's element:
{ *`Traces, Logs, Metrics`* }.

The collection **name** (`logs`,`traces`,`metrics`) reflects the catalog's `category` as it appears in the [Sample Observability catalog](schema/system/samples/catalog.json)

**Collections** 

Let's dive into a specific log collection:

```
   "logs": [{
                "info": "access logs",
                "input_type":"logfile",
                "dataset":"nginx.access",
                "labels" :["nginx","access"]
            },
```

This log collects nginx access logs as described in the `info` section.
The `input_type` is a categorical classification of the log kind which is specified in the ECS specification as well.

- `dataset` is defined above and indicates the target routing index, in this example `sso_logs-nginx.access-${namespace}` 
- `lables`  are general purpose labeling tags that allow further correlation and associations.
- `schema`  optional parameter - is the location of the mapping configuration between the original log format to the Observability Log format.
* * *

#### Display:

Visualization contains the relevant visual components associated with this integration.

The visual display component will need to be validated to the schema that it is expected to work on - this may be part of the Integration validation flow...

#### Queries

Queries contains specific PPL queries that precisely demonstrates some common and useful use-case .

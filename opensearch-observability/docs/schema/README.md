# Simple Schema for Open Search

## Background
Simple Schema for OpenSearch brings the concept of organized and structured catalog data.
A catalog of schemas is a comprehensive collection of all the possible data schemas or structures that can be used to represent information.

It provides a standardized way of organizing and describing the structure of data, making it easier to analyze, compare, and share data across different systems and applications.
Structured data refers to any data that is organized in a specific format or schema - for example Observability data or security data...

By using a catalog of schemas, data analysts and scientists can easily identify and understand the different structures of data, allowing them to correlate and analyze information more effectively.
One of the key benefits of a catalog of schemas is that it promotes interoperability between different systems and applications.
By using standardized schema descriptions, data can be shared and exchanged more easily, regardless of the system or application being used.

The use of a catalog of schemas can also improve data quality by ensuring that data is consistent and accurate. This is because the schema provides a clear definition of the data structure and the rules for how data should be entered, validated, and stored.

## OpenSearch Schemas

Opensearch supports out of the box the following schemas
 - [Observability](observability/README.md) 
 - [Security](security/README.md) 
 - [System](system/README.md) 

### Observability
Simple Schema for [Observability](https://github.com/opensearch-project/observability) allows ingestion of both (OTEL/ECS) formats and internally consolidate them to best of its capabilities for presenting a unified Observability platform.

### Security
OpenSearch Security is a [plugin](https://github.com/opensearch-project/security) for OpenSearch that offers encryption, authentication and authorization. When combined with OpenSearch Security-Advanced Modules, it supports authentication via Active Directory, LDAP, Kerberos, JSON web tokens, SAML, OpenID and more. It includes fine grained role-based access control to indices, documents and fields. It also provides multi-tenancy support in OpenSearch Dashboards.

### System
System represents the internal structure of Opensearch's `.dashboard` entities such as `dashboard`, `notebook`, `save-query` `integration`. Every saved object may declare itself in the system
catalog folder and publish a corresponding schema. This capability will allow validation of these objects and also simplify structure evolution using this schema. 

### Catalog Loading
During Integration plugin loading, it will go over all the Opensearch's schema supported catalogs and generate the appropriate templates representing them.
This will allow any future Integration using these catalogs without the need to explicitly defining them thus maintaining a unified common schema.

Each catalog may support semantic versioning so that it may evolve its schema as needed. 
In the future, the catalog will enable to associate domains with catalogs and allow externally importing catalogs into Opensearch for additional collaboration. 

### Catalog Structure
A catalog is structured in the following way:

 - Catalog named folder: `Observability`
   - Categories named folder : `Logs`, `Traces`, `Metrics` 
     - Component named file : `http` , `communication` , `traces` , `metrics` 

Each level encapsulates additional internal structure that allows a greater level of composability and agility.
The details of each catalog structure is described in the [catalog.json](system/samples/catalog.json) file that resides in the root level of each catalog folder.

**Component** 
The component is the leaf level definition of the catalog hierarchy, it details the actual building blocks of the catalog's types and fields.

Each component has two flavours:

 - `$component.mapping` - describes how the type is physically stored in the underlying index
 - `$component.mapping` - describing the actual json schema for this component type

A component may be classified as a `container` which has the ability to group / combine multiple components inside. 

For example, we can examine the [`logs`](../../src/main/resources/schema/observability/logs/logs.mapping) component that has the capacity to combine additional components (such as `http`, `communication` and more)
```json5
  ...
  "composed_of": [
    "http_template",
    "communication_template"
  ],
  ...
```
A component also has a list of `tags` which are aliases for the component name which can be used to reference it directly by an integration components list.

```json5
  ...
    {
      "component": "communication",
      "version": "1.0",
      "url": "https://github.com/opensearch-project/observability/tree/2.x/schema/observability/logs/communication",
      "tags": ["web"],
      "container": false
    }
  ...
```

## Data Correlation

In order to be able to correlate information across different signal (represented in different indices) we introduced the notion of correlation into the schema.
This information is represented explicitly in both the declarative schema file and the physical mapping file 

This information will enable the knowledge to be projected and allow for analytic engine to produce a join query that will take advantage of these relationships.
The correlation metadata info is exported in the following way:

### Observability Correlation Example:

### Schema related
In JSON Schema, there is no built-in way to represent relationships directly between multiple schemas, like you would find in a relational database. However, you can establish relationships indirectly by using a combination of `$id`, `$ref`, and consistent property naming across your schemas.
For example the [`logs.schema`](../../src/main/resources/schema/observability/logs/logs.schema) file contains the next `$ref` references for the `traceId` & `spanId` fields that belong to the `traces.schema`.

```json5
  ...
    "traceId": {
      "$ref": "https://opensearch.org/schemas/observability/Span#/properties/traceId"
    },
    "spanId": {
      "$ref": "https://opensearch.org/schemas/observability/Span#/properties/spanId"
    },
  ...
```

We can observe that the `traceId` field is defined by referencing to the [Span](../../src/main/resources/schema/observability/traces/traceGroups.schema) schema and explicitly to the `#/properties/spanId` field reference location.

### Mapping related
Each mapping template will contain the foreign schemas that are referenced to in that specific mapping file. For example the [`logs.mapping`](../../src/main/resources/schema/observability/logs/logs.schema) file will contain the next correlation object in the mapping `_meta` section:

```json5
      "_meta": {
        "description": "Simple Schema For Observability",
        "catalog": "observability",
        "type": "logs",
        "correlations": [
          {
            "field": "spanId",
            "foreign-schema": "traces",
            "foreign-field": "spanId"
          },
          {
           "field": "traceId",
            "foreign-schema": "traces",
            "foreign-field": "traceId"
           }
          ]
        }

```

Each `correlations` field contains the F.K field name - `spanId` , the referenced schema - `traces` and the source field name in that schema `spanId`

This information can be used to generate the correct join queries on a contextual basis. 

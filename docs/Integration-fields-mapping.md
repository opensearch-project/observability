# Highlights
During the Add-Integration flow - add the ability to map custom index proprietary fields to simple schema standards fields

## Introduction
Integrations by definition are coupled to a catalog - each input stream of data delivers a well structured event.
In the Observability case - these signals are `trace`,`logs` and `metrics`.

The purpose of having this well structured events is to unify and correlate the information arriving from the system in a similar manner across all customers and user domains.

For example, an integration with dashboard asset is coupled for the specific fields it uses to visualize and display information from the data-stream.
This information is assumed to be in the specific structure dictated by the catalog.

`Observability` : Catalog
`Log` : Category
- `http`: Component
    - `url` : URL field
    - `client.ip` : client's IP field
    - `request.body.content`: request body content field

These fields must exist and match type in the physical index representing the data-stream.

## Problem
Some users may already have existing indices that function as data source for these specific displays. The index mapping used by these indices may have different names that represent a similar meaning.

We would like that the dashboards would work "out of the box" with minimal configuration from the user.
On the other hand customers will not accept changes to the index (reindexing) as part of the Integration installation.

## Proposed solution
[Field Alias](https://opensearch.org/docs/2.4/opensearch/supported-field-types/alias/) is a solution for connecting similar purpose fields that have different names.

This capability allows for queries and dashboards to work seamlessly without any changes to the data or index information.

## Few basic constraints:

- The original field must be created before the alias is created.
- The original field cannot be an object or another alias.

For example, the field `request_url` can be connected to the `http.url` field with the next command:
```
PUT ss4o_logs-nginx-demo/_mapping
{
  "properties": {
    "http.url": {
      "type": "alias",
      "path": "request_url"
    }
  }
}
```
This will allow queries / dashboards using the `http.url` field to execute correctly ...

We can also validate if an alias exists using the `field_caps` API
```
GET ss4o_logs-nginx-demo/_field_caps?fields=http.url
```

Returning:
```
{
  "indices": [
    "ss4o_logs-nginx-demo"
  ],
  "fields": {
    "http.url": {
      "text": {
        "type": "text",
        "searchable": true,
        "aggregatable": false
      }
    }
  }
}
```
---

## User Workflow
Once an integration template is selected for instantiation, the user can select the advanced configuration option.
This option allows the user to select an existing index for the data-stream. Once the user has selected the index - he will be shown a double table for the mapping purpose .

He can select the original field and the schema destination field- so that the aliasing flow would be performed.

![fields-mapping](https://user-images.githubusercontent.com/48943349/225185385-a4009c65-533e-4890-a623-6ce7e12f9cc0.png)

Once the user maps his own fields into the schema standard fields - he will continue the integration instance loading phase which will now also have to create aliases for all the fields the user has selected.
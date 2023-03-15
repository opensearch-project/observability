# Naming Convention
This document will describe the index naming standard for ingestion of Observability signals - Traces, Metrics, Logs.
Currently there is no single coherent pattern to use for all Observability signals and potential data sources.

For example - `data-prepper` use their own index naming and structure to ingest Observability signals.

`data-prepper Indices:`

- Traces data: `otel-v1-apm-span-**` *(Observability Trace mapping)*
- Supplement: `otel-v1-apm-service-map` *(Proprietary Index Mapping)*

The same goes for jaeger trace data type:
- Traces data: `jaeger-span*` *(Observability Trace mapping)*

This convention is also harder to manage regarding the index revolving for lifecycle management - this would be optimized using the `data_stream` layer supported by OpenSearch API.

Today due to different index structure and non-standard naming patterns we cant create crosscutting queries that will correlate or aggregate information on top of different Observability data providers.

## Proposal

We would use the next structure and naming patterns based on the following conventions :
1) Add `data_stream` support for all Observability based standard indices
2) Use a standard Observability signals naming index conventions
3) Create customer domain naming degree of freedom to allow arbitrary names for specific customer use-cases
4) Move the Observability Indices Template & default index creation into Observability Plugin bootstrap

---
1) Using the `data_stream` will encourage simple physical index management and query - each Observability index would actually be a data_stream:

```
A typical workflow to manage time-series data involves multiple steps, such as creating a rollover index alias, defining a write index, and defining common mappings and settings for the backing indices.

Data streams simplify this process and enforce a setup that best suits time-series data, such as being designed primarily for append-only data and ensuring that each document has a timestamp field.

A data stream is internally composed of multiple backing indices. Search requests are routed to all the backing indices, while indexing requests are routed to the latest write index
```

2) Consolidating data using the `data_stream`  concepts patterns and catalog. The next Observability index pattern will be followed:

Index pattern will follow the next naming structure `{type}`-`{dataset}`-`{namespace}`

- **type**	- indicated	the observability high level types "logs", "metrics", "traces" (prefixed by the `ss4o_` schema convention )
- **dataset**	- The field can contain anything that classify the source of the data - such as `nginx.access` (If none specified "**default** " will be used).
- **namespace**	- A user defined namespace. Mainly useful to allow grouping of data such as production grade, geography classification

3) The ***ss4o_{type}-{dataset}-{namespace}*** Pattern address the capability of differentiation of similar information structure to different indices accordingly to customer strategy.

This strategy will be defined by the two degrees of naming freedom: `dataset` and `namespace`

For example a customer may want to route the nginx logs from two geographical areas into two different indices:
- `ss4o_logs-nginx-us`
- `ss4o_logs-nginx-eu`

This type of distinction also allows for creation of crosscutting queries by setting the next **index query pattern** `ss4o_logs-nginx-*` or by using a geographic based crosscutting query `sso_logs-*-eu`.


## Data index routing
The [ingestion component](https://github.com/opensearch-project/data-prepper) which is responsible for ingesting the Observability signals should route the data into the relevant indices.
The `ss4o_{type}-{dataset}-{namespace}` combination dictates the target index, `{type}` is prefixed with the `sso_` prefix into one of the supported type:

- Traces - `ss4o_traces`
- Metrics - `ss4o_metrics`
- Logs - `ss4o_logs`

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
This indicates that the target index for this observability signal should be `ss4o_traces`-`mysql`-`prod` index that follows uses the traces schema mapping.

If the `data_stream` information if not present inside the signal, the default index should be used.


---

## Observability Index templates
With the expectation of multiple Observability data providers and the need to consolidate all to a single common schema - the Observability plugin will take the following responsibilities :

- Define and create all the signals index templates upon loading
- Create default data_stream for each signal type upon explicit request
    - **_this is not done eagerly since the customer may want to change some template index settings_** before generating the default indices
- Publish a versioned schema file (Json Schema) for each signal type for general validation usage by any 3rd party

### Note
It is important to mention here that these new capabilities would not change or prevent existing customer usage of the system and continue to allow proprietary usage.


### In details
*Logs Schema*
Default Generated index pattern name: *logs-default-namespace*
see - https://github.com/opensearch-project/observability/pull/1403

*Traces Schema*
Default Generated index pattern name:  *traces-default-namespace*
see - https://github.com/opensearch-project/observability/pull/1395

*Metrics Schema*
Default Generated index pattern name:  *metrics-default-namespace*
see - https://github.com/opensearch-project/observability/pull/1397

---

**What alternatives have you considered?**
A clear and concise description of any alternative solutions or features you've considered.

## Note
Important to mention here that this new suggestion would not change or prevent existing customer usage of the system and continue to allow proprietary usage.

**Do you have any additional context?**
see https://github.com/opensearch-project/OpenSearch-Dashboards/issues/3412
see https://opensearch.org/docs/latest/opensearch/data-streams/
see https://github.com/opensearch-project/data-prepper
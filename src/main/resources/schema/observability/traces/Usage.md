# Actual Index setup and usage
The next document describes the practicality of manually defining and initiating of the observability schema indices, it assumes the OpenSearch cluster 
is up and running.

### Setting Up the Mapping
Start the OpenSearch cluster and follow the next steps for manually setup of the Log mapping template:

`>> PUT _component_template/tracegroups_template`

Copy the [traceGroups.mapping](traceGroups.mapping)

`>> PUT _index_template/traces`

Copy the [traces.mapping](traces.mapping)

Now you can create an data-stream index (following the logs index pattern) that has the supported schema:

`>> PUT _data_stream/sso_traces-dataset-test`

You can also directly start ingesting data without creating a data stream.
Because we have a matching index template with a data_stream object, OpenSearch automatically creates the data stream:

`POST sso_traces-dataset-test/_doc`
```json
{
    "body": "login attempt failed",
    "@timestamp": "2013-03-01T00:00:00",
    ...
}

```

To see information about a that data stream:
`GET _data_stream/sso_traces-dataset-test`

Would respond the following:
```json
{
  "data_streams" : [
    {
      "name" : "sso_traces-dataset-test",
      "timestamp_field" : {
        "name" : "@timestamp"
      },
      "indices" : [
        {
          "index_name" : ".ds-sso_traces-dataset-test-000001",
          "index_uuid" : "-VhmuhrQQ6ipYCmBhn6vLw"
        }
      ],
      "generation" : 1,
      "status" : "GREEN",
      "template" : "sso_traces-*-*"
    }
  ]
}
```

To see more insights about the data stream, use the `_stats` endpoint:
`GET _data_stream/sso_traces-dataset-test/_stats`
Would respond the following:
```json
{
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "failed" : 0
  },
  "data_stream_count" : 1,
  "backing_indices" : 1,
  "total_store_size_bytes" : 208,
  "data_streams" : [
    {
      "data_stream" : "sso_traces-dataset-test",
      "backing_indices" : 1,
      "store_size_bytes" : 208,
      "maximum_timestamp" : 0
    }
  ]
}
```
### Ingestion
To ingest data into a data stream, you can use the regular indexing APIs. Make sure every document that you index has a timestamp field.

`POST sso_traces-dataset-test/_doc`
```json
{
    "body": "login attempt failed",
    "@timestamp": "2013-03-01T00:00:00",
    ...
}

```
You can search a data stream just like you search a regular index or an index alias. The search operation applies to all of the backing indices (all data present in the stream).

`GET sso_traces-dataset-test/_search`
```json
{
  "query": {
    "match": {
      ...
    }
  }
}
```

### Manage data-streams in OpenSearh

To manage data streams from OpenSearch Dashboards, open OpenSearch Dashboards, choose Index Management, select Indices or Policy managed indices.

see additional information:
 - https://opensearch.org/docs/latest/opensearch/data-streams/#step-6-manage-data-streams-in-opensearch-dashboards
 - https://opensearch.org/docs/latest/opensearch/data-streams/#step-5-rollover-a-data-stream
# OpenSearch Dashboards Trace Analytics

The OpenSearch Dashboards Trace Analytics plugin provides instant on dashboards in OpenSearch Dashboards for users to quickly analyze their logs. The plugin uses aggregated results from two indices, `otel-v1-apm-span-*` and `otel-v1-apm-service-map*` created by the otel-trace-raw-processor and service-map-processor, and renders three main views:

1. Dashboard: an overview of the trace groups and two charts: error rate and throughput.

1. Traces: a table of top-level traces with unique trace id's, where users can click on any trace to see its end-to-end performance metrics, service performance metrics, and a span latency metrics in a Gantt chart.

1. Services: a table of the services and a service map, where users can click on a service in the table to see its performance metrics and related services.

Additionally the fields can be sorted and filtered.

## Documentation

Please see our technical [documentation](https://opendistro.github.io/for-elasticsearch-docs/docs/trace/) to learn more about its features.

## Setup

1. Download OpenSearch for the version that matches the [OpenSearch Dashboards version specified in package.json](./package.json#L5).
1. Download the OpenSearch Dashboards source code for the [version specified in package.json](./package.json#L5) you want to set up.

1. Change your node version to the version specified in `.node-version` inside the OpenSearch Dashboards root directory.
1. cd into `plugins` directory in the OpenSearch Dashboards source code directory.
1. Check out this package from version control into the `plugins` directory.
1. Run `yarn osd bootstrap` inside `OpenSearch-Dashboards/plugins/trace-analytics`.

Ultimately, your directory structure should look like this:

```md
.
├── OpenSearch-Dashboards
│   └── plugins
│       └── trace-analytics
```

## Build

To build the plugin's distributable zip simply run `yarn build`.

Example output: `./build/traceanalyticsDashboards*.zip`


## Run

- `yarn start`

  Starts OpenSearch Dashboards and includes this plugin. OpenSearch Dashboards will be available on `localhost:5601`.

## Contributing to OpenSearch Dashboards Trace Analytics

We welcome you to get involved in development, documentation, testing the OpenSearch Dashboards Trace Analytics plugin. See our [CONTRIBUTING.md](./CONTRIBUTING.md) and join in.

## Bugs, Enhancements or Questions

Please file an issue to report any bugs you may find, enhancements you may need or questions you may have [here](https://github.com/opensearch-project/trace-analytics/issues).

## License

This code is licensed under the Apache 2.0 License.

## Copyright

Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.

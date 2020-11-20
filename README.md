# Open Distro for Elasticsearch Trace Analytics

The Open Distro for Elasticsearch Trace Analytics plugin provides instant on dashboards in Kibana for users to quickly analyze their logs. The plugin uses aggregated results from two indices, `otel-v1-apm-span-*` and `otel-v1-apm-service-map` created by the otel-trace-raw-processor and service-map-processor, and renders three main views:

1. Dashboard: an overview of the trace groups and two charts: error rate and throughput.

1. Traces: a table of top-level traces with unique trace id's, where users can click on any trace to see its end-to-end performance metrics, service performance metrics, and a span latency metrics in a Gantt chart.

1. Services: a table of the services and a service map, where users can click on a service in the table to see its performance metrics and related services.

Additionally the fields can be sorted and filtered.

## Documentation

Please see our technical [documentation](https://opendistro.github.io/for-elasticsearch-docs/docs/trace/) to learn more about its features.

## Setup

1. Download Elasticsearch for the version that matches the [Kibana version specified in package.json](./package.json#L5).
1. Download the Kibana source code for the [version specified in package.json](./package.json#L5) you want to set up.

   See the [Kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md#setting-up-your-development-environment) for more instructions on setting up your development environment.

1. Change your node version to the version specified in `.node-version` inside the Kibana root directory.
1. cd into `plugins` directory in the Kibana source code directory.
1. Check out this package from version control into the `plugins` directory.
1. Run `yarn kbn bootstrap` inside `kibana/plugins/trace-analytics`.

Ultimately, your directory structure should look like this:

```md
.
├── kibana
│   └── plugins
│       └── trace-analytics
```

## Build

To build the plugin's distributable zip simply run `yarn build`.

Example output: `./build/opendistroTraceAnalytics-*.zip`


## Run

- `yarn start`

  Starts Kibana and includes this plugin. Kibana will be available on `localhost:5601`.

## Contributing to Open Distro for Elasticsearch Trace Analytics

We welcome you to get involved in development, documentation, testing the kibana reports plugin. See our [CONTRIBUTING.md](./CONTRIBUTING.md) and join in.

Since this is a Kibana plugin, it can be useful to review the [Kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md) alongside the documentation around [Kibana plugins](https://www.elastic.co/guide/en/kibana/master/kibana-plugins.html) and [plugin development](https://www.elastic.co/guide/en/kibana/current/plugin-development.html).

## Bugs, Enhancements or Questions

Please file an issue to report any bugs you may find, enhancements you may need or questions you may have [here](https://github.com/opendistro-for-elasticsearch/trace-analytics/issues).

## License

This code is licensed under the Apache 2.0 License.

## Copyright

Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.

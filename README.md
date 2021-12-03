# OpenSearch Dashboards Observability

The OpenSearch Dashboards Observability plugin has four components: Trace Analytics, Event Analytics, Operational Panels, and Notebooks. Event analytics allows user to use [PPL](https://opensearch.org/docs/latest/search-plugins/ppl/index/) to query indices stored in OpenSearch. Users can also aggregate on their indices to automatically create visualizations, which can be added as operational panels similar to dashboards.

## Code Summary

| Type   | Badge        | Module   |
|--------|--------------|----------|
| Build  | [![Trace Analytics CI](https://github.com/opensearch-project/trace-analytics/actions/workflows/test-and-build-workflow.yml/badge.svg)](https://github.com/opensearch-project/trace-analytics/actions/workflows/test-and-build-workflow.yml)             | Dashboards-Plugin |
|        |        [![Trace Analytics CI](https://github.com/opensearch-project/trace-analytics/actions/workflows/test-and-build-workflow.yml/badge.svg)](https://github.com/opensearch-project/trace-analytics/actions/workflows/test-and-build-workflow.yml)      | OpenSearch-Plugin  |
| Unit tests    |    [![codecov](https://codecov.io/gh/opensearch-project/trace-analytics/branch/main/graphs/badge.svg)](https://codecov.io/gh/opensearch-project/trace-analytics)          | Dashboards-Plugin |
|        |    [![codecov](https://codecov.io/gh/opensearch-project/trace-analytics/branch/main/graphs/badge.svg)](https://codecov.io/gh/opensearch-project/trace-analytics)          | OpenSearch-Plugin  |
| Integration tests    |   [![cypress tests](https://img.shields.io/badge/Cypress%20tests-success-green)](https://github.com/opensearch-project/trace-analytics/blob/main/dashboards-observability/.cypress/CYPRESS_TESTS.md)           | Dashboards-Plugin |
|        |   [![plugin IT tests](https://img.shields.io/badge/Plugin%20IT%20Tests-success-green)](https://github.com/opensearch-project/trace-analytics/blob/main/opensearch-observability/src/test/kotlin/org/opensearch/observability/ObservabilityPluginIT.kt)          | OpenSearch-Plugin  |
| Backward compatibility tests    |   [![BWC tests](https://img.shields.io/badge/BWC%20Tests-in%20progress-yellow)](https://github.com/opensearch-project/trace-analytics/issues/276)           | OpenSearch-Plugin  |
| Issues | [![good first issues open](https://img.shields.io/github/issues/opensearch-project/trace-analytics/good%20first%20issue.svg)](https://github.com/opensearch-project/trace-analytics/issues?q=is%3Aopen+is%3Aissue+label%3A"good+first+issue")          |          |
|        | [![bug open](https://img.shields.io/github/issues/opensearch-project/trace-analytics/bug.svg)](https://github.com/opensearch-project/trace-analytics/issues?q=is%3Aopen+is%3Aissue+label%3Abug+)         |          |
|        | [![ehancement open](https://img.shields.io/github/issues/opensearch-project/trace-analytics/enhancement.svg)](https://github.com/opensearch-project/trace-analytics/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement+) |          |


### Event Analytics

Event Analytics allows user to monitor, correlate, analyze and visualize machine generated data through Piped Processing Language. It also enables the user to turn data-driven events into visualizations and save frequently used ones for quick access. 


### Operational Panels

Operational panels provides the users to create and view different visualizations on ingested observability data, using Piped Processing Language queries. Use PPL 'where clauses' and datetime timespans to filter all visualizations in the panel.  


### Trace Analytics

Trace Analytics page provides instant on dashboards in OpenSearch Dashboards for users to quickly analyze their logs. The plugin uses aggregated results from two indices, `otel-v1-apm-span-*` and `otel-v1-apm-service-map*` created by the otel-trace-raw-processor and service-map-processor, and renders three main views:

1. Dashboard: an overview of the trace groups and three charts: error rate, throughput, service map.

1. Traces: a table of top-level traces with unique trace id's, where users can click on any trace to see its end-to-end performance metrics, service performance metrics, and a span latency metrics in a Gantt chart.

1. Services: a table of the services, where users can click on a service to see its performance metrics and related services.

Additionally the fields can be sorted and filtered.

### Notebooks

Dashboards offer a solution for a few selected use cases, and are great tools if you’re focused on monitoring a known set of metrics over time. Notebooks enables contextual use of data with detailed explanations by allowing a user to combine saved visualizations, text, graphs and decorate data with other reference data sources.

## Documentation

Please see our technical [documentation](https://opensearch.org/docs/latest/observability-plugins/index/) to learn more about its features.

## Contributing

See [developer guide](DEVELOPER_GUIDE.md) and [how to contribute to this project](CONTRIBUTING.md).

## Getting Help

If you find a bug, or have a feature request, please don't hesitate to open an issue in this repository.

For more information, see [project website](https://opensearch.org/) and [documentation](https://opensearch.org/docs). If you need help and are unsure where to open an issue, try [forums](https://discuss.opendistrocommunity.dev/).

## Code of Conduct

This project has adopted the [Amazon Open Source Code of Conduct](CODE_OF_CONDUCT.md). For more information see the [Code of Conduct FAQ](https://aws.github.io/code-of-conduct-faq), or contact [opensource-codeofconduct@amazon.com](mailto:opensource-codeofconduct@amazon.com) with any additional questions or comments.

## Security

If you discover a potential security issue in this project we ask that you notify AWS/Amazon Security via our [vulnerability reporting page](http://aws.amazon.com/security/vulnerability-reporting/). Please do **not** create a public GitHub issue.

## License

This project is licensed under the [Apache v2.0 License](LICENSE).

## Copyright

Copyright OpenSearch Contributors. See [NOTICE](NOTICE) for details.

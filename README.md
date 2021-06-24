[![Trace Analytics CI](https://github.com/opensearch-project/trace-analytics/actions/workflows/test-and-build-workflow.yml/badge.svg)](https://github.com/opensearch-project/trace-analytics/actions/workflows/test-and-build-workflow.yml)
[![codecov](https://codecov.io/gh/opensearch-project/trace-analytics/branch/main/graphs/badge.svg)](https://github.com/opensearch-project/trace-analytics)

# OpenSearch Dashboards Trace Analytics

The OpenSearch Dashboards Trace Analytics plugin provides instant on dashboards in OpenSearch Dashboards for users to quickly analyze their logs. The plugin uses aggregated results from two indices, `otel-v1-apm-span-*` and `otel-v1-apm-service-map*` created by the otel-trace-raw-processor and service-map-processor, and renders three main views:

1. Dashboard: an overview of the trace groups and three charts: error rate, throughput, service map.

1. Traces: a table of top-level traces with unique trace id's, where users can click on any trace to see its end-to-end performance metrics, service performance metrics, and a span latency metrics in a Gantt chart.

1. Services: a table of the services, where users can click on a service to see its performance metrics and related services.

Additionally the fields can be sorted and filtered.

## Documentation

Please see our technical [documentation](https://docs-beta.opensearch.org/monitoring-plugins/trace/index/) to learn more about its features.

## Contributing

See [developer guide](DEVELOPER_GUIDE.md) and [how to contribute to this project](CONTRIBUTING.md). 

## Getting Help

If you find a bug, or have a feature request, please don't hesitate to open an issue in this repository.

For more information, see [project website](https://opensearch.org/) and [documentation](https://docs-beta.opensearch.org/). If you need help and are unsure where to open an issue, try [forums](https://discuss.opendistrocommunity.dev/).

## Code of Conduct

This project has adopted the [Amazon Open Source Code of Conduct](CODE_OF_CONDUCT.md). For more information see the [Code of Conduct FAQ](https://aws.github.io/code-of-conduct-faq), or contact [opensource-codeofconduct@amazon.com](mailto:opensource-codeofconduct@amazon.com) with any additional questions or comments.

## Security

If you discover a potential security issue in this project we ask that you notify AWS/Amazon Security via our [vulnerability reporting page](http://aws.amazon.com/security/vulnerability-reporting/). Please do **not** create a public GitHub issue.

## License

This project is licensed under the [Apache v2.0 License](LICENSE.txt).

## Copyright

Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.

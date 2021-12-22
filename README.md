<img src="https://opensearch.org/assets/img/opensearch-logo-themed.svg" height="64px">

- [Observability](#observability)
- [Code Summary](#code-summary)
- [Plugin Components](#plugin-components)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Getting Help](#getting-help)
- [Code of Conduct](#code-of-conduct)
- [Security](#security)
- [License](#license)
- [Copyright](#copyright)

# Observability

Observability is collection of plugins and applications that let you visualize data-driven events by using Piped Processing Language to explore, discover, and query data stored in OpenSearch.

## Code Summary

### OpenSearch-Observability

|                              |                                                                                                                                              |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Test and build               | [![Observability OpenSearch Build CI][opensearch-build-badge]][opensearch-build-link]                                                        |
| Code coverage                | [![codecov][opensearch-codecov-badge]][codecov-link]                                                                                         |
| Distribution build tests     | [![OpenSearch IT tests][opensearch-it-badge]][opensearch-it-link] [![OpenSearch IT code][opensearch-it-code-badge]][opensearch-it-code-link] |
| Backward compatibility tests | [![BWC tests][bwc-tests-badge]][bwc-tests-link]                                                                                              |

### Dashboards-Observability

|                          |                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Test and build           | [![Observability Dashboards CI][dashboard-build-badge]][dashboard-build-link]                                      |
| Code coverage            | [![codecov][dashboard-codecov-badge]][codecov-link]                                                                |
| Distribution build tests | [![cypress tests][cypress-test-badge]][cypress-test-link] [![cypress code][cypress-code-badge]][cypress-code-link] |

### Repository Checks

|              |                                                                 |
| ------------ | --------------------------------------------------------------- |
| DCO Checker  | [![Developer certificate of origin][dco-badge]][dco-badge-link] |
| Link Checker | [![Link Checker][link-check-badge]][link-check-link]            |

### Issues

|                                                                |
| -------------------------------------------------------------- |
| [![good first issues open][good-first-badge]][good-first-link] |
| [![features open][feature-badge]][feature-link]                |
| [![enhancements open][enhancement-badge]][enhancement-link]    |
| [![bugs open][bug-badge]][bug-link]                            |
| [![untriaged open][untriaged-badge]][untriaged-link]           |
| [![nolabel open][nolabel-badge]][nolabel-link]                 |

[dco-badge]: https://github.com/opensearch-project/observability/actions/workflows/dco.yml/badge.svg
[dco-badge-link]: https://github.com/opensearch-project/observability/actions/workflows/dco.yml
[link-check-badge]: https://github.com/opensearch-project/observability/actions/workflows/link-checker.yml/badge.svg
[link-check-link]: https://github.com/opensearch-project/observability/actions/workflows/link-checker.yml
[dashboard-build-badge]: https://github.com/opensearch-project/observability/actions/workflows/dashboards-observability-test-and-build-workflow.yml/badge.svg
[dashboard-build-link]: https://github.com/opensearch-project/observability/actions/workflows/dashboards-observability-test-and-build-workflow.yml
[opensearch-build-badge]: https://github.com/opensearch-project/observability/actions/workflows/opensearch-observability-test-and-build-workflow.yml/badge.svg
[opensearch-build-link]: https://github.com/opensearch-project/observability/actions/workflows/opensearch-observability-test-and-build-workflow.yml
[dashboard-codecov-badge]: https://codecov.io/gh/opensearch-project/observability/branch/main/graphs/badge.svg?flag=dashboards-observability
[opensearch-codecov-badge]: https://codecov.io/gh/opensearch-project/observability/branch/main/graphs/badge.svg?flag=opensearch-observability
[codecov-link]: https://codecov.io/gh/opensearch-project/observability
[cypress-test-badge]: https://img.shields.io/badge/Cypress%20tests-in%20progress-yellow
[cypress-test-link]: https://github.com/opensearch-project/opensearch-build/issues/1124
[cypress-code-badge]: https://img.shields.io/badge/Cypress%20code-blue
[cypress-code-link]: https://github.com/opensearch-project/observability/blob/main/dashboards-observability/.cypress/CYPRESS_TESTS.md
[opensearch-it-badge]: https://img.shields.io/badge/OpenSearch%20Plugin%20IT%20tests-in%20progress-yellow
[opensearch-it-link]: https://github.com/opensearch-project/opensearch-build/issues/1124
[opensearch-it-code-badge]: https://img.shields.io/badge/OpenSearch%20IT%20code-blue
[opensearch-it-code-link]: https://github.com/opensearch-project/observability/blob/main/opensearch-observability/src/test/kotlin/org/opensearch/observability/ObservabilityPluginIT.kt
[bwc-tests-badge]: https://img.shields.io/badge/BWC%20tests-in%20progress-yellow
[bwc-tests-link]: https://github.com/opensearch-project/observability/issues/276
[good-first-badge]: https://img.shields.io/github/issues/opensearch-project/observability/good%20first%20issue.svg
[good-first-link]: https://github.com/opensearch-project/observability/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22+
[feature-badge]: https://img.shields.io/github/issues/opensearch-project/observability/feature.svg
[feature-link]: https://github.com/opensearch-project/observability/issues?q=is%3Aopen+is%3Aissue+label%3Afeature
[bug-badge]: https://img.shields.io/github/issues/opensearch-project/observability/bug.svg
[bug-link]: https://github.com/opensearch-project/observability/issues?q=is%3Aopen+is%3Aissue+label%3Abug+
[enhancement-badge]: https://img.shields.io/github/issues/opensearch-project/observability/enhancement.svg
[enhancement-link]: https://github.com/opensearch-project/observability/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement+
[untriaged-badge]: https://img.shields.io/github/issues/opensearch-project/observability/untriaged.svg
[untriaged-link]: https://github.com/opensearch-project/observability/issues?q=is%3Aopen+is%3Aissue+label%3Auntriaged+
[nolabel-badge]: https://img.shields.io/github/issues-search/opensearch-project/observability?color=yellow&label=no%20label%20issues&query=is%3Aopen%20is%3Aissue%20no%3Alabel
[nolabel-link]: https://github.com/opensearch-project/observability/issues?q=is%3Aopen+is%3Aissue+no%3Alabel+

## Plugin Components

The Observability plugin has four components: Trace Analytics, Event Analytics, Operational Panels, and Notebooks.

### Trace Analytics

Trace Analytics page provides instant on dashboards in OpenSearch Dashboards for users to quickly analyze their logs. The plugin uses aggregated results from two indices, `otel-v1-apm-span-*` and `otel-v1-apm-service-map*` created by the otel-trace-raw-processor and service-map-processor, and renders three main views:

1. Dashboard: an overview of the trace groups and three charts: error rate, throughput, service map.

1. Traces: a table of top-level traces with unique trace id's, where users can click on any trace to see its end-to-end performance metrics, service performance metrics, and a span latency metrics in a Gantt chart.

1. Services: a table of the services, where users can click on a service to see its performance metrics and related services.

Additionally the fields can be sorted and filtered.

### Event Analytics

Event Analytics allows user to monitor, correlate, analyze and visualize machine generated data through [Piped Processing Language](https://opensearch.org/docs/latest/observability-plugins/ppl/index/). It also enables the user to turn data-driven events into visualizations and save frequently used ones for quick access.

### Operational Panels

Operational panels provides the users to create and view different visualizations on ingested observability data, using Piped Processing Language queries. Use PPL 'where clauses' and datetime timespans to filter all visualizations in the panel.

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

## 2021-04-23 Version 1.0.0.0

### Features
* Allow filtering by traceGroup and service ([#28](https://github.com/opendistro-for-elasticsearch/trace-analytics/pull/28))

### Enhancements
* Change styles for unmatched service nodes ([#29](https://github.com/opendistro-for-elasticsearch/trace-analytics/pull/29))
* Extend the indices pattern to match service map data ([#21](https://github.com/opendistro-for-elasticsearch/trace-analytics/pull/21))

### Bug Fixes
* Rebase new commits from opendistro repo ([#5](https://github.com/opensearch-project/trace-analytics/pull/5))
* Revert to traceGroup from traceGroupFields ([#37](https://github.com/opendistro-for-elasticsearch/trace-analytics/pull/37))
* Add null check for service map, fix percentile filter ([#35](https://github.com/opendistro-for-elasticsearch/trace-analytics/pull/35))
* Fixed getTracesQuery, was returning 0 unexpectedly. ([#34](https://github.com/opendistro-for-elasticsearch/trace-analytics/pull/34))
* Renamed 'traceGroup' to 'traceGroupFields' to support backwards compa… ([#33](https://github.com/opendistro-for-elasticsearch/trace-analytics/pull/33))
* Fix index exists query on wildcards ([#25](https://github.com/opendistro-for-elasticsearch/trace-analytics/pull/25))
* Fix service map so it respects the time filter ([#23](https://github.com/opendistro-for-elasticsearch/trace-analytics/pull/23))
* Fix y-range for 24 hr latency line plot ([#18](https://github.com/opendistro-for-elasticsearch/trace-analytics/pull/18))

### Infrastructure
* Add jest tests to trace analytics 7.9.1 ([#14](https://github.com/opendistro-for-elasticsearch/trace-analytics/pull/14))

### Documentation
* Add license headers for OpenSearch ([#3](https://github.com/opensearch-project/trace-analytics/pull/3))
* Add Linux DCO to Contributing doc ([#26](https://github.com/opendistro-for-elasticsearch/trace-analytics/pull/26))
* add Linux DCO to PR template ([#22](https://github.com/opendistro-for-elasticsearch/trace-analytics/pull/22))

### Maintenance
* Change nav bar to use OpenSearch ([#2](https://github.com/opensearch-project/trace-analytics/pull/2))
* Migrate trace analytics to OpenSearch Dashboards ([#1](https://github.com/opensearch-project/trace-analytics/pull/1))
* Change plugin versions to 1.0.0 ([#4](https://github.com/opensearch-project/trace-analytics/pull/4))
* Version bump to 1.13.2.0 ([#30](https://github.com/opendistro-for-elasticsearch/trace-analytics/pull/30))
* Bump lodash version to 4.17.21 ([#24](https://github.com/opendistro-for-elasticsearch/trace-analytics/pull/24))
* Bump trace analytics to 7.10.2, cherry-pick jest tests ([#19](https://github.com/opendistro-for-elasticsearch/trace-analytics/pull/19))
* Bump ini from 1.3.5 to 1.3.8 ([#13](https://github.com/opendistro-for-elasticsearch/trace-analytics/pull/13))

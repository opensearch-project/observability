## Version 2.0.0.0 Release Notes

Compatible with OpenSearch 2.0.0.0

### Enhancements
* remove button toggle and add stop button ([#623](https://github.com/opensearch-project/observability/pull/623))
* Add availability entry points ([#731](https://github.com/opensearch-project/observability/pull/731))

### Bug Fixes
* Edit visualization time change ([#617](https://github.com/opensearch-project/observability/pull/617))
* Remove duplicated node dependencies ([#620](https://github.com/opensearch-project/observability/pull/620))
* Bug fixes for application analytics ([#608](https://github.com/opensearch-project/observability/pull/608))
* Fixes trace analytics invalid service map and increase span limit ([#629](https://github.com/opensearch-project/observability/pull/629))
* Adding legacy UI route for traces ([#653](https://github.com/opensearch-project/observability/pull/653))
* Fix change availability bug ([#667](https://github.com/opensearch-project/observability/pull/667))
* Fix test to check for empty event analytics ([#669](https://github.com/opensearch-project/observability/pull/669))
* Bump prismjs from 1.25.0 to 1.27.0 in /dashboards-observability ([#508](https://github.com/opensearch-project/observability/pull/508))
* Bump minimist from 1.2.5 to 1.2.6 in /dashboards-observability ([#614](https://github.com/opensearch-project/observability/pull/614))
* Bump moment from 2.29.1 to 2.29.2 in /dashboards-observability ([#636](https://github.com/opensearch-project/observability/pull/636))
* Bump async from 3.2.1 to 3.2.3 in /dashboards-observability ([#654](https://github.com/opensearch-project/observability/pull/654))
* Update availabilityVizId if visualization is removed from panel ([#732](https://github.com/opensearch-project/observability/pull/732))
* Issue fix not a function error ([#739](https://github.com/opensearch-project/observability/pull/739))

### Infrastructure
* Bwc update ([#604](https://github.com/opensearch-project/observability/pull/604))
* Event cypress tests ([#611](https://github.com/opensearch-project/observability/pull/611))
* Test 2.0 ([#624](https://github.com/opensearch-project/observability/pull/624))
* Updated panel flaky cypress tests ([#633](https://github.com/opensearch-project/observability/pull/633))
* Updated notebook cypress tests ([#637](https://github.com/opensearch-project/observability/pull/637))
* updated events flyout ui, unskip jest tests ([#638](https://github.com/opensearch-project/observability/pull/638))
* Remove zips used by bwc tests ([#648](https://github.com/opensearch-project/observability/pull/648))
* Fix trace analytics cypress ([#652](https://github.com/opensearch-project/observability/pull/652))
* Event analytics jest tests ([#651](https://github.com/opensearch-project/observability/pull/651))
* 2.0 cypress tests ([#658](https://github.com/opensearch-project/observability/pull/658))
* Updated issue templates from .github. ([#662](https://github.com/opensearch-project/observability/pull/662))
* Removing add sample data test from panels cypress ([#668](https://github.com/opensearch-project/observability/pull/668))
* [OSD][Tests] add test subject to app title for app analytics ([#686](https://github.com/opensearch-project/observability/pull/686))
* Support integTestRemote with security enabled endpoint ([#699](https://github.com/opensearch-project/observability/pull/699))
* Add data test subj to fix cypress tests ([#704](https://github.com/opensearch-project/observability/pull/704))



### Documentation
* Remove master and whitelist text ([#657](https://github.com/opensearch-project/observability/pull/657))

### Maintenance
* Bump plugins to 2.0 and support build.version_qualifier ([#602](https://github.com/opensearch-project/observability/pull/602))
* Add alpha1 qualifier and JDK 17 for backend ([#607](https://github.com/opensearch-project/observability/pull/607))
* Add alpha1 qualifiers for dashboards plugin ([#616](https://github.com/opensearch-project/observability/pull/616))
* Tweak build.gradle to have the correct qualifiers in 2.0.0 ([#619](https://github.com/opensearch-project/observability/pull/619))
* Change alpha1 to rc1 for first 2.0 release ([#635](https://github.com/opensearch-project/observability/pull/635))
* Change 2.0-alpha1 to 2.0-rc1. ([#655](https://github.com/opensearch-project/observability/pull/655))
* Remove Candlestick chart from Visualizations ([#690](https://github.com/opensearch-project/observability/pull/690))
* Remove rc1 reference ([#730](https://github.com/opensearch-project/observability/pull/730))


### Refactoring
* Modularize and cleanup traces ([#601](https://github.com/opensearch-project/observability/pull/601))
* Modularize and cleanup panel ([#603](https://github.com/opensearch-project/observability/pull/603))
* Modularize event Analytics live tail and fix bug ([#647](https://github.com/opensearch-project/observability/pull/647))
* Fix lint and modularize dashboard ([#583](https://github.com/opensearch-project/observability/pull/583))
* Modularize service and fix issues ([#595](https://github.com/opensearch-project/observability/pull/595))
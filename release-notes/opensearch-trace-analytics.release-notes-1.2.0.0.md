## Version 1.2.0.0 Release Notes

Compatible with OpenSearch and OpenSearch Dashboards Version 1.2.0

### Breaking Changes
* Use observability specific permissions instead of notebooks ([#177](https://github.com/opensearch-project/trace-analytics/pull/177))

### Features
* Added ppl query filter, added router placeholder for panels ([#108](https://github.com/opensearch-project/trace-analytics/pull/108))
* Added Algolia Autocomplete Bar ([#110](https://github.com/opensearch-project/trace-analytics/pull/110))
* Merge notebooks frontend to observability ([#109](https://github.com/opensearch-project/trace-analytics/pull/109))
* Event Analytics  - Add index picker to explorer page ([#125](https://github.com/opensearch-project/trace-analytics/pull/125))
* Feature/operational panels backend ([#130](https://github.com/opensearch-project/trace-analytics/pull/130))
* Feature/p1 release ([#133](https://github.com/opensearch-project/trace-analytics/pull/133))
* Feature/operational panel UI ([#132](https://github.com/opensearch-project/trace-analytics/pull/132))
* Feature timestamp ([#152](https://github.com/opensearch-project/trace-analytics/pull/152))
* Feature toasts errors handling ([#155](https://github.com/opensearch-project/trace-analytics/pull/155))
* Feature query bar ([#166](https://github.com/opensearch-project/trace-analytics/pull/166))
* Feature bug fixes ([#168](https://github.com/opensearch-project/trace-analytics/pull/168))
* Home table ([#169](https://github.com/opensearch-project/trace-analytics/pull/169))
* Feature vis fix override button ([#172](https://github.com/opensearch-project/trace-analytics/pull/172))
* Visualizations theming ([#171](https://github.com/opensearch-project/trace-analytics/pull/171))
* added find auto interval ([#167](https://github.com/opensearch-project/trace-analytics/pull/167))
* Feature available fields timestamp ([#179](https://github.com/opensearch-project/trace-analytics/pull/179))
* Added aggregate functions to autocomplete ([#185](https://github.com/opensearch-project/trace-analytics/pull/185))
* Feature event analytics imporovements and fixes ([#199](https://github.com/opensearch-project/trace-analytics/pull/199))
* Added support for sample panels ([#200](https://github.com/opensearch-project/trace-analytics/pull/200))
* Feature couple of features and fixes ([#202](https://github.com/opensearch-project/trace-analytics/pull/202))
* Add match command to AutoComplete ([#203](https://github.com/opensearch-project/trace-analytics/pull/203))
* Add error handler when fetching ppl in event explorer ([#204](https://github.com/opensearch-project/trace-analytics/pull/204))
* Support dark mode for notebooks and other style improvements ([#206](https://github.com/opensearch-project/trace-analytics/pull/206))
* Add toggle dark mode in observability side bar ([#209](https://github.com/opensearch-project/trace-analytics/pull/209))
* Panel bug fixes4 and PPL Reference Manual ([#211](https://github.com/opensearch-project/trace-analytics/pull/211))

### Enhancements
* Adding plugin backend adaptor ([#126](https://github.com/opensearch-project/trace-analytics/pull/126))
* Update notebooks to use observability backend ([#129](https://github.com/opensearch-project/trace-analytics/pull/129))
* Add minimal plugin for backend observability ([#143](https://github.com/opensearch-project/trace-analytics/pull/143))
* Add models for objects and requests ([#144](https://github.com/opensearch-project/trace-analytics/pull/144))
* Add CRUD actions and index operations for observability objects ([#145](https://github.com/opensearch-project/trace-analytics/pull/145))
* Panels' visualization design change ([#149](https://github.com/opensearch-project/trace-analytics/pull/149))
* Operational Panels UI changes ([#153](https://github.com/opensearch-project/trace-analytics/pull/153))
* changed to support query without 'search' prefix ([#158](https://github.com/opensearch-project/trace-analytics/pull/158))
* changes for adopting new sql artifact ([#165](https://github.com/opensearch-project/trace-analytics/pull/165))
* Improve reindex handling for .opensearch-notebooks ([#163](https://github.com/opensearch-project/trace-analytics/pull/163))
* Inherited datepicker format from settings ([#164](https://github.com/opensearch-project/trace-analytics/pull/164))
* Added refresh datepicker button ([#182](https://github.com/opensearch-project/trace-analytics/pull/182))
* Field suggestions update to match changed index in query ([#176](https://github.com/opensearch-project/trace-analytics/pull/176))
* adding colors version2 ([#181](https://github.com/opensearch-project/trace-analytics/pull/181))
* Home table update ([#174](https://github.com/opensearch-project/trace-analytics/pull/174))
* Icon that redirects to PPL Documentation next to Search Bar ([#183](https://github.com/opensearch-project/trace-analytics/pull/183))
* Suggestions are shown in dark mode if settings change ([#187](https://github.com/opensearch-project/trace-analytics/pull/187))
* Case insensitive Autocomplete ([#207](https://github.com/opensearch-project/trace-analytics/pull/207))
* Adjust wording and margin for dark toggle button ([#210](https://github.com/opensearch-project/trace-analytics/pull/210))

### Bug Fixes
* Redirect legacy notebooks URL to current observability one ([#141](https://github.com/opensearch-project/trace-analytics/pull/141))
* Autocomplete only displays current command ([#157](https://github.com/opensearch-project/trace-analytics/pull/157))
* Use JS API to redirect legacy notebooks URL ([#162](https://github.com/opensearch-project/trace-analytics/pull/162))
* Panels bug fix#1 ([#159](https://github.com/opensearch-project/trace-analytics/pull/159))
* Panels bug fix2 ([#170](https://github.com/opensearch-project/trace-analytics/pull/170))
* timestamp fix ([#175](https://github.com/opensearch-project/trace-analytics/pull/175))
* Fix deleting all paragraphs for notebooks ([#184](https://github.com/opensearch-project/trace-analytics/pull/184))
* Fix for duplicate indices in suggestion ([#190](https://github.com/opensearch-project/trace-analytics/pull/190))
* added panels modifications and bug fix ([#194](https://github.com/opensearch-project/trace-analytics/pull/194))
* Update plugin ID and bug fixes ([#195](https://github.com/opensearch-project/trace-analytics/pull/195))
* Feature autocomplete fix ([#208](https://github.com/opensearch-project/trace-analytics/pull/208))
* Use parent height instead of view port height for nav bar ([#212](https://github.com/opensearch-project/trace-analytics/pull/212))

### Infrastructure
* Refactor trace analytics UT and IT, sync main branch ([#107](https://github.com/opensearch-project/trace-analytics/pull/107))
* Bump prismjs from 1.24.1 to 1.25.0 ([#137](https://github.com/opensearch-project/trace-analytics/pull/137))
* Bump immer from 9.0.5 to 9.0.6 ([#136](https://github.com/opensearch-project/trace-analytics/pull/136))
* Update data modal and enable CI ([#148](https://github.com/opensearch-project/trace-analytics/pull/148))
* Add integration tests for observability backend plugin ([#180](https://github.com/opensearch-project/trace-analytics/pull/180))

### Documentation
* Update docs for observability ([#188](https://github.com/opensearch-project/trace-analytics/pull/188))

### Maintenance
* Bump observability version for OpenSearch 1.2 release ([#189](https://github.com/opensearch-project/trace-analytics/pull/189))

### Refactoring
* Merge observability into main branch ([#135](https://github.com/opensearch-project/trace-analytics/pull/135))
* Move observability frontend to a sub directory ([#142](https://github.com/opensearch-project/trace-analytics/pull/142))
* Remove app analytics ([#154](https://github.com/opensearch-project/trace-analytics/pull/154))

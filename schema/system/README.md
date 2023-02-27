# Internal System Schema

This folder contains internal representation of assets that are stored in the system indices of dashboard and integration.
 - Application
 - Datasource
 - Index-Pattern
 - Integration
 - Notebook
 - Operational-Panel
 - SavedQuery
 - Visualization

### Application
[Application](https://opensearch.org/docs/2.5/observing-your-data/app-analytics/) enables creation of custom observability display to view the availability status of your systems, where you can combine log events with trace and metric data into a single view of overall system health. 
This lets you quickly pivot between logs, traces, and metrics to dig into the source of any issues.

 - [Schema](application.schema)
 - [Sample](samples/application.json)

### Datasource
[Data-source](https://opensearch.org/docs/2.4/dashboards/discover/multi-data-sources/) Enables adding multiple data sources to a single dashboard.
OpenSearch Dashboards allows you to dynamically manage data sources, create index patterns based on those data sources, and execute queries against a specific data source and then combine visualizations in one dashboard. 

 - [Schema](datasource.schema)
 - [Sample](samples/datasource.json)

### Index-Pattern
An Index Pattern allows to access data that you want to explore. An index pattern selects the data to use. An index pattern may point to multiple indices, data stream, or index aliases.

 - [Schema](index-pattern.schema)
 - [Sample](samples/index-pattern.json)

### Integration
Integration is a schematized and categorized bundle of assets grouped together to allow simple and coherent way to view, analyze and investigate different aspects of your data.
Integrations allow pre-defining dashboards, visualizations, index-templates, saved-queries and additional assets so that they provide a complete meaningful user experience. 

 - [Schema](integration.schema)
 - [Sample](samples/integration.json)

### Notebook
[Notebook](https://opensearch.org/docs/2.5/observing-your-data/notebooks/) A notebook is a document composed of two elements: code blocks (Markdown/SQL/PPL) and visualizations.
Choose multiple timelines to compare and contrast visualizations.
You can also generate reports directly from your notebooks. Common use cases include creating postmortem reports, designing runbooks, building live infrastructure reports, and writing documentation.

 - [Schema](notebook.schema)
 - [Sample](samples/notebook.json)

### Operational-Panel
[Operational Panels](https://opensearch.org/docs/2.5/observing-your-data/operational-panels/) in OpenSearch Dashboards are collections of visualizations generated using Piped Processing Language (PPL) queries.

 - [Schema](operational-panel.schema)
 - [Sample](samples/operationalPanel.json)

### Saved-Query
A saved query (saved search) allows to reuse a search created in a dashboard for other dashboards.

 - [Schema](saved-query.schema)
 - [Sample](samples/savedQuery.json)

### Visualization
[Visualization](https://opensearch.org/docs/2.5/dashboards/visualize/viz-index/) allows translation of complex, high-volume, or numerical data into a visual representation that is easier to process.
OpenSearch Dashboards gives you data visualization tools to improve and automate the visual communication process. By using visual elements like charts, graphs, or maps to represent data, you can advance business intelligence and support data-driven decision-making and strategic planning.

 - [Schema](visualization.schema)
 - [Sample](samples/visualization.json)

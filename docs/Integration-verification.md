# Integration Verification

After the Integration was developed, it has to be tested and validated prior of publication to a shared repo.
Validation of an Integration is expected to be a build-time phase. It also expects that it will verify that the following

- **Structure Validation**:

* make sure the `config.json` is complete and contains all the mandatory parts.
* make sure all the versions correctly reflect the schema files

- **Schema Validation**:

* make sure all the input_types defined in the `collections` elements have a compatible transformation schema and this schema complies with the SSO versioned schema.
* make sure all the transformation’s conform to the SSO versioned schema.

- **Display Validation**:  make sure all the display components have a valid json structure and if the explicitly reference fields - these fields must be aligned with the SSO schema type (Trace/Metrics/Logs...)

- **Query** **Validation**:  make sure all the queries have a valid PPL structure and if the explicitly reference fields - these fields must be aligned with the SSO schema type (Trace/Metrics/Logs...)
 
- **Assets** **Validation**:  make sure all the assets are valid 
  
  - Datasource configuration assets validation - verify datasource is available and alive
  - Materialized view configuration assets validation - verify materialized view is accessible

***_End to End_***
- **Sample Validation:**

* make sure the sample outcome of the transformation is compatible with the SSO schema
* make sure the outcome result shares all the transformable information from the input source sample

All these validations would use a dedicated validation & testing library supplied by SimpleSchema plugin.
* * *

## Integration Development Test-Harness

In order to simplify and automate the process of validating an Integration compliant to OpenSearch Observability - we suggest the next Testing harness. Test harness is essentially an End to End standard that requires the developer to setup and provide the next components:

- Docker compose with the following :

    * Component (Agent / Exporter) responsible of transforming the source format to the Observability SSO format.
    * Pipeline that will be used to push Observability signals into OpenSearch Index
    * OpenSearch with Observability plugin
    * Ready made sample from the original signals that will be used by the transformation component to produce the Observability documents.
    * Assembly of Integration components (Dashboards, queries, Visualizations) that will be loaded into the Observability Plugin.

The test flow will have the following steps:

**Initiating the Integration Pipline**
-  Spin-up the docker compose elements.
-  Init the Observability including creation of the Ingestion index and loading of the Integration components
-  Start the ingestion pipeline which will take the sample original signals, transform them to Observability and submit to OpenSearch Observability Index.

Next step would be to run a series of **baseline queries** that should be part of the verification to prove correctness, the queries must match the existing sample data including time and measurements .

**Result** of these queries (including UX driven queries) are also compared with the expected results and verified for correctness .

This completes the test verification process and verifies the Integration is compliant with the Observability schema and visual components .

* * *

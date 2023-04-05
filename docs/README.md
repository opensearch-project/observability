## Integrations Documentation Table of Content

The integration repository contains the list of the supported catalogs ([Observability](../schema/observability/README.md) for example)

In addition, it also contains the list of [Integrations](../integrations/README.md) such as [Nginx](../integrations/nginx/info/README.md)

The next documents describe the user workflows, design and architecture of the project. 

---

- [Integration introduction](Integrations.md)

Integration is a new type of logical component that allows high level composition of multiple Dashboards / Applications / Queries and more.
Integrations can be used to bring together all the metrics and logs from the infrastructure and gain insight into the unified system as a whole.

---

- [Simple-Schema](Simple-schema.md)

Simple Schema bring the importance of a coherent monitoring solution for modern infrastructure, and the need for a normalized schema to manage the vast amounts of log formats and types.
It presents a standard structure for Observability (based on [OTEL](https://github.com/open-telemetry) & [ECS](https://github.com/elastic/ecs)) consisting of three main signal types (logs, traces, and metrics) and supplement indices.


---

- [Integration Structure](Integration-structure.md)


Integrations are collections of assets with specific structure and conventions. The metadata and display components of integrations are described, along with additional assets such as datasource configuration and materialized view table creation.
The example of an NginX integration component is also presented, which includes a config file, display folder, queries folder, schema folder, samples folder, and info folder. Integration configuration includs versioning, identification, catalog, components, and collection.

---

- [Integration Fields Mapping](Integration-fields-mapping.md)

Fields mapping is a solution for connecting similar purpose fields with different names using the Field Alias feature. This allows queries and dashboards to work seamlessly without any changes to the data or index information. The proposed workflow involves users selecting an existing index for the data stream and mapping the original field to the schema destination field for the aliasing flow to be performed. 

---

- [Integration Plugin](Integration-plugin-tasks.md)

The Integration Loading Flow is responsible for registering catalogs, loading integrations, and maintaining integration state. During catalog registration, the Integration Plugin creates a mapping template for each catalog schema entity. Integrations can be loaded from an in-memory cache or external zip bundle uploaded by the user. The loading process involves validation, asset upload, saved objects insertion, and mapping templates verification. The API provides additional features such as status updates, activation, and deactivation.

---

- [Integration-Verification](Integration-verification.md)

The Integration Verification process involves validating the integration's structure, schema, display, query, and assets. A dedicated validation and testing library supplied by SimpleSchema plugin is used for these validations.
An Integration Development Test-Harness is suggested to simplify and automate the validation process, which includes setting up a docker compose environment, running baseline queries, and comparing the results with expected results to verify correctness.

---

- [Integration-Publishing](Integration-publishing.md)


The Integration Publishing process involves signing and uploading the integration to a public repository, along with metadata such as owner, license, and documentation, as well as relevant versions and sample data. The uploaded integration goes through a review process that includes running the docker sample and verifying display components work correctly.
Integrations that do not pass this process will not be bundled in the Observability release or recommended by OpenSearch, but can still be manually installed with the installing party responsible for ensuring proper operation. In the future, OpenSearch may automate this process with a dedicated API or baseline queries.

---

- [Integration-Loading](Integration-loading.md)


This describes the process of loading integrations into OpenSearch for use in Observability. After an integration passes the OpenSearch Integration Verification Review Process, it is packaged and bundled with the Observability solution.
The integration goes through several stages in its lifecycle: `Loading`, `Maintenance`, `Ready to Ingest`, and `Ready to Read`.
During the Loading phase, the integration's assets are being loaded and configured. `Maintenance` indicates that some components may be missing or broken, and the appropriate info will be detailed on the missing parts.
Once issues are corrected, it will transform to the `Ready to Ingest` stage, indicating the integration is loaded and verified.

---

- [Integration-API](Integration-API.md)

This document outlines the API and workflow for loading integrations into OpenSearch. Integrations are a stateful bundle that are stored in the system `.integration` index and reflect the integration's status during different phases of its lifecycle.
 - The first API discussed is the Load Integrations Repository API. Once the Integration plugin is started it loads all available integrations that are bundled in the integration repo. The backend scans the Integration folder and loads each integration config file into cache, allowing for filtering on the registry API.
 - The Load Integration API is specifying how the integration to load into the system, the backend initiates the loading process and displays the appropriate status to reflect the loading steps.
# Integration Loading

**Loading Integrations into opensearch:**

This phase describes the use case for a customer using Observability, it describes how such customer loads different Integrations so that it may be used to easily visualize and analyze existing data using pre-canned dashboards and visualizations.

In the former part (Publishing An Integration) we defined the **Open Search Integration Verification Review Process.**

The integrations passing this process can be available out of the box once the Observability plugin is loaded. This availability means that these Integrations can be packages together and assembled with the Observability solution.

Once an Observability is distributed, it is pre-bundled with the verified Integrations. These integrations are packaged in a dedicated folder.

**Integration Lifecycle**
```
- LOADING
    - VALIDATION
        - UPLOAD
            - READY
``` 
Observability bootstrap initiates the state for all the Integrations bundled with the distribution, the initial state is

***Loading*** - indicating the integration is still loading and has not yet been verified for runtime readiness.

- Loading an integration may also allow the user to configure some parts of the Integration so that he could load multiple instances of the same integration template - for example for a service provider with different customers having a similar resource.
- Configure index pattern / name
- Configure datasource (namespace) name (shared by the dashboards, queries, visualizations, alerts)
- Configure security policies

***Maintenance***

indicating some components weren’t loaded / created as required and the appropriate info will be detailed on the missing parts:


*- Index may not exist*
*- Dashboard could failed importing (name collision)*
*- Configuration is broken for some component and needs mending*
Once the issues are corrected it will transform to the ***Ready2Ingest** *stage

→ ***Ready2Ingest*** - indicating the integration was loaded and verified all the needed  indices / dashboards are ready - but no data was found matching the expected classification filters.

→ ***Ready2Read*** - indicating the integration is populating the indices and data can be visualized and queried.

The system would differentiate from the ***Ready2Ingest*** and ***Ready2Read*** phases using specific queries designed to classify the specific resource data existing in the target index.


_**Future Enhancements**_

We will be able to add the next phases to the Integration lifecycle - this sub-state can be configured using expected default behaviour and policies.

-  **Ingesting** - meaning the specific resource is continuing to ingest data
-  **Stale** - meaning the specific resource has stopped ingesting data

* * *

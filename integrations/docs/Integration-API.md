# Integration API

Integrations are a stateful bundle which will be stored inside a system `.integration` index which will reflect the integration's status during the different phases of its lifecycle.

---
## Integration UX Loading Lifecycle API 

### Flow Diagram
![Screenshot 2023-03-01 at 7 00 50 PM](https://user-images.githubusercontent.com/48943349/222320100-cac40749-9e5a-4e90-8ff2-386958adc06d.png)

### Load Integrations Repositoty
As part of the Integration Ux workflow, once the Integration plugin is loaded it should load all the available integrations that are bundled in the integration repo.

![Screenshot 2023-03-01 at 10 01 45 AM](https://user-images.githubusercontent.com/48943349/222223963-9c740f33-e156-4541-88cf-67d70131410f.png)


The API needed from the backend should be as follows:
Query:
```text
GET _integration/repository?filter=type:Logs&category:web,html
```
**Response**:
```jsoon
{
  "name": "nginx",
  "version": {
    "integ": "0.1.0",
    "schema": "1.0.0",
    "resource": "^1.23.0"
  },
  "description": "Nginx HTTP server collector",
  "Information":"file:///.../schema/logs/info.html",
  "identification": "instrumentationScope.attributes.identification",
  "categories": [
    "web","http"
  ],
  "collection":[
    {
      "logs": [{
        "info": "access logs",
        "input_type":"logfile",
        "dataset":"nginx.access",
        "labels" :["nginx","access"],
        "schema": "file:///.../schema/logs/access.json"
      },
        {
          "info": "error logs",
          "input_type":"logfile",
          "labels" :["nginx","error"],
          "dataset":"nginx.error",
        "schema": "file:///.../schema/logs/error.json"
        }]
    },
    {
      "metrics": [{
        "info": "status metrics",
        "input_type":"metrics",
        "dataset":"nginx.status",
        "labels" :["nginx","status"],
        "schema": "file:///.../schema/logs/status.json"
      }]
    }
  ],
  "repo": {
    "github": "https://github.com/opensearch-project/observability/tree/main/integrarions/nginx"
  }
}
```
The integration object schema is supported by both B/E & F/E for display & query to the correct fields
[Integration config schema](https://github.com/opensearch-project/observability/blob/9a22f061f568443651fe38d96c864901eed12340/schema/system/integration.schema)

---
The backend responsibilities :
- scan the Integration folder (on-load)
    - In the future this can also be loaded from a remote publish location

- load into cache each integration config file
- allow filtering on the registry API

The frontend responsibilities :
- enable shared info (html, images) resources in a CDN
- allow filtering for the integrations

![Screenshot 2023-03-01 at 10 13 41 AM](https://user-images.githubusercontent.com/48943349/222226930-1d9a684d-7f19-4aaf-b601-32bf7ce08920.png)

In addition, the following API is also supported
```
GET _integration/repository/$name
```
This call results in returning the cached integration config json object
It would be used for display and route the F/E for fetching the relevant page assets

![Screenshot 2023-03-01 at 10 13 58 AM](https://user-images.githubusercontent.com/48943349/222234012-68b134aa-72b6-4c72-84b4-bd2e5be2e4e5.png)

Once an integration was selected
![Screenshot 2023-03-01 at 10 38 50 AM](https://user-images.githubusercontent.com/48943349/222234188-017498c6-1d09-4d1f-84ee-5b5fa30fd9a4.png)

This page will require the F/E to fetch multiple assets from different locations
- images
- repository url
- license url
- html
- json schema objects for that integration content

**implement B/E :**
- registry loading & cache mechanism
- registry API
- registry filter API

**implement F/E :**
- integrations list display
- integrations filter display
- integration panel display
---


### Load Integration
As part of the Integration Ux workflow, once the Integration plugin has loaded and was selected by the user for loading into the system - the B/E should initiate the loading process and display the appropriate status to reflect the loading steps...

This phase follows the [previous step](https://github.com/opensearch-project/observability/issues/1441) in which the user has filtered the Integrations from the repository and selected a specific one to load into the system

### Integration Load workflow
![Screenshot 2023-03-01 at 7 17 31 PM](https://user-images.githubusercontent.com/48943349/222322253-e582b325-8b85-4edf-83ef-402abd54d837.png)


### Integration state machine
![Screen Shot 2023-02-01 at 6 30 24 PM](https://user-images.githubusercontent.com/48943349/222246887-2be6edc3-1c8a-433a-a154-325fec66d95b.png)

The API needed from the backend should be as follows:

Store API:
```
POST _integration/store/$instance_name
```
The $instance_name represents the specific name the integration was instanced with - for example, Nginx Integration can be a template for multiple Nginx instances
each representing different domain / aspect such as geographic.

```jsoon
{
  "name": "nginx",
  "version": {
    "integ": "0.1.0",
    "schema": "1.0.0",
    "resource": "^1.23.0"
  },
  "description": "Nginx HTTP server collector",
  "Information":"file:///.../schema/logs/info.html",
  "identification": "instrumentationScope.attributes.identification",
  "categories": [
    "web","http"
  ],
  "collection":[
    {
      "logs": [{
        "info": "access logs",
        "input_type":"logfile",
        "dataset":"nginx.access",
        "labels" :["nginx","access"],
        "schema": "file:///.../schema/logs/access.json"
      },
        {
          "info": "error logs",
          "input_type":"logfile",
          "labels" :["nginx","error"],
          "dataset":"nginx.error",
        "schema": "file:///.../schema/logs/error.json"
        }]
    },
    {
      "metrics": [{
        "info": "status metrics",
        "input_type":"metrics",
        "dataset":"nginx.status",
        "labels" :["nginx","status"],
        "schema": "file:///.../schema/logs/status.json"
      }]
    }
  ],
  "repo": {
    "github": "https://github.com/opensearch-project/observability/tree/main/integrarions/nginx"
  }
}
```
During the UX interaction with the user, user can update data-stream details shown here:
![Screenshot 2023-03-01 at 11 28 00 AM](https://user-images.githubusercontent.com/48943349/222274241-f8689084-5ff5-432f-bc06-83546ac255ec.png)

If the user keeps all the original data-stream naming convention (namespace and domain) the next phase would be the validation of the integration prior to loading all the assets.

### Data-Stream / index naming update
In case the user wants to update the data-stream / index naming details - he may do so using dedicated window.
Selection of the naming convention may also display available existing data-streams that are selectable if the user wants to choose from available ones and not creating new templates.

Once user changes the data-stream / index pattern - this will be reflected in every asset that has this attribute.
 - update the asset name (according to the `instance_name` field)
   - `${instance_name}-assetName.json`, this can also be extended using more configurable patterns such as `${instance_name}-{dataset}-{domain}-assetName.json`
 - update the index template's `index_pattern` field with the added pattern 
   - "index_patterns":` ["sso_logs-*-*"]` -> `["sso_logs-*-*", "myLogs-*"]`

#### Loading Integration

The integration has the next steps:

```text
 - LOADING
   - VALIDATION
     - UPLOAD
       - READY
```
Each step may result on one of two result
- `ready` - this will transition it to the next step
- `maintenance` - this will hold until user fix issues

Once the Integration instance was stored in the integration `store` index, it will have a `loading` status as displayed in the first image.

Next the integration instance will undergo a validation phase in which
 - assets will be validated with the schema to match fields to the mapping
 - assets containing index patterns will be validated any index with these pattern exists 
 - datasource will be validated to verify connection is accessible
 - mapping templates are verified to exist 

If any of the validation failed - the API (the call to `_integration/store/$instance_name` ) will return a status indicating 
the current state of the integration:

**Response**:
```json
{
  "instance": "nginx-prod",
  "integration-name": "nginx",
  "status": "maintenance",
  "issues": [
    { 
      "asset": "dashboard",
      "name": "nginx-prod-core",
      "url": "file:///.../nginx/integration/assets/nginx-prod-core.ndjson",
      "issue": [
        "field cloud.version is not present in mapping sso_log-nginx-prod"
      ]
    }
  ]
}
```
The next screen shows the maintenance issues:

![todo](...)

Once all the issues are manually resolved by the User, the UX can continue the loading process by the next API
`PUT _integration/store/$instance_name/activate`

This API attempts to move the state of the integration to `Ready` and returns the result status of this call.

**Response**:
```json
{
  "instance": "nginx-prod",
  "integration-name": "nginx",
  "status": "loading"
}
```

#### Load Assets

The loading assets phase will use the existing bulk load api for all the existing assets of the integration
 - Visualizations
 - Dashboards
 - SaveQueries
 - MappingTemplates

The User can chery pick specific assets to load and use the next UX window for this purpose

![todo](...)

Using the next API
`PUT _integration/store/$instance_name/load`
```json
{
  "instance": "nginx-prod",
  "integration-name": "nginx",
  "assets" :{
    "dashboards": ["nginx-prod-core.ndjson"],
    "savedQueries": ["AvgQueriesPerDayFilter.json"]
  }
}
```

Once these steps are completed, the status of the integration would become `Ready` and the Ux can pull this info using status API :

`GET _integration/store/$instance_name/status`

**Response**:
```json
{
  "instance": "nginx-prod",
  "integration-name": "nginx",
  "status": "ready"
}
```

---

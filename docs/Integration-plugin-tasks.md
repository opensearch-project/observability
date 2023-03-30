# Integration Loading Flow

## Integration plugin start 
The integration plugins is currently responsible for the next tasks:
 - Catalog registration
   - Loading catalog schema templates
 - Integration Loading
   - Integration state maintenance

### Catalog Registration 

During the loading of the Integration Plugin it will go over all the [catalog schemas](../../schema/README.md) and creates the appropriate 
template mapping for each catalog schema entity. This will allow the future Integration to be validated to the schema catalog they are associated with.

**For example** - the [Observability](../../schema/observability) catalog will eventually be registered with the next mapping templates
 - [Traces](../../schema/observability/traces/traces.mapping)
 - [Logs](../../schema/observability/logs/logs.mapping)
 - [Metrics](../../schema/observability/metrics/metrics.mapping)

These mapping specify a backed `data-stream` index pattern they conform with [Naming Pattern](observability/Naming-convention.md).

**API**
The catalog API can be queries according to the next fields:
 - type
 - catalog
 - category
 - version

`GET _integration/catalog?filter=type:Logs&catalog:Observability&category:web`

 This call will result with the appropriate index_template IDs corresponding to the query:

```json
{
  "templates": ["ss4o_logs-template","http-template"],
  "catalog":[...],
  "category": [...],
  "version": [...]
}
```

Using the template names one can access the template directly using the `_index_template` URL:

`GET _index_template/ss4o_logs-template`

---

### Integrations registry

During the Integration plugin loading, it will scan the Integration folder (or any resource that functions as the integration repository ) and load each repository [config file](../../schema/system/integration.schema)
into an in memory cache / index allowing to query and filter according to the different integration attributes.

### External Integrations' registry loading
"External integrations" (ones that are not packaged in the original integrations bundle) can be published by the user.
These "external" integrations are packages as a zip bundle and contain all the relevant resources including:
 - `images`
 - `assets`
 - `documents`
 - `icons`

Once the user has uploaded this zip bundle using the `POST /repository` API, this bundle will be maintained inside the repository index (Blob file or extracted bundle).

In addition to the repository index, the Integration may use a repository cache that will allow the F/E to retrieve additional content residing in the integration folder directly ( images, html pages, URL's ) 

#### Flow Diagram
![flow-diagram-](https://user-images.githubusercontent.com/48943349/222320100-cac40749-9e5a-4e90-8ff2-386958adc06d.png)

Once the Integration has completed loading, it will allow to query the cache content using the following REST api:
 - Filter integration according to its attributes:
```
GET _integration/repository?filter=type:Logs&category:web,html
```
 - results a list of integrations

- Query integration by name:
```
GET _integration/repository/$template_name
```
- results a single integration


### Integrations Loading

Once the user has selected which integration he want's to load, her will call the next API:
```
PUT _integration/store/$instance_name 
```
The body of the request will be the integration config file. It is also possible that during the user interaction he would like to update the index naming pattern that the integration instance will use. 
It will be reflected in the appropriate section of the integration config json

_For example the next observability integration:_
```json
  ...
  "collection":[
    {
      "logs": [{
        "info": "access logs",
        "input_type":"logfile",  
        "dataset":"nginx.access", <<- subject to user changes
        "namespace": "prod",<<- subject to user changes
        "labels" :["nginx","access"],
        "schema": "file:///.../schema/logs/access.json"
      },
    ...
```
### Loading Step

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


After the `_integration/store/$instance_name` API was called the next steps will occur: 

 - The integration object will be inserted into the `.integration` index with a `LOADING` status
   - During this step the integration engine will rename all the assets names according to the user's given name `${instance_name}-assetName.json`
     - `${instance_name}-assetName.json`, this can also be extended using more configurable patterns such as `${instance_name}-{dataset}-{namespace}-assetName.json`
   - update the index template's `index_pattern` field with the added pattern
       - "index_patterns":` ["ss4o_logs-*-*"]` -> `["sso_logs-*-*", "myLogs-*"]`
   - if user selected custom index with proprietary fields -  mapping must be called ([field aliasing](Integration-fields-mapping.md))
---
   - **Success**: If the user changes the data-stream / index naming pattern - this will also be changes in every assets that supports such capability.
   - **Fail**:    If the validation fails the integration status would be updated to `maintenance` and an appropriate response should reflect the issues.
   
 
   - **Response**:
   ```json
   {
     "instance": "nginx-prod",
     "integration-name": "nginx",
     "status": "maintenance",
     "phase": "LOADING",
     "issues": []
   }
   ```

 - Next the integration will undergo a validation phase -  marked with a `VALIDATION` status
      - assets will be validated with the schema to match fields to the mapping
      - assets containing index patterns will be validated any index with these pattern exists
      - datasource will be validated to verify connection is accessible
      - mapping templates are verified to exist
---
   - **Success**: If the validation succeeds the integration status would be updated
   - **Fail**:   If the validation fails the integration status would be updated and the next response would return.
  

   - **Response**:
     ```json
     {
       "instance": "nginx-prod",
       "integration-name": "nginx",
       "status": "maintenance",
       "phase": "VALIDATION",
       "issues": [
         { 
           "asset": "dashboard",
           "name": "nginx-prod-core",
           "url": "file:///.../nginx/integration/assets/nginx-prod-core.ndjson",
           "issue": [
             "field cloud.version is not present in mapping ss4o_log-nginx-prod"
           ]
         }
       ]
     }
     ```


 - The assets are being uploaded to the objects store index, if the users cherry picket specific assets to upload they will be loaded as requested.
---
 - **Success**: If the upload succeeds the integration status would be updated and the user will get the success status response
   - **Response:**
    ```json
      {
         "instance": "nginx-prod",
         "integration-name": "nginx",
         "phase": "UPLOAD",
         "status": "ready"
      }
    ```
   
 - **Fail**: If the bulk upload fails the integration status would be updated and the next response would return.
   - **Response**:
   ```json
   {
     "instance": "nginx-prod",
     "integration-name": "nginx",
     "status": "maintenance",
     "phase": "VALIDATION",
     "issues": [
       { 
         "asset": "dashboard",
         "name": "nginx-prod-core",
         "url": "file:///.../nginx/integration/assets/nginx-prod-core.ndjson",
         "issue": [
           "field cloud.version is not present in mapping ss4o_log-nginx-prod"
         ]
       }
     ]
   }
   ```
---

### Additional supported API:

Status API for Integration `_integration/store/$instance_name/status` will result in :
- **Response:**
   ```json
   {
       "instance": "nginx-prod",
       "integration-name": "nginx",
       "phase": "UPLOAD",
       "status": "ready"
   }
   ```


Activate / deactivate integration `_integration/store/$instance_name/activate` / `_integration/store/$instance_name/disable` will result in status :
- **Response:**
   ```json
   {
       "instance": "nginx-prod",
       "integration-name": "nginx",
       "phase": "DISABLE",
       "status": "ready"
   }
   ```
#### Deactivation
   The result of deactivating an integration would cause all the assets to disable.

#### Activation
   The result of activation would depend on the existing status & phase of the Integration
    - if not in is ready status - will try to continue the next phases.
    - if is ready status - will try to update status to disabled



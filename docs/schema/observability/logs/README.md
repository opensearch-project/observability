# Logs Schema Support

Observability refers to the ability to monitor and diagnose systems and applications in real-time, in order to understand how they are behaving and identify potential issues.
logs serve as a primary source of information for understanding and debugging complex systems.
Logs provide a record of events, errors, and performance that help developers and administrators identify and resolve issues, monitor system behavior, and improve reliability.

Logs can also be used to gain insight into user behavior and facilitate auditing and compliance.
By analyzing logs, one can detect patterns, anomalies, and correlations that can inform decisions and facilitate problem-solving. 
Logs help to ensure the visibility, reliability, and stability of systems.

## Details
The next section provides the Simple Schema for Observability support which conforms with the OTEL specification.

- logs.mapping presents the template mapping for creating the Simple Schema for Observability index
- logs.schema presents the json schema validation for verification of a metrics document conforms to the mapping structure

## Logs
See [OTEL Logs convention](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/logs/data-model.md)
See [OTEL logs protobuf](https://github.com/open-telemetry/opentelemetry-proto/tree/main/opentelemetry/proto/logs/v1)
See [ECS logs](https://github.com/elastic/ecs)

Simple Schema for Observability conforms with OTEL logs protocol and also was greatly inspired from the Elastic-Common-Schema schema.

Simple Schema for Observability defines the next data model:

## General Fields
     
### Event Fields
Within a particular domain, the ```event.name``` attribute identifies the event. Events with same domain and name are structurally similar to one another.
For example, some domains could have well-defined schema for their events based on event names. (OTEL driven)

`event.kind` gives high-level information about what type of information the event contains, without being specific to the contents of the event.(ECS driven)
**Possible values**
 - **alert** -  indicates an alerting type event which can be triggered by any alerting mechanism
 - **enrichment** - indicates an enriched typed event that adds additional context to the original event
 - **event**   -  the default type of the event
 - **metric**  -  this indicated the event describes a numeric measurement

The `event.domain` attribute is used to logically separate events from different systems. For example, to record Events from `browser` apps, `mobile` apps and `Kubernetes`, we could use browser, device and k8s as the domain for their Events.
This provides a clean separation of semantics for events in each of the domains. (OTEL driven)

`event.category` gives categorical-level information about what type of information the event contains, this field is an array. (ECS driven)
**Possible values**
   - authentication - events are of a challenge and response process by any system that has such responsibilities 
   - configuration  - events related to the configuration of a system or an application
   - database       - events that are generated as part of the storage system (SQL RDBMS and such)
   - driver         - events related to the O/S device driver
   - email          - events related to email messages, email attachments and such
   - file           - events related to the fact that it has been created on, or has existed on a filesystem
   - host           - events related to host inventory or lifecycle events
   - iam            - Identity & access Management logs types 
   - network        - events relating of network activities (connection / traffic and such)
   - package        - events indication of software packages installation of hosts
   - process        - events related to O/S process information
   - registry       - events related to O/S registry events
   - session        - events related to a persistent connection between different network components
   - web            - events related to web server activity

`event.category` corresponds with  `event.domain`

`event.type` gives a fine grain details of the event's category including the phase in-which the field is part of.
This will allow proper categorization of some events that fall in multiple event types, this field is an array. (ECS driven)

**Possible values**
  - access   - indication that this event has accesses some resource
  - admin    - indication that this event is related to the admin context
  - allowed  - indication that this event was subsequently allowed by some authority system
  - change   - indication that this event is related to something that has changed
  - connection - indication that this event is related to network traffic with indication of connection activity
  - creation   - indication that this event is related to resources being created
  - deletion   - indication that this event is related to resources being deleted
  - denied     - indication that this event is related to resources being denied access
  - error      - indication of an error related event
  - group      - indication of events that are related to group objects
  - info       - indication of events which are informative without other distinct classification 
  - installation   - indication that this event is related to resources being installed 
  - protocol   - indicate that the event is related to specific knowledge of protocol info
  - end        - indicate that te event is related to some termination state
  - start      - indicate that te event is related to some initiation state
  - user       - indicate that the event is related to specific knowledge a user resource


`event.result` gives a success or a failure indication from the perspective of the entity that produced the event. (ECS driven)

**Possible values**

 - failure
 - success
 - pending
 - undetermined


#### Exception Fields
This field encapsulated the exception that should appear under the event section `event.exception` (OTEL driven)

 - `message`: The exception message.
 - `stacktrace`: A stacktrace as a string in the natural representation for the language runtime. The representation is to be determined and documented by each language SIG.
 - `type`: The type of the exception (its fully-qualified class name, if applicable). The dynamic type of the exception should be preferred over the static type in languages that support it.

---

### Overview

In observability, Logs are typically unstructured data that is generated by applications or systems as a record of events or messages.
Logs can contain any information that the emitting application or system wants to include, and they often contain free-form text rather than structured data.
This makes logs difficult to process and analyze automatically, but it also provides a lot of flexibility and versatility in terms of what information can be captured.

According to [ECS](https://github.com/elastic/ecs) and the most recent (experimental) [OTEL](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/trace/semantic_conventions) definitions, we formalized a unified
log schema. This schema can be used for working with a well-structured set of typed logs arriving from categorical sources.
These sources are expected to report information in a specific way that will simplify future correlations and consolidate similar concerns.

### data-stream
[data-stream](https://opensearch.org/docs/latest/opensearch/data-streams/) Data streams simplify this process and enforce a setup that best suits time-series data, such as being designed primarily for append-only data and ensuring that each document has a timestamp field.
A data stream is internally composed of multiple backing indices. Search requests are routed to all the backing indices, while indexing requests are routed to the latest write index.

As part of the Observability naming scheme, the value of the data stream fields combine to the name of the actual data stream :

`{data_stream.type}-{data_stream.dataset}-{data_stream.namespace}`.
This means the fields can only contain characters that are valid as part of names of data streams.

 - **type** conforms to one of the supported Observability signals (Traces, Logs, Metrics, Alerts)
 - **dataset** user defined field that can mainly be utilized for describing the origin of the signal
 - **namespace** user custom field that can be used to describe any customer domain specific classification

#### Timestamp field
As part of the data-stream definition the `@timestamp` is  mandatory, if the field is not present to begin with use `ObservedTimestamp` as value for this field

### Instrumentation scope
This is a logical unit of the application with which the emitted telemetry can be associated. It is typically the developer’s choice to decide what denotes a reasonable instrumentation scope.
The most common approach is to use the instrumentation library as the scope, however other scopes are also common, e.g. a module, a package, or a class can be chosen as the instrumentation scope.

The instrumentation scope may have zero or more additional attributes that provide additional information about the scope. As an example the field
`instrumentationScope.attributes.identification` is presented will be used to determine the resource origin of the signal and can be used to filter accordingly

For Example - in the sample [nginx_access-log.json](sample/nginx_access-log.json) this value equals to `nginx` indicating the signal source. 

This field is expected to appear in any future integration or Observability resources into OpenSearch.


### Logs Components

### HTTP 

_Inspired by [ECS - http](https://www.elastic.co/guide/en/ecs/current/ecs-http.html), [OTEL - http](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/http.md)_
 - [Http component ](http.md)


### Communication
Includes client / server part of the communication

 **_Inspired by_** :
 - [ECS - client](https://www.elastic.co/guide/en/ecs/8.6/ecs-client.html)
 - [ECS - Server](https://www.elastic.co/guide/en/ecs/8.6/ecs-server.html#ecs-server)
 - [ECS - Source](https://www.elastic.co/guide/en/ecs/8.6/ecs-source.html)
 - [ECS - Destination](https://www.elastic.co/guide/en/ecs/8.6/ecs-destination.html)
 - [OTEL - network](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/http.md)

- [Communication component ](communication.md)

### Cloud
Includes cloud field set describing a standardized structured representation of cloud infrastructure metadata

**_Inspired by_** :
- [ECS - cloud](https://www.elastic.co/guide/en/ecs/8.6/ecs-cloud.html)

- [Cloud component ](cloud.md)

 
### Container
Includes container field set describing a structured and comprehensive representation of container-related data

**_Inspired by_** :
- [ECS - container](https://www.elastic.co/guide/en/ecs/8.6/ecs-container.html)

- [Container component ](container.md)

 
---

```text

 ___________________
 | _______________ |
 | |XXXXXXXXXXXXX| |
 | |XXXXXXXXXXXXX| |
 | |XXXXXXXXXXXXX| |
 | |XXXXXXXXXXXXX| |
 | |XXXXXXXXXXXXX| |
 |_________________|
     _[_______]_
  ___[___________]___
 |         [_____] []|__
 |         [_____] []|  \__
 L___________________J      \  \___\/
  ___________________       /\
  /###################\    (__)

```

---

### References
 - https://github.com/opensearch-project/observability/issues/1413
 - https://github.com/opensearch-project/observability/issues/1405
 - https://github.com/opensearch-project/observability/issues/1411
 - https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/logs/semantic_conventions/events.md
 - https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/http.md
 - https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/http.md
 - https://www.elastic.co/guide/en/ecs/8.6/ecs-destination.html
 - https://www.elastic.co/guide/en/ecs/8.6/ecs-client.html
 - https://www.elastic.co/guide/en/ecs/8.6/ecs-server.html
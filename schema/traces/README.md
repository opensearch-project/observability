# Traces Schema Support
Observability in the software industry is the ability to monitor and diagnose systems and applications in real-time, in order to understand how they are behaving and identify potential issues.
Traces are a critical component of observability, providing detailed information about the flow of requests through a system, including timing information and any relevant contextual data.

The importance of supporting traces schema lies in the fact that it enables better analysis and understanding of system behavior.
A structured schema provides a clear, consistent format for traces, making it easier for observability tools to process and aggregate the data.
This in turn makes it easier for engineers to understand the performance and behavior of their systems, and quickly identify potential issues.

When traces are unstructured, it can be difficult for observability tools to extract meaningful information from them - For example, if the timing information for a particular request is not consistently represented in the same format,
it can be difficult to compare and analyze performance data over time. Similarly, if contextual data is not consistently recorded, it can be difficult to understand the context in which a particular request was executed.

With a structured schema in place, observability tools can automatically extract and aggregate data, making it easier to understand system behavior at a high level.
This can help teams quickly identify performance bottlenecks, track the root cause of errors, and resolve issues more efficiently.

## Details
The next section provides the Simple Schema for Observability support which conforms with the OTEL specification.

- traces.mapping presents the template mapping for creating the Simple Schema for Observability index
- traces.schema presents the json schema validation for verification of a trace document conforms to the mapping structure

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
**Note** -  `@timestamp` value is the actual signal happening time and `observedTimestamp` is the time the exporter reads the actual event record.

### Instrumentation scope
This is a logical unit of the application with which the emitted telemetry can be associated. It is typically the developer’s choice to decide what denotes a reasonable instrumentation scope.
The most common approach is to use the instrumentation library as the scope, however other scopes are also common, e.g. a module, a package, or a class can be chosen as the instrumentation scope.

The instrumentation scope may have zero or more additional attributes that provide additional information about the scope. As an example the field
`instrumentationScope.attributes.identification` is presented will be used to determine the resource origin of the signal and can be used to filter accordingly

## Traces
see [OTEL traces convention](https://github.com/open-telemetry/opentelemetry-specification/tree/main/semantic_conventions/trace)

Traces are defined implicitly by their Spans - In particular, a Trace can be thought of as a directed acyclic graph (DAG) of Spans, where the edges between Spans are defined as parent/child relationship.

## Spans
A span represents an operation within a transaction. Each Span encapsulates the following state:
Observability in the software industry is the ability to monitor and diagnose systems and applications in real-time, in order to understand how they are behaving and identify potential issues.
Traces are a critical component of observability, providing detailed information about the flow of requests through a system, including timing information and any relevant contextual data.

The importance of supporting traces schema lies in the fact that it enables better analysis and understanding of system behavior.
A structured schema provides a clear, consistent format for traces, making it easier for observability tools to process and aggregate the data.
This in turn makes it easier for engineers to understand the performance and behavior of their systems, and quickly identify potential issues.

When traces are unstructured, it can be difficult for observability tools to extract meaningful information from them - For example, if the timing information for a particular request is not consistently represented in the same format,
it can be difficult to compare and analyze performance data over time. Similarly, if contextual data is not consistently recorded, it can be difficult to understand the context in which a particular request was executed.

With a structured schema in place, observability tools can automatically extract and aggregate data, making it easier to understand system behavior at a high level.
This can help teams quickly identify performance bottlenecks, track the root cause of errors, and resolve issues more efficiently.

## Details
The next section provides the Simple Schema for Observability support which conforms with the OTEL specification.

- traces.mapping presents the template mapping for creating the Simple Schema for Observability index
- traces.schema presents the json schema validation for verification of a trace document conforms to the mapping structure

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
**Note** -  `@timestamp` value is the actual signal happening time and `observedTimestamp` is the time the exporter reads the actual event record.

### Instrumentation scope
This is a logical unit of the application with which the emitted telemetry can be associated. It is typically the developer’s choice to decide what denotes a reasonable instrumentation scope.
The most common approach is to use the instrumentation library as the scope, however other scopes are also common, e.g. a module, a package, or a class can be chosen as the instrumentation scope.

The instrumentation scope may have zero or more additional attributes that provide additional information about the scope. As an example the field
`instrumentationScope.attributes.identification` is presented will be used to determine the resource origin of the signal and can be used to filter accordingly

## Traces
see [OTEL traces convention](https://github.com/open-telemetry/opentelemetry-specification/tree/main/semantic_conventions/trace)

Traces are defined implicitly by their Spans - In particular, a Trace can be thought of as a directed acyclic graph (DAG) of Spans, where the edges between Spans are defined as parent/child relationship.

## Spans
A span represents an operation within a transaction. Each Span encapsulates the following state:

* An operation name
* start and finish timestamp
* Attributes list of key-value pairs.
* Set of Events, each of which is itself a tuple (timestamp, name, Attributes)
* Parent's Span identifier.
* Links to causally-related Spans (via the SpanContext of those related Spans).
* SpanContext information required to reference a Span.

### SpanContext
Represents all the information that identifies Span in the Trace and is propagated to child Spans and across process boundaries.
A **SpanContext** contains the tracing identifiers and the options that are propagated from parent to child Spans.

* `TraceId`  - It is worldwide unique with practically sufficient probability by being made as 16 randomly generated bytes - used to group all spans for a specific trace together across all processes.
* `SpanId`  -  It is the identifier for a span, globally unique with practically sufficient probability by being made as 8 randomly generated bytes. When passed to a child Span this identifier becomes the parent span id for the child Span.
* `Tracestate` - carries tracing-system specific context in a list of key value pairs . Trace-state allows different vendors propagate additional information and inter-operate with their legacy Id formats. For more details see this.

Additional fields can be supported via the Attributes key/value store see [traces](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/semantic_conventions/README.md)

### Structure
The default fields that are supported by the traces are
- **TraceId**  : It is worldwide unique with practically sufficient probability by being made as 16 randomly generated bytes - used to group all spans for a specific trace together across all processes.
- **SpanId**   : It is the identifier for a span, globally unique with practically sufficient probability by being made as 8 randomly generated bytes. When passed to a child Span this identifier becomes the parent span id for the child Span.
- **ParentId** : It is the identifier for a span's parent span.
- **TraceState** : carries tracing-system specific context in a list of key value pairs. Tracestate allows different vendors propagate additional information and inter-operate with their legacy Id formats.

- **Name**   :  String representing the span's name
- **Kind**
  - SpanKind.CLIENT
  - SpanKind.SERVER
  - SpanKind.CONSUMER
  - SpanKind.PRODUCER
  - SpanKind.INTERNAL

- **StartTime** : Start time of the event
- **EndTime**   : End time of the event
- **Attributes**
  - An Attribute is a key-value pair, which has the following structure  [Attributes](https://github.com/open-telemetry/opentelemetry-specification/blob/b00980832b4b823155001df56dbf9203d4e53f98/specification/common/README.md#attribute)

- **DroppedAttributesCount** : Integer counting the dropped attributes
- **Events**     : A set of the next tuples (timestamp, name, Attributes)
- **DroppedEventsCount** : Integer counting the dropped events
- **Links**  : links to causally-related Spans
- **DroppedLinksCount** : Integer counting the dropped links
- **Status** -

  _status code is the int value
  status message is the text representation_

  - `UNSET = 0` : The default status.
  - `OK = 1`     : The operation has been validated by an Application developer or Operator to have completed successfully.
  - `ERROR = 2`  : The operation contains an error.
# Metrics Schema Support

Observability refers to the ability to monitor and diagnose systems and applications in real-time, in order to understand how they are behaving and identify potential issues.
Metrics present a critical component of observability, providing quantifiable data about the performance and behavior of systems and applications.
The importance of supporting metrics structured schema lies in the fact that it enables better analysis and understanding of system behavior.

A structured schema provides a clear, consistent format, making it easier for observability tools to process and aggregate the data.
This in turn makes it easier for engineers to understand the performance and behavior of their systems, and quickly identify potential issues.

When metrics are unstructured, it can be difficult for observability tools to extract meaningful information from them. 
For example, if the data for a particular metric is not consistently recorded in the same format, it can be difficult to compare and analyze performance data over time.
Similarly, if metrics are not consistently named or categorized, it can be difficult to understand their context and significance.

With a structured schema in place, observability tools can automatically extract and aggregate data, making it easier to understand system behavior at a high level. 
This can help teams quickly identify performance bottlenecks, track changes in system behavior over time, and make informed decisions about system performance optimization.

## Details
The next section provides the Simple Schema for Observability support which conforms with the OTEL specification.

- metrics.mapping presents the template mapping for creating the Simple Schema for Observability index
- metrics.schema presents the json schema validation for verification of a metrics document conforms to the mapping structure

## Metrics
see [OTEL metrics convention](https://opentelemetry.io/docs/reference/specification/metrics/)
see [OTEL metrics protobuf](https://github.com/open-telemetry/opentelemetry-proto/tree/main/opentelemetry/proto/metrics/v1)

Simple Schema for Observability conforms with OTEL metrics protocol which defines the next data model:

#### Timestamp field
As part of the data-stream definition the `@timestamp` is mandatory, if the field is not present in the original signal populate this field using `ObservedTimestamp` as value.

### Instrumentation scope
This is a logical unit of the application with which the emitted telemetry can be associated. It is typically the developer’s choice to decide what denotes a reasonable instrumentation scope.
The most common approach is to use the instrumentation library as the scope, however other scopes are also common, e.g. a module, a package, or a class can be chosen as the instrumentation scope.

The instrumentation scope may have zero or more additional attributes that provide additional information about the scope. As an example the field
`instrumentationScope.attributes.identification` is presented will be used to determine the resource origin of the signal and can be used to filter accordingly

### Overview
Metrics are a specific kind of telemetry data. They represent a snapshot of the current state for a set of data.
Metrics are distinct from logs or events, which focus on records or information about individual events.

Metrics expresses all system states as numerical values; counts, current values and such.
Metrics tend to aggregate data temporally, while this can lose information, the reduction in overhead is an engineering trade-off commonly chosen in many modern monitoring systems.

Time series are a record of changing information over time. While time series can support arbitrary strings or binary data, only numeric data is in our scope.
Common examples of metric time series would be network interface counters, device temperatures, BGP connection states, and alert states.

### Metric streams
In a similar way to the data_stream attribute field representing the category of a trace, the metric streams are grouped into individual Metric objects, identified by:

 - The originating Resource attributes
 - The instrumentation Scope (e.g., instrumentation library name, version)
 - The metric stream’s name

### Metrics
Metric object is defined by the following properties:

 - The data point type (e.g. Sum, Gauge, Histogram ExponentialHistogram, Summary)
 - The metric stream’s unit
 - The data point properties, where applicable: AggregationTemporality, Monotonic

The description is also present in the metrics object but is not part of the identification fields
_- The metric stream’s description_


### Data Types

**Values:** Metric values in MUST be either floating points or integers.

**Attributes:** Labels are key-value pairs consisting of string as keys and Any type as values (strings, object, array) 

**MetricPoint:** Each MetricPoint consists of a set of values, depending on the MetricFamily type.

**Metric**  Metrics are defined by a unique attributes (dimensions) within a MetricFamily.

---

Metrics MUST contain a list of one or more MetricPoints. Metrics with the same name for a given MetricFamily SHOULD have the same set of label names in their LabelSet.

* Metrics.name: String value representation of the matrix purpose
* Metrics.type: Valid values are  "gauge", "counter","histogram", and "summary".
* Metrics.Unit: specifies MetricFamily units.

## Metric Types

### Gauge
Gauges are current measurements, such as bytes of memory currently used or the number of items in a queue. For gauges the absolute value is what is of interest to a user.
**_A MetricPoint in a Metric with the type gauge MUST have a single value._**
Gauges MAY increase, decrease, or stay constant over time. Even if they only ever go in one direction, they might still be gauges and not counters.

### Counter
Counters measure discrete events. Common examples are the number of HTTP requests received, CPU seconds spent, or bytes sent. For counters how quickly they are increasing over time is what is of interest to a user.
**_A MetricPoint in a Metric with the type Counter MUST have one value called Total._**

### Histogram / Exponential-Histogram
Histograms measure distributions of discrete events. Common examples are the latency of HTTP requests, function runtimes, or I/O request sizes.
**_A Histogram MetricPoint MUST contain at least one bucket_**, and SHOULD contain Sum, and Created values. Every bucket MUST have a threshold and a value.

### Summary
Summaries also measure distributions of discrete events and MAY be used when Histograms are too expensive and/or an average event size is sufficient.
**_A Summary MetricPoint MAY consist of a Count, Sum, Created, and a set of quantiles._**
Semantically, Count and Sum values are counters & MUST be an integer.



# Metrics Schema Support
The next section provides the Simple Schema for Observability support which conforms with the OTEL specification.

- metrics.mapping presents the template mapping for creating the Simple Schema for Observability index
- metrics.schema presents the json schema validation for verification of a metrics document conforms to the mapping structure

## Metrics
see [OTEL metrics convention](https://opentelemetry.io/docs/reference/specification/metrics/)
see [OTEL metrics protobuf](https://github.com/open-telemetry/opentelemetry-proto/tree/main/opentelemetry/proto/metrics/v1)

Simple Schema for Observability conforms with OTEL metrics protocol which defines the next data model:

### Overview
Metrics are a specific kind of telemetry data. They represent a snapshot of the current state for a set of data.
Metrics are distinct from logs or events, which focus on records or information about individual events.

Metrics expresses all system states as numerical values; counts, current values, enumerations, and boolean states being common examples.
Metrics tend to aggregate data temporally, while this can lose information, the reduction in overhead is an engineering trade-off commonly chosen in many modern monitoring systems.

Time series are a record of changing information over time. While time series can support arbitrary strings or binary data, only numeric data is in our scope.
Common examples of metric time series would be network interface counters, device temperatures, BGP connection states, and alert states.

### Metric streams
In a similar way to the data-flow attribute field representing the category of a trace, the metric streams are grouped into individual Metric objects, identified by:

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

**Labels:** Labels are key-value pairs consisting of strings

**LabelSet:** A LabelSet MUST consist of list of unique Labels

**MetricPoint:** Each MetricPoint consists of a set of values, depending on the MetricFamily type.

**Exemplars:** Exemplars are references to data outside of the MetricSet (traceId for example)

**MetricFamily:** A MetricFamily MUST have a name, type, and unit metadata. Every Metric within a MetricFamily MUST have a unique LabelSet.

**Metric**  Metrics are defined by a unique LabelSet within a MetricFamily.


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

### Histogram
Histograms measure distributions of discrete events. Common examples are the latency of HTTP requests, function runtimes, or I/O request sizes.
**_A Histogram MetricPoint MUST contain at least one bucket_**, and SHOULD contain Sum, and Created values. Every bucket MUST have a threshold and a value.

### Summary
Summaries also measure distributions of discrete events and MAY be used when Histograms are too expensive and/or an average event size is sufficient.
**_A Summary MetricPoint MAY consist of a Count, Sum, Created, and a set of quantiles._**
Semantically, Count and Sum values are counters & MUST be an integer.



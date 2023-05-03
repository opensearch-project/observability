# Log Field Set

This document provides a summary of the log field set in the Observability catalog. It covers field names, types, and descriptions, as well as fields suitable for KPI monitoring and alerts.

## Fields and Types

| Field Name                      | Type    | Description |
| ------------------------------- | ------- | ----------- |
| `severity.number`               | long    | Severity number associated with the log entry. |
| `severity.text`                 | keyword | Severity text associated with the log entry. |
| `attributes.data_stream.*`      | keyword | Data stream attributes for the log entry. |
| `body`                          | text    | Log message content. |
| `@timestamp`                    | date    | Log entry timestamp. |
| `observedTimestamp`             | date    | Observed timestamp of the log entry. |
| `observerTime`                  | alias   | Alias for `observedTimestamp`. |
| `traceId`                       | keyword | Trace ID associated with the log entry. |
| `spanId`                        | keyword | Span ID associated with the log entry. |
| `schemaUrl`                     | keyword | URL of the schema used for the log entry. |
| `instrumentationScope.*`        | keyword | Instrumentation scope information for the log entry. |
| `event.*`                       | keyword | Event information associated with the log entry. |

## Fields for KPI Monitoring and Alerts

The following fields are suitable for monitoring KPIs and setting up alerts when exhibiting abnormal behavior:

- `severity.number`: Monitor logs with high severity levels.
- `event.result`: Track logs with specific results, such as errors or successes.
- `event.exception.message`: Monitor logs with specific exception messages.
- `attributes.data_stream.dataset`: Track logs from specific data stream datasets.


- [Logs.mapping](../../../../src/main/resources/schema/observability/logs/logs.mapping)
- [Logs.schema](../../../../src/main/resources/schema/observability/logs/logs.schema)
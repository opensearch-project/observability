# Observability Category: Communication Log Fields

The communication fields provide users with a comprehensive overview of network communication events, enabling efficient monitoring, analysis, and management of data flow between sources and destinations across various systems and environments.

## Field Names and Types

| Field Name                   | Type    |
|------------------------------|---------|
| communication.sock.family    | keyword |
| communication.source.address | text    |
| communication.source.domain  | text    |
| communication.source.bytes   | long    |
| communication.source.ip      | ip      |
| communication.source.port    | long    |
| communication.source.mac     | keyword |
| communication.source.packets | long    |
| communication.destination.address | text  |
| communication.destination.domain  | text  |
| communication.destination.bytes   | long  |
| communication.destination.ip      | ip    |
| communication.destination.port    | long  |
| communication.destination.mac     | keyword |
| communication.destination.packets | long  |

## Field Explanations

- **communication.sock.family**: The socket family of the communication event (e.g., AF_INET, AF_INET6).
- **communication.source.address**: The source address of the communication event.
- **communication.source.domain**: The source domain of the communication event.
- **communication.source.bytes**: The number of bytes sent by the source during the communication event.
- **communication.source.ip**: The source IP address of the communication event.
- **communication.source.port**: The source port of the communication event.
- **communication.source.mac**: The source MAC address of the communication event.
- **communication.source.packets**: The number of packets sent by the source during the communication event.
- **communication.destination.address**: The destination address of the communication event.
- **communication.destination.domain**: The destination domain of the communication event.
- **communication.destination.bytes**: The number of bytes received by the destination during the communication event.
- **communication.destination.ip**: The destination IP address of the communication event.
- **communication.destination.port**: The destination port of the communication event.
- **communication.destination.mac**: The destination MAC address of the communication event.
- **communication.destination.packets**: The number of packets received by the destination during the communication event.

## Fields for KPI Monitoring and Alerts

The following fields are suitable for creating KPIs to monitor and alert when exhibiting abnormal behavior:

- **communication.source.bytes**: Monitoring the number of bytes sent by the source can help identify potential data leaks, excessive bandwidth usage, or other network-related issues.
- **communication.destination.bytes**: Monitoring the number of bytes received by the destination can help identify potential data leaks, excessive bandwidth usage, or other network-related issues.
- **communication.destination.ip**: Monitoring the destination ip can be used to detect outgoing requests crossing the DMZ or the secured network boundaries
- **communication.source.ip**: Monitoring the source ip can be used to detect incoming requests coming outside the DMZ or the secured network boundaries

By using these fields, users can efficiently monitor, analyze, and manage network communication events across various systems and environments.


- [Communication.mapping](../../../../src/main/resources/schema/observability/logs/communication.mapping)
- [Communication.schema](../../../../src/main/resources/schema/observability/logs/communication.schema)
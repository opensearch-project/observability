# Observability Category: Container Log Fields

This field set described a structured and comprehensive representation of container-related data, enabling efficient monitoring, analysis, and management of container resources and performance across various container platforms and environments.

## Field Names and Types

| Field Name                | Type    |
|---------------------------|---------|
| container.image.name      | keyword |
| container.image.tag       | keyword |
| container.image.hash      | keyword |
| container.id              | keyword |
| container.name            | keyword |
| container.labels          | keyword |
| container.runtime         | keyword |
| container.memory.usage    | float   |
| container.network.ingress.bytes | long  |
| container.network.egress.bytes  | long  |
| container.cpu.usage       | float   |
| container.disk.read.bytes | long    |
| container.disk.write.bytes| long    |

## Field Explanations

- **container.image.name**: The name of the container image.
- **container.image.tag**: The tag of the container image.
- **container.image.hash**: The hash of the container image.
- **container.id**: The unique identifier of the container.
- **container.name**: The name of the container.
- **container.labels**: The labels assigned to the container.
- **container.runtime**: The container runtime used (e.g., Docker, containerd).
- **container.memory.usage**: The memory usage of the container in bytes.
- **container.network.ingress.bytes**: The number of bytes received by the container over the network.
- **container.network.egress.bytes**: The number of bytes sent by the container over the network.
- **container.cpu.usage**: The CPU usage of the container as a percentage.
- **container.disk.read.bytes**: The number of bytes read by the container from the disk.
- **container.disk.write.bytes**: The number of bytes written by the container to the disk.


## Fields for KPI Monitoring and Alerts

The following fields are suitable for creating KPIs to monitor and alert when exhibiting abnormal behavior:

-- **container.memory.usage**: Monitoring container memory usage can help identify memory leaks, misconfigurations, or performance issues.
-- **container.network.ingress.bytes**: Tracking the ingress network traffic can help identify spikes in network usage, potential DDoS attacks, or other network-related issues.
-- **container.network.egress.bytes**: Monitoring the egress network traffic can help identify unexpected data transfers or network-related issues.
-- **container.cpu.usage**: Tracking the CPU usage of containers can help identify performance bottlenecks, resource contention, or misconfigurations.

By using these fields, users can efficiently monitor, analyze, and manage container resources and performance across different container platforms and environments.


- [Http.mapping](../../../../src/main/resources/schema/observability/logs/container.mapping)
- [Http.schema](../../../../src/main/resources/schema/observability/logs/container.schema)
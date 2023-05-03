# Observability Category: Cloud Log Fields

Observability cloud field set describes a standardized structured representation of cloud infrastructure metadata, enabling efficient monitoring, analysis, and management of cloud resources and services across different cloud providers and regions.

## Field Names and Types

| Field Name                   | Type    |
|------------------------------|---------|
| cloud.provider               | keyword |
| cloud.availability_zone      | keyword |
| cloud.region                 | keyword |
| cloud.machine.type           | keyword |
| cloud.account.id             | keyword |
| cloud.account.name           | keyword |
| cloud.service.name           | keyword |
| cloud.project.id             | keyword |
| cloud.project.name           | keyword |
| cloud.instance.id            | keyword |
| cloud.instance.name          | keyword |

## Field Explanations

- **cloud.provider**: The cloud service provider (e.g., AWS, GCP, Azure).
- **cloud.availability_zone**: The availability zone of the cloud resource within the provider's infrastructure.
- **cloud.region**: The region of the cloud resource within the provider's infrastructure.
- **cloud.machine.type**: The type of virtual machine or compute resource used (e.g., t2.micro, n1-standard-1).
- **cloud.account.id**: The unique identifier of the cloud account.
- **cloud.account.name**: The name of the cloud account.
- **cloud.service.name**: The name of the cloud service (e.g., EC2, S3, Compute Engine).
- **cloud.project.id**: The unique identifier of the cloud project.
- **cloud.project.name**: The name of the cloud project.
- **cloud.instance.id**: The unique identifier of the cloud instance or virtual machine.
- **cloud.instance.name**: The name of the cloud instance or virtual machine.

## Fields for KPI Monitoring and Alerts
The following fields are suitable for creating KPIs to monitor and alert when exhibiting abnormal behavior:

-- **cloud.provider**: Monitoring the distribution of resources across different cloud providers can help optimize costs and performance.
-- **cloud.region**: Tracking resource usage across different regions can help identify potential latency issues or opportunities for cost optimization.
-- **cloud.machine.type**: Monitoring the machine types used can help identify underutilized or overutilized instances, enabling better resource allocation and cost management.
-- **cloud.service.name**: Keeping track of the services used can help identify potential performance bottlenecks or opportunities for cost optimization.


By using these fields, users can efficiently monitor, analyze, and manage cloud resources and services across different cloud providers and regions.

- [Cloud.mapping](../../../../src/main/resources/schema/observability/logs/cloud.mapping)
- [Cloud.schema](../../../../src/main/resources/schema/observability/logs/cloud.schema)
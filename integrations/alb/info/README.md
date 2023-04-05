![Alb logs](alb_logo.png)

# What is [ALB](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html) 

AWS Application Load Balancer (ALB) is a service offered by Amazon Web Services (AWS) that helps distribute incoming application traffic across multiple targets, such as Amazon EC2 instances, containers, or IP addresses. It is a part of AWS Elastic Load Balancing (ELB) services, which also include the Classic Load Balancer (CLB) and the Network Load Balancer (NLB).

The ALB operates at the application layer (Layer 7) of the Open Systems Interconnection (OSI) model and is designed to route HTTP/HTTPS traffic. It can make routing decisions based on the content of the request, allowing more advanced load distribution compared to the Classic Load Balancer.


## What is ALB Integration

ALB integration is concerned with the following aspects

- Allow simple and automatic generation of all schematic structured
    - logs (using the standard SS4O logs schema including specific cloud components logs & custom AWS Elb logs)
    - metrics (using the standard SS4O schema)

- Add Dashboard Assets for both logs / metrics

- Add correlation queries to investigate logs based metrics

## ALB logs fields

The following table describes the fields of an access log entry.

## Logs reference

The `elb` dataset collects logs from AWS ELBs.

**Exported fields**

| Field | Description | Type |
|---|---|---|
| @timestamp |  timestamp. | date |
| aws.elb.backend.http.response.status_code | The status code from the backend (status code sent to the client from ELB is stored in `http.response.status_code` | long |
| aws.elb.backend.ip | The IP address of the backend processing this connection. | keyword |
| aws.elb.backend.port | The port in the backend processing this connection. | keyword |
| aws.elb.backend_processing_time.sec | The total time in seconds since the connection is sent to the backend till the backend starts responding. | float |
| aws.elb.chosen_cert.arn | The ARN of the chosen certificate presented to the client in TLS/SSL connections. | keyword |
| aws.elb.chosen_cert.serial | The serial number of the chosen certificate presented to the client in TLS/SSL connections. | keyword |
| aws.elb.classification | The classification for desync mitigation. | keyword |
| aws.elb.classification_reason | The classification reason code. | keyword |
| aws.elb.connection_time.ms | The total time of the connection in milliseconds, since it is opened till it is closed. | long |
| aws.elb.error.reason | The error reason if the executed action failed. | keyword |
| aws.elb.incoming_tls_alert | The integer value of TLS alerts received by the load balancer from the client, if present. | keyword |
| aws.elb.listener | The ELB listener that received the connection. | keyword |
| aws.elb.matched_rule_priority | The priority value of the rule that matched the request, if a rule matched. | keyword |
| aws.elb.name | The name of the load balancer. | keyword |
| aws.elb.protocol | The protocol of the load balancer (http or tcp). | keyword |
| aws.elb.redirect_url | The URL used if a redirection action was executed. | keyword |
| aws.elb.request_processing_time.sec | The total time in seconds since the connection or request is received until it is sent to a registered backend. | float |
| aws.elb.response_processing_time.sec | The total time in seconds since the response is received from the backend till it is sent to the client. | float |
| aws.elb.ssl_cipher | The SSL cipher used in TLS/SSL connections. | keyword |
| aws.elb.ssl_protocol | The SSL protocol used in TLS/SSL connections. | keyword |
| aws.elb.target_group.arn | The ARN of the target group handling the request. | keyword |
| aws.elb.target_port | List of IP addresses and ports for the targets that processed this request. | keyword |
| aws.elb.target_status_code | List of status codes from the responses of the targets. | keyword |
| aws.elb.tls_handshake_time.ms | The total time for the TLS handshake to complete in milliseconds once the connection has been established. | long |
| aws.elb.tls_named_group | The TLS named group. | keyword |
| aws.elb.trace_id | The contents of the `X-Amzn-Trace-Id` header. | keyword |
| aws.elb.type | The type of the load balancer for v2 Load Balancers. | keyword |
| cloud.account.id | The cloud account or organization id used to identify different entities in a multi-tenant environment. Examples: AWS account id, Google Cloud ORG Id, or other unique identifier. | keyword |
| cloud.availability_zone | Availability zone in which this host, resource, or service is located. | keyword |
| cloud.image.id | Image ID for the cloud instance. | keyword |
| cloud.instance.id | Instance ID of the host machine. | keyword |
| cloud.instance.name | Instance name of the host machine. | keyword |
| cloud.machine.type | Machine type of the host machine. | keyword |
| cloud.project.id | The cloud project identifier. Examples: Google Cloud Project id, Azure Project id. | keyword |
| cloud.provider | Name of the cloud provider. Example values are aws, azure, gcp, or digitalocean. | keyword |
| cloud.region | Region in which this host, resource, or service is located. | keyword |
| container.id | Unique container id. | keyword |
| container.image.name | Name of the image the container was built on. | keyword |
| container.labels | Image labels. | object |
| container.name | Container name. | keyword |
| data_stream.dataset | Data stream dataset. | constant_keyword |
| data_stream.namespace | Data stream namespace. | constant_keyword |
| data_stream.type | Data stream type. | constant_keyword |
| destination.bytes | Bytes sent from the destination to the source. | long |
| destination.domain | The domain name of the destination system. This value may be a host name, a fully qualified domain name, or another host naming format. The value may derive from the original event or be added from enrichment. | keyword |
| ecs.version | ECS version this event conforms to. `ecs.version` is a required field and must exist in all events. When querying across multiple indices -- which may conform to slightly different ECS versions -- this field lets integrations adjust to the schema version of the events. | keyword |
| error.message | Error message. | match_only_text |
| event.category | This is one of four ECS Categorization Fields, and indicates the second level in the ECS category hierarchy. `event.category` represents the "big buckets" of ECS categories. For example, filtering on `event.category:process` yields all events relating to process activity. This field is closely related to `event.type`, which is used as a subcategory. This field is an array. This will allow proper categorization of some events that fall in multiple categories. | keyword |
| event.dataset | Event dataset | constant_keyword |
| event.end | event.end contains the date when the event ended or when the activity was last observed. | date |
| event.kind | This is one of four ECS Categorization Fields, and indicates the highest level in the ECS category hierarchy. `event.kind` gives high-level information about what type of information the event contains, without being specific to the contents of the event. For example, values of this field distinguish alert events from metric events. The value of this field can be used to inform how these kinds of events should be handled. They may warrant different retention, different access control, it may also help understand whether the data coming in at a regular interval or not. | keyword |
| event.module | Event module | constant_keyword |
| event.outcome | This is one of four ECS Categorization Fields, and indicates the lowest level in the ECS category hierarchy. `event.outcome` simply denotes whether the event represents a success or a failure from the perspective of the entity that produced the event. Note that when a single transaction is described in multiple events, each event may populate different values of `event.outcome`, according to their perspective. Also note that in the case of a compound event (a single event that contains multiple logical events), this field should be populated with the value that best captures the overall success or failure from the perspective of the event producer. Further note that not all events will have an associated outcome. For example, this field is generally not populated for metric events, events with `event.type:info`, or any events for which an outcome does not make logical sense. | keyword |
| event.start | event.start contains the date when the event started or when the activity was first observed. | date |
| host.architecture | Operating system architecture. | keyword |
| host.containerized | If the host is a container. | boolean |
| host.domain | Name of the domain of which the host is a member. For example, on Windows this could be the host's Active Directory domain or NetBIOS domain name. For Linux this could be the domain of the host's LDAP provider. | keyword |
| host.hostname | Hostname of the host. It normally contains what the `hostname` command returns on the host machine. | keyword |
| host.id | Unique host id. As hostname is not always unique, use values that are meaningful in your environment. Example: The current usage of `beat.name`. | keyword |
| host.ip | Host ip addresses. | ip |
| host.mac | Host MAC addresses. The notation format from RFC 7042 is suggested: Each octet (that is, 8-bit byte) is represented by two [uppercase] hexadecimal digits giving the value of the octet as an unsigned integer. Successive octets are separated by a hyphen. | keyword |
| host.name | Name of the host. It can contain what `hostname` returns on Unix systems, the fully qualified domain name, or a name specified by the user. The sender decides which value to use. | keyword |
| host.os.build | OS build information. | keyword |
| host.os.codename | OS codename, if any. | keyword |
| host.os.family | OS family (such as redhat, debian, freebsd, windows). | keyword |
| host.os.kernel | Operating system kernel version as a raw string. | keyword |
| host.os.name | Operating system name, without the version. | keyword |
| host.os.name.text | Multi-field of `host.os.name`. | match_only_text |
| host.os.platform | Operating system platform (such centos, ubuntu, windows). | keyword |
| host.os.version | Operating system version as a raw string. | keyword |
| host.type | Type of host. For Cloud providers this can be the machine type like `t2.medium`. If vm, this could be the container, for example, or other information meaningful in your environment. | keyword |
| http.request.body.bytes | Size in bytes of the request body. | long |
| http.request.method | HTTP request method. The value should retain its casing from the original event. For example, `GET`, `get`, and `GeT` are all considered valid values for this field. | keyword |
| http.request.referrer | Referrer for this HTTP request. | keyword |
| http.response.body.bytes | Size in bytes of the response body. | long |
| http.response.status_code | HTTP response status code. | long |
| http.version | HTTP version. | keyword |
| source.address | Some event source addresses are defined ambiguously. The event will sometimes list an IP, a domain or a unix socket.  You should always store the raw address in the `.address` field. Then it should be duplicated to `.ip` or `.domain`, depending on which one it is. | keyword |
| source.as.number | Unique number allocated to the autonomous system. The autonomous system number (ASN) uniquely identifies each network on the Internet. | long |
| source.as.organization.name | Organization name. | keyword |
| source.as.organization.name.text | Multi-field of `source.as.organization.name`. | match_only_text |
| source.geo.city_name | City name. | keyword |
| source.geo.continent_name | Name of the continent. | keyword |
| source.geo.country_iso_code | Country ISO code. | keyword |
| source.geo.country_name | Country name. | keyword |
| source.geo.location | Longitude and latitude. | geo_point |
| source.geo.region_name | Region name. | keyword |
| source.ip | IP address of the source (IPv4 or IPv6). | ip |
| source.port | Port of the source. | long |
| tags | List of keywords used to tag each event. | keyword |
| trace.id | Unique identifier of the trace. A trace groups multiple events like transactions that belong together. For example, a user request handled by multiple inter-connected services. | keyword |
| url.domain | Domain of the url, such as "www.elastic.co". In some cases a URL may refer to an IP and/or port directly, without a domain name. In this case, the IP address would go to the `domain` field. If the URL contains a literal IPv6 address enclosed by `[` and `]` (IETF RFC 2732), the `[` and `]` characters should also be captured in the `domain` field. | keyword |
| url.original | Unmodified original url as seen in the event source. Note that in network monitoring, the observed URL may be a full URL, whereas in access logs, the URL is often just represented as a path. This field is meant to represent the URL as it was observed, complete or not. | wildcard |
| url.original.text | Multi-field of `url.original`. | match_only_text |
| url.path | Path of the request, such as "/search". | wildcard |
| url.port | Port of the request, such as 443. | long |
| url.query | The query field describes the query string of the request, such as "q=elasticsearch". The `?` is excluded from the query string. If a URL contains no `?`, there is no query field. If there is a `?` but no query, the query field exists with an empty string. The `exists` query can be used to differentiate between the two cases. | keyword |
| url.scheme | Scheme of the request, such as "https". Note: The `:` is not part of the scheme. | keyword |
| user_agent.device.name | Name of the device. | keyword |
| user_agent.name | Name of the user agent. | keyword |
| user_agent.original | Unparsed user_agent string. | keyword |
| user_agent.original.text | Multi-field of `user_agent.original`. | match_only_text |
| user_agent.version | Version of the user agent. | keyword |


### Integration Loading Process
The AWS ALB logs integration loading process includes the following assets
 - **Connectivity**
   - S3 Datasource connectivity
   - Spark compute engine connectivity
 - **Tables**
   - alb logs external table (definition including fields mapping to observability logs template)
   - alb logs index (definition based on observability logs template)
 - **Views**
   - alb log materialized view (view is a pre-calculated query based on a specific given dimension)
   - alb metrics materialized view (view is a pre-calculated query based on a specific given dimension)
 - **Display**
   - alb dashboard for viewing all the given information in a meaningful manner


#### Assets Loading Order 
The general order for which the assets are needed to be loaded is dictated by the next concepts:

1) Connectivity - First the connection related configuration are required to be validated for existence and correctness.

2) Mapping - Next the schema specific instruction dictated by the integration's config must be verified for existence or be created

3) Tables - Next the external / internal tables / indices will be verified for existence or be created - (they are based on the mapping phase and connectivity phase )

4) Views - Next the views search templates need to be created (they are based on the tables and connectivity phase  )

5) Display - Last the dashboards and visual assets are uploaded (they are based on the views, tables and connectivity phase)


![](alb-integration-load-assets.png)

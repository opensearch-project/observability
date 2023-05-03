# Observability Category: HTTP Log Fields

The HTTP-based field set described here provide a comprehensive and structured representation of HTTP request and response data, enabling efficient monitoring, analysis, and alerting for performance and security aspects of web applications and APIs.

## Field Names and Types

| Field Name             | Type    |
|------------------------|---------|
| http.flavor            | keyword |
| http.user_agent        | keyword |
| http.url               | keyword |
| http.schema            | keyword |
| http.target            | keyword |
| http.route             | keyword |
| http.client.ip         | ip      |
| http.resent_count      | integer |
| http.request.id        | text    |
| http.request.body.content      | text    |
| http.request.bytes     | long    |
| http.request.method    | keyword |
| http.request.referrer  | keyword |
| http.request.mime_type | keyword |
| http.response.id       | text    |
| http.response.body.content      | text    |
| http.response.bytes    | long    |
| http.response.status_code       | integer |

## Field Explanations

- **http.flavor**: The HTTP version (e.g., HTTP/1.1 or HTTP/2.0).
- **http.user_agent**: The user agent string from the HTTP request header.
- **http.url**: The URL of the HTTP request.
- **http.schema**: The URL schema (e.g., http or https).
- **http.target**: The target of the HTTP request (e.g., a specific API endpoint).
- **http.route**: The route associated with the HTTP request.
- **http.client.ip**: The IP address of the client making the HTTP request.
- **http.resent_count**: The number of times the HTTP request was resent.
- **http.request.id**: The unique identifier of the HTTP request.
- **http.request.body.content**: The content of the HTTP request body.
- **http.request.bytes**: The number of bytes in the HTTP request.
- **http.request.method**: The HTTP request method (e.g., GET, POST, PUT, DELETE).
- **http.request.referrer**: The referrer URL for the HTTP request.
- **http.request.mime_type**: The MIME type of the HTTP request.
- **http.response.id**: The unique identifier of the HTTP response.
- **http.response.body.content**: The content of the HTTP response body.
- **http.response.bytes**: The number of bytes in the HTTP response.
- **http.response.status_code**: The HTTP response status code (e.g., 200, 404, 500).


## Fields for KPI Monitoring and Alerts

The following fields are suitable for creating KPIs to monitor and alert when exhibiting abnormal behavior:

- **http.request.bytes**: Monitoring the number of bytes in the HTTP request can help identify performance issues or potential attacks.
- **http.request.method**: Tracking the distribution of HTTP request methods can provide insights into the usage patterns of your API and help identify potential security risks.
- **http.response.status_code**: Monitoring HTTP response status codes can help identify issues with your application or API, such as a high number of client errors (4xx) or server errors (5xx).
- **http.resent_count**: Tracking the number of times an HTTP request was resent can help identify potential performance issues or misconfigurations.
- **http.response.bytes**: Monitoring the number of bytes in the HTTP response can help identify performance issues or potential attacks.

- [Http.mapping](../../../../src/main/resources/schema/observability/logs/http.mapping)
- [Http.schema](../../../../src/main/resources/schema/observability/logs/http.schema)
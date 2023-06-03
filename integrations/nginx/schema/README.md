# Schema
The schema folder is where the actual translation is done between the Nginx format (logs/metrics) and the `sso` [Observability format](https://github.com/opensearch-project/opensearch-catalog/tree/main/docs/schema/observability/README.md) 

## Nginx Log Format
Nginx log format refers to the way Nginx web server records information about incoming HTTP requests and outgoing responses in its access log files. The log format is configurable, meaning that you can choose what information is logged, and in what format.

Here is an example of a typical Nginx log format:
```text
log_format combined '$remote_addr - $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent"';

```

 - `$remote_addr`: The IP address of the client making the request.
 - `$remote_user`: The username provided by the client, if any.
 - `$time_local`: The date and time of the request in the local timezone.
 - `$request`: The HTTP request method, URI, and protocol used by the client.
 - `$status`: The HTTP status code returned by the server.
 - `$body_bytes_sent`: The number of bytes sent in the response body.
 - `$http_referer`: The URL of the page that referred the client to the current page.
 - `$http_user_agent`: The user agent string provided by the client, typically identifying the client's web browser or other software.

By default, Nginx logs are stored in the `/var/log/nginx/access.log` file on Linux systems, but this can be customized in the server block of the Nginx configuration file.

Custom log formats can be defined by modifying the `log_format` directive in the Nginx configuration file. For example, you can remove or add fields to the log format, or change the order in which they appear in the log file.

### Schema Folder

Each sub-folder represents a different observability signals provider that can be used to translate and deliver `sso` compatible events from nginx to opensearch.


### Fluent-bit
This data collector has a dedicated agent for nginx which can use a [dedicated lua parser](fluent-bit/parsers.conf) that converts nginx original log format into sso logs format.


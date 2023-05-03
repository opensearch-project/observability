# Nginx Integration Assets

### Channels
Creating a slack channel for notifications

API : http://osd:5601/api/notifications/create_config

[Slack Channel](channels/slack.json)
```json5
{
  "config": {
    "name": "Alerts",
    "description": "Alerting Observability ",
    "config_type": "slack",
    "is_enabled": true,
    "slack": {
      "url": "https://yourteam.slack.com/messages/C69S1L3SS"
    }
  }
}
```

### Monitoring
API: http://osd:5601/api/alerting/monitors 

Creating a monitor for RequestPerMinute max Alert & ErrorsPerMinute max Alert 

- [RequestsPerMinute](monitor/RequestsPerMinute.json)
- [ErrorsPerMinute](monitor/ErrorPerMinute.json)


### Display

API: http://osd:5601/api/saved_objects/_import?overwrite=true   

 - [Dashboard](display/sso-logs-dashboard-new.ndjson)


### Fields
The next table details the different fields usage across the different assets

| Field    | Mapping Source |                                                                                                                          Usage |
|----------|:--------------:|-------------------------------------------------------------------------------------------------------------------------------:|
| `@timestamp` |  logs.mapping  |                                                                                                                                |
| `http.response.bytes` |  http.mapping  |                                                       [sso-logs-dashboard-new.ndjson](display%2Fsso-logs-dashboard-new.ndjson) |
| `observerTime` |  http.mapping  |                                                                                                                                |
| `http.response.status_code` | http.mapping  | [sso-logs-dashboard-new.ndjson](display%2Fsso-logs-dashboard-new.ndjson), [ErrorPerMinute.json](monitor%2FErrorPerMinute.json) |
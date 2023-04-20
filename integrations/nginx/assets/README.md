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

# Demo script for uploading a generated integration to OSD

echo "Loading nginx integration"

curl -XPUT localhost:9200/_component_template/http_template  -H "Content-Type: application/json" --data-binary "@integrations/nginx/schema/http.mapping"
curl -XPUT localhost:9200/_component_template/communication_template  -H "Content-Type: application/json" --data-binary "@integrations/nginx/schema/communication.mapping"
curl -XPUT localhost:9200/_index_template/logs  -H "Content-Type: application/json" --data-binary "@integrations/nginx/schema/communication.mapping"
curl -XPOST localhost:5601/api/saved_objects/index-pattern/sso_logs -H 'osd-xsrf: true'  -H 'Content-Type: application/json' -d '{ "attributes": { "title": "sso_logs-*-*",  "timeFieldName": "@timestamp" } }'
curl -XPOST "localhost:5601/api/saved_objects/_import?overwrite=true" -H "osd-xsrf: true" --form file=@integrations/nginx/assets/display/http.ndjson
# Clean messy index based on nginx startup data
curl -XDELETE "localhost:9200/sso_logs-nginx-prod"

echo "\nLoaded"

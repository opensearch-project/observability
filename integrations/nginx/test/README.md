# Demo Instructions

1. Start docker-compose docker compose up --build.
    1. Ensure vm.max_map_count has been set to 262144 or higher (`sudo sysctl -w vm.max_map_count=262144`).
    2. Sometimes, the Jaeger image may crash after starting due to the OpenSearch health check behaving weirdly. If this happens, restart it.
2. Add nginx-trace mapping.
    1. PUT the contents of test/mapping/custom-nginx-trace.mapping to http://localhost:9200/_index_template/otel_span.
3. Import the nginx dashboards.
    1. In OSD: “view app directory” → “saved objects” → “import”.
    2. Import assets/display/nginx-dashboard.ndjson.
4. Generate some traces by repeatedly pinging the http://localhost:8080/ endpoint.
    1. The endpoint is programmed to fail randomly (“Random failure”), for demoing some visualizations it’s helpful to generate sufficiently many traces to see both results.
    2. The failure rate can be adjusted in test/flask-app/app.py, it will be live-reloaded.
5. View the dashboards.

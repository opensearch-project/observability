CREATE MATERIALIZED VIEW alb_logs_raw
    AS
SELECT
    UNIX_MILLIS(time) AS timestamp,
      request_verb AS requestVerb,
      request_url AS requestUrl,
      target_status_code AS statusCode,
      received_bytes AS receivedBytes,
      sent_bytes AS sentBytes
FROM alb_logs_temp
WHERE client_ip = '10.212.10.101'
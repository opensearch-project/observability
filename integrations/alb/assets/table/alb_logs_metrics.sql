CREATE MATERIALIZED VIEW alb_logs_metrics
    AS
SELECT
    UNIX_MILLIS(window.start) AS timestamp,
      COUNT(*) AS totalCount,
      AVG(target_processing_time) FILTER(WHERE target_processing_time != -1) AS latencyInSec,
      COUNT(*) FILTER(WHERE target_status_code LIKE '2__') AS count2xx,
      COUNT(*) FILTER(WHERE target_status_code LIKE '4__') AS count4xx,
      COUNT(*) FILTER(WHERE target_status_code LIKE '5__') AS count5xx,
      SUM(received_bytes) AS totalReceivedBytes,
      SUM(sent_bytes) AS totalSentBytes
FROM maximus_alb_logs
WHERE client_ip = '10.212.10.101'
GROUP BY TUMBLE(time, '1 Minute');
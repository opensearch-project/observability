CREATE INDEX alb_logs_client_ip_index
    ON maximus_alb_logs (client_ip)
    AS 'bloomfilter';
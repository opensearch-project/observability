-- # Insert a few records as existing S3 data

INSERT INTO alb_logs_temp
VALUES
    (
      'https', --type
      CAST('2023-03-15 16:30:00.000000' AS TIMESTAMP), --time
      'app/elb1',      --elb
      '10.212.10.100', --client_ip
      41950,           --client_port
      '10.212.20.1',   --target_ip
      443,   --target_port
      0.002, --request_processing_time
      0.046, --target_processing_time
      0.0,   --response_processing_time
      503,   --elb_status_code
      '503', --target_status_code
      211,   --received_bytes
      364,   --sent_bytes
      'GET', --request_verb
      'https://192.168.1.100:443/solr/', --request_url
      NULL,  --request_proto
      NULL,  --user_agent
      NULL,  --ssl_cipher
      NULL,  --ssl_protocol
      NULL,  --target_group_arn
      NULL,  --trace_id
      NULL,  --domain_name
      NULL,  --chosen_cert_arn
      NULL,  --matched_rule_priority
      NULL,  --request_creation_time
      NULL,  --actions_executed
      NULL,  --redirect_url
      NULL,  --lambda_error_reason
      NULL,  --target_port_list
      NULL,  --target_status_code_list
      NULL,  --classification
      NULL   --classification_reason
    );

INSERT INTO alb_logs_temp
VALUES
    (
        'https', --type
        CAST('2023-03-15 16:31:00.000000' AS TIMESTAMP), --time
        'app/elb1',      --elb
        '10.212.10.101', --client_ip
        41950,           --client_port
        '10.212.20.1',   --target_ip
        443,   --target_port
        0.002, --request_processing_time
        0.046, --target_processing_time
        0.0,   --response_processing_time
        503,   --elb_status_code
        '503', --target_status_code
        211,   --received_bytes
        364,   --sent_bytes
        'GET', --request_verb
        'https://192.168.1.100:443/solr/', --request_url
        NULL,  --request_proto
        NULL,  --user_agent
        NULL,  --ssl_cipher
        NULL,  --ssl_protocol
        NULL,  --target_group_arn
        NULL,  --trace_id
        NULL,  --domain_name
        NULL,  --chosen_cert_arn
        NULL,  --matched_rule_priority
        NULL,  --request_creation_time
        NULL,  --actions_executed
        NULL,  --redirect_url
        NULL,  --lambda_error_reason
        NULL,  --target_port_list
        NULL,  --target_status_code_list
        NULL,  --classification
        NULL   --classification_reason
    );

INSERT INTO alb_logs_temp
VALUES
    (
        'https', --type
        CAST('2023-03-15 16:35:00.000000' AS TIMESTAMP), --time
        'app/elb1',      --elb
        '10.212.10.101', --client_ip
        41950,           --client_port
        '10.212.20.1',   --target_ip
        443,   --target_port
        0.002, --request_processing_time
        0.046, --target_processing_time
        0.0,   --response_processing_time
        503,   --elb_status_code
        '503', --target_status_code
        211,   --received_bytes
        364,   --sent_bytes
        'GET', --request_verb
        'https://192.168.1.100:443/solr/', --request_url
        NULL,  --request_proto
        NULL,  --user_agent
        NULL,  --ssl_cipher
        NULL,  --ssl_protocol
        NULL,  --target_group_arn
        NULL,  --trace_id
        NULL,  --domain_name
        NULL,  --chosen_cert_arn
        NULL,  --matched_rule_priority
        NULL,  --request_creation_time
        NULL,  --actions_executed
        NULL,  --redirect_url
        NULL,  --lambda_error_reason
        NULL,  --target_port_list
        NULL,  --target_status_code_list
        NULL,  --classification
        NULL   --classification_reason
    );
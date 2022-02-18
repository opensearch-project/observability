"""
Copyright OpenSearch Contributors
SPDX-License-Identifier: Apache-2.0
"""

from scheduler import Scheduler

if __name__ == '__main__':
    # All of this is information needed to connect to an opensearch instance
    host = 'localhost'
    port = 9200
    auth = ('admin', 'admin')  # For testing only. Don't store credentials in code.
    # Provide a CA bundle if you use intermediate CAs with your root CA.
    ca_certs_path = '/Users/paulstn/Documents/opensearch-1.2.4/config/root-ca.pem'

    # Optional client certificates if you don't want to use HTTP basic authentication.
    # client_cert_path = '/full/path/to/client.pem'
    # client_key_path = '/full/path/to/client-key.pem'
    Scheduler(host, port, auth, ca_certs_path)
"""
Copyright OpenSearch Contributors
SPDX-License-Identifier: Apache-2.0
"""

import click
import sys
from scheduler import Scheduler
import certifi

from opensearchpy import OpenSearch

@click.command()
@click.argument('endpoint', default='https://localhost:9200')  # TODO: multiple hosts
@click.option("-h", "--host", help="Opensearch cluster host name")
@click.option("-p", "--port", help="Opensearch cluster port")
@click.option(
    "-a",
    "--auth",
    default=('admin','admin'),
    help="Username and password to connect to OpenSearch",
    type=(str, str)
)
@click.option(
    "-c",
    "--ca_certs_path",
    envvar="CA_CERTS_PATH",
    help="Location of ca certs path.",
    type=click.Path(dir_okay=True),
)
@click.option(
    "--client_cert_key_path",
    default=('',''),
    help="Location of client certs and keys path.",
    type=(click.Path(dir_okay=True), click.Path(dir_okay=True)),
)
@click.option( # TODO: add this in as a future feature
    "--aws-auth",
    "use_aws_authentication",
    is_flag=True,
    default=False,
    help="Use AWS sigV4 to connect to AWS ELasticsearch domain",
)
def cli(
    endpoint,
    host,
    port,
    auth,
    client_cert_key_path,
    ca_certs_path,
    use_aws_authentication,
    ):
    host_add = endpoint
    if host and port:
        host_add = {'host': host, 'port': port}
    client = OpenSearch(
            hosts = [host_add],
            http_compress=True,  # enables gzip compression for request bodies
            http_auth=auth,
            client_cert = client_cert_key_path[0],
            client_key = client_cert_key_path[1],
            use_ssl=True,
            verify_certs=True,
            ssl_assert_hostname=False,
            ssl_show_warn=True,
            ca_certs=ca_certs_path
    )

    Scheduler(client)

if __name__ == '__main__':
    cli()
    
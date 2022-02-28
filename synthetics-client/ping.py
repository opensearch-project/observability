"""
Copyright OpenSearch Contributors
SPDX-License-Identifier: Apache-2.0
"""

import logging
from urllib.parse import urlencode
import pycurl
import certifi
from io import BytesIO

DEBUG = False
import datetime

# Ping will contain information regarding how to ping an endpoint and store the information 
# needed to do that in its state. It's single method (ping) can be called without needing to
# pass any information in, which is needed to store it in a job process for the scheduler
class Ping:
    def __init__(self, client, host, suite_id, suites):
        self.client = client
        self.host = host
        self.suite_id = suite_id
        self.suites = suites
        self.return_headers = {}

        self.buffer = BytesIO()
        conn = pycurl.Curl()
        self.conn = conn
        conn.setopt(conn.URL, host)
        conn.setopt(conn.CAINFO, certifi.where())
        conn.setopt(conn.WRITEDATA, self.buffer)
        # header function grabs response headers and formats them as a dict
        conn.setopt(conn.HEADERFUNCTION, self.headers_to_json)
        conn.setopt(conn.CONNECTTIMEOUT, suites['timeoutSeconds'])
        conn.setopt(conn.MAXREDIRS, suites['maxRedirects'])
        conn.setopt(conn.FOLLOWLOCATION, False)
        conn.setopt(conn.HTTPHEADER, [str(k) + ': ' + str(v) for k, v in list(suites["request"]["headers"].items())])
        if (suites["request"]["method"] == 'POST'):
            conn.setopt(conn.POSTFIELDS, urlencode(suites["request"]["json"]))

    def headers_to_json(self, header):
        header = header.decode('iso-8859-1')
        if ':' not in header:
            return
        name, value = header.split(':', 1)
        name = name.strip()
        value = value.strip()
        name = name.lower()
        self.return_headers[name] = value

    def ping(self):
        logging.info("Sent ping for: " + self.host)

        # clear past response headers and response data
        self.buffer.flush()
        self.return_headers = {}

        # send ping out
        start = datetime.datetime.now().timestamp()
        # TODO: figure out a better method for the different types of calls
        self.conn.perform()
        end = datetime.datetime.now().timestamp()

        status = self.conn.getinfo(self.conn.RESPONSE_CODE)

        # these are all the fields that go in with the index
        log = {
            "testSuiteName": self.suites['name'],
            "syntheticsSuiteId": self.suite_id,
            "status": ("UP" if status in self.suites["response"]["status"] else "DOWN"),
            "type": self.suites['type'],
            "URL": self.host,
            "request": {
                "method": self.suites["request"]["method"],
                "headers": self.suites["request"]["headers"],
                "body": self.suites["request"]["json"]
            },
            "response": {
                "status": status,
                "headers": self.return_headers,
                "body": "Not implemented" # r.data.decode('utf-8')
            },
            "startTime": (start * 1000),
            "endTime": (end * 1000),
            "dnsTimeMs": (self.conn.getinfo(self.conn.NAMELOOKUP_TIME) * 1000),
            "ConnectionTimeMs": (self.conn.getinfo(self.conn.CONNECT_TIME) * 1000),
            "sslTimeMs": (self.conn.getinfo(self.conn.APPCONNECT_TIME) * 1000),
            "ttfbMs": (self.conn.getinfo(self.conn.STARTTRANSFER_TIME) * 1000),
            "downloadTimeMs": (self.conn.getinfo(self.conn.TOTAL_TIME) * 1000),
            "contentSizeKB": (self.conn.getinfo(self.conn.SIZE_DOWNLOAD) / 1000)
        }

        response = self.client.index(
            index='observability-synthetics-logs',
            body=log,
            refresh=True
        )
        if DEBUG: logging.info("   Doc Index resp: " + str(response))
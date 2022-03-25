"""
Copyright OpenSearch Contributors
SPDX-License-Identifier: Apache-2.0
"""

import json
import logging
from urllib.parse import urlencode
import pycurl
import certifi
from io import BytesIO
import ipinfo

DEBUG = False
import datetime

# Ping will contain information regarding how to ping an endpoint and store the information 
# needed to do that in its state. It's single method (ping) can be called without needing to
# pass any information in, which is needed to store it in a job process for the scheduler
class Ping:
    def __init__(self, client, host, suite_id, suites, self_loc, access_token):
        self.client = client
        self.host = host
        self.suite_id = suite_id
        self.suites = suites
        self.return_headers = {}
        self.self_loc = self_loc
        self.access_token = access_token

        self.server_loc = None

        self.buffer = BytesIO()
        conn = pycurl.Curl()
        self.conn = conn

        
        conn.setopt(conn.URL, host)

        # ssl configuration
        if (suites['ssl']['enabled']):
            conn.setopt(conn.USE_SSL, conn.USESSL_ALL)

        if (suites['ssl']['default']):
            conn.setopt(conn.CAINFO, certifi.where())
            pass
        else:
            conn.setopt(conn.CAINFO, suites['ssl']['certificateAuthorities'])
            if (suites['ssl']['certificate'] != None): conn.setopt(conn.SSLCERT, suites['ssl']['certificate'])
            if (suites['ssl']['key'] != None): conn.setopt(conn.SSLKEY, suites['ssl']['key'])
            if (suites['ssl']['keyPassphrase'] != None): conn.setopt(conn.KEYPASSWD, suites['ssl']['keyPassphrase'])
            if (suites['ssl']['supportedProtocols'] != None): conn.setopt(conn.SSLVERSION, suites['ssl']['supportedProtocols'])
            if (suites['ssl']['ecAlgorithmCurves'] != None): conn.setopt(conn.SSL_EC_CURVES, suites['ssl']['ecAlgorithmCurves'])
            if (suites['ssl']['falseStart'] != None): conn.setopt(conn.SSL_FALSESTART, suites['ssl']['falseStart'])
            if (suites['ssl']['cipherList'] != None): conn.setopt(conn.SSL_CIPHER_LIST, suites['ssl']['cipherList'])
            if (suites['ssl']['verifyHost'] != None): conn.setopt(conn.SSL_SSL_VERIFYHOST, 2 if (suites['ssl']['verifyHost']) else 0)
            if (suites['ssl']['verifyPeer'] != None): conn.setopt(conn.SSL_SSL_VERIFYPEER, 1 if (suites['ssl']['verifyPeer']) else 0)

        conn.setopt(conn.WRITEDATA, self.buffer)
        # header function grabs response headers and formats them as a dict
        conn.setopt(conn.HEADERFUNCTION, self.headers_to_json)
        conn.setopt(conn.CONNECTTIMEOUT, suites['timeoutSeconds'])
        maxredirs = suites['maxRedirects']
        if (maxredirs == 0):
            conn.setopt(conn.FOLLOWLOCATION, False)
        else:
            conn.setopt(conn.MAXREDIRS, maxredirs)
            conn.setopt(conn.FOLLOWLOCATION, True)
        conn.setopt(conn.HTTPHEADER, [str(k) + ': ' + str(v) for k, v in list(suites["request"]["headers"].items())])  # TODO: GET RID OF THIS, JUST HAVE IT BE IN THE STRING
        conn.setopt(conn.OPT_CERTINFO, 1)  # grabs information about certificates used
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
        primary_ip = self.conn.getinfo(self.conn.PRIMARY_IP)

        if self.server_loc == None:
            # loc_details = ipinfo.getHandler(self.access_token).getDetails(primary_ip)
            self.server_loc = (40,40) # loc_details.loc

        # TODO: use conn.getinfo(conn.INFO_CERTINFO) and put certificate information in Dashboards

        # these are all the fields that go in with the index
        log = {
            "testSuiteName": self.suites['name'],
            "syntheticsSuiteId": self.suite_id,
            "status": ("UP" if status in self.suites["response"]["status"] else "DOWN"),
            "type": self.suites['type'],
            "url": self.host,
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
            "connectionTimeMs": (self.conn.getinfo(self.conn.CONNECT_TIME) * 1000),
            "sslTimeMs": (self.conn.getinfo(self.conn.APPCONNECT_TIME) * 1000),
            "pretransferTimeMs": (self.conn.getinfo(self.conn.PRETRANSFER_TIME) * 1000),
            "starttransferTimeMs": (self.conn.getinfo(self.conn.STARTTRANSFER_TIME) * 1000),
            "redirectTimeMs": (self.conn.getinfo(self.conn.REDIRECT_TIME) * 1000),
            "downloadTimeMs": (self.conn.getinfo(self.conn.TOTAL_TIME) * 1000),
            "speedDownloadBytesPerSec": (self.conn.getinfo(self.conn.SPEED_DOWNLOAD)),
            "contentSizeKB": (self.conn.getinfo(self.conn.SIZE_DOWNLOAD) / 1000),
            "primaryIP": primary_ip,
            "heartbeatLocation": "",
            "serverLocation": "",
        }

        response = self.client.index(
            index='observability-synthetics-logs',
            body=log,
            refresh=True
        )
        logging.debug("   Synthetic Logs Index Doc Index resp: " + str(response))

"""
Copyright OpenSearch Contributors
SPDX-License-Identifier: Apache-2.0
"""

import requests

DEBUG = False
import datetime

# Ping will contain information regarding how to ping an endpoint and store the information 
# needed to do that in its state. It's single method (ping) can be called without needing to
# pass any information in, which is needed to store it in a job process for the scheduler
class Ping:
    def __init__(self, client, host, suite_id, suite_name, 
                 response_status, method, headers, req_json):
        if DEBUG: print("initialize ping")
        self.client = client
        self.host = host
        self.suite_id = suite_id
        self.suite_name = suite_name
        self.response_status = response_status
        self.method = method
        self.headers = headers
        self.req_json = req_json

    def ping(self):
        print("Sent ping for: " + self.host)

        start = datetime.datetime.now().timestamp() * 1000
        r = None
        # TODO: figure out a better method for the different types of calls
        if (self.method == "GET"):
            r = requests.get(self.host, allow_redirects=False, 
                             stream=True, headers=self.headers)
        elif (self.method == "POST"):
            r = requests.post(self.host, allow_redirects=False,
                              stream=True, headers=self.headers, json=self.req_json)
        end = datetime.datetime.now().timestamp() * 1000
        if DEBUG: print("     " + r.url + " : " + str(r.status_code) + ", "
                        + ('UP' if r.status_code in self.response_status else 'DOWN'))
        
        if (r == None):
            raise Exception("No response returned, something went wrong")

        # these are all the fields that go in with the index
        log = {
            "testSuiteName": self.suite_name,
            "syntheticsSuiteId": self.suite_id,
            "status": ("UP" if r.status_code in self.response_status else "DOWN"),
            "type": "http",
            "URL": r.url,
            "request": {
                "method": "GET",
                "headers": {},
                "body": ""
            },
            "response": {
                "status": r.status_code,
                "headers": dict(r.headers),
                "body": r.text
            },
            "startTime": start,
            "endTime": end,
            "dnsTimeMs": "N/A",
            "ConnectionTimeMs": (end - start),
            "sslTimeMs": 0,
            "ttfbMs": "N/A",
            "downloadTimeMs": "N/A",
            "contentSizeKB": "N/A"
        }

        response = self.client.index(
            index='synthetics-logs',
            body=log,
            refresh=True
        )
        if DEBUG: print("   Doc Index resp: " + str(response))
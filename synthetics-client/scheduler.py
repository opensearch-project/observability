"""
Copyright OpenSearch Contributors
SPDX-License-Identifier: Apache-2.0
"""

from opensearchpy import OpenSearch
import opensearchpy.exceptions
from ping import Ping
from apscheduler.schedulers.background import BackgroundScheduler
import warnings

# In an unreleased patch, the deprecation warnings are fixed but for now it is harmless
# These warnings just indicate that a feature the Pytz library provided is now no longer needed
warnings.filterwarnings("ignore", message="The normalize method is no longer necessary")
warnings.filterwarnings("ignore", message="The zone attribute is specific to pytz")
warnings.filterwarnings("ignore", message="The localize method is no longer necessary")

import os
import yaml

DEBUG = False
import time

# Scheduler reads yml files in ./suites and based on the schedules kept inside, 
class Scheduler:
    def __init__(self, host, port, auth, ca_certs_path,
                 client_cert_path="", client_key_path=""):
        # Create the client with SSL/TLS enabled, but hostname verification disabled.
        self.client = OpenSearch(
            hosts=[{'host': host, 'port': port}],
            http_compress=True,  # enables gzip compression for request bodies
            http_auth=auth,
            # client_cert = client_cert_path,
            # client_key = client_key_path,
            use_ssl=True,
            verify_certs=True,
            ssl_assert_hostname=False,
            ssl_show_warn=False,
            ca_certs=ca_certs_path
        )

        self.read_configs()
    
    def read_configs(self):
        self.create_synthetics_index()

        if DEBUG: print('Starting scheduler')
        scheduler = BackgroundScheduler()
        scheduler.start()

        # Goes over suite yml files in suites folder
        suite_id = 0
        for filename in os.listdir("./suites"):
            # safely opens up ./suite files
            with open(os.path.join("./suites", filename), 'r') as file:
                suites = yaml.safe_load(file)
            
            if DEBUG: print(os.path.splitext(filename)[0] + " status codes:")

            # do a {try} parsing file, send file not formatted correctly exception if fails
            try:
                # Type of call, like http, icmp, or tcp
                # TODO: add icmp and tcp support
                if (suites["type"] not in ["http"]): raise Exception("Call type not supported")
                
                # response status
                response_status = suites["response"]["status"]
                if (not all((type(x) is int) for x in suites["response"]["status"])): 
                    raise Exception("Response Status not accepted")

                # method
                method = suites["request"]["method"]
                if (method not in ["GET","POST"]): raise Exception("Request Method not accepted")

                headers = suites["request"]["headers"]
                if (type(headers) != dict): raise Exception("Request Headers not suitable")

                req_json = suites["request"]["json"]
                if (type(req_json) != dict): raise Exception("Request JSON not suitable")

                # type of schedule, like interval or cron
                schedule_type = suites["scheduler"]["schedule-type"]
                if (schedule_type not in ["interval","cron"]): raise Exception("Schedule type not supported")
                
                interval_job = {}
                cron_job = {}
                if (schedule_type == 'interval'):
                    unit = suites["scheduler"]["schedule"]["unit"]
                    interval = int(suites["scheduler"]["schedule"]["period"])
                    interval_job = {unit: interval}
                elif (schedule_type == 'cron'):
                    cron_job = suites["scheduler"]["schedule"]
                
                # start trying to run the jobs
                try:
                    print(filename + " succ")
                    
                    # Goes over every host found in a suite file
                    for host in suites["hosts"]:
                        if DEBUG: print("Start pinging for: " + host)
                        # TODO: send information in through an object instead of multiple arguments
                        p = Ping(self.client, host, suite_id, suites["name"], response_status, method, headers, req_json)
                        # one ping to call immediately and the job will only run after a initial interval passes
                        if schedule_type == 'interval': p.ping()
                        job_process = scheduler.add_job(p.ping, schedule_type, **cron_job, **interval_job, replace_existing=True)
                        suite_id += 1
                    if DEBUG: print()
                except Exception as e:
                    print("job runtime error: " + str(e))
            except Exception as e:
                print(filename + " not formatted correctly: " + str(e))

        # have to keep program running for scheduler to work, stops when the number of jobs is 0
        while len(scheduler.get_jobs()) > 0:
            time.sleep(2)

    def create_synthetics_index(self):
        # Try looking for 'synthetics-logs' index, will make one if not found
        response = ''
        try:
            response = self.client.search(index='synthetics-logs')
        except opensearchpy.exceptions.NotFoundError:
            if DEBUG: print('index not found')
            index_body = {
                'settings': {
                    'index': {
                        'number_of_shards': 4
                    }
                },
                'mappings': {
                    'properties': {
                        'startTime': {
                            'type': 'date',
                            'format': 'epoch_millis'
                        },
                        'endTime': {
                            'type': 'date',
                            'format': 'epoch_millis'
                        },
                        'ConnectionTimeMs': {
                            'type': 'float',
                        },
                    }
                }
            }
            response = self.client.indices.create('synthetics-logs', body=index_body)
        except:
            return
        if DEBUG: print(response)
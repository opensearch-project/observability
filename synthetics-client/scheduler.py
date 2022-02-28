"""
Copyright OpenSearch Contributors
SPDX-License-Identifier: Apache-2.0
"""

import logging
from ping import Ping
from apscheduler.schedulers.background import BackgroundScheduler
import warnings

# In an unreleased patch, the deprecation warnings are fixed but for now it is harmless
# These warnings just indicate that a feature the Pytz library provided is now no longer needed
warnings.filterwarnings("ignore", message="The localize method is no longer necessary")

import os
import yaml
import time

# Scheduler reads yml files in ./suites and based on the schedules kept inside, 
# pings the endpoints at the specified regular intervals
class Scheduler:
    def __init__(self, client):
        self.client = client

        self.read_configs()
    
    def read_configs(self):
        self.create_synthetics_index()

        logging.info('Starting scheduler')
        scheduler = BackgroundScheduler()
        scheduler.start()

        abspath_suites = os.path.dirname(os.path.abspath(__file__)) + '/suites'

        # Goes over suite yml files in suites folder
        suite_id = 0
        for filename in os.listdir(abspath_suites):
            # safely opens up ./suite files
            with open(os.path.join(abspath_suites, filename), 'r') as file:
                suites = yaml.safe_load(file)
            
            logging.info(os.path.splitext(filename)[0] + " status codes:")

            # do a {try} parsing file, send file not formatted correctly exception if fails
            try:
                # TODO: make exception reasons more verbose and add more exceptions
                if (suites["type"] not in ["http"]): raise Exception("Call type not supported") # TODO: add icmp and tcp support
                if (not all((type(x) is int) for x in suites["response"]["status"])): raise Exception("Response Status not accepted")
                if (suites["request"]["method"] not in ["GET","POST"]): raise Exception("Request Method not accepted")
                if (type(suites["request"]["headers"]) != dict): raise Exception("Request Headers not suitable")
                if (type(suites["request"]["json"]) != dict): raise Exception("Request JSON not suitable")
                if (suites['timeoutSeconds'] < 0): raise Exception('timeoutSeconds not a valid integer')
                if (suites['maxRedirects'] < 0): raise Exception('maxRedirects not valid')

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
                logging.info(filename + " succ")
                
                # Goes over every host found in a suite file
                try:
                    for host in suites["hosts"]:
                        logging.info("Start pinging for: " + host)
                        # TODO: send information in through an object instead of multiple arguments
                        p = Ping(self.client, host, suite_id, suites)
                        # one ping to call immediately and the job will only run after a initial interval passes
                        if schedule_type == 'interval': p.ping()
                        job_process = scheduler.add_job(p.ping, schedule_type, **cron_job, **interval_job, replace_existing=True)
                        suite_id += 1
                    logging.info('\n')
                except Exception as e:
                    logging.error(e)
            except Exception as e:
                # if there is an exception in a file, continue on to the next file
                logging.exception(e)

        # have to keep program running for scheduler to work, stops when the number of jobs is 0
        while len(scheduler.get_jobs()) > 0:
            time.sleep(2)

    def create_synthetics_index(self):
        # Try looking for 'observability-synthetics-logs' index, will make one if not found
        if (not self.client.indices.exists('observability-synthetics-logs')):
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
            response = self.client.indices.create('observability-synthetics-logs', body=index_body)
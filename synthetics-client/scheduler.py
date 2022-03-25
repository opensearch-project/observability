"""
Copyright OpenSearch Contributors
SPDX-License-Identifier: Apache-2.0
"""

import hashlib
import logging
from threading import TIMEOUT_MAX
from unittest import suite
from ping import Ping
from apscheduler.schedulers.background import BackgroundScheduler
import warnings
import ipinfo

# In an unreleased patch, the deprecation warnings are fixed but for now it is harmless
# These warnings just indicate that a feature the Pytz library provided is now no longer needed
warnings.filterwarnings("ignore", message="The localize method is no longer necessary")

import os
import yaml
import time

TIME_BETWEEN_SUITE_CHECK = 60

# Scheduler reads yml files in ./suites and based on the schedules kept inside, 
# pings the endpoints at the specified regular intervals
class Scheduler:
    def __init__(self, client, access_token):
        self.client = client
        self.access_token = access_token

        self.scheduler = None
        # have absolute path for suites directory to allow calling from any location
        self.abspath_suites = os.path.dirname(os.path.abspath(__file__)) + '/suites'

        self.suite_id = 0

        self.read_configs()
    
    def read_configs(self):
        self.create_synthetics_index()

        logging.info('Starting synthetics test suite scheduler')
        scheduler = BackgroundScheduler()
        scheduler.start()

        self.scheduler = scheduler

        # grab current location
        # loc_details = ipinfo.getHandler(self.access_token).getDetails()

        suites_jobs = {}
        filesums = {}

        # TODO: assign unique suite id for each test suite, despite changes
        # Goes over suite yml files in suites folder
        for filename in os.listdir(self.abspath_suites):
            # reads file and creates a job based on configuration, stores references to all jobs in suite
            suite_jobs = self.load_suite_file(filename)
            if (suite_jobs != None):
                suites_jobs[filename] = suite_jobs

            # generates file hash to check for changes later on
            checksum = self.hashfile(os.path.join(self.abspath_suites, filename))
            filesums[filename] = checksum


        # have to keep program running for scheduler to work, stops when the number of jobs is 0
        while len(scheduler.get_jobs()) > 0:

            # the amount of time spent sleeping does not delay a job triggering when it needs to
            time.sleep(TIME_BETWEEN_SUITE_CHECK)

            # Below section checks for any changes at all to ./suites as well as files inside and
            # will modify the jobs accordingly 
            os_listdir = os.listdir(self.abspath_suites)

            # find deleted files by set difference of filesum keys and os.listdir
            del_filenames = set(filesums.keys())
            del_filenames.difference_update(os_listdir)
            logging.info('deleted filename: ' + str(del_filenames))

            # find added files by set difference of os.listdir and filesum keys
            added_filenames = set(os_listdir)
            added_filenames.difference_update(filesums.keys())
            logging.info('added filename: ' + str(added_filenames))

            # find changed original files by making checksums of os.listdir and adding filenames
            # that have different filesum checksums
            changed_filenames = set()
            for filename in os_listdir:
                checksum = self.hashfile(os.path.join(self.abspath_suites, filename))
                filesum = filesums.get(filename)
                # skip added files (filesum which is None) to distinguish
                if (filesum != None and checksum != filesum):
                    changed_filenames.add(filename)
                    # update with new checksum
                    filesums[filename] = checksum
                    logging.info(filename + ' checksum updated')
            logging.info('changed filename: ' + str(changed_filenames))

            # delete jobs: del_files and changed_files, do not attempt to delete if filename not in suites_jobs
            for filename in del_filenames.union(changed_filenames):
                # will only delete if there is a job to delete
                if (suites_jobs.get(filename) != None):
                    for job in suites_jobs[filename]:
                        job.remove()
                        logging.info(job.id + ' job removed')
                    # remove key as well to delete entire reference
                    suites_jobs.pop(filename)

            # add jobs: changed_files and added_files, just add jobs
            for filename in added_filenames.union(changed_filenames):
                # add new jobs for suite
                suite_jobs = self.load_suite_file(filename)
                if (suite_jobs != None):
                    suites_jobs[filename] = suite_jobs
                    logging.info(filename + ' jobs added')

            # update checksums: update checksums for changed and added files, remove for deleted files
            for filename in added_filenames:
                checksum = self.hashfile(os.path.join(self.abspath_suites, filename))
                # add new checksum
                filesums[filename] = checksum
                logging.info(filename + ' checksum added')
            for filename in del_filenames:
                filesums.pop(filename)
                logging.info(filename + ' checksum deleted')
                if (suites_jobs.get(filename) != None):
                    logging.info(filename + ' job listed removed')
                    suites_jobs.pop(filename)

            logging.info('file hash checking complete')
            
    # Method will load a file and then start a job process for the configuration
    def load_suite_file(self, filename):
        # safely opens up ./suite files
        with open(os.path.join(self.abspath_suites, filename), 'r') as file:
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
            schedule_type = suites["scheduler"]["scheduleType"]
            if (schedule_type not in ["interval","cron"]): raise Exception("Schedule type not supported")
            
            interval_job = {}
            cron_job = {}
            if (schedule_type == 'interval'):
                unit = suites["scheduler"]["schedule"]["unit"]
                interval = int(suites["scheduler"]["schedule"]["period"])
                interval_job = {unit: interval}
            elif (schedule_type == 'cron'):
                cron_job = suites["scheduler"]["schedule"]
            
            # TODO: verify ssl input

            # start trying to run the jobs
            logging.info(filename + " success")
            
            # TODO: poll suite files for changes, put changes in effect
            # Goes over every host found in a suite file
            try:
                suite_jobs = []
                for host in suites["hosts"]:
                    logging.info("Start pinging for: " + host)
                    p = Ping(self.client, host, self.suite_id, suites, (30,30), self.access_token)
                    # one ping to call immediately and the job will only run after a initial interval passes
                    if schedule_type == 'interval': p.ping()
                    # the id is the filename and host in order to have the job process be unique at a reasonable point
                    # the '**cron_job' and '**interval_job' directly takes the dict and sends them in as optional arguments, based on what the user specifys in the configuration files
                    job_process = self.scheduler.add_job(p.ping, schedule_type, **cron_job, **interval_job, id=(filename+host), replace_existing=True)
                    suite_jobs.append(job_process)
                    self.suite_id += 1
                return suite_jobs
            except Exception as e:
                logging.error(e)
        except Exception as e:
            # if there is an exception in a file, continue on to the next file
            logging.exception(e)

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

    def hashfile(self, file):
        BUF_SIZE = 4096  # 4 KB
        sha256 = hashlib.sha256()  # initialization
    
        with open(file, 'rb') as f:
            # keeps reading data in chunks then adding to sha256
            while True:
                data = f.read(BUF_SIZE)
    
                # enters when end of file
                if not data:
                    break

                sha256.update(data)
    
        # generates a hash from all the data
        return sha256.hexdigest()
Sample program run: python3 main.py -h localhost -p 9200 -a ('username', 'pass') -c '/usr/opt/ca.pem'

## main.py
This file contains the code to handle all of the user input. There purposefully
isn't too much code here as to not mix the user handling with the program handling.
However, an opensearch object is created here as to see if specified opensearch
credentials are valid.

## scheduler.py
As the name suggests, this program schedules all of the endpoint requests. The
library used is APScheduler, which has enough complex functionality to do both
interval and cron-based scheduling.

This program starts by parsing the test-suite configuration files and determines if they
are valid.

## ping.py
This program essentially 'pings' an endpoint, using the 
[PycURL](http://pycurl.io/docs/latest/index.html) library (which is a Python
interface for [libcurl](https://curl.se/libcurl/c/)). The reason why PycURL was
used instead of both Requests and urllib3 came down to the fact that we couldn't
get timing metrics off of them (such as time to first byte, etc.). The libcurl
documentation has more information on the type of requests we can send as well as what
information we can get back. 
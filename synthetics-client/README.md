# Heartbeat program for Synthetics in Opensearch-Observability


## Test-Suite Configuration:

Taking a look at `sample_testsuite.yml`, we can see:
```
---
  name: "Sample Test Suite"
  type: "http"
  appId: ""
  notebookId: ""
  savedQueryId: ""
  savedVisualizationId: ""
  operationalPanelId: ""
  ipv4: true
  ipv6: true
  resolverMode: "all"
  timeoutSeconds: 16
  tags:
  - "news"
  - "apis"
  keepNull: true
  hosts:
  - "https://opensearch.org"
  - "https://opensearch.org/synthetics"
  - "https://github.com/opensearch-project"
  maxRedirects: 1
  proxyURL: ""
  proxyHeaders: {}
  username: ""
  password: ""
  ssl:
    enabled: false
    default: true
    certificateAuthorities: CAINFO
    certificate: ""
    key: ""
    supportedProtocols: "TLSv1.1" # https://curl.se/libcurl/c/CURLOPT_SSLVERSION.html
    keyPassphrase: ""
    ecAlgorithmCurves: ""
    falseStart: false # https://curl.se/libcurl/c/CURLOPT_SSL_FALSESTART.html
    cipherList: "" # https://curl.se/docs/ssl-ciphers.html
    verifyHost: true # https://curl.se/libcurl/c/CURLOPT_SSL_VERIFYHOST.html
    verifyPeer: true # https://curl.se/libcurl/c/CURLOPT_SSL_VERIFYPEER.html
  indexHeaders: true
  indexResponse: "always"
  request:
    method: "GET"
    headers: {'Accept-Encoding': None, 'Content-Encoding':'gzip'}
    body: ""
    json: {}
  response:
    status:
    - 200
    - 301
    headers: {}
    body: {}
  scheduler:
    scheduleType: "interval"
    schedule:
      period: 20
      unit: "seconds"
```

* The `name` field is the name you specify for this particular Test-Suite, has to be alpha-numberic.
* `type` is the protocol for this Test-Suite, you can choose from either http, tcp, or icmp.
* `appId`, `notebookId`, `savedQueryId`, `savedVisualizationId`, and `operationalPanelId` are all neccessary ids for if you want to connect this Test-Suite with other OpenSearch components.
* `ipv4` is a boolean value specifying if the request should be handled through IPv4
* `ipv6` is a boolean value specifying if the request should be handled through IPv6
* `resolverMode` takes a string that specifies the resolver mode
* `timeoutSeconds` is the amount of time (in seconds) before any connection should time out, takes a number
* `keepNull` is about whether fields with no values should be kept null, takes a boolean
* `hosts` can be a list of endpoints that are in the Test-Suite and will be pinged based on the schedule
* `maxRedirects` is the max number of redirects the connection should go through before being cut off.
* `proxyURL` takes a url that can be the proxy url
* `proxyHeaders` are the headers that would go with the proxy url
* `username` is a string that can be attached onto the request that will act as a username
* `password` is a string that can be attached onto the request that will act as a password
* `ssl` is where various ssl certificates' paths can be specified and used:
  - `enabled` by default (also when ssl is not specified) will not attempt to use SSL. However, if true is specified, then SSL is required for all communication or there will be an ERROR thrown 
  - `default` is an option, where if true, will attempt to find and use CA bundles contained in the `certifi` library. If false, a CA path is needed in `certificateAuthorities`.
  - `certificateAuthorities` is a needed file path leading to a valid CA cert bundle for SSL unless `verifyPeer` is false, in which case an empty file can be given.
  - `certificate` should be a file path leading to a certificate with the type "PEM".
  - `key` should be a file path to a private key with type "PEM". 
  - `keyPassphrase` would be the password required to use `key`
  - `supportedProtocols` is the protocol version range for the SSL/TLS handshake to use. The input protocol verison will be the minimum protocol used, where later versions can be used as well. For exmaple, if the value here is "TLSv1.1", then TLSv1.1, TLSv1.2, and TLSv1.3 would be available for use. The default value is "TLSv1.0". This method of input is in use to keep behavior of TLS libraries consistent.
  - `ecAlgorithmCurves` needs input as a colon delimited list of EC algorithms. 
  - `falseStart` is a boolean with a default value of false, where when true false start would be in use. False start is a mode where a TLS client saves a round trip on a full handshake by sending data before verifying the server message.
  - `cipherList` needs to be a colon delimited string of one or more ciphers. Default follows an internal configuration.
  - `verifyHost`, when true, verifys that the connecting server has the same name in the certificate and host name, and will fail if otherwise. Default is true.
  - `verifyPeer` checks if the server certificate is authentic. This authenticity is based in the CA certificates supplied. Default is true. Disabling makes communication insecure and allows for man-in-the-middle attacks.
* `indexHeaders` is a boolean that will index the headers if true
* `indexResponse` specifys whether an index response should return or not
* `request.method` is the protocol's method that should be used
* `request.headers` are the request headers that will be sent along with the request. Must be in JSON format.
* `request.body` is the body that will be sent along with the request
* `request.json` is a json that can be sent along with the request
* `response.status` are possible statuses that can result in an 'UP' status for a host.
* `response.headers` are headers that the response will check to have
* `response.body` is a body that the response will check to have
* `scheduler.schedule-type` is the type of schedule that should be used. Possible types are 'interval' and 'cron'
* `scheduler.schedule` can either have two settings based on what the schedule-type was:
  - example interval:
```
    period: 20
    unit: 
```
The period specifies the quantity of time between each interval (has to be a number) and the unit specifies the unit of that time (has to be one of "weeks, "days", "hours", "minutes", and "seconds"). The job will trigger once and then after each interval occurs. [Documentation](https://apscheduler.readthedocs.io/en/3.x/modules/triggers/cron.html#module-apscheduler.triggers.cron)
  - example cron:
```
    year: "*"
    month: "*"
    day: "*"
    week: "*"
    day_of_week: "*"
    hour: "*"
    minute: "*"
    second: "0,15,30,45"
```
This is like 'cron' based scheduling, where the time in each component is the time in which the job triggers. There can either be a valid string put in or '*' can be used as a wildcard. So in the above example, the job will trigger at every minute on the 0th, 15th, 30th, and 45th second. Note that each component's default value is the wildcard so most components can be left out. Just looking up 'cron'  will give more neccessary information on how to use this scheduler. [Documentation](https://apscheduler.readthedocs.io/en/3.x/modules/triggers/cron.html#module-apscheduler.triggers.cron)
  - The below configurations can be added to either interval or cron based scheduling.
```
    start_date: '2010-10-10 09:30:00'
    end_date: '2014-06-15 11:00:00'
    timezone: ''
    jitter: 120
```

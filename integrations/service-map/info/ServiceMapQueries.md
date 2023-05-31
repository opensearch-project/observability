# Service-map Queries


`index_service_map` = Graph Connection metadata
`raw_index = trace metadata`


* Get all nodes(services),

`select distinct(serviceName) from index_service_map
`

* Get all edges

`select t1.serviceName, t2.serviceName from index_service_map t1, index_service_map t2 where t2.destination.domain == t1.target.domain && t2.destination.resource == t1.target.resource
`

## Metric Queries

* Get Latency Metrics (for each service)

for each X in nodes:

```
select avg(durationInNanos) from raw_index t1
where t1.serviceName = X
and 
(
(t1.name in (select target.resource from index_service_map where serviceName=X)
and t1.parentSpanId exists)
or
t1.parentSpanId does not exists
)
```



* GetThroughput → GetRequestCount

for each X in nodes:

```
select count(distinct(spanId)) from raw_index t1
where t1.serviceName = X
and 
(
(t1.name in (select target.resource from index_service_map where serviceName=X)
and t1.parentSpanId exists)
or
t1.parentSpanId does not exists
)
```

* Get Error Rate

for each X in nodes:
errorCount =

```
select count(distinct(spanId)) from raw_index t1
where t1.serviceName = X
and 
(
(t1.name in (select target.resource from index_service_map where serviceName=X)
and t1.parentSpanId exists)
or
t1.parentSpanId does not exists
)
and t1.status is Error
```

errorRate = errorCount/throughput

## Filtering Queries

* Filter by TRACE_GROUP

for each node X,


```
select avg(durationInNanos) from raw_index t1
where t1.serviceName = X
and 
(
(t1.name in (select target.resource from index_service_map where serviceName=X and traceGroupName = TRACE_GROUP)
and t1.parentSpanId exists)
or
(t1.parentSpanId does not exists and t1.name = TRACE_GROUP)
)
and
t1.traceId in (list of TraceIds which are part of the TraceGroup)

```



* Filter by Trace Percentile

for each X in nodes:


```
select avg(durationInNanos) from raw_index t1
where t1.serviceName = X
and 
(
(t1.name in (select target.resource from index_service_map where serviceName=X)
and t1.parentSpanId exists)
or
t1.parentSpanId does not exists
)
and t1.TraceId in (list of TraceIds that are part of the percentile graph)

```


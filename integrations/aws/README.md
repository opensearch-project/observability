# AWS Integrations

The next library contains different AWS services Observability integrations

## Load Balancers Logs

Load balancers are a significant part in a cloud environment. Once your system need high availability, you are likely to require a load balancer in front of the different instances of your app.

AWS offers three types of load balancers, suitable for different scenarios: Elastic Load Balancers, Application Load Balancers, and Network Load Balancers.
ELB stands for [Elastic Load Balancer](https://aws.amazon.com/elasticloadbalancing/), as this was its name when it was first introduced in 2009 and was the only type of load balancer available.

ELB works at both layer 4 (TCP) and 7 (HTTP),ELB has quite a few limitations. 
 - it can’t forward traffic on more than one port per instance
 - it doesn’t support forwarding to IP addresses (can only forward to explicit EC2 instances or containers in ECS or EKS)
 - it doesn’t support websockets.

In 2016 AWS launched ELB version 2, which is made up of two products:
 - [Application Load Balancer (ALB)](https://aws.amazon.com/elasticloadbalancing/application-load-balancer/) 
 - [Network Load Balancer (NLB)](https://aws.amazon.com/elasticloadbalancing/network-load-balancer/)

They both use a similar architecture and concepts -  they use the concept of “target groups,” which is one additional level of redirection.
Listeners receive requests and decide to which target group they forward the requests. Both ALB and NLB can forward traffic to IP addresses.

**Observability supports the next load balance log integrations:**

 - [V1: Classic load balance logs]()
 - [V2: Application load balance logs](elb/info/README.md)
 - [V2: Network load balance logs]()

---

## s3 
Amazon Simple Storage Service [(Amazon S3)](https://aws.amazon.com/s3/) is an object storage service offering industry-leading scalability, data availability, security, and performance.

---

## cloudfront 
[Amazon CloudFront](https://aws.amazon.com/cloudfront/) is a content delivery network (CDN) service built for high performance, security, and developer convenience.

---

## config
[AWS config service](https://aws.amazon.com/config/) assesses, audits, and evaluates the configurations and relationships of your resources on AWS, on premises, and on other clouds.

 - AWS Config records details of changes to your resources to provide you with a configuration history. You can use the AWS Management Console, API, or CLI to obtain details of what a resource’s configuration looked like at any point in the past.
 - AWS Config helps you record software configuration changes within your Amazon Elastic Compute Cloud (EC2) instances and servers running on-premises, as well as servers and virtual machines in environments provided by other cloud providers.
 - AWS Config discovers, maps, and tracks AWS resource relationships in your account. For example, if a new EC2 security group is associated with an EC2 instance

---

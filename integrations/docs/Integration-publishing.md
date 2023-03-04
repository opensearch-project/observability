# Integration Publishing

Once an integration is created and tested, it should be signed and uploaded into a shared public dedicated repository   [The location / owners of this repository should be discussed ] is should be discussed .
Each published Integration artifact will be mandatory to attache the following (which would be validated during the upload:

**Metadata**
- Owner
- License
- Repository
- Documentation
- Versions
- All relevant versions the testing phase was created with

**Samples**
- Sample relevant signals data for the integration to be used as exemplar
- *OPTIONAL*: docker compose file including
- The agent generating data / mock data generator
- The Integration artifact part for translating the original format
- OpenSearch Observability relevant version to write the data into


#### **Open Search Integration Verification Review Process**

Once an integration is published, it goes into an OpenSearch Integration review process.
Once an integration is reviewed and validated - it will be published in OpenSearch’s recommendation Integrations and will be able to be assembled in the complete Observability Solution.

Verification process includes running the docker sample and verifying all the display components are functioning as expected.

***In the future*** OpenSearch can automate this process by requiring a dedicated API or baseline queries and functionality to work on the Integration thus automating this validation phase completely.

An investigation can also be published to the public repository without the review process. Integrations not passing this process would not be bundled in the Observability release or be lined and recommended by OpenSearch. Nevertheless they can still be manually Installed in an Observability cluster and the Installing party is responsible for making sure they will operate properly .

* * *


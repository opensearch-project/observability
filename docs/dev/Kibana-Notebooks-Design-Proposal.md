# RFC - Kibana Notebooks

## 1. Overview

### 1.1 Introduction

Notebooks provide a browser-based [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) built upon a number of popular [open-source](https://en.wikipedia.org/wiki/Open-source_software) libraries. Kibana Notebook will enable data-driven, interactive data analytics and collaborative documents to be created that can be used as live notes in Kibana. These notebooks can be used the following use-cases:

1. Create post-mortem documents

1. Build Live infrastructure reports

1. Foster explorative collaborations with data

### 1.2 Motivation

Dashboards offer a solution for a few selected use cases, and are a great tool if you’re focused on monitoring a known set of metrics over time. Notebooks enables contextual use of data with detailed explanations by allowing a user to combine saved visualizations, text, graphs and decorate data in elastic with other reference data sources.

## 2. Requirements

**A User Should be able to:**

1. Use Kibana Notebooks plugin for all the interactions
2. Use a Notebook UI to index/fetch/search elastic service and other interpreters
3. Share Notebooks for collaborative story telling
4. Do root cause analysis, run books and live infrastructure documentation
5. Use notebooks for facilitating trainings and knowledge transfers

**Functional Reqs.**

- CRUD operations on Notebook/Paragraph
- Share notebook with S3/Github
- Create/Use existing Visualizations

## 3. Design & Implementation

![Kibana Notebooks Architecture](images/notebooks_arch.png)

### 3.1 Design Details

**Key Players:**
ZB - Zeppelin Backend
KPB - Kibana Plugin Backend
KPF - Kibana Plugin Frontend
KS - Kibana Service

1. **Zeppelin Backend:**
   1. This is provided by [Apache Zeppelin](http://zeppelin.apache.org/). Further details on Zeppelin Backend in Section 3.2
   2. Provides all communication from and to a notebook & provides support for 25+ interpreters
   3. Deployed as a docker → Should start and stop with KS
   4. The communication between KPB & ZB is using session cookies
      1. The Authc credentials dummy user of a will be first sent to ZB by KPB to get a JSESSION Cookie
      2. Once received the cookie, it will be used by KPB till the end of the KS lifetime i.e. Once KS is restarted we’ll retrieve a new cookie and ZB also restart with KS
   5. The interpreter settings are updated in ZB by KPB via KS APIs for elasticsearch & JDBC(ODFE-SQL)
   6. Also, the Storage adapter configs are updated in ZB by KPF via KS as a form for elasticsearch & JDBC
   7. **Notes:**
      1. Dummy user should be later replaced with config info from Access Control module
      2. Access control should be inherited from User details from KS [Open distro Access control API](https://opendistro.github.io/for-elasticsearch-docs/docs/security-access-control/api/#access-control-for-the-api)
      3. Elastic Interpreter settings can be inherited from KS
      4. End points to these interpreters are needed to be specified before usage
2. **Kibana Plugin Backend**
   1. A Node Backend server for routing calls of ZB to KPF (and vice versa)
   2. Router Modules:
      1. InitConnector - Initiates with a cookie collection via dummy user and uses it for further communication
      2. InterpreterConnector - routes interpreter config info
      3. NotebookConnector - routes Notebook CRUD operations
      4. ParagraphConnector - routes Paragraph CRUD operations
      5. StorageConnector - routes storage adapter config info for S3/Github
      6. AccessControlConnector - routes access control config info
   3. Uses default [Hapi server](https://hapi.dev/) provided in KPB
      1. Uses [Wreck](https://hapi.dev/module/wreck/) plugin for HTTP client utilities.
3. **Kibana Plugin Frontend**
   1. ~~**Approach 1 - Use[Zeppelin-web](https://github.com/apache/zeppelin/tree/master/zeppelin-web) UI components**~~ : **Not considered further as their direction was moving towards [Angular Framework](https://angular.io/)**
      1. Check for reusable elements that can be used from Zeppelin-web Repo (mainly written in angular js)
   2. **~~Approach 2 - Use Open source Zeppelin UI repos~~ : Not considered further as implementation was partial and development was on a halt**
      1. https://github.com/gogumaa/zeppelin-web
   3. **Approach 3 - Build UI in react with open source js components**
      1. A React Service, inherits elements from [Elastic UI](https://elastic.github.io/eui/#/) elements & [Nteract.io components](https://components.nteract.io/)
      2. Visualizations support with [Plotly](https://plotly.com/javascript/), [Vega](https://vega.github.io/vega/) & [Elastic UI Charts](https://elastic.github.io/eui/#/elastic-charts/creating-charts)
      3. Import Visualizations from Kibana via KS APIs
   4. Here’s a sample wireframe
      ![Kibana Notebooks UI](images/UI.png)

### 3.2 APIs provided by Zeppelin Server

**Apache Zeppelin** provides several REST APIs for interaction and remote activation of zeppelin functionality. All REST APIs are available starting with the following endpoint `http://[zeppelin-server]:[zeppelin-port]/api`.

![Zeppelin Backend Architecture](images/zeppelin_arch.png)

1. **APIs Provided:**
   1. [**Server:**](http://zeppelin.apache.org/docs/0.9.0-preview1/usage/rest_api/zeppelin_server.html) Get status, version, Log Level
   2. [**Interpreter:**](http://zeppelin.apache.org/docs/0.9.0-preview1/usage/rest_api/interpreter.html) Get interpreter settings, create/update/restart/delete interpreter setting
   3. [**Notebook:**](http://zeppelin.apache.org/docs/0.9.0-preview1/usage/rest_api/notebook.html) Create/update/restart/delete note and paragraph ops
   4. [**Repository:**](http://zeppelin.apache.org/docs/0.9.0-preview1/usage/rest_api/notebook_repository.html) Get/Update NB repo
   5. [**Configuration:**](http://zeppelin.apache.org/docs/0.9.0-preview1/usage/rest_api/configuration.html) Get all [Zeppelin config](http://zeppelin.apache.org/docs/0.9.0-preview1/setup/operation/configuration.html) - server port, ssl, S3 bucket, S3.user
   6. [**Credential:**](http://zeppelin.apache.org/docs/0.9.0-preview1/usage/rest_api/credential.html) List credentials for all users, create/delete
   7. [**Helium:**](http://zeppelin.apache.org/docs/0.9.0-preview1/usage/rest_api/helium.html) Contains APIs for all plugin packages (Not needed as of now)
2. **Security:**
   1. By default the APIs are exposed to anonymous user
   2. Recommended way to use **access control**: **[Shiro Auth](http://zeppelin.apache.org/docs/0.9.0-preview1/setup/security/shiro_authentication.html)**
      1. Need to change [**Shiro.ini (Apache link)**](http://shiro.apache.org/configuration.html#ini-sections) in conf directory
      2. Ideally should be used with [Open distro Access control API](https://opendistro.github.io/for-elasticsearch-docs/docs/security-access-control/api/#access-control-for-the-api)
      3. Also, [Notebooks](http://zeppelin.apache.org/docs/0.9.0-preview1/setup/security/notebook_authorization.html) can have access control based on Shiro defined users
3. **Deployment:**
   1. Recommended way is to use stand alone docker
   2. Create a **custom docker** with new Shiro & Zeppelin configs, expose ports for elastic, kibana, and set interpreter config for elastic, odfesql and md.
   3. Sample scripts available in `scripts/docker/spark-cluster-managers`
4. **Storage:**
   1. Apache Zeppelin has a pluggable notebook storage mechanism controlled by `zeppelin.notebook.storage` configuration option with multiple implementations.
   2. Zeppelin has **built-in S3/github connector**. Just provide credentials in [properties or env-sh](http://zeppelin.apache.org/docs/0.9.0-preview1/setup/storage/storage.html#notebook-storage-in-s3)
   3. The notebooks will be automatically synced by Zeppelin

### 3.3 Screenshots:

- **Kibana Plugin Sample UI**:
  ![Sample UI](images/kibana_notebooks_ss.png)
- **Make requests to Elastic Service**:
  ![Elastic service UI](images/elastic_ss.png)
- **Transmit Data between Interpreters**:

  - Use output of an ODFE Query as save as a Zeppelin Context in a variable
    ![ODFE Query](images/odfe_ss_zepcontext.png)
  - Use the Zeppelin Context vairable and import it in python
    ![Import Context](images/python_ss.png)

- **Plot Visualization with Language specific Viz. tools (like Matplotlib)**:
  ![Matplot Viz.](images/matplot_ss.png)

## Appendix

_**What ideas do we have to address the above customer problem/opportunity?**_

- Introduce notebooks to users as a training tool
- Allow users to connect and join other datasets using external interpreters

_**Open source components used to build the tool**_

- Built on [Apache Zeppelin](http://zeppelin.apache.org/), [Nteract.io components](https://components.nteract.io/) and [Vega](https://vega.github.io/vega/)/[Plotly Visualizations](https://plotly.com/javascript/)

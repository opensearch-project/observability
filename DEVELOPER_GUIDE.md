## Developer Guide

So you want to contribute code to this project? Excellent! We're glad you're here. Here's what you need to do.

### Install Prerequisites

#### JDK 11

OpenSearch builds using Java 11 at a minimum. This means you must have a JDK 11
installed with the environment variable `JAVA_HOME` referencing the path to Java home
for your JDK 11 installation, e.g. `JAVA_HOME=/usr/lib/jvm/jdk-11`.

By default, tests use the same runtime as `JAVA_HOME`.

### Setup

1. Download OpenSearch for the version that matches the [OpenSearch Dashboards version specified in opensearch_dashboards.json](./dashboards-observability/opensearch_dashboards.json#L3) from [opensearch.org](https://opensearch.org/downloads.html).
1. Download the OpenSearch Dashboards source code for the [version specified in opensearch_dashboards.json](./dashboards-observability/opensearch_dashboards.json#L3) you want to set up.
1. Change your node version to the version specified in `.node-version` inside the OpenSearch Dashboards root directory.
1. cd into `OpenSearch-Dashboards` and remove the `plugins` directory.
1. Check out this package from version control as the `plugins` directory.
```bash
git clone https://github.com/opensearch-project/observability plugins --no-checkout
cd plugins
echo 'dashboards-observability/*' >> .git/info/sparse-checkout
git config core.sparseCheckout true
git checkout main
```
6. Run `yarn osd bootstrap` inside `OpenSearch-Dashboards/plugins/dashboards-observability`.

Ultimately, your directory structure should look like this:

```md
.
├── OpenSearch-Dashboards
│   └── plugins
│       └── dashboards-observability
```

### Build

To build the plugin's distributable zip simply run `yarn build`.

Example output: `./build/observability*.zip`

### Run

cd back to `OpenSearch-Dashboards` directory and run `yarn start` to start OpenSearch Dashboards including this plugin. OpenSearch Dashboards will be available on `localhost:5601`.

### Submitting Changes

See [CONTRIBUTING](CONTRIBUTING.md).

### Backports

The Github workflow in [`backport.yml`](.github/workflows/backport.yml) creates backport PRs automatically when the original PR
with an appropriate label `backport <backport-branch-name>` is merged to main with the backport workflow run successfully on the
PR. For example, if a PR on main needs to be backported to `1.x` branch, add a label `backport 1.x` to the PR and make sure the
backport workflow runs on the PR along with other checks. Once this PR is merged to main, the workflow will create a backport PR
to the `1.x` branch.

## Developer Guide

So you want to contribute code to this project? Excellent! We're glad you're here. Here's what you need to do.

### Setup

1. Download OpenSearch for the version that matches the [OpenSearch Dashboards version specified in package.json](./package.json#L5).
1. Download the OpenSearch Dashboards source code for the [version specified in package.json](./package.json#L5) you want to set up.

1. Change your node version to the version specified in `.node-version` inside the OpenSearch Dashboards root directory.
1. cd into `plugins` directory in the OpenSearch Dashboards source code directory.
1. Check out this package from version control into the `plugins` directory.
1. Run `yarn osd bootstrap` inside `OpenSearch-Dashboards/plugins/trace-analytics`.

Ultimately, your directory structure should look like this:

```md
.
├── OpenSearch-Dashboards
│   └── plugins
│       └── trace-analytics
```

### Build

To build the plugin's distributable zip simply run `yarn build`.

Example output: `./build/trace-analytics-dashboards*.zip`

### Run

- `yarn start`

  Starts OpenSearch Dashboards and includes this plugin. OpenSearch Dashboards will be available on `localhost:5601`.

### Submitting Changes

See [CONTRIBUTING](CONTRIBUTING.md).

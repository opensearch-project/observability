# OpenSearch Dashboards Notebooks

Dashboards offer a solution for a few selected use cases, and are great tools if you’re focused on monitoring a known set of metrics over time. Notebooks enables contextual use of data with detailed explanations by allowing a user to combine saved visualizations, text, graphs and decorate data in elastic with other reference data sources.

## Documentation

Please see our technical [documentation](https://docs-beta.opensearch.org/docs/opensearch-dashboards/notebooks/) to learn more about its features.

## Setup

1. Download OpenSearch for the version that matches the [OpenSearch Dashboards version specified in package.json](./package.json#L7).
1. Download the OpenSearch Dashboards source code for the [version specified in package.json](./package.json#L7) you want to set up.

1. Change your node version to the version specified in `.node-version` inside the OpenSearch Dashboards root directory.
1. Create a `plugins` directory inside the OpenSearch Dashboards source code directory, if `plugins` directory doesn't exist.
1. Check out this package from version control into the `plugins` directory.
   ```
   git clone git@github.com:opensearch-project/dashboards-notebooks.git plugins --no-checkout
   cd plugins
   echo 'dashboards-notebooks/*' >> .git/info/sparse-checkout
   git config core.sparseCheckout true
   git checkout dev
   ```
1. Run `yarn osd bootstrap` inside `OpenSearch-Dashboards/plugins/dashboards-notebooks`.

Ultimately, your directory structure should look like this:

```md
.
├── OpenSearch Dashboards
│   └── plugins
│       └── dashboards-notebooks
```

## Build

To build the plugin's distributable zip simply run `yarn build`.

Example output: `./build/dashboardsNotebooks*.zip`


## Run

- `yarn start`

  Starts OpenSearch Dashboards and includes this plugin. OpenSearch Dashboards will be available on `localhost:5601`.

- `yarn test:cypress`

  Runs the plugin cypress tests.

## Contributing to OpenSearch Dashboards Notebooks

We welcome you to get involved in development, documentation, testing the notebooks plugin. See our [CONTRIBUTING.md](./../CONTRIBUTING.md) and join in.

## Bugs, Enhancements or Questions

Please file an issue to report any bugs you may find, enhancements you may need or questions you may have [here](https://github.com/opensearch-project/dashboards-notebooks/issues).

## License

This code is licensed under the Apache 2.0 License.

## Copyright

Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.

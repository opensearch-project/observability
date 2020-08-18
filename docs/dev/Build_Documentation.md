# Build Kibana Notebooks Plugin

## Setup Elasticsearch & Kibana dev environment and use the plugin

- Clone Kibana repo and change directory into it

```
    git clone https://github.com/elastic/kibana.git kibana
    cd kibana
```

- Switch to branch 7.9

```
    git checkout 7.9
```

- Install the version of Node.js listed in the `.node-version` file. Use [nvm](https://github.com/creationix/nvm), [nvm-windows](https://github.com/coreybutler/nvm-windows) or [avn](https://github.com/wbyoung/avn)

```
    nvm use
```

- Edit Kibana optimizer :
  - Delete [this line](https://github.com/elastic/kibana/blob/7.9/packages/kbn-optimizer/src/worker/webpack.config.ts#L70) in webpack.config.ts (this interrupts build, as nteract components use ES2015 syntax)
- Bootstrap Kibana and install all the dependencies with [yarn](https://yarnpkg.com/)

```
    yarn kbn bootstrap
```

- Start Elasticsearch service from snapshot

```
    yarn es snapshot -E path.data=../data --license oss
```

- Clone the notebooks plugin in the plugins directory

```
    mkdir plugins
    cd plugins
    git clone https://github.com/opendistro-for-elasticsearch/kibana-notebooks.git
    cd kibana-notebooks
```

- **[Optional] If using Zeppelin Backend Adaptor:**
  - Setup Zeppelin as mentioned in [Apache Zeppelin Setup: Zeppelin Backend Adaptor](https://quip-amazon.com/FQ2PAAYafaBq#MQO9CAQm0Zm)
  - Edit [this line](https://github.com/opendistro-for-elasticsearch/kibana-notebooks/blob/migrated-7.9.0/common/index.ts#L19) to `SELECTED_BACKEND = 'ZEPPELIN';`
  - Edit [this line](https://github.com/opendistro-for-elasticsearch/kibana-notebooks/blob/migrated-7.9.0/common/index.ts#L21) for adding Zeppelin endpoint `zeppelinURL = 'http://localhost:8080';`
- Start Kibana

```
    cd /path/to/kibana
    nvm use
    yarn start --oss
```

- Happy Notebooking :)

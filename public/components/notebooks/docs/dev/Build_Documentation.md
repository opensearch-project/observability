# Build OpenSearch Dashboards Notebooks Plugin

## Setup OpenSearch & OpenSearch Dashboards dev environment and use the plugin with Zeppelin

- Please follow [README.md](../../../../../../DEVELOPER_GUIDE.md) for build instructions.

- **[Optional] If using Zeppelin Backend Adaptor:**
  - Setup Zeppelin as mentioned in [Apache Zeppelin Setup: Zeppelin Backend Adaptor](./Zeppelin_backend_adaptor.md#apache-zeppelin-setup)
  - Edit [this line](https://github.com/opensearch-project/dashboards-notebooks/blob/dev/common/index.ts#L19) to `SELECTED_BACKEND = 'ZEPPELIN';`
  - Edit [this line](https://github.com/opensearch-project/dashboards-notebooks/blob/dev/common/index.ts#L21) for adding Zeppelin endpoint `zeppelinURL = 'http://localhost:8080';`
- Start OpenSearch Dashboards

- More on [Usage of Plugin](./Usage_Documentation.md)

- Happy Notebooking :)

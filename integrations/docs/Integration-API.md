# Integration API

Integrations are a stateful bundle which will be stored inside a system `.integration` index which will reflect the integration's status during the different phases of its lifecycle.

---
**Integration Loading Lifecycle API**: 

## Load Integrations

### Verify Integration

### Create data-stream

### Load dashboards  

### Load visualizations  

### Load Sample data

---

**Integration availability queries & filters:**

## Filter By Name / Type / Category 

---

#### Communication channels
Integration installation process has 3 communication channels :
- Configuration channel to the Observability object store / Kibana index
- Data channel to the PPL Plugin and eventually accessing the default Observability indices and Observability supplements indices.
- Repo channel from which the integration is discovered, loaded and updated.

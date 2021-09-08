/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

import { OPENSEARCH_PANELS_API } from 'common/constants/shared';

export function OpenSearchObservabilityPlugin(Client: any, config: any, components: any) {
  const clientAction = components.clientAction.factory;

  Client.prototype.observability = components.clientAction.namespaceFactory();
  const observability = Client.prototype.observability.prototype;

  observability.getPanels = clientAction({
    url: {
      fmt: OPENSEARCH_PANELS_API.GET_PANELS,
      params: {
        fromIndex: {
          type: 'number',
        },
        maxItems: {
          type: 'number',
        },
      },
    },
    method: 'GET',
  });

  observability.createPanel = clientAction({
    url: {
      fmt: OPENSEARCH_PANELS_API.PANEL,
    },
    method: 'POST',
    needBody: true,
  });

  observability.getPanelById = clientAction({
    url: {
      fmt: `${OPENSEARCH_PANELS_API.PANEL}/<%=panelId%>`,
      req: {
        panelId: {
          type: 'string',
          required: true,
        },
      },
    },
    method: 'GET',
  });

  observability.updatePanelById = clientAction({
    url: {
      fmt: `${OPENSEARCH_PANELS_API.PANEL}/<%=panelId%>`,
      req: {
        panelId: {
          type: 'string',
          required: true,
        },
      },
    },
    method: 'PUT',
    needBody: true,
  });

  observability.deletePanelById = clientAction({
    url: {
      fmt: `${OPENSEARCH_PANELS_API.PANEL}/<%=panelId%>`,
      req: {
        panelId: {
          type: 'string',
          required: true,
        },
      },
    },
    method: 'DELETE',
  });
}

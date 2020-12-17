/*
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import { ES_NOTEBOOKS_API } from "../../common";

export function NotebooksPlugin(Client: any, config: any, components: any) {
  const clientAction = components.clientAction.factory;

  Client.prototype.notebooks = components.clientAction.namespaceFactory();
  const notebooks = Client.prototype.notebooks.prototype;

  notebooks.getNotebooks = clientAction({
    url: {
      fmt: ES_NOTEBOOKS_API.GET_NOTEBOOKS,
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

  notebooks.createNotebook = clientAction({
    url: {
      fmt: ES_NOTEBOOKS_API.NOTEBOOK,
    },
    method: 'POST',
    needBody: true,
  });

  notebooks.getNotebookById = clientAction({
    url: {
      fmt: `${ES_NOTEBOOKS_API.NOTEBOOK}/<%=notebookId%>`,
      req: {
        notebookId: {
          type: 'string',
          required: true,
        },
      },
    },
    method: 'GET',
  });

  notebooks.updateNotebookById = clientAction({
    url: {
      fmt: `${ES_NOTEBOOKS_API.NOTEBOOK}/<%=notebookId%>`,
      req: {
        notebookId: {
          type: 'string',
          required: true,
        },
      },
    },
    method: 'PUT',
    needBody: true,
  });

  notebooks.deleteNotebookById = clientAction({
    url: {
      fmt: `${ES_NOTEBOOKS_API.NOTEBOOK}/<%=notebookId%>`,
      req: {
        notebookId: {
          type: 'string',
          required: true,
        },
      },
    },
    method: 'DELETE',
  });

}

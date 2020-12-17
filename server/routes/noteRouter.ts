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

import { schema } from '@kbn/config-schema';
import {
  IRouter,
  IKibanaResponse,
  ResponseError,
  ILegacyScopedClusterClient,
} from '../../../../src/core/server';
import { API_PREFIX, wreckOptions } from '../../common';
import BACKEND from '../adaptors';

export function NoteRouter(router: IRouter) {
  // Fetch all the notebooks available
  router.get(
    {
      path: `${API_PREFIX}/`,
      validate: {},
    },
    async (context, request, response): Promise<IKibanaResponse<any | ResponseError>> => {
      const esNotebooksClient: ILegacyScopedClusterClient = context.notebooks_plugin.esNotebooksClient.asScoped(
        request
      );
      let notebooksData = [];
      try {
        notebooksData = await BACKEND.viewNotes(esNotebooksClient, wreckOptions);
        return response.ok({
          body: {
            data: notebooksData,
          },
        });
      } catch (error) {
        console.log('Notebook:', error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // Get all paragraphs of notebooks
  router.get(
    {
      path: `${API_PREFIX}/note/{noteId}`,
      validate: {
        params: schema.object({
          noteId: schema.string(),
        }),
      },
    },
    async (context, request, response): Promise<IKibanaResponse<any | ResponseError>> => {
      const esNotebooksClient: ILegacyScopedClusterClient = context.notebooks_plugin.esNotebooksClient.asScoped(
        request
      );
      try {
        const notebookinfo = await BACKEND.fetchNote(esNotebooksClient, request.params.noteId, wreckOptions);
        return response.ok({
          body: notebookinfo,
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // Add a Notebook
  router.post(
    {
      path: `${API_PREFIX}/note`,
      validate: {
        body: schema.object({
          name: schema.string(),
        }),
      },
    },
    async (context, request, response): Promise<IKibanaResponse<any | ResponseError>> => {
      const esNotebooksClient: ILegacyScopedClusterClient = context.notebooks_plugin.esNotebooksClient.asScoped(
        request
      );
      try {
        const addResponse = await BACKEND.addNote(esNotebooksClient, request.body, wreckOptions);
        return response.ok({
          body: addResponse.message.notebookId,
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // Rename a notebook
  router.put(
    {
      path: `${API_PREFIX}/note/rename`,
      validate: {
        body: schema.object({
          name: schema.string(),
          noteId: schema.string(),
        }),
      },
    },
    async (context, request, response): Promise<IKibanaResponse<any | ResponseError>> => {
      const esNotebooksClient: ILegacyScopedClusterClient = context.notebooks_plugin.esNotebooksClient.asScoped(
        request
      );
      try {
        const renameResponse = await BACKEND.renameNote(esNotebooksClient, request.body, wreckOptions);
        return response.ok({
          body: renameResponse,
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // Clone a notebook
  router.post(
    {
      path: `${API_PREFIX}/note/clone`,
      validate: {
        body: schema.object({
          name: schema.string(),
          noteId: schema.string(),
        }),
      },
    },
    async (context, request, response): Promise<IKibanaResponse<any | ResponseError>> => {
      const esNotebooksClient: ILegacyScopedClusterClient = context.notebooks_plugin.esNotebooksClient.asScoped(
        request
      );
      try {
        const cloneResponse = await BACKEND.cloneNote(esNotebooksClient, request.body, wreckOptions);
        return response.ok({
          body: cloneResponse,
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  // Delete a notebook
  router.delete(
    {
      path: `${API_PREFIX}/note/{noteid}`,
      validate: {
        params: schema.object({
          noteid: schema.string(),
        }),
      },
    },
    async (context, request, response): Promise<IKibanaResponse<any | ResponseError>> => {
      const esNotebooksClient: ILegacyScopedClusterClient = context.notebooks_plugin.esNotebooksClient.asScoped(
        request
      );
      try {
        const delResponse = await BACKEND.deleteNote(esNotebooksClient, request.params.noteid, wreckOptions);
        return response.ok({
          body: delResponse,
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );
}

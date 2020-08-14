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
import { IRouter, IKibanaResponse, ResponseError } from '../../../../src/core/server';
import { API_PREFIX, wreckOptions } from '../../common';
import BACKEND from '../adaptors';

export function NoteRouter(router: IRouter) {
  // Fetch all the notebooks available
  router.get(
    {
      path: `${API_PREFIX}/`,
      validate: false,
    },
    async (context, request, response): Promise<IKibanaResponse<any | ResponseError>> => {
      let notebooksData = [];
      try {
        notebooksData = await BACKEND.viewNotes(context, wreckOptions);
        return response.ok({
          body: {
            data: notebooksData,
          },
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: {
            data: notebooksData,
          },
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
      let notebookinfo = [];
      try {
        notebookinfo = await BACKEND.fetchNote(context, request.params.noteId, wreckOptions);
        return response.ok({
          body: {
            paragraphs: notebookinfo,
          },
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: {
            paragraphs: notebookinfo,
          },
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
      let addResponse = {};
      try {
        addResponse = await BACKEND.addNote(context, request.body, wreckOptions);
        return response.ok({
          body: addResponse,
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: {
            body: addResponse,
          },
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
      let renameResponse = {};
      try {
        renameResponse = await BACKEND.renameNote(context, request.body, wreckOptions);
        return response.ok({
          body: renameResponse,
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: {
            body: renameResponse,
          },
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
      let cloneResponse = {};
      try {
        const cloneResponse = await BACKEND.cloneNote(context, request.body, wreckOptions);
        return response.ok({
          body: cloneResponse,
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: {
            body: cloneResponse,
          },
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
      let delResponse = {};
      try {
        delResponse = await BACKEND.deleteNote(context, request.params.noteid, wreckOptions);
        return response.ok({
          body: delResponse,
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: {
            body: delResponse,
          },
        });
      }
    }
  );

  // Export a notebook
  router.get(
    {
      path: `${API_PREFIX}/note/export/{noteid}`,
      validate: {
        params: schema.object({
          noteid: schema.string(),
        }),
      },
    },
    async (context, request, response): Promise<IKibanaResponse<any | ResponseError>> => {
      let exportResponse = {};
      try {
        const exportResponse = await BACKEND.exportNote(
          context,
          request.params.noteid,
          wreckOptions
        );
        return response.ok({
          body: exportResponse.body,
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: {
            body: exportResponse,
          },
        });
      }
    }
  );

  // Import a notebook
  router.post(
    {
      path: `${API_PREFIX}/note/import`,
      validate: {
        body: schema.object({
          noteObj: schema.any(),
        }),
      },
    },
    async (context, request, response): Promise<IKibanaResponse<any | ResponseError>> => {
      let importResponse = {};
      try {
        importResponse = await BACKEND.importNote(context, request.body.noteObj, wreckOptions);
        return response.ok({
          body: importResponse,
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: {
            body: importResponse,
          },
        });
      }
    }
  );
}

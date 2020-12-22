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
import { IRouter, IKibanaResponse, ResponseError, ILegacyScopedClusterClient } from '../../../../src/core/server';
import { API_PREFIX, wreckOptions } from '../../common';
import BACKEND from '../adaptors';
import { DefaultNotebooks, DefaultParagraph } from '../helpers/default_notebook_schema';

export function ParaRouter(router: IRouter) {
  /* --> Updates the input content in a paragraph
   * --> Runs the paragraph
   * --> Fetches the updated Paragraph (with new input content)
   */
  router.post(
    {
      path: `${API_PREFIX}/paragraph/update/run/`,
      validate: {
        body: schema.object({
          noteId: schema.string(),
          paragraphId: schema.string(),
          paragraphInput: schema.string(),
        }),
      },
    },
    async (context, request, response): Promise<IKibanaResponse<any | ResponseError>> => {
      const esNotebooksClient: ILegacyScopedClusterClient = context.notebooks_plugin.esNotebooksClient.asScoped(
        request
      );
      try {
        const runResponse = await BACKEND.updateRunFetchParagraph(
          esNotebooksClient,
          request.body,
          wreckOptions
        );
        return response.ok({
          body: runResponse,
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  /* --> Updates the input content in a paragraph
   * --> Fetches the updated Paragraph (with new input content)
   */
  router.put(
    {
      path: `${API_PREFIX}/paragraph/`,
      validate: {
        body: schema.object({
          noteId: schema.string(),
          paragraphId: schema.string(),
          paragraphInput: schema.string(),
        }),
      },
    },
    async (context, request, response): Promise<IKibanaResponse<any | ResponseError>> => {
      const esNotebooksClient: ILegacyScopedClusterClient = context.notebooks_plugin.esNotebooksClient.asScoped(
        request
      );
      try {
        const saveResponse = await BACKEND.updateFetchParagraph(
          esNotebooksClient,
          request.body,
          wreckOptions
        );
        return response.ok({
          body: saveResponse,
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  /* --> Adds a new paragraph
   * --> Fetches the added Paragraph
   */
  router.post(
    {
      path: `${API_PREFIX}/paragraph/`,
      validate: {
        body: schema.object({
          noteId: schema.string(),
          paragraphIndex: schema.number(),
          paragraphInput: schema.string(),
          inputType: schema.string(),
        }),
      },
    },
    async (context, request, response): Promise<IKibanaResponse<any | ResponseError>> => {
      const esNotebooksClient: ILegacyScopedClusterClient = context.notebooks_plugin.esNotebooksClient.asScoped(
        request
      );
      try {
        const addResponse = await BACKEND.addFetchNewParagraph(esNotebooksClient, request.body, wreckOptions);
        return response.ok({
          body: addResponse,
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  /* --> Update paragraphs in backend with paragraphs passed in
   * --> Fetches the added Paragraph
   */
  router.post(
    {
      path: `${API_PREFIX}/set_paragraphs/`,
      validate: {
        body: schema.object({
          noteId: schema.string(),
          paragraphs: schema.arrayOf(schema.object({
            output: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
            input: schema.object({
              inputText: schema.string(),
              inputType: schema.string(),
            }),
            dateCreated: schema.string(),
            dateModified: schema.string(),
            id: schema.string(),
          })),
        }),
      },
    },
    async (context, request, response): Promise<IKibanaResponse<any | ResponseError>> => {
      const esNotebooksClient: ILegacyScopedClusterClient = context.notebooks_plugin.esNotebooksClient.asScoped(
        request
      );
      try {
        const updateNotebook: Partial<DefaultNotebooks> = {
          paragraphs: request.body.paragraphs as Array<DefaultParagraph>,
          dateModified: new Date().toISOString(),
        };
        const updateResponse = await BACKEND.updateNote(esNotebooksClient, request.body.noteId, updateNotebook);
        return response.ok({
          body: updateResponse,
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  /* --> Deletes a paragraph
   * --> Fetches the all other Paragraphs as a list
   */
  router.delete(
    {
      path: `${API_PREFIX}/paragraph/{ids*2}`,
      validate: {
        params: schema.object({
          ids: schema.string(),
        }),
      },
    },
    async (context, request, response): Promise<IKibanaResponse<any | ResponseError>> => {
      const esNotebooksClient: ILegacyScopedClusterClient = context.notebooks_plugin.esNotebooksClient.asScoped(
        request
      );
      const params = {
        noteId: request.params.ids.split('/')[0],
        paragraphId: request.params.ids.split('/')[1],
      };
      try {
        const deleteResponse = await BACKEND.deleteFetchParagraphs(esNotebooksClient, params, wreckOptions);
        return response.ok({
          body: deleteResponse,
        });
      } catch (error) {
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );

  /* --> Clears output for all the paragraphs
   * --> Fetches the all Paragraphs as a list (with cleared outputs)
   */
  router.put(
    {
      path: `${API_PREFIX}/paragraph/clearall/`,
      validate: {
        body: schema.object({
          noteId: schema.string(),
        }),
      },
    },
    async (context, request, response): Promise<IKibanaResponse<any | ResponseError>> => {
      const esNotebooksClient: ILegacyScopedClusterClient = context.notebooks_plugin.esNotebooksClient.asScoped(
        request
      );
      try {
        const clearParaResponse = await BACKEND.clearAllFetchParagraphs(
          esNotebooksClient,
          request.body,
          wreckOptions
        );
        return response.ok({
          body: clearParaResponse,
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

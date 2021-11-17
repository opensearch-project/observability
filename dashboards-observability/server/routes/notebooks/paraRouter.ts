/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { schema } from '@osd/config-schema';
import {
  ILegacyScopedClusterClient,
  IOpenSearchDashboardsResponse,
  IRouter,
  ResponseError,
} from '../../../../../src/core/server';
import { NOTEBOOKS_API_PREFIX, wreckOptions } from '../../../common/constants/notebooks';
import BACKEND from '../../adaptors/notebooks';
import {
  DefaultNotebooks,
  DefaultParagraph,
} from '../../common/helpers/notebooks/default_notebook_schema';

export function registerParaRoute(router: IRouter) {
  /* --> Updates the input content in a paragraph
   * --> Runs the paragraph
   * --> Fetches the updated Paragraph (with new input content)
   */
  router.post(
    {
      path: `${NOTEBOOKS_API_PREFIX}/paragraph/update/run/`,
      validate: {
        body: schema.object({
          noteId: schema.string(),
          paragraphId: schema.string(),
          paragraphInput: schema.string(),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const opensearchNotebooksClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );
      try {
        const runResponse = await BACKEND.updateRunFetchParagraph(
          context.observability_plugin.observabilityClient,
          request,
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
      path: `${NOTEBOOKS_API_PREFIX}/paragraph/`,
      validate: {
        body: schema.object({
          noteId: schema.string(),
          paragraphId: schema.string(),
          paragraphInput: schema.string(),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const opensearchNotebooksClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );
      try {
        const saveResponse = await BACKEND.updateFetchParagraph(
          opensearchNotebooksClient,
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
      path: `${NOTEBOOKS_API_PREFIX}/paragraph/`,
      validate: {
        body: schema.object({
          noteId: schema.string(),
          paragraphIndex: schema.number(),
          paragraphInput: schema.string(),
          inputType: schema.string(),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const opensearchNotebooksClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );
      try {
        const addResponse = await BACKEND.addFetchNewParagraph(
          opensearchNotebooksClient,
          request.body,
          wreckOptions
        );
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
      path: `${NOTEBOOKS_API_PREFIX}/set_paragraphs/`,
      validate: {
        body: schema.object({
          noteId: schema.string(),
          paragraphs: schema.arrayOf(
            schema.object({
              output: schema.maybe(schema.arrayOf(schema.object({}, { unknowns: 'allow' }))),
              input: schema.object({
                inputText: schema.string(),
                inputType: schema.string(),
              }),
              dateCreated: schema.string(),
              dateModified: schema.string(),
              id: schema.string(),
            })
          ),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const opensearchNotebooksClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );
      try {
        const updateNotebook: Partial<DefaultNotebooks> = {
          paragraphs: request.body.paragraphs as Array<DefaultParagraph>,
          dateModified: new Date().toISOString(),
        };
        const updateResponse = await BACKEND.updateNote(
          opensearchNotebooksClient,
          request.body.noteId,
          updateNotebook
        );
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
      path: `${NOTEBOOKS_API_PREFIX}/paragraph/{ids*2}`,
      validate: {
        params: schema.object({
          ids: schema.string(),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const opensearchNotebooksClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );
      const params = {
        noteId: request.params.ids.split('/')[0],
        paragraphId: request.params.ids.split('/')[1],
      };
      try {
        const deleteResponse = await BACKEND.deleteFetchParagraphs(
          opensearchNotebooksClient,
          params,
          wreckOptions
        );
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
      path: `${NOTEBOOKS_API_PREFIX}/paragraph/clearall/`,
      validate: {
        body: schema.object({
          noteId: schema.string(),
        }),
      },
    },
    async (
      context,
      request,
      response
    ): Promise<IOpenSearchDashboardsResponse<any | ResponseError>> => {
      const opensearchNotebooksClient: ILegacyScopedClusterClient = context.observability_plugin.observabilityClient.asScoped(
        request
      );
      try {
        const clearParaResponse = await BACKEND.clearAllFetchParagraphs(
          opensearchNotebooksClient,
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

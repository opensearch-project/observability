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

import { NotebookAdaptor } from './notebook_adaptor';
import { RequestHandlerContext } from '../../../../src/core/server';
import { optionsType } from '../../common';

//NOTE: Placeholder for default adaptor
export class DefaultBackend implements NotebookAdaptor {
  backend = 'Default Backend';

  // Gets all the notebooks available
  viewNotes: (context: RequestHandlerContext, wreckOptions: optionsType) => Promise<any[]>;

  /* Fetches a notebook by id
   * Param: noteId -> Id of notebook to be fetched
   */
  fetchNote: (
    context: RequestHandlerContext,
    noteId: string,
    wreckOptions: optionsType
  ) => Promise<any[]>;

  /* Adds a notebook to storage
   * Param: name -> name of new notebook
   */
  addNote: (
    context: RequestHandlerContext,
    params: { name: string },
    wreckOptions: optionsType
  ) => Promise<any>;

  /* Renames a notebook
   * Params: name -> new name for the notebook to be renamed
   *         noteId -> Id of notebook to be fetched
   */
  renameNote: (
    context: RequestHandlerContext,
    params: { name: string; noteId: string },
    wreckOptions: optionsType
  ) => Promise<any>;

  /* Clone a notebook
   * Params: name -> new name for the cloned notebook
   *         noteId -> Id for the notebook to be cloned
   */
  cloneNote: (
    context: RequestHandlerContext,
    params: { name: string; noteId: string },
    wreckOptions: optionsType
  ) => Promise<any>;

  /* Delete a notebook
   * Param: noteId -> Id for the notebook to be deleted
   */
  deleteNote: (
    context: RequestHandlerContext,
    noteId: string,
    wreckOptions: optionsType
  ) => Promise<any>;

  /* Export a notebook
   * Param: noteId -> Id for the notebook to be exported
   */
  exportNote: (
    context: RequestHandlerContext,
    noteId: string,
    wreckOptions: optionsType
  ) => Promise<any>;

  /* Import a notebook
   * Params: noteObj -> note Object to be imported
   */
  importNote: (
    context: RequestHandlerContext,
    noteObj: any,
    wreckOptions: optionsType
  ) => Promise<any>;

  /* --> Updates a Paragraph with input content
   * --> Runs it
   * --> Fetches the updated Paragraph (with new input content and output result)
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be updated
   *         paragraphInput -> paragraph input code
   */
  updateRunFetchParagraph: (
    context: RequestHandlerContext,
    params: { noteId: string; paragraphId: string; paragraphInput: string },
    wreckOptions: optionsType
  ) => Promise<any>;

  /* --> Updates a Paragraph with input content
   * --> Fetches the updated Paragraph (with new input content)
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be updated
   *         paragraphInput -> paragraph input code
   */
  updateFetchParagraph: (
    context: RequestHandlerContext,
    params: { noteId: string; paragraphId: string; paragraphInput: string },
    wreckOptions: optionsType
  ) => Promise<any>;

  /* --> Adds a Paragraph with input content
   * --> Fetches the Paragraph
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be fetched
   */
  addFetchNewParagraph: (
    context: RequestHandlerContext,
    params: { noteId: string; paragraphIndex: string; paragraphInput: string },
    wreckOptions: optionsType
  ) => Promise<any>;

  /* --> Deletes a Paragraph with id
   * --> Fetches the all other Paragraphs as a list
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be deleted
   */
  deleteFetchParagraphs: (
    context: RequestHandlerContext,
    params: { noteId: string; paragraphId: string },
    wreckOptions: optionsType
  ) => Promise<{ paragraphs: any }>;

  /* --> Clears output for all the paragraphs
   * --> Fetches the all Paragraphs as a list (with cleared outputs)
   * Param: noteId -> Id of notebook to be cleared
   */
  clearAllFetchParagraphs: (
    context: RequestHandlerContext,
    params: { noteId: string },
    wreckOptions: optionsType
  ) => Promise<{ paragraphs: any }>;
}

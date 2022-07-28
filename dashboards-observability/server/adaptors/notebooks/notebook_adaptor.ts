/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { ILegacyScopedClusterClient } from '../../../../../src/core/server';
import { optionsType } from '../../../common/types/notebooks';

export interface NotebookAdaptor {
  backend: string;

  // Gets all the notebooks available
  viewNotes: (client: ILegacyScopedClusterClient, wreckOptions: optionsType) => Promise<any[]>;

  /* Fetches a notebook by id
   * Param: noteId -> Id of notebook to be fetched
   */
  fetchNote: (
    client: ILegacyScopedClusterClient,
    noteId: string,
    wreckOptions: optionsType
  ) => Promise<any>;

  /* Adds a notebook to storage
   * Param: name -> name of new notebook
   */
  addNote: (
    client: ILegacyScopedClusterClient,
    params: { name: string },
    wreckOptions: optionsType
  ) => Promise<any>;

  /* Renames a notebook
   * Params: name -> new name for the notebook to be renamed
   *         noteId -> Id of notebook to be fetched
   */
  renameNote: (
    client: ILegacyScopedClusterClient,
    params: { name: string; noteId: string },
    wreckOptions: optionsType
  ) => Promise<any>;

  /* Clone a notebook
   * Params: name -> new name for the cloned notebook
   *         noteId -> Id for the notebook to be cloned
   */
  cloneNote: (
    client: ILegacyScopedClusterClient,
    params: { name: string; noteId: string },
    wreckOptions: optionsType
  ) => Promise<any>;

  /* Delete a notebook
   * Param: noteId -> Id for the notebook to be deleted
   */
  deleteNote: (
    client: ILegacyScopedClusterClient,
    noteId: string,
    wreckOptions: optionsType
  ) => Promise<any>;

  /* Export a notebook
   * Param: noteId -> Id for the notebook to be exported
   */
  exportNote: (
    client: ILegacyScopedClusterClient,
    noteId: string,
    wreckOptions: optionsType
  ) => Promise<any>;

  /* Import a notebook
   * Params: noteObj -> note Object to be imported
   */
  importNote: (
    client: ILegacyScopedClusterClient,
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
    client: ILegacyScopedClusterClient,
    request: any,
    wreckOptions: optionsType
  ) => Promise<any>;

  /* --> Updates a Paragraph with input content
   * --> Fetches the updated Paragraph (with new input content)
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be updated
   *         paragraphInput -> paragraph input code
   */
  updateFetchParagraph: (
    client: ILegacyScopedClusterClient,
    params: { noteId: string; paragraphId: string; paragraphInput: string },
    wreckOptions: optionsType
  ) => Promise<any>;

  /* --> Adds a Paragraph with input content
   * --> Fetches the Paragraph
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be fetched
   */
  addFetchNewParagraph: (
    client: ILegacyScopedClusterClient,
    params: { noteId: string; paragraphIndex: number; paragraphInput: string; inputType: string },
    wreckOptions: optionsType
  ) => Promise<any>;

  /* --> Deletes a Paragraph with id
   * --> Fetches the all other Paragraphs as a list
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be deleted
   */
  deleteFetchParagraphs: (
    client: ILegacyScopedClusterClient,
    params: { noteId: string; paragraphId: string },
    wreckOptions: optionsType
  ) => Promise<{ paragraphs: any }>;

  /* --> Clears output for all the paragraphs
   * --> Fetches the all Paragraphs as a list (with cleared outputs)
   * Param: noteId -> Id of notebook to be cleared
   */
  clearAllFetchParagraphs: (
    client: ILegacyScopedClusterClient,
    params: { noteId: string },
    wreckOptions: optionsType
  ) => Promise<{ paragraphs: any }>;
}

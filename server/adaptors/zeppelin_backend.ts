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
import { requestor } from '../helpers/wreck_requests';

export class ZeppelinBackend implements NotebookAdaptor {
  backend = 'Zeppelin Backend';

  // Gets all the notebooks available from Zeppelin Server
  // ZS Endpoint => http://[zeppelin-server]:[zeppelin-port]/api/notebook
  viewNotes = async function (_context: RequestHandlerContext, wreckOptions: optionsType) {
    try {
      let output = [];
      const body = await requestor('GET', 'api/notebook/', wreckOptions);
      output = JSON.parse(body.toString()).body;
      return output;
    } catch (error) {
      throw new Error('View Notebooks Error:' + error);
    }
  };

  /* Fetches a notebook by id from Zeppelin Server
   * Param: noteId -> Id of notebook to be fetched
   * ZS Endpoint => http://[zeppelin-server]:[zeppelin-port]/api/notebook/[noteId]
   */
  fetchNote = async function (
    _context: RequestHandlerContext,
    noteId: string,
    wreckOptions: optionsType
  ) {
    try {
      const body = await requestor('GET', 'api/notebook/' + noteId, wreckOptions);
      return JSON.parse(body.toString()).body.paragraphs;
    } catch (error) {
      throw new Error('Fetching Notebook Error:' + error);
    }
  };

  /* Add a notebook to the Zeppelin Server
   * Param: name -> name of new notebook
   * ZS Endpoint => http://[zeppelin-server]:[zeppelin-port]/api/notebook
   */
  addNote = async function (
    _context: RequestHandlerContext,
    params: { name: string },
    wreckOptions: optionsType
  ) {
    wreckOptions.payload = params;
    try {
      const body = await requestor('POST', 'api/notebook/', wreckOptions);
      return JSON.parse(body.toString());
    } catch (error) {
      throw new Error('Creating New Notebook Error:' + error);
    }
  };

  /* Rename a notebook in Zeppelin Server
   * Params: name -> new name for the notebook to be renamed
   *         noteId -> Id of notebook to be fetched
   * ZS Endpoint => http://[zeppelin-server]:[zeppelin-port]/api/notebook/[noteId]/rename
   */
  renameNote = async function (
    _context: RequestHandlerContext,
    params: { name: string; noteId: string },
    wreckOptions: optionsType
  ) {
    wreckOptions.payload = { name: params.name };
    try {
      const body = await requestor(
        'PUT',
        'api/notebook/' + params.noteId + '/rename/',
        wreckOptions
      );
      return JSON.parse(body.toString());
    } catch (error) {
      throw new Error('Renaming Notebook Error:' + error);
    }
  };

  /* Clone a notebook in Zeppelin Server
   * Params: name -> new name for the cloned notebook
   *         noteId -> Id for the notebook to be cloned
   * ZS Endpoint => http://[zeppelin-server]:[zeppelin-port]/api/notebook/[noteId]
   */
  cloneNote = async function (
    _context: RequestHandlerContext,
    params: { name: string; noteId: string },
    wreckOptions: optionsType
  ) {
    wreckOptions.payload = { name: params.name };
    try {
      const body = await requestor('POST', 'api/notebook/' + params.noteId, wreckOptions);
      return JSON.parse(body.toString());
    } catch (error) {
      throw new Error('Cloning Notebook Error:' + error);
    }
  };

  /* Delete a notebook in Zeppelin Server
   * Param: noteId -> Id for the notebook to be deleted
   * ZS Endpoint => http://[zeppelin-server]:[zeppelin-port]/api/notebook
   */
  deleteNote = async function (
    _context: RequestHandlerContext,
    noteId: string,
    wreckOptions: optionsType
  ) {
    try {
      const body = await requestor('DELETE', 'api/notebook/' + noteId, wreckOptions);
      return JSON.parse(body.toString());
    } catch (error) {
      throw new Error('Deleting Notebook Error:' + error);
    }
  };

  /* Export a notebook from Zeppelin Server
   * Param: noteId -> Id for the notebook to be exported
   * ZS Endpoint => http://[zeppelin-server]:[zeppelin-port]/api/notebook/export/{noteid}
   */
  exportNote = async function (
    _context: RequestHandlerContext,
    noteId: string,
    wreckOptions: optionsType
  ) {
    try {
      const body = await requestor('GET', 'api/notebook/export/' + noteId, wreckOptions);
      return JSON.parse(body.toString());
    } catch (error) {
      throw new Error('Export Notebook Error:' + error);
    }
  };

  /* Import a notebook in Zeppelin Server
   * Params: noteObj -> note Object to be imported
   * ZS Endpoint => http://[zeppelin-server]:[zeppelin-port]/api/notebook/import
   */
  importNote = async function (
    _context: RequestHandlerContext,
    noteObj: any,
    wreckOptions: optionsType
  ) {
    wreckOptions.payload = noteObj;
    try {
      const body = await requestor('POST', 'api/notebook/import', wreckOptions);
      const respBody = JSON.parse(body.toString());
      return respBody;
    } catch (error) {
      throw new Error('Import Notebook Error:' + error);
    }
  };

  /* Add a paragraph in notebook
   * Params: noteId -> Id for the notebook
   *         paragraphIndex -> index(position) to add a new paragraph
   *         paragraphInput -> paragraph input code
   * ZS Endpoint => http://[zeppelin-server]:[zeppelin-port]/api/notebook/[noteId]/paragraph
   */
  addParagraph = async function (
    wreckOptions: optionsType,
    params: { paragraphIndex: string; noteId: string; paragraphInput: string }
  ) {
    wreckOptions.payload = {
      title: 'Paragraph inserted',
      text: params.paragraphInput,
      index: params.paragraphIndex,
    };

    try {
      const body = await requestor(
        'POST',
        'api/notebook/' + params.noteId + '/paragraph',
        wreckOptions
      );
      const respBody = JSON.parse(body.toString());
      return respBody;
    } catch (error) {
      throw new Error('Adding Paragraph Error:' + error);
    }
  };

  /* Update a Paragraph in notebook
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be updated
   *         paragraphInput -> paragraph input code
   * ZS Endpoint => http://[zeppelin-server]:[zeppelin-port]/api/notebook/[noteId]/paragraph/[paragraphId]
   */
  updateParagraph = async function (
    wreckOptions: optionsType,
    params: { noteId: string; paragraphId: string; paragraphInput: string }
  ) {
    wreckOptions.payload = {
      text: params.paragraphInput,
    };
    try {
      const body = await requestor(
        'PUT',
        'api/notebook/' + params.noteId + '/paragraph/' + params.paragraphId,
        wreckOptions
      );
      return JSON.parse(body.toString());
    } catch (error) {
      throw new Error('Updating Paragraph Error:' + error);
    }
  };

  /* Run a Paragraph in notebook
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be run
   * ZS Endpoint => http://[zeppelin-server]:[zeppelin-port]/api/notebook/run/[noteId]/[paragraphId]
   */
  runPara = async function (
    wreckOptions: optionsType,
    params: { noteId: string; paragraphId: string }
  ) {
    wreckOptions.payload = {};
    try {
      const body = await requestor(
        'POST',
        'api/notebook/run/' + params.noteId + '/' + params.paragraphId,
        wreckOptions
      );
      return JSON.parse(body.toString()).status;
    } catch (error) {
      throw new Error('Running Paragraph Error:' + error);
    }
  };

  /* Fetch a Paragraph from notebook
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be fetched
   * ZS Endpoint => http://[zeppelin-server]:[zeppelin-port]/api/notebook/[noteId]/paragraph/[paragraphId]
   */
  fetchParagraph = async function (
    wreckOptions: optionsType,
    params: { noteId: string; paragraphId: string }
  ) {
    try {
      const body = await requestor(
        'GET',
        'api/notebook/' + params.noteId + '/paragraph/' + params.paragraphId,
        wreckOptions
      );
      return JSON.parse(body.toString()).body;
    } catch (error) {
      throw new Error('Fetching Paragraph Error:' + error);
    }
  };

  /* Delete a Paragraph in notebook
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be deleted
   * ZS Endpoint => http://[zeppelin-server]:[zeppelin-port]/api/notebook/[noteId]/paragraph/[paragraphId]
   */
  deleteParagraph = async function (
    wreckOptions: optionsType,
    params: { noteId: string; paragraphId: string }
  ) {
    wreckOptions.payload = {};
    try {
      const body = await requestor(
        'DELETE',
        'api/notebook/' + params.noteId + '/paragraph/' + params.paragraphId,
        wreckOptions
      );
      return JSON.parse(body.toString()).status;
    } catch (error) {
      throw new Error('Deleting Paragraph Error:' + error);
    }
  };

  /* Clear all the paragraphs in the notebook
   * Param: noteId -> Id of notebook to be cleared
   * ZS Endpoint => http://[zeppelin-server]:[zeppelin-port]/api/notebook/[noteId]/clear
   */
  clearAllParagraphs = async function (wreckOptions: optionsType, noteid: string) {
    try {
      const body = await requestor('PUT', 'api/notebook/' + noteid + '/clear', wreckOptions);
      return JSON.parse(body.toString()).status;
    } catch (error) {
      throw new Error('Clearing Paragraph Error:' + error);
    }
  };

  /* --> Updates a Paragraph with input content
   * --> Runs it
   * --> Fetches the updated Paragraph (with new input content and output result)
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be updated
   *         paragraphInput -> paragraph input code
   */
  updateRunFetchParagraph = async function (
    _context: RequestHandlerContext,
    params: { noteId: string; paragraphId: string; paragraphInput: string },
    wreckOptions: optionsType
  ) {
    try {
      const updateInfo = await this.updateParagraph(wreckOptions, params);
      const runInfo = await this.runPara(wreckOptions, params);
      const getInfo = await this.fetchParagraph(wreckOptions, params);
      return getInfo;
    } catch (error) {
      throw new Error('Update Paragraph Error:' + error);
    }
  };

  /* --> Updates a Paragraph with input content
   * --> Fetches the updated Paragraph (with new input content)
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be updated
   *         paragraphInput -> paragraph input code
   */
  updateFetchParagraph = async function (
    _context: RequestHandlerContext,
    params: { noteId: string; paragraphId: string; paragraphInput: string },
    wreckOptions: optionsType
  ) {
    try {
      const updateInfo = await this.updateParagraph(wreckOptions, params);
      const getInfo = await this.fetchParagraph(wreckOptions, params);
      return getInfo;
    } catch (error) {
      throw new Error('Run Para Error:' + error);
    }
  };

  /* --> Adds a Paragraph with input content
   * --> Fetches the Paragraph
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be fetched
   */
  addFetchNewParagraph = async function (
    _context: RequestHandlerContext,
    params: { noteId: string; paragraphIndex: string; paragraphInput: string },
    wreckOptions: optionsType
  ) {
    try {
      const respBody = await this.addParagraph(wreckOptions, params);
      const payload = { ...params, paragraphId: respBody.body };
      const getinfo = await this.fetchParagraph(wreckOptions, payload);
      return getinfo;
    } catch (error) {
      throw new Error('addFetch Para Error:' + error);
    }
  };

  /* --> Deletes a Paragraph with id
   * --> Fetches the all other Paragraphs as a list
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be deleted
   */
  deleteFetchParagraphs = async function (
    context: RequestHandlerContext,
    params: { noteId: string; paragraphId: string },
    wreckOptions: optionsType
  ) {
    try {
      const delinfo = await this.deleteParagraph(wreckOptions, params);
      const notebookinfo = await this.fetchNote(context, params.noteId, wreckOptions);
      return { paragraphs: notebookinfo };
    } catch (error) {
      throw new Error('Delete Para Error:' + error);
    }
  };

  /* --> Clears output for all the paragraphs
   * --> Fetches the all Paragraphs as a list (with cleared outputs)
   * Param: noteId -> Id of notebook to be cleared
   */
  clearAllFetchParagraphs = async function (
    context: RequestHandlerContext,
    params: { noteId: string },
    wreckOptions: optionsType
  ) {
    try {
      const clearinfo = await this.clearAllParagraphs(wreckOptions, params.noteId);
      const notebookinfo = await this.fetchNote(context, params.noteId, wreckOptions);
      return { paragraphs: notebookinfo };
    } catch (error) {
      throw new Error('Clear Para Error:' + error);
    }
  };
}

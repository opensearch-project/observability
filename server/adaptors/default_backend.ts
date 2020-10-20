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

import { v4 as uuid } from 'uuid';
import { NotebookAdaptor } from './notebook_adaptor';
import { RequestHandlerContext } from '../../../../src/core/server';
import { optionsType, FETCH_SIZE } from '../../common';
import { RequestParams, errors } from '@elastic/elasticsearch';
import {
  DefaultNotebooks,
  DefaultParagraph,
  DefaultInput,
  DefaultOutput,
} from '../helpers/default_notebook_schema';

export class DefaultBackend implements NotebookAdaptor {
  backend = 'Default Backend';

  // Creates a new notebooks with sample markdown text
  createNewNotebook = (newNotebookName: string) => {
    const noteId = 'note_' + uuid();

    const noteObject: DefaultNotebooks = {
      id: noteId,
      dateCreated: new Date().toISOString(),
      name: newNotebookName,
      dateModified: new Date().toISOString(),
      pluginVersion: '7.9.0',
      backend: 'Default',
      paragraphs: [],
    };

    return {
      id: noteId,
      object: noteObject,
    };
  };

  // indexes a notebook with body provided
  indexNote = async function (context: RequestHandlerContext, noteId: string, body: any) {
    try {
      const options: RequestParams.Index = {
        index: '.notebooks',
        refresh: 'true',
        id: noteId,
        body: body,
      };
      const esClientResponse = await context.core.elasticsearch.legacy.client.callAsCurrentUser(
        'index',
        options
      );
      return esClientResponse;
    } catch (error) {
      throw new Error('Index Doc Error:' + error);
    }
  };

  // updates a notebook with updateBody provided as parameter
  updateNote = async function (context: RequestHandlerContext, noteId: string, updateBody: string) {
    try {
      const options: RequestParams.Update = {
        index: '.notebooks',
        refresh: 'true',
        id: noteId,
        body: {
          doc: updateBody,
        },
      };
      const esClientResponse = await context.core.elasticsearch.legacy.client.callAsCurrentUser(
        'update',
        options
      );
      return esClientResponse;
    } catch (error) {
      throw new Error('Update Doc Error:' + error);
    }
  };

  // fetched a notebook by Id
  getNote = async function (context: RequestHandlerContext, noteId: string) {
    try {
      const esClientResponse = await context.core.elasticsearch.legacy.client.callAsCurrentUser(
        'get',
        {
          index: '.notebooks',
          id: noteId,
        }
      );
      return esClientResponse._source;
    } catch (error) {
      throw new Error('Get Doc Error:' + error);
    }
  };

  // gets first `FETCH_SIZE` notebooks available
  viewNotes = async function (context: RequestHandlerContext, _wreckOptions: optionsType) {
    let esClientResponse;
    let data = [];
    try {
      const options: RequestParams.Search = {
        index: '.notebooks',
        size: FETCH_SIZE,
        _source: ['id', 'name', 'dateCreated', 'dateModified'],
        body: {
          query: {
            match_all: {},
          },
        },
      };
      esClientResponse = await context.core.elasticsearch.legacy.client.callAsCurrentUser(
        'search',
        options
      );
      esClientResponse.hits.hits.map((doc: { _source: { name: string; id: string; dateCreated: string; dateModified: string } }) => {
        data.push({
          path: doc._source.name,
          id: doc._source.id,
          dateCreated: doc._source.dateCreated,
          dateModified: doc._source.dateModified,
        });
      });
      return data;
    } catch (error) {
      if (error.body.error.type === 'index_not_found_exception') {
        return data;
      } else throw new Error('View Notebooks Error:' + error);
    }
  };

  /* Fetches a notebook by id
   * Param: noteId -> Id of notebook to be fetched
   */
  fetchNote = async function (
    context: RequestHandlerContext,
    noteId: string,
    _wreckOptions: optionsType
  ) {
    try {
      const noteObject = await this.getNote(context, noteId);
      return {
        path: noteObject.name,
        dateCreated: noteObject.dateCreated,
        dateModified: noteObject.dateModified,
        paragraphs: noteObject.paragraphs,
      }
    } catch (error) {
      throw new Error('Fetching Notebook Error:' + error);
    }
  };

  /* Adds a notebook to storage
   * Param: name -> name of new notebook
   */
  addNote = async function (
    context: RequestHandlerContext,
    params: { name: string },
    _wreckOptions: optionsType
  ) {
    try {
      const newNotebook = this.createNewNotebook(params.name);
      const esClientResponse = await this.indexNote(context, newNotebook.id, newNotebook.object);
      return { status: 'OK', message: esClientResponse, body: esClientResponse._id };
    } catch (error) {
      throw new Error('Creating New Notebook Error:' + error);
    }
  };

  /* Renames a notebook
   * Params: name -> new name for the notebook to be renamed
   *         noteId -> Id of notebook to be fetched
   */
  renameNote = async function (
    context: RequestHandlerContext,
    params: { name: string; noteId: string },
    _wreckOptions: optionsType
  ) {
    try {
      const updateNotebook = {
        name: params.name,
        dateModified: new Date().toISOString(),
      };
      const esClientResponse = await this.updateNote(context, params.noteId, updateNotebook);
      return { status: 'OK', message: esClientResponse };
    } catch (error) {
      throw new Error('Renaming Notebook Error:' + error);
    }
  };

  /* Clone a notebook
   * Params: name -> new name for the cloned notebook
   *         noteId -> Id for the notebook to be cloned
   */
  cloneNote = async function (
    context: RequestHandlerContext,
    params: { name: string; noteId: string },
    _wreckOptions: optionsType
  ) {
    try {
      const noteObject = await this.getNote(context, params.noteId);
      const newNotebook = this.createNewNotebook(params.name);
      const cloneNotebook = { ...newNotebook.object };
      cloneNotebook.paragraphs = noteObject.paragraphs;
      const esClientIndexResponse = await this.indexNote(context, newNotebook.id, cloneNotebook);
      return { status: 'OK', message: esClientIndexResponse, body: esClientIndexResponse._id };
    } catch (error) {
      throw new Error('Cloning Notebook Error:' + error);
    }
  };

  /* Delete a notebook
   * Param: noteId -> Id for the notebook to be deleted
   */
  deleteNote = async function (
    context: RequestHandlerContext,
    noteId: string,
    _wreckOptions: optionsType
  ) {
    try {
      const esClientResponse = await context.core.elasticsearch.legacy.client.callAsCurrentUser(
        'delete',
        {
          index: '.notebooks',
          id: noteId,
          refresh: 'true',
        }
      );
      return { status: 'OK', message: esClientResponse };
    } catch (error) {
      throw new Error('Deleting Notebook Error:' + error);
    }
  };

  /* Export a notebook
   * Param: noteId -> Id for the notebook to be exported
   */
  exportNote = async function (
    context: RequestHandlerContext,
    noteId: string,
    _wreckOptions: optionsType
  ) {
    try {
      const esClientGetResponse = await this.getNote(context, noteId);
      return { status: 'OK', body: esClientGetResponse };
    } catch (error) {
      throw new Error('Export Notebook Error:' + error);
    }
  };

  /* Import a notebook
   * Params: noteObj -> note Object to be imported
   */
  importNote = async function (
    context: RequestHandlerContext,
    noteObj: any,
    _wreckOptions: optionsType
  ) {
    try {
      let newNoteObject = { ...noteObj };
      newNoteObject.id = 'note_' + uuid();
      newNoteObject.dateCreated = new Date().toISOString();
      newNoteObject.dateModified = new Date().toISOString();
      const esClientIndexResponse = await this.indexNote(context, newNoteObject.id, newNoteObject);
      return { status: 'OK', message: esClientIndexResponse, body: esClientIndexResponse._id };
    } catch (error) {
      throw new Error('Import Notebook Error:' + error);
    }
  };

  /* Updates input for required paragraphs
   * Params: paragraphs -> list of paragraphs
   *         paragraphId -> Id of paragraph to be updated
   *         paragraphInput -> Input to be added
   */
  updateParagraphInput = function (
    paragraphs: Array<DefaultParagraph>,
    paragraphId: string,
    paragraphInput: string
  ) {
    try {
      const updatedParagraphs = [];
      paragraphs.map((paragraph: DefaultParagraph) => {
        const updatedParagraph = { ...paragraph };
        if (paragraph.id === paragraphId) {
          updatedParagraph.dateModified = new Date().toISOString();
          updatedParagraph.input.inputText = paragraphInput;
        }
        updatedParagraphs.push(updatedParagraph);
      });
      return updatedParagraphs;
    } catch (error) {
      throw new Error('Update Paragraph Error:' + error);
    }
  };

  // Creates new paragraph with the given input and input type
  createParagraph = function (paragraphInput: string, inputType: string) {
    try {
      let paragraphType = 'MARKDOWN';
      if (inputType === 'VISUALIZATION') {
        paragraphType = 'VISUALIZATION';
      }
      const inputObject = {
        inputType: paragraphType,
        inputText: paragraphInput,
      };
      const outputObjects: Array<DefaultOutput> = [
        {
          outputType: paragraphType,
          result: '',
          execution_time: '0s',
        },
      ];
      const newParagraph = {
        id: 'paragraph_' + uuid(),
        dateCreated: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        input: inputObject,
        output: outputObjects,
      };

      return newParagraph;
    } catch (error) {
      throw new Error('Create Paragraph Error:' + error);
    }
  };

  /* Runs a paragraph
   * Currently only runs markdown by copying input.inputText to result
   * UI renders Markdown
   */
  runParagraph = async function (paragraphs: Array<DefaultParagraph>, paragraphId: string) {
    try {
      const updatedParagraphs = [];
      paragraphs.map((paragraph: DefaultParagraph) => {
        const updatedParagraph = { ...paragraph };
        if (paragraph.input.inputType === 'MARKDOWN' && paragraph.id === paragraphId) {
          updatedParagraph.dateModified = new Date().toISOString();
          updatedParagraph.output = [
            {
              outputType: 'MARKDOWN',
              result: paragraph.input.inputText,
              execution_time: '0s',
            },
          ];
        } else if (paragraph.input.inputType === 'VISUALIZATION' && paragraph.id === paragraphId) {
          updatedParagraph.dateModified = new Date().toISOString();
          updatedParagraph.output = [
            {
              outputType: 'VISUALIZATION',
              result: '',
              execution_time: '0s',
            },
          ];
        }
        updatedParagraphs.push(updatedParagraph);
      });
      return updatedParagraphs;
    } catch (error) {
      throw new Error('Running Paragraph Error:' + error);
    }
  };

  /* --> Updates a Paragraph with input content
   * --> Runs it
   * --> Updates the notebook in index
   * --> Fetches the updated Paragraph (with new input content and output result)
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be updated
   *         paragraphInput -> paragraph input code
   */
  updateRunFetchParagraph = async function (
    context: RequestHandlerContext,
    params: { noteId: string; paragraphId: string; paragraphInput: string },
    _wreckOptions: optionsType
  ) {
    try {
      const esClientGetResponse = await this.getNote(context, params.noteId);
      const updatedInputParagraphs = this.updateParagraphInput(
        esClientGetResponse.paragraphs,
        params.paragraphId,
        params.paragraphInput
      );
      const updatedOutputParagraphs = await this.runParagraph(
        updatedInputParagraphs,
        params.paragraphId
      );

      const updateNotebook = {
        paragraphs: updatedOutputParagraphs,
        dateModified: new Date().toISOString(),
      };
      const esClientResponse = await this.updateNote(context, params.noteId, updateNotebook);

      let resultParagraph = {};
      updatedOutputParagraphs.map((paragraph: DefaultParagraph) => {
        if (params.paragraphId === paragraph.id) {
          resultParagraph = paragraph;
        }
      });
      return resultParagraph;
    } catch (error) {
      throw new Error('Update/Run Paragraph Error:' + error);
    }
  };

  /* --> Updates a Paragraph with input content
   * --> Updates the notebook in index
   * --> Fetches the updated Paragraph (with new input content)
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be updated
   *         paragraphInput -> paragraph input code
   */
  updateFetchParagraph = async function (
    context: RequestHandlerContext,
    params: { noteId: string; paragraphId: string; paragraphInput: string },
    _wreckOptions: optionsType
  ) {
    try {
      const esClientGetResponse = await this.getNote(context, params.noteId);
      const updatedInputParagraphs = this.updateParagraphInput(
        esClientGetResponse.paragraphs,
        params.paragraphId,
        params.paragraphInput
      );

      const updateNotebook = {
        paragraphs: updatedInputParagraphs,
        dateModified: new Date().toISOString(),
      };
      const esClientResponse = await this.updateNote(context, params.noteId, updateNotebook);

      let resultParagraph = {};
      updatedInputParagraphs.map((paragraph: DefaultParagraph) => {
        if (params.paragraphId === paragraph.id) {
          resultParagraph = paragraph;
        }
      });
      return resultParagraph;
    } catch (error) {
      throw new Error('Save Paragraph Error:' + error);
    }
  };

  /* --> Fetches the Paragraph
   * --> Adds a Paragraph with input content
   * --> Updates the notebook in index
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be fetched
   */
  addFetchNewParagraph = async function (
    context: RequestHandlerContext,
    params: { noteId: string; paragraphIndex: number; paragraphInput: string; inputType: string },
    _wreckOptions: optionsType
  ) {
    try {
      const esClientGetResponse = await this.getNote(context, params.noteId);
      const paragraphs = esClientGetResponse.paragraphs;
      const newParagraph = this.createParagraph(params.paragraphInput, params.inputType);
      paragraphs.splice(params.paragraphIndex, 0, newParagraph);
      const updateNotebook = {
        paragraphs: paragraphs,
        dateModified: new Date().toISOString(),
      };
      const esClientResponse = await this.updateNote(context, params.noteId, updateNotebook);

      return newParagraph;
    } catch (error) {
      throw new Error('add/Fetch Paragraph Error:' + error);
    }
  };

  /* --> Deletes a Paragraph with id
   * --> Fetches the all other Paragraphs as a list
   * --> Updates the notebook in index
   * Params: noteId -> Id of the notebook
   *         paragraphId -> Id of the paragraph to be deleted
   */
  deleteFetchParagraphs = async function (
    context: RequestHandlerContext,
    params: { noteId: string; paragraphId: string },
    _wreckOptions: optionsType
  ) {
    try {
      const esClientGetResponse = await this.getNote(context, params.noteId);
      let updatedparagraphs = [];
      esClientGetResponse.paragraphs.map((paragraph: DefaultParagraph, index: number) => {
        if (paragraph.id !== params.paragraphId) {
          updatedparagraphs.push(paragraph);
        }
      });

      const updateNotebook = {
        paragraphs: updatedparagraphs,
        dateModified: new Date().toISOString(),
      };
      const esClientResponse = await this.updateNote(context, params.noteId, updateNotebook);

      return { paragraphs: updatedparagraphs };
    } catch (error) {
      throw new Error('Delete Paragraph Error:' + error);
    }
  };

  /* --> Clears output for all the paragraphs
   * --> Fetches the all Paragraphs as a list (with cleared outputs)
   * --> Updates the notebook in index
   * Param: noteId -> Id of notebook to be cleared
   */
  clearAllFetchParagraphs = async function (
    context: RequestHandlerContext,
    params: { noteId: string },
    _wreckOptions: optionsType
  ) {
    try {
      const esClientGetResponse = await this.getNote(context, params.noteId);
      let updatedparagraphs = [];
      esClientGetResponse.paragraphs.map((paragraph: DefaultParagraph, index: number) => {
        let updatedParagraph = { ...paragraph };
        updatedParagraph.output = [];
        updatedparagraphs.push(updatedParagraph);
      });

      const updateNotebook = {
        paragraphs: updatedparagraphs,
        dateModified: new Date().toISOString(),
      };
      const esClientResponse = await this.updateNote(context, params.noteId, updateNotebook);

      return { paragraphs: updatedparagraphs };
    } catch (error) {
      throw new Error('Clear Paragraph Error:' + error);
    }
  };
}

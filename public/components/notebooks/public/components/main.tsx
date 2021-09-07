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

import { EuiGlobalToastList, EuiLink } from '@elastic/eui';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';
import React, { ReactChild } from 'react';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { ChromeBreadcrumb, CoreStart } from '../../../../../../../src/core/public';
import { DashboardStart } from '../../../../../../../src/plugins/dashboard/public';
import { API_PREFIX, DOCUMENTATION_URL } from '../../../../../common/constants/notebooks';
import { Notebook } from './notebook';
import { NoteTable } from './note_table';

/*
 * "Main" component renders the whole Notebooks as a single page application
 *
 * Props taken in as params are:
 * DashboardContainerByValueRenderer: Dashboard container renderer for visualization
 * http object: for making API requests
 *
 * Cell component of nteract used as a container for paragraphs in notebook UI.
 * https://components.nteract.io/#cell
 */

type MainProps = {
  basename: string;
  DashboardContainerByValueRenderer: DashboardStart['DashboardContainerByValueRenderer'];
  http: CoreStart['http'];
  setBreadcrumbs: (newBreadcrumbs: ChromeBreadcrumb[]) => void;
};

type MainState = {
  data: Array<NotebookType>;
  openedNotebook: NotebookType | undefined;
  toasts: Toast[];
  loading: boolean;
};

export type NotebookType = {
  path: string;
  id: string;
  dateCreated: string;
  dateModified: string;
};

export class Main extends React.Component<MainProps, MainState> {
  constructor(props: Readonly<MainProps>) {
    super(props);
    this.state = {
      data: [],
      openedNotebook: undefined,
      toasts: [],
      loading: false,
    };
  }

  setToast = (title: string, color = 'success', text?: ReactChild) => {
    if (!text) text = '';
    this.setState((prevState) => ({
      toasts: [
        ...prevState.toasts,
        {
          id: new Date().toISOString(),
          title,
          text,
          color,
        } as Toast,
      ],
    }));
  };

  // Fetches path and id for all stored notebooks
  fetchNotebooks = () => {
    return this.props.http
      .get(`${API_PREFIX}/`)
      .then((res) => this.setState(res))
      .catch((err) => {
        console.error('Issue in fetching the notebooks', err.body.message);
      });
  };

  // Creates a new notebook
  createNotebook = (newNoteName: string) => {
    if (newNoteName.length >= 50 || newNoteName.length === 0) {
      this.setToast('Invalid notebook name', 'danger');
      return;
    }
    const newNoteObject = {
      name: newNoteName,
    };

    return this.props.http
      .post(`${API_PREFIX}/note`, {
        body: JSON.stringify(newNoteObject),
      })
      .then(async (res) => {
        this.setToast(`Notebook "${newNoteName}" successfully created!`);
        window.location.assign(`${this.props.basename}#${res}`);
      })
      .catch((err) => {
        this.setToast(
          'Please ask your administrator to enable Notebooks for you.',
          'danger',
          <EuiLink href={DOCUMENTATION_URL} target="_blank">
            Documentation
          </EuiLink>
        );
        console.error(err);
      });
  };

  // Renames an existing notebook
  renameNotebook = (editedNoteName: string, editedNoteID: string) => {
    if (editedNoteName.length >= 50 || editedNoteName.length === 0) {
      this.setToast('Invalid notebook name', 'danger');
      return;
    }
    const renameNoteObject = {
      name: editedNoteName,
      noteId: editedNoteID,
    };

    return this.props.http
      .put(`${API_PREFIX}/note/rename`, {
        body: JSON.stringify(renameNoteObject),
      })
      .then((res) => {
        this.setState((prevState) => {
          const newData = [...prevState.data];
          const renamedNotebook = newData.find((notebook) => notebook.id === editedNoteID);
          if (renamedNotebook) renamedNotebook.path = editedNoteName;
          return { data: newData };
        });
        this.setToast(`Notebook successfully renamed into "${editedNoteName}"`);
      })
      .catch((err) => {
        this.setToast(
          'Error renaming notebook, please make sure you have the correct permission.',
          'danger'
        );
        console.error(err.body.message);
      });
  };

  // Clones an existing notebook, return new notebook's id
  cloneNotebook = (clonedNoteName: string, clonedNoteID: string): Promise<string> => {
    if (clonedNoteName.length >= 50 || clonedNoteName.length === 0) {
      this.setToast('Invalid notebook name', 'danger');
      return Promise.reject();
    }
    const cloneNoteObject = {
      name: clonedNoteName,
      noteId: clonedNoteID,
    };

    return this.props.http
      .post(`${API_PREFIX}/note/clone`, {
        body: JSON.stringify(cloneNoteObject),
      })
      .then((res) => {
        this.setState((prevState) => ({
          data: [
            ...prevState.data,
            {
              path: clonedNoteName,
              id: res.body.id,
              dateCreated: res.body.dateCreated,
              dateModified: res.body.dateModified,
            },
          ],
        }));
        this.setToast(`Notebook "${clonedNoteName}" successfully created!`);
        return res.body.id;
      })
      .catch((err) => {
        this.setToast(
          'Error cloning notebook, please make sure you have the correct permission.',
          'danger'
        );
        console.error(err.body.message);
      });
  };

  // Deletes an existing notebook
  deleteNotebook = (notebookId: string, notebookName?: string, showToast = true) => {
    return this.props.http
      .delete(`${API_PREFIX}/note/` + notebookId)
      .then((res) => {
        this.setState((prevState) => ({
          data: prevState.data.filter((notebook) => notebook.id !== notebookId),
        }));
        if (showToast) this.setToast(`Notebook "${notebookName}" successfully deleted!`);
        return res;
      })
      .catch((err) => {
        this.setToast(
          'Error deleting notebook, please make sure you have the correct permission.',
          'danger'
        );
        console.error(err.body.message);
      });
  };

  addSampleNotebooks = async () => {
    try {
      this.setState({ loading: true });
      const flights = await this.props.http
        .get('../api/saved_objects/_find', {
          query: {
            type: 'index-pattern',
            search_fields: 'title',
            search: 'opensearch_dashboards_sample_data_flights',
          },
        })
        .then((resp) => resp.total === 0);
      const logs = await this.props.http
        .get('../api/saved_objects/_find', {
          query: {
            type: 'index-pattern',
            search_fields: 'title',
            search: 'opensearch_dashboards_sample_data_logs',
          },
        })
        .then((resp) => resp.total === 0);
      if (flights || logs) this.setToast('Adding sample data. This can take some time.');
      await Promise.all([
        flights ? this.props.http.post('../api/sample_data/flights') : Promise.resolve(),
        logs ? this.props.http.post('../api/sample_data/logs') : Promise.resolve(),
      ]);
      const visIds: string[] = [];
      await this.props.http
        .get('../api/saved_objects/_find', {
          query: {
            type: 'visualization',
            search_fields: 'title',
            search: '[Logs] Response Codes Over Time + Annotations',
          },
        })
        .then((resp) => visIds.push(resp.saved_objects[0].id));
      await this.props.http
        .get('../api/saved_objects/_find', {
          query: {
            type: 'visualization',
            search_fields: 'title',
            search: '[Logs] Unique Visitors vs. Average Bytes',
          },
        })
        .then((resp) => visIds.push(resp.saved_objects[0].id));
      await this.props.http
        .get('../api/saved_objects/_find', {
          query: {
            type: 'visualization',
            search_fields: 'title',
            search: '[Flights] Flight Count and Average Ticket Price',
          },
        })
        .then((resp) => visIds.push(resp.saved_objects[0].id));
      await this.props.http
        .post(`${API_PREFIX}/note/addSampleNotebooks`, {
          body: JSON.stringify({ visIds }),
        })
        .then((res) => {
          const newData = res.body.map((notebook) => ({
            path: notebook.name,
            id: notebook.id,
            dateCreated: notebook.dateCreated,
            dateModified: notebook.dateModified,
          }));
          this.setState((prevState) => ({
            data: [...prevState.data, ...newData],
          }));
        });
      this.setToast(`Sample notebooks successfully added.`);
    } catch (err) {
      this.setToast('Error adding sample notebooks.', 'danger');
      console.error(err.body.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <HashRouter>
        <>
          <EuiGlobalToastList
            toasts={this.state.toasts}
            dismissToast={(removedToast) => {
              this.setState({
                toasts: this.state.toasts.filter((toast) => toast.id !== removedToast.id),
              });
            }}
            toastLifeTimeMs={6000}
          />
          <Switch>
            <Route
              path="/notebooks/:id"
              render={(props) => (
                <Notebook
                  basename={this.props.basename}
                  openedNoteId={props.match.params.id}
                  DashboardContainerByValueRenderer={this.props.DashboardContainerByValueRenderer}
                  http={this.props.http}
                  setBreadcrumbs={this.props.setBreadcrumbs}
                  renameNotebook={this.renameNotebook}
                  cloneNotebook={this.cloneNotebook}
                  deleteNotebook={this.deleteNotebook}
                  setToast={this.setToast}
                />
              )}
            />
            <Route
              path="/notebooks"
              render={(props) => (
                <NoteTable
                  loading={this.state.loading}
                  fetchNotebooks={this.fetchNotebooks}
                  addSampleNotebooks={this.addSampleNotebooks}
                  notebooks={this.state.data}
                  createNotebook={this.createNotebook}
                  renameNotebook={this.renameNotebook}
                  cloneNotebook={this.cloneNotebook}
                  deleteNotebook={this.deleteNotebook}
                  setBreadcrumbs={this.props.setBreadcrumbs}
                  setToast={this.setToast}
                />
              )}
            />
          </Switch>
        </>
      </HashRouter>
    );
  }
}

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

import React from 'react';

import { CoreStart, ChromeBreadcrumb } from '../../../../src/core/public';
import { DashboardStart } from '../../../../src/plugins/dashboard/public';

import { Notebook } from './notebook';
import { onDownload } from './helpers/download_json';
import { API_PREFIX } from '../../common';
import { NoteTable } from './note_table';
import { HashRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { EuiGlobalToastList } from '@elastic/eui';
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list';

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
  openedNotebook: NotebookType;
  toasts: Toast[];
};

export type NotebookType = {
  path: string;
  id: string;
  dateCreated: string;
  dateModified: string;
}

export class Main extends React.Component<MainProps, MainState> {
  constructor(props: Readonly<MainProps>) {
    super(props);
    this.state = {
      data: [],
      openedNotebook: undefined,
      toasts: [],
    };
  }

  setToast = (title: string, color = 'success', text = '') => {
    this.setState({
      toasts: [{
        id: new Date().toISOString(),
        title,
        text,
        color,
      }]
    })
  }

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
        window.location.assign(`${this.props.basename}#${res.body}`);
      })
      .catch((err) => this.setToast('Issue in creating a notebook ' + err.body.message, 'danger'));
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
        this.fetchNotebooks();
        this.setToast(`Notebook successfully renamed into "${editedNoteName}"`);
      })
      .catch((err) => this.setToast('Issue in renaming the notebook ' + err.body.message, 'danger'));
  };

  // Clones an existing notebook
  cloneNotebook = (clonedNoteName: string, clonedNoteID: string) => {
    const cloneNoteObject = {
      name: clonedNoteName,
      noteId: clonedNoteID,
    };

    return this.props.http
      .post(`${API_PREFIX}/note/clone`, {
        body: JSON.stringify(cloneNoteObject),
      })
      .then((res) => {
        this.fetchNotebooks();
        this.setToast(`Notebook "${clonedNoteName}" successfully created!`);
        return res.body;
      })
      .catch((err) => this.setToast('Issue in cloning the notebook ' + err.body.message, 'danger'));
  };

  // Deletes an existing notebook
  deleteNotebook = (notebookId: string, notebookName?: string, showToast = true) => {
    return this.props.http
      .delete(`${API_PREFIX}/note/` + notebookId)
      .then((res) => {
        this.fetchNotebooks();
        if (showToast)
          this.setToast(`Notebook "${notebookName}" successfully deleted!`);
      })
      .catch((err) => this.setToast('Issue in deleting the notebook ' + err.body.message, 'danger'));
  };

  render() {
    return (
      <HashRouter basename={this.props.basename}>
        <>
          <EuiGlobalToastList
            toasts={this.state.toasts}
            dismissToast={removedToast => {
              this.setState({
                toasts: this.state.toasts.filter(toast => toast.id !== removedToast.id)
              })
            }}
            toastLifeTimeMs={6000}
          />
          <Switch>
            <Route
              path='/:id'
              render={(props) =>
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
              }
            />
            <Route
              path='/'
              render={(props) =>
                <NoteTable
                  fetchNotebooks={this.fetchNotebooks}
                  notebooks={this.state.data}
                  createNotebook={this.createNotebook}
                  renameNotebook={this.renameNotebook}
                  cloneNotebook={this.cloneNotebook}
                  deleteNotebook={this.deleteNotebook}
                  setBreadcrumbs={this.props.setBreadcrumbs}
                  setToast={this.setToast}
                />
              }
            />
          </Switch>
        </>
      </HashRouter>
    )
  }
}
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
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
  EuiTreeView,
  EuiIcon,
} from '@elastic/eui';
import { CoreStart } from '../../../../src/core/public';
import { DashboardStart } from '../../../../src/plugins/dashboard/public';
import { MainButtons } from './main_buttons';
import { Notebook } from './notebook';
import { onDownload } from './helpers/download_json';
import { API_PREFIX } from '../../common';
import { error } from 'selenium-webdriver';

/*
 * "Main" component is render the whole Notebooks as a single page application
 *
 * Props taken in as params are:
 * DashboardContainerByValueRenderer: Dashboard container renderer for visualization
 * http object: for making API requests
 *
 * Cell component of nteract used as a container for paragraphs in notebook UI.
 * https://components.nteract.io/#cell
 */

type MainProps = {
  DashboardContainerByValueRenderer: DashboardStart['DashboardContainerByValueRenderer'];
  http: CoreStart['http'];
};

type MainState = {
  data: Array<{ path: string; id: string }>;
  noteOpen: string;
  noteName: string;
  switchName: string;
  switchId: string;
  folderTree: Array<{
    label: string;
    id: string;
    icon: JSX.Element;
    iconWhenExpanded: JSX.Element;
    isExpanded: boolean;
    children: Array<{ label: string; id: string; icon: JSX.Element }>;
  }>;
};

export class Main extends React.Component<MainProps, MainState> {
  constructor(props: Readonly<MainProps>) {
    super(props);
    this.state = {
      data: [],
      noteOpen: '',
      noteName: '',
      switchId: '',
      switchName: '',
      folderTree: [
        {
          label: 'Base Path',
          id: 'Base_path',
          icon: <EuiIcon type="folderClosed" />,
          iconWhenExpanded: <EuiIcon type="folderOpen" />,
          isExpanded: true,
          children: [],
        },
      ],
    };
  }

  fetchNotebooks = () => {
    this.props.http
      .get(`${API_PREFIX}/`)
      .then((res) => this.setState(res))
      .catch((err) => {
        console.error('Issue in fetching the notebooks', err.body.message);
      });
  };

  createNotebook = (newNoteName: string) => {
    let newNoteId = '';
    const newNoteObject = {
      name: newNoteName,
    };

    this.props.http
      .post(`${API_PREFIX}/note`, {
        body: JSON.stringify(newNoteObject),
      })
      .then((res) => {
        newNoteId = res.body;
        this.setState({ switchId: newNoteId, switchName: newNoteName });
        this.fetchNotebooks();
      })
      .catch((err) => console.error('Issue in creating a notebook', err.body.message));
  };

  renameNotebook = (editedNoteName: string, editedNoteID: string) => {
    const renameNoteObject = {
      name: editedNoteName,
      noteId: editedNoteID,
    };

    this.props.http
      .put(`${API_PREFIX}/note/rename`, {
        body: JSON.stringify(renameNoteObject),
      })
      .then((res) => {
        this.setState({ switchId: editedNoteID, switchName: editedNoteName });
        this.fetchNotebooks();
      })
      .catch((err) => console.error('Issue in renaming the notebook', err.body.message));
  };

  cloneNotebook = (clonedNoteName: string, clonedNoteID: string) => {
    let newNoteId = '';
    const cloneNoteObject = {
      name: clonedNoteName,
      noteId: clonedNoteID,
    };

    this.props.http
      .post(`${API_PREFIX}/note/clone`, {
        body: JSON.stringify(cloneNoteObject),
      })
      .then((res) => {
        newNoteId = res.body;
        this.setState({ switchId: newNoteId, switchName: clonedNoteName });
        this.fetchNotebooks();
      })
      .catch((err) => console.error('Issue in cloning the notebook', err.body.message));
  };

  deleteNotebook = (clonedNoteID: string) => {
    this.props.http
      .delete(`${API_PREFIX}/note/` + clonedNoteID)
      .then((res) => this.fetchNotebooks())
      .catch((err) => console.error('Issue in deleting the notebook', err.body.message));
  };

  exportNotebook = (exportNoteName: string, exportNoteId: string) => {
    this.props.http
      .get(`${API_PREFIX}/note/export/` + exportNoteId)
      .then((res) => {
        onDownload(res, exportNoteName + '.json');
      })
      .catch((err) => console.error('Issue in exporting the notebook', err.body.message));
  };

  importNotebook = (noteObject: any) => {
    let newNoteId = '';
    const importObject = {
      noteObj: noteObject,
    };
    this.props.http
      .post(`${API_PREFIX}/note/import`, { body: JSON.stringify(importObject) })
      .then((res) => {
        newNoteId = res.body;
        this.setState({ switchId: newNoteId, switchName: noteObject.name });
        this.fetchNotebooks();
      })
      .catch((err) => console.error('Issue in importing the notebook', err.body.message));
  };

  loadNotebook = (nbId: string, nbName: string) => {
    this.setState({ noteOpen: nbId, noteName: nbName });
  };

  realodSidePanel = () => {
    let folderTree = this.state.folderTree;
    let noteArray: Array<{ label: string; id: string; icon: JSX.Element }> = [];
    this.state.data.map((note: { path: string; id: string }, index: number) => {
      const noteName = note.path.split('/').pop();
      const noteObj = {
        label: noteName,
        id: note.id,
        icon: <EuiIcon type="notebookApp" aria-label={'note_' + index} />,
        callback: () => this.loadNotebook(note.id, noteName),
      };
      noteArray.push(noteObj);
    });

    folderTree[0].children = noteArray;
    this.setState({ folderTree });
  };

  setNoteOpen = () => {
    if (this.state.data[0] === undefined) {
      this.createNotebook('Test 1');
    } else if (this.state.switchId !== '') {
      this.loadNotebook(this.state.switchId, this.state.switchName);
      this.setState({ switchId: '', switchName: '' });
    } else {
      let noteOpen = '';
      let noteName = '';
      noteOpen = this.state.data[0].id;
      noteName = this.state.data[0].path.split('/').pop();
      this.setState({ noteOpen });
      this.setState({ noteName });
    }
  };

  componentDidUpdate(prevProps: MainProps, prevState: MainState) {
    if (this.state.data !== prevState.data) {
      this.realodSidePanel();
      this.setNoteOpen();
    }
  }

  componentDidMount() {
    this.fetchNotebooks();
  }

  render() {
    return (
      <EuiPage>
        <EuiPageSideBar>
          <div>
            <EuiTreeView items={this.state.folderTree} aria-label="Base Path Folder Tree" />
          </div>
        </EuiPageSideBar>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Kibana Notebooks</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
            <MainButtons
              createNotebook={this.createNotebook}
              openNoteName={this.state.noteName}
              openNoteId={this.state.noteOpen}
              renameNotebook={this.renameNotebook}
              cloneNotebook={this.cloneNotebook}
              deleteNotebook={this.deleteNotebook}
              exportNotebook={this.exportNotebook}
              importNotebook={this.importNotebook}
            />
          </EuiPageHeader>
          <EuiPageContent id="notebookArea">
            <Notebook
              noteId={this.state.noteOpen}
              noteName={this.state.noteName}
              DashboardContainerByValueRenderer={this.props.DashboardContainerByValueRenderer}
              http={this.props.http}
            />
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}

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

import React, { Component } from 'react';
import {
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiIcon,
} from '@elastic/eui';
import { Cells } from '@nteract/presentational-components';

import { CoreStart } from '../../../../src/core/public';
import { DashboardStart } from '../../../../src/plugins/dashboard/public';

import { ParaButtons } from './paragraph_components/para_buttons';
import { Paragraphs } from './paragraph_components/paragraphs';
import { SELECTED_BACKEND } from '../../common';
import { API_PREFIX, ParaType } from '../../common';
import { zeppelinParagraphParser } from './helpers/zeppelin_parser';
import { defaultParagraphParser } from './helpers/default_parser';

/*
 * "Notebook" component is used to display an open notebook
 *
 * Props taken in as params are:
 * isNoteAvailable - boolean to check is any notebooks exists
 * noteName - current open notebook name
 * noteId - current open notebook id
 * DashboardContainerByValueRenderer - Dashboard container renderer for visualization
 * http object: for making API requests
 */
type NotebookProps = {
  isNoteAvailable: boolean;
  noteId: string;
  noteName: string;
  DashboardContainerByValueRenderer: DashboardStart['DashboardContainerByValueRenderer'];
  http: CoreStart['http'];
};

type NotebookState = {
  paragraphs: any; // notebook paragraphs fetched from API
  parsedPara: Array<ParaType>; // paragraphs parsed to a common format
  toggleOutput: boolean; // Hide Outputs toggle
  toggleInput: boolean; // Hide Inputs toggle
};
export class Notebook extends Component<NotebookProps, NotebookState> {
  constructor(props: Readonly<NotebookProps>) {
    super(props);
    this.state = {
      paragraphs: [],
      parsedPara: [],
      toggleOutput: true,
      toggleInput: true,
    };
  }

  // parse paragraphs based on backend
  parseParagraphs = () => {
    try {
      let parsedPara;
      if (SELECTED_BACKEND === 'ZEPPELIN') {
        parsedPara = zeppelinParagraphParser(this.state.paragraphs);
      } else {
        parsedPara = defaultParagraphParser(this.state.paragraphs);
      }
      this.setState({ parsedPara });
    } catch (error) {
      console.error('Parsing paragraph has some issue', error);
      this.setState({ parsedPara: [] });
    }
  };

  // Assigns Loading, Running & inQueue for paragraphs in current notebook
  showParagraphRunning = (param: number | string) => {
    let parsedPara = this.state.parsedPara;
    this.state.parsedPara.map((_: ParaType, index: number) => {
      if (param === 'queue') {
        parsedPara[index].inQueue = true;
        parsedPara[index].isOutputHidden = true;
      } else if (param === 'loading') {
        parsedPara[index].isRunning = true;
        parsedPara[index].isOutputHidden = true;
      } else if (param === index) {
        parsedPara[index].isRunning = true;
        parsedPara[index].isOutputHidden = true;
      }
    });
    this.setState({ parsedPara });
  };

  // Gets the paragraph and its index which is selected by the user
  getSelectedParagraph = () => {
    let selectedPara: ParaType;
    let selectedparagraphIndex = -1;
    this.state.parsedPara.map((para: ParaType, index: number) => {
      if (para.isSelected === true) {
        selectedPara = para;
        selectedparagraphIndex = index;
      }
    });

    if (selectedparagraphIndex === -1) {
      alert('Please select a Paragraph');
    }
    return { para: selectedPara, paragraphIndex: selectedparagraphIndex };
  };

  // Sets a paragraph to selected and deselects all others
  paragraphSelector = (index: number) => {
    let parsedPara = this.state.parsedPara;
    this.state.parsedPara.map((_: ParaType, idx: number) => {
      if (index === idx) parsedPara[idx].isSelected = true;
      else parsedPara[idx].isSelected = false;
    });
    this.setState({ parsedPara });
  };

  // Sets boolean for "add new paragraph div" when hovered between paragraphs
  addParagraphHover = (para: ParaType) => {
    let parsedPara = this.state.parsedPara;
    this.state.parsedPara.map((_: ParaType, index: number) => {
      parsedPara[index].ishovered = false;
      if (index == para.id - 1) {
        para.showAddPara = !para.showAddPara;
      }
    });
    this.setState({ parsedPara });
  };

  // Resets all paragraphs state to hover:false
  paragraphHoverReset = () => {
    let parsedPara = this.state.parsedPara;
    this.state.parsedPara.map((_: ParaType, index: number) => {
      parsedPara[index].ishovered = false;
    });
    this.setState({ parsedPara });
  };

  // Sets boolean on hovering over a paragraph
  paragraphHover = (para: ParaType) => {
    this.paragraphHoverReset();
    if (!para.isSelected) para.ishovered = true;
  };

  // Function for delete a Notebook button
  deleteParagraphButton = () => {
    const selectedParaObject = this.getSelectedParagraph();
    const delPara = selectedParaObject.para;
    const delparagraphIndex = selectedParaObject.paragraphIndex;
    if (delparagraphIndex !== -1) {
      this.props.http
        .delete(`${API_PREFIX}/paragraph/` + this.props.noteId + '/' + delPara.uniqueId)
        .then((res) => {
          this.setState({ paragraphs: res.paragraphs });
          this.parseParagraphs();
        })
        .catch((err) => console.error('Delete paragraph issue: ', err.body.message));
    }
  };

  // Function for delete Visualization from notebook
  deleteVizualization = (uniqueId: string) => {
    this.props.http
      .delete(`${API_PREFIX}/paragraph/` + this.props.noteId + '/' + uniqueId)
      .then((res) => {
        this.setState({ paragraphs: res.paragraphs });
        this.parseParagraphs();
      })
      .catch((err) => console.error('Delete vizualization issue: ', err.body.message));
  };

  // Backend call to add a paragraph
  addPara = (index: number, newParaContent: string) => {
    let paragraphs = this.state.paragraphs;

    const addParaObj = {
      noteId: this.props.noteId,
      paragraphIndex: index,
      paragraphInput: newParaContent,
    };

    this.props.http
      .post(`${API_PREFIX}/paragraph/`, {
        body: JSON.stringify(addParaObj),
      })
      .then((res) => {
        paragraphs.splice(index, 0, res);
        this.setState({ paragraphs });
        this.parseParagraphs();
      })
      .catch((err) => console.error('Add paragraph issue: ', err.body.message));
  };

  // Function to clone a paragraph
  cloneParaButton = () => {
    const selectedParaObject = this.getSelectedParagraph();
    const clonePara = selectedParaObject.para;
    const cloneparagraphIndex = selectedParaObject.paragraphIndex;
    if (cloneparagraphIndex !== -1) {
      this.addPara(cloneparagraphIndex, clonePara.inp);
    }
  };

  // Function for clearing outputs button
  clearParagraphButton = () => {
    this.showParagraphRunning('loading');
    const clearParaObj = {
      noteId: this.props.noteId,
    };
    this.props.http
      .put(`${API_PREFIX}/paragraph/clearall/`, {
        body: JSON.stringify(clearParaObj),
      })
      .then((res) => {
        this.setState({ paragraphs: res.paragraphs });
        this.parseParagraphs();
      })
      .catch((err) => console.error('clear paragraph issue: ', err.body.message));
  };

  // Backend call to update and run contents of paragraph
  updateRunParagraph = (para: ParaType, index: number) => {
    this.showParagraphRunning(index);
    let paragraphs = this.state.paragraphs;

    const paraUpdateObject = {
      noteId: this.props.noteId,
      paragraphId: para.uniqueId,
      paragraphInput: para.inp,
    };

    this.props.http
      .post(`${API_PREFIX}/paragraph/update/run/`, {
        body: JSON.stringify(paraUpdateObject),
      })
      .then((res) => {
        paragraphs[index] = res;
        this.setState({ paragraphs });
        this.parseParagraphs();
      })
      .catch((err) => console.error('run paragraph issue: ', err.body.message));
  };

  // Function for run paragraph button
  runParagraphButton = () => {
    const selectedParaObject = this.getSelectedParagraph();
    const runPara = selectedParaObject.para;
    const runparagraphIndex = selectedParaObject.paragraphIndex;
    if (runparagraphIndex !== -1) {
      this.updateRunParagraph(runPara, runparagraphIndex);
    }
  };

  // Backend call to save contents of paragraph
  savePara = (para: ParaType, index: number) => {
    this.showParagraphRunning(index);
    let paragraphs = this.state.paragraphs;

    const paraUpdateObject = {
      noteId: this.props.noteId,
      paragraphId: para.uniqueId,
      paragraphInput: para.inp,
    };

    this.props.http
      .put(`${API_PREFIX}/paragraph/`, {
        body: JSON.stringify(paraUpdateObject),
      })
      .then((res) => {
        paragraphs[index] = res;
        this.setState({ paragraphs });
        this.parseParagraphs();
      })
      .catch((err) => console.error('save paragraph issue: ', err.body.message));
  };

  // Function for save paragraph button
  saveParagraphButton = () => {
    const selectedParaObject = this.getSelectedParagraph();
    const savePara = selectedParaObject.para;
    const saveparagraphIndex = selectedParaObject.paragraphIndex;
    if (saveparagraphIndex !== -1) {
      this.savePara(savePara, saveparagraphIndex);
    }
  };

  // Hanldes Edits in visualization and syncs with paragraph input
  vizualizationEditor = (vizContent: string, index: number) => {
    let parsedPara = this.state.parsedPara;
    parsedPara[index].inp = '%sh #' + vizContent;
    this.setState({ parsedPara });
  };

  // Handles text editor value and syncs with paragraph input
  textValueEditor = (evt: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    if (!(evt.key === 'Enter' && evt.shiftKey)) {
      let parsedPara = this.state.parsedPara;
      parsedPara[index].inp = evt.target.value;
      this.setState({ parsedPara });
    }
  };

  // Handles run paragraph shortcut "Shift+Enter"
  handleKeyPress = (evt: React.KeyboardEvent<Element>, para: ParaType, index: number) => {
    if (evt.key === 'Enter' && evt.shiftKey) {
      this.updateRunParagraph(para, index);
    }
  };

  // Toggles hiding outputs
  hideOutputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ toggleOutput: e.target.checked });
    let parsedPara = this.state.parsedPara;
    this.state.parsedPara.map(
      (para: ParaType, index: number) => (parsedPara[index].isOutputHidden = !para.isOutputHidden)
    );
    this.setState({ parsedPara });
  };

  // Toggles hiding inputs
  hideInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ toggleInput: e.target.checked });
    let parsedPara = this.state.parsedPara;
    this.state.parsedPara.map(
      (para: ParaType, index: number) => (parsedPara[index].isInputHidden = !para.isInputHidden)
    );
    this.setState({ parsedPara });
  };

  // Loads a notebook based on the Notebook Id
  componentDidUpdate(prevProps: NotebookProps, _prevState: NotebookState) {
    if (this.props.isNoteAvailable && this.props.noteId !== prevProps.noteId) {
      this.showParagraphRunning('queue');
      this.props.http
        .get(`${API_PREFIX}/note/` + this.props.noteId)
        .then((res) => this.setState(res, this.parseParagraphs))
        .catch((err) => console.error('Fetching notebook issue: ', err.body.message));
      this.setState({ toggleInput: true });
      this.setState({ toggleOutput: true });
    }
  }

  render() {
    return (
      <div>
        {/* If a notebook is available populate UI*/}
        {this.props.isNoteAvailable && (
          <div>
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle>
                  <h2>
                    {' '}
                    <EuiIcon id="titleIcon" type="notebookApp" size="l" />
                    {this.props.noteName}
                  </h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>
              <ParaButtons
                toggleInput={this.state.toggleInput}
                toggleOutput={this.state.toggleOutput}
                hideInputs={this.hideInputs}
                hideOutputs={this.hideOutputs}
                deletePara={this.deleteParagraphButton}
                runPara={this.runParagraphButton}
                clonePara={this.cloneParaButton}
                clearPara={this.clearParagraphButton}
                savePara={this.saveParagraphButton}
              />
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <Cells>
                {this.state.parsedPara.map((para: ParaType, index: number) => (
                  <Paragraphs
                    key={'para_' + index.toString()}
                    para={para}
                    index={index}
                    paragraphSelector={this.paragraphSelector}
                    paragraphHover={this.paragraphHover}
                    paragraphHoverReset={this.paragraphHoverReset}
                    textValueEditor={this.textValueEditor}
                    handleKeyPress={this.handleKeyPress}
                    addParagraphHover={this.addParagraphHover}
                    addPara={this.addPara}
                    DashboardContainerByValueRenderer={this.props.DashboardContainerByValueRenderer}
                    deleteVizualization={this.deleteVizualization}
                    vizualizationEditor={this.vizualizationEditor}
                    http={this.props.http}
                  />
                ))}
              </Cells>
            </EuiPageContentBody>
          </div>
        )}
        {/* If any notebook is not available display default messsage*/}
        {!this.props.isNoteAvailable && (
          <EuiPageContentBody>
            You seem to be out of notebooks please create a new one :)
          </EuiPageContentBody>
        )}
      </div>
    );
  }
}

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
import { ParaButtons } from './para_components/para_buttons';
import { Paragraphs } from './para_components/paragraphs';
import { CoreStart } from '../../../../src/core/public';
import { DashboardStart } from '../../../../src/plugins/dashboard/public';
import { API_PREFIX } from '../../common';
import { zeppelin_para_parser } from './helpers/zeppelin_parser';
import { ParaType } from './helpers/zeppelin_parser';

/*
 * "Notebook" component is used to display an open notebook
 *
 * Props taken in as params are:
 * noteName - current open notebook name
 * noteId - current open notebook id
 * DashboardContainerByValueRenderer - Dashboard container renderer for visualization
 * http object: for making API requests
 */
type NotebookProps = {
  noteId: string;
  noteName: string;
  DashboardContainerByValueRenderer: DashboardStart['DashboardContainerByValueRenderer'];
  http: CoreStart['http'];
};

type NotebookState = {
  paragraphs: any;
  parsedPara: Array<ParaType>;
  toggleOutput: boolean;
  toggleInput: boolean;
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

  parsePara = () => {
    try {
      const parsedPara = zeppelin_para_parser(this.state.paragraphs);
      this.setState({ parsedPara });
    } catch (error) {
      console.error('Parsing paragraph has some issue', error);
      this.setState({ parsedPara: [] });
    }
  };

  showParaRunning = (param: number) => {
    let parsedPara = this.state.parsedPara;
    this.state.parsedPara.map((_: ParaType, index: number) => {
      if (param === -2) {
        parsedPara[index].inQueue = true;
        parsedPara[index].isOutputHidden = true;
      } else if (param === -1) {
        parsedPara[index].isRunning = true;
        parsedPara[index].isOutputHidden = true;
      } else if (param === index) {
        parsedPara[index].isRunning = true;
        parsedPara[index].isOutputHidden = true;
      }
    });
    this.setState({ parsedPara });
  };

  getSelectedPara = () => {
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

  paraSelector = (index: number) => {
    let parsedPara = this.state.parsedPara;
    this.state.parsedPara.map((_: ParaType, idx: number) => {
      if (index === idx) parsedPara[idx].isSelected = true;
      else parsedPara[idx].isSelected = false;
    });
    this.setState({ parsedPara });
  };

  paraHover = (para: ParaType) => {
    let parsedPara = this.state.parsedPara;
    this.state.parsedPara.map((_: ParaType, index: number) => {
      parsedPara[index].ishovered = false;
      if (index == para.id - 1) {
        para.showAddPara = !para.showAddPara;
      }
    });
    this.setState({ parsedPara });
  };

  cellHoverReset = () => {
    let parsedPara = this.state.parsedPara;
    this.state.parsedPara.map((_: ParaType, index: number) => {
      parsedPara[index].ishovered = false;
    });
    this.setState({ parsedPara });
  };

  cellHover = (para: ParaType) => {
    this.cellHoverReset();
    if (!para.isSelected) para.ishovered = true;
  };

  deleteParaButton = () => {
    const selectedParaObject = this.getSelectedPara();
    const delPara = selectedParaObject.para;
    const delparagraphIndex = selectedParaObject.paragraphIndex;
    if (delparagraphIndex !== -1) {
      this.props.http
        .delete(`${API_PREFIX}/paragraph/` + this.props.noteId + '/' + delPara.uniqueId)
        .then((res) => {
          this.setState({ paragraphs: res.paragraphs });
          this.parsePara();
        })
        .catch((err) => console.error('Delete paragraph issue: ', err.body.message));
    }
  };

  deleteViz = (uniqueId: string) => {
    this.props.http
      .delete(`${API_PREFIX}/paragraph/` + this.props.noteId + '/' + uniqueId)
      .then((res) => {
        this.setState({ paragraphs: res.paragraphs });
        this.parsePara();
      })
      .catch((err) => console.error('Delete vizualization issue: ', err.body.message));
  };

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
        this.parsePara();
      })
      .catch((err) => console.error('Add paragraph issue: ', err.body.message));
  };

  cloneParaButton = () => {
    const selectedParaObject = this.getSelectedPara();
    const clonePara = selectedParaObject.para;
    const cloneparagraphIndex = selectedParaObject.paragraphIndex;
    if (cloneparagraphIndex !== -1) {
      this.addPara(cloneparagraphIndex, clonePara.inp);
    }
  };

  clearButton = () => {
    this.showParaRunning(-1);
    const clearParaObj = {
      noteId: this.props.noteId,
    };
    this.props.http
      .put(`${API_PREFIX}/paragraph/clearall/`, {
        body: JSON.stringify(clearParaObj),
      })
      .then((res) => {
        this.setState({ paragraphs: res.paragraphs });
        this.parsePara();
      })
      .catch((err) => console.error('clear paragraph issue: ', err.body.message));
  };

  updateRunPara = (para: ParaType, index: number) => {
    this.showParaRunning(index);
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
        this.parsePara();
      })
      .catch((err) => console.error('run paragraph issue: ', err.body.message));
  };

  runParaButton = () => {
    const selectedParaObject = this.getSelectedPara();
    const runPara = selectedParaObject.para;
    const runparagraphIndex = selectedParaObject.paragraphIndex;
    if (runparagraphIndex !== -1) {
      this.updateRunPara(runPara, runparagraphIndex);
    }
  };

  savePara = (para: ParaType, index: number) => {
    this.showParaRunning(index);
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
        this.parsePara();
      })
      .catch((err) => console.error('save paragraph issue: ', err.body.message));
  };

  saveParaButton = () => {
    const selectedParaObject = this.getSelectedPara();
    const savePara = selectedParaObject.para;
    const saveparagraphIndex = selectedParaObject.paragraphIndex;
    if (saveparagraphIndex !== -1) {
      this.savePara(savePara, saveparagraphIndex);
    }
  };

  saveViz = (para: ParaType, vizContent: string) => {
    let paragraphs = this.state.paragraphs;
    const index = para.id - 1;
    const paraUpdateObject = {
      noteId: this.props.noteId,
      paragraphId: para.uniqueId,
      paragraphInput: vizContent,
    };

    this.props.http
      .put(`${API_PREFIX}/paragraph/`, {
        body: JSON.stringify(paraUpdateObject),
      })
      .then((res) => {
        paragraphs[index] = res;
        this.setState({ paragraphs });
        this.parsePara();
      })
      .catch((err) => console.error('save visualization issue: ', err.body.message));
  };

  textValueEditor = (evt: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    if (!(evt.key === 'Enter' && evt.shiftKey)) {
      let parsedPara = this.state.parsedPara;
      parsedPara[index].inp = evt.target.value;
      this.setState({ parsedPara });
    }
  };

  handleKeyPress = (evt: React.KeyboardEvent<Element>, para: ParaType, index: number) => {
    if (evt.key === 'Enter' && evt.shiftKey) {
      this.updateRunPara(para, index);
    }
  };

  hideOutputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ toggleOutput: e.target.checked });
    let parsedPara = this.state.parsedPara;
    this.state.parsedPara.map(
      (para: ParaType, index: number) => (parsedPara[index].isOutputHidden = !para.isOutputHidden)
    );
    this.setState({ parsedPara });
  };

  hideInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ toggleInput: e.target.checked });
    let parsedPara = this.state.parsedPara;
    this.state.parsedPara.map(
      (para: ParaType, index: number) => (parsedPara[index].isInputHidden = !para.isInputHidden)
    );
    this.setState({ parsedPara });
  };

  componentDidUpdate(prevProps: NotebookProps, _prevState: NotebookState) {
    if (this.props.noteId !== prevProps.noteId) {
      this.showParaRunning(-2);
      this.props.http
        .get(`${API_PREFIX}/note/` + this.props.noteId)
        .then((res) => this.setState(res, this.parsePara))
        .catch((err) => console.error('Fetching single notebook issue: ', err.body.message));
      this.setState({ toggleInput: true });
      this.setState({ toggleOutput: true });
    }
  }

  render() {
    return (
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
            deletePara={this.deleteParaButton}
            runPara={this.runParaButton}
            clonePara={this.cloneParaButton}
            clearPara={this.clearButton}
            savePara={this.saveParaButton}
          />
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <Cells>
            {this.state.parsedPara.map((para: ParaType, index: number) => (
              <Paragraphs
                key={'para_' + index.toString()}
                para={para}
                index={index}
                paraSelector={this.paraSelector}
                cellHover={this.cellHover}
                cellHoverReset={this.cellHoverReset}
                textValueEditor={this.textValueEditor}
                handleKeyPress={this.handleKeyPress}
                paraHover={this.paraHover}
                addPara={this.addPara}
                DashboardContainerByValueRenderer={this.props.DashboardContainerByValueRenderer}
                deleteViz={this.deleteViz}
                saveViz={this.saveViz}
                http={this.props.http}
              />
            ))}
          </Cells>
        </EuiPageContentBody>
      </div>
    );
  }
}
